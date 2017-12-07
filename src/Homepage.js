import React, { Component } from 'react'
import { Tab, TabList } from './Tabs';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orgs: []
        }
    }

    componentDidMount() {
        this.props.get('user/org')
            .then((orgs) => {
                this.setState({
                    orgs
                })
            })
    }
    render() {
        const tabs = this.state.orgs.map((org) => {
            return (
                <Tab name={org.login} key={org.login}>
                    <TabList vertical key={org.login}>
                        <Tab name="A1">
                            <h1>HelloA1</h1>
                        </Tab>
                        <Tab name="A2">
                            <h1>HelloA2</h1>
                        </Tab>
                        <Tab name="A3">
                            <h1>HelloA3</h1>
                        </Tab>
                    </TabList>
                </Tab>
            )
        })
        return (
            <TabList horizontal>
                {tabs}
            </TabList>
        );
    }
}
