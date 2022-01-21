import React from 'react';
import Input from './Input';

function NumberInput({ suffix, prefix, onChange, name, ...props }) {
    return (
        <Input
            name={name}
            suffix={suffix}
            prefix={prefix}
            onChange={(e) => {
                const value = Number(e.target.value.replace(/\D/g, ''));

                if (isNaN(value)) {
                    return;
                }
                console.log(name);
                onChange(name, value);
            }}
            {...props}
        />
    );
}

export default NumberInput;
