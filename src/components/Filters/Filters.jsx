import { FiChevronDown, FiFilter } from "react-icons/fi";

export default function Filters({ 
  filterDept, setFilterDept, 
  filterType, setFilterType, 
  filterPriority, setFilterPriority, 
  filterStatus, setFilterStatus,
  searchQuery, setSearchQuery,
  departments, types, priorities,
  onResetFilters, showToast
}) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-lg border p-4 md:p-6 mb-10 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
          <FiFilter className="text-blue-400" />
          Фільтри
        </div>
        <button
          onClick={() => {
            setFilterDept("");
            setFilterType("");
            setFilterPriority("");
            setFilterStatus("");
            setSearchQuery("");
            showToast("Фільтри скинуто");
          }}
          className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Скинути фільтри
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-semibold text-gray-600 mb-0.5">Відділ</label>
          <div className="custom-select-wrap">
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-gray-50 text-gray-700 font-medium transition custom-select hover:border-blue-300"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="">Всі відділи</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <span className="custom-select-arrow">
              <FiChevronDown size={20} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-semibold text-gray-600 mb-0.5">Тип робіт</label>
          <div className="custom-select-wrap">
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-gray-50 text-gray-700 font-medium transition custom-select hover:border-blue-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Всі типи робіт</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="custom-select-arrow">
              <FiChevronDown size={20} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-semibold text-gray-600 mb-0.5">Пріоритет</label>
          <div className="custom-select-wrap">
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-gray-50 text-gray-700 font-medium transition custom-select hover:border-blue-300"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Всі пріоритети</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <span className="custom-select-arrow">
              <FiChevronDown size={20} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-xs font-semibold text-gray-600 mb-0.5">Статус</label>
          <div className="custom-select-wrap">
            <select
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-gray-50 text-gray-700 font-medium transition custom-select hover:border-blue-300"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">Всі статуси</option>
              <option value="todo">Не розпочато</option>
              <option value="inProgress">В роботі</option>
              <option value="done">Завершено</option>
            </select>
            <span className="custom-select-arrow">
              <FiChevronDown size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 