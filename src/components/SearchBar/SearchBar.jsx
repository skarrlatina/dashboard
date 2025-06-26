import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ searchQuery, setSearchQuery, placeholder = "Пошук завдань..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200 text-sm"
        placeholder={placeholder}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
} 