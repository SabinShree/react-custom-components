import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from "antd";
import {BiSearchAlt2} from "react-icons/bi";
import styled from "styled-components";
import {BsDownload} from "react-icons/bs";

const SearchSection = styled.div`
display: grid;
grid-template-columns:  ${props => props.isSearchable ? '71%  3% 24%' : "74% 25%"};
grid-gap: 10px;
margin-bottom: 7px;
`

const H5 = styled.h5`
font-size: 1.3em;
font-weight: bold;
margin: 0;
padding: 0;
`
const Button = styled.button`
  background-color: transparent;
  margin-top: 2px;
  padding: 5px 0 0;
   border: 1px solid #1DA57A;
  border-radius: 10px;
 &:hover {
 transition: all 0.2s ease-in-out;
 cursor:pointer;
 border: 1px solid #1DA57A;
 }
  display: ${props => props.isVisible ? 'block' : 'none'};   
 
`

const SearchInput = styled(Input)`
border: none;
border-bottom: 1px solid #1DA57A;

`

class SearchBox extends Component {
    render() {
        const {title, onSearchClick, onDownloadClick, isVisible, isSearchable} = this.props;
        return (
            <SearchSection isSearchable={isVisible}>
                <H5>{title}</H5>
                <Button onClick={onDownloadClick} isVisible={isVisible}><BsDownload
                    color={'#1da57a'}
                    size={22}/></Button>
                <SearchInput allowClear placeholder="Search Here..." onChange={onSearchClick}
                             prefix={<BiSearchAlt2 color={'#1da57a'}
                                                   size={21}/>}/>
            </SearchSection>
        );
    }
}

SearchBox.propsTypes = {
    title: PropTypes.string,
    onSearchClick: PropTypes.func
}

export default SearchBox;
