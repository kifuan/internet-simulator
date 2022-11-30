import { defineStore } from 'pinia'
import dayjs from 'dayjs'
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

export interface TimelineItem {
  dateText: string
  eventText: string
  actionText: string
  actionMessage: string
  actionEffectMessages: string[]
}

export const useEventStore = defineStore('event', {
  state: () => ({
    timelineItems: [] as TimelineItem[],
    currentEvent: {
      id: -1,
      text: 'Event text',
      actions: [],
    } as Event,
    chosenIds: new Set<number>(),
    rawDate: dayjs(),
  }),
  actions: {
    chooseEvent(): Event {
      const eventsArr = events.filter(e => !this.chosenIds.has(e.id))
      const event = eventsArr[Math.floor(Math.random() * eventsArr.length)]

      // Record it to the store.
      this.currentEvent = event
      this.chosenIds.add(event.id)

      return event
    },

    pushTimeline(action: Action) {
      const actionEffectMessages = Object.entries(action.effect).map(([property, effect]) => {
        const desc = propertyDescriptions[property as keyof Property]
        const val: string = effect > 0 ? `+${effect}` : `${effect}`
        return `${desc} ${val}`
      })

      this.timelineItems.push({
        dateText: this.date,
        eventText: this.currentEvent.text,
        actionText: action.text,
        actionMessage: action.message,
        actionEffectMessages,
      })

      // The date will be used for next item.
      const days = Math.floor(Math.random() * 30 + 1)
      this.rawDate = this.rawDate.add(days, 'day')
    },
  },

  getters: {
    date(): string {
      return this.rawDate.format('YY/MM/DD')
    },
  },
})
