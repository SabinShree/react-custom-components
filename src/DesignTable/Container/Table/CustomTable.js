import React, {Component} from "react";
import ReactTable from "react-table-6";
import {capitalizeFirstLetterOnly} from "../../Utils/Utils.js";
import {omit, map} from "lodash";
import "./reactTableCustom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomDropdown from "../../Components/Dropdown/DropDown";
import Search from "../../Components/Search/Search";
import TitleWithTableInfo from "../../Components/TitleWithTableInfo/TitleWithTableInfo";
import {GoTrashcan, FaUserEdit, FaUserCog} from "react-icons/all";
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Popconfirm} from "antd";


class CustomTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            header: [],
            containsData: false,
            pageSizeOption: 5,
            filteredData: [],
            isSearchStarted: false
        };
        this.dropdownChange = this.dropdownChange.bind(this);
    }

    getTableHeaderFromData(data) {
        let headerText = Object.keys(data[0]);

        const header = [];

        headerText.forEach(item => {
            const itemObj = {};

            let show = true;
            if (this.props.tableOption.hideColumn) {
                this.props.tableOption.hideColumn.forEach(hideColumnItem => {
                    if (hideColumnItem === item) {
                        show = false;
                    }
                });
                itemObj["show"] = show;
            }

            itemObj["id"] = item;
            itemObj["Header"] = () => {
                let headerDirection = "center";
                if (this.props.tableOption.HeaderToLeft) {
                    headerDirection = "left";
                }
                if (this.props.tableOption.HeaderToCenter) {
                    headerDirection = "center";
                }
                if (this.props.tableOption.HeaderToRight) {
                    headerDirection = "right";
                }
                return (
                    <div style={{textAlign: headerDirection}}>
                        {this.props.tableOption.removeHeader !== item
                            ? capitalizeFirstLetterOnly(
                                item.replace(/([a-z])([A-Z])/g, "$1 $2")
                            )
                            : ""}
                    </div>
                );
            };

            itemObj["style"] = {whiteSpace: "unset"};
            itemObj["accessor"] = item;
            if (headerText.length >= 2)
                itemObj["width"] = this.getColumnWidth(
                    itemObj["accessor"],
                    itemObj["Header"],
                    data
                );

            // if (this.props.tableOption.colorOneCell) {
            //     if (itemObj["accessor"] === this.props.tableOption.colorOneCell.cellName) {
            //         itemObj["getProps"] = (state, rowInfo, column) => {
            //             if (rowInfo && rowInfo.row) {
            //                 return {
            //                     style: {
            //                         background: this.props.tableOption.colorOneCell.CompareFromTable(rowInfo.row)
            //                             ? "#00B187"
            //                             : "#FF5676",
            //                         color: "white"
            //                     }
            //                 };
            //             } else {
            //                 return {};
            //             }
            //         };
            //     }
            // }

            itemObj["Cell"] = row => {
                // let rowStyle = ;
                // let data = this.props.tableOption.adjustCellPosition;
                // for (let singleData in data) {
                //     console.log(singleData, data[singleData], item);
                //     if (data.hasOwnProperty(singleData)) {
                //         if (singleData === item) {
                //             rowStyle = (<div style={{textAlign: data[singleData]}}>{row.value}</div>)
                //         }
                //     }
                // }

                // const adjustCellObject = Object.assign({}, this.props.tableOption.adjustCellPosition);

                var spanData;
                if (this.props.tableOption.addSpanToRow) {
                    let spanRow = this.props.tableOption.addSpanToRow.rowName;
                    if (itemObj["accessor"] === spanRow) {
                        if (row.value === "") {
                            return <div style={{textAlign: "left"}}>
                                {row.value}
                            </div>
                        }

                        spanData = this.addSpanToRow(row.value.split(","), row.original);

                        return (
                            <div style={{textAlign: "left"}}>
                                {spanData}
                            </div>
                        );
                    }
                }
                if (this.props.tableOption.columnStyle) {
                    const adjustStyleOfCellObject = Object.assign(
                        {},
                        this.props.tableOption.columnStyle
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

            if (this.props.tableOption.styleCellConditionally) {
                let conditionalObjectCopy = Object.assign(
                    {},
                    this.props.tableOption.styleCellConditionally
                );
                Object.keys(conditionalObjectCopy).forEach(key => {
                    if (itemObj["accessor"] === key) {
                        // console.log(conditionalObjectCopy[key]);
                        itemObj["getProps"] = (state, rowInfo, column) => {
                            if (rowInfo && rowInfo.row) {
                                // console.log(rowInfo);
                                // console.log(conditionalObjectCopy[key]);
                                // console.log(conditionalObjectCopy[key].rowName);
                                // console.log(conditionalObjectCopy[key].condition(rowInfo.row).style);
                                return {
                                    style: conditionalObjectCopy[key].condition(rowInfo.row).style
                                };
                            } else {
                                return {};
                            }
                        };
                    }
                });
            }
            //
            // if (this.props.tableOption.styleCellConditionally) {
            //     if (itemObj["accessor"] === this.props.tableOption.styleCellConditionally.rowName) {
            //         console.log("test");
            //         itemObj["getProps"] = (state, rowInfo, column) => {
            //             if (rowInfo && rowInfo.row) {
            //                 console.log(rowInfo);
            //                 let conditionalRender = Object.assign({}, this.props.tableOption.styleCellConditionally);
            //                 console.log(conditionalRender);
            //                 return {
            //                     style: conditionalRender.condition(rowInfo.row).style
            //                 };
            //             } else {
            //                 return {};
            //             }
            //         };
            //     }
            // }

            // if (itemObj["id"] === "timeStamps") {
            //     itemObj["accessor"] = item =>
            //         Moment(item.timeStamps)
            //             .local()
            //             .format("MM/DD/YYYY, h:mm:ss a")
            //             .toString();
            // }
            header.push(itemObj);
        });
        return header;
    }

    function

    cancel(e) {
        console.log(e);
    }

    addSpanToRow(data, row) {
        return <div>
            <ul className="list-group">
                {data.map((item, index) =>
                    <li key={index} style={{backgroundColor: "#F3F7FA"}}
                        className="list-group-item1 d-flex justify-content-between align-items-center">
                        {item}
                        <span>
                             <Popconfirm
                                 title="Are you sure delete this task?"
                                 onConfirm={event => this.props.tableOption.addSpanToRow.deleteTask(item, row)}
                                 onCancel={this.cancel.bind(this)}
                                 placement="right"
                                 okText="Yes"
                                 cancelText="No"
                             >
                            <button style={{
                                outline: "none",
                                backgroundColor: "#F3F7FA",
                                borderRadius: "5px",
                                color: "white",
                                border: "none"
                            }}
                            ><DeleteOutlined
                                style={{
                                    fontSize: "1.5em",
                                    backgroundColor: "#F3F7FA !important",
                                    color: "red"
                                }}/></button>
                               </Popconfirm>

                             </span>
                    </li>
                )}

            </ul>
        </div>;
    }

    getColumnWidth(accessor, headerText, data) {
        let max = 0;
        const maxWidth = 200;
        const magicSpacing = 16;

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
        return map(
            array,
            object => omit(object, this.props.tableOption.tableRowRemove) // return from _.omit
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

    getTableEditRow(row) {
        let tableRow = [...this.state.data];
        let tableFilteredRow = [...this.state.filteredData];
        let selectedObject = {};
        // tableRow.splice(row.index, 1);

        if (this.state.isSearchStarted) {
            selectedObject = tableFilteredRow[row._index];
        } else {
            selectedObject = tableRow[row._index];
        }
        this.props.tableOption.addEditButtonToRow.tableRowValue(selectedObject);
    }

    getTableUserEditRow(row) {
        let tableRow = [...this.state.data];
        let tableFilteredRow = [...this.state.filteredData];
        let selectedObject = {};
        // tableRow.splice(row.index, 1);

        if (this.state.isSearchStarted) {
            selectedObject = tableFilteredRow[row._index];
        } else {
            selectedObject = tableRow[row._index];
        }
        this.props.tableOption.addUserEditButtonToRow.tableRowValue(selectedObject);
    }

    getTableDeleteRow(row) {
        let tableRow = [...this.state.data];
        let tableFilteredRow = [...this.state.filteredData];
        let selectedObject = {};

        if (this.state.isSearchStarted) {
            selectedObject = tableFilteredRow[row._index];
        } else {
            selectedObject = tableRow[row._index];
        }
        this.props.tableOption.addDeleteButtonToRow.tableRowValue(selectedObject);
    }

    addEditButtonToRow() {
        const addedButton = Object.assign(
            {},
            this.props.tableOption.addEditButtonToRow
        );
        let editRow;
        if (this.props.tableOption.addEditButtonToRow.editRow) {
            editRow = <FaUserEdit style={{color: "green", fontSize: "1.5em"}}/>;
        }

        return {
            Header: addedButton.Header,
            accessor: addedButton.accessor,
            Cell: row => (
                <button
                    onClick={() =>
                        this.getTableEditRow(row.row)
                    }
                    style={addedButton.style}
                >
                    {editRow}
                    {addedButton.buttonName}
                </button>
            )
        };
    }

    addDeleteButtonToRow() {
        const addedButton = Object.assign(
            {},
            this.props.tableOption.addDeleteButtonToRow
        );
        let deleteRow;
        if (this.props.tableOption.addDeleteButtonToRow.deleteRow) {
            deleteRow = <GoTrashcan style={{color: "red", fontSize: "1.5em"}}/>;
        }

        return {
            Header: addedButton.Header,
            accessor: addedButton.accessor,
            Cell: row => (
                <button
                    onClick={() => this.getTableDeleteRow(row.row)}
                    style={addedButton.style}
                >
                    {deleteRow}
                    {addedButton.buttonName}
                </button>
            )
        };
    }

    addUserEditButton() {
        const addedButton = Object.assign(
            {},
            this.props.tableOption.addUserEditButtonToRow
        );
        let editUserInfo;
        if (this.props.tableOption.addUserEditButtonToRow.editUserRow) {
            editUserInfo = <FaUserCog style={{color: "green", fontSize: "1.5em"}}/>;
        }

        return {
            Header: addedButton.Header,
            accessor: addedButton.accessor,
            Cell: row => (
                <button
                    onClick={() => this.getTableUserEditRow(row.row)}
                    style={addedButton.style}
                >
                    {editUserInfo}
                    {addedButton.buttonName}
                </button>
            )
        };
    }

    componentDidMount() {
        if (this.props.tableOption.link) {
            fetch(this.props.tableOption.link, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data = data.response;
                    console.log(data);
                    data = this.convertBooleanIntoString(data);
                    if (this.props.tableOption.tableRowRemove) {
                        data = this.mapArray(data);
                    }
                    this.setState({data: data});
                    return data;
                })
                .then(data => {
                    if (data.length !== 0) {
                        let header = this.getTableHeaderFromData(data);
                        if (this.props.tableOption.addDeleteButtonToRow)
                            header.push(this.addDeleteButtonToRow());
                        if (this.props.tableOption.addEditButtonToRow) {
                            header.push(this.addEditButtonToRow());
                        }
                        if (this.props.tableOption.addUserEditButtonToRow) {
                            header.push(this.addUserEditButton());
                        }
                        this.setState({header: header, containsData: true});
                    }
                }).catch(error => console.log("Cannot fetch the data.", error));
        }

        if (this.props.tableOption.tableData) {
            try {
                let tableData = [...this.props.tableOption.tableData];
                if (tableData.length !== 0) {
                    tableData = this.convertBooleanIntoString(tableData);
                    if (this.props.tableOption.tableRowRemove) {
                        tableData = this.mapArray(tableData);
                    }
                    let header = this.getTableHeaderFromData(tableData);
                    if (this.props.tableOption.addDeleteButtonToRow)
                        header.push(this.addDeleteButtonToRow());
                    if (this.props.tableOption.addEditButtonToRow)
                        header.push(this.addEditButtonToRow());
                    if (this.props.tableOption.addUserEditButtonToRow) {
                        console.log("From edit");
                        header.push(this.addUserEditButton());
                    }
                    this.setState({header: header, containsData: true, data: tableData});

                } else this.setState({containsData: false})
            } catch (error) {
                this.setState({containsData: false, data: []});

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tableOption.tableData !== this.props.tableOption.tableData) {
            let tableData = this.props.tableOption.tableData;
            if (tableData.length !== 0) {
                tableData = this.convertBooleanIntoString(tableData);
                if (this.props.tableOption.tableRowRemove) {
                    tableData = this.mapArray(tableData);
                }
                let header = this.getTableHeaderFromData(tableData);
                if (this.props.tableOption.addDeleteButtonToRow)
                    header.push(this.addDeleteButtonToRow());
                if (this.props.tableOption.addEditButtonToRow)
                    header.push(this.addEditButtonToRow());
                if (this.props.tableOption.addUserEditButtonToRow) {
                    console.log("From edit");
                    header.push(this.addUserEditButton());
                }
                this.setState({header: header, containsData: true, data: tableData});
            } else {
                this.setState({containsData: false});
            }
        }
    }

    getTrProps = (state, rowInfo, instance) => {
        if (rowInfo) {
            return {
                style: {
                    background: "#F3F7FA",
                    margin: "0.1em 0 0.8em 0"
                }
            };
        }
        return {};
    };

    simpleTitleOnly(title) {
        if (title) {
            return (
                <p
                    style={{
                        fontSize: " 1.2em",
                        letterSpacing: "0.5px",
                        margin: "0px 0px",
                        marginBottom: "0.5em",
                        marginLeft: "0.5em"
                    }}
                >
                    {title}
                </p>
            );
        }
    }

    titleWithTableInfo(title, dataLength) {
        if (title) {
            return (
                <TitleWithTableInfo title={title} tableDataLength={dataLength}>
                    <Search
                        onChangeTableData={event =>
                            this.onChangeTableState(event, this.state.data)
                        }
                    />
                </TitleWithTableInfo>
            );
        }
    }

    dropdownChange(number) {
        switch (number) {
            case "5":
                this.setState({pageSizeOption: 5});
                break;
            case "10":
                this.setState({pageSizeOption: 10});
                break;
            case "20":
                this.setState({pageSizeOption: 20});
                break;
            case "50":
                this.setState({pageSizeOption: 50});
                break;
            default:
                this.setState({
                    pageSizeOption:
                        this.state.filteredData.length <= 0
                            ? this.state.data.length
                            : this.state.filteredData.length
                });
                break;
        }
        console.log(number, this.state.pageSizeOption);
    }

    onChangeTableState(event, data) {
        // console.log("A data changed");
        let mainData = [...data];
        let searchValue = event.target.value.trim().toLowerCase();
        if (searchValue.length === 0) {
            this.setState({isSearchStarted: false, pageSizeOption: 5});
        } else this.setState({isSearchStarted: true, pageSizeOption: 5});

        mainData = JSON.stringify(mainData, (k, v) =>
            v && typeof v === "object" ? v : "" + v
        );
        mainData = JSON.parse(mainData);
        // if (this.state.isSearchStarted) {
        let filteredData = mainData.filter(o =>
            Object.keys(o).some(key => o[key].toLowerCase().includes(searchValue))
        );
        if (filteredData.length !== 0) {
            this.setState({filteredData: filteredData});
            // console.log("data found : " + filteredData.length)
        } else {
            this.setState({filteredData: [], pageSizeOption: 5});
            // this.setState({});
            // console.log("No data found : " + filteredData.length);
        }
        // }
    }

    showDropDownData(show) {
        if (show) {
            return (
                <CustomDropdown
                    dropdownOption={this.props.dropdownOption.customValue}
                    changeDropDownButton={this.dropdownChange.bind(this)}
                    tableLength={this.state.pageSizeOption}
                />
            );
        }
    }

    render() {
        let component;
        if (this.state.containsData) {
            component = (
                <div
                    style={{
                        background: "#F3F7FA",
                        marginTop: "0.2em",
                        marginBottom: "2em",
                    }}
                >
                    {this.simpleTitleOnly(this.props.tableOption.title)}
                    {this.titleWithTableInfo(
                        this.props.tableOption.titleWithTableInfo,
                        this.state.data.length
                    )}
                    <ReactTable
                        pageSize={
                            this.props.tableOption.showAllData ? this.state.data.length : (this.state.data.length <= 5
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
                                    background: "#F3F7FA",
                                    borderStyle: "none",
                                    fontWeight: "bolder"
                                }
                            };
                        }}
                        minRows={this.state.data.length <= 5
                            ? this.state.data.length
                            : this.state.pageSizeOption}
                        filtered={this.state.filteredData}
                        getTrProps={this.getTrProps}
                        showPaginationBottom={false}
                        columns={this.state.header}
                        // filtered data
                        // onFilteredChange={this.onChangeTableState.bind(this)}
                    />
                    {this.showDropDownData(this.props.dropdownOption.show)}
                </div>
            );
        } else {
            component = (
                <div>
                    {this.simpleTitleOnly(this.props.tableOption.title)}
                    {this.titleWithTableInfo(
                        this.props.tableOption.titleWithTableInfo,
                        this.state.data.length
                    )}
                    <div
                        style={{
                            border: "1px solid black",
                            textAlign: "center",
                            margin: "5px",
                            marginBottom: '1em',
                            borderRadius: "5px",
                            boxShadow: "5px 10px 18px #888888"
                        }}
                    >
                        <h4 style={{paddingTop: "10px"}}><ExclamationCircleOutlined
                            style={{color: "red", margin: "0px"}}/> &nbsp;&nbsp; No Data To Display !! </h4>
                    </div>
                </div>
            );
        }
        return <div>{component}</div>;
    }
}

export default CustomTable;
