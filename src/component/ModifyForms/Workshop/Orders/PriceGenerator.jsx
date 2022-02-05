import React, { useEffect, useState } from 'react';
import Tab from '../../../Tab';
import styled from 'styled-components';
import CreateButton from '../../../Button/CreateButton';
import theme from '../../../../theme';
import NumberInput from '../../../Form/NumberInput';
import useOrdersStore from '../../../../stores/order';
import { productPriceTypes } from '../../../../constants/product';
import TextInput from '../../../Form/Input';
import { addPersonalPayment, calculateProductPriceTotal } from '../../../../services/OrderService';
import PersonalPrices from './Prices/PersonalPrices';
import { PriceItem, PriceRow } from './styles';
import SessionPrices from './Prices/SessionPrices';

const TabHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const PriceArea = styled.div`
    padding: 20px;
    border-radius: 3px;
    border: solid 1px ${({ theme }) => theme.color.light};
`;

const tabs = [
    { key: 'personal', label: '인당' },
    { key: 'session', label: '회당' },
    { key: 'excursion', label: '출장비' },
    { key: 'delivery', label: '배송비' },
    { key: 'options', label: '옵션' },
    { key: 'discount', label: '할인' },
    { key: 'note', label: '정산비고' },
];

function PriceGenerator({ order, index, onChange, onValueChange }) {
    const formData = useOrdersStore((state) => state.formData);
    const [current, setCurrent] = useState('personal');

    const { product } = formData;
    const { product: productPrices = [] } = product.prices || {};
    const { personal, session, excursion, delivery, options, note, discount } = order.payment;

    const personalPrices = productPrices.filter((price) => price.type === productPriceTypes.PERSON.key);
    const sessionPrices = productPrices.filter((price) => price.type === productPriceTypes.SESSION.key);

    const handleCreateButtonClick = () => {
        if (current === 'personal') {
            const target =
                personalPrices.find(({ range }) => {
                    return order.participants >= range.from && order.participants <= range.to;
                }) || personalPrices[0];

            onValueChange(
                `orders.${index}.payment.personal`,
                addPersonalPayment({
                    exist: personal,
                    payment: target,
                    participants: order.participants,
                    fee: product.fee,
                }),
            );
        }

        if (current === 'session') {
            const target =
                sessionPrices.find(({ range }) => {
                    return order.participants >= range.from && order.participants <= range.to;
                }) || sessionPrices[0];

            onValueChange(
                `orders.${index}.payment.session`,
                addPersonalPayment({
                    exist: session,
                    payment: target,
                    fee: product.fee,
                }),
            );
        }
    };

    // const priceStatement = {
    //     price: { type: Number, required: true },
    //     fee: { type: Number, required: true },
    //     settlement: { type: Number, required: true },
    //     total: { type: Number, required: true },
    //     income: { type: Number, required: true },
    //     note: { type: String },
    //     name: { type: String },
    // };

    // useEffect(() => {
    //     const priceTotal = calculateProductPriceTotal(order.payment.personal.statements, order.participants);
    //     onValueChange(`orders.${index}.payment.personal.total`, priceTotal.total);
    //     onValueChange(`orders.${index}.payment.personal.totalIncome`, priceTotal.totalIncome);
    //     onValueChange(`orders.${index}.payment.personal.totalSettlement`, priceTotal.totalSettlement);
    // }, [order.payment.personal.statements]);
    //
    // useEffect(() => {
    //     const priceTotal = calculateProductPriceTotal(order.payment.session.statements);
    //     onValueChange(`orders.${index}.payment.session.total`, priceTotal.total);
    //     onValueChange(`orders.${index}.payment.session.totalIncome`, priceTotal.totalIncome);
    //     onValueChange(`orders.${index}.payment.session.totalSettlement`, priceTotal.totalSettlement);
    // }, [order.payment.session.statements]);

    return (
        <>
            <TabHeader>
                <Tab tabs={tabs} active={current} onChange={setCurrent} />
                <CreateButton onClick={handleCreateButtonClick} color={theme.color.light} />
            </TabHeader>
            <PriceArea>
                {/* 인당 가격 */}
                <PersonalPrices
                    name={`orders.${index}.payment.personal`}
                    personalPrices={personal}
                    participants={order.participants}
                    onValueChange={onValueChange}
                    onChange={onChange}
                />

                {/* 회당 가격 */}
                <SessionPrices
                    name={`orders.${index}.payment.session`}
                    sessionPrices={session}
                    participants={order.participants}
                    onValueChange={onValueChange}
                    onChange={onChange}
                />
            </PriceArea>
        </>
    );
}

export default PriceGenerator;
