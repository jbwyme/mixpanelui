import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class FilterLabels extends Component {

    static propTypes = {
        filters: PropTypes.array.isRequired,
        hasSegment: PropTypes.bool.isRequired,
        filterOp: PropTypes.oneOf(['and', 'or']).isRequired,
        onFilterOpToggle: PropTypes.func.isRequired
    };

    render() {
        const {filters, hasSegment, filterOp, onFilterOpToggle} = this.props;
        var rows = [];
        var numRealFilters = hasSegment ? filters.length - 1 : filters.length;
        if (numRealFilters > 1) {
            let andClass = classNames({
                toggle_side: true,
                active: filterOp === 'and'
            });

            let orClass = classNames({
                toggle_side: true,
                active: filterOp === 'or'
            });

            rows.push(
                <div className="bool_op toggle_container" onClick={onFilterOpToggle}>
                    <div className="toggle">
                        <div className={andClass} style={{minWidth: 30 + 'px'}}>AND</div>
                        <div className={orClass} style={{minWidth: 30 + 'px'}}>OR</div>
                    </div>
                </div>
            )
        }

        for (var i = 0; i < numRealFilters - 2; i++) {
            rows.push(<div className="seg_label">{filterOp}</div>);
        }

        if (hasSegment) {
            rows.push(<div className="action_label">By</div>);
        }

        return <div className="labels">
            <div className="grey_vert" style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none'}}></div>
            <div className="grey_horz" style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none'}}></div>
            <div className="seg_label"
                 style={{display: filters.length > 1 || !hasSegment ? 'block' : 'none', visibility: 'hidden'}}>x
            </div>
            {rows}
        </div>
    }
}