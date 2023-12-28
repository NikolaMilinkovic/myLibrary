import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


//     // Your web app's Firebase configuration
//     const firebaseConfig = {
//     apiKey: "AIzaSyCCczfTwzDOy6bbSqSiJUOhBQZTooWEaWY",
//     authDomain: "mylibrary-db-6b81d.firebaseapp.com",
//     projectId: "mylibrary-db-6b81d",
//     storageBucket: "mylibrary-db-6b81d.appspot.com",
//     messagingSenderId: "899301008619",
//     appId: "1:899301008619:web:4aa5b30dda5f0cfd634aae"
//     };

//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);
//     auth.languageCode = 'en'
//     const provider = new GoogleAuthProvider();
//     const googleLogin = document.getElementById('btn-login-google');


//     // Define a flag to track whether the event listener is added
// let googleLoginListenerAdded = false;

// // Function to handle Google login
// function handleGoogleLogin() {
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             console.log("Started the button journey");
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const user = result.user;
//             window.location.href = "./landing.html";

//         }).catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
// }

// // Check if the event listener has been added
// if (!googleLoginListenerAdded) {
//     // Get the element
//     const googleLogin = document.getElementById('btn-login-google');

//     // Add the event listener
//     googleLogin.addEventListener('click', handleGoogleLogin);

//     // Update the flag to indicate that the event listener is added
//     googleLoginListenerAdded = true;
// }


//     // googleLogin.addEventListener('click', function(){
//     //     signInWithPopup(auth, provider)
//     //     .then((result) => {
//     //         console.log("Started the button journey");
//     //         const credential = GoogleAuthProvider.credentialFromResult(result);
//     //         const user = result.user;
//     //         window.location.href = "./landing.html";

//     //     }).catch((error) => {
//     //         const errorCode = error.code;
//     //         const errorMessage = error.message;
//     //     });
//     // })


//     function updateUserProfile(user){
//         const userName = user.displayName;
//         const userEmail = user.email;
//         const userProfilePicture = user.photoURL;

//         document.getElementById('userName').textContent = userName;
//         document.getElementById('userEmail').textContent = userEmail;
//         document.getElementById('userProfilePicture').src = userProfilePicture;
//         console.log(document.getElementById('userName').value);
//         console.log(document.getElementById('userEmail').value);
//     }

//     onAuthStateChanged(auth, (user) => {
//         if (user){
//             updateUserProfile(user);
//             console.log("Update user profile");
//             const uid = user.uid;
//             return uid;
//         }
//         else{
//             alert("Create Account & login");
//             window.location.href = "/register.html"
//         }
//     })


// export { auth };










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
    auth.languageCode = 'en';
    const provider = new GoogleAuthProvider();

    // Define a flag to track whether the event listener is added
    let googleLoginListenerAdded = false;

    // Function to handle Google login
    function handleGoogleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Started the button journey");
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                window.location.href = "./landing.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    // Check if the event listener has been added
    if (!googleLoginListenerAdded) {
        // Get the element
        const googleLogin = document.getElementById('btn-login-google');

        // Add the event listener
        googleLogin.addEventListener('click', handleGoogleLogin);

        // Update the flag to indicate that the event listener is added
        googleLoginListenerAdded = true;
    }


export default auth;