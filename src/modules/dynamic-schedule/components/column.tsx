import { PropsWithChildren } from 'react'

import { getUUID } from '@/lib/uuid'

type Props = PropsWithChildren<{
    styleObject: { columns: React.CSSProperties; rows: React.CSSProperties }
}>

export const DynamicScheduleColumn = (props: Props) => {
    const { styleObject, children } = props

    return (
        <div key={getUUID()} className='z-30 grid h-full w-full grid-cols-1' style={styleObject.rows}>
            {children}
        </div>
    )
}
