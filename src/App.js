import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import './App.css'
import BooksListPage from "./components/BooksListPage";

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksListPage/>
        )} />
        <Route exact path='/search' render={({ history }) => (
          <SearchPage/>
        )} />
        </div>
    )
  }
}

export default BooksApp
