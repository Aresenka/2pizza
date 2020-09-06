import React from 'react'

export default props => {
    function handleClick(){
        props.scrollTo(props.target, props.id)
    }
    return (
        <li
            id={props.id}
            className='d-none d-lg-block'
        >
            <a
                className={`pointer ${props.current === props.id ? 'active' : ''}`}
                href={null}
                onClick={handleClick}
            >
                {props.title}
            </a>
        </li>
    )
}
