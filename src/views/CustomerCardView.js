import React from 'react'
import Customer from '../models/Customer'
import {
    Button,
    ButtonToolbar,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Collapse,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap'
import CustomerEditorModal from './CustomerEditorModal'
import CustomerDeleterModal from './CustomerDeleterModal'

export default class CustomerCardView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            customer: Customer.fromJson(this.props.customer),
            edit: false,
            delete: false
        }
    }

    toggleEditor() {
        this.setState({edit: !this.state.edit})
    }

    toggleDeleter() {
        this.setState({delete: !this.state.delete})
    }

    render() {
        return <Card style={{zIndex: this.props.z}} className="Content-card">
            <CustomerEditorModal zone={this.props.zone} models={this.props.models} customer={this.state.customer} isOpen={this.state.edit} toggle={this.toggleEditor.bind(this)}/>
            <CustomerDeleterModal zone={this.props.zone} customer={this.state.customer} isOpen={this.state.delete} toggle={this.toggleDeleter.bind(this)}/>
            <CardBody>
                <CardTitle>{this.state.customer.lastName}, {this.state.customer.firstName}</CardTitle>
                {this.state.customer.address ? <CardSubtitle>{this.state.customer.address.city}, {this.state.customer.address.state}</CardSubtitle> : null}
                <p>
                    {this.state.customer.phone ? <a style={{ display: 'inline' }} href={`tel:${this.state.customer.phone}`}>{this.state.customer.formattedPhoneNumber}<br /></a> : null}
                    {this.state.customer.email ? <a style={{ display: 'inline' }} href={`mailto:${this.state.customer.email}`}>{this.state.customer.email}</a> : null}
                </p>
                <hr />
                <Collapse isOpen={this.state.isOpen}>
                    {this.state.customer.criteria ? this.state.customer.criteria.map(c => <div>{c.summaryP}<hr /></div>) : <h6>No data available.</h6>}
                </Collapse>
                <ButtonToolbar className="Content-card-toolbar">
                    <Button color="primary" style={{ marginRight: '1rem' }} onClick={() => this.setState({ isOpen: !this.state.isOpen })}><i className="material-icons inline">{this.state.isOpen ? 'expand_less' : 'expand_more'}</i></Button>
                    <UncontrolledDropdown>
                        <DropdownToggle caret color="secondary">Actions</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.toggleEditor.bind(this)}>Edit</DropdownItem>
                            <DropdownItem style={{ color: "var(--danger)" }} onClick={this.toggleDeleter.bind(this)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <div style={{ alignSelf: 'center' }}>
                        <p style={{ color: 'gray', marginLeft: '1rem', marginBottom: '0', fontSize: '14px' }}>ID: <span style={{fontFamily: '"Roboto Mono", monospace'}}>{this.state.customer.id}</span></p>
                    </div>
                </ButtonToolbar>
            </CardBody>
        </Card>
    }
}