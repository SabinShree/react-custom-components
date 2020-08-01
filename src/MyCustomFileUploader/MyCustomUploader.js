import React, {Component} from 'react';
import {MdFileUpload, MdCancel} from "react-icons/all";
import {Spinner} from "react-bootstrap";
import Spinners from "../Spinner/Spinner"
import Alert from "react-bootstrap/Alert";

import StatusAlert, {StatusAlertService} from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'

class MyCustomUploader extends Component {
    state = {
        imageFile: null,
        displayProgress: false,
        spinningStatement: false,
        successfullyUploaded: false,
        showAlert: false,
        showError: false,
        loadSpinner: false,
        progressWidth: 0,
        progressText: "0"
    };

    handleFile(event) {
        this.setState({imageFile: event.target.files[0]})
    }

    abortController = new AbortController();


    handleSubmitFile(event) {
        event.preventDefault();
        this.setState({showError: false, showAlert: false});
        this.setState({spinningStatement: true});
        if (this.state.file === null) {
            StatusAlertService.removeAllAlerts();
            StatusAlertService.showError("File is empty. Select from your files.");
            this.setState({spinningStatement: false});
            return;
        }

        let formData = new FormData();
        formData.append("file", this.state.imageFile);

        this.setState({loadSpinner: true});
        fetch(this.props.url, {
            method: this.props.method,
            body: formData,
            signal: this.abortController.signal
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.setState({spinningStatement: false, successfullyUploaded: true, showAlert: true});
                this.setState({loadSpinner: false});
            } else {
                this.setState({spinningStatement: false, successfullyUploaded: false});
                this.setState({loadSpinner: false});
                this.setState({showError: true});
            }
        }).catch(err => {
            console.log("From Error. " + err.name);
            this.abortController.abort();
            this.abortController = new AbortController();
            this.setState({loadSpinner: false});
            this.setState({spinningStatement: false, showError: true});
        })
    }

    cancelCurrentRequest(event) {
        event.preventDefault();
        this.abortController.abort();
        this.abortController = new AbortController();
        this.setState({showError: true, loadSpinner: false, spinningStatement: false});
    }

    showAlertOnUpload() {
        let upload;
        if (this.state.successfullyUploaded) {
            upload =
                <Alert show={this.state.showAlert} onClose={() => this.setState({showAlert: false})} variant="success"
                       dismissible>
                    <p>
                        File is successfully uploaded.
                    </p>
                    <hr/>
                </Alert>
        } else {
            upload =
                <Alert show={this.state.showError}
                       onClose={() => this.setState({showError: false})}
                       variant="danger"
                       dismissible>
                    <p>
                        File is not uploaded.
                    </p>
                    <hr/>
                </Alert>
        }
        return upload;
    }


    render() {

        let buttonName = <span><MdFileUpload style={{fontSize: "1.3em"}}/> {this.props.buttonName} </span>;
        if (this.state.spinningStatement) {
            buttonName = <span><Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
           <span style={{marginLeft: "5px"}}> Uploading File .... </span>
            </span>
        }
        return (
            <div style={{width: "60%"}}>
                <div>
                    <form encType="multipart/form-data" method="POST">
                        <h5>{this.props.header}</h5>
                        <input type="file" name="file" onChange={(event) => this.handleFile(event)}
                               accept={this.props.accept}
                        />
                        <p
                            style={{
                                fontSize: "0.8em",
                                marginTop: "5px",
                                fontWeight: "bold"
                            }}
                        >
                            {this.props.mutedText}
                        </p>
                        <div>
                            <button type="submit" onClick={this.handleSubmitFile.bind(this)} style={{
                                backgroundColor: "#5843F8",
                                color: "white",
                                padding: "3px 20px",
                                fontWeight: "bold",
                                margin: "0",
                                float: "left",
                                marginRight: "10px",
                                border: "none",
                                marginBottom: "10px",
                                borderRadius: "5px"
                            }}> {buttonName}
                            </button>
                        </div>
                        <div>
                            <button onClick={this.cancelCurrentRequest.bind(this)} style={{
                                backgroundColor: "#f83e55",
                                color: "white",
                                padding: "3px 20px",
                                fontWeight: "bold", float: "left",
                                margin: "0",
                                border: "none",
                                marginBottom: "10px",
                                borderRadius: "5px"
                            }}><MdCancel/> Cancel File Upload
                            </button>
                        </div>
                        <div style={{clear: "both"}}></div>
                        <br/>
                        {this.state.loadSpinner ? <Spinners/> : null}
                        {this.showAlertOnUpload()}
                    </form>
                </div>
                <StatusAlert/>
            </div>
        );
    }
}

export default MyCustomUploader;