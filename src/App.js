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

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyBooks
            books={this.state.books}
          />
        )}/>
        <Route exact path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
