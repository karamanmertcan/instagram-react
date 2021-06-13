import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addFollower, addFollowingToUser } from '../../services/firebase';

const SuggestionProfile = ({
  username,
  userId,
  userDocId,
  profileId,
  activeUserId,
  activeUserDocId
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    await addFollower(userDocId, activeUserId, false);
    await addFollowingToUser(activeUserDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}>
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestionProfile;

SuggestionProfile.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string.isRequired,
  userDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  activeUserDocId: PropTypes.string.isRequired
};
