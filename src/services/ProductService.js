import dayjs from 'dayjs';
import { reservationStatus } from '../constants/order';
import { productTypes } from '../constants/product';

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

    getSummaryForTeacher = (workshop, orderId) => {
        const order = workshop.orders.find((order) => order._id === orderId);

        return `[위버] 워크샵 정보 
매니저: ${workshop.adminName}

1. 문의상태
${dayjs(workshop.createdAt).format('YY-MM-DD HH:ss')} [${reservationStatus[order.reservationStatus].label}]

2. 회원정보 
${workshop.companyName} / ${workshop.clientName}
${workshop.clientMobile} / ${workshop.clientEmail}

3. 예약정보 
${order.productName} (${order.supplierName}) 
진행일시: ${dayjs(order.reservationDate).format('YY-MM-DD, HH:ss')}
인원: ${order.participants}명 

4. 워크샵정보
${workshop.subject ? `목적: ${workshop.subject}` : ''} 
${workshop.participantsInfo ? `참여자: ${workshop.participantsInfo}` : ''}
${workshop.place ? `장소: ${workshop.place}` : ''} 

5. 요청사항 
${workshop.requirements}

6. 정산정보 
${order.payment.summary.finalSettlement}원 

${
    order.productType === productTypes.ONLINE.key
        ? `
7. 화상회의 
${order.onlineInfo.details}

8. 배송정보
 ${order.onlineInfo.fileUrl}
`
        : ''
}`;
    };
}

export default new ProductService();
