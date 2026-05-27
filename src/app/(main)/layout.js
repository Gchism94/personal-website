import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
