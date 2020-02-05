import React from 'react'
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import InvalidPage from './components/InvalidPage'

class BooksApp extends React.Component {
  state = {
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }
  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf);
    const updatedBooks = this.state.books.map(oldBook => {
      if (oldBook.id === book.id) {
        return { ...oldBook, shelf: newShelf };
      }
      return oldBook;
    });
    this.setState({ books: updatedBooks });
  };
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={({ history }) =>
              <SearchPage booksOnShelf=
                {this.state.books} handleShelfChange={this.handleShelfChange}
              />}
          />
          <Route
            exact
            path="/"
            render={() =>
              <HomePage books=
                {this.state.books} handleShelfChange={this.handleShelfChange} />
            }
          />
          <Route render={() => <InvalidPage />} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp
