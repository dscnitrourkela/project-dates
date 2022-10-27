import admin from 'firebase-admin';

import {
  AUTH_PROVIDER,
  AUTH_URI,
  CERT_URL,
  CLIENT_EMAIL,
  CLIENT_ID,
  PRIVATE_KEY,
  PRIVATE_KEY_ID,
  PROJECT_ID,
  TOKEN_URI,
} from '@constants';

const serviceAccount = {
  type: 'service_account',
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY,
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URI,
  token_uri: TOKEN_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER,
  client_x509_cert_url: CERT_URL,
};

console.log(serviceAccount);

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as unknown as string),
});
