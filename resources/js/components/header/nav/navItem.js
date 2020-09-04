import React from 'react'

export default props => {
    function handleClick(){
        props.scrollTo(props.target, props.id)
    }
    return (
        <li
            id={props.id}
            className={props.current === props.id ? 'active' : ''}
        >
            <a
                className='pointer'
                href={null}
                onClick={handleClick}
            >
                {props.title}
            </a>
        </li>
    )
}
