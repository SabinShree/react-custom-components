import React from "react";
import "./dropdown.style.css";
import {ButtonGroup, Container,} from "react-bootstrap";
import {Menu, Dropdown, Button} from "antd";

class CustomDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOptions: [5, 10, 20, 50, "All"],
        }
    }

    componentDidMount() {
        if (this.props.dropdownOption) {
            console.log(this.props.dropdownOption);
        }
    }

    onDropdownValueChange = (e) => {
        this.props.changeDropDownButton(e.key);
    };

    render() {
        const menu = (
            <Menu onClick={this.onDropdownValueChange.bind(this)}>
                {this.state.dropdownOptions.map((item, index) => (
                            <Menu.Item
                                           value={item}
                                       key={item}>{item}</Menu.Item>))}
            </Menu>
        );

        return (
            <Container fluid={true} className="dropDownDiv">
                <div className="bottomRight">
                    <div id="components-dropdown-demo-dropdown-button">
                        <Dropdown.Button overlay={menu}>
                            Show {this.props.tableLength}
                        </Dropdown.Button>
                    </div>
                    <div style={{marginBottom:"5px"}}/>
                </div>
            </Container>
        );
    }
}

export default CustomDropdown;