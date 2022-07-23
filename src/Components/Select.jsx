import React from "react";
import PropTypes from "prop-types"

function Select(props) {

    return (
        <div>
            <input value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} onKeyPress={(event) => {
                if (!/[0-9\.]/.test(event.key)) {
                    event.preventDefault();
                }
            }} />
            <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)} >
                {Object.keys(props.currencies).map((currency => (
                    <option value={currency} key={currency}>{currency}</option>
                )))}
            </select>
        </div>
    )
}

Select.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.object,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
}

export default Select;