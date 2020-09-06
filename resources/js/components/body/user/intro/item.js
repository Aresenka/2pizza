import React from 'react'

export default props => {
    return (
        <div
            className={"carousel-item" + (props.item_id === 0 ? ' active' : '')}
            style={{backgroundImage: props.src}}
        >
            <div className="carousel-container">
                <div className="container">
                    <h2 className="animate__animated animate__fadeInDown">
                        {props.title}
                    </h2>
                    <p className="animate__animated animate__fadeInUp">
                        {props.text}
                    </p>
                </div>
            </div>
        </div>
    )
}
