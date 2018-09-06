import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    // console.log('query: ' + query);
    this.setState({ query });

    if (!query) { // empty string
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(query).then(books => {
      // console.log('search response', books);
      // If the user deletes the query and there is a search request 'in flight' we can end up with an empty query
      // but showing results. Or we can show results of a different query. To prevent this just check the current
      // query before showing the results.
      if (this.state.query !== query) {
        return;
      }
      if (Array.isArray(books)) {
        this.setState({ books });
      } else {
        // API returned {error: "empty query", items: []}
        this.setState({ books: [] });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id}>
                <Book book={book} onShelfChange={this.props.onShelfChange} />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
