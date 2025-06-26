import { useState, useRef, Suspense, lazy } from "react";
import "./index.css";
import Filters from "/src/components/Filters";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import Toasts from "./components/Toasts";
import { DeleteConfirmModal } from "./components/Modals";
import { StatusIcons } from "./components/StatusIcons";
import { useToast } from "./hooks";
import { 
  STAGES, 
  STATUS_COLORS, 
  PRIORITY_COLORS, 
  PRIORITY_LABELS, 
  STATUS_LABELS,
  INITIAL_TASKS 
} from "./constants";
import { 
  exportTasksToCSV, 
  exportTasksToPDF,
  filterTasks,
  calculateTaskProgress,
  generateTaskId,
  createTaskHistoryEntry
} from "./utils";
import { FiChevronDown, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const ChartsModal = lazy(() => import("./components/TaskCharts"));

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filterDept, setFilterDept] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  const { toasts, showToast, removeToast } = useToast();

  const filteredTasks = filterTasks(tasks, { 
    filterDept, 
    filterType, 
    filterPriority, 
    filterStatus,
    searchQuery
  });

  const toggleStatus = (taskId, stageName) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;
      const currentStatus = task.stages[stageName];
      const nextStatus =
        currentStatus === "todo"
          ? "inProgress"
          : currentStatus === "inProgress"
          ? "done"
          : "todo";
      return {
        ...task,
        stages: {
          ...task.stages,
          [stageName]: nextStatus,
        },
        history: [
          createTaskHistoryEntry('status', `Етап "${stageName}" змінено на "${STATUS_LABELS[nextStatus]}"`),
          ...(task.history || [])
        ]
      };
    });
    setTasks(newTasks);
    showToast("Статус етапу оновлено");
  };

  const departments = [...new Set(tasks.map((t) => t.department))];
  const types = [...new Set(tasks.map((t) => t.type))];
  const priorities = [...new Set(tasks.map((t) => t.priority))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-8 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-32 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg rotate-45 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-lg rotate-12 animate-bounce" style={{animationDelay: '2.5s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-40 right-40 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-40 left-40 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-green-400/40 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-pink-400/40 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      <Toasts toasts={toasts} removeToast={removeToast} />
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-1 relative z-10" style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Інтерактивна карта виробництва</h1>
            <p className="text-gray-500 text-lg relative z-10">Відстежуйте статус виробничих процесів в реальному часі</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
            }}>
              <span className="w-3 h-3 rounded-full bg-green-400 shadow-lg"></span>
              <span className="text-sm text-gray-700 font-medium">Виконано: {tasks.filter(t => Object.values(t.stages).every(s => s === 'done')).length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
            }}>
              <span className="w-3 h-3 rounded-full bg-blue-400 shadow-lg"></span>
              <span className="text-sm text-gray-700 font-medium">В роботі: {tasks.filter(t => Object.values(t.stages).some(s => s === 'inProgress')).length}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
            }}>
              <span className="w-3 h-3 rounded-full bg-gray-300 shadow-lg"></span>
              <span className="text-sm text-gray-700 font-medium">Всього: {tasks.length}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base flex items-center gap-2 group transform hover:-translate-y-1"
            onClick={() => { setShowForm(true); setEditingTask(null); }}
          >
            <FiPlus className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            Створити завдання
          </button>
          
          <div className="flex gap-2 ml-auto">
            <button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm flex items-center gap-1 transform hover:-translate-y-0.5"
              onClick={() => exportTasksToCSV(filteredTasks)}
            >
              <span className="animate-pulse">📊</span> CSV
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm flex items-center gap-1 transform hover:-translate-y-0.5"
              onClick={() => exportTasksToPDF(filteredTasks)}
            >
              <span className="animate-bounce">📄</span> PDF
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-sm flex items-center gap-1 transform hover:-translate-y-0.5"
              onClick={() => setShowCharts(true)}
            >
              <span className="animate-pulse">📈</span> Графіки
            </button>
          </div>
        </div>

        {/* Filters */}
        <Filters
          filterDept={filterDept}
          setFilterDept={setFilterDept}
          filterType={filterType}
          setFilterType={setFilterType}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          departments={departments}
          types={types}
          priorities={priorities}
          showToast={showToast}
        />

        {/* Search and Actions Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="flex-1 min-w-0">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Пошук за назвою, відділом, типом робіт або відповідальним..."
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
            }}>
              <span className="w-2 h-2 rounded-full bg-blue-400 shadow-lg"></span>
              <span>Знайдено: {filteredTasks.length}</span>
            </div>
          </div>
        </div>

        {/* Modal for TaskForm (Create/Edit) */}
        {(showForm || editingTask) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="relative w-full max-w-2xl mx-auto">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 text-2xl font-bold z-10"
                onClick={() => { setShowForm(false); setEditingTask(null); }}
                aria-label="Закрити форму"
              >
                ×
              </button>
              <TaskForm
                onCreate={(task) => {
                  if (editingTask) {
                    setTasks(tasks.map(t => t.id === editingTask.id ? {
                      ...t,
                      ...task,
                      deadline: task.deadline,
                      assignee: task.assignee,
                      history: [
                        createTaskHistoryEntry('edit', 'Завдання відредаговано'),
                        ...(t.history || [])
                      ]
                    } : t));
                    showToast("Завдання оновлено");
                  } else {
                    const id = generateTaskId(tasks);
                    setTasks([
                      ...tasks,
                      {
                        ...task,
                        id,
                        creationDate: new Date().toISOString(),
                        deadline: task.deadline,
                        assignee: task.assignee,
                        stages: Object.fromEntries(STAGES.map(s => [s, "todo"])),
                        history: [
                          createTaskHistoryEntry('created', 'Завдання створено')
                        ]
                      },
                    ]);
                    showToast("Завдання створено");
                  }
                  setShowForm(false);
                  setEditingTask(null);
                }}
                onCancel={() => { setShowForm(false); setEditingTask(null); }}
                departments={departments}
                types={types}
                priorities={priorities}
                initialValues={editingTask}
              />
            </div>
          </div>
        )}

        {showCharts && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 text-2xl font-bold z-10"
                onClick={() => setShowCharts(false)}
                aria-label="Закрити графіки"
              >
                ×
              </button>
              <Suspense fallback={<div>Завантаження графіків...</div>}>
                <ChartsModal tasks={tasks} />
              </Suspense>
            </div>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-10 text-center flex flex-col items-center relative" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
            boxShadow: '0 15px 35px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}>
            <p className="text-gray-400 text-lg relative z-10">
              {searchQuery || filterDept || filterType || filterPriority || filterStatus 
                ? "Завдань за обраними критеріями не знайдено" 
                : "Завдань поки немає"}
            </p>
            {(searchQuery || filterDept || filterType || filterPriority || filterStatus) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterDept("");
                  setFilterType("");
                  setFilterPriority("");
                  setFilterStatus("");
                  showToast("Всі фільтри скинуто");
                }}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-lg font-semibold text-sm hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Скинути всі фільтри
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`group bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 ${expandedTask === task.id ? 'ring-2 ring-blue-300 scale-[1.01]' : ''} transform hover:-translate-y-1`}
                style={{ 
                  boxShadow: expandedTask === task.id 
                    ? '0 20px 40px 0 rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.2)' 
                    : '0 10px 25px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
                }}
              >
                <div 
                  className={`p-5 cursor-pointer flex justify-between items-start border-b ${PRIORITY_COLORS[task.priority]} transition-colors duration-300`}
                  onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-800">{task.name}</h2>
                      <span className={`px-3 py-1 text-xs rounded-full shadow ${task.priority === 'high' ? 'bg-red-500/90 text-white' : task.priority === 'medium' ? 'bg-yellow-400/90 text-white' : 'bg-green-500/90 text-white'}`}>{PRIORITY_LABELS[task.priority]}</span>
                      <div className={`flex gap-1 transition-opacity duration-200 ${expandedTask === task.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                          onClick={e => { e.stopPropagation(); setEditingTask(task); setShowForm(false); }}
                          title="Редагувати"
                          tabIndex={0}
                        >
                          <FiEdit2 className="text-sm transition-transform duration-300 hover:rotate-12" />
                          <span className="hidden md:inline">Редагувати</span>
                        </button>
                        <button
                          className="flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 text-sm font-medium px-2 py-1 rounded-lg border border-red-200 bg-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                          onClick={e => { e.stopPropagation(); setDeleteTaskId(task.id); }}
                          title="Видалити"
                          tabIndex={0}
                        >
                          <FiTrash2 className="text-sm transition-transform duration-300 hover:rotate-12" />
                          <span className="hidden md:inline">Видалити</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs text-gray-500">
                      <p>
                        <span className="font-medium">Відділ:</span> {task.department}
                      </p>
                      <p>
                        <span className="font-medium">Тип:</span> {task.type}
                      </p>
                      <p>
                        <span className="font-medium">Створено:</span> {task.creationDate ? new Date(task.creationDate).toLocaleDateString() : '—'}
                      </p>
                      {task.deadline && (
                        <p>
                          <span className="font-medium">Дедлайн:</span> {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      )}
                      {task.assignee && (
                        <p>
                          <span className="font-medium">Відповідальний:</span> {task.assignee}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className={`text-gray-400 hover:text-blue-500 text-xl transition-transform duration-300 ${expandedTask === task.id ? 'rotate-180' : ''}`}
                    tabIndex={-1}
                  >
                    <FiChevronDown />
                  </button>
                </div>
                <div className={`transition-all duration-500 overflow-hidden bg-gradient-to-br from-white/80 to-blue-50 ${expandedTask === task.id ? 'max-h-[600px] p-6 opacity-100' : 'max-h-0 p-0 opacity-0'}`}
                  style={{ transitionProperty: 'max-height, padding, opacity' }}
                >
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Прогрес</h3>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                        style={{
                          width: `${calculateTaskProgress(task)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculateTaskProgress(task)}% завершено
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {STAGES.map((stage) => (
                      <div key={stage} className="flex flex-col items-center">
                        <button
                          onClick={() => toggleStatus(task.id, stage)}
                          className={`w-full px-3 py-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 ${STATUS_COLORS[task.stages[stage]]}`}
                          style={{ boxShadow: task.stages[stage] === 'inProgress' ? '0 2px 8px 0 rgba(59,130,246,0.10)' : task.stages[stage] === 'done' ? '0 2px 8px 0 rgba(34,197,94,0.10)' : undefined }}
                        >
                          <span className="mb-1">
                            <StatusIcons status={task.stages[stage]} />
                          </span>
                          <span className="text-sm font-semibold">{stage}</span>
                        </button>
                        <div className="mt-2 text-xs text-gray-400 capitalize">
                          {task.stages[stage] === 'todo' ? 'не розпочато' : 
                           task.stages[stage] === 'inProgress' ? 'в роботі' : 'завершено'}
                        </div>
                      </div>
                    ))}
                  </div>
                  {expandedTask === task.id && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-700">Історія змін</h4>
                        {(task.history && task.history.length > 0) && (
                          <button
                            className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-sm"
                            onClick={e => {
                              e.stopPropagation();
                              setTasks(tasks.map(t => t.id === task.id ? { ...t, history: [] } : t));
                              showToast('Історію очищено');
                            }}
                          >
                            Очистити історію
                          </button>
                        )}
                      </div>
                      <ul className="text-xs text-gray-500 space-y-1 max-h-40 overflow-y-auto pr-2">
                        {(task.history || []).map((h, i) => (
                          <li key={i} className="border-l-2 border-blue-200 pl-2">
                            <span className="font-mono text-[11px] text-gray-400">{h.date}</span> — {h.description}
                          </li>
                        ))}
                        {(!task.history || task.history.length === 0) && (
                          <li className="text-gray-400">Немає історії змін</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete confirmation modal */}
        <DeleteConfirmModal
          isOpen={deleteTaskId !== null}
          onConfirm={() => {
            setTasks(tasks.filter(t => t.id !== deleteTaskId));
            setDeleteTaskId(null);
            showToast('Завдання видалено');
          }}
          onCancel={() => setDeleteTaskId(null)}
        />
      </div>
    </div>
  );
}