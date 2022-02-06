import NumberInput from '../../../../Form/NumberInput';
import TextInput from '../../../../Form/Input';
import { PriceRow } from '../styles';
import DraggableFields from '../../../../Form/SortableFields';
import SortableItem from '../../../../Form/SortableFields/SortableItem';
import { calculateOptionStatement, getNextStatements } from '../../../../../services/OrderService';
import { Typography } from 'antd';
import SelectBox from '../../../../Form/SelectBox';
import { useState } from 'react';
import { optionFeeTypes } from '../../../../../constants/order';

function OptionPrices({ optionPrices, productOptions, name, onChange, onValueChange }) {
    const productOptionNames = productOptions.map((option) => ({
        key: option.name,
        value: option.name,
        label: option.name,
    }));
    const [optionNames, setOptionNames] = useState(productOptionNames);

    const { statements } = optionPrices;

    const updateTotal = (newStatement, index) => {
        const nextStatements = getNextStatements(optionPrices, newStatement, index);
        onValueChange(`${name}`, nextStatements);
    };

    if (statements.length === 0) {
        return null;
    }

    return (
        <DraggableFields
            id={'product-price'}
            ids={statements?.map((_, i) => i.toString())}
            onChange={(v) => {
                onValueChange(
                    `${name}.statements`,
                    v.map((index) => statements[index]),
                );
            }}
        >
            <Typography.Title level={5}>옵션</Typography.Title>
            {statements.map((statement, i) => {
                return (
                    <SortableItem
                        key={i}
                        id={i.toString()}
                        onRemove={() => {
                            onValueChange(
                                `${name}.statements`,
                                statements.filter((_, index) => i !== index),
                            );
                            updateTotal(null, i);
                        }}
                    >
                        <PriceRow key={i}>
                            <SelectBox
                                allowClear
                                showSearch
                                label="옵션명"
                                name={`${name}.statements.${i}.name`}
                                options={optionNames}
                                value={statement.name}
                                onChange={(_, name) => {
                                    const { price = 0 } =
                                        productOptions.find((excursion) => excursion.name === name) || {};

                                    const newStatement = calculateOptionStatement({
                                        ...statement,
                                        price,
                                    });
                                    updateTotal(newStatement, i);
                                }}
                                onSearch={(v) => {
                                    if (!v) {
                                        setOptionNames(productOptionNames);
                                        return;
                                    }
                                    setOptionNames([{ key: v, label: v }]);
                                }}
                            />
                            <NumberInput
                                suffix="원"
                                label="단가"
                                name={`${name}.statements.${i}.price`}
                                value={statement.price.toLocaleString()}
                                onChange={(_, price) => {
                                    const newStatement = calculateOptionStatement({
                                        ...statement,
                                        price,
                                    });
                                    updateTotal(newStatement, i);
                                }}
                            />
                            <NumberInput
                                label="수량"
                                name={`${name}.statements.${i}.unit`}
                                value={statement.unit.toLocaleString()}
                                onChange={(_, unit) => {
                                    const newStatement = calculateOptionStatement({
                                        ...statement,
                                        unit,
                                    });
                                    updateTotal(newStatement, i);
                                }}
                            />
                            <TextInput
                                label="단위"
                                name={`${name}.statements.${i}.unitLabel`}
                                value={statement.unitLabel}
                                onChange={onChange}
                            />
                            <NumberInput
                                disabled
                                label="판매가"
                                name={`${name}.statements.${i}.total`}
                                value={statement.total.toLocaleString()}
                            />
                            <NumberInput
                                suffix={statement.feeType === optionFeeTypes.PERCENTAGE.key ? '%' : '원'}
                                label="수수료"
                                name={`${name}.statements.${i}.fee`}
                                value={(statement.feeType === optionFeeTypes.PERCENTAGE.key
                                    ? statement.fee * 100
                                    : statement.fee
                                ).toLocaleString()}
                                onChange={(_, fee) => {
                                    const newStatement = calculateOptionStatement({
                                        ...statement,
                                        fee: fee / 100,
                                    });
                                    updateTotal(newStatement, i);
                                }}
                            />
                            <SelectBox
                                label="수수료타입"
                                name={`${name}.statements.${i}.feeType`}
                                options={Object.values(optionFeeTypes)}
                                value={statement.feeType}
                                onChange={(_, feeType) => {
                                    const newStatement = calculateOptionStatement({
                                        ...statement,
                                        feeType,
                                    });
                                    updateTotal(newStatement, i);
                                }}
                            />
                            <NumberInput
                                disabled
                                suffix="원"
                                label="총 수수료"
                                name={`${name}.statements.${i}.income`}
                                value={statement.income.toLocaleString()}
                            />
                            <NumberInput
                                disabled
                                suffix="원"
                                label="정산액"
                                name={`${name}.statements.${i}.settlement`}
                                value={statement.settlement.toLocaleString()}
                                onChange={onValueChange}
                            />
                            <TextInput
                                label="비고"
                                name={`${name}.statements.${i}.note`}
                                value={statement.note}
                                onChange={onChange}
                            />
                        </PriceRow>
                    </SortableItem>
                );
            })}
        </DraggableFields>
    );
}

export default OptionPrices;
