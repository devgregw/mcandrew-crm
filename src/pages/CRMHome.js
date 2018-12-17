import React from 'react'
import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import DatabaseLoader from '../views/DatabaseLoader'
import CRMHomeNavbar from '../views/CRMHomeNavbar'
import Utilities from '../Utilities'
import CustomerCardView from '../views/CustomerCardView'

export default class CRMHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onLoadComplete(content) {
        return <div>
            <CRMHomeNavbar models={content.models} match={this.props.match} zoneName={this.zoneName}/>
            <Breadcrumb style={{marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem'}}>
                <BreadcrumbItem><a href={`/${this.props.match.params.area}`}>{this.zoneName}</a></BreadcrumbItem>
                <BreadcrumbItem active>Customers</BreadcrumbItem>
            </Breadcrumb>
            <div style={{margin: '1rem'}}>
                {Object.getOwnPropertyNames(content.customers).length === 0 ? <h5>No data available.</h5> : Utilities.asArray(content.customers).map((c, i) => <CustomerCardView z={Math.abs(100 - i)} zone={this.props.match.params.area} models={content.models} customer={c} key={c.id}/>)}
            </div>
        </div>
    }

    render() {
        switch (this.props.match.params.area) {
            case 'mcam':
                this.zoneName = 'McAndrew Motors'
                break
            case 'ca':
                this.zoneName = 'Central Alps'
                break
            default:
                window.location.replace('/error?code=102')
                return null
        }
        return <DatabaseLoader full map={{customers: `/${this.props.match.params.area}/customers`, models: '/models'}} complete={this.onLoadComplete.bind(this)}/>
    }
}