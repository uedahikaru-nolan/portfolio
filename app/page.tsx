import Header from '@/components/Header'
import PortfolioGrid from '@/components/PortfolioGrid'

async function getPortfolioData() {
  try {
    const res = await fetch(
      'https://quick-web-admin-xktl.vercel.app/api/v1/public/contents/6740c9e0-0035-45c0-b22a-fd5a3930ea76?type=card',
      { 
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    )
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    const result = await res.json()
    
    if (result.success && result.data) {
      return result.data.map((item: any, index: number) => ({
        id: item.id || index + 1,
        title: item.title,
        category: 'Web Development',
        description: item.description || `Published on ${new Date(item.publishedAt).toLocaleDateString()}`,
        image: item.thumbnail?.url || '/placeholder-1.jpg',
        tags: ['Web', 'Design'],
        link: item.link || '#',
        publishedAt: item.publishedAt
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return []
  }
}

export default async function Home() {
  const portfolioItems = await getPortfolioData()
  
  return (
    <main className="min-h-screen">
      <Header />
      <PortfolioGrid initialItems={portfolioItems} />
    </main>
  )
}