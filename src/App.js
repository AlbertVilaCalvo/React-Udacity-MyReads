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

  onShelfChange = ({ book, newShelf }) => {
    // console.log(book);
    // console.log(newShelf);
    BooksAPI.update(book, newShelf).then(response => {
      // console.log(response);
      this.setState(({ books }) => {
        books[books.findIndex(b => b.id === book.id)].shelf = newShelf
        return { books }
      });
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
        <Route exact path='/search' render={() => (
          <SearchBooks
            mybooks={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
