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
 * The high property value to be compared when rating.
 */
const highPropValue = 35

/**
 * The low property value to be compared when rating.
 */
const lowPropValue = 15

/**
 * Strategies to rate the properties.
 */
const rateStrategies: Record<keyof Property, (value: number) => string | false> = {
  patriotism: (value) => {
    if (value >= highPropValue)
      return '不是黑象我不吃，不是 HUAMEI 我不买，不是呃呃我不玩！'
    if (value <= lowPropValue)
      return '谁罕见↘啊↗，骂谁↗罕见↘呢，骂谁罕见！'
    return false
  },
  baseline: (value) => {
    if (value <= lowPropValue)
      return '我老想吃草莓了，可惜草莓太贵了。'
    return false
  },
  money: (value) => {
    if (value >= highPropValue)
      return '爆金币，爆一只，爆一只喵。'
    if (value <= lowPropValue)
      return '爆不出金币了吧。'
    return false
  },
  mind: (value) => {
    if (value <= lowPropValue)
      return '今天玉玉，明天不要笑挑战，后天百大！'
    return false
  },
  fun: (value) => {
    if (value >= highPropValue)
      return '不觉得这很乐吗，我觉得这实在是太乐了。'
    return false
  },
}

/**
 * Initial property value.
 */
const initialPropValue = 25

export const usePropertyStore = defineStore('property', {
  state: () => ({
    property: {
      patriotism: initialPropValue,
      baseline: initialPropValue,
      money: initialPropValue,
      mind: initialPropValue,
      fun: initialPropValue,
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

    getRates(): string[] {
      const entries: Array<[keyof Property, number]> = (
        Object.entries(this.property)
          .map(entry => [entry[0], Math.abs(entry[1] - initialPropValue)])
      ) as any

      const propKeys = (entries.filter(e => e[1] > initialPropValue)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0])
      )

      const rates = propKeys.map((key) => {
        const value = this.property[key]
        return rateStrategies[key](value)
      }).filter(r => r !== false) as string[]

      return rates.length !== 0 ? rates : ['在这个混沌的互联网中，纯良UU显得何等珍贵。']
    },
  },
})
