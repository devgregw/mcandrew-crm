import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormFeedback,
    FormText,
    Input,
    InputGroup,
    Label
} from 'reactstrap'
import Utilities from '../Utilities'
import CriteriaConfigField from './CriteriaConfigField'
import Customer from '../models/Customer';
import Address from '../models/Address';
import * as firebase from 'firebase'
import AddressInput from './AddressInput'

export default class CustomerEditorModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: Boolean(Utilities.propagate(this.props.customer, 'firstName', '')),
            lastName: Boolean(Utilities.propagate(this.props.customer, 'lastName', '')),
            phoneNumberFormat: true,
            emailAddressFormat: true,
            address: true,
            loading: false
        }
    }

    validatePhoneNumber(number) {
        var int = parseInt(number)
        if (isNaN(int))
            return false
        if (int <= 1000000000 || int >= 9999999999)
            return false
        return true
    }

    validateZipCode(code) {
        var int = parseInt(code)
        if (isNaN(int))
            return false
        if (int <= 10000 || int > 99999)
            return false
        return true
    }

    validate() {
        var newState = {
            firstName: Boolean(document.getElementById('firstName').value),
            lastName: Boolean(document.getElementById('lastName').value),
            phoneNumberFormat: Boolean(document.getElementById('phone').value) ? this.validatePhoneNumber(document.getElementById('phone').value) : true,
            emailAddressFormat: Boolean(document.getElementById('email').value) ? document.getElementById('email').checkValidity() : true,
            address: this.addressInput.validate(),
            criteria: Boolean(this.criteriaConfigField.validate())
        }
        this.setState(newState)
        return (Utilities.asArray(newState).findIndex((v) => Boolean(v) == false) === -1)
    }

    save() {
        if (this.validate()) {
            var address = this.addressInput.getValue()
            var customer = new Customer(Utilities.propagate(this.props.customer, 'id', Utilities.createId()), document.getElementById('lastName').value, document.getElementById('firstName').value, document.getElementById('phone').value, document.getElementById('email').value, address, document.getElementById('notes').value, this.criteriaConfigField.getValue())
            this.setState({ loading: true })
            setTimeout(() => firebase.database().ref(`${this.props.zone}/customers/${customer.id}`).set(customer).then(() => window.location.reload()), 1000)
        }
    }

    render() {
        return <Modal size="lg" isOpen={this.props.isOpen} toggle={!this.state.loading ? this.props.toggle : null}>
            <ModalHeader toggle={!this.state.loading ? this.props.toggle : null}>{Boolean(this.props.customer) ? <p style={{margin: '0'}}>Edit {this.props.customer.lastName}, {this.props.customer.firstName} <span style={{fontSize: '14px'}}>(<span style={{fontFamily: '"Roboto Mono", monospace'}}>{this.props.customer.id}</span>)</span></p> : <p style={{margin: '0'}}>New Customer</p> }</ModalHeader>
            <ModalBody>
                {!this.state.loading ? <Form>
                    {Utilities.label(null, "Name")}
                    {Utilities.textField("firstName", "text", true, "First Name", this.state.firstName, "This field is required.", null, Utilities.propagate(this.props.customer, 'firstName', ''))}
                    {Utilities.textField("lastName", "text", true, "Last Name", this.state.lastName, "This field is required.", null, Utilities.propagate(this.props.customer, 'lastName', ''))}
                    <hr />
                    {Utilities.label(null, "Contact Information")}
                    {Utilities.textField("phone", "tel", false, "Phone Number", this.state.phoneNumberFormat, "Only use digits.  Must be 10 digits long.", "Optional.", Utilities.propagate(this.props.customer, 'phone', ''))}
                    {Utilities.textField("email", "email", false, "Email Address", this.state.emailAddressFormat, "Invalid email address.", "Optional.", Utilities.propagate(this.props.customer, 'email', ''))}
                    <hr />
                    <AddressInput ref={r => this.addressInput = r} address={Utilities.propagate(this.props.customer, 'address', null)}/>
                    <hr />
                    {Utilities.textField('notes', 'textarea', false, 'Notes', true, '', 'Optional.', Utilities.propagate(this.props.value, 'notes', ''))}
                    <hr/>
                    {Utilities.label(null, 'Criteria')}
                    {<CriteriaConfigField models={this.props.models} ref={f => this.criteriaConfigField = f} defaultValue={Utilities.propagate(this.props.customer, 'criteria', [])} />}
                </Form> : <div style={{ width: '100%' }}><img alt="Loading..." style={{ height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} src="/loader.gif" /></div>}
            </ModalBody>
            {!this.state.loading ? <ModalFooter>
                <Button color="primary" onClick={this.save.bind(this)}>Save</Button>
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter> : null}
        </Modal>
    }
}