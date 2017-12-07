import React, { Component } from 'react'


export class TabList extends Component {

    componentWillReceiveProps(nextProps) {
        console.error(nextProps)
        if (this.state.selected == null) {
            let defaultTab = React.Children.toArray(nextProps.children).map((child) => child.props.name)[0]

            React.Children.forEach(nextProps.children, (child) => {
                console.error('log react: ' + child)
                if (child.props.default) {
                    defaultTab = child.props.name
                }
            })
            this.setState({
                selected: defaultTab
            })
        }
    }


    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }

    select(name) {
        this.setState({
            selected: name
        })
    }

    render() {
        const tabs = React.Children.map(this.props.children, (child) => {
            console.error('log react: ' + child)
            const className = child.props.name === this.state.selected ? "selected" : "unselected"
            return (
                <h1 className={className} onClick={(e) => this.select(child.props.name)}>{child.props.name}</h1>
            )
        });
        let body;
        React.Children.forEach(this.props.children, (child) => {
            child.props.name === this.state.selected? body = child : null
        })

        const direction = this.props.horizontal ? "horizontal" : "vertical";
        return (
            <div className={`holder ${direction}`}>
                <div className={`tabs ${direction}`}>
                    {tabs}
                </div>
                <div className={`body ${direction}`}>
                    {body}
                </div>
            </div>
        )
    }
}

export class Tab extends Component {
    render() {
        return this.props.children
    }
}