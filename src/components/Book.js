import { Component } from 'react'
import React from 'react'
import BookshelfChanger from "./BookshelfChanger";
import BookAuthors from "./BookAuthors";

class Book extends Component {
  render() {
    const bookDetails = this.props.bookDetails
    const changeBookshelf = this.props.changeBookshelf
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={
                   {
                     width: 128,
                     height: 193,
                     backgroundImage:`url(${bookDetails.imageLinks.smallThumbnail})` }
                 }>
            </div>
            <BookshelfChanger book={bookDetails} changeBookshelf={changeBookshelf}  />
          </div>
          <div className="book-title">{bookDetails.title}</div>
          <BookAuthors authors={bookDetails.authors} />
        </div>
      </li>
    )
  }
}

export default Book