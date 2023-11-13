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