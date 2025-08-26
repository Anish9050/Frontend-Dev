export default function Home() {
  return (
    <section className="py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 rounded-2xl shadow-xl text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          Welcome to My Router App 🚀
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-blue-100">
          A simple yet powerful project that demonstrates{" "}
          <span className="font-semibold text-white">client-side routing</span> 
          in React using{" "}
          <code className="bg-white/20 px-2 py-1 rounded">react-router-dom</code>, 
          styled with {" "}
          <span className="font-semibold text-white">Tailwind CSS</span>.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-8 border hover:shadow-lg hover:-translate-y-1 transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">⚡ Fast Navigation</h2>
          <p className="text-slate-600 text-base">
            Navigate between pages instantly without a full browser refresh.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 border hover:shadow-lg hover:-translate-y-1 transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">🎨 Tailwind Styling</h2>
          <p className="text-slate-600 text-base">
            Build beautiful, responsive layouts quickly using utility-first CSS.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8 border hover:shadow-lg hover:-translate-y-1 transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">🔗 Dynamic Routes</h2>
          <p className="text-slate-600 text-base">
            Visit <code className="bg-slate-100 px-1 rounded">/users/:id</code> 
            to see dynamic user profiles in action.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105">
          🚀 Get Started
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-20 bg-white border-t shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} <span className="font-semibold">My Router App</span> · Built with <span className="font-semibold">Anish Das</span>
        </div>
      </footer>
    </section>
  );
}
