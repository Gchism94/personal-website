import { Playfair_Display, DM_Mono, DM_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
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
        className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable} ${inter.variable}`}
        style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif', fontWeight: 300 }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
