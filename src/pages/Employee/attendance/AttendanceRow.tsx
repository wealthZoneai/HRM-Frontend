export default function AttendanceRow({ date, login, logout, hours, status }: any) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-3 px-4">{date}</td>
      <td className="py-3 px-4">{login}</td>
      <td className="py-3 px-4">{logout}</td>
      <td className="py-3 px-4">{hours}</td>
      <td className="py-3 px-4">
        <span className="px-3 py-1 rounded-full text-white bg-blue-600 text-xs">
          {status}
        </span>
      </td>
    </tr>
  );
}
