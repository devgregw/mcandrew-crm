export default class NumericCondition {
    static EQUAL = '=='
    static NOT_EQUAL = '!='
    static GREATER_THAN = '>'
    static GREATER_THAN_EQUAL = '>='
    static LESS_THAN = '<'
    static LESS_THAN_EQUAL = '<='

    constructor(comparison, value) {
        this.comparison = comparison
        this.value = value
    }

    static fromJson(json) {
        return json ? new NumericCondition(json.comparison, json.value) : null
    }

    get summary() {
        return `${this.comparison} ${this.value}`
    }

    test(number) {
        return eval(`${number}${this.comparison}${this.value}`)
    }
}