import React, { Component } from 'react';

const Book = (props) => {
  const onShelfChange = (event) => {
    props.onShelfChange({ book: props.book, newShelf: event.target.value });
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193,
          backgroundImage: `url("${props.book.imageLinks ? props.book.imageLinks.thumbnail : ''}")` }}></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={onShelfChange}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors ? props.book.authors.join(', ') : ''}</div>
    </div>
  )
}

export default Book;
