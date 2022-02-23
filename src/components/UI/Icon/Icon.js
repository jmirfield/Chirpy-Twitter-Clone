import React from 'react'

const Icon = (props) => {
    return (
        <svg
            viewBox={props.viewBox || "0 0 24 24"}
            width={props.width}
            height={props.height}
            fill={props.fill}
            className={props.className}
            onClick={props.onClick}
        >
            <g>
                {props.d.map((value) => (
                    <path key={value} d={value}></path>
                ))}
            </g>
        </svg>
    )
}

export default Icon
