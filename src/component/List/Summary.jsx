import { Button, Col, Row } from 'antd';

import styled from 'styled-components';

const StyledCol = styled(Col)`
    padding-left: 10px;
    font-size: ${({ theme }) => theme.fontSize.xxLarge};
    font-weight: 400;
`;

function Summary({ total, buttonText, onClick }) {
    return (
        <Row justify="space-between">
            <StyledCol>{`총 ${total}개`}</StyledCol>
            <Col>
                <Button onClick={onClick}>{buttonText}</Button>
            </Col>
        </Row>
    );
}

export default Summary;
