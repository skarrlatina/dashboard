import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { STAGES, PRIORITY_LABELS, STATUS_LABELS } from "../constants";

export function exportTasksToCSV(tasks) {
  const data = tasks.map(task => ({
    Назва: task.name,
    Відділ: task.department,
    Тип: task.type,
    Пріоритет: PRIORITY_LABELS[task.priority],
    Дедлайн: task.deadline ? new Date(task.deadline).toLocaleDateString() : '',
    Відповідальний: task.assignee || '',
    ...Object.fromEntries(STAGES.map(s => [s, STATUS_LABELS[task.stages[s]] || task.stages[s]])),
  }));
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'tasks.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportTasksToPDF(tasks) {
  const doc = new jsPDF();
  const columns = [
    { header: 'Назва', dataKey: 'name' },
    { header: 'Відділ', dataKey: 'department' },
    { header: 'Тип', dataKey: 'type' },
    { header: 'Пріоритет', dataKey: 'priority' },
    { header: 'Дедлайн', dataKey: 'deadline' },
    { header: 'Відповідальний', dataKey: 'assignee' },
    ...STAGES.map(s => ({ header: s, dataKey: s })),
  ];
  const rows = tasks.map(task => ({
    name: task.name,
    department: task.department,
    type: task.type,
    priority: PRIORITY_LABELS[task.priority],
    deadline: task.deadline ? new Date(task.deadline).toLocaleDateString() : '',
    assignee: task.assignee || '',
    ...Object.fromEntries(STAGES.map(s => [s, STATUS_LABELS[task.stages[s]] || task.stages[s]])),
  }));
  autoTable(doc, { columns, body: rows, styles: { font: 'helvetica', fontSize: 10 } });
  doc.save('tasks.pdf');
} 