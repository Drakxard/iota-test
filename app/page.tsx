import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">IOTA IoT Dashboard</h1>
      <Dashboard />
    </div>
  );
}