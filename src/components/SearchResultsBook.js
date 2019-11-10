import { Component } from 'react'
import React from 'react'
import BookAuthors from "./BookAuthors";
import BookshelfChanger from "./BookshelfChanger";

class SearchResultsBook extends Component {
  render() {
    const bookDetails = this.props.bookDetails
    const changeBookshelf = this.props.changeBookshelf
    const backgroundImage = (book) => {
      if (book.imageLinks) {
        return book.imageLinks.smallThumbnail
      }
      return ""
    }
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
               style={
                 {
                   width: 128,
                   height: 193,
                   backgroundImage: `url(${backgroundImage(bookDetails)})`,
                   backgroundColor: '#ccc'
                 }
               }>
            </div>
            <BookshelfChanger
              book={bookDetails}
              changeBookshelf={changeBookshelf}
            />
          </div>
          <div className="book-title">{bookDetails.title}</div>
          <BookAuthors authors={bookDetails.authors} />
        </div>
      </li>
    )
  }
}

export default SearchResultsBook