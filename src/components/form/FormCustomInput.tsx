import React from 'react';

import { InputType } from 'zlib';

import { Input } from '../input/Input';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './form';

interface FormCustomInputProps {
    label?: string;
    placeholder?: string;
    description?: string;
    requiered?: boolean;
    field: any;
    className?: string;
    inputClassName?: string;
    type?: InputType;
    hideErrorMessage?: boolean;
}

const FormCustomInput = (props: FormCustomInputProps) => {
    return (
        <FormItem className={props.className}>
            {props.label && (
                <FormLabel>
                    {props.label}
                    {props.requiered && <span className="ml-1 text-sky-600">*</span>}
                </FormLabel>
            )}
            <FormControl>
                <Input placeholder={props.placeholder} type={props.type} className={props.inputClassName} {...props.field} />
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            {!props.hideErrorMessage && <FormMessage />}
        </FormItem>
    );
};

export default FormCustomInput;
