import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input
} from 'reactstrap';
import * as firebase from 'firebase'
import CustomerEditorModal from './CustomerEditorModal'

export default class CRMHomeNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            displayNameModal: false,
            displayNameLoading: false,
            newCustomerModal: false,
        }
        this.toggle = this.toggle.bind(this)
        this.toggleDisplayNameModal = this.toggleDisplayNameModal.bind(this)
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    toggleDisplayNameModal() {
        this.setState({ displayNameModal: !this.state.displayNameModal, displayNameLoading: false })
    }

    toggleNewCustomerModal() {
        this.setState({newCustomerModal: !this.state.newCustomerModal})
    }

    render() {
        return <div>
            <CustomerEditorModal zone={this.props.match.params.area} models={this.props.models} isOpen={this.state.newCustomerModal} toggle={this.toggleNewCustomerModal.bind(this)}/>
            <Modal isOpen={this.state.displayNameModal} toggle={this.toggleDisplayNameModal}>
                <ModalHeader toggle={this.toggleDisplayNameModal}>Change Display Name</ModalHeader>
                <ModalBody>
                    {this.state.displayNameLoading ? <div style={{ width: '100%' }}><img alt="Loading..." style={{ height: '100px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} src="/loader.gif" /></div> :
                        <div>
                            <p>Enter your new display name:</p>
                            <Input id="displayName" defaultValue={firebase.auth().currentUser.displayName} />
                        </div>}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.setState({ displayNameLoading: true }); firebase.auth().currentUser.updateProfile({ displayName: document.getElementById('displayName').value }).then(() => this.toggleDisplayNameModal()) }}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDisplayNameModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Navbar dark color="dark" expand="md">
                <NavbarBrand href={`/${this.props.match.params.area}`}>{this.props.zoneName}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink active href={`/${this.props.match.params.area}`}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href={`/${this.props.match.params.area}/search`}>Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active href="/">Select Area</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={{color: 'white'}} nav caret>New</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.toggleNewCustomerModal.bind(this)}>Customer</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={{color: 'white'}} nav caret>{firebase.auth().currentUser.displayName || firebase.auth().currentUser.email}</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.toggleDisplayNameModal}>Change Display Name</DropdownItem>
                                <DropdownItem href="/auth/new">Create New Account</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="/auth?action=signout" style={{color: 'var(--danger)'}}>Sign Out</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    }
}