import React from 'react';
import {
  Card, CardBody, Button, CardTitle
} from 'reactstrap'

export default class AreaSelect extends React.Component {
  render() {
    document.title = 'Select Area - CRM'
    return <div className="Auth-background">
      <Card className="Auth-card card-area">
        <CardBody>
          <div className="">
            <CardTitle>Select Area</CardTitle>
            <img alt="" src="/mcandrew.png" style={{ height: '100px', marginBottom: '1rem' }} /><br />
            <Button color="primary" block onClick={() => window.location.assign('/mcam')}>McAndrew Motors <i class="material-icons" style={{marginLeft: '0.5rem', position: 'absolute'}}>arrow_forward</i></Button>
            <hr />
            <img alt="" src="/centralalps.png" style={{ height: '100px', marginBottom: '1rem' }} /><br />
            <Button color="primary" block onClick={() => window.location.assign('/ca')}>Central Alps <i class="material-icons" style={{marginLeft: '0.5rem', position: 'absolute'}}>arrow_forward</i></Button>
            <hr/>
            <Button block onClick={() => window.location.assign('/manage')}>Manage Makes &amp; Models <i class="material-icons" style={{marginLeft: '0.5rem', position: 'absolute'}}>arrow_forward</i></Button>
          </div>
        </CardBody>
      </Card>
    </div>
  }
}
