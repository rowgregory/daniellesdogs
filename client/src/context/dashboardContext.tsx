import { useReducer, createContext } from 'react';

const initialState = {
  showDashboardModal: false,
} as any;

const DashboardContext = createContext({
  showDashboardModal: false,
  setShowDashboardModal: (showDashboardModal: boolean) => showDashboardModal,
});

const dashboardReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SHOW_DASHBOARD_MODAL':
      return {
        ...state,
        showDashboardModal: action.payload,
      };
    default:
      return { ...state };
  }
};

const DashboardProvider = (props: any) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setShowDashboardModal = (show: any) => {
    dispatch({
      type: 'SHOW_DASHBOARD_MODAL',
      payload: show,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        setShowDashboardModal,
        showDashboardModal: state.showDashboardModal,
      }}
      {...props}
    />
  );
};

export { DashboardContext, DashboardProvider };
