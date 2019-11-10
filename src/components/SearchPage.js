import React from 'react'
import {Component} from 'react'
import {Link} from "react-router-dom";
import SearchResultsBook from "./SearchResultsBook";

class SearchPage extends Component {
  getBookshelfName = (book, bookshelfs) => {
    Object.keys(bookshelfs).some((key) => {
      if (bookshelfs[key].indexOf(book.id) >= 0) { book.shelf = key }
      return bookshelfs[key].indexOf(book.id) >= 0
    })
    return book
  }

  render() {
    const bookshelfs = this.props.bookshelfs
    const searchResults = this.props.searchResults
    const updateSearchQuery = this.props.updateSearchQuery
    const searchQuery = this.props.searchQuery
    const changeBookshelf = this.props.changeBookshelf
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
              className="search-books"
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => updateSearchQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchResults.map((book, index) => {
                return <SearchResultsBook
                  key={index}
                  bookDetails={this.getBookshelfName(book, bookshelfs)}
                  changeBookshelf={changeBookshelf} />
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage