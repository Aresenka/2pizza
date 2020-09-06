import React, {useState} from 'react'

export default props => {
    let item = props.item

    const [value, setValue] = useState(item.count)

    function handleChange(e) {
        let value = e.target.value

        setValue(value)
        props.changeItemCount(props.item.id, value)
    }

    function handleClick() {
        props.removeFromCart(props.item.id)
    }

    return (
        <div className='row order-item'>
            <div className='col-6 col-md-3 mb-3 mb-lg-0'>
                <div className='order-item-image position-relative'>
                    <img
                        src={'/images/meals/' + item.meal_pic}
                        alt={item.meal_title}
                    />
                    <div
                        className='item-remove'
                        onClick={handleClick}
                    />
                </div>
            </div>
            <div className='col-6 col-md-3 order-item-title my-auto'>
                {item.meal_title}
            </div>
            <div className='col-6 col-md-3 my-auto order-item-count'>
                <input
                    type='number'
                    className='form-control'
                    min={1}
                    onChange={handleChange}
                    value={value}
                />
            </div>
            <div className='col-6 col-md-3 my-auto order-item-price'>
                {(item.price * item.count) + props.currency}
            </div>
        </div>
    )
}
