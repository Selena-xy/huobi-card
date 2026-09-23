<template>
  <section class="hero">
    <div class="identity">
      <span class="label">主角</span>
      <span class="chip">{{ store.data.主角.性别 }}</span>
      <span class="identity-text">{{ store.data.主角.身份 }}</span>
    </div>

    <div class="balance">
      <span class="label">精元余额</span>
      <span class="balance-value">{{ store.data.主角.精元余额 }}</span>
      <span class="unit">Ṥ</span>
    </div>

    <div v-if="is_male" class="grid">
      <div class="cell">
        <span class="label">精能值</span>
        <span class="readout" :class="energy_class">{{ store.data.主角.男.精能值 }} ml</span>
      </div>
      <div class="cell">
        <span class="label">精液等级</span>
        <span class="readout grade">{{ store.data.主角.男.精液等级 }}</span>
      </div>
      <div class="cell">
        <span class="label">今日服药量</span>
        <span class="readout">{{ store.data.主角.男.今日服药量 }}</span>
      </div>
      <div class="cell">
        <span class="label">不应期</span>
        <span class="readout">{{ store.data.主角.男.不应期 }}</span>
      </div>
      <div class="cell">
        <span class="label">勃起状态</span>
        <span class="readout">{{ store.data.主角.男.勃起状态 }}</span>
      </div>
    </div>

    <div v-else class="grid">
      <div class="cell">
        <span class="label">子宫仓型号</span>
        <span class="readout">{{ store.data.主角.女.子宫仓.型号 }}</span>
      </div>
      <div class="cell">
        <span class="label">仓内余额</span>
        <span class="readout">
          {{ store.data.主角.女.子宫仓.余额 }} / {{ store.data.主角.女.子宫仓.容量 }} ml
        </span>
      </div>
      <div class="cell">
        <span class="label">发情状态</span>
        <span class="readout">{{ store.data.主角.女.发情状态 }}</span>
      </div>
      <div class="cell">
        <span class="label">小腹状态</span>
        <span class="readout">{{ store.data.主角.女.小腹状态 }}</span>
      </div>
      <div class="cell mark-cell">
        <span class="label">淫纹刻度</span>
        <div class="mark-track">
          <div class="mark-fill" :class="mark_class" :style="{ width: mark_percent + '%' }"></div>
        </div>
        <span class="readout">{{ store.data.主角.女.淫纹刻度 }}%</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const is_male = computed(() => store.data.主角.性别 === '男');
const mark_percent = computed(() => store.data.主角.女.淫纹刻度);

const energy_class = computed(() => {
  const value = store.data.主角.男.精能值;
  if (value > 300) return 'readout-danger';
  if (value > 200) return 'readout-warning';
  return '';
});

const mark_class = computed(() => {
  const value = store.data.主角.女.淫纹刻度;
  if (value >= 90) return 'mark-full';
  if (value >= 70) return 'mark-high';
  return '';
});
</script>

<style lang="scss" scoped>
.hero {
  padding: 10px;
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.identity,
.balance {
  display: flex;
  align-items: center;
  gap: 8px;
}

.balance {
  margin-top: 6px;
}

.label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
}

.chip {
  padding: 1px 7px;
  border: 1px solid var(--c-border);
  font-size: 11px;
}

.identity-text {
  font-size: 12px;
}

.balance-value {
  font-family: var(--font-mono);
  font-size: 26px;
  font-weight: 700;
  color: var(--c-primary);
  line-height: 1.1;
}

.unit {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--c-primary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1px;
  margin-top: 8px;
  background: var(--c-border);
  border: 1px solid var(--c-border);
}

.cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  background: var(--c-bg);
}

.readout {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--c-text);
}

.grade {
  color: var(--c-primary);
  font-weight: 700;
}

.readout-warning {
  color: var(--c-warning);
}

.readout-danger {
  color: var(--c-warning-deep);
  animation: pulse 1.4s ease-in-out infinite;
}

.mark-cell {
  grid-column: 1 / -1;
}

.mark-track {
  height: 10px;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  overflow: hidden;
}

.mark-fill {
  height: 100%;
  width: 0;
  background: var(--c-accent);
  opacity: 0.55;
  transition:
    width 0.6s ease,
    opacity 0.6s ease,
    box-shadow 0.6s ease;
}

.mark-high {
  opacity: 0.85;
  box-shadow: 0 0 8px var(--c-accent);
}

.mark-full {
  opacity: 1;
  box-shadow: 0 0 14px var(--c-accent);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
}
</style>
