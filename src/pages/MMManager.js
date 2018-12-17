import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    Button,
    CardTitle,
    ButtonToolbar
} from 'reactstrap'
import DatabaseLoader from '../views/DatabaseLoader'
import Utilities from '../Utilities'
import FullScreenLoader from '../views/FullScreenLoader'
import * as firebase from 'firebase'

class ManagerCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            make: Object.getOwnPropertyNames(this.props.models)[0],
            models: this.props.models,
            deleteMake: false,
            deleteModels: false
        }
    }

    addMake(first) {
        var make
        if (Boolean(make = prompt('Enter make name'))) {
            var newModels = this.state.models
            newModels[make] = []
            this.setState({ make: make, models: newModels }, () => {
                if (first)
                    document.getElementById('make').value = make
            })
        }
    }

    addModel() {
        var model
        if (Boolean(model = prompt('Enter model name'))) {
            var newModels = this.state.models
            newModels[this.state.make].push(model)
            this.setState({ models: newModels })
        }
    }

    deleteMake() {
        var make = this.state.make
        var newModels = this.state.models
        delete newModels[make]
        if (Object.getOwnPropertyNames(newModels).length === 0) {
            var newMake = false
            while (!newMake)
                newMake = prompt('Enter make name')
            newModels[newMake] = []
        }
        this.setState({ deleteMake: false, make: Object.getOwnPropertyNames(newModels)[0], models: newModels }, () => document.getElementById('make').value = Object.getOwnPropertyNames(newModels)[0])
    }

    deleteModels() {
        var modelsToDelete = this.getSelectedModels()
        var newModelsArray = this.state.models[this.state.make].filter(m => modelsToDelete.indexOf(m) === -1)
        var newModels = this.state.models
        newModels[this.state.make] = newModelsArray
        this.setState({ models: newModels, deleteModels: false })
    }

    getSelectedModels() {
        return Array.from(document.getElementById('models').childNodes).filter(option => option.selected).map(option => option.value)
    }

    save() {
        let models = this.state.models
        models['Any'] = ['Any']
        this.setState({loading: true})
        firebase.database().ref('/models').set(models).then(() => window.location.assign('/'))
    }

    render() {
        document.title = 'Makes & Models - CRM'
        if (this.state.loading)
            return <FullScreenLoader />
        var makeOptions = {}
        Object.getOwnPropertyNames(this.state.models).forEach(m => makeOptions[m] = m)
        var modelOptions = {}
        this.state.models[this.state.make].forEach(m => modelOptions[m] = m)
        return <div className="Auth-background">
            <Modal isOpen={this.state.deleteMake} toggle={() => this.setState({ deleteMake: !this.state.deleteMake })}>
                <ModalHeader toggle={() => this.setState({ deleteMake: !this.state.deleteMake })}><p style={{ margin: '0' }}>Delete {this.state.make}</p></ModalHeader>
                <ModalBody>Are you sure you want to delete {this.state.make}?  All associated models will be deleted too.<br />This action cannot be undone.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.deleteMake.bind(this)}>Delete</Button>
                    <Button color="secondary" onClick={() => this.setState({ deleteMake: false })}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.deleteModels} toggle={() => this.setState({ deleteModels: !this.state.deleteModels })}>
                <ModalHeader toggle={() => this.setState({ deleteModels: !this.state.deleteModels })}><p style={{ margin: '0' }}>Delete Models</p></ModalHeader>
                <ModalBody>Are you sure you want to delete these models?<br />This action cannot be undone.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.deleteModels.bind(this)}>Delete</Button>
                    <Button color="secondary" onClick={() => this.setState({ deleteModels: false })}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Card className="Auth-card card-area">
                <CardBody>
                    <div className="">
                        <CardTitle>Makes &amp; Models Manager</CardTitle>
                        {Utilities.select('make', true, 'Make', true, '', 'Select a make to view the corresponding models.', this.state.make, makeOptions, {
                            innerRef: r => {
                                if (Boolean(r || document.getElementById('make')))
                                    (r || document.getElementById('make')).onchange = () => this.setState({ make: (r || document.getElementById('make')).value })
                            }
                        })}
                        <ButtonToolbar>
                            <Button onClick={this.addMake.bind(this)} size="sm" color="primary" style={{ marginRight: '1rem' }}><i className="material-icons inline">add</i></Button>
                            <Button onClick={() => this.setState({ deleteMake: true })} size="sm" color="danger"><i className="material-icons inline">delete</i></Button>
                        </ButtonToolbar>
                        <hr />
                        {Utilities.select('models', true, 'Models', true, '', 'Hold Control (or Command on Mac) and click to select multiple models.', [], modelOptions, { multiple: true })}
                        <ButtonToolbar>
                            <Button onClick={this.addModel.bind(this)} size="sm" color="primary" style={{ marginRight: '1rem' }}><i className="material-icons inline">add</i></Button>
                            <Button onClick={() => {
                                if (this.getSelectedModels().length > 0)
                                    this.setState({ deleteModels: true })
                            }} size="sm" color="danger"><i className="material-icons inline">delete</i></Button>
                        </ButtonToolbar>
                        <hr />
                        <ButtonToolbar>
                            <Button onClick={this.save.bind(this)} size="lg" color="success" style={{ marginRight: '0.5rem' }}><i className="material-icons inline">check</i></Button>
                            <Button onClick={() => window.location.assign('/')} size="lg" color="danger" style={{ marginLeft: '0.5rem' }}><i className="material-icons inline">close</i></Button>
                        </ButtonToolbar>
                    </div>
                </CardBody>
            </Card>
        </div>
    }
}

export default class MMManager extends React.Component {
    onLoadComplete(content) {
        delete content.models.Any
        return <ManagerCard models={content.models} />
    }

    render() {
        return <DatabaseLoader full map={{ models: '/models' }} complete={this.onLoadComplete.bind(this)} />
    }
}