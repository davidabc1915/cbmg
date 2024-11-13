import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Target, CheckSquare, FileText } from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pacientes', icon: Users, label: 'Pacientes' },
  { path: '/sessoes', icon: Calendar, label: 'Sessões' },
  { path: '/metas', icon: Target, label: 'Metas' },
  { path: '/checklists', icon: CheckSquare, label: 'Checklists' },
  { path: '/relatorios', icon: FileText, label: 'Relatórios' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">Dashboard Terapêutico</h1>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}