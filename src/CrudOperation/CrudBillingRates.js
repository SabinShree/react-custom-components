import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Emitter from "./EventEmiiterCRUD";
import CrudOperation from "./CrudOperation";
import {axiosUtil} from "../axios-order";

import {getFiscalYear} from "../utils/Utils";

class CrudBillingRates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }

    componentDidMount() {
        axiosUtil.get("BillingInformation/getBillingRates").then(response => response.data)
            .then(response => this.setState({tableData: response})).catch(err => {
            console.log(err);
        });
    }

    render() {
        const fiscalYearForForm = getFiscalYear().map((item) => {
            return {
                displayValue: item,
                value: item
            }
        });

        let serviceName = this.state.tableData.map((item, index) => {
            return {
                displayValue: item.serviceName,
                value: item.serviceName
            }
        })

        serviceName = serviceName.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.value === thing.value && t.displayValue === thing.displayValue
            ))
        )
        return (
            <div>
                <CrudOperation table={{
                    // link: "http://localhost:8082/BillingInformation/getBillingRates",
                    title: "Billing Rates",
                    tableData: this.state.tableData,
                    tableRowRemove: ["id"]
                }}
                               onDelete={{
                                   link: "http://localhost:8081",
                                   selectedId: "serviceName",
                                   buttonName: "Delete"
                               }}
                               addButtonName={"Add New Rates"}
                               onUpdate={(updatedData) => {
                                   Emitter.emit("UPDATE_VALUE", value => console.log(value));
                               }}
                               onAdd={(formData) => {
                                   console.log(formData);
                                   // Emitter.on("ADD_VALUE", value => console.log(value));
                               }}
                               structure={[
                                   {
                                       type: "select",
                                       value: "",
                                       inputLabelName: "serviceName",
                                       rules: [{
                                           required: true,
                                           message: "Please input the Service Name!"
                                       }],
                                       optionList: serviceName,
                                       placeHolder: "Enter the Service Name "

                                   },
                                   // {
                                   //     type: "password",
                                   //     value: "",
                                   //     inputLabelName: "password",
                                   //     rules: [{
                                   //         required: true,
                                   //         message: "Please input the password bro!"
                                   //     }]
                                   //
                                   // },
                                   {
                                       type: "select",
                                       value: "",
                                       placeHolder: "Select the fiscal Year",
                                       inputLabelName: "serviceYear",
                                       rules: [{
                                           required: true,
                                           message: "Please select the option from here!"
                                       }],
                                       optionList: fiscalYearForForm

                                   },
                                   {
                                       type: "number",
                                       value: "",
                                       inputLabelName: "rate",
                                       rules: [{
                                           required: true,
                                           message: "Please input Number !"
                                       }]

                                   }
                               ]}
                />
            </div>
        );
    }
}

CrudBillingRates.propTypes = {};

export default CrudBillingRates;
