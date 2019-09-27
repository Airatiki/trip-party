import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import multi from 'redux-multi';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import reducer from 'api/reducer';
import saga from 'api/saga';

import '@vkontakte/vkui/dist/vkui.css';

import Travels from 'components/Travels';
import Travel from 'components/Travel';
import Events from 'components/Events';
import Event from 'components/Event';
import Settings from 'components/Settings';


const sagaMiddleware = createSagaMiddleware();
const configureStore = (browserHistory: any) => {
    const middleware = [
        thunkMiddleware,
        routerMiddleware(browserHistory),
        multi,
        sagaMiddleware,
    ];

    return createStore(
        reducer,
        applyMiddleware(
            ...middleware
        ));
};
const history = createHistory();
const store = configureStore(history);

sagaMiddleware.run(saga);

class App extends Component<any, any> {
    public render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact={true} path='/trips' component={Travels}/>
                        <Route exact={true} path='/trips/:id' component={Travel}/>

                        <Route expact={true} path='/events' component={Events}/>
                        <Route exact={true} path='/events/:id' component={Event}/>

                        <Route exact={true} path='/settings' component={Settings}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
