import { cn } from '@/lib/utils'
import { BaseItem, Column, DynamicScheduleProps } from '../types'
import { VoidCell as TVoidCell } from '../lib/calculate-void-cells'
import { useDroppable } from '@dnd-kit/core'
import { useDynamicScheduleStore } from '../stores/dynamic-schedule-store'

type Props<T> = Pick<DynamicScheduleProps<T>, 'VoidItemComponent' | 'ItemComponent'> & {
    column: Column
    cell: TVoidCell
}

export const VoidCell = <T,>({ column, cell, VoidItemComponent, ItemComponent }: Props<T>) => {
    const activeItem = useDynamicScheduleStore((state) => state.activeItem)

    const id = `${column.id}-${cell.row.id}`

    const { isOver, setNodeRef } = useDroppable({ id })

    return (
        <div id={id} ref={setNodeRef} className={cn('w-full h-full border border-red-50', 'flex items-center justify-center')}>
            {isOver ? (
                <div className='w-full h-full'>
                    {activeItem ? <ItemComponent item={activeItem as T & BaseItem} className='opacity-70' /> : 'Drop here'}
                </div>
            ) : VoidItemComponent ? (
                <VoidItemComponent columnId={column.id} row={cell.row} />
            ) : (
                <>Void</>
            )}
        </div>
    )
}
