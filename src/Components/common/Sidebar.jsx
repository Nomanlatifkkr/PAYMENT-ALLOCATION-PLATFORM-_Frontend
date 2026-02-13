import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Landmark,
  Percent,
  BarChart3,
  BookOpen,
  ArrowRightLeft,
  Plug,
  Crown,
  User,
  Settings,
  ChevronDown,
  X,
  Receipt,
  FileDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuSections = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    ],
  },
  {
    title: 'ALLOCATIONS',
    items: [
      { name: 'Destinations', icon: Landmark, path: '/destinations' },
      { name: 'Allocation Rules', icon: Percent, path: '/rules' },
    ],
  },
  {
    title: 'TRANSACTIONS',
    items: [
      { name: 'Payments', icon: Receipt, path: '/payments' },
      { name: 'Transfers', icon: ArrowRightLeft, path: '/transfers' },
      { name: 'Ledger', icon: BookOpen, path: '/ledger' },
    ],
  },
  {
    title: 'REPORTING',
    items: [
      { name: 'Reports', icon: BarChart3, path: '/reports' },
      
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'Stripe Connection', icon: Plug, path: '/stripe' },
      { name: 'Subscription', icon: Crown, path: '/subscription' },
      { name: 'Account', icon: User, path: '/account' },
      { name: 'Settings', icon: Settings, path: '/settings' },
    ],
  },
];

const Sidebar = ({ isOpen, onClose, isDesktop }) => {
  const [openSections, setOpenSections] = useState(() => {
    const initialState = {};
    menuSections.forEach((_, idx) => {
      initialState[idx] = true; // All sections open by default
    });
    return initialState;
  });

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 ease-in-out',
        isDesktop
          ? 'translate-x-0'
          : isOpen
          ? 'translate-x-0'
          : '-translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          SplitEdge
        </h1>

        {!isDesktop && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
        {menuSections.map((section, idx) => (
          <div key={section.title} className="space-y-1">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(idx)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
            >
              <span>{section.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-300',
                  openSections[idx] ? 'rotate-0' : '-rotate-90'
                )}
              />
            </button>

            {/* Section Items */}
            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                openSections[idx]
                  ? 'grid-rows-[1fr] opacity-100 mt-1'
                  : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        onClick={() => !isDesktop && onClose()}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            'hover:bg-surface-hover hover:text-text-primary',
                            isActive
                              ? 'bg-primary/10 text-primary border-l-4 border-primary pl-[calc(0.75rem-4px)]'
                              : 'text-text-secondary'
                          )
                        }
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Jevline kiet</p>
            <p className="text-xs text-text-tertiary truncate">
              jevline@splitedge.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;