import NumberInput from '../../../../Form/NumberInput';
import TextInput from '../../../../Form/Input';
import { PriceItem, PriceRow } from '../styles';
import DraggableFields from '../../../../Form/SortableFields';
import SortableItem from '../../../../Form/SortableFields/SortableItem';
import { getNextStatements } from '../../../../../services/OrderService';
import { Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import SelectBox from '../../../../Form/SelectBox';
import { excursionRegions } from '../../../../../constants/order';
import { useState } from 'react';

const initialRegionOptions = excursionRegions.map((excursion) => ({
    key: excursion.region,
    value: excursion.region,
    label: excursion.region,
}));

function ExcursionPrices({ excursionPrices, name, onChange, onValueChange }) {
    const { statements } = excursionPrices;

    const [excursionRegionOptions, setExcursionRegionOptions] = useState(initialRegionOptions);

    const updateTotal = (newStatement, index) => {
        const nextStatements = getNextStatements(excursionPrices, newStatement, index);
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
            <Typography.Title level={5}>출장비</Typography.Title>
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
                            <PriceItem>
                                <SelectBox
                                    showSearch
                                    label="출장지역"
                                    name={`${name}.statements.${i}.region`}
                                    options={excursionRegionOptions}
                                    value={statement.region}
                                    onChange={(name, region) => {
                                        const { price } = excursionRegions.find(
                                            (excursion) => excursion.region === region,
                                        );

                                        const income = Math.round(price * statement.fee);

                                        const newStatement = {
                                            ...statement,
                                            price,
                                            income,
                                            settlement: price - income,
                                            total: price,
                                            region,
                                        };
                                        updateTotal(newStatement, i);
                                    }}
                                    onSearch={(v) => {
                                        if (!v) {
                                            setExcursionRegionOptions(initialRegionOptions);
                                            return;
                                        }
                                        setExcursionRegionOptions([{ key: v, label: v }]);
                                    }}
                                />
                            </PriceItem>
                            <PriceItem>
                                <NumberInput
                                    suffix="원"
                                    label="출장비"
                                    name={`${name}.statements.${i}.price`}
                                    value={statement.price.toLocaleString()}
                                    onChange={(_, price) => {
                                        const total = price;
                                        const income = Math.round(total * statement.fee);

                                        const newStatement = {
                                            ...statement,
                                            price,
                                            income,
                                            settlement: total - income,
                                            total,
                                        };
                                        updateTotal(newStatement, i);
                                    }}
                                />
                            </PriceItem>
                            <PriceItem>
                                <TextInput
                                    label="비고"
                                    name={`${name}.statements.${i}.note`}
                                    value={statement.note}
                                    onChange={onChange}
                                />
                            </PriceItem>
                            <PriceItem>
                                <NumberInput
                                    suffix="원"
                                    label={
                                        <Tooltip title={`${(statement.fee * 100).toLocaleString()}%`}>
                                            <span>수수료</span>
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                    name={`${name}.statements.${i}.income`}
                                    value={statement.income.toLocaleString()}
                                    onChange={(name, income) => {
                                        const total = statement.price;
                                        const fee = Number((income / total).toFixed(4));

                                        const newStatement = {
                                            ...statement,
                                            income,
                                            total,
                                            fee,
                                            settlement: total - income,
                                        };
                                        updateTotal(newStatement, i);
                                    }}
                                />
                            </PriceItem>
                            <PriceItem>
                                <NumberInput
                                    disabled
                                    suffix="원"
                                    label="정산액"
                                    name={`${name}.statements.${i}.settlement`}
                                    value={statement.settlement.toLocaleString()}
                                    onChange={onValueChange}
                                />
                            </PriceItem>
                        </PriceRow>
                    </SortableItem>
                );
            })}
        </DraggableFields>
    );
}

export default ExcursionPrices;
