import { useRef } from 'react'

import { DynamicScheduleHeader } from './components/header'
import { DynamicScheduleHeaderItem } from './components/header-item'
import { DynamicScheduleLines } from './components/lines'
import { DynamicScheduleColumns } from './components/columns'
import { DynamicScheduleColumn } from './components/column'
import { DynamicScheduleRows } from './components/rows'
import { ColumnItems } from './components/column-items'
import { VoidCells } from './components/void-cells'
import { DynamicScheduleProps } from './types'

import { cn } from '@/lib/utils'
import { getUUID } from '@/lib/uuid'
import { VoidCellsColumn } from './components/void-cells-column'
import { ColumnItemsContainer } from './components/column-items-container'
import { useKeyboardListeners } from './hooks/use-keyboard-listeners'

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
        scheduleItems,
        setScheduleItems,
        onChangeItems,
        ItemComponent,
        VoidItemComponent,
        yAxisLabel,
        onHeaderClick,
        itemCanDragOnX,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const firstColumnsWidth = 100
    const styleObject = {
        columns: {
            gridTemplateColumns: `${firstColumnsWidth}px repeat(${columns.length}, minmax(${minColumnWidth}px, 1fr))`,
        },
        rows: { gridTemplateRows: `repeat(${rows.length}, ${rowHeight * linesPerRow}px)` },
        rowsLines: { gridTemplateRows: `repeat(${rows.length * linesPerRow}, ${rowHeight}px)` },
    }

    useKeyboardListeners()

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
                rowsStyle={styleObject.rowsLines}
                className={linesClassName}
            />

            <DynamicScheduleColumns
                style={styleObject.columns}
                scheduleItems={scheduleItems}
                setScheduleItems={setScheduleItems}
                ItemComponent={ItemComponent}
                onChangeItems={onChangeItems}
                itemCanDragOnX={itemCanDragOnX}
            >
                <DynamicScheduleRows rows={rows} style={styleObject.rows} />

                {columns.map((column) => {
                    const columnItems = scheduleItems.filter((i) => i.columnId === column.id)

                    return (
                        <DynamicScheduleColumn key={getUUID()}>
                            <VoidCellsColumn style={styleObject.rows}>
                                <VoidCells column={column} rows={rows} VoidItemComponent={VoidItemComponent} ItemComponent={ItemComponent} />
                            </VoidCellsColumn>
                            <ColumnItemsContainer style={styleObject.rows}>
                                <ColumnItems ItemComponent={ItemComponent} columnItems={columnItems} />
                            </ColumnItemsContainer>
                        </DynamicScheduleColumn>
                    )
                })}
            </DynamicScheduleColumns>
        </div>
    )
}
