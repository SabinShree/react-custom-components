import React, {Component} from 'react';
import AddModal from "./Modal/AddModal";
import {IoMdAdd} from "react-icons/all";
import DeleteModal from "./Modal/DeleteModal";
import CustomTable from "../DesignTable/Container/Table/CustomTable";

class CrudOperation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            showAddModal: false,
            showUpdateModal: false,
            deleteId: ""
        }
        this.openAddModal = this.openAddModal.bind(this);
    }

    openAddModal() {
        this.setState({showAddModal: true});
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        marginLeft: "50%",
                        position: "absolute",
                        right: "0",
                        paddingRight: "5em",
                        paddingTop: "5px"
                    }}
                >
                    <button
                        onClick={this.openAddModal}
                        style={{
                            outline: "none",
                            backgroundColor: "#5843F8",
                            color: "white",
                            padding: "5px 20px",
                            border: "none",
                            borderRadius: "5px"
                        }}
                    >
                        <IoMdAdd
                            style={{color: "white", padding: "0", marginRight: "5px"}}
                        />
                        {this.props.addButtonName}
                    </button>
                </div>
                <div style={{paddingTop: "1.7em"}}>
                    <CustomTable
                        tableOption={{
                            link: this.props.table.link,
                            tableData: this.props.table.tableData,
                            titleWithTableInfo: this.props.table.title,
                            HeaderToLeft: true,
                            // tableRowRemove: ["contactNumber", "password", "designation", "id", "email", "reportingDeptHeads", "employmentStartDate", "employeeType"],
                            tableRowRemove: this.props.table.tableRowRemove,
                            addDeleteButtonToRow: {
                                buttonName: "",
                                Header: "",
                                deleteRow: true,
                                accessor: "remove",
                                style: {
                                    marginRight: "0",
                                    padding: "2px 15px",
                                    outline: "none",
                                    display: "block",
                                    marginLeft: "auto",
                                    borderRadius: "5px",
                                    border: "none",
                                    backgroundColor: "#F3F7FA",
                                    color: "white"
                                },
                                tableRowValue: rows => {
                                    const id = Object.keys(rows).some(item => item === this.props.onDelete.selectedId)
                                    if (!id) {
                                        return;
                                    }
                                    let deletedLabel = rows[this.props.onDelete.selectedId];
                                    console.log(this.props.onDelete.selectedId);
                                    this.setState({showDeleteModal: true, deletedId: deletedLabel});
                                }
                            },

                            addUserEditButtonToRow: {
                                buttonName: "",
                                Header: "",
                                editUserRow: true,
                                accessor: "edit",
                                style: {
                                    marginRight: "0",
                                    padding: "2px 15px",
                                    outline: "none",
                                    display: "block",
                                    marginLeft: "auto",
                                    borderRadius: "5px",
                                    border: "none",
                                    backgroundColor: "#F3F7FA",
                                    color: "white"
                                },
                                tableRowValue: row => {
                                    this.setState({showEditModal: true})
                                }
                            }
                        }}
                        dropdownOption={{
                            show: true
                        }}
                    />

                    <AddModal
                        showModal={this.state.showAddModal}
                        structure={this.props.structure}
                        addValue={this.props.onAdd}
                        close={() => {
                            this.setState({showAddModal: false})
                        }}/>
                    <DeleteModal
                        buttonName={this.props.onDelete.buttonName}
                        showModal={this.state.showDeleteModal}
                        deleteLink={this.props.onDelete.deleteLink}
                        deleteId={this.state.deletedId}
                        cancelModal={() => this.setState({showDeleteModal: false})}
                        close={() => {
                            this.setState({showDeleteModal: false})
                        }}
                    />

                </div>
            </div>);
    }
}


export default CrudOperation;
