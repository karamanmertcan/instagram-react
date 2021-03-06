import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async username => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
};

//get user from the firestore where userId === userId (passed from auth)
export const getUserByUserId = async userId => {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map(doc => ({
    ...doc.data(),
    docId: doc.id
  }));

  return user;
};

export const getAllUsers = async (userId, following) => {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map(user => ({
      ...user.data(),
      docId: user.id
    }))
    .filter(profile => profile.userId !== userId && !following.includes(profile.userId));
};

export const addFollower = async (userDocId, userId, isFollowingProfile) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(userDocId)
    .update({
      followers: isFollowingProfile ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    });
};

export const addFollowingToUser = async (loggedInUserDocId, userId, isFollowingProfile) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    });
};

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map(photo => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async photo => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

export const getUserByUsername = async username => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));
};

export const getUserPhotosByUsername = async username => {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  const photos = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  return photos;
};

export const isUserFollowingProfile = async (loggedInUsername, profileUserId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
};

export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) => {
  //1st param : karl's docid
  //2nd param : rafael user id
  //3rd param : is user following this profile e.g does karl follow raphael
  await addFollowingToUser(activeUserDocId, profileUserId, isFollowingProfile);

  //1st param : karl's docid
  //2nd param : raphales doc id
  //3rd param : is user following this profile e.g does karl follow raphael

  await addFollower(profileDocId, followingUserId, isFollowingProfile);
};
