import PortfolioGrid from '@/components/PortfolioGrid'

async function getPortfolioData() {
  try {
    const res = await fetch(
      'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/6740c9e0-0035-45c0-b22a-fd5a3930ea76?type=card',
      { 
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    )
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const result = await res.json()
    
    if (result.success && result.data) {
      return result.data.map((item: any) => ({
        id: item.id || Math.random(),
        title: item.title,
        category: item.category || 'Web Development',
        description: item.description || item.excerpt || 'A modern web project',
        image: item.thumbnail?.url || '/placeholder-1.jpg',
        tags: item.tags || ['Web', 'Design'],
        link: item.metadata?.links?.[0]?.url || item.link || '#',
        publishedAt: item.publishedAt
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return []
  }
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioData()
  
  return <PortfolioGrid initialItems={portfolioItems} />
}