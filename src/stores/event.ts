import { defineStore } from 'pinia'
import events from '../assets/events.json'
import type { Property } from './property'

export interface Event {
  id: number
  text: string
  actions: Action[] | Action
}

export interface Action {
  text: string
  message: string
  effect: Partial<Property>
}

function chooseArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const useEventStore = defineStore('event', {
  state: () => ({
    history: [] as Event[],
  }),
  actions: {
    next(): Event {
      const event = chooseArray(events.filter(e => !this.historyId.includes(e.id)))
      this.history.push(event)
      return event
    },
  },
  getters: {
    historyId(): number[] {
      return this.history.map(e => e.id)
    },
    current(): Event {
      if (this.history.length === 0)
        throw new Error('there is no events')
      return this.history.at(-1)!
    },
  },
})
