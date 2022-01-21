import React from 'react';
import {
    DndContext,
    useSensors,
    useSensor,
    MouseSensor,
    TouchSensor,
} from '@dnd-kit/core';
import Droppable from './Droppable';
import { cloneDeep } from 'lodash-es';

function DraggableFields({ id, ids, onChange, children }) {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 10,
            },
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={({ active, over }) => {
                const oldIndex = ids.indexOf(active.id);
                const newIndex = ids.indexOf(over?.id);

                if (newIndex < 0) return;

                const cloned = cloneDeep(ids);
                const removed = cloned.splice(oldIndex, 1)[0];

                cloned.splice(newIndex, 0, removed);

                onChange(cloned);
            }}
        >
            <div style={{ display: 'flex' }}>
                <Droppable id={id} ids={ids}>
                    {children}
                </Droppable>
            </div>
        </DndContext>
    );
}

export default DraggableFields;
