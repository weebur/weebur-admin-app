import React from 'react';
import {
    DndContext,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
} from '@dnd-kit/core';
import Droppable from './Droppable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function DraggableFields({ id, ids, items }) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext sensors={sensors}>
            <div style={{ display: 'flex' }}>
                <Droppable id={id} ids={ids} items={items} />
            </div>
        </DndContext>
    );
}

export default DraggableFields;
