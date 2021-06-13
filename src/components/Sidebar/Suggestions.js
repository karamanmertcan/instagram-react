import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getAllUsers } from '../../services/firebase';
import SuggestionProfile from './suggestion-profile';

const Suggestions = ({ userId, following, activeUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  console.log('userid', userId);

  useEffect(() => {
    const allUsers = async () => {
      const response = await getAllUsers(userId, following);

      setProfiles(response);
    };

    if (userId) {
      allUsers();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={61} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map(profile => {
          const { username, docId } = profile;
          return (
            <SuggestionProfile
              username={username}
              key={docId}
              profileId={userId}
              userDocId={docId}
              userId={profile.userId}
              activeUserId={userId}
              activeUserDocId={activeUserDocId}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  activeUserDocId: PropTypes.string
};
