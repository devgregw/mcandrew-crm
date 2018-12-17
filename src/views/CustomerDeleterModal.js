import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import * as firebase from 'firebase'

export default class CustomerDeleterModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    delete() {
        this.setState({loading: true})
        firebase.database().ref(`/${this.props.zone}/customers/${this.props.customer.id}`).remove().then(() => window.location.reload())
    }

    render() {
        return <Modal isOpen={this.props.isOpen} toggle={!this.state.loading ? this.props.toggle : null}>
            <ModalHeader toggle={!this.state.loading ? this.props.toggle : null}><p style={{margin: '0'}}>Delete {this.props.customer.lastName}, {this.props.customer.firstName} <span style={{fontSize: '14px'}}>(<span style={{fontFamily: '"Roboto Mono", monospace'}}>{this.props.customer.id}</span>)</span></p></ModalHeader>
            <ModalBody>
                {!this.state.loading ? <p>Are you sure you want to delete this customer?<br/>This action cannot be undone.</p> : <div style={{ width: '100%' }}><img alt="Loading..." style={{ height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} src="/loader.gif" /></div>}
            </ModalBody>
            {!this.state.loading ? <ModalFooter>
                <Button color="danger" onClick={this.delete.bind(this)}>Delete</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter> : null}
        </Modal>
    }
}