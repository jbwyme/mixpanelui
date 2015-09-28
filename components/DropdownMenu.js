import React, { Component, PropTypes } from 'react';
import Portal from 'react-portal'
import DropdownItem from './DropdownItem'
require("!style!css!less!../less/dropdown.less");

export default class Dropdown extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        selected: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.positionMenu();
        window.addEventListener("scroll", this.positionMenu.bind(this));
    }

    render() {
        var items =  this.props.items.map(item => <DropdownItem item={item} selected={item.value === this.props.selected.value} selectItem={this.props.selectItem}/>);
        return (<div ref="menu" className="rounded_dropdown_body dropdown_body_widget">{items}</div>);
    };

    positionMenu() {
        var menu = React.findDOMNode(this.refs.menu);
        var b = this.props.btnMeasurements;
        if (menu) {
            menu.style.left = b.left + 'px';
            menu.style.top = b.top + b.height - 2 + 'px';
            menu.style.minWidth = b.width + 'px';
        }
    }
}
