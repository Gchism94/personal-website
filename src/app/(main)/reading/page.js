import { Playfair_Display, DM_Sans } from 'next/font/google'
import ReadingList from './ReadingList'

const rlSerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-rl-serif',
  display: 'swap',
})
const rlSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rl-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Reading List — Greg Chism',
  description:
    'A working library on tacit and formal knowledge, the craft of building humane tools, and the systems and commons they live in — 40 books in three movements, mapped by motif.',
}

export default function ReadingPage() {
  return (
    <main className={`${rlSerif.variable} ${rlSans.variable}`}>
      <ReadingList />
    </main>
  )
}
