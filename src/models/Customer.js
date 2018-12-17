import Address from './Address'
import Criteria from './Criteria'
import Utilities from '../Utilities'

export default class Customer {
    constructor(id, lastName, firstName, phone, email, address, notes, criteria) {
        this.lastName = lastName
        this.firstName = firstName
        this.phone = phone
        this.email = email
        this.address = address
        this.criteria = criteria
        this.id = id
        this.notes = notes
    }

    static isMatch(customer, make, model, price, year, mileage) {
        if (Boolean(Utilities.propagate(customer.criteria, 'length', 0))) {
            var result = false
            customer.criteria.forEach(c => result = result || Criteria.isMatch(c, make, model, price, year, mileage))
            return result
        }
        return false
    }

    get name() {
        return `${this.lastName}, ${this.firstName}`
    }

    get formattedPhoneNumber() {
        if (!this.phone)
            return ''
        return `(${this.phone.substr(0, 3)}) ${this.phone.substr(3, 3)}-${this.phone.substr(6, 4)}`
    }

    static fromJson(json) {
        return new Customer(json.id, json.lastName, json.firstName, json.phone, json.email, Address.fromJson(json.address), json.notes, json.criteria ? json.criteria.map(c => Criteria.fromJson(c)) : null)
    }
}