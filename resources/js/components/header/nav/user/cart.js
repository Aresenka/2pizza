import React from 'react'

export default props => {
    return (
        <li>
            <a
                id="cart"
                className={`pointer ${props.empty ? 'emptyCart' : ''}`}
            >
                <ion-icon
                    name="basket-outline"
                    size='large'
                />
            </a>
        </li>
    )
}
