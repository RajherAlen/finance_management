import React from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';

import Button from '../button/Button';
import { Calendar } from '../calendar/Calendar';
import { Dropdown } from '../dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { FormControl, FormItem, FormMessage } from './form';

interface FormSelectProps {
    field: any;
    disableBefore?: boolean;
    disableAfter?: boolean;
    wrapperClassName?: string
}

const FormDatePicker = (props: FormSelectProps) => {
    const { field, disableBefore, disableAfter, wrapperClassName } = props;

    return (
        <FormItem>
            <Dropdown
                size="default"
                variant="outline"
                className={cn('h-10 w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground', wrapperClassName)}
                trigger={
                    <FormControl>
                        <>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? new Date(field.value).toLocaleDateString() : <span className="text-xs">Add Date</span>}
                        </>
                    </FormControl>
                }
            >
                <Calendar
                    mode="single"
                    onSelect={field.onChange}
                    selected={field.value ? new Date(field.value) : field.value}
                    defaultMonth={field.value ? new Date(field.value) : field.value}
                    disabled={(date: any) => (disableBefore ? date < new Date() : disableAfter ? date > new Date() : false)}
                    initialFocus
                />
            </Dropdown>

            <FormMessage />
        </FormItem>
    );
};

export default FormDatePicker;
