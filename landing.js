// import { auth } from './userAuth.js';
import { auth, user } from './userAuth.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const user = user;

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

onAuthStateChanged(auth, (user) => {
    if (user){
        updateUserProfile(user);
        console.log("Update user profile");
        const uid = user.uid;
        return uid;
    }
    else{
        alert("Create Account & login");
        window.location.href = "./index.html"
    }
})


const myLibrary = [];
function Book(title,author,numberOfPages){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
}



function addBookToLibrary() {
    myLibrary.concat(Book)
  }
Book.prototype.whatBook = function(Book){
    console.log(Book.title + " is the name of the book!")
}

class newBook {
    // Sets up my object
    constructor(title,author,numberOfPages){
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
    }

    set title(_title){
        this.title = _title;
    }
    set author(_author){
        this.author = _author;
    }
    set numberOfPages(_numberOfPages){
        this.numberOfPages = _numberOfPages;
    }
}


const cardContainer = document.getElementById('card-container');
const btnAddContainer = document.getElementById('add-new-continer');
document.getElementById('btn-add-book').addEventListener('click', function(){
    createNewDiv();
});
document.getElementById('btn-remove-entries').addEventListener('click', function(){
    removeAllDivs();
});
let newDivReferences =[];
function createNewDiv(){
    const newDiv = document.createElement('div');
    newDivReferences.push(newDiv);
    newDiv.draggable = true;
    newDiv.classList.add('card');
    newDiv.classList.add('draggable');
    newDiv.innerHTML = document.getElementById('input-title').value;
    btnAddContainer.insertAdjacentElement('afterend', newDiv);
    updateDraggable();
    updateDragableList();
}

function removeAllDivs(){
    newDivReferences.forEach(function(div){
        cardContainer.removeChild(div);
    });
    newDivReferences = [];
}




// DRAG AND DROP


function updateDraggable(){
    draggable = document.querySelectorAll('.draggable');

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

