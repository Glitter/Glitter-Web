import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useAccessibleMenuToggle,
  Toggle as MobileMenuToggle,
  Menu as MobileMenuMenu,
  MenuItem as MobileMenuMenuItem,
  Wrapper as MobileMenuWrapper,
} from '@/components/Menu/Menu';
import { getButtonClassName } from '@/components/Button/Button';
import styles from './MobileMenu.module.css';

interface MobileMenuItem {
  value: string;
  label: string;
}

interface MobileMenuPropsInterface {
  onChange: ({ value }: { value: string }) => void;
  menuItems: MobileMenuItem[];
}
const MobileMenu: React.FC<MobileMenuPropsInterface> = ({
  onChange,
  menuItems,
}) => {
  const { open, highlighted, context, containerRef } = useAccessibleMenuToggle({
    items: menuItems,
    onChange,
  });

  return (
    <MobileMenuWrapper context={context}>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="relative"
      >
        <MobileMenuToggle
          className={getButtonClassName({
            variant: 'text',
            className: 'border w-20 inline-flex items-center',
            size: 's',
          })}
        >
          Menu{' '}
          <FontAwesomeIcon
            icon={['fas', 'chevron-down']}
            size="sm"
            className={`ml-auto transform transition-transform duration-200 ease-in-out ${
              open === true ? 'rotate-180' : ''
            }`}
          />
        </MobileMenuToggle>
        {open && (
          <MobileMenuMenu>
            <ul
              className={`${styles.dropdown} absolute right-0 w-48 mt-3 border py-2 rounded-lg bg-white`}
            >
              {menuItems.map((item) => (
                <li key={item.value} className="block">
                  <MobileMenuMenuItem
                    value={item.value}
                    className={`px-2 py-1 w-full text-left text-primary-900 hover:bg-primary-200 ${
                      highlighted === item.value ? 'bg-primary-100' : ''
                    }`}
                  >
                    {item.label}
                  </MobileMenuMenuItem>
                </li>
              ))}
            </ul>
          </MobileMenuMenu>
        )}
      </div>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
