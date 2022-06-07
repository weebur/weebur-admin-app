import dayjs from 'dayjs';
import { reservationStatus } from '../constants/order';
import { productTypes } from '../constants/product';
import { COMMON_FORMAT } from '../constants/date';

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
진행일시: ${dayjs(order.reservationDate).format('YY-MM-DD, HH:mm')}
인원: ${order.participants}명 

4. 워크샵정보
${workshop.subject ? `목적: ${workshop.subject}` : ''} 
${workshop.participantsInfo ? `참여자: ${workshop.participantsInfo}` : ''}
${workshop.place ? `장소: ${workshop.place}` : ''} 

5. 요청사항 
${workshop.requirements}

6. 정산정보 
${order.payment.summary.finalSettlement.toLocaleString()}원 

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

    getEmailTextByOrder = (workshop) => {
        const reservationDate = workshop.orders.reduce((date, order) => {
            if (dayjs(date).isBefore(dayjs(order.reservationDate))) {
                return date;
            } else {
                return order.reservationDate;
            }
        });
        const isOnline = workshop.orders.some((order) => order.productType === productTypes.ONLINE.key);

        return `안녕하세요, ${workshop.clientName} 담당자님 
워크샵 추천 플랫폼 위버 ${workshop.adminName}입니다. 

문의하신 일정으로 프로그램 [예약] 안내드립니다.
예약신청서에 체크 후 답변을 주셔야 일정 예약이 확정 됩니다. 
아래 내용 확인과 정보 요청 드립니다.

궁금하신 부분 언제나 편하게 연락주세요. 
감사합니다. :)

1. 예약 확정
첨부한 '예약신청서'에서 원하시는 예약 날짜와 시간에 체크해주세요. 
프린트 후 스캔 or PDF 온라인 서명 기능으로 첨부해주세요.
※ ${dayjs().add(7, 'day').format(COMMON_FORMAT)}까지(메일 발송일 기준 7일 후) 답변이 없으시면 자동 취소 됩니다. 

${
    isOnline
        ? `2. 인원 확정&배송 정보
진행 7일 전까지 
1) 최종 인원을 확정해주세요. 결제를 안내드립니다.
2) 배송정보를 강사님 메일로 보내주시면 택배 발송을 시작합니다.
※ 개별배송인 경우 첨부드린 양식을 사용해주세요.
※ 인원을 변경할 경우 홈페이지 기준 단가에 따라 비용은 변경될 수 있습니다.
※ 일정, 인원 등 모든 변경사항은 근무일 기준 진행 7일전까지 가능합니다.
※ Covid-19로 인한 취소 및 변경은 환불 규정과 동일하게 적용되는 점 양해부탁드립니다.
※ 환불규정:  https://bit.ly/3iZ1Px1
`
        : `2. 인원 확정
진행일(${dayjs(reservationDate).format(COMMON_FORMAT)}) 7일 전까지 최종 인원을 확정해 알려주세요.
※ 인원을 변경할 경우 홈페이지 기준 단가에 따라 비용은 변경될 수 있습니다.
※ 일정, 인원 등 모든 변경사항은 근무일 기준 진행 7일전까지 가능합니다.
※ Covid-19로 인한 취소 및 변경은 환불 규정과 동일하게 적용되는 점 양해부탁드립니다.
※ 환불규정:  https://bit.ly/3iZ1Px1
`
}

3. 결제방식
'예약신청서'의 계좌이체를 선택하신 경우 아래 정보를 보내주세요. 
사업자등록증, 이메일주소, 발행항목(특이사항이 있으신 경우)

${
    isOnline
        ? `4. 화상회의 링크 
진행 7일 전까지 강사님 메일로 보내주시면 준비를 시작합니다. 
※ 예약신청서에서 [개설 불가능]을 선택하신 경우 위버에서 개설해드립니다.
※ 위버에서 개설하는 경우 Zoom으로 제공합니다.
 
5. 워크샵 정보
아래 정보를 알려주시면 워크샵 준비에 큰 도움이 됩니다. 
-강의 목적:
-참여자 특징:
-진행시 주의사항/요청사항: 

6. 사전 준비사항
홈페이지 해당 프로그램의 페이지를 확인해주세요.
※ 강사님 정보는 예약 신청서를 보내주신 후 전달 드립니다.`
        : `4. 워크샵정보
아래 정보를 알려주시면 워크샵 준비에 큰 도움이 됩니다. 
-강의 목적:
-참여자 특징:
-진행시 주의사항/요청사항: 

5. 사전 준비사항
홈페이지 해당 프로그램의 페이지를 확인해주세요.`
}
`;
    };

    getPaymentEmail = ({ clientName, adminName }) => {
        return `안녕하세요. ${clientName} 담당자님 <br>
워크샵 추천 플랫폼 위버 ${adminName}입니다.<br>
<br>
결제하신 내용 확인 되었습니다.<br>
위버를 이용해주셔서 다시 한번 감사드립니다.<br> 
<br>
더 다양하고 좋은 프로그램을 소개하며 건강한 워크샵 문화를 만들어 가겠습니다.<br> 
감사합니다. :)<br>
<br>
위버의 경험을 나누어주세요!<br>  
<br>
<a href='https://weebur.com/board/product/list.html?utm_source=homepage&utm_medium=button&utm_campaign=category_3' target='_blank'>
    <u>→ 후기 작성하러 가기→</u>
</a><br>
<br>
<br>
많은 워크샵 담당자분들에게 도움이 될 수 있습니다.<br> 
(감사하며 스타벅스 아메리카노 쿠폰을 드립니다!)
`;
    };
}

export default new ProductService();
