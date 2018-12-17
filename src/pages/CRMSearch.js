import React from 'react'
import SearchCriteriaView from '../views/SearchCriteriaView';
import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import DatabaseLoader from '../views/DatabaseLoader'
import Customer from '../models/Customer'
import Utilities from '../Utilities'
import CRMSearchNavbar from '../views/CRMSearchNavbar'
import CustomerCardView from '../views/CustomerCardView'

export default class CRMSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: false
        }
    }

    search(make, model, price, year, mileage) {
        this.setState({results: this.allCustomers.filter(c => Customer.isMatch(c, make, model, price, year, mileage))})
    }

    onLoadComplete(content) {
        document.title = `Search ${this.zoneName} - CRM`
        this.allCustomers = Utilities.map(content.customers, (id, c) => Customer.fromJson(c))
        return <div>
            <CRMSearchNavbar match={this.props.match} zoneName={this.zoneName} />
            <Breadcrumb style={{ marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
                <BreadcrumbItem><a href={`/${this.props.match.params.area}`}>{this.zoneName}</a></BreadcrumbItem>
                <BreadcrumbItem active>Search</BreadcrumbItem>
            </Breadcrumb>
            <div style={{margin: '1rem'}}>
            <SearchCriteriaView search={this.search.bind(this)} models={content.models}/>
            <hr/>
            {this.state.results ? (this.state.results.length > 0 ? this.state.results.map((c, i) => <CustomerCardView z={Math.abs(100 - i)} zone={this.props.match.params.area} models={content.models} customer={c} key={c.id}/>) : <h6>No results.</h6>) : <h6>Click <i className="material-icons">search</i> to search.</h6>}
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