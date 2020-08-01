import React, {Component} from "react";
import StatusAlert, {StatusAlertService} from "react-status-alert";
import {Modal} from "react-bootstrap";
import Button from "../../UtilityUI/Button/LoadingButton";

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    deleteExistingUser(event) {
        event.preventDefault();
        this.setState({isLoading: true})
        fetch(this.props.deleteLink + this.props.deleteId, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            this.setState({isLoading: false})
            StatusAlertService.showInfo(data.response);
            setTimeout(() => this.props.cancelModal(), 1500);
            this.props.reloadData();
        }).catch(err => {
            console.log(err);
            this.setState({isLoading: false})

            StatusAlertService.showError("Cannot connect to server. Try again.");
        })
    }

    render() {

        const buttonCancelStyle = {
            backgroundColor: "red",
            color: "white",
            padding: "4px 25px",
            outline: "none",
            marginLeft: "10px",
            marginRight: "1em",
            fontWeight: "bold",
            border: "none",
            borderRadius: "3px"
        };


        return (
            <Modal size="lg" show={this.props.showModal}
                   onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5> Are you sure you want to delete </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> {this.props.deleteId} </h5>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{marginTop: "1em"}}>


                        <Button text={this.props.buttonName} isLoading={this.state.isLoading}
                                onClick={this.deleteExistingUser.bind(this)}
                                loadingText={"Deleting User..."}/>
                        <button
                            style={buttonCancelStyle}
                            onClick={this.props.cancelModal}>
                            Cancel
                        </button>
                    </div>
                </Modal.Footer>
                <StatusAlert/>
            </Modal>
        );
    }
}

export default DeleteModal;