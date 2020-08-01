import React, {Component} from 'react';
import "./Spinner.style.css"
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Spinner from "./Spinner/SpinnerForUserManagement";

const {confirm} = Modal;

function showDeleteConfirm() {
    confirm({
        title: 'Error',
        icon: <ExclamationCircleOutlined/>,
        content: 'Cannot fetch the data. Check connections.',
        okType: 'danger',
        cancelText: 'Exit',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            isLoading: false
        }

        componentWillMount() {
            const self = this
            axios.interceptors.request.use(function (config) {
                // spinning start to show
                console.log(config);
                // setTimeout(() => self.setState({isLoading: true})
                //     , 1200)
                self.setState({isLoading: true})
                return config
            }, function (error) {
                self.setState({isLoading: false, error: error})
                return Promise.reject(error);
            });

            axios.interceptors.response.use(function (response) {
                // spinning hide
                setTimeout(() => self.setState({isLoading: false})
                    , 2200)
                // self.setState({isLoading: false})
                return response;
            }, function (error) {
                self.setState({isLoading: false, error: error})
                return Promise.reject(error);
            });
        }

        // componentWillUnmount() {
        //     axios.interceptors.request.eject(this.reqInterceptor);
        //     axios.interceptors.response.eject(this.resInterceptor);
        // }

        spinnerFullPage() {
            return (<div className="container">
                <div className="vertical-center">
                    <Spinner/>
                </div>
            </div>)
        }

        render() {
            console.log("the loading is " + this.state.isLoading)
            console.log((this.state.isLoading ? "none" : "block"))
            return (
                <div>
                    {this.state.isLoading ? this.spinnerFullPage()
                        : null}
                    {this.state.error ? showDeleteConfirm() : null}
                    <div style={{display: (this.state.isLoading ? "none" : "block")}} aria-disabled={this.state.error}>
                        <WrappedComponent {...this.props}/>
                    </div>
                </div>
            );
        }
    }
}

export default withErrorHandler;