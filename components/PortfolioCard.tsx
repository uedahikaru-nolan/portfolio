'use client'

import Image from 'next/image'
import { ExternalLink, Heart } from 'lucide-react'
import { useState } from 'react'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  link: string
  color?: string
}

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on action buttons
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return
    }
    
    if (item.link && item.link !== '#') {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div 
      className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${item.color || 'from-primary/10 to-primary/5'}`}>
            <span className="text-4xl font-bold text-white/80">{item.title.charAt(0)}</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </button>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-gray-700" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary">{item.category}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}