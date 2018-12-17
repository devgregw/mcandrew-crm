import React from 'react'
import {
    Button,
    ButtonToolbar,
    Collapse
} from 'reactstrap'
import Utilities from '../Utilities'
import Criteria from '../models/Criteria'
import NumericConditionField from './NumericConditionField'

export default class CriteriaField extends React.Component {
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