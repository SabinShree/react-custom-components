import React from "react";
import {Spinner} from "react-bootstrap";
import PropTypes from 'prop-types';

import styled from 'styled-components'

const LoadingButton = styled.button`
    outline: none;
     background-color:${props => (props.backgroundColor ? props.backgroundColor : '#5843F8')};
    color:${props => (props.color ? props.color : 'white')};
    padding: 5px 20px;
    border: none;
        border-radius:${props => (props.borderRadius ? props.borderRadius : '5px')};
          transition-duration: 0.4s;
          
:disabled
 {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
}

@media only screen and (max-width: 600px) {
        font-size: 0.8em;
        padding: 4px 10px;
        margin-top: 0.3em;
}
:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
:active {
    outline: none
}
:focus {
    border: none;
    outline: none;
}
`;

const Button = ({isLoading, loadingText, text, onClick, backgroundColor, color, borderRadius}) => {

    let buttonText = <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
    />;

    let buttonLoadingText = loadingText ? loadingText : text;

    let buttonElement;
    if (isLoading) {
        buttonElement = <span>{buttonText}&nbsp;&nbsp;{buttonLoadingText}</span>
    } else {
        buttonElement = <span>{text}</span>
    }

    return (<LoadingButton
        onClick={onClick}
        disabled={isLoading}
        type={"submit"}
        backgroundColor={backgroundColor}
        color={color}
        borderRadius={borderRadius}
    >
        {buttonElement}
    </LoadingButton>)
}
Button.propTypes = {
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    borderRadius: PropTypes.string

}

export default Button;