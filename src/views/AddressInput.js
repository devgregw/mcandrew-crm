import React from 'react'
import {
    FormGroup,
    Input,
    Label
} from 'reactstrap'
import Utilities from '../Utilities'
import Address from '../models/Address';

export default class AddressInput extends React.Component {
    constructor(props) {
        super(props)
        let _useAddress = Boolean(this.props.address)
        this.state = {
            useAddress: _useAddress,
            line1: _useAddress ? Boolean(Utilities.propagate(this.props.address, "line1", null)) : true,
            city: _useAddress ? Boolean(Utilities.propagate(this.props.address, "city", null)) : true,
            state: _useAddress ? Boolean(Utilities.propagate(this.props.address, "state", null)) : true,
            zip: _useAddress ? Boolean(Utilities.propagate(this.props.address, "zip", null)) : true
        }
        this.validate = this.validate.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    set useAddress(value) {
        this.setState({
            useAddress: value,
            line1: value ? Boolean(document.getElementById('line1').value) : true,
            city: value ? Boolean(document.getElementById('city').value) : true,
            state: value ? Boolean(document.getElementById('state').value) : true,
            zip: value ? Boolean(document.getElementById('zip').value) : true
        })
    }

    validate() {
        return this.state.useAddress ? Utilities.map(this.state, (k, v) => v).filter(b => b === false).length === 0 : true
    }

    getValue() {
        return this.state.useAddress ? new Address(document.getElementById('line1').value, document.getElementById('line2').value, document.getElementById('city').value, document.getElementById('state').value, document.getElementById('zip').value)  : null
    }

    render() {
        return <div>
            <FormGroup check>
                <Input type="checkbox" id="useAddress" onChange={() => this.useAddress = document.getElementById('useAddress').checked} defaultChecked={this.state.useAddress}/>{' '}
                <Label for="useAddress">Specify address</Label>
            </FormGroup>
            <fieldset disabled={!this.state.useAddress}>
                {Utilities.label(null, "Address")}<br />
                {Utilities.textField("line1", "text", false, "Line 1", this.state.line1, "Line 1 is required when specifiying an address.", null, Utilities.propagate(this.props.address, "line1", ""))}
                {Utilities.textField("line2", "text", false, "Line 2", true, "", "Optional.", Utilities.propagate(this.props.address, "line2", ""))}
                {Utilities.textField("city", "text", false, "City", this.state.city, "A city is required", null, Utilities.propagate(this.props.address, "city", ""))}
                {Utilities.stateSelect(this.state.state, Utilities.propagate(this.props.address, "state", ""))}
                {Utilities.textField("zip", "text", false, "Zip Code", this.state.zip, "A zip code is required.  Must be 5 digits.", null, Utilities.propagate(this.props.address, 'zip', ''))}
            </fieldset>
        </div>
    }
}