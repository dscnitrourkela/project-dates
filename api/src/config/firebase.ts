import admin from 'firebase-admin';

import serviceAccount from '../../firebase.json';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as unknown as string),
});
