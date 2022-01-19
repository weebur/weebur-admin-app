import React from 'react';
import Input from './Input';

function NumberInput({ suffix, prefix, ...props }) {
    return (
        <Input
            placeholder="Enter your username"
            suffix={suffix}
            prefix={prefix}
            {...props}
        />
    );
}

export default NumberInput;
