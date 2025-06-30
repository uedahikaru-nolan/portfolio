'use client'

import { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-primary">Ueda</span>
              <span className="text-muted-foreground ml-1">Studio</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">Works</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors py-2">Home</a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors py-2">Services</a>
              <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors py-2">Works</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors py-2">Contact</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}