export default function About() {
  return (
    <section className="py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3">About This Project</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Learn more about me and the work behind this assignment 🚀
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto text-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">👋 Hi, I’m Anish Das</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          I am a <span className="font-semibold">pre-final year student</span> 
          of <span className="font-semibold">Information Technology</span> at 
          <span className="font-semibold"> Jadavpur University</span>.  
          This project is part of my <span className="font-semibold">remote internship assignment</span>.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          The assignment was built using{" "}
          <span className="font-semibold text-blue-600">React.js</span> 
          and styled with{" "}
          <span className="font-semibold text-indigo-600">Tailwind CSS</span>.  
          It demonstrates <span className="font-semibold">client-side routing</span> 
          with <code className="bg-slate-100 px-1 rounded">react-router-dom</code>, 
          along with modern responsive design.
        </p>
        <p className="text-slate-700 leading-relaxed">
          My goal was to create a clean and user-friendly application that 
          highlights the use of React Router, dynamic routes, and Tailwind utilities.  
          This project gave me hands-on experience with building SPA navigation and UI styling.
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-blue-700 mb-2">⚛️ React.js</h3>
          <p className="text-sm text-slate-600">Component-based UI development.</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-indigo-700 mb-2">🎨 Tailwind CSS</h3>
          <p className="text-sm text-slate-600">Utility-first responsive design.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="font-semibold text-green-700 mb-2">🧭 React Router</h3>
          <p className="text-sm text-slate-600">Seamless client-side routing.</p>
        </div>
      </div>
    </section>
  );
}
