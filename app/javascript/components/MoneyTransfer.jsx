import React from "react"
import PropTypes from "prop-types"

class MoneyTransfer extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let cashing_options_wu = ['Cash Pickup', 'Bank Deposit'];

        return(
            <div>
                {/** Money Transfer Options */}
                <div id="money-transfer-options-modal" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form role="form"
                                      id="money-transfer-options-form">
                                    {
                                        this.props.money_transfer_options.map((option, idx) => 
                                            <div key={idx} className="checkbox"
                                                 id={`money-transfer-option-${idx}`}>
                                                <label>
                                                    <input type="checkbox" /> {option}
                                                </label>
                                            </div>
                                        )
                                    }
                                    <button type="button" 
                                            className="btn btn-default"
                                            onClick={se => this.onClickSubmitMoneyTransferOption(se)}>
                                        Submit
                                    </button>
                                </form>   
                            </div>
                        </div>
                    </div>
                </div>
                {/** Western Union */}
                <div id="money-transfer-sender-wu-modal" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form role="form"
                                      id="money-transfer-sender-wu-form">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" id="first_name_wu"
                                               placeholder="Enter First Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Middle Name</label>
                                        <input type="text" className="form-control" id="middle_name_wu"
                                               placeholder="Enter Middle Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" id="last_name_wu"
                                               placeholder="Enter Last Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" id="phone_number_wu"
                                               placeholder="Phone Number"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Street Address</label>
                                        <input type="text" className="form-control" id="street_address_wu"
                                               placeholder="Street Address"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Address Line 2</label>
                                        <input type="text" className="form-control" id="address_line_2_wu"
                                               placeholder="Address Line 2"/>
                                    </div>
                                    <div>
                                        <select className="form-control">
                                        {
                                            cashing_options_wu.map((option, idx) => 
                                                <option key={idx} id={`cashing-option-wu-${idx}`}> {option} </option>
                                            )
                                        }
                                        </select>
                                    </div>
                                    <button type="submit" 
                                            className="btn btn-default"
                                            onClick={se => this.onClickSubmitMoneyTransferSenderWU(se)}>
                                        Submit
                                    </button>
                                </form>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        $('#money-transfer-options-modal').modal('show');
    }

    onClickSubmitMoneyTransferOption(e)
    {
        let option = $('#money-transfer-options-form');
        $('#money-transfer-options-modal').modal('hide');
        //let money_transfer_option = option.Elements[''];
        console.log("Showing WU modal for sender");
        $('#money-transfer-sender-wu-modal').modal('show');
    }

    onClickSubmitMoneyTransferSenderWU(e)
    {
        let form_wu = $('#money-transfer-sender-wu');
        $('#money-transfer-sender-wu').modal('hide');
    }
}

MoneyTransfer.propTypes = {
    money_transfer_options: PropTypes.array
};

export default MoneyTransfer;