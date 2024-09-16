import { IntervalScrollingCallback } from '../hooks/use-interval-scrolling'

// Item de la tabla
export interface BaseItem {
    id: string | number
    columnId: string
}

// Columna de la tabla
export type Column = { id: string | number; label: string }

// Fila de la tabla
export type Row = { id: number; label: string }

// Función que se ejecuta al hacer click en el header
export type HeaderOnClick = (column: Column['id']) => void

// Función que asigna un item a una columna
export type ColumnAssigner<T> = (item: T, column: Column) => boolean

// Función que asigna un item a una fila
export type RowAssigner<T> = (item: T, linesPerRow: number) => { rowStart: number; rowEnd: number }

// Componente que se renderiza en cada celda
export type SubComponent<T> = (props: SubComponentProps<T>) => JSX.Element

// Props del componente que se renderiza en cada celda
export type SubComponentProps<T> = { item: T & Partial<BaseItem> }

export type VoidItemComponent = (props: VoidItemComponentProps) => JSX.Element

export type VoidItemComponentProps = {
    columnId: Column['id']
    row: Row
}

// Props del componente DynamicSchedule
export type DynamicScheduleProps<T> = {
    columns: Column[]
    rows: Row[]
    rowHeight: number
    minColumnWidth: number
    linesPerRow: number
    headerClassName?: string
    linesClassName?: string
    className?: string
    columnAssigner: ColumnAssigner<T>
    rowAssigner: RowAssigner<T>
    items: (T & Partial<BaseItem>)[]
    ItemComponent: SubComponent<T>
    VoidItemComponent?: VoidItemComponent
    onHeaderClick?: HeaderOnClick
    intervalScrollingCallback?: IntervalScrollingCallback
    yAxisLabel?: string
}
