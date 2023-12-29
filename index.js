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
  
  
      // Define a flag to track whether the event listener is added
  let googleLoginListenerAdded = false;
  
  // Function to handle Google login
  function handleGoogleLogin() {
      signInWithPopup(auth, provider)
          .then((result) => {
              console.log("Started the button journey");
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const user = result.user;
              window.location.href = "./index.html";
  
          }).catch((error) => {
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
  
  
      googleLogin.addEventListener('click', function(){
          signInWithPopup(auth, provider)
          .then((result) => {
              console.log("Started the button journey");
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const user = result.user;
              window.location.href = "./index.html";
  
          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
          });
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

      let redirectedToLogin = false;
      
      onAuthStateChanged(auth, (user) => {
          if (user){
              updateUserProfile(user);
              console.log("Update user profile");
              const uid = user.uid;
              return uid;
          }
          else{
            if (!redirectedToLogin && window.location.pathname !== '/index.html') {
              alert("Create Account & login");
              redirectedToLogin = true;  // Set the flag
              window.location.href = "./index.html";
           }
          }
      })


class Book {
      // Sets up my object
      constructor(
        title = "Unknown",
        author = "Unknown",
        numberOfPages = 0,
        read = false
        ){
          this.title = title;
          this.author = author;
          this.numberOfPages = numberOfPages;
          this.read = read;
      }
    }

class Library {
  constructor(){
    this.books = [];
  }
  // Adds new book 
  addNewBook(newBook){
    if(!this.inLibrary(newBook)){
      this.books.push(newBook);
    }
  }
  // Traverses through the current books array and 
  // creates a new array that does not include the title
  removeBook(title){
    this.books = this.books.filter((book) => book.title !== title );
  }
  // Checks to see if book is present in library
  inLibrary(newBook){
    return this.books.some((book)=> book.title === newBook.title);
  }
}

const library = new Library();


// CARD CREATION LOGIC

const cardContainer = document.getElementById('card-container');
const btnAddContainer = document.getElementById('add-new-continer');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const inputPages = document.getElementById('input-pages');

const inputBook = () => {
  const inputTitle = document.getElementById('input-title').value;
  const inputAuthor = document.getElementById('input-author').value;
  const inputPages = document.getElementById('input-pages').value;
  return new Book(inputTitle, inputAuthor, inputPages, false);
}

document.getElementById('btn-add-book').addEventListener('click', function(){
    const newBook = inputBook();
    library.addNewBook(newBook);
    removeAllDivs();
    displayLibrary();
    clearInputFields();
});

const clearInputFields = () =>{
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
}

document.getElementById('btn-remove-entries').addEventListener('click', function(){
    removeAllEntries();
});

let cardDivReferences = [];

const displayLibrary = () =>{
  library.books.forEach(book => {
    displayCard(book);
  });
};

const displayCard = (book) =>{
    const cardDiv = document.createElement('div');
    const bookInfoDiv = document.createElement('div');
    const btnDiv =  document.createElement('div');
    const title = document.createElement('p');
    const authorHeader = document.createElement('p');
    const author = document.createElement('p');
    const pagesHeader = document.createElement('p');
    const pages = document.createElement('p');
    const btnRead = document.createElement('button');
    const btnRemoveBook = document.createElement('button');

    title.innerHTML = '"' + book.title + '"';
    title.style.overflowWrap = 'break-word';
    authorHeader.innerHTML = "Written by:"
    author.innerHTML = book.author;
    author.style.overflowWrap = 'break-word';
    pagesHeader.innerHTML = "Number of pages:"
    pages.innerHTML = book.numberOfPages;
    pages.style.overflowWrap = 'break-word';
    btnRead.innerHTML = "Book not finished"
    btnRemoveBook.innerHTML = "Remove"

    btnRemoveBook.addEventListener('click', ()=>{
      cardDiv.remove();

      const cardIndex = cardDivReferences.indexOf(cardDiv);
      if (cardIndex !== -1) {
        cardDivReferences.splice(cardIndex, 1);
      }
      library.removeBook(book.title);
      console.log(library);
    })


    title.classList.add('card-title');
    authorHeader.classList.add('card-header');
    author.classList.add('card-author-pages');
    pagesHeader.classList.add('card-header');
    pages.classList.add('card-author-pages');
    bookInfoDiv.classList.add('book-info-div');
    btnDiv.classList.add('btn-div');
    btnRead.classList.add('card-btn', 'card-btn-red');
    btnRemoveBook.classList.add('card-btn');

    bookInfoDiv.appendChild(title);
    bookInfoDiv.appendChild(authorHeader);
    bookInfoDiv.appendChild(author);
    bookInfoDiv.appendChild(pagesHeader);
    bookInfoDiv.appendChild(pages);
    btnDiv.appendChild(btnRead);
    btnDiv.appendChild(btnRemoveBook);
    bookInfoDiv.appendChild(btnDiv);
    cardDiv.appendChild(bookInfoDiv);

    cardDiv.draggable = true;
    cardDiv.classList.add('card');
    bookInfoDiv.classList.add('draggable');
    btnDiv.classList.add('draggable');
    cardDiv.classList.add('draggable');

    btnAddContainer.insertAdjacentElement('afterend', cardDiv);
    cardDivReferences.push(cardDiv);
    updateDraggable();
    updateDragableList();
}

function removeAllDivs(){
    cardDivReferences.forEach(function(div){
        cardContainer.removeChild(div);
    });
    cardDivReferences = [];
}

function removeAllEntries(){
  cardDivReferences.forEach(function(div){
      cardContainer.removeChild(div);
  });
  cardDivReferences = [];
  
  library.books.forEach(function(book) {
    library.removeBook(book.title);
  });
}




// DRAG AND DROP


function updateDraggable(){
    var draggable = document.querySelectorAll('.draggable');

    // Remove existing event listeners
    draggable.forEach(draggable => {
        draggable.removeEventListener('dragstart', handleDragStart);
        draggable.removeEventListener('dragend', handleDragEnd);
    });

    // Add new event listeners
    draggable.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });
}

var draggableList = document.querySelectorAll('.draggable');
function handleDragStart() {
    this.classList.add('dragging');
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

var draggableList = document.querySelectorAll('.draggable');
function updateDragableList(){
    draggableList = document.querySelectorAll('.draggable');

    draggableList.forEach(draggableEl => {
        draggableEl.addEventListener('dragover', () =>{
            
            const selectedDraggable = document.querySelector('.dragging');
            draggableEl.insertAdjacentElement('afterend', selectedDraggable);
        })
    })

    btnAddContainer.addEventListener('dragover', () =>{
            
        const selectedDraggable = document.querySelector('.dragging');
        btnAddContainer.insertAdjacentElement('afterend', selectedDraggable);
    })
}







// COMPLETE LOGIN LOGIC
const navLoginBtn = document.getElementById('btn-login');
const navBar = document.getElementById('nav-bar');
const footer = document.getElementById('footer');
const loginSection = document.getElementById('login-section');
const cardSection = document.getElementById('card-section');
const tempLoginBtn = document.getElementById('btn-input-login');
const navLogoutBtn = document.getElementById('btn-logout');


tempLoginBtn.addEventListener('click', () => {
  toggleDisplay();
  toggleNavBtn();
});

navLoginBtn.addEventListener('click', () => {
  toggleDisplay();
});
function toggleDisplay(){
  cardContainer.classList.toggle('library-display');
  navBar.classList.toggle('library-display');
  footer.classList.toggle('library-display');
  cardSection.classList.toggle('library-display');
  loginSection.classList.toggle('login-display');
}
function toggleNavBtn(){
  navLoginBtn.classList.toggle('login-display');
  navLogoutBtn.classList.toggle('login-display');
}

const loginButtons = document.querySelectorAll('.btn-login');
loginButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 150);
    });
})