import NumberInput from '../../../../Form/NumberInput';
import TextInput from '../../../../Form/Input';
import { PriceItem, PriceRow } from '../styles';
import DraggableFields from '../../../../Form/SortableFields';
import SortableItem from '../../../../Form/SortableFields/SortableItem';
import { calculateProductPriceTotal, calculateProductSettlementPrice } from '../../../../../services/OrderService';
import { Tooltip, Typography } from 'antd';
import produce from 'immer';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

function PersonalPrices({ personalPrices, name, onChange, onValueChange, participants }) {
    const { statements } = personalPrices;

    const updateTotal = (newStatement, index) => {
        const nextPrices = produce(personalPrices, (next) => {
            next.statements[index] = newStatement;

            const priceTotal = calculateProductPriceTotal(next.statements, participants);

            next.total = priceTotal.total;
            next.totalIncome = priceTotal.totalIncome;
            next.totalSettlement = priceTotal.totalSettlement;
        });

        onValueChange(`${name}`, nextPrices);
    };

    useEffect(() => {
        const nextPrices = produce(personalPrices, (next) => {
            const priceTotal = calculateProductPriceTotal(next.statements, participants);

            next.total = priceTotal.total;
            next.totalIncome = priceTotal.totalIncome;
            next.totalSettlement = priceTotal.totalSettlement;
            next.statements.forEach((statement) => {
                const sales = statement.price * participants;
                statement.income = sales * statement.fee;
                statement.settlement = sales - statement.income;
            });
        });

        onValueChange(`${name}`, nextPrices);
    }, [participants]);

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
            <Typography.Title level={5}>인당</Typography.Title>
            {statements.map((statement, i) => {
                const fee = Number((statement.income / (statement.price * participants)).toFixed(4));
                return (
                    <SortableItem
                        key={i}
                        id={i.toString()}
                        onRemove={() => {
                            onValueChange(
                                `${name}.statements`,
                                statements.filter((_, index) => i !== index),
                            );
                        }}
                    >
                        <PriceRow key={i}>
                            <PriceItem>
                                <NumberInput
                                    suffix="원"
                                    label="인당단가"
                                    name={`${name}.statements.${i}.price`}
                                    value={statement.price.toLocaleString()}
                                    onChange={(_, price) => {
                                        const income = Math.round(price * participants * statement.fee);
                                        const newStatement = {
                                            ...statement,
                                            price,
                                            income,
                                            settlement: calculateProductSettlementPrice({
                                                price,
                                                count: participants,
                                                income: income,
                                            }),
                                        };
                                        updateTotal(newStatement, i);
                                    }}
                                />
                            </PriceItem>
                            <PriceItem>
                                <NumberInput
                                    disabled
                                    suffix="원"
                                    label={`판매액(${statement.price.toLocaleString()}원 X ${participants}명)`}
                                    name={`${name}.statements.${i}.price`}
                                    value={(statement.price * participants).toLocaleString()}
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
                                        <Tooltip title={`${(fee * 100).toLocaleString()}%`}>
                                            <span>수수료</span>
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    }
                                    name={`${name}.statements.${i}.income`}
                                    value={statement.income.toLocaleString()}
                                    onChange={(name, income) => {
                                        const fee = Number((income / (statement.price * participants)).toFixed(4));
                                        const newStatement = {
                                            ...statement,
                                            income,
                                            fee,
                                            settlement: calculateProductSettlementPrice({
                                                price: statement.price,
                                                count: participants,
                                                income: income,
                                            }),
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

export default PersonalPrices;
