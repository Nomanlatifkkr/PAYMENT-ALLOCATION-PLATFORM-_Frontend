import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../common/Sidebar';
import Button from '../ui/Button';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';

const DashboardLayout = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={isDesktop ? true : sidebarOpen}
        onClose={closeSidebar}
        isDesktop={isDesktop}
      />

      {/* Mobile overlay */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          isDesktop ? 'ml-64' : 'ml-0'
        )}
      >
        {/* Mobile header with hamburger */}
        {!isDesktop && (
          <header className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-sm border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              SplitEdge
            </h1>
          </header>
        )}

        {/* Page content */}
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;