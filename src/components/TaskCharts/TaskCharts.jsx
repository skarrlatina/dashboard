import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function TaskCharts({ tasks }) {
  const getTaskStats = (tasks) => {
    const stats = { done: 0, inProgress: 0, todo: 0 };
    tasks.forEach(task => {
      const stages = Object.values(task.stages || {});
      if (stages.every(s => s === 'done')) stats.done++;
      else if (stages.some(s => s === 'inProgress')) stats.inProgress++;
      else stats.todo++;
    });
    return stats;
  };

  const stats = getTaskStats(tasks);
  const data = [
    { name: 'Завершено', value: stats.done, color: '#10B981' },
    { name: 'В роботі', value: stats.inProgress, color: '#3B82F6' },
    { name: 'Не розпочато', value: stats.todo, color: '#6B7280' },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">Прогрес завдань</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.done}</div>
          <div className="text-sm text-green-700">Завершено</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="text-sm text-blue-700">В роботі</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{stats.todo}</div>
          <div className="text-sm text-gray-700">Не розпочато</div>
        </div>
      </div>
    </div>
  );
} 