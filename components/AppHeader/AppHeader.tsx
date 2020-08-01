import React from 'react';
import styles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className="border-b border-gray-200">
      <div
        className={`${styles.headerGrid} grid gap-8 h-16 items-center container mx-auto px-4 max-w-6xl`}
      >
        <div className="flex justify-end">Hello</div>
      </div>
    </header>
  );
};

AppHeader.displayName = 'AppHeader';

export default AppHeader;
