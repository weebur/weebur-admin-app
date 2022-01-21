import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import React from 'react';
import styled from 'styled-components';

const SortableContainer = styled.div`
    padding: 20px 10px;
    border: none;
    border-radius: 20px;
    min-width: 110px;
`;

const Droppable = ({ id, ids, children }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <SortableContext id={id} items={ids} strategy={rectSortingStrategy}>
            <SortableContainer ref={setNodeRef}>{children}</SortableContainer>
        </SortableContext>
    );
};

export default Droppable;
