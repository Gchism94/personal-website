export const metadata = {
  title: 'Contact — Greg Chism',
  description: 'Get in touch with Greg Chism — consulting inquiries, research collaboration, speaking, or just to say hello.',
}

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-8 py-20">
      <h1 className="font-serif text-4xl font-bold text-bark dark:text-cream mb-3">Contact</h1>
      <p className="font-dm-sans font-light text-base text-stone dark:text-cream/60 leading-relaxed mb-1">
        Based in Bend, Oregon. Usually responds within a few days.
      </p>
      <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-stone/50 dark:text-cream/35 mb-12">
        consulting · collaboration · speaking
      </p>

      {/* TODO: replace YOUR_FORM_ID with actual Formspree endpoint — sign up at formspree.io */}
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          <div>
            <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-stone/55 dark:text-cream/40 mb-2">Name</label>
            <input type="text" name="name" required placeholder="Your name"
              className="w-full rounded px-4 py-3 font-dm-sans font-light text-sm bg-linen dark:bg-white/4 border border-sand dark:border-white/10 text-bark dark:text-cream placeholder:text-stone/40 dark:placeholder:text-cream/25 focus:outline-none focus:border-rust dark:focus:border-teal transition-colors" />
          </div>
          <div>
            <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-stone/55 dark:text-cream/40 mb-2">Email</label>
            <input type="email" name="email" required placeholder="you@example.com"
              className="w-full rounded px-4 py-3 font-dm-sans font-light text-sm bg-linen dark:bg-white/4 border border-sand dark:border-white/10 text-bark dark:text-cream placeholder:text-stone/40 dark:placeholder:text-cream/25 focus:outline-none focus:border-rust dark:focus:border-teal transition-colors" />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-stone/55 dark:text-cream/40 mb-2">What brings you here?</label>
          <select name="inquiry_type"
            className="w-full rounded px-4 py-3 font-dm-sans font-light text-sm bg-linen dark:bg-white/4 border border-sand dark:border-white/10 text-bark dark:text-cream focus:outline-none focus:border-rust dark:focus:border-teal transition-colors">
            <option value="">Select a topic…</option>
            <option value="consulting">Consulting inquiry</option>
            <option value="research">Research collaboration</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.18em] uppercase text-stone/55 dark:text-cream/40 mb-2">Message</label>
          <textarea name="message" required rows={6} placeholder="Tell me more…"
            className="w-full rounded px-4 py-3 font-dm-sans font-light text-sm bg-linen dark:bg-white/4 border border-sand dark:border-white/10 text-bark dark:text-cream placeholder:text-stone/40 dark:placeholder:text-cream/25 focus:outline-none focus:border-rust dark:focus:border-teal transition-colors resize-none" />
        </div>

        <button type="submit"
          className="font-mono text-[10px] tracking-[0.16em] uppercase bg-bark dark:bg-cream text-linen dark:text-midnight hover:bg-juniper dark:hover:bg-teal px-6 py-3 rounded transition-colors duration-150 cursor-pointer">
          Send
        </button>
      </form>

      <div className="flex items-center gap-6 mt-12 pt-8 border-t border-sand/40 dark:border-white/6">
        {[
          { label: 'GitHub', href: 'https://github.com/Gchism94' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/greg-chism/' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone/55 dark:text-cream/40 hover:text-juniper dark:hover:text-teal transition-colors">
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
