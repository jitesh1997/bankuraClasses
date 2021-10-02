import React from 'react';
import cx from 'classnames';
import '../Components.css'

const Button = ({
	type,
	title,
	onClick,
	disabled,
	customButtonClass,
}) => {
	return (
			<button
				className={cx(
                    'btn',
					type === 'primary' && 'btn-primary',
					type === 'secondary' && 'btn-secondary',
					customButtonClass
				)}
				onClick={onClick}
				disabled={disabled}
			>
				{title}
			</button>
	);
};

export default Button;
