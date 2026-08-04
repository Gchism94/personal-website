import EduCloud from './EduCloud'

export const metadata = {
  title: 'EduCloud — an open platform for teaching with code',
  description:
    'An open-source, self-hostable platform for teaching with code: assignment distribution to per-student Git repositories, sandboxed autograding, a peer AI tutor that cannot hand out solutions, and model routing that keeps student data on infrastructure your institution controls.',
  openGraph: {
    title: 'EduCloud — an open platform for teaching with code',
    description:
      'Five modules you can adopt one at a time, starting with the GitHub Classroom replacement. Community-owned, self-hostable, vendor-neutral.',
  },
}

export default function EduCloudPage() {
  return <EduCloud />
}
