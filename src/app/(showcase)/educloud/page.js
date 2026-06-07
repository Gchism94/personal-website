import EduCloud from './EduCloud'

export const metadata = {
  title: 'EduCloud × Quad — Federated System Architecture',
  description:
    'A modular, federated architecture for educational research computing: two planes joined at a single seam — a self-hostable, privacy-minimal coursework plane (Quad) and a pluggable resource plane (EduCloud) that routes, meters, and runs compute across ACCESS, HPC, and cloud backends.',
  openGraph: {
    title: 'EduCloud × Quad — Federated System Architecture',
    description:
      'Two planes, one seam · pluggable resources · free → paid → donations. An interactive map of a modular educational computing platform.',
  },
}

export default function EduCloudPage() {
  return <EduCloud />
}
