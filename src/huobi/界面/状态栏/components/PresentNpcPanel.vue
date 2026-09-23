<template>
  <section class="panel">
    <div class="panel-head">
      <span class="label">在场 NPC</span>
      <span class="count">{{ present_list.length }}</span>
    </div>

    <p v-if="present_list.length === 0" class="empty">当前无人在场</p>

    <article v-for="npc in present_list" :key="npc.name" class="npc-card">
      <header class="npc-head">
        <span class="npc-name">{{ npc.name }}</span>
        <span class="npc-favor">{{ npc.好感度 }}</span>
      </header>
      <div class="favor-track">
        <div class="favor-fill" :style="{ width: npc.好感度 + '%' }"></div>
      </div>
      <p class="npc-archive">{{ npc.本轮档案 }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const present_list = computed(() =>
  Object.entries(store.data.在场NPC).map(([name, value]) => ({ name, ...value })),
);
</script>

<style lang="scss" scoped>
.panel {
  padding: 10px;
  border-bottom: 1px solid var(--c-border);
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
}

.count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-primary);
}

.empty {
  font-size: 12px;
  color: var(--c-text-muted);
}

.npc-card {
  padding: 6px 8px;
  margin-top: 6px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-left: 2px solid var(--c-primary);
}

.npc-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.npc-name {
  font-weight: 700;
}

.npc-favor {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-accent);
}

.favor-track {
  height: 4px;
  margin-top: 4px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.favor-fill {
  height: 100%;
  background: var(--c-accent);
  opacity: 0.7;
  transition: width 0.4s ease;
}

.npc-archive {
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.45;
  color: var(--c-text);
  white-space: pre-wrap;
}
</style>
