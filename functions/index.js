const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const customClaims={
        role:"ROLE101"
    }
    admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        console.log("done");
      })
      .catch(error => {
        console.log(error);
      });
});