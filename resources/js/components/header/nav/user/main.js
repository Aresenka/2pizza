import React, {Component} from 'react'
import Item from './item'
import Cart from './cart'
import User from './user'

export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    id: 'navHome',
                    title: 'Home',
                    target: 'body',
                },
                {
                    id: 'navDeals',
                    title: 'Hot deals',
                    target: 'deals'
                },
                {
                    id: 'navMenu',
                    title: 'Menu',
                    target: 'menu'
                },
                {
                    id: 'navAbout',
                    title: 'About us',
                    target: 'about'
                },
            ],
            current: 'navHome'
        }

        this.scrollTo = this.scrollTo.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }

    //Add scroll handler
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    //Remove scroll handler
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    //Handle window scrolling to catch current section
    handleScroll() {
        //Define current position adjusted for header and one third of screen height
        let position = (window.pageYOffset || document.documentElement.scrollTop) +
            window.screen.height / 3 -
            document.getElementById('header').offsetHeight

        //Map all nav items to find current one
        this.state.items.map((item, i) => {
            let current = document.getElementById(item.target),
                next = this.state.items[i + 1] ? document.getElementById(this.state.items[i + 1].target) : false

            if (next) {
                //If current item is not last in the array check current position is between current item and next item positions
                if (position >= current.offsetTop && position < next.offsetTop) {
                    this.setState({current: item.id})
                }
            } else if (position >= current.offsetTop) {
                //Else check if current position is after current item position
                this.setState({current: item.id})
            }
        })
    }

    //Scroll to selected section
    scrollTo(target, item) {
        //Scroll to top if selected first section
        if (!target) {
            window.scrollTo({top: 0, behavior: "smooth"})
        } else {
            //Else scroll to section adjusted for header and part of screen height
            let top = document.getElementById(target).offsetTop -
                window.screen.height / 10 -
                document.getElementById('header').offsetHeight

            window.scrollTo({top: top, behavior: "smooth"})
        }
        this.setState({current: item})
    }

    render() {
        let items = this.state.items.map(item => {
            return (
                <Item
                    key={'nav_' + item.id}
                    id={item.id}
                    title={item.title}
                    target={item.target}
                    current={this.state.current}
                    scrollTo={this.scrollTo}
                />
            )
        })

        return (
            <ul>
                {items}
                <Cart empty={this.props.empty}/>
                <User handleClick={this.props.handleClick}/>
            </ul>
        )
    }

}
