import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


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
    const user = auth.currentUser;

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
  redirectedToLogin = false;

  onAuthStateChanged(auth, (user) => {
    if (user){
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    }
    else{
      if (!redirectedToLogin && window.location.pathname !== '/index.html') {
        alert("Create Account & login");
        redirectedToLogin = true;  // Set the flag
        window.location.href = "./login.html";
      }
    }
  })