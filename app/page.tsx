import WeeklySchedule from '../components/WeeklySchedule';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">週間スケジュール</h1>
      <WeeklySchedule />
    </main>
  );
}

