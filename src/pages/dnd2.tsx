import { useState } from 'react'
import { DndContext, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'
import { Draggable } from './draggable'

const Item = (props: { value: string }) => {
    return <div className='p-4 bg-red-300 w-max'>{props.value}</div>
}

export const Dnd2 = () => {
    const [items] = useState(['1', '2', '3', '4', '5'])
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = () => {
        setActiveId(null)
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className='flex gap-4'>
                {items.map((id) => (
                    <Draggable key={id} id={id}>
                        <Item value={`Item ${id}`} />
                    </Draggable>
                ))}
            </div>

            <DragOverlay>{activeId ? <Item value={`Este es el overlay ${activeId}`} /> : null}</DragOverlay>
        </DndContext>
    )
}
