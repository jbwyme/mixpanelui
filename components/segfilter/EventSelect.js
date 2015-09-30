import React, { Component, PropTypes } from 'react';
import Dropdown from '../dropdowns/Dropdown';

export default class EventSelect extends Component {

    static propTypes = {
        events: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.object
    };

    render() {
       return <div className="event_select">
           <Dropdown
               name="eventSelect"
               options={this.props.events}
               onChange={this.props.onChange}
               value={this.props.value} />
       </div>
    }
}