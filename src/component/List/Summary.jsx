import { Button, Col, Row } from 'antd';

import styled from 'styled-components';

const StyledCol = styled(Col)`
    font-size: ${({ theme }) => theme.fontSize.large};
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
