import React from 'react'
import {
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText
} from 'reactstrap'

export default class Utilities {
    static createId() {
        return Math.random().toString(36).substr(2, 8).toUpperCase()
    }    

    static asArray(object) {
        return Object.getOwnPropertyNames(object).map(n => object[n])
    }

    static map(object, map) {
        var arr = []
        Object.getOwnPropertyNames(object).forEach(n => arr.push(map(n, object[n])))
        return arr
    }

    static propagate(object, name, def) {
        return Boolean(object) ? object[name] : def
    }

    static label(id, label) {
        return <Label for={id}>{label}</Label>
    }

    static textField(id, type, required, title, valid, feedback, help, defaultValue) {
        return <FormGroup>
            {this.label(id, title)}
            <Input type={type} required={required} invalid={!valid} id={id} defaultValue={defaultValue} />
            {help ? <FormText>{help}</FormText> : null}
            <FormFeedback valid={valid}>{feedback}</FormFeedback>
        </FormGroup>
    }

    static advTextField(id, type, required, title, valids, feedbacks, help, defaultValue) {
        return <FormGroup>
            {this.label(id, title)}
            <Input type={type} required={required} invalid={!valids.every(b => b)} id={id} defaultValue={defaultValue}/>
            {help ? <FormText>{help}</FormText> : null}
            {feedbacks.map((f, i) => <FormFeedback key={f} valid={valids[i]}>{f}</FormFeedback>)}
        </FormGroup>
    }

    static stateSelect(valid, defaultValue) {
        return <FormGroup>
            {this.label("state", "State")}
            <Input type="select" invalid={!valid} id="state" defaultValue={defaultValue}>
                <optgroup label="States">
                    {this.map({
                        'AL': 'Alabama',
                        'AK': 'Alaska',
                        'AZ': 'Arizona',
                        'AR': 'Arkansas',
                        'CA': 'California',
                        'CO': 'Colorado',
                        'CT': 'Connecticut',
                        'DE': 'Delaware',
                        'FL': 'Florida',
                        'GA': 'Georgia',
                        'HI': 'Hawaii',
                        'ID': 'Idaho',
                        'IL': 'Illinois',
                        'IN': 'Indiana',
                        'IA': 'Iowa',
                        'KS': 'Kansas',
                        'KY': 'Kentucky',
                        'LA': 'Louisiana',
                        'ME': 'Maine',
                        'MD': 'Maryland',
                        'MA': 'Massachusetts',
                        'MI': 'Michigan',
                        'MN': 'Minnesota',
                        'MS': 'Mississippi',
                        'MO': 'Missouri',
                        'MT': 'Montana',
                        'NE': 'Nebraska',
                        'NV': 'Nevada',
                        'NH': 'New Hampshire',
                        'NJ': 'New Jersey',
                        'NM': 'New Mexico',
                        'NY': 'New York',
                        'NC': 'North Carolina',
                        'ND': 'North Dakota',
                        'OH': 'Ohio',
                        'OK': 'Oklahoma',
                        'OR': 'Oregon',
                        'PA': 'Pennsylvania',
                        'RI': 'Rhode Island',
                        'SC': 'South Carolina',
                        'SD': 'South Dakota',
                        'TN': 'Tennessee',
                        'TX': 'Texas', // howdy y'all
                        'UT': 'Utah',
                        'VT': 'Vermont',
                        'VA': 'Virginia',
                        'WA': 'Washington',
                        'WV': 'West Virginia',
                        'WI': 'Wisconsin',
                        'WY': 'Wyoming'
                    }, (abbr, name) => <option key={abbr} value={abbr}>{name}</option>)}
                </optgroup>
                <optgroup label="Territories">
                    {this.map({
                        'AS': 'American Samoa',
                        'DC': 'District of Columbia',
                        'FM': 'Federated States of Micronesia',
                        'GU': 'Guam',
                        'MH': 'Marshall Islands',
                        'MP': 'Northern Mariana Islands',
                        'PW': 'Palau',
                        'PR': 'Puerto Rico',
                        'VI': 'Virgin Islands'
                    }, (abbr, name) => <option key={abbr} value={abbr}>{name}</option>)}
                </optgroup>
            </Input>
            <FormFeedback valid={valid}>A state is required.</FormFeedback>
        </FormGroup>
    }

    static select(id, required, title, valid, feedback, help, defaultValue, options, props) {
        return <FormGroup>
            {this.label(id, title)}
            <Input {...props} type="select" required={required} invalid={!valid} id={id} defaultValue={defaultValue}>
                {Utilities.map(options, (abbr, name) => <option value={abbr} key={abbr}>{name}</option>)}
            </Input>
            {help ? <FormText>{help}</FormText> : null}
            <FormFeedback valid={valid}>{feedback}</FormFeedback>
        </FormGroup>
    }
}