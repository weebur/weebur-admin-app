import { Alert, Checkbox, Col, Row } from 'antd';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Loader from '../Loader';

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const StyledRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    height: 102px;
    padding: 25px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.color.lightBorder};
    font-size: ${({ theme }) => theme.fontSize.large};
    transition: background 0.3s;
    cursor: pointer;

    ${({ checked, theme }) =>
        checked &&
        `
        background: ${theme.color.lightBackground}
    `}

    :hover {
        background: ${({ theme }) => theme.color.lightBackground};
    }
`;

const StyledHeader = styled(Row)`
    padding: 13px 10px;
    border-bottom: 2px solid ${({ theme }) => theme.color.text};
    color: ${({ theme }) => theme.color.light};
    text-align: left;
`;

const Ellipsis = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
`;

function List({ data = [], headers, withCheckBox, hasNext, fetchData }) {
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const handleCheckBoxChange = (item) => {
        let listLength = checkedList.length;

        if (checkedList.includes(item)) {
            listLength--;
            setCheckedList(
                checkedList.filter((checkedItem) => checkedItem !== item),
            );
        } else {
            listLength++;
            setCheckedList([...checkedList, item]);
        }

        setIndeterminate(data.length > listLength && listLength > 0);
        setCheckAll(data.length === listLength);
    };

    const handleCheckAllChange = (e) => {
        const checked = e.target.checked;

        setCheckedList(checked ? data.map((item) => item.id) : []);
        setIndeterminate(false);
        setCheckAll(checked);
    };

    return (
        <ListWrapper>
            <StyledHeader>
                {withCheckBox && (
                    <Col span={1}>
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={handleCheckAllChange}
                            checked={checkAll}
                        />
                    </Col>
                )}
                {headers.map(({ key, label, span }) => (
                    <Col key={key} span={span}>
                        {label}
                    </Col>
                ))}
            </StyledHeader>
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasNext}
                loader={<Loader />}
                scrollThreshold="200px"
                endMessage={
                    <ListWrapper>
                        <Alert
                            message="검색이 완료되었습니다."
                            type="success"
                        />
                    </ListWrapper>
                }
            >
                {data.map(({ id, rows }) => {
                    return (
                        <StyledRow key={id} gutter={10}>
                            {withCheckBox && (
                                <Col span={1}>
                                    <Checkbox
                                        onChange={(e) => {
                                            handleCheckBoxChange(
                                                id,
                                                e.target.checked,
                                            );
                                        }}
                                        checked={checkedList.includes(id)}
                                    />
                                </Col>
                            )}
                            {rows.map(({ key, span, Component }) => (
                                <Col key={key} span={span}>
                                    <Ellipsis ellipsis={{ rows: 2 }}>
                                        {Component}
                                    </Ellipsis>
                                </Col>
                            ))}
                        </StyledRow>
                    );
                })}
            </InfiniteScroll>
        </ListWrapper>
    );
}

export default List;
