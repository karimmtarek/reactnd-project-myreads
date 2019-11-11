import React from 'react'
import {Component} from 'react'
import {Link} from "react-router-dom";
import SearchResultsBook from "./SearchResultsBook";

class SearchPage extends Component {
  state = {
    query: ''
  }

  render() {
    const searchResults = this.props.searchResults
    const updateSearchQuery = this.props.updateSearchQuery
    const changeBookshelf = this.props.changeBookshelf
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            onClick={this.props.resetSearch}
            className="close-search"
          >Close</Link>
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
              value={this.state.query}
              onChange={(event) => {
                this.setState({query: event.target.value})
                updateSearchQuery(event.target.value)
              }}
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