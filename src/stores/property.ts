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

/**
 * The description for each property.
 */
export const propertyDescriptions: Record<keyof Property, string> = {
  patriotism: '爱国',
  baseline: '米线',
  money: '金币',
  mind: '心态',
  fun: '乐子',
}

/**
 * Initial property value.
 */
const initialPropertyValue = 20

export const usePropertyStore = defineStore('property', {
  state: () => ({
    property: {
      patriotism: initialPropertyValue,
      baseline: initialPropertyValue,
      money: initialPropertyValue,
      mind: initialPropertyValue,
      fun: initialPropertyValue,
    } as Property,

    prevProperty: {
      patriotism: 0,
      baseline: 0,
      money: 0,
      mind: 0,
      fun: 0,
    } as Property,
  }),
  actions: {
    change(prop: Partial<Property>) {
      Object.assign(this.prevProperty, this.property)
      Object.entries(prop).forEach(([key, value]) => {
        this.property[key as keyof Property] += value
      })
    },
  },
})
