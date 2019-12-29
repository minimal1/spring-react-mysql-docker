import React from 'react'

import Header from './components/Header'
import SearchResults from './components/SearchResults'

import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="website-main">
                <Header />
                <SearchResults />
            </div>
        )
    }
}

export default App