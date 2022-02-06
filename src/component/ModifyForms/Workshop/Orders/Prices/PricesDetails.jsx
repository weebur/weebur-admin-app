import React from 'react';
import { Typography } from 'antd';
import { PriceItem, PriceRow, PriceSection } from '../styles';
import TextArea from '../../../../Form/TextArea';

function PricesDetails({ name, note, onChange }) {
    return (
        <PriceSection>
            <Typography.Title level={5}>정산비고</Typography.Title>
            <PriceRow noHandler>
                <PriceItem>
                    <TextArea label="정산비고" name={name} value={note} onChange={onChange} />
                </PriceItem>
                <PriceItem />
            </PriceRow>
        </PriceSection>
    );
}

export default PricesDetails;
