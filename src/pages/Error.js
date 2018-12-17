import React from 'react'
import {
    Card,
    CardTitle,
    CardBody,
    Button
} from 'reactstrap'
import * as queryString from 'query-string'

export default class Error extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getErrorMessage(code) {
        switch (parseInt(code)) {
            case NaN:
                return {code: 101, message: 'Error code is not a number'}
            case 102:
                return {code: code, message: 'Unrecognized zone ID'}
            case 103:
                return {code: code, message: 'Suspicious numeric condition detected'}
            default:
                return {code: 100, message: 'Unrecognized error code'}
        }
    }

    render() {
        let error = this.getErrorMessage(queryString.parse(window.location.search).code)
        return <div className="Auth-background">
          <Card className="Auth-card card-area">
            <CardBody>
              <div className="panel-relative">
                <CardTitle>Error</CardTitle>
                <p>{error.code}: {error.message}</p>
                <Button block onClick={() => window.location.replace('/')}>Return to Main Page <i class="material-icons" style={{marginLeft: '0.5rem', position: 'absolute'}}>arrow_forward</i></Button>
              </div>
            </CardBody>
          </Card>
        </div>
      }
}