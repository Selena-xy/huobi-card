<template>
  <div class="topbar">
    <button class="head" type="button" @click="emit('toggle')">
      <span class="brand">HUOBI</span>
      <span class="chip chip-world">{{ store.data.系统.世界方向 }}</span>
      <span class="chip" :class="is_event ? 'chip-event' : 'chip-daily'">{{ store.data.系统.状态 }}</span>
      <span class="caret">{{ expanded ? '收起' : '展开' }}</span>
    </button>

    <div class="meta">
      <span class="readout">{{ store.data.系统.日期 }}</span>
      <span class="sep">/</span>
      <span class="readout">{{ store.data.系统.时间 }}</span>
      <span class="sep">/</span>
      <span class="readout">第 {{ store.data.系统.天数 }} 天</span>
      <span class="loc">{{ store.data.系统.地点.城市 }} · {{ store.data.系统.地点.区域 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

defineProps<{ expanded: boolean }>();
const emit = defineEmits<{ toggle: [] }>();

const store = useDataStore();
const is_event = computed(() => store.data.系统.状态 === '事件');
</script>

<style lang="scss" scoped>
.topbar {
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  text-align: left;
}

.brand {
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--c-primary);
}

.chip {
  padding: 1px 7px;
  border: 1px solid var(--c-border);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.chip-world {
  color: var(--c-primary);
  border-color: var(--c-primary);
}

.chip-daily {
  color: var(--c-success);
  border-color: var(--c-success);
}

.chip-event {
  color: var(--c-warning);
  border-color: var(--c-warning);
}

.caret {
  margin-left: auto;
  font-size: 11px;
  color: var(--c-text-muted);
}

.meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 10px 8px;
  font-size: 11px;
  color: var(--c-text-muted);
}

.readout {
  font-family: var(--font-mono);
  color: var(--c-text);
}

.sep {
  opacity: 0.4;
}

.loc {
  margin-left: auto;
}
</style>
