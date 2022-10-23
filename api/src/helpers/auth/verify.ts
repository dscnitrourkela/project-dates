import { firebaseApp } from '@config';

export const verifyUser = async (token: string) => {
  const decoded = await firebaseApp.auth().verifyIdToken(token);
  return decoded;
};
