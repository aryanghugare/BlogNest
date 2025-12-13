import React from 'react'
import logoSrc from '../assets/Blog Logo.png'

function Logo({width = '100px' }) {
  return (
    <div
      role="img"
      aria-label="BlogNest logo"
      style={{ width }}
      className="flex items-center gap-2"
    >
      <img src={logoSrc} alt="BlogNest" className="w-full h-auto object-contain rounded-sm shadow-lg" />

      <span className="hidden sm:inline-block text-sm font-medium text-gray-600 select-none">
        BlogNest
      </span>
    </div>
  )
}

export default Logo