'use client';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils/cn';

import Button from '../button/Button';
import { Calendar } from '../calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';

export function DatePicker({ action }: { action?: (date: Date | undefined) => void }) {
    const [date, setDate] = React.useState<Date>();

    useEffect(() => {
        if (action) {
            action(date);
        }
    }, [date, action]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn('h-10 justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'd-L-y') : <span>Add Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
}

export default DatePicker;
