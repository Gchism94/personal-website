import { redirect } from 'next/navigation'

// Keep existing bookmarks useful while directing visitors to the live project.
export default function SteppePage() {
  redirect('https://steppe.community')
}
