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
        return(
            <div>
                <div id="money-transfer-options-modal" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form role="form"
                                      id="money-transfer-options-form">
                                    {
                                        this.props.money_transfer_options.map((option, idx) => 
                                            <div className="checkbox"
                                                 id={`money-transfer-option-${idx}`}>
                                                <label>
                                                    <input type="checkbox" /> {option}
                                                </label>
                                            </div>
                                        )
                                    }
                                    <button type="submit" 
                                            className="btn btn-default"
                                            onClick={se => this.onClickSubmitMoneyTransferOption(se)}>
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

    onClickSubmitMoneyTransferOption(se)
    {
        let option = $('#money-transfer-options-form');
        $('#money-transfer-options-modal').modal('hide');
    }
}

MoneyTransfer.propTypes = {
    money_transfer_options: PropTypes.array
};

export default MoneyTransfer;