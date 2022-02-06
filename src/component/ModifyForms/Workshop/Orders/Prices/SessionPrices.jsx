import NumberInput from '../../../../Form/NumberInput';
import TextInput from '../../../../Form/Input';
import { PriceItem, PriceRow } from '../styles';
import DraggableFields from '../../../../Form/SortableFields';
import SortableItem from '../../../../Form/SortableFields/SortableItem';
import { getNextStatements } from '../../../../../services/OrderService';
import { Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

function SessionPrices({ sessionPrices, name, onChange, onValueChange }) {
    const { statements } = sessionPrices;

    const updateTotal = (newStatement, index) => {
        const nextStatements = getNextStatements(sessionPrices, newStatement, index);

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
            <Typography.Title level={5}>회당</Typography.Title>
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
                                <NumberInput
                                    suffix="원"
                                    label="회당단가"
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
                            <PriceItem />
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

export default SessionPrices;
