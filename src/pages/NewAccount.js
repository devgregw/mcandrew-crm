import React from 'react'
import * as firebase from 'firebase'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Card,
    CardBody,
    CardTitle,
    Alert
} from 'reactstrap'
import * as queryString from 'query-string'
import DatabaseLoader from '../views/DatabaseLoader'
import RequireAuth from '../views/RequireAuth'
import { Redirect } from 'react-router-dom'

export default class NewAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
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

    create() {
        firebase.auth().createUserWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value).then(() => {
            if (this.token)
                firebase.database().ref('/tokens').set(this.tokens.filter((t, i) => i !== this.tokens.indexOf(this.token))).then(() => window.location.replace('/'))
            else
                firebase.auth().signOut().then(() => window.location.replace('/'))
        }, error => {
            this.setState({ error: error.message })
        })
    }

    onLoadComplete(content) {
        this.tokens = content.tokens
        if (this.token && content.tokens.indexOf(this.token) === -1)
            return <Redirect to="/error?code=104" />
        document.title = 'New Account - CRM'
        return <div className="Auth-background">
            <Card className="Auth-card card-area">
                <CardBody>
                    <div className="">
                        <CardTitle>New Account</CardTitle>
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
                            <Button id="button" color="primary" onClick={this.create.bind(this)}>Create Account</Button>
                        </Form>
                    </div>
                </CardBody>
            </Card>
        </div>
    }

    render() {
        this.token = queryString.parse(window.location.search).token || ''
        if (!this.token)
            return <RequireAuth render={() => this.onLoadComplete.bind(this, { tokens: [] })()} />
        return <DatabaseLoader full map={{ tokens: '/tokens' }} complete={this.onLoadComplete.bind(this)} />
    }
}