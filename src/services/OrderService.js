import produce from 'immer';
import { optionFeeTypes, reservationStatus } from '../constants/order';
import { supplierTypes } from '../constants/supplier';

export const getTotalPayment = (payment, supplierType) => {
    const { personal, session, excursion, delivery, options, discount } = payment;

    const {
        total: personalTotal = 0,
        totalIncome: personalTotalIncome = 0,
        totalSettlement: personalTotalSettlement = 0,
    } = personal;

    const {
        total: sessionTotal = 0,
        totalIncome: sessionTotalIncome = 0,
        totalSettlement: sessionTotalSettlement = 0,
    } = session;

    const {
        total: excursionTotal = 0,
        totalIncome: excursionTotalIncome = 0,
        totalSettlement: excursionTotalSettlement = 0,
    } = excursion;

    const {
        total: deliveryTotal = 0,
        totalIncome: deliveryTotalIncome = 0,
        totalSettlement: deliveryTotalSettlement = 0,
    } = delivery;

    const {
        total: optionsTotal = 0,
        totalIncome: optionsTotalIncome = 0,
        totalSettlement: optionsTotalSettlement = 0,
    } = options;

    const { amount: discountTotal = 0, discountedBySupplier = 0 } = discount;

    const total = personalTotal + sessionTotal + excursionTotal + deliveryTotal + optionsTotal - discountTotal;
    const totalIncome =
        personalTotalIncome +
        sessionTotalIncome +
        excursionTotalIncome +
        deliveryTotalIncome +
        optionsTotalIncome -
        discountTotal +
        discountedBySupplier;
    const totalSettlement =
        personalTotalSettlement +
        sessionTotalSettlement +
        excursionTotalSettlement +
        deliveryTotalSettlement +
        optionsTotalSettlement -
        discountedBySupplier;

    let finalSettlement = totalSettlement;
    let vat = 0;
    let tax = 0;

    if (supplierType === supplierTypes.TEMPORARY.key) {
        finalSettlement = Math.round(totalSettlement / 1.1);
        vat = totalSettlement - finalSettlement;
    }
    if (supplierType === supplierTypes.FREELANCER.key) {
        const settlement = Math.round(totalSettlement / 1.1);
        vat = totalSettlement - settlement;
        tax = Math.round(settlement * 0.033);
        finalSettlement = totalSettlement - vat - tax;
    }

    return {
        total,
        totalIncome,
        totalSettlement,
        vat,
        tax,
        finalSettlement,
    };
};

export const addPersonalPayment = ({ exist, payment, participants = 1, fee = 0 }) => {
    const initialPrice = payment?.price || 0;
    const sales = participants * initialPrice;
    const initialIncome = Math.round(sales * fee);
    const settlement = sales - initialIncome;

    const newStatement = {
        price: initialPrice,
        income: initialIncome,
        settlement,
        total: sales,
        fee,
        note: payment?.note || '',
    };

    return {
        total: exist.total + sales,
        totalIncome: exist.totalIncome + initialIncome,
        totalSettlement: exist.totalSettlement + settlement,
        statements: [...exist.statements, newStatement],
    };
};

export const calculateProductPriceTotal = (statements) => {
    return statements.reduce(
        (acc, statement) => {
            const { income, settlement, total } = statement;

            acc.total += total;
            acc.totalIncome += income;
            acc.totalSettlement += settlement;

            return acc;
        },
        {
            total: 0,
            totalIncome: 0,
            totalSettlement: 0,
        },
    );
};

export const getNextStatements = (prices, newStatement, index) => {
    return produce(prices, (next) => {
        if (!newStatement) {
            next.statements.splice(index, 1);
        } else {
            next.statements[index] = newStatement;
        }

        const priceTotal = calculateProductPriceTotal(next.statements);

        next.total = priceTotal.total;
        next.totalIncome = priceTotal.totalIncome;
        next.totalSettlement = priceTotal.totalSettlement;
    });
};

export const calculateOptionStatement = (statement) => {
    const price = statement.price;
    const unit = statement.unit;
    const total = price * unit;
    const fee = statement.fee;
    const feeType = statement.feeType;
    const income = feeType === optionFeeTypes.PERCENTAGE.key ? Math.round(total * fee) : fee * unit;
    const settlement = total - income;

    return {
        ...statement,
        price,
        fee,
        feeType,
        unit,
        income,
        settlement,
        total,
    };
};

export const getTotalsByOrders = (orders) => {
    return orders.reduce((acc, order) => {
        if (order.reservationStatus === reservationStatus.CANCEL_RESERVATION.key) {
            return acc;
        }
        return order.payment.summary.total + acc;
    }, 0);
};
