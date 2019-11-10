import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import './App.css'
import BooksListPage from "./components/BooksListPage";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    searchQuery: ''
  }

  updateSearchQuery = (query) => {
    console.log("query: ", query)

    if (query.length >= 1) {
      BooksAPI.search(query)
        .then((res) => {
          console.log("BookAPI search response: ", res)
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
        console.log("Update shelf response: ", res)
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
            searchResults: updatedSearchResults
          }
        });
      })
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      })
  }

  render() {
    const { books, searchResults, searchQuery } = this.state
    console.log("🔥 books: ", books)
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
