import React, { Component, PropTypes } from 'react';

export default class Bookmarks extends Component {

    static propTypes = {

    };

    render() {
       return <div className="bookmark_picker_container bookmarks_menu_widget">
           <div className="bookmark_picker bookmarks_menu_widget">
               <div className="bookmarks_dropdown_widget">
                   <div
                       className="bookmarks_menu dropdown_label_widget menu_button">
                       <div className="icon"></div>
                       <div className="text">Bookmarks</div>
                   </div>
               </div>
               <div className="bookmarks_add_widget">
                   <div
                       className="bookmarks_add_label dropdown_label_widget add_button">
                       <div className="icon"></div>
                   </div>
               </div>
           </div>
       </div>
    }
}