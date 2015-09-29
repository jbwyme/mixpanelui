 import React, { Component } from 'react';
 import Segmentation from './Segmentation';
 import { createStore, combineReducers } from 'redux';
 import { Provider } from 'react-redux';
 import * as reducers from '../reducers';

 const reducer = combineReducers(reducers);
 const store = createStore(reducer, {segmentation: {
     ops: [{
         label: 'Equals',
         value: '='
     }, {
         label: 'Contains',
         value: 'contains'
     }],
     topEvents: [{
         label: 'Viewed report',
         value: 'Viewed report'
     }, {
         label: 'Logged in',
         value: '$login'
     }],
     selectedEvent: {
         label: 'Viewed report',
         value: 'Viewed report'
     },
     topProperties: [{
         label: 'Browser',
         value: '$browser'
     }, {
         label: 'City',
         value: '$city'
     }],
     topValues: [{
         label: 'Firefox',
         value: 'firefox'
     }, {
         label: 'Safari',
         value: 'safari'
     }, {
         label: 'Chrome',
         value: 'chrome'
     }],
     filters: [
         {
             selectedProperty: {
                 label: 'Browser',
                 value: '$browser'
             },
             selectedOp: {
                 label: 'Equals',
                 value: '='
             },
             selectedValue: {
                 label: 'Chrome',
                 value: 'chrome'
             }
         }
     ]
 }});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {() => <Segmentation /> }
            </Provider>
        );
    }
}
