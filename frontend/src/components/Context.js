import { createGlobalState } from 'react-hooks-global-state';

// this is to handle the login authentication, set status to local storage to keep it stay after refreshing
const { setGlobalState, useGlobalState } = createGlobalState({
    user: localStorage.getItem('user') === null ? 0 : localStorage.getItem('user') // if user is not set yet, set it to 0, meaning not logged in
});

export const setUser = (s) => {

    setGlobalState('user', s);
    localStorage.setItem('user', s);
  };
  
export { useGlobalState };