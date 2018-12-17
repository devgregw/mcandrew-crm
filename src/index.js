import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AreaSelect from './pages/AreaSelect';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Auth from './pages/Auth'
import CRMHome from './pages/CRMHome'
import RequireAuth from './views/RequireAuth'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Error from './pages/Error'
import CRMSearch from './pages/CRMSearch'
import MMManager from './pages/MMManager'
import InitializeFirebase from './InitializeFirebase'

InitializeFirebase.initialize()

ReactDOM.render(<div id="router-host">
    <Router>
        <div id="router-content">
            <Switch>
                <Route exact path="/error" component={Error} />
                <Route exact path="/" render={({ match }) => <RequireAuth match={match} render={() => <AreaSelect match={match} />} />} />
                <Route exact path="/manage" render={({ match }) => <RequireAuth match={match} render={() => <MMManager />} />} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/:area" render={({ match }) => <RequireAuth match={match} render={() => <CRMHome match={match} />} />} />
                <Route exact path="/:area/search" render={({ match }) => <RequireAuth match={match} render={() => <CRMSearch match={match} />} />} />
                

            </Switch>
        </div>
    </Router>
</div>, document.getElementById('root'))

serviceWorker.unregister();
