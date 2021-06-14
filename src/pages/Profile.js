import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExist] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const checkUserExists = async () => {
      const user = await getUserByUsername(username);

      if (user.length > 0) {
        setUser(user[0]);
        setUserExist(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p>{user.username}</p>
      </div>
    </div>
  ) : null;
};

export default Profile;
