interface Props {
  text: string;
}

export default function TldrBox({ text }: Props) {
  return (
    <div className="bg-teal-light border-r-4 border-teal rounded-lg py-5 px-6 mb-8">
      <p className="text-dark text-base leading-relaxed font-medium m-0">
        <strong>בקצרה: </strong>{text}
      </p>
    </div>
  );
}
