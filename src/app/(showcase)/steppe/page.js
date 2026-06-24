import Steppe from './Steppe'

export const metadata = {
  title: 'Steppe — An Overview',
  description:
    'Steppe is member-owned civic infrastructure for Central Oregon — no ads, owned by the neighbors who use it, governed one member, one vote. An overview of the premise, the ideas underneath, and the charter in writing.',
  openGraph: {
    title: 'Steppe — An Overview',
    description:
      'A place that belongs to the people in it. Member-owned civic infrastructure for Central Oregon.',
  },
}

export default function SteppePage() {
  return <Steppe />
}
