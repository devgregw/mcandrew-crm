import React from 'react'
import {
    FormGroup,
    FormFeedback,
    Input,
    Label
} from 'reactstrap'
import Utilities from '../Utilities'
import NumericCondition from '../models/NumericCondition'

export default class NumericConditionField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            any: this.props.value == null,
            value: true
        }
        this.validate = this.validate.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    validate() {
        if (this.state.any)
            return true
        this.setState({ value: document.getElementById(`value_${this.props.rand}`).checkValidity() })
        return document.getElementById(`value_${this.props.rand}`).checkValidity()
    }

    getValue() {
        if (this.state.any)
            return null
        return new NumericCondition(document.getElementById(`condition_${this.props.rand}`).value, parseInt(document.getElementById(`value_${this.props.rand}`).value))
    }

    render() {
        return <div>
            <FormGroup check>
                <Input id={`any_${this.props.rand}`} type="checkbox" innerRef={f => {
                    if (Boolean(f || document.getElementById(`any_${this.props.rand}`)))
                        (f || document.getElementById(`any_${this.props.rand}`)).onchange = () => this.setState({ any: (f || document.getElementById(`any_${this.props.rand}`)).checked })
                }} defaultChecked={this.state.any} />{' '}
                <Label for={`any_${this.props.rand}`}>Any</Label>
            </FormGroup>
            <FormGroup>
                <Input id={`condition_${this.props.rand}`} disabled={this.state.any} type="select" defaultValue={Utilities.propagate(this.props.value, 'comparison', '==')}>
                    <option value="==">Equal</option>
                    <option value="!=">Not equal</option>
                    <option value=">">Greater than</option>
                    <option value=">=">Greater than or equal</option>
                    <option value="<">Less than</option>
                    <option value="<=">Less than or equal</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Input invalid={!this.state.value} id={`value_${this.props.rand}`} disabled={this.state.any} type="number" min="0" step="1" defaultValue={Utilities.propagate(this.props.value, 'value', 0)} />
                <FormFeedback valid={this.state.value || document.getElementById(`value_${this.props.rand}`).checkValidity()}>A value is required.</FormFeedback>
            </FormGroup>
        </div>
    }
}