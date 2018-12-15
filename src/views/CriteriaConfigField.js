import React from 'react'
import {
    Button,
    ButtonToolbar,
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
    Label,
    Collapse
} from 'reactstrap'
import Utilities from '../Utilities'
import NumericCondition from '../models/NumericCondition';
import { stringify } from 'querystring';
import Criteria from '../models/Criteria';

class NumericConditionField extends React.Component {
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

class CriteriaField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            make: Utilities.propagate(this.props.value, "make", false) || Object.getOwnPropertyNames(this.props.models)[0],
            isOpen: true,
            modelValidation: true
        }
        this.validate = this.validate.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    getSelectedOptions(select) {
        return Array.from(select.childNodes).filter(n => n.selected).map(n => n.value)
    }

    validate() {
        this.setState({modelValidation: Boolean(this.getSelectedOptions(document.getElementById(`model_${this.props.rand}`)).length)})
        return (Boolean(document.getElementById(`make_${this.props.rand}`).value) && Boolean(this.getSelectedOptions(document.getElementById(`model_${this.props.rand}`)).length)
        && this.priceRef.validate() && this.yearRef.validate() && this.mileageRef.validate())
    }

    getValue() {
        return new Criteria(document.getElementById(`make_${this.props.rand}`).value, this.getSelectedOptions(document.getElementById(`model_${this.props.rand}`)), this.priceRef.getValue(), this.yearRef.getValue(), this.mileageRef.getValue())
    }

    render() {
        var makes = {}
        var models = {}
        Utilities.map(this.props.models, (make, model) => makes[make] = make)
        if (this.props.models[this.state.make])
            this.props.models[this.state.make].map(model => models[model] = model)
        else
            Utilities.asArray(this.props.models)[0].map(model => models[model] = model)
        return <div style={{ border: '1px dashed #ced4da', marginBottom: '0.5rem', borderRadius: '0.3rem', padding: '0.5rem', boxSizing: 'content-box' }}>
            <Collapse isOpen={this.state.isOpen}>
                {Utilities.select(`make_${this.props.rand}`, true, 'Make', Boolean(this.state.make), 'A make is required.', '', this.state.make, makes, { innerRef: r => {
                    if (Boolean(r || document.getElementById(`make_${this.props.rand}`)))
                        (r || document.getElementById(`make_${this.props.rand}`)).onchange = () => this.setState({ make: (r || document.getElementById(`make_${this.props.rand}`)).value })
                } })}
                {Utilities.select(`model_${this.props.rand}`, true, 'Models', this.state.modelValidation, 'Select at least one model.', 'Hold Control (or Command on Mac) and click to select multiple models.', Utilities.propagate(this.props.value, 'models', []), models, { multiple: true })}
                <hr />
                {Utilities.label(null, 'Price Range')}
                <NumericConditionField ref={r => this.priceRef = r} rand={`${this.props.rand}_price`} />
                <hr />
                {Utilities.label(null, 'Year Range')}
                <NumericConditionField ref={r => this.yearRef = r} rand={`${this.props.rand}_year`} />
                <hr />
                {Utilities.label(null, 'Mileage Range')}
                <NumericConditionField ref={r => this.mileageRef = r} rand={`${this.props.rand}_mileage`} />
                <hr />
            </Collapse>
            <ButtonToolbar>
                <Button color="primary" style={{ marginRight: '1rem' }} size="sm" onClick={() => this.setState({ isOpen: !this.state.isOpen })}><i className="material-icons inline">{this.state.isOpen ? 'expand_less' : 'expand_more'}</i></Button>
                <Button color="danger" size="sm" onClick={() => this.props.onDelete(this.props.rand)}><i className="material-icons inline">delete</i></Button>
            </ButtonToolbar>
        </div>
    }
}

export default class CriteriaConfigField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            criteria: this.props.defaultValue || []
        }
        this.fields = []
        this.validate = this.validate.bind(this)
        this.getValue = this.getValue.bind(this)
    }

    validate() {
        return this.fields.filter(f => f != null).filter(f => f.validate() === false).length === 0
    }

    getValue() {
        return this.fields.filter(f => f != null).map(f => f.getValue())
    }

    delete(index) {
        this.setState({criteria: this.state.criteria.filter((c, i) => i !== index)})
    }

    render() {
        return <div>
            {this.state.criteria.map((c, i) => <CriteriaField key={i} ref={r => this.fields[i] = r} onDelete={this.delete.bind(this)} models={this.props.models} rand={i} value={c} />)}
            <Button color="primary" style={{ marginRight: '1rem' }} onClick={() => {
                var newCriteria = this.state.criteria
                newCriteria.push(new Criteria('', '' , null, null, null))
                this.setState({criteria: newCriteria})
            }}><i className="material-icons inline">add</i></Button>
        </div>
    }
}