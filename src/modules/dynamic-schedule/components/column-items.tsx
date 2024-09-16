import { DynamicScheduleProps } from '../types'

import { getUUID } from '@/lib/uuid'
import { ColumnItem } from './column-item'

type Props<T> = Pick<DynamicScheduleProps<T>, 'ItemComponent' | 'linesPerRow' | 'rowAssigner'> & {
    columnItems: DynamicScheduleProps<T>['items']
}

export const ColumnItems = <T,>(props: Props<T>) => {
    const { ItemComponent, linesPerRow, rowAssigner, columnItems } = props

    return (
        <>
            {columnItems.map((item) => {
                const { rowStart, rowEnd } = rowAssigner(item, linesPerRow)

                return (
                    <ColumnItem key={getUUID()} rowStart={rowStart.toString()} rowEnd={rowEnd.toString()}>
                        <ItemComponent item={item} />
                    </ColumnItem>
                )
            })}
        </>
    )
}
