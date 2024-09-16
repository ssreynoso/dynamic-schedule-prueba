import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    style: React.CSSProperties
}>

export const DynamicScheduleColumns = ({ style, children }: Props) => {
    return (
        <div className=' w-full grid h-auto bg-green-300' style={style}>
            {children}
        </div>
    )
}
