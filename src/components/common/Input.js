import React from 'react';
import cx from 'classnames';
import '../Components.css'

const Input = ({
    type,
    title,
    name,
    value,
    disabled,
    required,
    customInputClass,
    setOnChange,
    errMsg
}) => {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={title}
                className={cx(
                    'inputField',
                    errMsg && 'errorField',
                    customInputClass
                )}
                disabled={disabled}
                value={value}
                onChange={setOnChange}
                required={required}>
            </input>
            {errMsg && <div className="error-message">{errMsg}</div>}
        </>
    );
};

export default Input;