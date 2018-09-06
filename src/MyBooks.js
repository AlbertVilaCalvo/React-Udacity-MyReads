import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class MyBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <BookShelf
              title='Currently Reading'
              books={this.props.books.filter(book => book.shelf === 'currentlyReading')}
              onShelfChange={this.props.onShelfChange}
            />
            <BookShelf
              title='Want to Read'
              books={this.props.books.filter(book => book.shelf === 'wantToRead')}
              onShelfChange={this.props.onShelfChange}
            />
            <BookShelf
              title='Read'
              books={this.props.books.filter(book => book.shelf === 'read')}
              onShelfChange={this.props.onShelfChange}
            />
          </div>
        </div>

        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooks;
