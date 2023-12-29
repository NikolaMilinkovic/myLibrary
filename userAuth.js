import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCczfTwzDOy6bbSqSiJUOhBQZTooWEaWY",
  authDomain: "mylibrary-db-6b81d.firebaseapp.com",
  projectId: "mylibrary-db-6b81d",
  storageBucket: "mylibrary-db-6b81d.appspot.com",
  messagingSenderId: "899301008619",
  appId: "1:899301008619:web:4aa5b30dda5f0cfd634aae"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();
  const googleLogin = document.getElementById('btn-login-google');

  const user = auth.currentUser;

  googleLogin.addEventListener('click', function(){
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      window.location.href = "./index.html";

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  })

  function updateUserProfile(user){
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('userProfilePicture').src = userProfilePicture;
    console.log(document.getElementById('userName').value);
    console.log(document.getElementById('userEmail').value);
  }

  updateUserProfile(user);