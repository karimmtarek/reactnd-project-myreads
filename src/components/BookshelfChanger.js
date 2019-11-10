import React from 'react'
import { Component } from 'react'

class BookshelfChanger extends Component {
  render() {
    const book = this.props.book
    const changeBookshelf = this.props.changeBookshelf
    const selectOptions = [
      {
        label: "Currently Reading",
        value: "currentlyReading"
      },
      {
        label: "Want to Read",
        value: "wantToRead"
      },
      {
        label: "Read",
        value: "read"
      },
      {
        label: "None",
        value: "none"
      }
    ]
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) => (changeBookshelf(book, event))}
          value={book.shelf || 'none'}
        >
          <option value="move" disabled>Move to...</option>
          {
            selectOptions.map((option, index) => {
              return <option value={option.value} key={index}>{option.label}</option>
            })
          }
        </select>
      </div>
    )
  }
}

export default BookshelfChanger