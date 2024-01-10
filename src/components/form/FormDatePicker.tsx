import React from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';

import Button from '../button/Button';
import { Calendar } from '../calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { FormControl, FormItem, FormMessage } from './form';

interface FormSelectProps {
    field: any;
    disableBefore?: boolean
}

const FormDatePicker = (props: FormSelectProps) => {
    const { field, disableBefore } = props;

    return (
        <FormItem>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant={'outline'}
                            className={cn('h-12 justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, 'd-L-y') : <span>Add Date</span>}
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={() => disableBefore ? field.value < new Date() : false}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <FormMessage />
        </FormItem>
    );
};

export default FormDatePicker;
