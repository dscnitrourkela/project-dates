const admin = require('firebase-admin');
const serviceAccount = require('../../project-elaichi.json');

// Firebase Init
const firebaseApp=admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-elaichi-493f1.firebaseio.com',
});

const updateJWT=(uid,data)=>{
  admin.auth().setCustomUserClaims(uid,data)
  .then(() => {
    console.log("Set "+data+" for "+uid+" Success");
  })
  .catch(error => {
    console.log("Set "+data+" for "+uid+" Failure");
  });  
}

module.exports={
    updateJWT,
    firebaseApp
}