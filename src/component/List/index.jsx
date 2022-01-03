import { Col, Row } from 'antd';
import Grid from 'antd/lib/card/Grid';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import { forwardRef } from 'react';

import styled from 'styled-components';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const StyledRow = styled(Row)`
    width: 100%;
    align-items: center;
    height: 80px;
    padding: 0 10px;
    border-bottom: 1px solid ${({ theme }) => theme.color.lightBorder};
`;

const StyledHeader = styled(Row)`
    padding: 10px;
    border-bottom: 1.5px solid ${({ theme }) => theme.color.text};
    color: ${({ theme }) => theme.color.light};
`;

const Ellipsis = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
`;

const List = forwardRef(function NestedList({ data = [] }, ref) {
    return (
        <ListWrapper>
            <StyledHeader>
                <Col span={8}>이름</Col>
                <Col span={8}>등급</Col>
                <Col span={8}>이메일</Col>
            </StyledHeader>
            {data.map((item, i) => {
                const isLast = i === data.length - 1;
                return (
                    <StyledRow
                        ref={isLast ? ref : null}
                        key={item._id}
                        gutter={10}
                    >
                        <Col span={8}>
                            <Ellipsis ellipsis={{ rows: 2 }}>
                                {item.name}
                            </Ellipsis>
                        </Col>
                        <Col span={8}>
                            <Ellipsis ellipsis={{ rows: 2 }}>
                                {item.class}
                            </Ellipsis>
                        </Col>
                        <Col span={8}>
                            <Ellipsis ellipsis={{ rows: 2 }}>
                                {item.email}
                            </Ellipsis>
                        </Col>
                    </StyledRow>
                );
            })}
        </ListWrapper>
    );
});

export default List;
