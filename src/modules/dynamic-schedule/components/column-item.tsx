import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useDynamicScheduleStore } from '../stores/dynamic-schedule-store'
import { cn } from '@/lib/utils'
import { BaseItem } from '../types'

type Props = PropsWithChildren<{
    item: BaseItem
    rowStart: string
    rowEnd: string
}>

export const ColumnItem = ({ item, children, rowStart, rowEnd }: Props) => {
    const [hover, setHover] = useState(false)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id })

    const isCtrlPressed = useDynamicScheduleStore((state) => state.isCtrlPressed)
    const selectedItems = useDynamicScheduleStore((state) => state.selectedItems)
    const setSelectedItems = useDynamicScheduleStore((state) => state.setSelectedItems)
    const selectedItemTransform = useDynamicScheduleStore((state) => state.selectedItemTransform)
    const setSelectedItemTransform = useDynamicScheduleStore((state) => state.setSelectedItemTransform)

    const selectButtonId = `${item.id}-select-button`
    const itemIsSelected = selectedItems.some((selectedItem) => selectedItem.id == item.id)

    const transformStyle = useMemo<React.CSSProperties>(() => {
        if (transform && !itemIsSelected) {
            if (selectedItems.length > 0) {
                setSelectedItems([])
            }
            return {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            }
        }

        return transform
            ? {
                  transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              }
            : selectedItemTransform && itemIsSelected
            ? {
                  transform: `translate3d(${selectedItemTransform.x}px, ${selectedItemTransform.y}px, 0)`,
              }
            : {}
    }, [transform, itemIsSelected, selectedItemTransform, selectedItems.length, setSelectedItems])

    useEffect(() => {
        if (transform) {
            setSelectedItemTransform({ x: transform.x, y: transform.y })
        } else {
            setSelectedItemTransform(null)
        }
    }, [setSelectedItemTransform, transform])

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).id === selectButtonId) {
            if (!itemIsSelected) {
                setSelectedItems([...selectedItems, item])
            } else {
                setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id))
            }
        }
    }

    const selectItemAvailable = useMemo(() => {
        return isCtrlPressed && hover
    }, [isCtrlPressed, hover])

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={setNodeRef}
            style={{
                gridRowStart: rowStart,
                gridRowEnd: rowEnd,
                ...transformStyle,
            }}
            onClick={handleOnClick}
            className='relative'
        >
            <div
                className={cn(
                    'opacity-0 w-full h-full bg-slate-900/20 absolute top-0 flex items-center justify-center',
                    selectItemAvailable && 'opacity-100',
                    transformStyle.transform && 'z-50'
                )}
            >
                {selectItemAvailable && (
                    <button id={selectButtonId} className='bg-slate-300 p-4 rounded'>
                        {itemIsSelected ? 'Quitar selección' : 'Seleccionar'}
                    </button>
                )}
            </div>
            {itemIsSelected && <p className='absolute top-0 right-6'>✅</p>}
            <div
                className={cn('w-6 h-6 absolute right-0 top-0 bg-green-300 transition-opacity opacity-100', selectItemAvailable && 'opacity-0')}
                {...listeners}
                {...attributes}
            ></div>
            {children}
        </div>
    )
}
