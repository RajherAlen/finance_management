import React from "react";
import { Controller, FieldValues, ControllerProps } from "react-hook-form";

interface NumberInputProps
	extends Omit<ControllerProps<FieldValues, "input">, "render"> {
	as?: React.ElementType;
}

const NumberInput: React.FC<NumberInputProps> = ({ as, ...rest }) => (
	<Controller
		{...rest}
		render={({ field }) => (
			<input
				{...field}
				onChange={(e) =>
					field.onChange(
						Number.isNaN(parseFloat(e.target.value))
							? 0
							: parseFloat(e.target.value)
					)
				}
			/>
		)}
	/>
);

export default NumberInput;
