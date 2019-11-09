import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from "./Bookshelf";

class BooksListPage extends Component {

  render() {
    const changeBookshelf = this.props.changeBookshelf
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={this.props.books} shelfTitle="Currently Reading" changeBookshelf={changeBookshelf} />
            <Bookshelf books={this.props.books} shelfTitle="Want to Read" changeBookshelf={changeBookshelf} />
            <Bookshelf books={this.props.books} shelfTitle="Read" changeBookshelf={changeBookshelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksListPage