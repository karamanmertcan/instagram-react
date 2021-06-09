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
