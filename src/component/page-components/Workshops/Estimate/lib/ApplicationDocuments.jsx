import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { uniqueId } from 'lodash-es';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../../../constants/date';
import { productTypes } from '../../../../../constants/product';

Font.register({
    family: 'malgun',
    fonts: [{ src: '/fonts/malgun.ttf' }, { src: '/fonts/malgunbd.ttf', fontWeight: 'bold' }],
});

const ApplicationDocuments = ({ workshop }) => {
    const { clientName, companyName, clientMobile, orders } = workshop;
    const isOnline = !!orders.find((order) => order.productType === productTypes.ONLINE.key);

    return (
        <Document title={'sample'}>
            <Page style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.pageHead}>
                        <View style={styles.pageTitle}>
                            <Image style={styles.logo} src={'/images/logo.png'} />
                            <Text>워크샵 예약 신청서({isOnline ? '온' : '오프'})</Text>
                        </View>

                        <View>
                            <View style={styles.subTitle}>
                                <Text>예약자 정보</Text>
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
                        </View>
                    </View>

                    <View style={styles.subTitle}>
                        <Text>예약프로그램 & 일정</Text>
                    </View>
                    <View style={styles.orderTable}>
                        <View style={styles.orderTableHead}>
                            <View style={styles.orderTableCol1}>
                                <Text>날짜</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>시간</Text>
                            </View>
                            <View style={styles.orderTableCol2}>
                                <Text>프로그램명</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>예약여부</Text>
                            </View>
                        </View>
                        {orders.map((order) => {
                            return (
                                <View key={order.id || uniqueId()} style={styles.orderTableRow}>
                                    <View style={styles.orderTableCol1}>
                                        <Text>{dayjs(order.reservationDate).format(COMMON_FORMAT)}</Text>
                                    </View>
                                    <View style={styles.orderTableCol1}>
                                        <Text>{dayjs(order.reservationDate).format('HH:ss')}</Text>
                                    </View>
                                    <View style={styles.orderTableCol2}>
                                        <Text>{order.productName}</Text>
                                    </View>
                                    <View style={styles.orderTableCol1}>
                                        <View style={styles.square} />
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.subTitle}>
                        <Text>결제 방식</Text>
                    </View>
                    <View style={styles.orderTable}>
                        <View style={styles.orderTableHead}>
                            <View style={styles.orderTableCol3}>
                                <Text>종류</Text>
                            </View>
                            <View style={styles.orderTableCol2}>
                                <Text>결제일</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <Text>선택</Text>
                            </View>
                        </View>
                        <View style={styles.orderTableHead}>
                            <View style={styles.orderTableCol3}>
                                <Text>카드결제</Text>
                            </View>
                            <View style={styles.orderTableCol2}>
                                <Text>진행 7일 전까지 홈페이지 내 결제 필수</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <View style={styles.square} />
                            </View>
                        </View>
                        <View style={styles.orderTableHead}>
                            <View style={styles.orderTableCol3}>
                                <Text>계좌이체(세금계산서)</Text>
                            </View>
                            <View style={styles.orderTableCol2}>
                                <Text>진행 7일 전까지 세금계산서 발행 필수</Text>
                            </View>
                            <View style={styles.orderTableCol1}>
                                <View style={styles.square} />
                            </View>
                        </View>
                    </View>

                    {isOnline && (
                        <View style={styles.section}>
                            <View style={{ flexBasis: '70%' }}>
                                <View style={styles.subTitle}>
                                    <Text>화상회의 틀</Text>
                                </View>
                                <View style={styles.orderTable}>
                                    <View style={styles.orderTableHead}>
                                        <View style={styles.orderTableCol1}>
                                            <Text>ZOOM(기본)</Text>
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <Text>MS Teams</Text>
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <Text>GOOGLE Meet</Text>
                                        </View>

                                        <View style={styles.orderTableCol1}>
                                            <Text>Webex</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderTableHead}>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexBasis: '30%' }}>
                                <View style={styles.subTitle}>
                                    <Text>화상회의 개설여부</Text>
                                </View>
                                <View style={styles.orderTable}>
                                    <View style={styles.orderTableHead}>
                                        <View style={styles.orderTableCol1}>
                                            <Text>직접 개설 예정</Text>
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <Text>개설 불가능</Text>
                                        </View>
                                    </View>
                                    <View style={styles.orderTableHead}>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                        <View style={styles.orderTableCol1}>
                                            <View style={styles.square} />
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.info}>
                                            <Text>※ 직접 개설이 불가능하신 경우</Text>
                                        </View>
                                        <View style={styles.info}>
                                            <Text>위버에서 Zoom으로 개설해드립니다.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={styles.subTitle}>
                        <Text>사전준비사항</Text>
                    </View>
                    <View>
                        <Text>홈페이지 상세 내용을 참고해주세요.</Text>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.halfSection}>
                            <View style={styles.subTitle}>
                                <Text>환불규정</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* (근무일 기준) D-8 이전 100% 환불</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* (근무일 기준) D-7 ~ D-day 환불 불가</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>※ 기타 환불규정의 적용을 받는 프로그램은 별도 </Text>
                            </View>
                            {isOnline && (
                                <View style={styles.info}>
                                    <Text>※ 키트 발송 이후 환불 불가능</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.halfSection}>
                            <View style={styles.subTitle}>
                                <Text>일정 연기시</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* 당일 연기는 환불로 불가능</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* 일정 연기시 3개월 이내 진행 필수</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* 일정 연기시 기존 신청인원 보증 필수</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>* 선결제 필수</Text>
                            </View>
                            {isOnline && (
                                <View style={styles.info}>
                                    <Text>* 키트 발송 이후 연기 불가능</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View>
                            <Text>{dayjs().format(COMMON_FORMAT)}</Text>
                        </View>
                        <View style={styles.image}>
                            <Image src={'/images/stamp.png'} />
                        </View>
                        <View>
                            <View style={styles.info}>
                                <Text>위 환불 규정에 동의하며,</Text>
                            </View>
                            <View style={styles.info}>
                                <Text>위 내용으로 일정을 예약합니다. (인)</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default ApplicationDocuments;

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'malgun',
        fontSize: 7,
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
    },
    clientRow: {
        flexDirection: 'row',
    },
    clientCol: {
        flexBasis: 70,
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
});
