export default function Logo({ compact = false }) {
  return <span className="brand">{compact ? 'Bn' : 'BlogNest'}<span className="brand-period">.</span></span>
}
