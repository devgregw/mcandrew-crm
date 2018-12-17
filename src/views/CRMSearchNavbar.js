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

export default class CRMSearchNavbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            displayNameModal: false,
            displayNameLoading: false,
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

    render() {
        return <div>
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
                            <DropdownToggle disabled nav caret>New</DropdownToggle>
                            <DropdownMenu/>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={{color: 'white'}} nav caret>{firebase.auth().currentUser.displayName || firebase.auth().currentUser.email}</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.toggleDisplayNameModal}>Change Display Name</DropdownItem>
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