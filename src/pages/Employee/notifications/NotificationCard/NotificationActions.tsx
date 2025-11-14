export default function NotificationActions({ text, href }: { text: string; href: string }) {
  return (
    <a href={href} className="text-blue-600 text-sm hover:underline whitespace-nowrap">
      {text}
    </a>
  );
}
