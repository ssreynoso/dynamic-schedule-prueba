import { DynamicScheduleProps } from '../types'

import { getUUID } from '@/lib/uuid'

type Props<T> = Pick<DynamicScheduleProps<T>, 'ItemComponent' | 'linesPerRow' | 'rowAssigner'> & {
    filteredItems: DynamicScheduleProps<T>['items']
}

export const FilteredItems = <T,>(props: Props<T>) => {
    const { ItemComponent, linesPerRow, rowAssigner, filteredItems } = props

    return (
        <>
            {filteredItems.map((item) => {
                const { rowStart, rowEnd } = rowAssigner(item, linesPerRow)

                return (
                    <ItemComponent
                        key={getUUID()}
                        item={item}
                        style={{
                            gridRowStart: rowStart.toString(),
                            gridRowEnd: rowEnd.toString(),
                            // position: 'absolute'
                        }}
                    />
                )
            })}
        </>
    )
}
