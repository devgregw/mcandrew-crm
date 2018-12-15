import React from 'react'
import * as firebase from 'firebase'
import {
    Card,
    CardBody
} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import FullScreenLoader from './FullScreenLoader'

export default class RequireAuth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 0
        }
        firebase.auth().onAuthStateChanged(user => this.setState({status: user ? 2 : 1}))
    }

    render() {
        if (this.state.status === 2)
            return this.props.render()
        else if (this.state.status === 1)
            return <Redirect to={`/auth?return=${window.btoa(window.location.pathname + window.location.search)}`}/>
        return <FullScreenLoader/>
    }
}