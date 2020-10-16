import * as React from "react"

function IconCross(props:any) {
  return (
    <svg height={40} viewBox="0 0 21 21" width={40} {...props}>
      <g
        fill="current"
        fillRule="evenodd"
        stroke="current"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d="M5.5 5.5l6 6M11.5 5.5l-6 6" />
      </g>
    </svg>
  )
}

export default IconCross