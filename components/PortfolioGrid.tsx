'use client'

import { useState } from 'react'
import PortfolioCard from './PortfolioCard'

interface PortfolioGridProps {
  initialItems?: any[]
}

const categories = ['All', 'Web Application', 'Corporate', 'Portfolio', 'Landing Page', 'Business', 'Healthcare']

export default function PortfolioGrid({ initialItems = [] }: PortfolioGridProps) {
  const portfolioItems = initialItems.length > 0 ? initialItems : [
    {
      id: 1,
      title: 'Sample Project',
      category: 'Web Development',
      description: 'A sample project to showcase our work',
      image: '/placeholder-1.jpg',
      tags: ['React', 'Next.js'],
      link: '#'
    }
  ]
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div id="portfolio" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          制作実績
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          これまでに制作したWebサイトの一部をご紹介します
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category filter buttons - commented out
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        */}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No projects found matching your criteria</p>
        </div>
      )}
    </div>
  )
}