import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Target, CheckSquare, FileText, X } from 'lucide-react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pacientes', icon: Users, label: 'Pacientes' },
  { path: '/sessoes', icon: Calendar, label: 'Sessões' },
  { path: '/metas', icon: Target, label: 'Metas' },
  { path: '/checklists', icon: CheckSquare, label: 'Checklists' },
  { path: '/relatorios', icon: FileText, label: 'Relatórios' }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay para telas móveis */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          flex flex-col
        `}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Dashboard Terapêutico
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
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
                    onClick={onClose}
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
    </>
  );
}