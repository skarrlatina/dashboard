export default function Toasts({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white/90 border border-blue-100 shadow-lg rounded-xl px-5 py-3 min-w-[220px] flex items-center gap-3 animate-fade-in-up"
        >
          <span className="text-blue-500 text-lg">ℹ️</span>
          <span className="text-gray-800 text-sm font-medium flex-1">{toast.message}</span>
          <button
            className="text-gray-400 hover:text-blue-500 text-lg ml-2"
            onClick={() => removeToast(toast.id)}
            aria-label="Закрити повідомлення"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
} 