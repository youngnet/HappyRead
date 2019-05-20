import React from "react";
import "./index.scss";
import classNames from "classnames";

function List({ style = {}, children, className }) {
    return (
        <div style={style} className={classNames("componentList", className)}>
            {children}
        </div>
    );
}

function ListItem({ style = {}, children, className = '', onClick = () => { } }) {
    return (
        <div
            onClick={onClick}
            className={classNames("componentListItem", className)}
            style={style}>
            {children}
        </div>
    );
}
List.Item = ListItem;
export default List;
