import { DynamicScheduleProps, Row } from '../types'

type Props<T> = Pick<DynamicScheduleProps<T>, 'rows' | 'items' | 'linesPerRow' | 'rowAssigner'>

type ItemSize<T> = { item: T; cells: number; rowStart: number; rowEnd: number }

export const calculateVoidCells = <T>({ rows, items, linesPerRow, rowAssigner }: Props<T>) => {
    // Calculate void cells
    const itemsSizes: ItemSize<T>[] = []

    /*
    Ejemplo
    itemsSizes = [
        { item: 1, cells: 3, rowStart: 4, rowEnd: 7 },
        { item: 2, cells: 2, rowStart: 8, rowEnd: 10 },
        { item: 3, cells: 1, rowStart: 11, rowEnd: 12 },
        { item: 4, cells: 1, rowStart: 14, rowEnd: 15 },
    ]
    */

    // Verifica si una fila está ocupada por un item
    const isInItemRows = (row: number) => {
        return itemsSizes.some(item => row >= item.rowStart && row < item.rowEnd)
    }

    for (const item of items) {
        const { rowStart, rowEnd } = rowAssigner(rows[0].id, item, linesPerRow)
        const cells = rowEnd - rowStart
        itemsSizes.push({ item, cells, rowStart, rowEnd })
    }

    // const voidCells = Array.from({ length: rows.length - usedRows }, (_, index) => index + 1) // [1, 2, ...]
    const voidCells: { row: Row; rowStart: number; rowEnd: number }[] = []

    for (let i = 1; i <= rows.length; i++) {
        if (!isInItemRows(i)) {
            voidCells.push({ row: rows[i - 1], rowStart: i, rowEnd: i + 1 })
        }
    }

    return voidCells
}
