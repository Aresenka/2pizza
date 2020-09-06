import React from 'react'

export default props => {
    function handleClick(e){
        props.changeCurrency(e)
    }

    return (
        <li
            onClick={handleClick}
            data-id={props.currency.id}
        >
            {props.currency.code}
        </li>
    )
}
