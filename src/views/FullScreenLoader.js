import React from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'

export default class RequireAuth extends React.Component {
    render() {
        return <div className="Auth-background">
            <Card className="Auth-card" style={{ minHeight: '571.8px' }}>
                <CardBody>
                <img alt="Loading..." src="/loader.gif" style={{ height: '200px', top: '50%', left: '50%', position: 'absolute', transform: 'translateX(-50%) translateY(-50%)' }}/>
                </CardBody>
            </Card>
        </div>
    }
}