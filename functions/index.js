const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.setCustomClaimOnSignUp = functions.auth.user().onCreate((user) => {
    const customClaims={
        role:"LEVEL1"
    }
    admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        console.log("Set "+customClaims.role+" for "+user.displayName+" Succes");
      })
      .catch(error => {
        console.log("Set "+customClaims.role+" for "+user.displayName+" Failure");
      });
});