import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 px-6 border-t border-gray-300 dark:border-gray-600 sticky bottom-0">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>{new Date().getFullYear()} Trịnh Tông Hiệp - TEST FRONTEND INTERN — TODO APP</p>
      </div>
    </footer>
  );
};

export default Footer;