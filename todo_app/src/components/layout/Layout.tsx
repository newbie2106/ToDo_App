import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;