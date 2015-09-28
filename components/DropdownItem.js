import React, { Component, PropTypes } from 'react';


export default class DropdownItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        selectItem: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);

        this.state = {
            selected: false,
            active: false
        };
    };

    render() {
        var activeClass = this.state.active ? "active" : "";
        var selectedClass = this.props.selected ? "selected" : "";
        return (
            <div
                 className={"rounded_dropdown_item dropdown_item_widget " + activeClass + " " + selectedClass}
                 onMouseOver={this.activate.bind(this)}
                 onMouseOut={this.deactivate.bind(this)}
                 onClick={this.select.bind(this)}>{this.props.item.label}</div>
        );
    }

    activate() {
        this.setState({active: true});
    }

    deactivate() {
        this.setState({active: false});
    }

    select() {
        this.props.selectItem(this.props.item);
    }

}
