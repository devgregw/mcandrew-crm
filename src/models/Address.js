export default class Address {
    constructor(line1, line2, city, state, zip) {
        this.line1 = line1
        this.line2 = line2
        this.city = city
        this.state = state
        this.zip = zip
    }

    get summary() {
        var out = this.line1
        if (this.line2)
            out += `\n${this.line2}`
        out += `\n${this.city} ${this.state} ${this.zip}`
        return out
    }

    static fromJson(json) {
        return json ? new Address(json.line1, json.line2, json.city, json.state, json.zip) : null
    }
}