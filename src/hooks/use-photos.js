import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

const UsePhotos = () => {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userId);
      console.log(following);

      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

      setPhotos(followedUserPhotos);
    };

    console.log(userId);

    if (userId) {
      getTimelinePhotos();
    }
  }, [userId]);

  return { photos };
};

export default UsePhotos;
