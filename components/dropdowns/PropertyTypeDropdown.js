'use strict';

import React from 'react';
import GenericDropdown from './GenericDropdown'

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
                    <div style={{width: '168px'}} className='icon_dropdown_body dropdown_body_widget'>{this.props.children}</div>
                );
            }
        });

        let itemRenderer = item =>
            <div className="icon_dropdown_item dropdown_item_widget">
                <div className={'icon ' + item.value}></div>
                <div className="name">{item.label}</div>
            </div>;

        const propTypes = [{
            label: 'String',
            value: 'string'
        }, {
            label: 'Number',
            value: 'number'
        }, {
            label: 'True / False',
            value: 'boolean'
        }, {
            label: 'Date',
            value: 'date'
        }, {
            label: 'List',
            value: 'list'
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
