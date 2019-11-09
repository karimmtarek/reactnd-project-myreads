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
        <select onChange={(event) => (changeBookshelf(book, event))}>
          <option value="move" disabled>Move to...</option>
          {
            selectOptions.map((option) => {
              if (book.shelf === option.value) {
                console.log("book.title: ", book.title)
                console.log("{book.shelf: ", book.shelf)
                console.log("option.value: ", option.value)
                console.log("=====")
                return <option value={option.value} selected>{option.label}</option>
              } else {
                return <option value={option.value}>{option.label}</option>
              }
            })
          }
        </select>
      </div>
    )
  }
}

export default BookshelfChanger