import React, {Component} from "react";
import ReactTable from "react-table-6";
import {omit, map} from "lodash";
import './reactTableCustom.css'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import ReactPagination from "./ReactPagination";
import PropTypes from "prop-types";
import SearchBox from "../SearchBox/SearchBox";
import {message} from "antd";
import {capitalizeFirstLetterOnly, convertObjectToCsv} from "../../Utils/Utils";
import styled from "styled-components";
import {Empty} from "antd/es";


const Button = styled.button`
  background-color: transparent;
  border: 1px solid #f7f7f7;
  margin: 5px 10px;
  border-radius: 7px;
  display: flex;
  outline: none;
  justify-content: center;
align-items: center;
text-align: center;
 &:hover {
 transition: all 0.2s ease-in-out;
 cursor:pointer;
 border: 1px solid #1DA57A;
 }
`

class CustomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            header: [],
            containsData: false,
            pageSizeOption: 8,
            filteredData: [],
            isSearchStarted: false,
            isLoading: false
        };
    }

    getTableHeaderFromData(data) {
        let headerText = Object.keys(data[0]);

        const header = [];
        const {tableOption} = this.props;
        const {
            hideColumn, HeaderToLeft, HeaderToCenter, HeaderToRight, removeHeader, columnStyle
            , styleCellConditionally
        } = tableOption;

        headerText.forEach(item => {
            const itemObj = {};

            let show = true;
            if (hideColumn) {
                hideColumn.forEach(hideColumnItem => {
                    if (hideColumnItem === item) {
                        show = false;
                    }
                });
                itemObj["show"] = show;
            }

            itemObj["id"] = item;
            itemObj["Header"] = () => {
                let headerDirection = "center";
                if (HeaderToLeft) {
                    headerDirection = "left";
                }
                if (HeaderToCenter) {
                    headerDirection = "center";
                }
                if (HeaderToRight) {
                    headerDirection = "right";
                }
                return (
                    <div style={{textAlign: headerDirection}}>
                        {removeHeader !== item
                            ? capitalizeFirstLetterOnly(
                                item.replace(/([a-z])([A-Z])/g, "$1 $2")
                            )
                            : ""}
                    </div>
                );
            };

            itemObj["style"] = {whiteSpace: "unset"};
            itemObj["accessor"] = item;
            if (headerText.length >= 5)
                itemObj["width"] = this.getColumnWidth(
                    itemObj["accessor"],
                    itemObj["Header"],
                    data
                );

            itemObj["Cell"] = row => {
                if (columnStyle) {
                    const adjustStyleOfCellObject = Object.assign(
                        {},
                        columnStyle
                    );
                    let style = {};
                    let rowHeader = item;
                    Object.keys(adjustStyleOfCellObject).forEach(key => {
                        if (rowHeader === key) {
                            style = adjustStyleOfCellObject[key];
                        }
                    });
                    return (
                        <div style={style.style}>
                            {row.value}
                        </div>
                    );
                } else {
                    return (
                        <div style={{textAlign: "left"}}>
                            {row.value}
                        </div>
                    );
                }
            };

            if (styleCellConditionally) {

                Object.keys(styleCellConditionally).forEach(key => {
                    if (itemObj["accessor"] === key) {
                        itemObj["getProps"] = (state, rowInfo, column) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    style: styleCellConditionally[key].condition(rowInfo.row).style
                                };
                            } else {
                                return {};
                            }
                        };
                    }
                });
            }
            header.push(itemObj);
        });
        return header;
    }

    getColumnWidth(accessor, headerText, data) {
        let max = 0;
        const maxWidth = 210;
        const magicSpacing = 17;

        for (let i = 0; i < data.length; i++) {
            if (data[i] !== undefined && data[i][accessor] !== null) {
                if (JSON.stringify(data[i][accessor] || "null").length > max) {
                    max = JSON.stringify(data[i][accessor] || "null").length;
                }
            }
        }
        return Math.min(maxWidth, Math.max(max, accessor.length) * magicSpacing);
    }

    mapArray(array) {
        const {tableOption} = this.props;
        const {tableRowRemove} = tableOption;
        return map(
            array,
            object => omit(object, tableRowRemove) // return from _.omit
        );
    }

    convertBooleanIntoString(array) {
        return array.map((item, index) => {
            for (var itemObj in item) {
                if (item[itemObj] === true) {
                    item[itemObj] = "true";
                } else if (item[itemObj] === false) {
                    item[itemObj] = "false";
                }
            }
            return item;
        });
    }

    componentDidMount() {
        const {tableOption} = this.props;
        const {tableData, tableRowRemove} = tableOption;
        if (tableData) {
            try {
                let tableData = [...tableData];
                if (tableData.length !== 0) {
                    tableData = this.convertBooleanIntoString(tableData);
                    if (tableRowRemove) {
                        tableData = this.mapArray(tableData);
                    }
                    let header = this.getTableHeaderFromData(tableData);
                    this.setState({header: header, containsData: true, data: tableData});

                } else this.setState({containsData: false})
            } catch (error) {
                this.setState({containsData: false, data: []});
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {tableOption} = this.props;
        let {tableData, tableRowRemove, buttons} = tableOption;
        if (prevProps.tableOption.tableData !== tableData) {
            if (tableData.length !== 0) {
                tableData = this.convertBooleanIntoString(tableData);
                if (tableRowRemove) {
                    tableData = this.mapArray(tableData);
                }
                let header = this.getTableHeaderFromData(tableData);
                if (buttons) {

                    this.addButtonToRow().forEach(item => {
                        header.push(item);
                    })
                }

                this.setState({header: header, containsData: true, data: tableData});
            } else {
                this.setState({containsData: false});
            }
        }
    }

    onChangeTableState(event, data) {
        this.setState({isLoading: true})
        let mainData = [...data];
        let searchValue = event.target.value.trim().toLowerCase();
        if (searchValue.length === 0) {
            this.setState({isSearchStarted: false, pageSizeOption: 8});
        } else this.setState({isSearchStarted: true, pageSizeOption: 8});

        mainData = JSON.stringify(mainData, (k, v) =>
            v && typeof v === "object" ? v : "" + v
        );
        mainData = JSON.parse(mainData);
        // if (this.state.isSearchStarted) {
        let filteredData = mainData.filter(o =>
            Object.keys(o).some(key => o[key].toLowerCase().includes(searchValue))
        );
        if (filteredData.length !== 0) {
            this.setState({filteredData: filteredData,});
        } else {
            this.setState({filteredData: [], pageSizeOption: 8,});
        }
        this.setState({isLoading: false})
    }

    exportButton() {
        let filteredPureArray;
        if (!this.state.isSearchStarted) {
            filteredPureArray = [...this.state.data];
        } else {
            filteredPureArray = [...this.state.filteredData];
        }
        if (filteredPureArray.length <= 0) {
            //console.log("No data in the table.");
            message.error('No any data to export in CSV !!');
            return;
        }

        let parsedData = convertObjectToCsv(filteredPureArray);
        this.download(parsedData);

    }

    download(csvData) {
        const blob = new Blob([csvData], {type: "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "Untitled.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    getTrProps = (state, rowInfo, instance) => {
        const {onRowClicked} = this.props.tableOption;
        if (rowInfo) {
            return {
                onClick: () => {
                    let tableRow = [...this.state.data];
                    let tableFilteredRow = [...this.state.filteredData];
                    let selectedObject;

                    if (this.state.isSearchStarted) {
                        selectedObject = tableFilteredRow[rowInfo.row._index];
                    } else {
                        selectedObject = tableRow[rowInfo.row._index];
                    }
                    try {
                        onRowClicked(selectedObject);
                    } catch (ex) {
                        console.log(ex);
                    }
                }
            };
        }
        return {};
    };

    getTableRow(row) {
        let tableRow = [...this.state.data];
        let tableFilteredRow = [...this.state.filteredData];
        let selectedObject = {};

        if (this.state.isSearchStarted) {
            selectedObject = tableFilteredRow[row._index];
        } else {
            selectedObject = tableRow[row._index];
        }
        return selectedObject;
    }

    addButtonToRow() {

        const addedButton = this.props.tableOption.buttons;
        if (!Array.isArray(addedButton)) {
            throw new Error("It is not Array");
        }
        let buttonArray = [];
        buttonArray = addedButton.map(item => {

            return {
                Header: addedButton.Header,
                accessor: addedButton.accessor,
                Cell: row => (
                    <div style={{
                        display: "flex"
                    }}>
                        <Button
                            onClick={() => item.onClick(row.row)}
                        >{item.buttonName}{item.icons}
                        </Button>
                    </div>
                ),
                width: 75
            };
        })
        return buttonArray;
    }

    render() {
        let {tableOption, isSearchable, isDownloadable} = this.props;
        const {tableHeight} = tableOption;
        const {title} = this.props;
        let searchBox = null;
        if (isSearchable) {
            searchBox =
                <SearchBox onDownloadClick={this.exportButton.bind(this)} isVisible={isDownloadable} title={title}
                           onSearchClick={event => this.onChangeTableState(event, this.state.data)}/>
        }
        let isScrollable = true;
        if (tableHeight) {
            isScrollable = false;

        }
        let component;
        if (this.state.containsData) {
            component = (
                <div
                    style={{
                        marginTop: "0.3em",
                        marginBottom: "1em",
                        marginLeft: "5px",
                        marginRight: "5px"

                    }}
                >
                    {searchBox}
                    <ReactTable
                        style={{
                            backgroundColor: "white",
                            height: tableHeight
                        }}
                        sortable
                        // className="-striped -highlight"
                        pageSize={
                            !isScrollable ? this.state.data.length : (this.state.data.length <= 5
                                ? this.state.data.length
                                : this.state.pageSizeOption)
                        }
                        resizable={true}
                        data={
                            this.state.isSearchStarted
                                ? this.state.filteredData
                                : this.state.data
                        }
                        ref={r => (this.reactTable = r)}
                        getTheadThProps={(state, rowInfo, column) => {
                            return {
                                style: {
                                    margin: "10px 4px",
                                    fontWeight: "bolder"
                                }
                            };
                        }}
                        filtered={this.state.filteredData}
                        getTrProps={this.getTrProps}
                        columns={this.state.header}
                        previousText='&larr;'
                        nextText='&rarr;'
                        loading={this.state.isLoading}
                        // noDataText={"NO Data"}
                        showPagination={isScrollable}
                        PaginationComponent={ReactPagination}
                        NoDataComponent={CustomNoDataComponent}
                    />
                </div>
            );
        } else {
            component = (
                <div>
                    <div
                        style={{
                            border: "1px solid ##d9d9d9",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "5px",
                            minHeight: "100px",
                            marginBottom: '1em',
                            borderRadius: "5px",
                            boxShadow: "5px 5px 5px #888888"
                        }}
                    >
                        <h4 style={{paddingTop: "10px", fontSize: "20px",}}><ExclamationCircleOutlined
                            style={{color: "red", margin: "0px"}}/> &nbsp;&nbsp; No Data To Display !!
                        </h4>
                    </div>
                </div>
            );
        }
        return <div>{component}</div>;
    }
}

const CustomNoDataComponent = ({state, ...rest}) => {
    return <div className="rt-noData"><Empty/></div>
}

CustomTable.propTypes = {
    tableOption: PropTypes.shape({
        tableData: PropTypes.array.isRequired,
        HeaderToLeft: PropTypes.bool,
        HeaderToRight: PropTypes.bool,
        HeaderToCenter: PropTypes.bool,
        tableRowRemove: PropTypes.array,
        hideColumn: PropTypes.array,
        onRowClicked: PropTypes.func,
        buttons: PropTypes.array,
        styleCellConditionally: PropTypes.object
    }),
    isSearchable: PropTypes.bool.isRequired,
    title: PropTypes.string,
    isDownloadable: PropTypes.bool.isRequired,
};


export default CustomTable;
