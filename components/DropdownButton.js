import DropdownMenu from './DropdownMenu'
import React, { Component, PropTypes } from 'react';
import Portal from 'react-portal'
import * as DropdownActions from '../actions/DropdownActions';
import * as _ from 'lodash'
import $ from 'jquery'
require("!style!css!less!../less/dropdown.less");

export default class Dropdown extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        selectItem: PropTypes.func.isRequired,
        selected: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        width: PropTypes.string.isRequired
    };

    constructor(...args) {
        super(...args);
        this.id = 'dropdown_' + _.uniqueId();
    };

    componentDidMount() {
        window.addEventListener('scroll', this.getPosition.bind(this));
        this.getPosition();
    }

    componentWillUpdate() {
        this.getPosition();
    }

    render() {
        var styles = {width: this.props.width + 'px'};
        var button = <div ref={this.id} className="rounded_dropdown_label dropdown_label_widget active" style={styles}>
            <div className="title">{this.props.selected.label}</div>
            <div className="arrow"></div>
        </div>;

        return (
            <Portal isOpened={false} openByClickOn={button} closeOnEsc={true} closeOnOutsideClick={true}>
                <DropdownMenu
                    items={this.props.items}
                    selected={this.props.selected}
                    selectItem={this.props.selectItem}
                    btnMeasurements={this.props.btnMeasurements}
                />
            </Portal>
        );
    };

    getPosition() {
        var $btn = $(React.findDOMNode(this.refs[this.id]));
        this.props.actions.setBtnCoordinates($btn);
    }
}
