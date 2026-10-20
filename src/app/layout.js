import { Cormorant_Garamond, DM_Mono, Manrope } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
})

const body = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})


export const metadata = {
  metadataBase: new URL('https://gregtchism.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Greg Chism',
    images: ['/images/profile/developer-pic-2.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var e=document.documentElement;var d=localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){e.classList.add('dark')}else{e.classList.remove('dark')}e.style.colorScheme=d?'dark':'light'}catch(_){}`,
          }}
        />
      </head>
      <body
        className={`${display.variable} ${dmMono.variable} ${body.variable}`}
        style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontWeight: 400 }}
      >
        <ThemeProvider>
          <NavBar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
