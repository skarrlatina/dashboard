import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function TaskForm({ onCreate, onCancel, departments, types, priorities, initialValues }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    type: "",
    priority: "medium",
    deadline: "",
    assignee: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        department: initialValues.department || "",
        type: initialValues.type || "",
        priority: initialValues.priority || "medium",
        deadline: initialValues.deadline ? new Date(initialValues.deadline).toISOString().split('T')[0] : "",
        assignee: initialValues.assignee || "",
      });
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department || !formData.type) {
      alert("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }
    onCreate(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {initialValues ? "Редагувати завдання" : "Створити нове завдання"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Назва завдання *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введіть назву завдання"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Відділ *
            </label>
            <div className="custom-select-wrap">
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 custom-select"
                required
              >
                <option value="">Оберіть відділ</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <span className="custom-select-arrow">
                <FiChevronDown size={20} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Тип робіт *
            </label>
            <div className="custom-select-wrap">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 custom-select"
                required
              >
                <option value="">Оберіть тип робіт</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <span className="custom-select-arrow">
                <FiChevronDown size={20} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Пріоритет
            </label>
            <div className="custom-select-wrap">
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 custom-select"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority === 'high' ? 'Високий' : priority === 'medium' ? 'Середній' : 'Низький'}
                  </option>
                ))}
              </select>
              <span className="custom-select-arrow">
                <FiChevronDown size={20} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Дедлайн
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Відповідальний
            </label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введіть ім'я відповідального"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold transform hover:-translate-y-1"
          >
            Скасувати
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold transform hover:-translate-y-1"
          >
            {initialValues ? "Оновити" : "Створити"}
          </button>
        </div>
      </form>
    </div>
  );
} 