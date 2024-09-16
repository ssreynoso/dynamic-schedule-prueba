import { v4 } from 'uuid'

export const getUUID = function (): string {
    const uuid: string = v4()
    return uuid
}
