import { defineStore } from 'pinia'
import events from '../assets/events.json'
import type { Property } from './property'
import { propertyDescriptions } from './property'

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

export interface TimelineItem {
  eventText: string
  actionText: string
  actionMessage: string
  actionEffectMessages: string[]
}

export const useEventStore = defineStore('event', {
  state: () => ({
    timeline: [] as TimelineItem[],
    currentEvent: {
      id: -1,
      text: 'Event text',
      actions: [],
    } as Event,
    chosenIds: new Set<number>(),
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
        const val = effect > 0 ? `+${effect}` : `${effect}`
        return `${desc} ${val}`
      })

      this.timeline.push({
        eventText: this.currentEvent.text,
        actionText: action.text,
        actionMessage: action.message,
        actionEffectMessages,
      })
    },
  },
})
