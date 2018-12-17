import React from 'react'
import Utilities from '../Utilities'
import {
    Button,
    ButtonToolbar,
    Card,
    CardBody,
    CardTitle,
    Collapse,
    Form
} from 'reactstrap'

export default class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
            make: 'Any',
            price: true,
            year: true,
            mileage: true
        }
        this.validate = this.validate.bind(this)
        this.search = this.search.bind(this)
    }

    validate() {
        var newState = {
            price: document.getElementById('price').checkValidity() && document.getElementById('price').value >= 0,
            year: document.getElementById('year').checkValidity() && document.getElementById('year').value >= 1000,
            mileage: document.getElementById('mileage').checkValidity() && document.getElementById('mileage').value >= 0
        }
        this.setState(newState)
        return Utilities.map(newState, (k, v) => v).filter(b => b === false).length === 0
    }

    search() {
        if (this.validate()) {
            this.props.search(document.getElementById('make').value, document.getElementById('model').value, document.getElementById('price').value, document.getElementById('year').value, document.getElementById('mileage').value)
        }
    }

    render() {
        var makes = {}
        var models = {}
        Utilities.map(this.props.models, (make, model) => makes[make] = make)
        if (this.props.models[this.state.make])
            this.props.models[this.state.make].map(model => models[model] = model)
        return <Card style={{ zIndex: 1000 }} className="Content-card">
            <CardBody>
                <CardTitle>Search Criteria</CardTitle>
                <Collapse isOpen={this.state.isOpen}>
                    <Form>
                        {Utilities.select('make', true, 'Make', true, '', '', this.state.make, makes, {
                            innerRef: r => {
                                if (Boolean(r || document.getElementById('make')))
                                    (r || document.getElementById('make')).onchange = () => this.setState({ make: (r || document.getElementById('make')).value })
                            }
                        })}
                        {Utilities.select('model', true, 'Model', true, '', '', 'Any', models)}
                        <hr />
                        {Utilities.textField('price', 'number', true, 'Price', this.state.price, 'A price is required.  Must be at least 0.', '', 0)}
                        <hr />
                        {Utilities.textField('year', 'number', true, 'Year', this.state.year, 'A year is required.  Must be a four-digit number.', '', new Date().getFullYear())}
                        <hr />
                        {Utilities.textField('mileage', 'number', true, 'Mileage', this.state.mileage, 'A mileage is required.  Must be at least 0.', '', 0)}
                        <hr />
                    </Form>
                </Collapse>
                <ButtonToolbar className="Content-card-toolbar">
                    <Button color="primary" style={{ marginRight: '1rem' }} onClick={() => this.setState({ isOpen: !this.state.isOpen })}><i className="material-icons inline">{this.state.isOpen ? 'expand_less' : 'expand_more'}</i></Button>
                    <Button color="primary" onClick={this.search}><i className="material-icons inline">search</i></Button>
                </ButtonToolbar>
            </CardBody>
        </Card>
    }
}