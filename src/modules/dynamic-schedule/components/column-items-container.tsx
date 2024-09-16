import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    style: React.CSSProperties
}>

export const ColumnItemsContainer = (props: Props) => {
    const { style, children } = props

    return (
        <div className='grid absolute h-full top-0 w-full grid-cols-1' style={style}>
            {children}
        </div>
    )
}
