import React from 'react'
import {
    Button
} from 'reactstrap'
import Criteria from '../models/Criteria'
import CriteriaField from './CriteriaField'

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