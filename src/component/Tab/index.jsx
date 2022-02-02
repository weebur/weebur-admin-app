import React, { useState } from 'react';
import styled from 'styled-components';

const TabsWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`;

const StyledTab = styled.div`
    flex: 0 0 240px;
    height: 60px;
    padding: 18px 98px 18px 99px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    color: ${({ theme }) => theme.color.light};

    ${({ active, theme }) =>
        active &&
        `
      color: ${theme.color.primary};
      background-color: rgba(17, 82, 242, 0.05);
  `}
    &:hover {
        background-color: rgba(17, 82, 242, 0.05);
    }
`;

function Tab({ tabs = [], active, onChange }) {
    return (
        <TabsWrapper>
            {tabs.map(({ key, label }) => {
                return (
                    <StyledTab
                        key={key}
                        active={active === key}
                        onClick={() => onChange(key)}
                    >
                        {label}
                    </StyledTab>
                );
            })}
        </TabsWrapper>
    );
}

export default Tab;
