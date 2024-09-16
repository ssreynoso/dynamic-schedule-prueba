import { cn } from '@/lib/utils'
import { Column, DynamicScheduleProps } from '../types'
import { VoidCell as TVoidCell } from '../lib/calculate-void-cells'

type Props<T> = Pick<DynamicScheduleProps<T>, 'VoidItemComponent'> & {
    column: Column
    cell: TVoidCell
}

export const VoidCell = <T,>({ column, cell, VoidItemComponent }: Props<T>) => {
    const handleMouseEnter = () => {
        // console.log('mouse enter')
        // console.log('column', column)
        // console.log('cell', cell)
    }

    const handleMouseLeave = () => {
        // console.log('mouse exit')
        // console.log('column', column)
        // console.log('cell', cell)
    }

    return (
        <div
            className={cn('w-full h-full bg-orange-400 border border-red-50', 'flex items-center justify-center')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {VoidItemComponent ? <VoidItemComponent columnId={column.id} row={cell.row} /> : <>Void</>}
        </div>
    )
}
