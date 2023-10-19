import { Header } from '@components/Header';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <main className="min-h-screen max-h-screen w-screen bg-zinc-800 text-white flex flex-col overflow-auto">
      <Header />

      <Outlet />
    </main>
  );
}
