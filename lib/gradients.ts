export const destinationGradients: Record<string, string> = {
  'יוון': 'linear-gradient(135deg, #1565c0, #42a5f5, #ff8f00)',
  'greece': 'linear-gradient(135deg, #1565c0, #42a5f5, #ff8f00)',
  'איטליה': 'linear-gradient(135deg, #c62828, #ef5350, #ff6f00)',
  'italy': 'linear-gradient(135deg, #c62828, #ef5350, #ff6f00)',
  'קפריסין': 'linear-gradient(135deg, #00695c, #26a69a, #ffca28)',
  'cyprus': 'linear-gradient(135deg, #00695c, #26a69a, #ffca28)',
  'בודפשט': 'linear-gradient(135deg, #4a148c, #7b1fa2, #e040fb)',
  'budapest': 'linear-gradient(135deg, #4a148c, #7b1fa2, #e040fb)',
  'הונגריה': 'linear-gradient(135deg, #4a148c, #7b1fa2, #e040fb)',
  'hungary': 'linear-gradient(135deg, #4a148c, #7b1fa2, #e040fb)',
  'דובאי': 'linear-gradient(135deg, #bf360c, #ff6e40, #ffd740)',
  'dubai': 'linear-gradient(135deg, #bf360c, #ff6e40, #ffd740)',
  'תאילנד': 'linear-gradient(135deg, #e65100, #ff9800, #4caf50)',
  'thailand': 'linear-gradient(135deg, #e65100, #ff9800, #4caf50)',
  'פראג': 'linear-gradient(135deg, #1a237e, #5c6bc0, #ffb74d)',
  'prague': 'linear-gradient(135deg, #1a237e, #5c6bc0, #ffb74d)',
  'חיפה': 'linear-gradient(135deg, #0277bd, #29b6f6, #4fc3f7)',
  'haifa': 'linear-gradient(135deg, #0277bd, #29b6f6, #4fc3f7)',
};

const defaultGradient = 'linear-gradient(135deg, #E8862A, #0099AA)';

export function getDestinationGradient(destination: string): string {
  const key = destination.toLowerCase();
  return destinationGradients[key] || destinationGradients[destination] || defaultGradient;
}

export const categoryColors: Record<string, string> = {
  'עם ילדים': '#7b1fa2',
  'כשר': '#c17f24',
  'הפלגות': '#0277bd',
  'טיולים מאורגנים': '#2e7d32',
  'אטרקציות': '#c62828',
  'יעדים': '#E8862A',
  'מדריכים': '#1565c0',
};

export function getCategoryColor(category: string): string {
  return categoryColors[category] || '#0099AA';
}
