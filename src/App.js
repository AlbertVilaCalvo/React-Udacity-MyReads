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
    this.loadMyBooks();
  }

  loadMyBooks = () => {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  onMyBooksShelfChange = ({ book, newShelf }) => {
    BooksAPI.update(book, newShelf).then(response => {
      this.setState(({ books }) => {
        books[books.findIndex(b => b.id === book.id)].shelf = newShelf
        return { books }
      });
    });
  }

  onSearchBooksShelfChange = ({ book, newShelf }) => {
    BooksAPI.update(book, newShelf).then(response => {
      this.loadMyBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyBooks
            books={this.state.books}
            onShelfChange={this.onMyBooksShelfChange}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBooks
            mybooks={this.state.books}
            onShelfChange={this.onSearchBooksShelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
