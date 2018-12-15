import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AreaSelect from './pages/AreaSelect';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Auth from './pages/Auth'
import CRMHome from './pages/CRMHome'
import * as firebase from 'firebase'
import RequireAuth from './views/RequireAuth'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Error from './pages/Error'

var config = {
    apiKey: "AIzaSyCtbJ81k8ka_CaoJD0X-b8MILE2OtmUsmo",
    authDomain: "central-alps-crm.firebaseapp.com",
    databaseURL: "https://central-alps-crm.firebaseio.com",
    projectId: "central-alps-crm",
    storageBucket: "central-alps-crm.appspot.com",
    messagingSenderId: "712933981323"
}
firebase.initializeApp(config)

ReactDOM.render(<div id="router-host">
    <Router>
        <div id="router-content">
            <Route exact path="/" render={({match}) => <RequireAuth match={match} render={() => <AreaSelect match={match}/>}/>}/>
            <Route exact path="/home" render={({match}) => <RequireAuth match={match} render={() => <AreaSelect match={match}/>}/>}/>
            <Route exact path="/home/:area" render={({match}) => <RequireAuth match={match} render={() => <CRMHome match={match}/>}/>}/>
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/error" component={Error}/>
        </div>
    </Router>
</div>, document.getElementById('root'))

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
