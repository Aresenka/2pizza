import React from 'react'

export default props => {
    return (
        <li>
            <a
                id="profile"
                className='profile pointer'
                onClick={props.handleClick}
            >
                <ion-icon
                    name="person-circle-outline"
                    size='large'
                />
            </a>
        </li>
    )
}
