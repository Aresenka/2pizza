import React from 'react'

export default props => {
    return (
        <div className={props.className}>
            <label htmlFor={props.input_id}>
                {props.label}
            </label>
            <input
                id={props.input_id}
                className={'form-control'+(props.error ? ' error' : '')}
                type='text'
                placeholder={props.placeholder}
            />
            <div className={'error'+(!props.error ? ' hide' : '')}>
                {props.error_text}
            </div>
        </div>
    )
}
