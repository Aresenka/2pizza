import React from 'react'
import PropTypes from 'prop-types'

const Item = props => {
    function handleClickDetails(){
        props.showDetails(props.item.id)
    }

    function handleClickBuy(){
        props.addToCart(props.item.id)
    }

    let item = props.item

    return (
        <div
            data-id={item.id}
            className="col-lg-4 col-md-6 menu-item"
        >
            <div className="menu-wrap">
                <figure>
                    <img
                        src={'/images/meals/'+item.meal_pic}
                        className="img-fluid"
                        alt={item.meal_title}
                    />
                    <a
                        href={null}
                        className="link-details"
                        title="More Details"
                        data-id={item.id}
                        onClick={handleClickDetails}
                    >
                        <ion-icon
                            name="eye-outline"
                            size='medium'
                        />
                    </a>
                    <a
                        href={null}
                        className="link-buy"
                        title="Add to cart"
                        data-id={item.id}
                        onClick={handleClickBuy}
                    >
                        <ion-icon
                            name="fast-food-outline"
                            size='medium'
                        />
                    </a>
                    <div className='menu-price'>
                        {item.price+props.currency.symbol}
                    </div>
                </figure>
                <div className="menu-info">
                    <h4>{item.meal_title}</h4>
                    <p>{item.meal_desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Item

Item.propTypes = {
    item: PropTypes.object
}
