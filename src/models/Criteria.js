import NumericCondition from './NumericCondition'
import React from 'react'

export default class Criteria {
    constructor(make, models, prices, years, mileage) {
        this.make = make
        this.models = models || []
        this.priceCondition = prices
        this.yearCondition = years
        this.mileageCondition = mileage
    }

    static isMatch(criteria, make, model, price, year, mileage) {
        var priceMatch = criteria.priceCondition ? NumericCondition.test(criteria.priceCondition, price) : true
        var yearMatch = criteria.yearCondition ? NumericCondition.test(criteria.yearCondition, year) : true
        var mileageMatch = criteria.mileageCondition ? NumericCondition.test(criteria.mileageCondition, mileage) : true
        return (make.toLowerCase() === criteria.make.toLowerCase() || make.toLowerCase() === 'any') && (criteria.models.map(m => m.toLowerCase()).indexOf(model.toLowerCase()) > -1 || model.toLowerCase() === 'any') && priceMatch && yearMatch && mileageMatch
    }

    get modelSummary() {
        //var out = ''
        //this.models.forEach((m, i) => out += `${i === this.models.length - 1 ? 'or ' : ''}${m}${i === this.models.length - 2 ? ', ' : ''}`)
        //return out.length ? out : 'Any'
        return this.models.length ? this.models.join(', ') : 'Any'
    }

    get summary() {
        return `Make: ${this.make}\nModels: ${this.modelSummary}\nPrice: ${this.priceCondition ? this.priceCondition.summary : 'Any'}\nYears: ${this.yearCondition ? this.yearCondition.summary : 'Any'}\nmileage: ${this.mileageCondition ? this.mileageCondition.summary : 'Any'}`
    }

    get summaryP() {
        return <p>
            Make: {this.make}<br/>
            Models: {this.modelSummary}<br/>
            Price: {this.priceCondition ? this.priceCondition.summary : 'Any'}<br/>
            Year: {this.yearCondition ? this.yearCondition.summary : 'Any'}<br/>
            Mileage: {this.mileageCondition ? this.mileageCondition.summary : 'Any'}<br/>
        </p>
    }

    static fromJson(json) {
        return new Criteria(json.make, json.models, NumericCondition.fromJson(json.priceCondition), NumericCondition.fromJson(json.yearCondition), NumericCondition.fromJson(json.mileageCondition))
    }
}