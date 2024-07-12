import React from 'react';

import Select, { SelectItem } from '../select/Select';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './form';

interface FormSelectProps {
    label?: string;
    placeholder: string;
    description?: string;
    requiered?: boolean;
    field: any;
    options: SelectItem[];
    fullWidth?: boolean;
    className?: string;
    ghostSelect?: boolean;
    hideErrorMessage?: boolean;
    onChange?: any;
}

const FormSelect = (props: FormSelectProps) => {
    return (
        <FormItem className={props.className}>
            {props.label && (
                <FormLabel>
                    {props.label}
                    {props.requiered && <span className="ml-1 text-sky-600">*</span>}
                </FormLabel>
            )}
            <FormControl>
                <Select
                    value={props.field.value}
                    onChange={props.onChange || props.field.onChange}
                    fullWidth={props.fullWidth}
                    placeholder={props.placeholder}
                    options={props.options}
                    ghostSelect={props.ghostSelect}
                />
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            {!props.hideErrorMessage && <FormMessage />}
        </FormItem>
    );
};

export default FormSelect;
