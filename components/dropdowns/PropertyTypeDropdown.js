'use strict';

import React from 'react';
import GenericDropdown from './GenericDropdown'
import * as PropertyTypes from '../../constants/PropertyTypes'

class PropertyTypeDropdown extends React.Component {

    render() {
        let buttonRenderer = item =>
            <div className="icon_textless_label dropdown_label_widget">
                <div className={'icon ' + item.value}></div>
                <div className="arrow"></div>
            </div>;

        let MenuContainer = React.createClass({
            render: function() {
                return (
                    <div className='icon_dropdown_body dropdown_body_widget'>{this.props.children}</div>
                );
            }
        });

        let itemRenderer = function(item) {
            let iconCls = item.value == PropertyTypes.DATE ? 'datetime' : item.value.toLowerCase();
            return <div className="icon_dropdown_item dropdown_item_widget">
                <div className={'icon ' + iconCls}></div>
                <div className="name">{item.label}</div>
            </div>;
        };

        const propTypes = [{
            label: 'String',
            value: PropertyTypes.STRING
        }, {
            label: 'Number',
            value: PropertyTypes.NUMBER
        }, {
            label: 'True / False',
            value: PropertyTypes.BOOLEAN
        }, {
            label: 'Date',
            value: PropertyTypes.DATE
        }, {
            label: 'List',
            value: PropertyTypes.LIST
        }];

        return (
            <GenericDropdown {...this.props}
                className="typecast_dropdown prop_filter icon_dropdown"
                options={propTypes}
                buttonRenderer={buttonRenderer}
                MenuContainer={MenuContainer}
                itemRenderer={itemRenderer}/>
        );
    }
}

export default PropertyTypeDropdown;
