import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchPage extends Component {
    state = {
        books: [],
        query: ''
    }
    getDervivedStateFromProps() {
        console.log('getDervivedStateFromProps')
/*        BooksAPI.search(this.state.query)
            .then((books) => {
                this.setState(() => ({
                    books
                }))
                console.log(books)
            }*/
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        console.log('updateQuery')
        BooksAPI.search(this.state.query)
            .then((books) => {
                this.setState(() => ({
                    books
                }))
                console.log(this.state)
            })
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    {/*<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>*/}
                    <button className="close-search">Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query} 
                            onChange={(event) => this.updateQuery(event.target.value)}    
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                    {this.state.books && (<BooksGrid books={this.state.books} />)}
                </div>
            </div>
        )
    }
}

export default SearchPage