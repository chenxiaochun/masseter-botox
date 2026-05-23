# Botox Units & Cost Calculator — 设计文档

**日期：** 2026-05-22  
**项目：** 面向英语市场的 Botox 单位数与费用计算器工具站  
**目标：** 通过低竞争高商业价值关键词获取 Google 自然流量，以 AdSense 变现

---

## 1. 项目概述

### 定位
- **产品名（暂定）：** Botox Calculator（域名待定）
- **核心价值：** 全球首个覆盖所有面部注射部位的 Botox 单位数 + 费用综合计算器
- **市场：** 英语市场（全球，无地域限制）
- **变现方式：** Google AdSense（美容医疗类 RPM $8-$20）
- **预算：** < $100（域名约 $10/年，其余免费）
- **开发者：** 程序员个人独立开发

### 核心洞察
- 现有竞争者全是本地诊所的「顺手工具」，没有专门做这个的独立站
- Google 将此类查询归类为工具/计算器查询，E-E-A-T 要求低于纯医疗内容
- Botox 是增长趋势类关键词，搜索量持续上升

---

## 2. 关键词策略

### 切入点
以 **masseter botox**（竞争最低）为首个功能上线，积累排名后扩展至全部部位。

### 目标关键词群

| 关键词 | 月搜索量 | 优先级 |
|--------|---------|--------|
| masseter botox cost | 4,700 | 首发 |
| how many units for masseter botox | 1,000 | 首发 |
| masseter botox units | 810 | 首发 |
| botox units chart | 8,000+ | 第二阶段 |
| how many units of botox | 12,000+ | 第二阶段 |
| botox cost calculator | 5,000+ | 第二阶段 |
| forehead botox units | 3,000+ | 第二阶段 |
| botox price calculator | 2,000+ | 第二阶段 |
| 各部位长尾词 | 合计 30,000+ | 持续扩展 |

### SERP 竞争分析
搜索 `masseter botox cost calculator` 的前 5 个结果全部是本地诊所附属页面（doredent.com、yycbotox.com、ellemesmedspa.com 等），无任何独立工具站，竞争极低。

---

## 3. 差异化策略

### 与现有工具的核心差距
| 维度 | 现有诊所工具 | 我们的工具 |
|------|------------|-----------|
| 覆盖部位 | 单一或少数几个 | 全部主流面部注射部位 |
| 地域适配 | 只有本地价格 | 用户选择国家（US/UK/AU/CA），显示对应价格区间 |
| 结果深度 | 只给数字 | 数字 + 解释 + 行动建议 |
| UI 质量 | 诊所附属页，UI 粗糙 | 专注于此，移动端优先 |
| SEO 优化 | 几乎无 | 专项优化 |

### 结果页差异化示例
```
普通工具：Masseter botox: ~30-40 units, $300-$600

我们的工具：
  Masseter Botox Estimate
  ├── Units needed: 30-40 units per side (60-80 total)
  ├── Estimated cost: $300-$800
  ├── Global average: $450
  ├── Your location (US): $400-$800
  └── What this means: This is a standard dose for jaw slimming.
      Results last 4-6 months. First treatment may need less.
```

### 支持的注射部位（分阶段上线）
**第一阶段（首发）**
- Masseter / Jaw Slimming

**第二阶段**
- Forehead Lines
- Frown Lines（11s / Glabellar）
- Crow's Feet

**第三阶段**
- Lip Flip
- Bunny Lines
- Brow Lift
- Neck（Nefertiti Lift）

---

## 4. 技术架构

### 技术栈
| 层次 | 技术 | 理由 |
|------|------|------|
| 框架 | Next.js 15（App Router） | SSG 静态生成，极速加载 |
| 样式 | Tailwind CSS | 快速构建专业 UI |
| 托管 | Vercel 免费套餐 | 全球 CDN，自动 HTTPS |
| 域名 | Namecheap | ~$10/年 |

### URL 结构
- 首发：`/masseter` 为主计算器页，`/` 首页重定向至 `/masseter`
- 扩展后：`/` 变为部位选择总入口，各部位均有独立 URL（`/forehead`、`/frown-lines` 等）
- 独立 URL 设计从第一天就生效，避免后期结构迁移影响已有排名

### 计算器输入字段（Masseter 首发版）
| 字段 | 类型 | 选项 |
|------|------|------|
| Concern | 单选 | Jaw Slimming / Teeth Grinding (Bruxism) |
| Country | 单选 | US / UK / AU / CA / Other |
| First time? | 单选 | Yes / No（影响推荐剂量） |

输出：推荐单位数范围 + 费用区间 + 一句话说明 + 持续时长

### 项目结构
```
seoer/
├── app/
│   ├── layout.tsx              # 全局布局（含 AdSense 脚本）
│   ├── page.tsx                # 首页（部位选择入口，首发时重定向到 /masseter）
│   ├── masseter/page.tsx       # Masseter 计算器（首发主页面）
│   ├── [area]/
│   │   └── page.tsx            # 其他部位页（/forehead, /frown-lines 等）
│   ├── about/page.tsx          # 关于页（AdSense 申请必需）
│   ├── privacy/page.tsx        # 隐私政策页（AdSense 申请必需）
│   ├── sitemap.ts              # 自动生成 sitemap.xml
│   └── robots.ts               # robots.txt
├── components/
│   ├── Calculator.tsx          # 计算器核心组件
│   ├── ResultCard.tsx          # 结果展示（含上下文说明）
│   ├── AreaSelector.tsx        # 部位选择器
│   ├── AdUnit.tsx              # AdSense 广告位组件
│   └── FAQ.tsx                 # FAQ 区块
├── data/
│   └── areas.ts                # 各部位单位数/价格数据
└── public/
```

### 费用
| 项目 | 费用 |
|------|------|
| 域名 | ~$10/年 |
| Vercel 托管 | $0 |
| **总计** | **~$10** |

---

## 5. 页面 SEO 结构

### 首页（Masseter Calculator）布局
```
┌─────────────────────────────────────────┐
│  Header：Logo + 部位导航（各部位入口）   │
│  [横幅广告 响应式]                       │
├─────────────────────────────────────────┤
│  H1：Masseter Botox Calculator          │
│  副标题：Estimate units & cost instantly │
├──────────────┬──────────────────────────┤
│  计算器区域  │  [侧边广告 300x250]       │
│  输入 → 结果 │                          │
├──────────────┴──────────────────────────┤
│  H2：How to use this calculator         │
├─────────────────────────────────────────┤
│  [内容中间广告]                          │
├─────────────────────────────────────────┤
│  H2：Frequently Asked Questions         │
│  （5-8 条，覆盖长尾关键词）              │
└─────────────────────────────────────────┘
```

### 元数据模板
```html
<!-- 首页 -->
<title>Masseter Botox Calculator – Units & Cost Estimator</title>
<meta name="description"
  content="Calculate how many units of Botox you need for masseter 
  jaw slimming and estimate the cost. Free, instant results." />

<!-- 各部位页 -->
<title>Forehead Botox Calculator – Units & Cost | BotoxCalc</title>
```

### 结构化数据
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Botox Units & Cost Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0" }
}
```

### Core Web Vitals 目标
| 指标 | 目标 | 实现方式 |
|------|------|---------|
| LCP | < 2.5s | SSG + Vercel CDN |
| CLS | < 0.1 | 固定广告位尺寸 |
| INP | < 200ms | 纯客户端计算，无网络请求 |

---

## 6. AdSense 变现策略

### 申请前置条件
- 网站有原创内容（计算器 + FAQ + About + Privacy Policy）
- 上线后等待 2-4 周再申请
- 无违规内容，有明确免责声明（非医疗建议）

### 广告位布局
- Header 下方：响应式横幅
- 计算器旁：300x250（桌面端）
- FAQ 上方：响应式内容广告
- 移动端：最多 2 个广告位

### 收益预期
美容医疗类 AdSense RPM 估算 $8-$20。

| 阶段 | 月流量 | 预估月收益 |
|------|--------|-----------|
| 初期（3-6个月） | 300-1,000 UV | $3-$20 |
| 成长期（6-12个月） | 2,000-5,000 UV | $16-$100 |
| 稳定期（1年+，全部位上线） | 10,000+ UV | $80-$200+ |

---

## 7. 上线检查清单

### 上线前
- [ ] 注册域名（含 botox + calculator 关键词）
- [ ] 完成 Masseter Calculator 核心功能
- [ ] 完成 FAQ（最少 5 条）
- [ ] 创建 About 页和 Privacy Policy 页
- [ ] 添加免责声明（For estimation only, not medical advice）
- [ ] 配置 sitemap.xml 和 robots.txt
- [ ] 接入 Google Search Console
- [ ] Lighthouse Performance > 90

### 上线后
- [ ] 提交 sitemap 到 Google Search Console
- [ ] 申请 Google AdSense
- [ ] 监控 Core Web Vitals
- [ ] 确认关键词开始被索引

---

## 8. 成功标准

| 指标 | 6个月目标 | 12个月目标 |
|------|-----------|-----------|
| 目标关键词排名 | 进入前 20 | 进入前 5 |
| 月自然流量 | > 1,000 UV | > 10,000 UV |
| 支持部位数量 | 1 个（Masseter） | 5 个以上 |
| AdSense 月收益 | 申请通过 | > $50 |

---

## 9. 主要风险

| 风险 | 概率 | 应对 |
|------|------|------|
| 关键词搜索量增长不及预期 | 中 | 监控趋势，及时扩展部位 |
| Google 算法更新降权 | 中 | 持续改进工具质量和内容深度 |
| AdSense 申请被拒 | 中 | 确保内容充足，加强 About/Privacy 页 |
| 竞争对手跟进 | 低 | 先发优势 + 持续迭代 |
| 动力耗尽（前期零收益） | 高 | 设定 6 个月验证期，提前接受预期 |
