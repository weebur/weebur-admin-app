import React, { useState } from 'react';
import { Fields, FieldSection, OpenToggleButton, SubTitle } from './styles';
import { Typography } from 'antd';
import TextArea from '../../Form/TextArea';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledFields = styled(Fields)`
    gap: 20px;
`;

function WorkshopInfo({ values, onChange }) {
    const [open, setOpen] = useState(true);
    return (
        <>
            <SubTitle>
                <Typography.Title level={5}>워크샵 정보</Typography.Title>
                <OpenToggleButton onClick={() => setOpen(!open)}>
                    {open ? <UpOutlined /> : <DownOutlined />}
                </OpenToggleButton>
            </SubTitle>

            {open && (
                <FieldSection>
                    <StyledFields>
                        <TextArea label="워크샵목적" name="subject" value={values.subject} onChange={onChange} />
                        <TextArea
                            label="참여자정보"
                            name="participantsInfo"
                            value={values.participantsInfo}
                            onChange={onChange}
                        />
                        <TextArea label="장소정보" name="place" value={values.place} onChange={onChange} />
                    </StyledFields>
                </FieldSection>
            )}
        </>
    );
}

export default WorkshopInfo;
