import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, Modifier, pointerWithin } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'
import { BaseItem, DynamicScheduleProps, ItemToMove } from '../types'
import { useDynamicScheduleStore } from '../stores/dynamic-schedule-store'

type Props<T> = PropsWithChildren<
    Pick<DynamicScheduleProps<T>, 'ItemComponent' | 'onChangeItems' | 'itemCanDragOnX'> & {
        style: React.CSSProperties
        scheduleItems: DynamicScheduleProps<T>['scheduleItems']
        setScheduleItems: (items: DynamicScheduleProps<T>['scheduleItems']) => void
    }
>

export const DynamicScheduleColumns = <T,>(props: Props<T>) => {
    const { style, children, scheduleItems, setScheduleItems, ItemComponent, onChangeItems, itemCanDragOnX } = props

    const activeItem = useDynamicScheduleStore((state) => state.activeItem)
    const setActiveItem = useDynamicScheduleStore((state) => state.setActiveItem)
    const selectedItems = useDynamicScheduleStore((state) => state.selectedItems)
    const setSelectedItems = useDynamicScheduleStore((state) => state.setSelectedItems)

    const handleDragStart = (event: DragStartEvent) => {
        const selectedItem = scheduleItems.find((item) => item.id === event.active.id)

        if (selectedItem) {
            setActiveItem(selectedItem)
        }
    }

    const dndModifier: Modifier = (args) => {
        const canDragOnX = itemCanDragOnX ? itemCanDragOnX(args.active?.id as BaseItem['id']) : true

        return {
            ...args.transform,
            x: canDragOnX ? args.transform.x : 0,
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.over && activeItem) {
            const [columnId, rowId] = String(event.over.id).split('-').map(Number)

            console.log(selectedItems)

            const columnDiff = columnId - activeItem.columnId
            const rowDiff = rowId - activeItem.rowId

            let itemsToMove: ItemToMove<T>[] = selectedItems.map((item) => {
                const newColumnId = item.columnId + columnDiff
                const newRowId = item.rowId + rowDiff

                return { item: item as T & BaseItem, newColumnId, newRowId }
            })

            if (itemsToMove.length === 0) {
                itemsToMove = [{ item: activeItem as T & BaseItem, newColumnId: columnId, newRowId: rowId }]
            }

            const confirmCallback = (confirmed: boolean) => {
                if (confirmed) {
                    // Updated items
                    const newItems = scheduleItems.map((item) => {
                        const itemToMove = itemsToMove.find((itemToMove) => itemToMove.item.id === item.id)

                        if (itemToMove) {
                            return {
                                ...item,
                                columnId: itemToMove.newColumnId,
                                rowId: itemToMove.newRowId,
                            }
                        }

                        return item
                    })

                    // Updated selected items
                    const newSelectedItems = selectedItems.map((item) => {
                        const itemToMove = itemsToMove.find((itemToMove) => itemToMove.item.id === item.id)

                        if (itemToMove) {
                            return {
                                ...item,
                                columnId: itemToMove.newColumnId,
                                rowId: itemToMove.newRowId,
                            }
                        }

                        return item
                    })

                    setScheduleItems(newItems)
                    setSelectedItems(newSelectedItems)
                }
            }

            onChangeItems({
                itemsToMove,
                callback: confirmCallback,
            })
        }

        setActiveItem(null)
    }

    return (
        <DndContext
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[dndModifier]}
            autoScroll={false}
        >
            <div className=' w-full grid h-auto' style={style}>
                {children}
            </div>
            <DragOverlay>{activeItem ? <ItemComponent item={activeItem as T & BaseItem} /> : null}</DragOverlay>
        </DndContext>
    )
}
