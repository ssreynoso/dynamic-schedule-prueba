import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const execURL = function (url: string) {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.style.display = 'none'
    document.querySelector('body')?.append(link)
    link.click()
    link.remove()
}

export const setCSSVariable = function (variable: string, value: string) {
    document.documentElement.style.setProperty(variable, value)
}

export const sleep = function (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const getTime = (value: string): string => {
    const time = value.split(' ')
    return time[1]
}

export const booleanToSOrN = (value: boolean): 'S' | 'N' => (value ? 'S' : 'N')

export const SOrNToBoolean = (value: string): boolean => value === 'S'
