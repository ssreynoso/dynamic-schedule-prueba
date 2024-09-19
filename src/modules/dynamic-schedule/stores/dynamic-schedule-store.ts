import { create } from 'zustand'
import { BaseItem } from '../types'
import {} from '@dnd-kit/core'

type DynamicScheduleStore = {
    activeItem: BaseItem | null
    setActiveItem: (element: BaseItem | null) => void
    selectedItems: BaseItem[]
    setSelectedItems: (elements: BaseItem[]) => void
    isCtrlPressed: boolean
    setIsCtrlPressed: (value: boolean) => void
    selectedItemTransform: { x: number; y: number } | null
    setSelectedItemTransform: (transform: { x: number; y: number } | null) => void
}

export const useDynamicScheduleStore = create<DynamicScheduleStore>((set) => ({
    activeItem: null,
    setActiveItem: (element) => set({ activeItem: element }),
    selectedItems: [],
    setSelectedItems: (elements) => set({ selectedItems: elements }),
    isCtrlPressed: false,
    setIsCtrlPressed: (value) => set({ isCtrlPressed: value }),
    selectedItemTransform: null,
    setSelectedItemTransform: (transform) => set({ selectedItemTransform: transform }),
}))
