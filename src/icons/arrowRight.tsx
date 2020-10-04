import * as React from "react"

// Todas las funciones que se exporten deben comenzar con Capital (may)
const IconArrowRight = (props:any) => {
  return (
    <svg height={21} viewBox="0 0 21 21" width={21} {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#2a2e3b"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d="M9.5 11.499l3-3-3-3M12.5 8.5h-8" />
      </g>
    </svg>
  )
}

export default IconArrowRight