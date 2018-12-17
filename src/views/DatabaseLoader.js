import React from 'react'
import FullScreenLoader from './FullScreenLoader'
import * as firebase from 'firebase'

export default class DatabaseLoader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            content: null
        }
        var content = {}
        var promises = []
        Object.getOwnPropertyNames(this.props.map).forEach(n => promises.push(firebase.database().ref(this.props.map[n]).once('value').then(snap => content[n] = snap.exists() ? snap.val() : {})))
        Promise.all(promises).then(() => this.setState({loading: false, content: content}))
    }

    render() {
        if (this.state.loading) {
            document.title = 'Loading - CRM'
            return this.props.full ? <FullScreenLoader/> : <div style={{width: '100%'}}><img alt="Loading..." style={{height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)'}} src="/loader.gif"/></div>
        } else
            return this.props.complete(this.state.content)
    }
}