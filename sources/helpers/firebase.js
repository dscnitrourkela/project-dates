/**
 * Seeding module
 *
 * @format
 * @module Firebase Helper
 */
const admin = require('firebase-admin');
const serviceAccount = require('../project-elaichi.json');

// Firebase Init
const firebaseApp=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-elaichi-493f1.firebaseio.com',
});

/**
 * This function is used to encode the MongoID inside the JWT of the user. This is being called during sign up,
 * i.e. the first time a user logs into the app.
 * @param {String} uid Firebase uid
 * @param {Object} data customClaim
 */
const updateJWT=(uid,data)=>{
  admin.auth().setCustomUserClaims(uid,data)
  .then(() => {
    console.log("Set "+data+" for "+uid+" Success");
  })
  .catch(error => {
    console.log("Set "+data+" for "+uid+" Failure");
  });  
}

/**
 * This function deletes the user object from Firebase
 * @param {String} uid Firebase uid
 */
const deleteUser=(uid)=>{
  admin
  .auth()
  .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
}

module.exports={
    updateJWT,
    firebaseApp,
    deleteUser
}