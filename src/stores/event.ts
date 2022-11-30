import dayjs from 'dayjs'
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
  dateText: string
  eventText: string
  actionText: string
  actionMessage: string
  actionEffects: {
    text: string
    value: number
  }[]
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
    rawDate: dayjs(),
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
      const actionEffects = Object.entries(action.effect).map(([property, effect]) => {
        const desc = propertyDescriptions[property as keyof Property]
        const val: string = effect > 0 ? `+${effect}` : `${effect}`
        return {
          text: `${desc} ${val}`,
          value: effect,
        }
      }).sort((e1, e2) => e2.value - e1.value)

      const event: HistoryEvent = {
        dateText: this.date,
        eventText: this.currentEvent.text,
        actionText: action.text,
        actionMessage: action.message,
        actionEffects,
      }

      this.historyEvents.push(event)
      this.rawDate = this.rawDate.add(Math.floor(Math.random() * 30 + 1), 'day')

      return event
    },
  },

  getters: {
    date(): string {
      return this.rawDate.format('YYYY/MM/DD')
    },
  },
})
