import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { uniqueId } from 'lodash-es';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../../../constants/date';
import { productDeliveryTypes, productTypes } from '../../../../../constants/product';
import { viewKorean } from '../../../../../utils/price';

Font.register({
    family: 'malgun',
    fonts: [{ src: '/fonts/malgun.ttf' }, { src: '/fonts/malgunbd.ttf', fontWeight: 'bold' }],
});

const EstimateDocuments = ({ workshop }) => {
    const { clientName, companyName, clientMobile, orders } = workshop;
    const isOnline = !!orders.find((order) => order.productType === productTypes.ONLINE.key);
    const total = orders.reduce((acc, order) => {
        return acc + order.payment.summary.total;
    }, 0);
    const totalKr = viewKorean(total.toString()) + '정';

    return (
        <Document title={'sample'}>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.pageHead}>
                        <View style={styles.pageTitle}>
                            <Image style={styles.logo} src={'/images/logo.png'} />
                            <Text>워크샵 견적서</Text>
                        </View>

                        <View>
                            <View style={styles.clientRow}>
                                <View style={styles.clientCol}>
                                    <Text>상호명</Text>
                                </View>
                                <View>
                                    <Text>위버</Text>
                                </View>
                            </View>
                            <View style={styles.clientRow}>
                                <View style={styles.clientCol}>
                                    <Text>대표자</Text>
                                </View>
                                <View>
                                    <Text>이수아</Text>
                                </View>
                            </View>
                            <View style={styles.clientRow}>
                                <View style={styles.clientCol}>
                                    <Text>사업자번호</Text>
                                </View>
                                <View>
                                    <Text>{'567-87-00445'}</Text>
                                </View>
                            </View>
                            <View style={styles.clientRow}>
                                <View style={styles.clientCol}>
                                    <Text>주소</Text>
                                </View>
                                <View>
                                    <Text>{'서울시 마포구 양화로 15길12,401'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.subTitle}>
                        <Text>고객정보</Text>
                    </View>
                    <View style={styles.clientRow}>
                        <View style={styles.clientCol}>
                            <Text>회사명</Text>
                        </View>
                        <View>
                            <Text>{companyName}</Text>
                        </View>
                    </View>
                    <View style={styles.clientRow}>
                        <View style={styles.clientCol}>
                            <Text>이름</Text>
                        </View>
                        <View>
                            <Text>{clientName}</Text>
                        </View>
                    </View>
                    <View style={styles.clientRow}>
                        <View style={styles.clientCol}>
                            <Text>연락처</Text>
                        </View>
                        <View>
                            <Text>{clientMobile}</Text>
                        </View>
                    </View>
                    <View style={styles.subTitle}>
                        <Text>견적내용</Text>
                    </View>
                    <View style={styles.bold}>
                        <Text>{`총 금액: ${total.toLocaleString()}원 (${totalKr})`}</Text>
                    </View>
                    <View style={styles.orderTable}>
                        <View style={styles.orderTableHead}>
                            <View style={styles.orderTableCol1}>
                                <Text>항목</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>구분</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>수량</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>단위</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>단가</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>판매가</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>비고</Text>
                            </View>
                        </View>
                        {orders.map((order) => {
                            const hasDiscount = !!order.payment.discount.amount;

                            return (
                                <View key={order._id} style={styles.orderTableRow}>
                                    <View style={styles.orderTableCol1}>
                                        <View>
                                            <Text>{order.productName}</Text>
                                        </View>
                                        <View>
                                            <Text>{dayjs(order.reservationDate).format(COMMON_FORMAT)}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {order.payment.personal.statements.map((statement, i) => {
                                            return (
                                                <View key={i} style={styles.orderTableRow2}>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>프로그램(인당)</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{order.participants.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>인</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.price.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.total.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.note || '-'}</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                        {order.payment.session.statements.map((statement, i) => {
                                            return (
                                                <View key={i} style={styles.orderTableRow2}>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>프로그램(회당)</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{'1'}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>인</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.price.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.total.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.note || '-'}</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}

                                        {order.payment.excursion.statements.map((statement, i) => {
                                            return (
                                                <View key={i} style={styles.orderTableRow2}>
                                                    <View style={styles.orderTableCol1}>
                                                        <View>
                                                            <Text>출장비</Text>
                                                        </View>
                                                        <View>
                                                            <Text>({statement.region})</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{'1'}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>회</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.price.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.total.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.note || '-'}</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                        {order.payment.delivery.statements.map((statement, i) => {
                                            return (
                                                <View key={i} style={styles.orderTableRow2}>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{productDeliveryTypes[statement.name].label}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.unit}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.unitLabel}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.price.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.total.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.note || '-'}</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                        {order.payment.options.statements.map((statement, i) => {
                                            return (
                                                <View key={i} style={styles.orderTableRow2}>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.name}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.unit}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.unitLabel}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.price.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.total.toLocaleString()}</Text>
                                                    </View>
                                                    <View style={styles.orderTableCol1}>
                                                        <Text>{statement.note || '-'}</Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                        {hasDiscount && (
                                            <View style={styles.orderTableRow2}>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>할인</Text>
                                                </View>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>{'1'}</Text>
                                                </View>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>건</Text>
                                                </View>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>{'-'}</Text>
                                                </View>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>{order.payment.discount.amount.toLocaleString()}</Text>
                                                </View>
                                                <View style={styles.orderTableCol1}>
                                                    <Text>{order.payment.discount.note || '-'}</Text>
                                                </View>
                                            </View>
                                        )}
                                        <View style={styles.orderTableRow3}>
                                            <View style={styles.orderTableCol1} />
                                            <View style={styles.orderTableCol1} />
                                            <View style={styles.orderTableCol1}>
                                                <Text>소계</Text>
                                            </View>
                                            <View style={styles.orderTableCol1} />
                                            <View style={styles.orderTableCol1}>
                                                <Text>{order.payment.summary.total.toLocaleString()}</Text>
                                            </View>
                                            <View style={styles.orderTableCol1} />
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                            fontSize: 9,
                        }}
                    >
                        <View>
                            <View style={styles.clientRow}>
                                <View style={styles.totalCol}>
                                    <Text>공급가액</Text>
                                </View>
                                <View>
                                    <Text>{Math.round(total / 1.1).toLocaleString() + '원'}</Text>
                                </View>
                            </View>
                            <View style={styles.clientRow}>
                                <View style={styles.totalCol}>
                                    <Text>부가세</Text>
                                </View>
                                <View>
                                    <Text>{(total - Math.round(total / 1.1)).toLocaleString() + '원'}</Text>
                                </View>
                            </View>
                            <View style={{ ...styles.clientRow, fontWeight: 'bold' }}>
                                <View style={styles.totalCol}>
                                    <Text>합계</Text>
                                </View>
                                <View>
                                    <Text>{total.toLocaleString() + '원'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.subTitle}>
                        <Text>사전준비사항</Text>
                    </View>
                    <View>
                        <Text>* 총금액은 부가세가 포함되어 있습니다.</Text>
                    </View>
                    <View>
                        <Text>* 지역에 따라 출장비가 추가될 수 있습니다.</Text>
                    </View>
                    <View>
                        <Text>* 인원 증/감에 따라 금액은 변경될 수 있습니다.</Text>
                    </View>

                    <View style={styles.footer}>
                        <View>
                            <View style={styles.info}>
                                <Text>위와 같이 견적합니다.</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'relative' }}>
                            <View>
                                <Text>{dayjs().format(COMMON_FORMAT)}</Text>
                            </View>
                            <View style={{ ...styles.image, position: 'absolute', top: -20, right: -30 }}>
                                <Image src={'/images/stamp.png'} />
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default EstimateDocuments;

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'malgun',
        fontSize: 7,
    },
    bold: {
        fontWeight: 'bold',
    },
    logo: {
        width: 30,
        height: 30,
    },
    image: {
        width: 50,
        height: 50,
    },
    container: {
        padding: 30,
        width: '100%',
    },
    online: {
        flexDirection: 'row',
    },
    section: {
        flexDirection: 'row',
    },
    halfSection: {
        flexBasis: '50%',
    },
    info: {
        marginBottom: 3,
    },
    pageHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    pageTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    clientInfo: {
        width: 200,
    },
    subTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        fontSize: 9,
    },
    clientRow: {
        flexDirection: 'row',
    },
    clientCol: {
        flexBasis: 70,
    },
    totalCol: {
        flexBasis: 50,
    },
    orderTable: {
        width: '100%',
    },
    orderTableHead: {
        flexDirection: 'row',
        textAlign: 'center',
        borderBottom: '1px solid gray',
    },
    orderTableRow: {
        flexDirection: 'row',
        textAlign: 'center',
        borderBottom: '1px solid gray',
        alignItems: 'center',
    },
    orderTableRow2: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    orderTableRow3: {
        flexDirection: 'row',
        textAlign: 'center',
        borderTop: '1px solid gray',
        alignItems: 'center',
    },
    orderTableCol1: {
        padding: 5,
        flexBasis: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderTableCol2: {
        padding: 5,
        flexBasis: 300,
        textAlign: 'left',
    },
    orderTableCol3: {
        padding: 5,
        flexBasis: 200,
        textAlign: 'left',
    },
    leftAlign: {
        textAlign: 'left',
    },
    square: {
        border: '2px solid black',
        width: 10,
        height: 10,
    },
    footer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});
