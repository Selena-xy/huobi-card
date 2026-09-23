<template>
  <section class="panel">
    <div class="panel-head">
      <span class="label">常驻 NPC 栏</span>
      <span class="count">{{ resident_list.length }}</span>
    </div>

    <p v-if="resident_list.length === 0" class="empty">尚无达成条件的关系</p>

    <table v-else class="ledger">
      <thead>
        <tr>
          <th>姓名</th>
          <th>身份</th>
          <th>关系</th>
          <th class="num">好感度</th>
          <th>档案摘要</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="npc in resident_list" :key="npc.name">
          <td class="strong">{{ npc.name }}</td>
          <td>{{ npc.身份 }}</td>
          <td>{{ npc.关系 }}</td>
          <td class="num favor">{{ npc.好感度 }}</td>
          <td class="archive">{{ npc.档案摘要 }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const resident_list = computed(() =>
  Object.entries(store.data.常驻NPC).map(([name, value]) => ({ name, ...value })),
);
</script>

<style lang="scss" scoped>
.panel {
  padding: 10px;
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

.ledger {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.ledger th,
.ledger td {
  padding: 4px 6px;
  border: 1px solid var(--c-border);
  text-align: left;
  vertical-align: top;
}

.ledger th {
  font-size: 11px;
  font-weight: 400;
  color: var(--c-text-muted);
  background: var(--c-surface);
}

.num {
  font-family: var(--font-mono);
  text-align: right;
}

.favor {
  color: var(--c-accent);
}

.strong {
  font-weight: 700;
}

.archive {
  color: var(--c-text-muted);
}
</style>
