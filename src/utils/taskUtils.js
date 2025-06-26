import { STAGES, STATUS_LABELS } from "../constants";

export function filterTasks(tasks, filters) {
  return tasks.filter((task) => {
    const { filterDept, filterType, filterPriority, filterStatus, searchQuery } = filters;
    
    // Поиск по тексту
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const searchableFields = [
        task.name,
        task.department,
        task.type,
        task.assignee || ''
      ].map(field => field.toLowerCase());
      
      const hasMatch = searchableFields.some(field => field.includes(query));
      if (!hasMatch) return false;
    }
    
    return (
      (filterDept === "" || task.department === filterDept) &&
      (filterType === "" || task.type === filterType) &&
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterStatus === "" || Object.values(task.stages).some(s => s === filterStatus))
    );
  });
}

export function calculateTaskProgress(task) {
  const completedStages = Object.values(task.stages).filter(s => s === 'done').length;
  return Math.round((completedStages / STAGES.length) * 100);
}

export function getTaskMainStatus(task) {
  const stages = Object.values(task.stages || {});
  if (stages.every(s => s === 'done')) return 'done';
  if (stages.some(s => s === 'inProgress')) return 'inProgress';
  return 'todo';
}

export function generateTaskId(tasks) {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

export function createTaskHistoryEntry(action, description) {
  return {
    date: new Date().toLocaleString(),
    action,
    description
  };
}

export function getTaskStats(tasks) {
  const stats = { done: 0, inProgress: 0, todo: 0 };
  tasks.forEach(task => {
    const status = getTaskMainStatus(task);
    stats[status]++;
  });
  return stats;
} 