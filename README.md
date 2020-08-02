# react-custom-components

Those are the bunch of modular components which i made to use it frequently.Those modular component are not maintained. But i try to update it in near future. :) 
## Installation
Copy the file directly to your project and use it accordingly.

## description

1. Button : modular button which can be configured automatically. (see the props type)
2. DesignTable : A modular table which is build on top of react-table-v6. See the example.
```javascript 1.8
<CustomTable
            tableOption={{

                tableData: userList, // table data
                link: "www.example.json" // can fetch the data and form the table. 
                titleWithTableInfo: "Total users : ", // title info
                HeaderToLeft: true, // header direction
                tableRowRemove: ["contactNumber", "password", "employmentStartDate", "employeeType"], // table row to remove
                hideColumn: [ "designation", "id", "email",], // hide from table.
                  styleCellConditionally: { // can color row condtionally. 
                                           password: {
                                               condition: (row) => {
                                                   console.log("the row is ", row);
                                                   if (row.password > 100) {
                                                       console.log(row.chg);
                                                       return {
                                                           style: {
                                                               color: "red",
                                                               backgroundColor: "white",
                                                           },
                                                       };
                                                   } else {
                                                       return {
                                                           style: {
                                                               color: "green",
                                                               backgroundColor: "white",
                                                           },
                                                       };
                                                   }
                                               },
                                           },
                                           contactNumber: {
                                               condition: (row) => {
                                                   console.log("the row is ", row);
                                                   if (row.contactNumber.startsWith("-")) {
                                                       return {
                                                           style: {
                                                               color: "red",
                                                               backgroundColor: "white",
                                                           },
                                                       };
                                                   } else {
                                                       return {
                                                           style: {
                                                               color: "green",
                                                               backgroundColor: "white",
                                                           },
                                                       };
                                                   }
                                               },
                                           },
                                       },
                addDeleteButtonToRow: { // can be used button in react. //  (not good tho)
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
                    tableRowValue: row => {
                                            console.log(row) // return the row value 
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
                        console.log(row) // return the row value 
                    }
                },

                addEditButtonToRow: {
                    buttonName: "",
                    Header: "",
                    accessor: "remove",
                    editRow: true,
                    style: {
                        marginRight: "0em",
                        padding: "2px 15px",
                        outline: "none",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#F3F7FA",
                        color: "red"
                    },
                    tableRowValue: row => {
                     console.log(row) // return the row value 
                    }
                }
            }}
            dropdownOption={{
                show: true // false to hide the dropdown menu. 
            }}
        />
```
![custom table ](./readmeImg/11111.PNG?raw=true "Title")

3. CrudOperation : We can use make generic CRUD  with validation too without writing much code.  
```javascript
 <CrudOperation table={{
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
```
4. HOC : HOC componets which show loading spinner while  fetching the data.
5. MyCustomFileUploader: File uploader.
```javascript 1.5
<MyCustomUploader header="Select Logo here "
                                  accept="image/x-png,image/gif,image/jpeg" buttonName="Upload Logo"
                                  mutedText="Only Image File Here." url={urlStatement}
                                  method="POST"/>
```
## Contributing
Not maintained. 
