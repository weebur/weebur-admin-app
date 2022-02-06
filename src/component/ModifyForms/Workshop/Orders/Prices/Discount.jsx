import React from 'react';
import { PriceItem, PriceRow, PriceSection } from '../styles';
import NumberInput from '../../../../Form/NumberInput';
import TextInput from '../../../../Form/Input';
import { Typography } from 'antd';

function Discount({ discount, name, onChange, onValueChange }) {
    return (
        <PriceSection>
            <Typography.Title level={5}>할인</Typography.Title>
            <PriceRow noHandler>
                <PriceItem>
                    <NumberInput
                        suffix="원"
                        label="할인금액"
                        name={`${name}.amount`}
                        value={discount.amount.toLocaleString()}
                        onChange={onValueChange}
                    />
                </PriceItem>
                <PriceItem />
                <PriceItem>
                    <TextInput label="비고" name={`${name}.note`} value={discount.note} onChange={onChange} />
                </PriceItem>
                <PriceItem>
                    <TextInput
                        label="업체할인비고"
                        name={`${name}.discountedItemsBySupplier`}
                        value={discount.discountedItemsBySupplier}
                        onChange={onChange}
                    />
                </PriceItem>
                <PriceItem>
                    <NumberInput
                        suffix="원"
                        label="업체할인금액"
                        name={`${name}.discountedBySupplier`}
                        value={discount.discountedBySupplier.toLocaleString()}
                        onChange={onValueChange}
                    />
                </PriceItem>
            </PriceRow>
        </PriceSection>
    );
}

export default Discount;
