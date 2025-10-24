import React from 'react'
import { PexiblockCheckout } from './components/PexiblockCheckout'
import './App.css'

function App() {
    return (
        <div className="app">
            <main className="app-main">
                <PexiblockCheckout />
            </main>
            <footer className="app-footer">
                <p>
                    Powered by <strong>PEXIBLOCK</strong> |
                    <a href="https://pexiblock.com" target="_blank" rel="noopener noreferrer">
                        Learn more
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default App
