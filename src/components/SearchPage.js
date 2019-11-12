import React from 'react'
import {Component} from 'react'
import {Link} from "react-router-dom";
import {DebounceInput} from 'react-debounce-input'
import SearchResultsBook from "./SearchResultsBook";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: '',
    searchResults: [],
    bookshelfs: this.props.bookshelfs
  }

  booksWithShelf = (books) => {
    const bookshelfs = this.state.bookshelfs
    return books.map((book) => {
      Object.keys(bookshelfs).some((key) => {
        if (bookshelfs[key].indexOf(book.id) >= 0) {
          book.shelf = key
        } else {
          book.shelf = 'none'
        }
        return bookshelfs[key].indexOf(book.id) >= 0
      })
      return book
    })
  }

  setSearchTerm = (query) => {
    this.setState({ query: query })
    this.updateSearchQuery(query)
  }

  updateSearchQuery = (query) => {
    if (query.length >= 1) {
      BooksAPI.search(query)
        .then((res) => {
          if (res.error) {
            this.setState({
              searchResults: []
            })
          } else {
            this.setState({
              searchResults: this.booksWithShelf(res)
            })
          }
        })
    } else {
      this.setState({
        searchResults: []
      })
    }
  }

  resetSearch = () => {
    this.setState({searchResults: []})
  }

  render() {
    const searchResults = this.state.searchResults
    const changeBookshelf = this.props.changeBookshelf

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            onClick={this.resetSearch}
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              className="search-books"
              placeholder="Search by title or author"
              value={this.state.query}
              minLength={2}
              debounceTimeout={400}
              onChange={(event) => { this.setSearchTerm(event.target.value) }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchResults.map((book, index) => {
                return <SearchResultsBook
                  key={index}
                  bookDetails={book}
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