import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import React from 'react';
import styled from 'styled-components';

const SortableContainer = styled.div`
    width: 100%;
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
