# 🗺️ Інтерактивна Карта Виробництва

**Веб-додаток для моніторингу виробничих процесів у реальному часі з сучасним UI, графіками, фільтрами та експортом.**

![Tech](https://img.shields.io/badge/React-18+-informational?style=flat-square&logo=react) 
![Tailwind](https://img.shields.io/badge/TailwindCSS-Ready-blue?style=flat-square&logo=tailwindcss)
![PDF Export](https://img.shields.io/badge/PDF%20Export-Enabled-success?style=flat-square&logo=adobeacrobatreader)
![CSV Export](https://img.shields.io/badge/CSV%20Export-Supported-success?style=flat-square&logo=files)

---

## 🚀 Функціональність

- ✅ Створення та редагування завдань  
- ✅ Управління статусами етапів  
- ✅ Фільтрація по відділу, пріоритету, типу, статусу  
- ✅ Експорт в **CSV** та **PDF**  
- ✅ Кругові діаграми прогресу  
- ✅ Історія змін  
- ✅ Системні toast-повідомлення  
- ✅ Повністю адаптивний інтерфейс  

---

## 🧠 Архітектура

```
src/
├── components/        # UI-компоненти
│   ├── TaskForm/      # Форма завдань
│   ├── Filters/       # Панель фільтрів
│   ├── Toasts/        # Повідомлення
│   ├── Modals/        # Модальні вікна
│   └── TaskCharts/    # Графіки прогресу
├── constants/         # Константи (статуси, кольори тощо)
├── utils/             # Експорт, фільтрація, статистика
├── hooks/             # Кастомні React-хуки
├── App.jsx            # Головний компонент
└── main.jsx           # Точка входу
```

---

## 📊 Компоненти

### 🎯 TaskForm
Форма для створення та редагування завдань:  
> Назва • Відділ • Тип робіт • Пріоритет • Дедлайн • Відповідальний

### 🧩 Filters
Потужний фільтр по:
- Відділу
- Типу робіт
- Пріоритету
- Статусу

### 📈 TaskCharts
Кругова діаграма прогресу:
- ✅ Завершено
- 🔄 В роботі
- ⏳ Не розпочато

---

## 🧰 Утиліти

| Файл              | Функції                                                                 |
|-------------------|--------------------------------------------------------------------------|
| `exportUtils.js`  | `exportTasksToCSV()`, `exportTasksToPDF()`                              |
| `taskUtils.js`    | `filterTasks()`, `getTaskStats()`, `calculateTaskProgress()` та ін.     |
| `useToast.js`     | `showToast()`, `removeToast()`, `toasts`                                |

---

## 📦 Технології

- ⚛️ **React**
- 🎨 **Tailwind CSS**
- 📊 **Recharts**
- 📄 **jsPDF + AutoTable**
- 📁 **Papa Parse**
- 💡 **React Icons**

---

## ⚙️ Встановлення

```bash
# Клонування репозиторію
git clone https://github.com/your-username/production-map.git
cd production-map

# Встановлення залежностей
npm install

# Запуск у режимі розробки
npm run dev
```

---

## 📁 Константи

```js
// taskConstants.js
STAGES          // Етапи виробництва
STATUS_COLORS   // Кольори статусів
STATUS_ICONS    // Іконки
PRIORITY_LABELS // Мітки пріоритетів
```

---

## 🧩 Особливості

- 🧱 **Модульна структура**
- 📚 **Централізовані константи**
- 🔁 **Утиліти з JSDoc-документацією**
- 🔥 **Кастомні хуки для логіки**
- 💼 **Індексні файли для зручного імпорту**

---

## 📸 Скриншоти (опціонально)

> *Тут можна додати GIF або зображення роботи інтерфейсу*

---

## 📝 Ліцензія

Цей проект розповсюджується під ліцензією [MIT](LICENSE).

---

> 💬 Питання? Пропозиції? Відкрийте issue або створіть pull request — будемо раді!