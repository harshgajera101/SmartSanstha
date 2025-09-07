import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0A2240] text-white px-6 py-4 flex items-center justify-between">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <span className="font-bold text-lg">SmartSanstha</span>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-8 font-medium">
        <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
        <li><Link to="/learn" className="hover:text-yellow-300">Learn</Link></li>
        <li><Link to="/courtroom" className="hover:text-yellow-300">Courtroom Simulation</Link></li>
        <li><Link to="/games" className="hover:text-yellow-300">Explore Games</Link></li>
        <li><Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link></li>
      </ul>

      {/* Profile Icon */}
      <div>
        <img src="/profile.png" alt="User" className="h-10 w-10 rounded-full border-2 border-white" />
      </div>
    </nav>
  );
}
