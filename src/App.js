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
    searchQuery: ''
  }

  updateSearchQuery = (query) => {
    console.log("query: ", query)
    console.log("query length: ", query.length)

    if (query.length >= 1) {
      BooksAPI.search(query)
        .then((res) => {
          if (res.error) {
            this.setState({
              searchResults: [],
              searchQuery: query
            })
          } else {
            this.setState({
              searchResults: res,
              searchQuery: query
            })
          }
        })
    } else {
      this.setState({
        searchResults: [],
        searchQuery: ''
      })
    }
  }

  changeBookshelf = (book, event) => {
    let newBookshelf = event.target.value;
    book.shelf = newBookshelf

    BooksAPI.update(book, newBookshelf)
      .then((res) => {
        this.setState(prevState => {
          let updatedBooksList = prevState.books
          let bookIndex = updatedBooksList.findIndex((obj) => (obj.id === book.id))

          let updatedSearchResults = prevState.searchResults
          let bookResultIndex = updatedSearchResults.findIndex((obj) => (obj.id === book.id))

          updatedBooksList.splice(bookIndex, 1)
          updatedBooksList.push(book)
          updatedSearchResults.splice(bookResultIndex, 1)

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
        Object.keys(bookshelfs).forEach((key) => {
          books.map((book) => {
            if (book.shelf === key) {
              bookshelfs[key].push(book.id)
            }
          })
        }
      )
        this.setState({
          books: books,
          bookshelfs: bookshelfs
        })
      })
    // }

  }

  render() {
    const { books, searchResults, searchQuery, bookshelfs } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksListPage
            books={this.state.books}
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
          />
        )} />
        </div>
    )
  }
}

export default BooksApp
