import { defineStore } from 'pinia'
import events from '../assets/events.json'
import type { Property } from './property'
import { propertyDescriptions } from './property'

export interface Event {
  id: number
  text: string
  actions: Action[]
}

export interface Action {
  text: string
  message: string
  effect: Partial<Property>
}

export interface HistoryEvent {
  eventText: string
  actionText: string
  actionMessage: string
  actionEffectMessages: string[]
}

export const useEventStore = defineStore('event', {
  state: () => ({
    historyEvents: [] as HistoryEvent[],
    historyIds: new Set<number>(),
    currentEvent: {
      id: -1,
      text: 'Event text',
      actions: [],
    } as Event,
  }),
  actions: {
    chooseEvent(): Event {
      const eventsArr = events.filter(e => !this.historyIds.has(e.id))
      const event = eventsArr[Math.floor(Math.random() * eventsArr.length)]

      // Record it to the store.
      this.currentEvent = event
      this.historyIds.add(event.id)

      return event
    },

    pushTimeline(action: Action): HistoryEvent {
      const actionEffectMessages = Object.entries(action.effect).map(([property, effect]) => {
        const desc = propertyDescriptions[property as keyof Property]
        const val: string = effect > 0 ? `+${effect}` : `${effect}`
        return `${desc} ${val}`
      })

      const event: HistoryEvent = {
        eventText: this.currentEvent.text,
        actionText: action.text,
        actionMessage: action.message,
        actionEffectMessages,
      }
      this.historyEvents.push(event)
      return event
    },
  },
})
