#!/usr/bin/env node
/**
 * Validate all content files before publish.
 * Checks budget tables, currency consistency, budget consistency,
 * word count, internal links, and required frontmatter elements.
 *
 * Usage:  npx tsx scripts/validate-articles.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ═══════════════════════════════════════
// Types
// ═══════════════════════════════════════

type FileType = "post" | "country" | "city";

interface CheckResult {
  name: string;
  pass: boolean;
  details?: string;
}

interface FileReport {
  filePath: string;
  fileType: FileType;
  checks: CheckResult[];
}

// ═══════════════════════════════════════
// Helpers
// ═══════════════════════════════════════

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";
const DIM = "\x1b[2m";

function extractBudgetRange(text: string): { min: number; max: number } | null {
  // Match patterns like: 260-570, $260-570, 260-570 דולר, ₪240-400
  // Also handles commas: $1,400-2,850
  const patterns = [
    /\$?([\d,]+)\s*[-–]\s*\$?([\d,]+)/,
    /₪([\d,]+)\s*[-–]\s*₪?([\d,]+)/,
    /([\d,]+)\s*[-–]\s*([\d,]+)\s*(?:דולר|אירו|ש"ח)/,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      const min = parseFloat(m[1].replace(/,/g, ""));
      const max = parseFloat(m[2].replace(/,/g, ""));
      if (!isNaN(min) && !isNaN(max)) return { min, max };
    }
  }
  return null;
}

interface TableRow {
  cells: string[];
  isSummary: boolean;
  isHeader: boolean;
  isSeparator: boolean;
}

interface ParsedTable {
  rows: TableRow[];
  index: number; // 1-based table number in the file
}

function parseTables(body: string): ParsedTable[] {
  const lines = body.split("\n");
  const tables: ParsedTable[] = [];
  let currentRows: string[] = [];
  let tableCount = 0;

  for (let i = 0; i <= lines.length; i++) {
    const line = i < lines.length ? lines[i].trim() : "";
    if (line.startsWith("|") && line.endsWith("|")) {
      currentRows.push(line);
    } else {
      if (currentRows.length >= 3) {
        // min: header + separator + 1 data row
        tableCount++;
        const parsed: TableRow[] = currentRows.map((row, ri) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
          const isSeparator = cells.every((c) => /^[-:]+$/.test(c));
          const isSummary =
            !isSeparator && cells.some((c) => /\*\*סה"כ/.test(c));
          return { cells, isSummary, isHeader: ri === 0, isSeparator };
        });
        tables.push({ rows: parsed, index: tableCount });
      }
      currentRows = [];
    }
  }
  return tables;
}

function parseNumericRange(
  cell: string
): { min: number; max: number } | null {
  // Strip bold markers
  const clean = cell.replace(/\*\*/g, "").trim();
  // Remove currency symbols and words, keep digits, commas, dashes
  // Handle $1,000-1,800, 120-250 דולר, ₪240-400, 15-25€, $600-1,000+
  const m = clean.match(
    /[\$₪€]?\s*([\d,]+(?:\.\d+)?)\s*[-–]\s*[\$₪€]?\s*([\d,]+(?:\.\d+)?)\+?/
  );
  if (m) {
    const min = parseFloat(m[1].replace(/,/g, ""));
    const max = parseFloat(m[2].replace(/,/g, ""));
    if (!isNaN(min) && !isNaN(max)) return { min, max };
  }
  return null;
}

function detectCurrencyFamilies(
  cells: string[]
): Set<string> {
  const families = new Set<string>();
  for (const cell of cells) {
    if (/\$|דולר/.test(cell)) families.add("USD");
    if (/€|אירו/.test(cell)) families.add("EUR");
    if (/₪|ש"ח/.test(cell)) families.add("ILS");
  }
  return families;
}

// ═══════════════════════════════════════
// CHECK 1: Budget table math
// ═══════════════════════════════════════

function checkBudgetTableMath(body: string): CheckResult {
  const tables = parseTables(body);
  const fails: string[] = [];

  for (const table of tables) {
    const summaryRow = table.rows.find((r) => r.isSummary);
    if (!summaryRow) continue; // no total row — skip

    const dataRows = table.rows.filter(
      (r) => !r.isHeader && !r.isSeparator && !r.isSummary
    );
    if (dataRows.length === 0) continue;

    // Find which column has the numbers (usually last)
    const numCol = summaryRow.cells.length - 1;
    const summaryRange = parseNumericRange(summaryRow.cells[numCol]);
    if (!summaryRange) continue;

    let sumMin = 0;
    let sumMax = 0;
    let allParsed = true;

    for (const row of dataRows) {
      const range = parseNumericRange(row.cells[numCol]);
      if (range) {
        sumMin += range.min;
        sumMax += range.max;
      } else {
        allParsed = false;
      }
    }

    if (!allParsed) continue; // can't verify if some rows didn't parse

    if (sumMin !== summaryRange.min || sumMax !== summaryRange.max) {
      fails.push(
        `Table ${table.index}: expected ${sumMin}-${sumMax}, got ${summaryRange.min}-${summaryRange.max}`
      );
    }
  }

  return {
    name: "Budget tables math",
    pass: fails.length === 0,
    details: fails.length > 0 ? fails.join("; ") : undefined,
  };
}

// ═══════════════════════════════════════
// CHECK 2: Currency consistency
// ═══════════════════════════════════════

function checkCurrencyConsistency(body: string): CheckResult {
  const tables = parseTables(body);
  const fails: string[] = [];

  for (const table of tables) {
    // Only check tables that have a summary row
    const hasSummary = table.rows.some((r) => r.isSummary);
    if (!hasSummary) continue;

    const allCells = table.rows
      .filter((r) => !r.isHeader && !r.isSeparator)
      .flatMap((r) => r.cells);

    const families = detectCurrencyFamilies(allCells);
    if (families.size > 1) {
      fails.push(
        `Table ${table.index}: mixes ${[...families].join(" and ")}`
      );
    }
  }

  return {
    name: "Currency consistency",
    pass: fails.length === 0,
    details: fails.length > 0 ? fails.join("; ") : undefined,
  };
}

// ═══════════════════════════════════════
// CHECK 3: TL;DR / factBox / body budget consistency
// ═══════════════════════════════════════

function checkBudgetConsistency(
  data: Record<string, any>,
  body: string,
  fileType: FileType
): CheckResult {
  const sources: { label: string; range: { min: number; max: number } }[] = [];

  // Source 1: factBox.dailyBudget (posts) or top-level dailyBudget (countries/cities)
  const dailyBudget =
    fileType === "post"
      ? data.factBox?.dailyBudget
      : data.dailyBudget;
  if (dailyBudget) {
    const r = extractBudgetRange(dailyBudget);
    if (r) sources.push({ label: "dailyBudget", range: r });
  }

  // Source 2: tldr
  if (data.tldr) {
    const r = extractBudgetRange(data.tldr);
    if (r) sources.push({ label: "tldr", range: r });
  }

  // Source 3: first table summary row in body
  const tables = parseTables(body);
  for (const table of tables) {
    const summaryRow = table.rows.find((r) => r.isSummary);
    if (summaryRow) {
      const numCol = summaryRow.cells.length - 1;
      const r = parseNumericRange(summaryRow.cells[numCol]);
      if (r) {
        sources.push({ label: `body table ${table.index} total`, range: r });
        break; // only first table with total
      }
    }
  }

  if (sources.length < 2) {
    return { name: "Budget consistency", pass: true, details: "< 2 budget sources found, skipped" };
  }

  const fails: string[] = [];
  for (let i = 1; i < sources.length; i++) {
    const a = sources[0];
    const b = sources[i];
    if (a.range.min !== b.range.min || a.range.max !== b.range.max) {
      fails.push(
        `${a.label} (${a.range.min}-${a.range.max}) ≠ ${b.label} (${b.range.min}-${b.range.max})`
      );
    }
  }

  return {
    name: "Budget consistency",
    pass: fails.length === 0,
    details: fails.length > 0 ? fails.join("; ") : undefined,
  };
}

// ═══════════════════════════════════════
// CHECK 4: Word count
// ═══════════════════════════════════════

function checkWordCount(
  body: string,
  fileType: FileType
): CheckResult {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const thresholds: Record<FileType, number> = {
    post: 1000,
    country: 500,
    city: 400,
  };
  const min = thresholds[fileType];
  const pass = words >= min;
  return {
    name: "Word count",
    pass,
    details: pass
      ? `${words} words`
      : `${words} words (minimum ${min})`,
  };
}

// ═══════════════════════════════════════
// CHECK 5: Internal links
// ═══════════════════════════════════════

function checkInternalLinks(
  body: string,
  fileType: FileType
): CheckResult {
  // Match markdown links with relative paths: [text](/path)
  const linkPattern = /\]\(\//g;
  const matches = body.match(linkPattern) || [];
  const count = matches.length;

  const thresholds: Record<FileType, number> = {
    post: 2,
    country: 1,
    city: 0, // no explicit requirement for cities
  };
  const min = thresholds[fileType];
  const pass = count >= min;

  return {
    name: "Internal links",
    pass,
    details: pass
      ? `${count} found`
      : `${count} found (minimum ${min})`,
  };
}

// ═══════════════════════════════════════
// CHECK 6: Required elements
// ═══════════════════════════════════════

function checkRequiredElements(
  data: Record<string, any>,
  fileType: FileType
): CheckResult {
  const missing: string[] = [];

  // All types need tldr
  if (!data.tldr || !data.tldr.trim()) missing.push("tldr");

  if (fileType === "post") {
    // factBox with all 6 fields
    const requiredFields = [
      "flightTime",
      "currency",
      "language",
      "bestSeason",
      "dailyBudget",
      "temperature",
    ];
    if (!data.factBox) {
      missing.push("factBox");
    } else {
      for (const field of requiredFields) {
        if (!data.factBox[field] || !String(data.factBox[field]).trim()) {
          missing.push(`factBox.${field}`);
        }
      }
    }

    // faq with min 3
    if (!data.faq || !Array.isArray(data.faq)) {
      missing.push("faq");
    } else if (data.faq.length < 3) {
      missing.push(`faq (${data.faq.length}/3 minimum)`);
    }

    // keywords
    if (
      !data.keywords ||
      !Array.isArray(data.keywords) ||
      data.keywords.length === 0
    ) {
      missing.push("keywords");
    }
  }

  if (fileType === "country" || fileType === "city") {
    // faq with min 3
    if (!data.faq || !Array.isArray(data.faq)) {
      missing.push("faq");
    } else if (data.faq.length < 3) {
      missing.push(`faq (${data.faq.length}/3 minimum)`);
    }
  }

  return {
    name: "Required elements",
    pass: missing.length === 0,
    details: missing.length > 0 ? `Missing: ${missing.join(", ")}` : undefined,
  };
}

// ═══════════════════════════════════════
// Main
// ═══════════════════════════════════════

function collectFiles(dir: string, fileType: FileType): { path: string; type: FileType }[] {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ path: path.join(fullDir, f), type: fileType }));
}

function validateFile(filePath: string, fileType: FileType): FileReport {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: body } = matter(raw);

  const checks: CheckResult[] = [
    checkBudgetTableMath(body),
    checkCurrencyConsistency(body),
    checkBudgetConsistency(data, body, fileType),
    checkWordCount(body, fileType),
    checkInternalLinks(body, fileType),
    checkRequiredElements(data, fileType),
  ];

  // Relative path for display
  const rel = path.relative(process.cwd(), filePath).replace(/\\/g, "/");

  return { filePath: rel, fileType, checks };
}

function main() {
  const root = process.cwd();

  const files = [
    ...collectFiles(path.join(root, "content/posts"), "post"),
    ...collectFiles(path.join(root, "content/countries"), "country"),
    ...collectFiles(path.join(root, "content/cities"), "city"),
  ];

  if (files.length === 0) {
    console.log("No content files found.");
    process.exit(0);
  }

  console.log(
    `\n${BOLD}${"═".repeat(50)}${RESET}`
  );
  console.log(`${BOLD} VALIDATION REPORT — hufsha.today${RESET}`);
  console.log(
    `${BOLD}${"═".repeat(50)}${RESET}\n`
  );

  let totalPass = 0;
  let totalFail = 0;
  const failedFiles: { file: string; details: string }[] = [];

  for (const file of files) {
    const report = validateFile(file.path, file.type);
    const fileLabel = `${report.filePath} ${DIM}(${report.fileType})${RESET}`;
    console.log(`${BOLD}${fileLabel}${RESET}`);

    for (const check of report.checks) {
      if (check.pass) {
        totalPass++;
        const extra = check.details ? ` ${DIM}(${check.details})${RESET}` : "";
        console.log(`  ${GREEN}PASS${RESET}  ${check.name}${extra}`);
      } else {
        totalFail++;
        console.log(`  ${RED}FAIL${RESET}  ${check.name}`);
        if (check.details) {
          console.log(`        ${YELLOW}${check.details}${RESET}`);
        }
        failedFiles.push({
          file: report.filePath,
          details: `${check.name}: ${check.details || ""}`,
        });
      }
    }
    console.log();
  }

  console.log(`${BOLD}${"═".repeat(50)}${RESET}`);
  console.log(
    `${BOLD} SUMMARY: ${GREEN}${totalPass} PASS${RESET}${BOLD}, ${
      totalFail > 0 ? RED : GREEN
    }${totalFail} FAIL${RESET}${BOLD} across ${files.length} files${RESET}`
  );
  console.log(`${BOLD}${"═".repeat(50)}${RESET}`);

  if (failedFiles.length > 0) {
    console.log(`\n${RED}${BOLD}Failed checks:${RESET}`);
    for (const f of failedFiles) {
      console.log(`  ${RED}${f.file}${RESET}: ${f.details}`);
    }
    console.log();
    process.exit(1);
  } else {
    console.log(`\n${GREEN}All checks passed.${RESET}\n`);
    process.exit(0);
  }
}

main();
