import { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      //we have user ... therefore we can store the user in localstorage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        //we dont have an auth user, therefore clear the localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);
  return { user };
};

export default useAuthListener;
