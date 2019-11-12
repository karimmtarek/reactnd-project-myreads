import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Switch } from 'react-router-dom';
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
    books: []
  }

  createInitialBookshelfs = (bookshelfs, books) => {
    books.map((book) => { return bookshelfs[book.shelf].push(book.id) })
    this.setState({bookshelfs: bookshelfs})
    return bookshelfs
  }

  changeBookshelf = (book, event) => {
    let newBookshelf = event.target.value
    book.prevShelf = Object.assign(book.shelf).toString()
    book.shelf = newBookshelf

    BooksAPI.update(book, newBookshelf)
      .then((res) => {
        this.setState(prevState => {
          let updatedBooksList = prevState.books

          if (book.prevShelf !== 'none') {
            let bookIndex = updatedBooksList.findIndex((obj) => (obj.id === book.id))
            updatedBooksList.splice(bookIndex, 1)
          }

          updatedBooksList.push(book)

          return {
            books: updatedBooksList,
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
    const { books, bookshelfs } = this.state

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <BooksListPage
              books={books}
              changeBookshelf={this.changeBookshelf}
            />
          )} />
          <Route exact path='/search' render={({ history }) => (
            <SearchPage
              bookshelfs={bookshelfs}
              changeBookshelf={this.changeBookshelf}
            />
          )} />
        </Switch>
        </div>
    )
  }
}

export default BooksApp
