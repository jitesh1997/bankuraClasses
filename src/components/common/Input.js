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
    customButtonClass,
    setOnChange,
    setOnClick,
    errMsg
}) => {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={title}
                className={cx(
                    errMsg && 'errorField',
                    customButtonClass
                )}
                disabled={disabled}
                value={value}
                onChange={setOnChange}
                onClick={setOnClick}
                required={required}>
            </input>
            {errMsg && <div className="error-message">{errMsg}</div>}
        </>
    );
};

export default Input;