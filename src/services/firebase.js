import { firebase, FieldValue } from '../lib/firebase';

export const doesUsernameExist = async username => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0;
};
