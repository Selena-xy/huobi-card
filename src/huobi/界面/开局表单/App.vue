<template>
  <div class="setup">
    <header class="setup-head">
      <span class="brand">HUOBI</span>
      <span class="subtitle">开局配置</span>
    </header>

    <p class="hint">逐项选择后提交，世界与身份将按你的选择展开。</p>

    <section class="field">
      <div class="field-label">世界方向</div>
      <div class="chips">
        <button
          v-for="item in WORLDS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: world === item }"
          @click="world = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">性别</div>
      <div class="chips">
        <button
          v-for="item in GENDERS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: gender === item }"
          @click="gender = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">{{ grade_label }}</div>
      <div class="chips">
        <button
          v-for="item in GRADES"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: grade === item }"
          @click="grade = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">身份</div>
      <div v-if="identity_presets.length" class="chips">
        <button
          v-for="item in identity_presets"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: identity === item }"
          @click="identity = item"
        >
          {{ item }}
        </button>
      </div>
      <input v-model="identity" class="input" type="text" :placeholder="identity_placeholder" />
    </section>

    <section v-if="is_male" class="field">
      <div class="field-label">精液等级</div>
      <div class="chips">
        <button
          v-for="item in GRADES"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: semen_grade === item }"
          @click="semen_grade = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">{{ stock_label }}</div>
      <input v-model.number="body_stock" class="input" type="number" min="0" step="1" />
    </section>

    <section class="field">
      <div class="field-label">精元余额（Ṥ）</div>
      <input v-model.number="coin_balance" class="input" type="number" min="0" step="1" />
    </section>

    <section class="field">
      <div class="field-label">起始日期</div>
      <input v-model="start_date" class="input" type="date" />
    </section>

    <section class="field">
      <div class="field-label">起始时间</div>
      <div class="chips">
        <button
          v-for="item in TIME_PRESETS"
          :key="item.value"
          type="button"
          class="chip"
          :class="{ picked: start_time === item.value }"
          @click="start_time = item.value"
        >
          {{ item.label }}
        </button>
      </div>
      <input v-model="start_time" class="input" type="time" />
    </section>

    <section class="field">
      <div class="field-label">起始区域</div>
      <div class="chips">
        <button
          v-for="item in REGIONS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: region === item }"
          @click="region = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">互动玩法</div>
      <div class="chips">
        <button
          v-for="item in PLAYS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: play === item }"
          @click="play = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">性向</div>
      <div class="chips">
        <button
          v-for="item in ORIENTATIONS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: orientation === item }"
          @click="orientation = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">性癖倾向（可多选）</div>
      <div class="chips">
        <button
          v-for="item in KINKS"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: kinks.includes(item) }"
          @click="toggleKink(item)"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <section class="field">
      <div class="field-label">笔触</div>
      <div class="chips">
        <button
          v-for="item in STYLES"
          :key="item"
          type="button"
          class="chip"
          :class="{ picked: pen === item }"
          @click="pen = item"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <button class="submit" type="button" :disabled="!ready || submitting" @click="submit">
      {{ submitting ? '正在展开…' : '确认并开始' }}
    </button>
    <p v-if="!ready" class="warn">请先选定世界方向、性别与身份。</p>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

type World = '律息' | '热值' | '溢流城' | '租界' | '现代';
type Gender = '男' | '女';
type Play = '日常交易求生' | '攻略角色' | '经营账户' | '权力博弈' | '探索剧情';

const WORLDS: World[] = ['律息', '热值', '溢流城', '租界', '现代'];
const GENDERS: Gender[] = ['男', '女'];
const PLAYS: Play[] = ['日常交易求生', '攻略角色', '经营账户', '权力博弈', '探索剧情'];
const REGIONS = ['上海总览', '陆家嘴金融区', '静安娱乐区', '杨浦大学城', '城中村底层区'];
const ORIENTATIONS = ['异', 'BL', 'GL', '双', '灵活'];
const KINKS = ['温柔向', '支配服从', '束缚', '角色扮演', '言语刺激', '露出', '足部', '制服', '母乳', '多P'];
const STYLES = ['含蓄克制', '露骨直白', '感官情绪向', '解剖式'];
const GRADES = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];

const TIME_PRESETS = [
  { label: '清晨 06:00', value: '06:00' },
  { label: '早晨 08:00', value: '08:00' },
  { label: '上午 10:00', value: '10:00' },
  { label: '中午 12:00', value: '12:00' },
  { label: '下午 15:00', value: '15:00' },
  { label: '傍晚 18:00', value: '18:00' },
  { label: '夜晚 21:00', value: '21:00' },
  { label: '深夜 00:00', value: '00:00' },
];

const CAPACITY_TIERS: Record<string, { 型号: string; 容量: number }> = {
  F: { 型号: '家用普通型', 容量: 200 },
  E: { 型号: '家用扩展型', 容量: 500 },
  D: { 型号: '银行支付型', 容量: 1000 },
  C: { 型号: '银行支付型', 容量: 2000 },
  B: { 型号: '银行精品型', 容量: 2500 },
  A: { 型号: '银行精品型', 容量: 3500 },
  S: { 型号: '银行特殊型', 容量: 5000 },
};

const IDENTITY_PRESETS: Partial<Record<World, string[]>> = {
  现代: ['普通白领', '公职人员', '大学生', '自由职业', '精阀后代', '底层打工者', '企业高管'],
};

const store = useDataStore();

const world = ref<World>('现代');
const gender = ref<Gender>('男');
const identity = ref('');
const region = ref('上海总览');
const play = ref<Play>('日常交易求生');
const orientation = ref('异');
const kinks = ref<string[]>([]);
const pen = ref('感官情绪向');
const grade = ref('D');
const semen_grade = ref('D');
const body_stock = ref(0);
const coin_balance = ref(0);
const start_date = ref('2026-09-23');
const start_time = ref('09:00');
const submitting = ref(false);

const identity_presets = computed(() => IDENTITY_PRESETS[world.value] ?? []);
const identity_placeholder = computed(() =>
  identity_presets.value.length ? '也可自行填写其他身份' : '该方向暂未预设身份，请自行填写',
);
const ready = computed(() => Boolean(world.value && gender.value && identity.value.trim()));
const grade_label = computed(() => (gender.value === '男' ? '阴茎等级' : '骚穴等级'));
const is_male = computed(() => gender.value === '男');
const stock_label = computed(() => (is_male.value ? '精能值（ml）' : '子宫仓余额（ml）'));

watch(world, () => {
  if (!identity_presets.value.includes(identity.value)) {
    identity.value = identity_presets.value[0] ?? '';
  }
});

function toggleKink(item: string) {
  const index = kinks.value.indexOf(item);
  if (index >= 0) {
    kinks.value.splice(index, 1);
  } else {
    kinks.value.push(item);
  }
}

function buildSummary() {
  return [
    '【开局配置】',
    `世界方向：${world.value}`,
    `性别：${gender.value}`,
    is_male.value ? `精液等级：${semen_grade.value}` : '',
    `${stock_label.value}：${body_stock.value}`,
    `精元余额：${coin_balance.value}Ṥ`,
    `身份：${identity.value}`,
    `${grade_label.value}：${grade.value}`,
    `起始日期：${start_date.value.replace(/-/g, '/')}`,
    `起始时间：${start_time.value}`,
    `起始区域：${region.value}`,
    `互动玩法：${play.value}`,
    `性向：${orientation.value}`,
    `性癖倾向：${kinks.value.length ? kinks.value.join('、') : '未指定'}`,
    `笔触：${pen.value}`,
  ].filter(Boolean).join('\n');
}

async function submit() {
  if (!ready.value || submitting.value) return;
  submitting.value = true;

  store.data.系统.世界方向 = world.value;
  store.data.主角.性别 = gender.value;
  store.data.主角.身份 = identity.value.trim();
  store.data.主角.精元余额 = Math.max(0, Number(coin_balance.value) || 0);
  if (gender.value === '男') {
    store.data.主角.男.阴茎等级 = grade.value as 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
    store.data.主角.男.精液等级 = semen_grade.value as 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
    store.data.主角.男.精能值 = Math.max(0, Number(body_stock.value) || 0);
  } else {
    store.data.主角.女.骚穴等级 = grade.value as 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
    const tier = CAPACITY_TIERS[grade.value];
    store.data.主角.女.子宫仓.型号 = tier.型号;
    store.data.主角.女.子宫仓.容量 = tier.容量;
    const stock = Math.max(0, Number(body_stock.value) || 0);
    const balance = Math.min(stock, tier.容量);
    store.data.主角.女.子宫仓.余额 = balance;
    store.data.主角.女.淫纹刻度 = Math.round((balance / tier.容量) * 100);
  }
  store.data.系统.日期 = start_date.value.replace(/-/g, '/');
  store.data.系统.时间 = start_time.value;
  store.data.系统.地点.国家 = '中国';
  store.data.系统.地点.城市 = '上海';
  store.data.系统.地点.区域 = region.value;
  store.data.系统.互动玩法 = play.value;
  store.data.系统.NSFW偏好.性向 = orientation.value;
  store.data.系统.NSFW偏好.性癖倾向 = [...kinks.value];
  store.data.系统.NSFW偏好.笔触 = pen.value;

  try {
    await createChatMessages([{ role: 'user', name: '开局配置', message: buildSummary() }]);
    await triggerSlash('/trigger');
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.setup {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 12px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  color: var(--c-text);
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.5;
}

.setup-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--c-border);
}

.brand {
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--c-primary);
}

.subtitle {
  font-size: 12px;
  color: var(--c-text-muted);
}

.hint {
  margin: 8px 0 4px;
  font-size: 12px;
  color: var(--c-text-muted);
}

.field {
  margin-top: 10px;
}

.field-label {
  margin-bottom: 5px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--c-text-muted);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 3px 10px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-text);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.chip.picked {
  border-color: var(--c-primary);
  color: var(--c-primary);
  box-shadow: inset 0 0 0 1px var(--c-primary);
}

.input {
  width: 100%;
  margin-top: 6px;
  padding: 5px 8px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-text);
  font-family: inherit;
  font-size: 12px;
}

.input:focus {
  outline: none;
  border-color: var(--c-primary);
}

.submit {
  width: 100%;
  margin-top: 14px;
  padding: 8px;
  background: var(--c-primary);
  border: none;
  color: var(--c-bg);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.warn {
  margin-top: 6px;
  font-size: 12px;
  color: var(--c-warning);
}
</style>
