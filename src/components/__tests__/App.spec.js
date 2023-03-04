import { describe, it, expect, beforeEach, afterEach, vi, test } from "vitest";

import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Tileboard from "../Tileboard.vue";
import BattleScreen from "../BattleScreen.vue";

describe("App", () => {
  beforeEach(() => {
    let wrapper = mount(App);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  const wrapper = mount(App);
  it("App renders properly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(Tileboard).exists()).toBe(true);
  });
  it("monsterBattle -> function exists", () => {
    expect(wrapper.vm.monsterBattle).toBeDefined();
  });
  it("monsterBattle -> Before triggering monster function BattleScreen is not rendered", () => {
    expect(wrapper.findComponent(BattleScreen).exists()).toBe(false);
  });
  it("monsterBattle -> when triggered sets the in battle boolean to true", () => {
    wrapper.vm.monsterBattle();
    expect(wrapper.vm.inBattle).toBe(true);
  });
  it("monsterBattle -> when triggered sets the battled monster var", () => {
    const monster = {
      name: "Goblin",
      chance: 0.7,
      health: 10,
      attack: 2,
      defense: 1,
      speed: 2,
      gold: 5,
      exp: 5,
      drop: "Goblin's Tooth",
    };
    wrapper.vm.monsterBattle(monster);
    expect(wrapper.vm.battledMonster).toStrictEqual(monster);
  });
});
