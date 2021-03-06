import { Component } from 'react'
import React from 'react'

class BookAuthors extends Component {
  render() {
    const authors = this.props.authors || []

    return (
      <div className="book-authors">
        <ul>
          {authors.map((author, index) => (<li key={index}>{author}</li>))}
        </ul>
      </div>
    )
  }
}

export default BookAuthors