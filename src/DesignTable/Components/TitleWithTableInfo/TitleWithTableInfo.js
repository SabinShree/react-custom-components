import React from "react";
import "./TitleWithTableinfo.style.css";

const TitleWithTableInfo = (props) => {
    return (
        <div className="titleWithTableDiv">
            <p className="HeaderTitle">{props.title}</p>
            <p className="TableLengthInfo">
                {props.tableDataLength}
            </p>
            {/*//using HOC for search bar.*/}
            {props.children}
        </div>
    );
};

export default TitleWithTableInfo;