import React, { useState } from 'react';
import Input from './Form/Input';

import { message, Button, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib/icons';
import styled from 'styled-components';

function InlineUpdateInput({ onSave, editable, ...props }) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(props.value);

    if (editing) {
        return (
            <Row gutter={4} align={'middle'}>
                <Col flex={'50%'}>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} />
                </Col>
                <Col>
                    <Button
                        type={'primary'}
                        onClick={async () => {
                            try {
                                await onSave(value);
                                setEditing(false);
                                message.success('수정이 완료되었습니다.');
                            } catch (e) {}
                        }}
                    >
                        저장
                    </Button>
                </Col>
                <Col>
                    <Button onClick={async () => setEditing(false)}>취소</Button>
                </Col>
            </Row>
        );
    }
    return (
        <EditableText
            onClick={() => {
                if (!editable) {
                    return;
                }
                setEditing(true);
            }}
        >
            <Col>{value}</Col>
            {editable && (
                <Col>
                    <EditOutlined />
                </Col>
            )}
        </EditableText>
    );
}

const EditableText = styled.div`
    display: inline-flex;
    gap: 4px;

    &:hover {
        text-decoration: underline;
    }
`;

export default InlineUpdateInput;
