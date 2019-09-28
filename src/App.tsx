import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch, Redirect } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import multi from 'redux-multi';
import * as createHistory from 'history';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import reducer from 'api/reducer';
import saga from 'api/saga';

import { View, Panel, Root } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Create from './components/Create';
import Travels from 'components/Travels';
import Travel from 'components/Travel';
import Settings from 'components/Settings';
import connect from '@vkontakte/vk-connect';
// Sends event to client
connect.send('VKWebAppInit');

// Subscribes to event, sended by client
connect.subscribe((e: any) => console.log(e));


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
const history = createHistory.createBrowserHistory();
const store = configureStore(history);

sagaMiddleware.run(saga);

class App extends Component {
    public render() {
        return (
            <Root activeView='view' className=''>
                <View id='view' activePanel='panel'>
                    <Panel id='panel'>
                        <Provider store={store}>
                            <Router history={history}>
                                <Switch>
                                    <Redirect exact={true} from='/' to='/create'/>
                                    <Route exact={true} path='/create' component={Create}/>

                                    <Route exact={true} path='/trips' component={Travels}/>
                                    <Route exact={true} path='/trips/:id' component={Travel}/>

                                    <Route exact={true} path='/settings' component={Settings}/>
                                </Switch>
                            </Router>
                        </Provider>
                    </Panel>
                </View>
            </Root>
        );
    }
}

export default App;
