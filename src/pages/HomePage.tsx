import Layout from '../components/Layout'
import About from '../components/home/About'
import Hero from '../components/home/Hero'
import MainGame from '../components/home/MainGame'
import Portfolio from '../components/games/Portfolio'
import Team from '../components/home/Team'

export default function HomePage() {
  return <Layout><main><MainGame /><Hero /><About /><Portfolio /><Team /></main></Layout>
}
