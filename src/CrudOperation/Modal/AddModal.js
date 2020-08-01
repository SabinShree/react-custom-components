import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "antd";
import InputElement from "../Input/Input";
import Modal from "react-bootstrap/Modal";
import Button from "../../UtilityUI/Button/LoadingButton";
import Emitter from "../EventEmiiterCRUD";

class AddModal extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        // console.log(values);
        this.props.addValue(values);
        Emitter.emit("ADD_VALUE", values);
    }

    render() {
        let formLayout = "horizontal";
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 4,
                span: 12,
            },
        };

        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: {
                        span: 4,
                    },
                    wrapperCol: {
                        span: 14,
                    },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: {
                        span: 14,
                        offset: 4,
                    },
                }
                : null;

        let init = {};
        this.props.structure.forEach((item, index) => {
            init[item["inputLabelName"]] = item.value;
        });
        init["layout"] = formLayout;
        return (
            <Modal size={"lg"} show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5> Add New </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form layout={formLayout} {...formItemLayout}
                          initialValues={init}
                          name="addModal" onFinish={this.handleSubmit}>
                        {this.props.structure.map((item, index) => {
                            return (
                                <InputElement key={index} value={item.value}
                                              type={item.type} rules={item.rules || []}
                                              inputLabelName={item.inputLabelName} optionList={item.optionList}/>
                            )
                        })}
                        <Form.Item {...buttonItemLayout}>
                            <Button text={"Save"}/>
                        </Form.Item>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

AddModal.propTypes = {};

export default AddModal;
