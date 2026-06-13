import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="pl-64">
        <div className="min-h-screen p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
