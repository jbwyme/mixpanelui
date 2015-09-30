'use strict';

import React from 'react';
import GenericDropdown from './GenericDropdown'

class Dropdown extends React.Component {

    render() {
        let buttonRenderer = item => <div className="rounded_dropdown_label dropdown_label_widget">
            <div className="title">
                <div className='placeholder'>{item.label}</div>
            </div>
            <div className="arrow"></div>
        </div>;

        let MenuContainer = React.createClass({
            render: function() {
                return (
                  <div className='rounded_dropdown_body dropdown_body_widget'>{this.props.children}</div>
                );
            }
        });

        let itemRenderer = item => <div className="rounded_dropdown_item dropdown_item_widget source_properties">{item.label}</div>;

        return (
            <GenericDropdown {...this.props}
                className="property_dropdown filterable_dropdown tabbed"
                buttonRenderer={buttonRenderer}
                MenuContainer={MenuContainer}
                itemRenderer={itemRenderer}/>
        );
    }
}

export default Dropdown;
