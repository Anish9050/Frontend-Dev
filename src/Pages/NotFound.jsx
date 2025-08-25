import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-2">404</h1>
        <p className="mb-6 text-slate-600">Page not found.</p>
        <Link to="/" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Go Home</Link>
      </div>
    </div>
  );
}
