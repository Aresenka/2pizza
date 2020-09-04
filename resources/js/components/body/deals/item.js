import React from 'react'

export default props => {
    return (
        <div className="col-lg-4 box">
            {props.icon}
            <h4 className="title">
                <a>
                    {props.title}
                </a>
            </h4>
            <p className="description">
                {props.text}
            </p>
        </div>
    )
}
