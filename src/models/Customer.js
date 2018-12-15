import Address from './Address'
import Criteria from './Criteria'

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