import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import eventsJSON from '../assets/events.json'
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

export interface HistoryActionEffect {
  text: string
  value: number
}

export interface HistoryEvent {
  dateText: string
  eventText: string
  actionText: string
  actionMessage: string
  actionEffects: HistoryActionEffect[]
}

/**
 * When should the game overs.
 */
const gameOverEventCount = 15

const emojiPatterns = {
  sweat: 'πππ',
  fear: 'π°π°π°',
  rage: 'π‘π‘π‘',
  yum: 'πππ',
  rofl: 'π€£π€£π€£',
  cry: 'π­π­π­',
  cool: 'πππ',
  champagne: 'πΎπΎπΎ',
  satisfied: 'πππ',
  shark: 'π¦π¦π¦',
  triumph: 'π€π€π€',
  heart: 'πππ',
  dance: 'πππ',
  wine: 'π·π·π·',
  angel: 'πππ',
  think: 'π€π€π€',
  tired: 'π©π©π©',
  hug: 'π€π€π€',
}

/**
 * Transform emoji patterns to real emojis.
 * @param text the text to be transformed.
 */
function transformEmojiPatterns(text: string): string {
  return text.replace(/\[(.+)]/, (_, pattern) => {
    return Reflect.get(emojiPatterns, pattern)
  })
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
      const event = this.remainingEvents[Math.floor(Math.random() * this.remainingEvents.length)]

      // Record it to the store.
      this.currentEvent = event
      this.historyIds.add(event.id)

      return event
    },

    getHistoryEvent(action: Action): HistoryEvent {
      const actionEffects = Object.entries(action.effect).map(([property, effect]) => {
        const desc = propertyDescriptions[property as keyof Property]
        const val: string = effect > 0 ? `+${effect}` : `${effect}`
        return {
          text: `${desc} ${val}`,
          value: effect,
        } as HistoryActionEffect
      }).sort((e1, e2) => e2.value - e1.value)

      return {
        dateText: this.formattedDate,
        eventText: this.currentEvent.text,
        actionText: action.text,
        actionMessage: action.message,
        actionEffects,
      }
    },

    addHistoryEvent(event: HistoryEvent) {
      this.historyEvents.push(event)
      this.rawDate = this.rawDate.add(Math.floor(Math.random() * 30 + 1), 'day')
    },
  },

  getters: {
    /**
     * The formatted date in string.
     */
    formattedDate(): string {
      return this.rawDate.format('YYYY/MM/DD')
    },

    /**
     * The events that are not in historyIds set, whose emojis in the texts are transformed.
     */
    remainingEvents(): Event[] {
      return eventsJSON.filter(e => !this.historyIds.has(e.id)).map(e => ({
        ...e,
        text: transformEmojiPatterns(e.text),
        actions: e.actions.map(a => ({
          ...a,
          text: transformEmojiPatterns(a.text),
          message: transformEmojiPatterns(a.message),
        })),
      }))
    },

    gameOver(): boolean {
      return this.historyEvents.length >= gameOverEventCount
    },
  },
})
