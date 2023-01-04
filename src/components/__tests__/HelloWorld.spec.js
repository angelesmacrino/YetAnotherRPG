import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Tileboard from '../Tileboard.vue'

describe('Tileboard', () => {
  const wrapper = mount(Tileboard)
  it('tileboar renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    let tileboard = wrapper.findComponent('.tileWorld')
    expect(tileboard.exists()).toBe(true)
 })
  it('It should render 100 tiles', () => {
    let numberOfTiles = wrapper.findAll('.tile')
    expect(numberOfTiles.length).toBe(100)
 })
})
