import NumericCondition from './NumericCondition'
import React from 'react'

export default class Criteria {
    constructor(make, models, prices, years, milage) {
        this.make = make
        this.models = models || []
        this.priceCondition = prices
        this.yearCondition = years
        this.milageCondition = milage
    }

    get modelSummary() {
        //var out = ''
        //this.models.forEach((m, i) => out += `${i === this.models.length - 1 ? 'or ' : ''}${m}${i === this.models.length - 2 ? ', ' : ''}`)
        //return out.length ? out : 'Any'
        return this.models.length ? this.models.join(', ') : 'Any'
    }

    get summary() {
        return `Make: ${this.make}\nModels: ${this.modelSummary}\nPrice: ${this.priceCondition ? this.priceCondition.summary : 'Any'}\nYears: ${this.yearCondition ? this.yearCondition.summary : 'Any'}\nMilage: ${this.milageCondition ? this.milageCondition.summary : 'Any'}`
    }

    get summaryP() {
        return <p>
            Make: {this.make}<br/>
            Models: {this.modelSummary}<br/>
            Price: {this.priceCondition ? this.priceCondition.summary : 'Any'}<br/>
            Year: {this.yearCondition ? this.yearCondition.summary : 'Any'}<br/>
            Milage: {this.milageCondition ? this.milageCondition.summary : 'Any'}<br/>
        </p>
    }

    static fromJson(json) {
        return new Criteria(json.make, json.models, NumericCondition.fromJson(json.priceCondition), NumericCondition.fromJson(json.yearCondition), NumericCondition.fromJson(json.milageCondition))
    }
}