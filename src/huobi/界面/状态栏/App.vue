<template>
  <div class="terminal">
    <TopBar :expanded="expanded" @toggle="expanded = !expanded" />

    <HeroPanel />

    <PresentNpcPanel />

    <ResidentNpcPanel v-if="expanded" />
  </div>
</template>

<script setup lang="ts">
import HeroPanel from './components/HeroPanel.vue';
import PresentNpcPanel from './components/PresentNpcPanel.vue';
import ResidentNpcPanel from './components/ResidentNpcPanel.vue';
import TopBar from './components/TopBar.vue';

const expanded = useLocalStorage<boolean>('huobi:status_bar:expanded', false);
</script>

<style lang="scss" scoped>
.terminal {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  color: var(--c-text);
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
}
</style>
