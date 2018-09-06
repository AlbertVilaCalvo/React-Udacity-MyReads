import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import MyBooks from './MyBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  onShelfChange = ({book, newShelf}) => {
    console.log(book);
    console.log(newShelf);
    let currentBooks = this.state.books;
    BooksAPI.update(book, newShelf).then(response => {
      console.log(response);
      const updatedBook = currentBooks.find(b => b.id === book.id);
      updatedBook.shelf = newShelf;
      const updatedBookIndex = currentBooks.indexOf(updatedBook);
      const updatedBooks = currentBooks.fill(updatedBook, updatedBookIndex, updatedBookIndex + 1);
      this.setState({ books: updatedBooks });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyBooks
            books={this.state.books}
            onShelfChange={this.onShelfChange}
          />
        )}/>
        <Route exact path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
