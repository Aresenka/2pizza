import React from 'react'

export default props => {
    return (
        <li>
            <a
                className={`pointer ${props.empty ? 'emptyCart' : ''}`}
                id="cart"
            >
                <ion-icon
                    name="basket-outline"
                    size='large'
                />
            </a>
        </li>
    )
}
