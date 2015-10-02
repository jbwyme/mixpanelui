import React, { Component } from 'react';
import Segmentation from './Segmentation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import * as PropertyTypes from '../constants/PropertyTypes'
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers(reducers);

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
)(createStore);

const store = createStoreWithMiddleware(reducer, {
    segmentation: {
        topEvents: [{
            label: 'Viewed report',
            value: 'Viewed report'
        }, {
            label: 'Logged in',
            value: '$login'
        }],
        topProperties: {},
        topPropertyValues: {}
    },
    segfilter: {
        ops: [{
            label: 'Equals',
            value: '='
        }, {
            label: 'Contains',
            value: 'contains'
        }],
        selectedEvent: {
            label: 'Viewed report',
            value: 'Viewed report'
        },
        filters: [
            {
                property: {
                    label: 'Browser',
                    value: '$browser',
                    type: PropertyTypes.STRING
                },

                op: {
                    label: 'Equals',
                    value: '='
                },

                value: {
                    label: 'Chrome',
                    value: 'chrome'
                }
            }, {
                property: {
                    label: 'Browser',
                    value: '$browser',
                    type: PropertyTypes.STRING
                },

                op: {
                    label: 'Equals',
                    value: '='
                },

                value: {
                    label: 'Chrome',
                    value: 'chrome'
                }
            }, {
                property: {
                    label: 'Browser',
                    value: '$browser',
                    type: PropertyTypes.STRING
                },

                op: {
                    label: 'Equals',
                    value: '='
                },

                value: {
                    label: 'Chrome',
                    value: 'chrome'
                }
            }, {
                property: {
                    label: 'Browser',
                    value: '$browser',
                    type: PropertyTypes.STRING
                }
            }
        ],
        filterOp: 'or'
    }
});

store.subscribe(() => console.log(store.getState()));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {() => <Segmentation /> }
            </Provider>
        );
    }
}
