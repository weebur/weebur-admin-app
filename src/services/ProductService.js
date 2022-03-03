class ProductService {
    getDefaultPriceSet = (type) => {
        switch (type) {
            case 'product':
                return {
                    type: 'PERSON',
                    range: {
                        from: 0,
                        to: 0,
                    },
                    price: 0,
                };
            case 'option':
                return {
                    name: '',
                    price: 0,
                };
            case 'delivery':
                return {
                    type: 'PERSONAL',
                    price: 0,
                };

            default:
                return {
                    type: 'PERSON',
                    range: {
                        from: 0,
                        to: 0,
                    },
                    prices: 0,
                };
        }
    };

    getSummaryForTeacher = (workshop, order) => {};
}

export default new ProductService();
