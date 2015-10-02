'use strict';

import React from 'react';
import classNames from 'classnames';
import Portal from './Portal'
import $ from 'jquery'

class GenericDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.value || {label: 'Select...', value: ''},
            isOpen: false
        };
        this.mounted = true;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value && newProps.value !== this.state.selected.value) {
            if (typeof(newProps.value) !== 'object') {
                newProps.value = this.props.options.find(item => item.value === newProps.value);
            }
            this.setState({selected: newProps.value});
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.handleDocumentClick.bind(this), false);
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener("click", this.handleDocumentClick.bind(this), false);
    }

    handleMouseDown(event) {
        if (event.type == 'mousedown' && event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    setValue(option) {
        let newState = {
            selected: option,
            isOpen: false
        };
        this.fireChangeEvent(newState);
        this.setState(newState);
    }

    fireChangeEvent(newState) {
        if (newState.selected !== this.state.selected && this.props.onChange) {
            this.props.onChange(newState.selected);
        }
    }

    renderOption(option) {
        let optionClass = classNames({
            'Dropdown-option': true,
            'is-selected': option == this.state.selected
        });

        return <div key={option.value} className={optionClass} onMouseDown={this.setValue.bind(this, option)}
                    onClick={this.setValue.bind(this, option)}>
            {this.props.itemRenderer(option)}
        </div>
    }

    buildMenu() {
        let ops = this.props.options.map((option) => {
            if (option.type == 'group') {
                let groupTitle = (<div className='title'>{option.name}</div>);
                let _options = option.items.map((item) => this.renderOption(item));

                return (
                    <div className='group' key={option.name}>
                        {groupTitle}
                        {_options}
                    </div>
                );
            } else {
                return this.renderOption(option);
            }
        });

        return ops.length ? ops : <div className='Dropdown-noresults'>No options found</div>;
    }

    handleDocumentClick(event) {
        if (this.mounted) {
            if (!React.findDOMNode(this).contains(event.target)) {
                this.setState({isOpen: false});
            }
        }
    }

    render() {
        let _defaultMenuContainer = React.createClass({
            render: function () {
                return (
                    <div>{this.props.children}</div>
                );
            }
        });
        let MenuContainer = this.props.MenuContainer || _defaultMenuContainer;
        let menu = this.state.isOpen ?
            <MenuContainer>
                {this.buildMenu()}
            </MenuContainer> : null;

        let button = <div ref="button" className='Dropdown-control'
                          onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)}>
            {this.props.buttonRenderer(this.state.selected)}
        </div>;

        return (
            <div {...this.props}>
                <Portal isOpened={false} onOpen={this.onOpen.bind(this)} openByClickOn={button} closeOnEsc={true}
                        closeOnOutsideClick={true}>
                    {menu}
                </Portal>
            </div>
        );
    }

    onOpen(portal) {
        let $btn = $(React.findDOMNode(this.refs.button));
        let $portal = $(portal);
        $portal.css({
            position: 'absolute',
            left: $btn.offset().left + 'px',
            top: ($btn.offset().top + $btn.outerHeight() - 1) + 'px',
            minWidth: $btn.outerWidth() + 'px',
            zIndex: 3
        });
    }
}

export default GenericDropdown;
