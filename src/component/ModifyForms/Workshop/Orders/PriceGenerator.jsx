import React, { useState } from 'react';
import Tab from '../../../Tab';
import styled from 'styled-components';
import CreateButton from '../../../Button/CreateButton';
import theme from '../../../../theme';
import useOrdersStore from '../../../../stores/order';
import { productDeliveryTypes, productPriceTypes } from '../../../../constants/product';
import { addPersonalPayment } from '../../../../services/OrderService';
import PersonalPrices from './Prices/PersonalPrices';
import SessionPrices from './Prices/SessionPrices';
import { DELIVERY_FEE, EXCURSION_FEE, excursionRegions, OPTION_FEE, optionFeeTypes } from '../../../../constants/order';
import ExcursionPrices from './Prices/ExcursionPrices';
import OptionPrices from './Prices/OptionPrices';
import DeliveryPrices from './Prices/DeliveryPrices';
import Discount from './Prices/Discount';
import PricesDetails from './Prices/PricesDetails';

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
    margin-bottom: 20px;
`;

const tabs = [
    { key: 'personal', label: '인당' },
    { key: 'session', label: '회당' },
    { key: 'excursion', label: '출장비' },
    { key: 'delivery', label: '배송비' },
    { key: 'options', label: '옵션' },
];

function PriceGenerator({ order, index, onChange, onValueChange }) {
    const formData = useOrdersStore((state) => state.formData);
    const [current, setCurrent] = useState('personal');

    const { product } = formData;
    const { product: productPrices = [], delivery: productDelivery, option: productOptions } = product.prices || {};
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

        if (current === 'excursion') {
            const target = excursionRegions[0];
            const price = target.price;
            const income = Math.round(price * EXCURSION_FEE);

            onValueChange(`orders.${index}.payment.excursion`, {
                total: order.payment.excursion.total + price,
                totalIncome: order.payment.excursion.total + price,
                totalSettlement: order.payment.excursion.total + price,
                statements: [
                    ...order.payment.excursion.statements,
                    {
                        price: price,
                        fee: EXCURSION_FEE,
                        income,
                        settlement: price - income,
                        total: price,
                        region: target.region,
                        note: '',
                    },
                ],
            });
        }

        if (current === 'delivery') {
            const target = productDelivery[0];
            const price = target?.price || 0;
            const total = price * order.participants;
            const type = target?.type || productDeliveryTypes.PERSONAL.key;
            const fee = DELIVERY_FEE[type];
            const income =
                type === productDeliveryTypes.COLLECTIVE.key ? Math.round(price * fee) : fee * order.participants;

            onValueChange(`orders.${index}.payment.delivery`, {
                total: order.payment.delivery.total + total,
                totalIncome: order.payment.delivery.totalIncome + income,
                totalSettlement: order.payment.delivery.totalSettlement + total - income,
                statements: [
                    ...order.payment.delivery.statements,
                    {
                        name: target?.type || '',
                        price,
                        fee,
                        feeType: optionFeeTypes.FIXED.key,
                        unit: order.participants,
                        unitLabel: '건',
                        income,
                        settlement: total - income,
                        total,
                        note: '',
                    },
                ],
            });
        }

        if (current === 'options') {
            const target = productOptions[0];
            const price = target?.price || 0;
            const total = price * order.participants;
            const income = Math.round(total * OPTION_FEE);

            onValueChange(`orders.${index}.payment.options`, {
                total: order.payment.options.total + total,
                totalIncome: order.payment.options.totalIncome + income,
                totalSettlement: order.payment.options.totalSettlement + total - income,
                statements: [
                    ...order.payment.options.statements,
                    {
                        name: target?.name || '',
                        price: price,
                        fee: OPTION_FEE,
                        feeType: optionFeeTypes.PERCENTAGE.key,
                        unit: order.participants,
                        unitLabel: '개',
                        income,
                        settlement: total - income,
                        total,
                        note: '',
                    },
                ],
            });
        }
    };

    return (
        <>
            <TabHeader>
                <Tab tabs={tabs} active={current} onChange={setCurrent} />
                <CreateButton onClick={handleCreateButtonClick} color={theme.color.light} />
            </TabHeader>
            <PriceArea>
                {/* 인당 가격 */}
                {personal && (
                    <PersonalPrices
                        name={`orders.${index}.payment.personal`}
                        personalPrices={personal}
                        participants={order.participants}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/* 회당 가격 */}
                {session && (
                    <SessionPrices
                        name={`orders.${index}.payment.session`}
                        sessionPrices={session}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/* 출장비 */}
                {excursion && (
                    <ExcursionPrices
                        name={`orders.${index}.payment.excursion`}
                        excursionPrices={excursion}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/* 배송비 */}
                {delivery && (
                    <DeliveryPrices
                        name={`orders.${index}.payment.delivery`}
                        productDelivery={productDelivery || []}
                        deliveryPrices={delivery}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/* 옵션 */}
                {options && (
                    <OptionPrices
                        name={`orders.${index}.payment.options`}
                        productOptions={productOptions || []}
                        participants={order.participants}
                        optionPrices={options}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/* 할인 */}
                {discount && (
                    <Discount
                        name={`orders.${index}.payment.discount`}
                        discount={discount}
                        onValueChange={onValueChange}
                        onChange={onChange}
                    />
                )}

                {/*정산비고*/}
                <PricesDetails name={`orders.${index}.payment.note`} note={note} onChange={onChange} />
            </PriceArea>
        </>
    );
}

export default PriceGenerator;
