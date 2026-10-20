// Public-facing summaries checked against project source documentation, October 2026.
// Keep development and research descriptions distinct from release claims.
export const projects = [
  {
    id: 'midniht', title: 'Midniht', category: 'Independent product', status: 'Ongoing development',
    headline: 'A reading life that feels like yours.',
    description: 'A personal book library built around the books you own, the stories you love, and your individual taste. Discovery begins with your shelves.',
    detail: 'Midniht brings together reading history, series tracking, per-format ownership, and genre-specific themes. Its design centers personal taste rather than a single averaged rating.',
    href: 'https://midniht.app', linkLabel: 'Visit Midniht', external: true,
    visual: 'midniht',
  },
  {
    id: 'educloud', title: 'EduCloud', category: 'Open infrastructure', status: 'In development',
    headline: 'More room to teach. More ways to build.',
    description: 'A modular approach to educational computing. Cairn, its classroom component, brings coding assignments, submissions, and autograding into the wider ecosystem.',
    detail: 'Cairn, Waypoint, Outfitter, Portage, and Belay each address a different part of the ecosystem. The current work includes local prototypes and controlled testing; institutional deployment and live classroom acceptance remain separate milestones.',
    href: '/educloud', linkLabel: 'Explore the ecosystem', external: false,
    visual: 'educloud',
  },
  {
    id: 'talks', title: 'Talks & workshops', category: 'Teaching in public', status: 'Presentation collection',
    headline: 'Ideas are better when we work through them.',
    description: 'Interactive talks and workshops on building with AI, accessible educational computing, and the natural systems that shape how I think.',
    detail: 'The collection includes Design What You Know, an interactive AI prototyping workshop, and Teaching on Borrowed Compute, a practical look at educational computing resources.',
    href: 'https://gchism94.github.io/talks/', linkLabel: 'Browse the talks', external: true,
    visual: 'talks',
  },
  {
    id: 'mesa', title: 'MESA', category: 'Education & training', status: 'Education & training leadership',
    headline: 'Help people put new possibilities to work.',
    description: 'Leading education and training for MESA, the Multidisciplinary Environment for Scientific Advancement, which connects researchers with CyVerse data, applications, and AI tools.',
    detail: 'My role centers on education and training. MESA offers a web portal, research applications such as JupyterLab and RStudio, and AI-agent connections to CyVerse data and computing.',
    href: 'https://idss-mesa.github.io/docs/', linkLabel: 'Explore MESA', external: true,
    visual: 'mesa',
  },
]
