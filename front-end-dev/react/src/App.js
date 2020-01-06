import React from 'react'
import Router from 'react-router-dom';

import Header from './components/Header'
import Container from './components/Container'

import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="website-main">
                <Header /> 
                <Container />
            </div>
        )
    }
}

export default App