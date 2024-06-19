import CurrencyInput from 'react-currency-input-field';

interface NumberInputProps {
    id: string;
    decimals?: number;
    placeholder: string;
    onChange: () => void;
    suffix?: '€' | '%';
    prefix?: '£' | '$';
}

const NumberInput = (props: NumberInputProps) => {
    return (
        <CurrencyInput
            id={props.id}
            name="input-name"
            placeholder={props.placeholder}
            defaultValue={0}
            // decimalsLimit={1}
            prefix={props.prefix}
            suffix={props.suffix}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onValueChange={props.onChange}
        />
    );
};

export default NumberInput;
