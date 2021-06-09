import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

const UseUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjById = async () => {
      //we need a functuin  that we can call (firebaase service) thats gets the user data
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    };
    if (user?.uid) {
      getUserObjById();
    }
  }, [user]);
  return { user: activeUser };
};

export default UseUser;
