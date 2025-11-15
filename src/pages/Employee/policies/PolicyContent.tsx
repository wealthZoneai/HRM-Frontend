interface Props {
  items: string[];
}

export default function PolicyContent({ items }: Props) {
  return (
    <ol className="mt-8 space-y-3 text-gray-600 leading-relaxed list-decimal list-inside">
      {items.map((text, index) => (
        <li key={index} className="text-base">
          {text}
        </li>
      ))}
    </ol>
  );
}