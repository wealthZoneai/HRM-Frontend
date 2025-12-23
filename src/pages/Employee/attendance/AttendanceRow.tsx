interface Props {
  date: string;
  login: string;
  logout: string;
  hours: string;
  status: string;
}

export default function AttendanceRow({
  date,
  login,
  logout,
  hours,
  status,
}: Props) {
  return (
    <tr>
      <td className="py-2 px-3">{date}</td>
      <td className="py-2 px-3">{login}</td>
      <td className="py-2 px-3">{logout}</td>
      <td className="py-2 px-3">{hours}</td>
      <td className="py-2 px-3 capitalize">{status}</td>
    </tr>
  );
}
