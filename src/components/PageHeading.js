export default function PageHeading({ label, children, description }) {
  return <header className="page-heading">
    <p className="editorial-label">{label}</p>
    <h1>{children}</h1>
    {description && <p className="page-lede">{description}</p>}
  </header>
}
