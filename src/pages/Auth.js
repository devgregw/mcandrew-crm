import React from 'react'
import * as firebase from 'firebase'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Alert
} from 'reactstrap'
import * as queryString from 'query-string'

export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            mode: 'load'
        }
        firebase.auth().onAuthStateChanged(user => {
            let action = queryString.parse(window.location.search).action
            let ret = window.atob(queryString.parse(window.location.search).return || window.btoa('/'))
            if (user) {
                if (action === 'signout')
                    firebase.auth().signOut().then(() => {this.setState({mode: 'out'});window.history.replaceState({return: window.btoa(ret)}, '', '/auth')})
                else
                    window.location.replace(ret)
            } else if (this.state.mode !== 'out') {
                this.setState({mode: 'in'})
            }
        })
    }

    signIn() {
        this.setState({error: false, mode: 'load'})
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value).catch(e => this.setState({error: e.message, mode: 'in'})))
    }

    bindReturn(x, id) {
        (x || document.getElementById(id)).onkeypress = e => {
            if (e.keyCode === 13) {
                this.signIn.bind(this)()
                return false
            }
            return true
        }
    }

    render() {
        return <div className="Auth-background">
            <Card className="Auth-card" style={{minHeight: '571.8px'}}>
                <div className={this.state.mode === 'out' ? 'panel' : 'panel hide'}>
                    <CardBody>
                        <CardTitle>You've been signed out.</CardTitle>
                        <Button color="primary" onClick={() => this.setState({mode: 'in'})}>Sign In</Button>
                    </CardBody>
                </div>
                <div className={this.state.mode === 'load' ? 'panel ' : 'panel hide'}><img alt="Loading..." src="/loader.gif" style={{height: '200px'}}></img></div>
                <div className={this.state.mode === 'in' ? 'main-panel' : 'main-panel hide'}>
                    <div style={{ margin: '0.1rem' }}>
                        <img style={{ width: '50%' }} src="mcandrew.png" alt="McAndrew Motors" />
                        <img style={{ position: 'relative', width: '50%' }} src="centralalps.png" alt="Central Alps" />
                    </div>
                    <CardBody>
                        <CardTitle>Sign In</CardTitle>
                        <CardSubtitle>Sign in to continue to McAndrew Motors and Central Alps.</CardSubtitle>
                        <Form style={{
                            marginTop: '5px'
                        }}>
                            <Alert color="danger" isOpen={Boolean(this.state.error)}>
                                Error: {this.state.error}
                            </Alert>
                            <FormGroup>
                                <Input innerRef={x => this.bindReturn.bind(this, x, "email")()} type="email" id="email" placeholder="email address" />
                            </FormGroup>
                            <FormGroup>
                                <Input innerRef={x => this.bindReturn.bind(this, x, "password")()} type="password" id="password" placeholder="password" />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input id="remember" type="checkbox" />{' '}
                                    Remember me
                                    </Label>
                            </FormGroup>
                            <Button id="button" color="primary" onClick={this.signIn.bind(this)}>Sign in</Button>
                        </Form>
                    </CardBody>
                </div>
            </Card>
        </div>
    }
}