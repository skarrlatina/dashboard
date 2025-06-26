export default function DeleteConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center relative">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Підтвердіть видалення</h3>
        <p className="mb-6 text-gray-600">Ви дійсно хочете видалити це завдання? Цю дію не можна скасувати.</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base transform hover:-translate-y-1"
            onClick={onConfirm}
          >
            Видалити
          </button>
          <button
            className="px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base transform hover:-translate-y-1"
            onClick={onCancel}
          >
            Скасувати
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 text-2xl font-bold z-10"
          onClick={onCancel}
          aria-label="Закрити діалог"
        >
          ×
        </button>
      </div>
    </div>
  );
} 