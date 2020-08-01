import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';

const KEY_CODES = {
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ESCAPE: 27,
  ENTER: 13,
  SPACE: 32,
};

interface MenuItem {
  value: string;
}

interface MenuContextInterface {
  disabled: boolean;
  highlighted: string | null;
  items: MenuItem[];
  onChange: ({ value }: { value: string }) => void;
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  handleKeyboard: (event: KeyboardEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  setHighlighted: React.Dispatch<React.SetStateAction<string | null>>;
  containerRef: React.RefObject<HTMLElement>;
  toggleRef: React.RefObject<HTMLElement>;
  usingKeyboard: boolean;
  setUsingKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = React.createContext<MenuContextInterface | {}>({});

interface ToggleInputInterface extends React.AllHTMLAttributes<any> {
  component?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Toggle = ({
  component = 'button',
  children = [],
  ...props
}: ToggleInputInterface): React.ReactElement => {
  const {
    disabled,
    open,
    closeMenu,
    openMenu,
    handleKeyboard,
    containerRef,
    toggleRef,
    setUsingKeyboard,
  } = useContext(MenuContext as React.Context<MenuContextInterface>);

  return React.createElement(
    component,
    {
      role: 'button',
      tabIndex: disabled ? '' : 0,
      'aria-haspopup': true,
      'aria-expanded': open,
      'aria-disabled': disabled,
      onClick: (event: React.MouseEvent) => {
        if (event.nativeEvent.detail === 0) {
          // This was triggered by keyboard, we handle that separately
          setUsingKeyboard(true);
          return;
        }

        setUsingKeyboard(false);

        if (disabled === true) {
          return;
        }

        if (open === true) {
          closeMenu();
          return;
        }

        openMenu();
      },
      onKeyDown: handleKeyboard,
      onBlur: () => {
        if (open === false) {
          return;
        }

        // I feel bad about this, but we need to get activeElement in the next
        // frame to be able to detect whether it's inside our container
        setTimeout(() => {
          if (
            containerRef.current === null ||
            document.activeElement === null
          ) {
            return;
          }

          if (containerRef.current.contains(document.activeElement as Node)) {
            return;
          }

          closeMenu();
        }, 0);
      },
      ref: toggleRef,
      ...props,
    },
    children,
  );
};

interface MenuInputInterface extends React.AllHTMLAttributes<any> {
  component?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Menu = ({
  component = 'div',
  children = [],
  ...props
}: MenuInputInterface): React.ReactElement => {
  const { handleKeyboard } = useContext(
    MenuContext as React.Context<MenuContextInterface>,
  );

  return React.createElement(
    component,
    {
      role: 'menu',
      onKeyDown: handleKeyboard,
      ...props,
    },
    children,
  );
};

interface MenuItemInputInterface extends React.AllHTMLAttributes<any> {
  component?: string;
  children: React.ReactNode | React.ReactNode[];
  value: string;
  clickPreventDefault?: boolean;
}

export const MenuItem = ({
  component = 'button',
  children = [],
  value,
  clickPreventDefault = false,
  ...props
}: MenuItemInputInterface): React.ReactElement => {
  const {
    open,
    disabled,
    highlighted,
    closeMenu,
    onChange,
    setValue,
    setHighlighted,
    usingKeyboard,
    containerRef,
  } = useContext(MenuContext as React.Context<MenuContextInterface>);
  const menuItemRef = useRef<HTMLElement>(null);

  const handleSelection = () => {
    if (disabled === true || usingKeyboard === true) {
      return;
    }

    onChange({ value });
    setValue(value);
    setHighlighted(value);
    closeMenu();
  };

  useEffect(() => {
    if (usingKeyboard === false) {
      return;
    }

    if (value !== highlighted) {
      return;
    }

    if (menuItemRef.current === null) {
      return;
    }

    menuItemRef.current.focus();
  }, [highlighted, value, usingKeyboard]);

  return React.createElement(
    component,
    {
      role: 'menuitem',
      tabIndex: -1,
      onClick: (event: React.MouseEvent): void => {
        if (clickPreventDefault === true) {
          event.preventDefault();
        }

        handleSelection();
      },
      onBlur: () => {
        if (open === false) {
          return;
        }

        // I feel bad about this, but we need to get activeElement in the next
        // frame to be able to detect whether it's inside our container
        setTimeout(() => {
          if (
            containerRef.current === null ||
            document.activeElement === null
          ) {
            return;
          }

          if (containerRef.current.contains(document.activeElement as Node)) {
            return;
          }

          closeMenu();
        }, 0);
      },
      ref: menuItemRef,
      ...props,
    },
    children,
  );
};

interface WrapperInputInterface {
  context: MenuContextInterface;
}

export const Wrapper: React.FC<WrapperInputInterface> = ({
  context,
  children,
}) => {
  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};

interface UseAccessibleMenuTogglePropsInterface {
  disabled?: boolean;
  items: MenuItem[];
  initialValue?: string | null;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: ({ value }: { value: string }) => void;
  onHighlighted?: ({ value }: { value: string }) => void;
}

interface UseAccessibleMenuToggleReturnInterface {
  context: MenuContextInterface;
  value: string | null;
  highlighted: string | null;
  open: boolean;
  containerRef: React.RefObject<HTMLElement>;
}

export function useAccessibleMenuToggle(
  {
    disabled = false,
    items = [],
    initialValue = null,
    onOpen = () => {},
    onClose = () => {},
    onChange = () => {},
  }: UseAccessibleMenuTogglePropsInterface = { items: [] },
): UseAccessibleMenuToggleReturnInterface {
  const containerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(initialValue);
  const [highlighted, setHighlighted] = useState<string | null>(value);
  const [usingKeyboard, setUsingKeyboard] = useState(false);

  const openMenu = () => {
    if (open === true) {
      return;
    }

    onOpen();
    setOpen(true);
  };

  const closeMenu = () => {
    if (open == false) {
      return;
    }

    onClose();
    setOpen(false);

    if (
      usingKeyboard === true &&
      document.activeElement !== null &&
      containerRef.current !== null &&
      toggleRef.current !== null
    ) {
      if (containerRef.current.contains(toggleRef.current)) {
        toggleRef.current.focus();
      }
    }
  };

  const handleHighlightSelection = () => {
    if (disabled === true || highlighted === null) {
      return;
    }

    onChange({ value: highlighted });
    setValue(highlighted);
    setHighlighted(highlighted);
    closeMenu();
  };

  const handleClickAway = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current === null || event.target === null) {
        return;
      }

      if (containerRef.current.contains(event.target as Node)) {
        return;
      }

      closeMenu();
    },
    [open, usingKeyboard],
  );

  useEffect(() => {
    if (open === true) {
      document.addEventListener('click', handleClickAway);
    }

    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  }, [handleClickAway, open, usingKeyboard]);

  const handleKeyboard = (event: KeyboardEvent) => {
    if (items.length === 0) {
      return;
    }

    if (
      [
        KEY_CODES.ARROW_UP,
        KEY_CODES.ARROW_DOWN,
        KEY_CODES.ESCAPE,
        KEY_CODES.ENTER,
        KEY_CODES.SPACE,
      ].includes(event.keyCode) === false
    ) {
      return;
    }

    event.preventDefault();

    setUsingKeyboard(true);

    const currentHighlightIndex = items.findIndex(
      (item) => item.value === highlighted,
    );

    if (event.keyCode === KEY_CODES.ARROW_UP) {
      if (currentHighlightIndex === -1 || currentHighlightIndex === 0) {
        setHighlighted(items[items.length - 1].value);
        return;
      }

      setHighlighted(items[currentHighlightIndex - 1].value);
      return;
    }

    if (event.keyCode === KEY_CODES.ARROW_DOWN) {
      if (open === false) {
        openMenu();
        return;
      }

      if (
        currentHighlightIndex === -1 ||
        currentHighlightIndex === items.length - 1
      ) {
        setHighlighted(items[0].value);
        return;
      }

      setHighlighted(items[currentHighlightIndex + 1].value);
      return;
    }

    if (event.keyCode === KEY_CODES.ESCAPE) {
      if (open === false) {
        return;
      }

      closeMenu();
      return;
    }

    if (
      event.keyCode === KEY_CODES.ENTER ||
      event.keyCode === KEY_CODES.SPACE
    ) {
      if (open === false) {
        openMenu();
        return;
      }

      handleHighlightSelection();
      return;
    }
  };

  return {
    context: {
      disabled,
      highlighted,
      items,
      onChange,
      open,
      openMenu,
      closeMenu,
      handleKeyboard,
      setValue,
      setHighlighted,
      containerRef,
      toggleRef,
      usingKeyboard,
      setUsingKeyboard,
    },
    value,
    highlighted,
    open,
    containerRef,
  };
}
