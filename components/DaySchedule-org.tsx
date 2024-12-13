import React from 'react';
import { format } from 'date-fns';

interface DayScheduleProps {
  date: Date;
}

const DaySchedule: React.FC<DayScheduleProps> = ({ date }) => {
  // この例では、ダミーのスケジュールデータを使用しています
  const schedules = [
    { time: '09:00', title: 'ミーティング' },
    { time: '13:00', title: 'ランチ' },
    { time: '15:00', title: 'プレゼンテーション' },
  ];

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-2">{format(date, 'EEEE, MMMM d')}</h3>
      <ul className="space-y-2">
        {schedules.map((schedule, index) => (
          <li key={index} className="flex">
            <span className="w-16 text-sm text-gray-500">{schedule.time}</span>
            <span>{schedule.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DaySchedule;

