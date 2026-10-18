export default function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    pen: <><path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6 5-2" /><path d="M13 20h8" /></>,
    book: <path d="M12 5v16M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" />,
    leaf: <><path d="M20 3C8 1 2 7 5 15c8 5 16-1 15-12Z" /><path d="M3 21 15 9" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    back: <path d="M19 12H5m7-7-7 7 7 7" />,
    logout: <path d="M9 4H4v16h5m0-8h12m-5-5 5 5-5 5" />,
    upload: <path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    trash: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />,
    spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.leaf}</svg>
}
