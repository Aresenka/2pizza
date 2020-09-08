import React from 'react'
import PropTypes from 'prop-types'

const Item = props => {
    //Handle click on the category
    function handleClick(e){
        let id = e.target.dataset.id
        props.changeFilter(id)
    }

    return (
        <li
            data-id={props.id}
            className={props.selected ? 'filter-active' : ''}
            onClick={handleClick}
        >
            {props.title}
        </li>
    )
}

export default Item

Item.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool
}
