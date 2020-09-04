import React from 'react'

export default props => {
    function handleChange(e) {
        let item = e.target,
            value = item.value,
            id = props.item.id
        props.changeCount(id, value)
    }

    function handleClick(){
        props.removeItem(props.item.id)
    }

    if (props.empty) {
        return (
            <div className='cart-item-placeholder'>
                Your cart is empty!
            </div>
        )
    } else {
        let item=props.item

        return (
            <div className='cart-item row'>
                <div className='col-md-3 col-6'>
                    <div className='cart-image position-relative'>
                        <img
                            src={'/images/meals/'+item.meal_pic}
                            alt={item.meal_title}
                        />
                        <div
                            className='cart-remove'
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <div className='cart-title my-auto col-md-3 col-6'>
                    {item.meal_title}
                </div>
                <div className='cart-count my-auto col-md-3 col-6'>
                    <input
                        type='number'
                        value={item.count}
                        className='form-control cart-count'
                        onChange={handleChange}
                    />
                </div>
                <div className='cart-price my-auto col-md-3 col-6'>
                    {item.price * item.count + props.currency.data.symbol}
                </div>
            </div>
        )
    }
}
