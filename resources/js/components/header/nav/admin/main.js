import React from 'react'
import {NavLink, useRouteMatch} from "react-router-dom"

export default () => {
    let items = [
            {
                path: 'orders',
                title: 'Orders',
            },
        ],
        match = useRouteMatch(),
        links = items.map(item => {
            return (
                <li key={`nav_${item.path}`}>
                    <NavLink
                        to={`${match.url}/${item.path}`}
                        activeClassName='active'
                    >
                        {item.title}
                    </NavLink>
                </li>
            )
        })

    return (
        <ul>
            {links}
        </ul>
    )
}
