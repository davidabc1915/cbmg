import { ChecklistProgress } from '../../types';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface ESDMProgressProps {
  progress: ChecklistProgress[];
}

export function ESDMProgress({ progress }: ESDMProgressProps) {
  const data = progress.map((p) => ({
    name: p.categoryId,
    value: p.percentage,
    fill: `hsl(${(p.percentage * 1.2)}, 70%, 50%)`
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            cornerRadius={30}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {progress.find(p => p.categoryId === data.name)?.categoryId}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {Math.round(data.value)}% concluído
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}