// FIREBASE CONFIGURATION
const auth = firebase.auth();

const whenSignedInNav = document.getElementById('nav-bar');
const whenSignedInCards = document.getElementById('card-section');
const whenSignedInFooter = document.getElementById('footer');
const whenSignedOut = document.getElementById('login-section');

const signInBtn = document.getElementById('btn-login-google');
const signOutBtn = document.getElementById('btn-sign-out');
const userDetails = document.getElementById('user-profile-container');
const userProfileImage = document.getElementById('user-profile-image');
const userName = document.getElementById('user-name');

const provider = new firebase.auth.GoogleAuthProvider();
// Sign in / Sign out handling
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user =>{
  if(user){
    // signed in
    whenSignedInNav.classList.toggle('library-display');
    whenSignedInCards.classList.toggle('library-display');
    whenSignedInFooter.classList.toggle('library-display');
    whenSignedOut.classList.toggle('library-display');
    userProfileImage.src = `${user.photoURL}`;
    userName.innerHTML = `${user.displayName}`;

    libraryRef = db.collection('Libraries');
    unsubscribe = libraryRef
      .where('uid', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const bookList = querySnapshot.docs.map(doc => {
          return new Book(doc.data().title, doc.data().author, doc.data().numberOfPages, doc.data().read);
        });
        importBookList(bookList);
        removeAllDivs();
        displayLibrary();
      });

  } else {
    // not signed in
    whenSignedInNav.classList.toggle('library-display');
    whenSignedInCards.classList.toggle('library-display');
    whenSignedInFooter.classList.toggle('library-display');
    whenSignedOut.classList.toggle('library-display');
    userProfileImage.src = "";
    userName.innerHTML = "";
  }
});

const db = firebase.firestore();
const addNewBook = document.getElementById('btn-add-book');

let libraryRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
  if(user){
    // signed in
    libraryRef = db.collection('Libraries');
    addNewBook.onclick = () => {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      const newBook = inputBook();
      clearInputFields();
      console.log(newBook.docId);


      libraryRef.add({
        uid: user.uid,
        title: newBook.title,
        author: newBook.author,
        numberOfPages: newBook.numberOfPages,
        read: newBook.read,
        createdAt: serverTimestamp()
      })
      .then((docRef) => {
        newBook.docId = docRef.id;
        console.log('Document written with ID:', docRef.id);
        console.log(newBook.docId);
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });;

      unsubscribe = libraryRef
        .where ('uid', '==', user.uid)
        .onSnapshot(querySnapshot => {
          const bookList = querySnapshot.docs.map(doc => {
              return new Book(doc.data().title, doc.data().author, doc.data().numberOfPages, doc.data().read, doc.id);

          });
          importBookList(bookList);
          removeAllDivs();
          displayLibrary();
        });

    }

  } else {
    // not signed in

  }
});

const importBookList = (bookList) =>{
  library.removeAllBooks();
  bookList.forEach(book => {
    library.addNewBook(book);
  });
};
const displayBook = (input) => {
  return new Book(inputTitle, inputAuthor, inputPages, false, docId);
}










class Book {
      // Sets up my object
      constructor(
        title = "Unknown",
        author = "Unknown",
        numberOfPages = 0,
        read = false,
        docId = null
        ){
          this.title = title;
          this.author = author;
          this.numberOfPages = numberOfPages;
          this.read = read;
          this.docId = docId;
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
  removeAllBooks() {
    this.books = [];
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
  return new Book(inputTitle, inputAuthor, inputPages, false, null);
}

document.getElementById('btn-add-book').addEventListener('click', function(){
    // const newBook = inputBook();
    // library.addNewBook(newBook);
    removeAllDivs();
    // displayLibrary();
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
      const documentId = book.docId;
      const documentRef = libraryRef.doc(documentId);
      documentRef.delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });

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








// LOGIN BUTTON CLICK ANIMATION
const loginButtons = document.querySelectorAll('.btn-login');
loginButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 150);
    });
})