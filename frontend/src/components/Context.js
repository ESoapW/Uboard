import { createGlobalState } from 'react-hooks-global-state';

// this is to handle the login authentication, set status to local storage to keep it stay after refreshing
const { setGlobalState, useGlobalState } = createGlobalState({
    user: localStorage.getItem('user')
});

export const setUser = (s) => {

    setGlobalState('user', s);
    localStorage.setItem('user', s);
  };
  
export { useGlobalState };