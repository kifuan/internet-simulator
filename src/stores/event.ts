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

/**
 * When should the game overs.
 */
const gameOverEventCount = 10

const emojiPatterns = {
  sweat: '😅😅😅',
  fear: '😰😰😰',
  rage: '😡😡😡',
  yum: '😋😋😋',
  rofl: '🤣🤣🤣',
  cry: '😭😭😭',
  cool: '😎😎😎',
  champagne: '🍾🍾🍾',
  satisfied: '😆😆😆',
  shark: '🦈🦈🦈',
  triumph: '😤😤😤',
  heart: '😍😍😍',
  dance: '💃💃💃',
  wine: '🍷🍷🍷',
  angel: '😇😇😇',
  think: '🤔🤔🤔',
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
        dateText: this.formattedDate,
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
