import { Link, useNavigate } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Anish Das", role: "Fullstack Developer" },
  { id: 2, name: "Ankita Dhara", role: "UI/UX Designer" },
  { id: 3, name: "Aritra Sarkar", role: "Backend Engineer" },
  { id: 4, name: "Aritra Mondal", role: "AI/ML Enthusiast" },
  { id: 5, name: "Kaustav Mondal", role: "Data Scientist" },
  { id: 6, name: "Anuska Nath", role: "Fullstack Developer" },
  { id: 7, name: "Ayushman Ghosh", role: "Digital Analog Expert" },
  { id: 8, name: "Saptaparna Bagchi", role: "Digital Analog Expert" },
];

export default function Users() {
  const navigate = useNavigate();

  return (
    <section className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700">Our Users</h1>
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-blue-600 text-white px-5 py-2 shadow hover:bg-blue-700 transition"
        >
          Go Home
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockUsers.map((u) => (
          <Link
            key={u.id}
            to={`/users/${u.id}`}
            className="block bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center"
          >
            {/* Avatar (placeholder circle) */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow">
              {u.name.charAt(0)}
            </div>
            {/* User Info */}
            <h2 className="text-lg font-semibold text-blue-700">{u.name}</h2>
            <p className="text-slate-500 text-sm">{u.role}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
