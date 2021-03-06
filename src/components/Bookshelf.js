import React from 'react'
import { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    const books = this.props.books
    const shelfTitle = this.props.shelfTitle
    const shelfTitleId = shelfTitle.replace(/ /g,'').toLowerCase()
    const booksFiltered = books.filter((book) => {
      return book.shelf.toLowerCase() === shelfTitleId
    })
    const changeBookshelf = this.props.changeBookshelf
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksFiltered.map((book) => {
              return <Book bookDetails={book} key={book.id} changeBookshelf={changeBookshelf} />
            })}
          </ol>
        </div>
      </div>
    )
  }
}
export default Bookshelf