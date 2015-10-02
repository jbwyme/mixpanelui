import * as PropertyTypes from './PropertyTypes'

const typeOperators = {};

typeOperators[PropertyTypes.STRING] = [
    {
        label: 'equals',
        value: '='
    },{
        label: 'does not equal',
        value: '!='
    },{
        label: 'contains',
        value: 'in'
    },{
        label: 'does not contain',
        value: 'not in'
    },{
        label: 'is set',
        value: 'defined'
    },{
        label: 'equals',
        value: 'not defined'
    }
];

typeOperators[PropertyTypes.NUMBER] = [
    {
        label: 'in between',
        value: '~'
    },{
        label: 'less than',
        value: '<'
    },{
        label: 'equal to',
        value: '='
    },{
        label: 'greater than',
        value: '>'
    }
];

typeOperators[PropertyTypes.DATE] = [
    {
        label: 'more than',
        value: '>'
    },{
        label: 'less than',
        value: '<'
    },{
        label: 'on',
        value: '='
    }, {
        label: 'between',
        value: '~'
    }
];

typeOperators[PropertyTypes.BOOLEAN] = []; // is
typeOperators[PropertyTypes.LIST] = []; // contains

export default typeOperators;


