import React from 'react'

export default props => {
    return (
        <div className="col-md-4">
            <div className="about-col">
                <div className="img">
                    <img
                        src={props.src}
                        alt={props.title}
                        className="img-fluid"
                    />
                    <div className="icon">
                        <ion-icon name={props.icon}/>
                    </div>
                </div>
                <h2 className="title">
                    <a href={null}>
                        {props.title}
                    </a>
                </h2>
                <p style={{whiteSpace: 'pre-wrap'}}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}
