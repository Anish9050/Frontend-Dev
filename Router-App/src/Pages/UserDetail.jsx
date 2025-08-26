import { useParams, Link } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Anish Das", role: "Frontend Developer" },
  { id: 2, name: "Ankita Dhara", role: "UI/UX Designer" },
  { id: 3, name: "Aritra Sarkar", role: "Backend Engineer" },
  { id: 4, name: "Aritra Mondal", role: "DevOps Enthusiast" },
  { id: 5, name: "Kaustav Mondal", role: "Data Scientist" },
  { id: 6, name: "Anuska Nath", role: "Fullstack Developer" },
  { id: 7, name: "Ayushman Ghosh", role: "AI/ML Enthusiast" },
  { id: 8, name: "Saptaparna Bagchi", role: "Cybersecurity Student" },
];

export default function UserDetail() {
  const { id } = useParams();
  const user = mockUsers.find((u) => u.id === parseInt(id));

  if (!user) {
    return (
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-red-600 mb-4">User Not Found</h1>
        <Link
          to="/users"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Users
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 flex flex-col items-center">
      {/* Avatar */}
      <div className="w-28 h-28 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow">
        {user.name.charAt(0)}
      </div>

      {/* User Info */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2">{user.name}</h1>
      <p className="text-lg text-slate-600 mb-6">{user.role}</p>

      {/* Description */}
      <p className="max-w-xl text-center text-slate-700 leading-relaxed mb-8">
        {user.name} is my college mate.I have been very friendly with them . 
        This profile page is rendered dynamically using the route parameter 
        <code className="bg-slate-100 px-1 rounded"> :id </code>.  
        It shows how React Router can load details for different users efficiently.
      </p>

      {/* Back Button */}
      <Link
        to="/users"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        ← Back to Users
      </Link>
    </section>
  );
}
