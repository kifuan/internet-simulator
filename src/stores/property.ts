import { defineStore } from 'pinia'

export interface Property {
  /**
   * I won't eat except Black Elephant.
   */
  patriotism: number

  /**
   * Rice noodles!
   */
  baseline: number

  /**
   * Money
   */
  money: number

  /**
   * Mind
   */
  mind: number

  /**
   * Don't you think it's fun?
   */
  fun: number
}

export const usePropertyStore = defineStore('property', {
  state: () => ({
    property: {
      patriotism: 0,
      baseline: 0,
      money: 0,
      mind: 0,
      fun: 0,
    } as Property,
  }),
  actions: {
    change(prop: Partial<Property>) {
      Object.entries(prop).forEach(([key, value]) => {
        this.property[key as keyof Property] += value
      })
    },
  },
})
