// MVU 变量结构 —— 精液货币化世界（现代版打样）
// 顶层 4 个命名空间：系统 / 主角 / 常驻NPC / 在场NPC
// 依赖运行时注入的全局 z（Zod 4）与 _（lodash），顶部禁止 import
export const Schema = z.object({
  // ── 系统：世界方向、时空与开局偏好 ──
  系统: z
    .object({
      世界方向: z.enum(['律息', '热值', '溢流城', '租界', '现代']).prefault('现代'),
      日期: z.templateLiteral([z.number(), '/', z.number(), '/', z.number()]).prefault('2026/09/23'),
      时间: z.templateLiteral([z.number(), ':', z.number()]).prefault('09:00'),
      地点: z
        .object({
          国家: z.string().prefault('中国'),
          城市: z.string().prefault('上海'),
          区域: z.string().prefault('上海总览'),
        })
        .prefault({}),
      互动玩法: z
        .enum(['日常交易求生', '攻略角色', '经营账户', '权力博弈', '探索剧情'])
        .prefault('日常交易求生'),
      天数: z.coerce.number().prefault(1),
      状态: z.enum(['日常', '事件']).prefault('日常'),
      NSFW偏好: z
        .object({
          性向: z.string().prefault('异'),
          性癖倾向: z.array(z.string()).prefault([]),
          笔触: z.string().prefault('感官情绪向'),
        })
        .prefault({}),
    })
    .prefault({}),

  // ── 主角：性别分叉的两套实时数据（男 / 女 由 性别 决定显隐） ──
  主角: z
    .object({
      性别: z.enum(['男', '女']).prefault('男'),
      身份: z.string().prefault('普通白领'),
      精元余额: z.coerce.number().prefault(0),
      男: z
        .object({
          精能值: z.coerce.number().prefault(0),
          精液等级: z.enum(['F', 'E', 'D', 'C', 'B', 'A', 'S']).prefault('D'),
          今日服药量: z.coerce.number().prefault(0),
          不应期: z.string().prefault('30 分钟'),
          勃起状态: z.string().prefault('疲软'),
        })
        .prefault({}),
      女: z
        .object({
          子宫仓: z
            .object({
              型号: z.string().prefault('家用普通型'),
              余额: z.coerce.number().prefault(0),
              容量: z.coerce.number().prefault(200),
            })
            .prefault({}),
          淫纹刻度: z.coerce.number().transform((value) => _.clamp(value, 0, 100)).prefault(0),
          发情状态: z.string().prefault('未发情'),
          小腹状态: z.string().prefault('平坦'),
        })
        .prefault({}),
    })
    .prefault({}),

  // ── 常驻NPC：NPC 姓名作动态键，可整体清空 ──
  常驻NPC: z
    .record(
      z.string().describe('NPC 姓名'),
      z.object({
        身份: z.string().prefault(''),
        好感度: z.coerce.number().transform((value) => _.clamp(value, 0, 100)).prefault(0),
        关系: z.string().prefault(''),
        档案摘要: z.string().prefault(''),
        加入时间: z.string().prefault(''),
      }),
    )
    .prefault({}),

  // ── 在场NPC：本轮在场 NPC，姓名作动态键，可整体清空 ──
  在场NPC: z
    .record(
      z.string().describe('NPC 姓名'),
      z.object({
        本轮档案: z.string().prefault(''),
        好感度: z.coerce.number().transform((value) => _.clamp(value, 0, 100)).prefault(0),
      }),
    )
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
