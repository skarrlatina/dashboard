export const STAGES = ["Проектування", "Моделювання", "Обробка", "Тестування", "Доставка"];

export const STATUS_COLORS = {
  todo: "bg-gray-100 hover:bg-gray-200 text-gray-500 border border-gray-200",
  inProgress: "bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-200",
  done: "bg-green-100 hover:bg-green-200 text-green-600 border border-green-200",
};

export const STATUS_ICON_CLASSES = {
  todo: "text-gray-400",
  inProgress: "animate-spin text-blue-500",
  done: "text-green-500",
};

export const PRIORITY_COLORS = {
  high: "bg-red-50 border-red-200",
  medium: "bg-yellow-50 border-yellow-200",
  low: "bg-green-50 border-green-200",
};

export const PRIORITY_LABELS = {
  high: "Високий",
  medium: "Середній",
  low: "Низький",
};

export const STATUS_LABELS = {
  todo: 'Не розпочато',
  inProgress: 'В роботі',
  done: 'Завершено',
};

export const INITIAL_TASKS = [
  {
    id: 1,
    name: "Завдання A",
    department: "Проєктування",
    type: "3D-моделювання",
    priority: "high",
    creationDate: "2024-01-15T10:00:00.000Z",
    stages: {
      "Проектування": "done",
      "Моделювання": "inProgress",
      "Обробка": "todo",
      "Тестування": "todo",
      "Доставка": "todo",
    },
    history: [
      { date: "15.01.2024, 10:00:00", action: 'created', description: 'Завдання створено' }
    ],
  },
  {
    id: 2,
    name: "Завдання B",
    department: "Виробництво",
    type: "Тестування",
    priority: "medium",
    creationDate: "2024-01-16T14:30:00.000Z",
    stages: {
      "Проектування": "done",
      "Моделювання": "done",
      "Обробка": "done",
      "Тестування": "inProgress",
      "Доставка": "todo",
    },
    history: [
      { date: "16.01.2024, 14:30:00", action: 'created', description: 'Завдання створено' }
    ],
  },
  {
    id: 3,
    name: "Завдання C",
    department: "Логістика",
    type: "Доставка",
    priority: "low",
    creationDate: "2024-01-17T09:15:00.000Z",
    stages: {
      "Проектування": "done",
      "Моделювання": "done",
      "Обробка": "done",
      "Тестування": "done",
      "Доставка": "inProgress",
    },
    history: [
      { date: "17.01.2024, 09:15:00", action: 'created', description: 'Завдання створено' }
    ],
  },
]; 