import React, { useState } from 'react';
import { Fields, FieldSection, OpenToggleButton, SubTitle } from './styles';
import { Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import SelectBox from '../../Form/SelectBox';
import Checkbox from '../../Form/CheckBoxInput';
import TextInput from '../../Form/Input';
import NumberInput from '../../Form/NumberInput';
import styled from 'styled-components';
import { paymentMethods } from '../../../constants/Workshop';
import { reservationStatus } from '../../../constants/order';
import TextArea from '../../Form/TextArea';

const PaymentRequirements = styled.div`
    flex: 1;
`;

const CertificatedRegistration = styled.div`
    flex: 0 0 100px;
`;

const SalesTotal = styled.div`
    flex: 0 0 200px;
`;

const StyledFields = styled(Fields)`
    gap: 20px;
`;

function Payment({ values, onChange, onValueChange, salesTotal, initialValues }) {
    const [open, setOpen] = useState(true);
    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>결제 정보</Typography.Title>
                <OpenToggleButton onClick={() => setOpen(!open)}>
                    {open ? <UpOutlined /> : <DownOutlined />}
                </OpenToggleButton>
            </SubTitle>

            {open && (
                <FieldSection>
                    <StyledFields>
                        <SalesTotal>
                            <SelectBox
                                label="결제방식"
                                name="paymentMethod"
                                value={values.paymentMethod}
                                onChange={onValueChange}
                                options={Object.values(paymentMethods)}
                            />
                        </SalesTotal>

                        <SalesTotal>
                            <NumberInput
                                label="워크샵 총합계"
                                disabled
                                value={(salesTotal || 0).toLocaleString()}
                                suffix="원"
                            />
                        </SalesTotal>
                        <SalesTotal>
                            <SelectBox
                                disabled
                                label="워크샵 취소"
                                name="isCanceled"
                                value={values.isCanceled ? 1 : 0}
                                options={[
                                    { key: 1, value: 1, label: '취소' },
                                    { key: 0, value: 0, label: '정상' },
                                ]}
                            />
                        </SalesTotal>

                        <CertificatedRegistration>
                            <Checkbox
                                label="사업자등록증"
                                subLabel="등록"
                                name="certificatedRegistration"
                                checked={values.certificatedRegistration}
                                onChange={onValueChange}
                            />
                        </CertificatedRegistration>
                    </StyledFields>
                    <StyledFields>
                        <TextArea
                            label="결제 요청사항"
                            placeholder="워크샵 기본 정보와 다른 경우만 작성해주세요(날짜, 이메일주소, 금액, 항목)"
                            name="paymentRequirements"
                            value={values.paymentRequirements}
                            onChange={onChange}
                            rows={5}
                        />
                    </StyledFields>
                </FieldSection>
            )}
        </>
    );
}

export default Payment;
