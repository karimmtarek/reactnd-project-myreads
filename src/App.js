import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import './App.css'
import BooksListPage from "./components/BooksListPage";

class BooksApp extends React.Component {
  state = {
    bookshelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    books: [],
    searchResults: [],
  }

  createInitialBookshelfs = (bookshelfs, books) => {
    books.map((book) => { return bookshelfs[book.shelf].push(book.id) })
    this.setState({bookshelfs: bookshelfs})
    return bookshelfs
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

  changeBookshelf = (book, event) => {
    let newBookshelf = event.target.value
    book.prevShelf = Object.assign(book.shelf).toString()
    book.shelf = newBookshelf

    BooksAPI.update(book, newBookshelf)
      .then((res) => {
        this.setState(prevState => {
          let updatedBooksList = prevState.books
          let updatedSearchResults = prevState.searchResults

          if (updatedSearchResults.length > 0) {
            let bookResultIndex = updatedSearchResults.findIndex((obj) => (obj.id === book.id))
            updatedSearchResults.splice(bookResultIndex, 1)
          }

          if (book.prevShelf !== 'none') {
            let bookIndex = updatedBooksList.findIndex((obj) => (obj.id === book.id))
            updatedBooksList.splice(bookIndex, 1)
          }

          updatedBooksList.push(book)

          return {
            books: updatedBooksList,
            searchResults: updatedSearchResults,
            bookshelfs: res
          }
        });
      })
  }

  componentDidMount() {
    let bookshelfs = this.state.bookshelfs
    BooksAPI.getAll()
      .then((books) => {
        bookshelfs = this.createInitialBookshelfs(bookshelfs, books)
        this.setState({books: books})
      })
  }

  render() {
    const { books, searchResults, searchQuery, bookshelfs } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksListPage
            books={books}
            changeBookshelf={this.changeBookshelf}
          />
        )} />
        <Route exact path='/search' render={({ history }) => (
          <SearchPage
            bookshelfs={bookshelfs}
            searchResults={searchResults}
            searchQuery={searchQuery}
            updateSearchQuery={this.updateSearchQuery}
            changeBookshelf={this.changeBookshelf}
            resetSearch={this.resetSearch}
          />
        )} />
        </div>
    )
  }
}

export default BooksApp
