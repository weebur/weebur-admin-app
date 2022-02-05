export const getTotalPayment = (payment) => {
    const { personal, session, excursion, delivery, options, discount } = payment;

    const personalTotal = personal?.total || 0;
    const sessionTotal = session?.total || 0;
    const excursionTotal = excursion?.total || 0;
    const deliveryTotal = delivery?.total || 0;
    const optionsTotal = options?.total || 0;
    const discountTotal = discount?.total || 0;

    return personalTotal + sessionTotal + excursionTotal + deliveryTotal + optionsTotal - discountTotal;
};

export const addPersonalPayment = ({ exist, payment, participants = 1, fee }) => {
    const initialPrice = payment?.price || 0;
    const sales = participants * initialPrice;
    const initialIncome = Math.round(sales * fee);
    const settlement = sales - initialIncome;

    const newStatement = {
        price: initialPrice,
        income: initialIncome,
        settlement,
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

export const calculateProductPriceTotal = (statements, count = 1) => {
    return statements.reduce(
        (acc, statement) => {
            const { price, income, settlement } = statement;
            const total = price * count;

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

export const calculateProductSettlementPrice = ({ price, count = 1, income }) => {
    const sales = price * count;
    const settlement = sales - income;

    return settlement;
};
