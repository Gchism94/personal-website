import ReadingList from './ReadingList'

export const metadata = {
  title: 'Reading List — Greg Chism',
  description:
    'A working library on tacit and formal knowledge, the craft of building humane tools, and the systems and commons they live in — 40 books in three movements, mapped by motif.',
}

export default function ReadingPage() {
  return (
    <div>
      <ReadingList />
    </div>
  )
}
