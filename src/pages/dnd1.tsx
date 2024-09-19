import { useState } from 'react'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { Draggable } from '@/modules/dnd/components/dragable'
import { Droppable } from '@/modules/dnd/components/droppable'

export const Dnd1 = () => {
    // const [isDropped, setIsDropped] = useState(false)

    const [parent, setParent] = useState<UniqueIdentifier | null>(null)
    const draggableMarkup = <Draggable>Drag me</Draggable>

    const handleDragEnd = (event: DragEndEvent) => {
        // if (event.over && event.over.id === 'droppable') {
        //     setIsDropped(true)
        // }

        console.log(event)

        const { over } = event

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null)
    }

    const containers = ['a', 'b', 'c']

    return (
        // <DndContext onDragEnd={handleDragEnd}>
        //     {!isDropped ? draggableMarkup : null}
        //     <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
        // </DndContext>
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={id} id={id}>
                    {parent === id ? draggableMarkup : 'Drop here'}
                </Droppable>
            ))}
        </DndContext>
    )
}
