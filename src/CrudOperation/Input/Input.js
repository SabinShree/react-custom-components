import React from "react";
import {Form, Input, Select, InputNumber, DatePicker} from 'antd';
import {capitalizeFirstLetterOnly} from "../../DesignTable/Utils/Utils";

const {Option} = Select;

const InputElement = (props) => {

    let inputElement = null;
    switch (props.type) {
        case "input":
            inputElement = <Form.Item
                name={props.inputLabelName}
                label={capitalizeFirstLetterOnly(props.inputLabelName.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                rules={props.rules}
            >
                <Input placeholder={props.placeholder}/>
            </Form.Item>
            break;
        case "password" :
            inputElement =
                <Form.Item
                    name={props.inputLabelName}
                    // label={props.inputLabelName.charAt(0).toUpperCase() + props.inputLabelName.slice(1)}
                    label={capitalizeFirstLetterOnly(props.inputLabelName.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                    rules={props.rules}
                >
                    <Input.Password placeholder={props.placeholder}/>
                </Form.Item>;
            break;
        case "select" :
            inputElement = <Form.Item
                name={props.inputLabelName}
                label={capitalizeFirstLetterOnly(props.inputLabelName.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                rules={props.rules}
            >
                <Select
                    placeholder="Select a option"
                    allowClear
                >
                    {props.optionList.map((item, index) =>
                        <Option value={item.value} key={index}>{item.displayValue}</Option>
                    )}
                </Select>
            </Form.Item>
            break;

        case "number" :
            inputElement = <Form.Item
                name={props.inputLabelName}
                label={capitalizeFirstLetterOnly(props.inputLabelName.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                rules={props.rules}
            >
                <InputNumber style={{width: '100%'}} placeholder={props.placeholder}/>
            </Form.Item>;
            break;

        case "datePicker":
            inputElement = <Form.Item label="DatePicker">
                <DatePicker/>
            </Form.Item>
            break;
        default:
            inputElement = <Form.Item
                name={props.inputLabelName}
                label={capitalizeFirstLetterOnly(props.inputLabelName.replace(/([a-z])([A-Z])/g, "$1 $2"))}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            break;


    }

    return (
        inputElement

    )
};

export default InputElement;


