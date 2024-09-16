import { useRef } from 'react'

import { DynamicScheduleHeader } from './components/header'
import { DynamicScheduleHeaderItem } from './components/header-item'
import { DynamicScheduleLines } from './components/lines'
import { DynamicScheduleColumns } from './components/columns'
import { DynamicScheduleColumn } from './components/column'
import { DynamicScheduleRows } from './components/rows'
import { FilteredItems } from './components/filtered-items'
import { VoidCells } from './components/void-cells'
import { DynamicScheduleProps } from './types'

import { cn } from '@/lib/utils'
import { getUUID } from '@/lib/uuid'

export const DynamicSchedule = <T,>(props: DynamicScheduleProps<T>) => {
    const {
        columns,
        rows,
        rowHeight,
        minColumnWidth,
        linesPerRow,
        className,
        linesClassName,
        headerClassName,
        items,
        ItemComponent,
        VoidItemComponent,
        columnAssigner,
        rowAssigner,
        yAxisLabel,
        onHeaderClick,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const firstColumnsWidth = 100
    const styleObject = {
        columns: {
            gridTemplateColumns: `${firstColumnsWidth}px repeat(${columns.length}, minmax(${minColumnWidth}px, 1fr))`,
        },
        rows: { gridTemplateRows: `repeat(${rows.length * linesPerRow}, ${rowHeight}px)` },
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative h-full rounded border bg-background px-4',
                'pretty-scrollbar pretty-scrollbar-y pretty-scrollbar-x overflow-x-auto overflow-y-auto',
                className
            )}
        >
            <DynamicScheduleHeader className={headerClassName} style={styleObject.columns}>
                <DynamicScheduleHeaderItem columnId={0}>{yAxisLabel || 'Eje y'}</DynamicScheduleHeaderItem>
                {columns.map((column) => (
                    <DynamicScheduleHeaderItem key={getUUID()} onClick={onHeaderClick} columnId={column.id}>
                        {column.label}
                    </DynamicScheduleHeaderItem>
                ))}
            </DynamicScheduleHeader>

            <DynamicScheduleLines
                columns={columns.length}
                rows={rows.length * linesPerRow}
                columnsStyle={styleObject.columns}
                rowsStyle={styleObject.rows}
                className={linesClassName}
            />

            <DynamicScheduleColumns style={styleObject.columns}>
                <DynamicScheduleRows rows={rows} style={styleObject.rows} linesPerRow={linesPerRow} />

                {/* {columns.map((column) => {
                    const filteredItems = items.filter((i) => columnAssigner(i, column))

                    return (
                        <DynamicScheduleColumn key={getUUID()} styleObject={styleObject}>
                            <FilteredItems
                                ItemComponent={ItemComponent}
                                rowAssigner={rowAssigner}
                                linesPerRow={linesPerRow}
                                filteredItems={filteredItems}
                            />
                            {VoidItemComponent && (
                                <VoidCells
                                    column={column}
                                    rows={rows}
                                    rowAssigner={rowAssigner}
                                    linesPerRow={linesPerRow}
                                    filteredItems={filteredItems}
                                    VoidItemComponent={VoidItemComponent}
                                />
                            )}
                        </DynamicScheduleColumn>
                    )
                })} */}
            </DynamicScheduleColumns>
        </div>
    )
}
