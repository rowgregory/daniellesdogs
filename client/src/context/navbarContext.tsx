import { useReducer, createContext, useEffect } from 'react';

const initialState = {
  showSideBar: false,
  setShowSideBar: (showSideBar: boolean) => showSideBar,
  scrollPosition: 0,
} as any;

const NavbarContext = createContext({
  showSideBar: false,
  setShowSideBar: (showSideBar: boolean) => showSideBar,
  scrollPosition: 0,
});

const navbarReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SHOW_SIDE_BAR':
      return {
        ...state,
        showSideBar: action.payload,
      };
    case 'SET_SCROLL_POSITION':
      return {
        ...state,
        scrollPosition: action.payload,
      };
    default:
      return { ...state };
  }
};

const NavbarProvider = (props: any) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);

  useEffect(() => {
    const handleScroll = () => {
      dispatch({ type: 'SET_SCROLL_POSITION', payload: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setShowSideBar = (showSideBar: any) => {
    dispatch({
      type: 'SHOW_SIDE_BAR',
      payload: showSideBar,
    });
  };

  return (
    <NavbarContext.Provider
      value={{
        showSideBar: state.showSideBar,
        setShowSideBar,
        scrollPosition: state.scrollPosition,
      }}
      {...props}
    />
  );
};

export { NavbarContext, NavbarProvider };
