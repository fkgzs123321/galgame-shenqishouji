import * as __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_gh_StageDog_tavern_resource_dist_util_mvu_zod_js_8998c919__ from "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js";

var __webpack_modules__ = {
  "./src/神奇手机/神奇手机/schema.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      Schema: () => Schema
    });
    var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js");
    function 中文数字转数(s) {
      const 表 = {
        零: 0,
        〇: 0,
        一: 1,
        二: 2,
        两: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9
      };
      const 单位 = {
        十: 10,
        百: 100,
        千: 1e3,
        万: 1e4,
        亿: 1e8
      };
      const t = s.trim();
      if (!/^[零〇一二两三四五六七八九十百千万亿]+$/.test(t)) return null;
      if (t.length === 1 && 表[t] !== undefined) return 表[t];
      let 总 = 0, 当前 = 0;
      for (const ch of t) {
        if (表[ch] !== undefined) 当前 = 表[ch]; else if (单位[ch] !== undefined) {
          const u = 单位[ch];
          if (u >= 1e4) {
            总 = (总 + (当前 || 1)) * u;
            当前 = 0;
          } else {
            总 += (当前 || 1) * u;
            当前 = 0;
          }
        } else return null;
      }
      return 总 + 当前;
    }
    function 转数字(v) {
      if (typeof v === "number") return Number.isFinite(v) ? v : null;
      if (typeof v === "boolean") return v ? 1 : 0;
      if (v === null || v === undefined) return null;
      if (Array.isArray(v)) return v.length === 0 ? null : 转数字(v[0]);
      if (typeof v === "string") {
        let s = v.replace(/[０-９．]/g, c => String.fromCharCode(c.charCodeAt(0) - 65248)).trim();
        s = s.replace(/[，,]/g, "").replace(/[级分点个次元%％]/g, "").trim();
        if (s === "") return null;
        const n = Number(s);
        if (Number.isFinite(n)) return n;
        const cn = 中文数字转数(s);
        if (cn !== null) return cn;
        const m = s.match(/-?\d+(\.\d+)?/);
        if (m) {
          const x = Number(m[0]);
          return Number.isFinite(x) ? x : null;
        }
        const cn2 = s.match(/[零〇一二两三四五六七八九十百千万亿]+/);
        if (cn2) return 中文数字转数(cn2[0]);
        return null;
      }
      if (typeof v === "object") {
        for (const k of [ "值", "value", "数值", "amount" ]) {
          if (k in v) return 转数字(v[k]);
        }
        return null;
      }
      return null;
    }
    function 数(默认值, lo, hi) {
      return zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
        let n = 转数字(v);
        if (n === null) n = 默认值;
        n = Math.round(n);
        if (lo !== undefined) n = Math.max(lo, n);
        if (hi !== undefined) n = Math.min(hi, n);
        return n;
      }, zod__WEBPACK_IMPORTED_MODULE_0__.number());
    }
    function 串数组(默认 = []) {
      return zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
        if (v === undefined || v === null) return 默认;
        if (Array.isArray(v)) {
          return v.filter(x => x !== null && x !== undefined && x !== "").map(x => String(x).trim()).filter(Boolean);
        }
        if (typeof v === "string") {
          const 切 = v.split(/[、,，;；|]/).map(x => x.trim()).filter(Boolean);
          return 切.length ? 切 : 默认;
        }
        return [ String(v) ];
      }, zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.string()));
    }
    const Schema = zod__WEBPACK_IMPORTED_MODULE_0__.object({
      世界: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        日期: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("2025-10-07"),
        时刻: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("23:47"),
        星期: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("二"),
        当前位置: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("家"),
        时间戳: zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
          const n = 转数字(v);
          return n === null ? Date.now() : n;
        }, zod__WEBPACK_IMPORTED_MODULE_0__.number())
      }).prefault({}),
      手机: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        三定律: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          绝对匿名: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(true),
          绝对知情: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(true),
          绝对脱身: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(true)
        }).prefault({}),
        等级: 数(1, 1),
        经验: 数(0, 0, 999999),
        曾达最高: 数(1, 1),
        属性点: 数(0, 0, 999),
        已解锁动作: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.string()).prefault([]),
        冷却中: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        冷却剩余: 数(0, 0),
        暴露感: 数(0, 0, 100),
        连败计数: 数(0, 0),
        越界次数: 数(0, 0),
        衰减记录: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          时间: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
          原因: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
          掉级: 数(0)
        })).prefault([]),
        关于你: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          时间: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
          你做了什么: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
          你没删掉的那一版: zod__WEBPACK_IMPORTED_MODULE_0__.string()
        })).prefault([]),
        触碰到边界: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          位置: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
          现象: zod__WEBPACK_IMPORTED_MODULE_0__.string()
        })).prefault([]),
        APP状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "展开", "待机" ]).prefault("展开"),
        备忘录: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          标题: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          类型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          相关角色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          详细内容: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          当前状态: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          记录时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          约定时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          后续结果: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        })).prefault([]),
        物品: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          名称: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          类型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          数量: 数(1, 0),
          描述: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        })).prefault([]),
        相册: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          id: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          地点: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          描述: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          照片引用: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        })).prefault([]),
        探头: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
          对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          地点: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          功能: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.string()).prefault([]),
          放置时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "在", "被发现", "没电", "被拆" ]).prefault("在")
        })).prefault([])
      }).prefault({}),
      属性: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        持久: 数(2, 1, 10),
        恢复: 数(2, 1, 10),
        硬度: 数(2, 1, 10),
        体力: 数(2, 1, 10),
        感知: 数(2, 1, 10),
        尺寸控制: 数(3, 1, 10),
        强壮: 数(2, 1, 10),
        魅力: 数(2, 1, 10),
        时机: 数(2, 1, 10),
        读人: 数(2, 1, 10),
        气场: 数(2, 1, 10),
        收尾: 数(2, 1, 10)
      }).prefault({}),
      技能: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string(), 数(0, 0, 3)).prefault({}),
      积分: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        总: 数(0, 0),
        可用: 数(0, 0),
        充值累计: 数(0, 0)
      }).prefault({}),
      声誉: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        值: 数(50, 0, 100),
        被谁接纳: 串数组([]),
        被谁排除: 串数组([])
      }).prefault({}),
      站点: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string().describe("站点名"), zod__WEBPACK_IMPORTED_MODULE_0__.object({
        账号: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未注册"),
        积分: 数(0, 0),
        等级: 数(1, 1, 100),
        经验值: 数(0, 0, 99),
        累计次数: 数(0, 0),
        五星数: 数(0, 0),
        四星数: 数(0, 0),
        订阅: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "无", "弱鸡", "普通", "老色批" ]).prefault("无"),
        订阅剩余: 数(0, 0),
        免费额度: 数(0, 0),
        状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "未注册", "已注册", "已认证", "受限", "封号" ]).prefault("未注册")
      }).prefault({})).prefault({}),
      地区: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string().describe("地区名"), zod__WEBPACK_IMPORTED_MODULE_0__.object({
        已到过: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        当前停留: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        锁在哪: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        她为什么在这: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        对你的威胁: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        对她的威胁: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        只有这里能做: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        这里做不到: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        三个词: 串数组([]),
        一个场景: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        有锚点: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false)
      }).prefault({})).prefault({}),
      任务: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
        名: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        档: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "活", "局", "抢" ]).prefault("活"),
        来源: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "收到消息", "犹豫", "接了", "在做", "成了", "砸了", "没下文", "反噬" ]).prefault("收到消息"),
        前金: 数(0, 0),
        报酬: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        他知道的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        他不知道的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        岔子: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        任务点: 数(0, 0),
        现金变化: 数(0),
        声誉变化: 数(0)
      })).prefault([]),
      产业: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
        名: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        在哪: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        月产出: 数(0, 0),
        维护费: 数(0, 0),
        健康度: 数(100, 0, 100),
        风险: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
      })).prefault([]),
      人物: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string().describe("人物代号"), zod__WEBPACK_IMPORTED_MODULE_0__.object({
        代号: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        地区: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        来源: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        原型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        动机: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
        处境: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        退路: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("模糊"),
        冲突: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        具体细节: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        外貌: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          年龄: 数(25, 18),
          身高: 数(160),
          体型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          肤色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          肤质: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          瑕疵: 串数组([]),
          体毛: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          胸: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            尺寸: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            形状: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            乳头: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            乳晕: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            下垂度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            间距: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            手感: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          腰腹: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          臀: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          腿: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          毛发: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          五官: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            脸型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            眼型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            瞳色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            眼妆: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            眉毛: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            鼻型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            唇型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            唇色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            牙齿: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            下巴: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            耳型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            脖型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            素颜感: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            妆感: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            发型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            发色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            发质: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            发长: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            声线印象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            惯常表情: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          私处: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            阴阜: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            大阴唇形状: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            大阴唇颜色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            大阴唇饱满度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            小阴唇形状: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            小阴唇颜色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            小阴唇外露度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            小阴唇对称性: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴蒂大小: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴蒂包皮: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴道口形状: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴道紧度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴道褶皱: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            阴道深度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            分泌物量: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            分泌物色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            分泌物质: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            分泌物味: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            会阴: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            肛门颜色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            肛门形状: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            处女膜: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            整体观感: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            性病: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
              病种: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              病原: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              分期: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("潜伏期"),
              部位: 串数组([]),
              体征: 串数组([]),
              分泌物: zod__WEBPACK_IMPORTED_MODULE_0__.object({
                量: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
                色: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
                质: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
                味: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
              }).prefault({}),
              疼痛度: 数(0, 0, 100),
              瘙痒度: 数(0, 0, 100),
              传染性: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("低"),
              治疗: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未诊治"),
              痕迹: 串数组([]),
              确诊日: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              来源对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              暴露: 串数组([]),
              公开度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("仅自己知道")
            }).prefault({})).prefault([]),
            病痕: 串数组([]),
            免疫记忆: 串数组([])
          }).prefault({}),
          阴部: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          味道: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          声音: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          气味: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          特征: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          反直觉项: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          穿搭: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            上装: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            下装: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            内衣: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            内裤: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            袜子: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            鞋子: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            饰品: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            妆容: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            风格: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            暴露度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            场合适配: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            破绽: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({})
        }).prefault({}),
        性: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          经验度: 数(3, 1, 5),
          阈值: 数(60, 20, 100),
          敏感度: 数(5, 1, 10),
          体力: 数(5, 1, 10),
          偏好尺寸: 数(14, 8, 25),
          湿润度: 数(5, 1, 10),
          敏感点: 串数组([]),
          禁区: 串数组([]),
          癖好: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("无"),
          主动类型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("配合型"),
          高潮表现: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          事后: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        }).prefault({}),
        体格: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          力量: 数(30, 1, 100),
          体重: 数(58, 35, 130),
          反应: 数(45, 1, 100),
          嗓门: 数(50, 1, 100),
          搏斗经验: 数(0, 0, 100)
        }).prefault({}),
        性数据: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          阈值: 数(60, 1, 100),
          经验度: 数(30, 0, 100),
          敏感度: 数(50, 1, 100),
          体力: 数(40, 1, 100),
          主动度: 数(45, 1, 100),
          偏好尺寸: 数(13.5, 9, 20),
          出声: 数(45, 0, 100),
          湿速: 数(45, 1, 100),
          恢复: 数(55, 1, 100),
          湿润度: 数(0, 0, 100),
          已高潮次数: 数(0, 0)
        }).prefault({}),
        防御: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          戒备: 数(45, 1, 100),
          处境紧: 数(35, 1, 100),
          判断力: 数(40, 1, 100),
          手段: 数(10, 0, 100)
        }).prefault({}),
        难度: 数(50, 0, 100),
        打字习惯: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("普通"),
        主动度: 数(3, 1, 5),
        尺度节奏: 数(3, 1, 5),
        性格型: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "内收型", "表演型", "计算型", "硬撑型", "讨好型", "玩家型", "话题型", "忽然型", "年长型", "新来型", "双面型", "飘型" ]).prefault("内收型"),
        八轴: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          社交能量: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("内向"),
          风险偏好: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("谨慎"),
          情感表达: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("内收"),
          权力倾向: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("讨好"),
          现实感: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("务实"),
          冲突反应: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("僵"),
          身体自觉: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("羞耻"),
          对钱的态度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("工具")
        }).prefault({}),
        扩展: zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => typeof v === "string" ? {
          语域: v
        } : v || {}, zod__WEBPACK_IMPORTED_MODULE_0__.object({
          语域: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          口音: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          混合语: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          沉默方式: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          年代印记: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          历史事件: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          个人纪年: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          作息: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          主要媒介: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          媒介能看见: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          媒介看不见: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          设备: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          媒介失真: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          手机型号: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          车: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          住所: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          随身物: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          宠物: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          谁的地盘: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          谁能进: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          谁在看: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          私密度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          慢病: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          精神: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          药物: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          成瘾: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          性病携带: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("完全健康"),
          生育实况: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未孕未育"),
          涉毒成瘾: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("完全不碰"),
          陷阱设局: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("真实素人 (无陷阱)"),
          伏击战力: 数(0),
          伏击详情: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("无埋伏"),
          骗局: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          勒索链条: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          交易链: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          涉罪: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          消失方式: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          长线终点: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        }).prefault({})).prefault({}),
        关系进度: 数(0, 0, 10),
        线程温度: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "热", "温", "冷", "挂起", "断线" ]).prefault("温"),
        内容开放: 数(0, 0, 5),
        人的开放: 数(0, 0, 5),
        玩法开放: 数(0, 0, 5),
        圈子: 串数组([]),
        权力位置: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("平等"),
        近况: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        最后互动: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        已听过声音: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        已见过真人: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        评价: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未评价"),
        已上过: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        私密档案: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          配偶: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            姓名: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("无"),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("单身"),
            婚姻实况: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未婚"),
            对丈夫态度: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          初夜: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            怎么发生的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            当时感觉: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          最近性行为: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            怎么发生的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            当时感觉: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          最佳性行为: zod__WEBPACK_IMPORTED_MODULE_0__.object({
            时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未知"),
            怎么发生的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            当时感觉: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          }).prefault({}),
          出轨记录: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
            时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            次数: 数(1, 1),
            怎么发生的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            当时感觉: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
          })).prefault([]),
          致命把柄: 串数组([]),
          遮掩手段: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("无遮掩"),
          拦截记录: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
            时间: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
            聊天对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("老公"),
            关系: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("合法丈夫"),
            掩护手段: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("设为免打扰并秒删聊天记录"),
            对话: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
              发信人: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              内容: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
              是草稿: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
              已撤回或删除: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false)
            })).prefault([])
          })).prefault([])
        }).prefault({})
      }).prefault({})).prefault({}),
      位子: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string().describe("位子名"), zod__WEBPACK_IMPORTED_MODULE_0__.object({
        层级: 数(1, 1, 5),
        持有者: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("无"),
        是你吗: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().prefault(false),
        怎么拿的: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "正取", "夺", "硬闯", "未拿" ]).prefault("未拿"),
        他们怎么看: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "服", "忍着", "不服", "要报仇" ]).prefault("服")
      }).prefault({})).prefault({}),
      判定记录: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
        回合: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        类型: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        我方值: 数(0),
        对方值: 数(0),
        差值: 数(0),
        结果: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
      })).prefault([]),
      生育线: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.object({
        对象: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "无", "疑似", "已确认", "已处理", "已排除" ]).prefault("无"),
        是谁的: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        判定日: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        记录于: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
        她的选择: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("未决定")
      })).prefault([]),
      玩家: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        现实身份: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("24岁独居青年"),
        感情状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "单身", "恋爱中", "已婚", "已婚有孩子" ]).prefault("单身"),
        现金: 数(2e4, 0),
        任务点: 数(0, 0),
        耐受度: 数(0, 0, 100),
        起点: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "顺风", "标准", "硬核" ]).prefault("标准"),
        伤: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          程度: 数(0, 0, 10),
          恢复天数: 数(0, 0, 180),
          起因: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          伤于: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault("")
        }).prefault({}),
        病: zod__WEBPACK_IMPORTED_MODULE_0__.object({
          状态: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "未感染", "潜伏", "已发病", "已治愈" ]).prefault("未感染"),
          是哪种: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          从谁: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          发现于: zod__WEBPACK_IMPORTED_MODULE_0__.string().prefault(""),
          感染进度: 数(0, 0, 100),
          治疗进度: 数(0, 0, 100),
          阻断药剩: 数(0, 0, 28)
        }).prefault({})
      }).prefault({}),
      已购: 串数组([]),
      设定: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        文风: zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
          const 列 = v === undefined || v === null ? [ "混合母猪" ] : Array.isArray(v) ? v : typeof v === "string" ? v.split(/[、,，;；|]/) : [ v ];
          const 合法 = [ "混合母猪", "论坛实录", "写实克制" ];
          const 洗 = 列.map(x => String(x).trim()).filter(x => 合法.includes(x));
          return 洗.length ? 洗 : [ "混合母猪" ];
        }, zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "混合母猪", "论坛实录", "写实克制" ]))),
        尺度: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "全开", "侧重" ]).prefault("全开"),
        难度: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([ "顺风", "标准", "硬核" ]).prefault("标准")
      }).prefault({})
    });
  },
  "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js"(module) {
    module.exports = __WEBPACK_EXTERNAL_MODULE_https_testingcf_jsdelivr_net_gh_StageDog_tavern_resource_dist_util_mvu_zod_js_8998c919__;
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      ZodError: () => ZodError,
      ZodRealError: () => ZodRealError
    });
    var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js");
    var _core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const initializer = (inst, issues) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodError.init(inst, issues);
      inst.name = "ZodError";
      Object.defineProperties(inst, {
        format: {
          value: mapper => _core_index_js__WEBPACK_IMPORTED_MODULE_1__.formatError(inst, mapper)
        },
        flatten: {
          value: mapper => _core_index_js__WEBPACK_IMPORTED_MODULE_1__.flattenError(inst, mapper)
        },
        addIssue: {
          value: issue => {
            inst.issues.push(issue);
            inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
          }
        },
        addIssues: {
          value: issues => {
            inst.issues.push(...issues);
            inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
          }
        },
        isEmpty: {
          get() {
            return inst.issues.length === 0;
          }
        }
      });
    };
    const ZodError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer);
    const ZodRealError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer, {
      Parent: Error
    });
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      ZodISODate: () => ZodISODate,
      ZodISODateTime: () => ZodISODateTime,
      ZodISODuration: () => ZodISODuration,
      ZodISOTime: () => ZodISOTime,
      date: () => date,
      datetime: () => datetime,
      duration: () => duration,
      time: () => time
    });
    var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js");
    var _schemas_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schemas.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js");
    const ZodISODateTime = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODateTime", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODateTime.init(inst, def);
      _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
    });
    function datetime(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDateTime(ZodISODateTime, params);
    }
    const ZodISODate = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODate", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODate.init(inst, def);
      _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
    });
    function date(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDate(ZodISODate, params);
    }
    const ZodISOTime = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISOTime", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISOTime.init(inst, def);
      _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
    });
    function time(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoTime(ZodISOTime, params);
    }
    const ZodISODuration = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODuration", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODuration.init(inst, def);
      _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
    });
    function duration(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDuration(ZodISODuration, params);
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      decode: () => decode,
      decodeAsync: () => decodeAsync,
      encode: () => encode,
      encodeAsync: () => encodeAsync,
      parse: () => parse,
      parseAsync: () => parseAsync,
      safeDecode: () => safeDecode,
      safeDecodeAsync: () => safeDecodeAsync,
      safeEncode: () => safeEncode,
      safeEncodeAsync: () => safeEncodeAsync,
      safeParse: () => safeParse,
      safeParseAsync: () => safeParseAsync
    });
    var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js");
    var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js");
    const parse = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const parseAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeParse = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeParseAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const encode = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._encode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const decode = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._decode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const encodeAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._encodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const decodeAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._decodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeEncode = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeEncode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeDecode = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeDecode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeEncodeAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeEncodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
    const safeDecodeAsync = _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeDecodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      ZodAny: () => ZodAny,
      ZodArray: () => ZodArray,
      ZodBase64: () => ZodBase64,
      ZodBase64URL: () => ZodBase64URL,
      ZodBigInt: () => ZodBigInt,
      ZodBigIntFormat: () => ZodBigIntFormat,
      ZodBoolean: () => ZodBoolean,
      ZodCIDRv4: () => ZodCIDRv4,
      ZodCIDRv6: () => ZodCIDRv6,
      ZodCUID: () => ZodCUID,
      ZodCUID2: () => ZodCUID2,
      ZodCatch: () => ZodCatch,
      ZodCodec: () => ZodCodec,
      ZodCustom: () => ZodCustom,
      ZodCustomStringFormat: () => ZodCustomStringFormat,
      ZodDate: () => ZodDate,
      ZodDefault: () => ZodDefault,
      ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
      ZodE164: () => ZodE164,
      ZodEmail: () => ZodEmail,
      ZodEmoji: () => ZodEmoji,
      ZodEnum: () => ZodEnum,
      ZodExactOptional: () => ZodExactOptional,
      ZodFile: () => ZodFile,
      ZodFunction: () => ZodFunction,
      ZodGUID: () => ZodGUID,
      ZodIPv4: () => ZodIPv4,
      ZodIPv6: () => ZodIPv6,
      ZodIntersection: () => ZodIntersection,
      ZodJWT: () => ZodJWT,
      ZodKSUID: () => ZodKSUID,
      ZodLazy: () => ZodLazy,
      ZodLiteral: () => ZodLiteral,
      ZodMAC: () => ZodMAC,
      ZodMap: () => ZodMap,
      ZodNaN: () => ZodNaN,
      ZodNanoID: () => ZodNanoID,
      ZodNever: () => ZodNever,
      ZodNonOptional: () => ZodNonOptional,
      ZodNull: () => ZodNull,
      ZodNullable: () => ZodNullable,
      ZodNumber: () => ZodNumber,
      ZodNumberFormat: () => ZodNumberFormat,
      ZodObject: () => ZodObject,
      ZodOptional: () => ZodOptional,
      ZodPipe: () => ZodPipe,
      ZodPrefault: () => ZodPrefault,
      ZodPreprocess: () => ZodPreprocess,
      ZodPromise: () => ZodPromise,
      ZodReadonly: () => ZodReadonly,
      ZodRecord: () => ZodRecord,
      ZodSet: () => ZodSet,
      ZodString: () => ZodString,
      ZodStringFormat: () => ZodStringFormat,
      ZodSuccess: () => ZodSuccess,
      ZodSymbol: () => ZodSymbol,
      ZodTemplateLiteral: () => ZodTemplateLiteral,
      ZodTransform: () => ZodTransform,
      ZodTuple: () => ZodTuple,
      ZodType: () => ZodType,
      ZodULID: () => ZodULID,
      ZodURL: () => ZodURL,
      ZodUUID: () => ZodUUID,
      ZodUndefined: () => ZodUndefined,
      ZodUnion: () => ZodUnion,
      ZodUnknown: () => ZodUnknown,
      ZodVoid: () => ZodVoid,
      ZodXID: () => ZodXID,
      ZodXor: () => ZodXor,
      _ZodString: () => _ZodString,
      _default: () => _default,
      _function: () => _function,
      any: () => any,
      array: () => array,
      base64: () => base64,
      base64url: () => base64url,
      bigint: () => bigint,
      boolean: () => boolean,
      catch: () => _catch,
      check: () => check,
      cidrv4: () => cidrv4,
      cidrv6: () => cidrv6,
      codec: () => codec,
      cuid: () => cuid,
      cuid2: () => cuid2,
      custom: () => custom,
      date: () => date,
      describe: () => describe,
      discriminatedUnion: () => discriminatedUnion,
      e164: () => e164,
      email: () => email,
      emoji: () => emoji,
      enum: () => _enum,
      exactOptional: () => exactOptional,
      file: () => file,
      float32: () => float32,
      float64: () => float64,
      function: () => _function,
      guid: () => guid,
      hash: () => hash,
      hex: () => hex,
      hostname: () => hostname,
      httpUrl: () => httpUrl,
      instanceof: () => _instanceof,
      int: () => int,
      int32: () => int32,
      int64: () => int64,
      intersection: () => intersection,
      invertCodec: () => invertCodec,
      ipv4: () => ipv4,
      ipv6: () => ipv6,
      json: () => json,
      jwt: () => jwt,
      keyof: () => keyof,
      ksuid: () => ksuid,
      lazy: () => lazy,
      literal: () => literal,
      looseObject: () => looseObject,
      looseRecord: () => looseRecord,
      mac: () => mac,
      map: () => map,
      meta: () => meta,
      nan: () => nan,
      nanoid: () => nanoid,
      nativeEnum: () => nativeEnum,
      never: () => never,
      nonoptional: () => nonoptional,
      null: () => _null,
      nullable: () => nullable,
      nullish: () => nullish,
      number: () => number,
      object: () => object,
      optional: () => optional,
      partialRecord: () => partialRecord,
      pipe: () => pipe,
      prefault: () => prefault,
      preprocess: () => preprocess,
      promise: () => promise,
      readonly: () => readonly,
      record: () => record,
      refine: () => refine,
      set: () => set,
      strictObject: () => strictObject,
      string: () => string,
      stringFormat: () => stringFormat,
      stringbool: () => stringbool,
      success: () => success,
      superRefine: () => superRefine,
      symbol: () => symbol,
      templateLiteral: () => templateLiteral,
      transform: () => transform,
      tuple: () => tuple,
      uint32: () => uint32,
      uint64: () => uint64,
      ulid: () => ulid,
      undefined: () => _undefined,
      union: () => union,
      unknown: () => unknown,
      url: () => url,
      uuid: () => uuid,
      uuidv4: () => uuidv4,
      uuidv6: () => uuidv6,
      uuidv7: () => uuidv7,
      void: () => _void,
      xid: () => xid,
      xor: () => xor
    });
    var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js");
    var _core_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js");
    var _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/json-schema-processors.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js");
    var _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/to-json-schema.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js");
    var _iso_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./iso.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js");
    var _parse_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./parse.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js");
    const _installedGroups = new WeakMap;
    function _installLazyMethods(inst, group, methods) {
      const proto = Object.getPrototypeOf(inst);
      let installed = _installedGroups.get(proto);
      if (!installed) {
        installed = new Set;
        _installedGroups.set(proto, installed);
      }
      if (installed.has(group)) return;
      installed.add(group);
      for (const key in methods) {
        const fn = methods[key];
        Object.defineProperty(proto, key, {
          configurable: true,
          enumerable: false,
          get() {
            const bound = fn.bind(this);
            Object.defineProperty(this, key, {
              configurable: true,
              writable: true,
              enumerable: true,
              value: bound
            });
            return bound;
          },
          set(v) {
            Object.defineProperty(this, key, {
              configurable: true,
              writable: true,
              enumerable: true,
              value: v
            });
          }
        });
      }
    }
    const ZodType = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodType", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType.init(inst, def);
      Object.assign(inst["~standard"], {
        jsonSchema: {
          input: (0, _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_8__.createStandardJSONSchemaMethod)(inst, "input"),
          output: (0, _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_8__.createStandardJSONSchemaMethod)(inst, "output")
        }
      });
      inst.toJSONSchema = (0, _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_8__.createToJSONSchemaMethod)(inst, {});
      inst.def = def;
      inst.type = def.type;
      Object.defineProperty(inst, "_def", {
        value: def
      });
      inst.parse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.parse(inst, data, params, {
        callee: inst.parse
      });
      inst.safeParse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeParse(inst, data, params);
      inst.parseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.parseAsync(inst, data, params, {
        callee: inst.parseAsync
      });
      inst.safeParseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeParseAsync(inst, data, params);
      inst.spa = inst.safeParseAsync;
      inst.encode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.encode(inst, data, params);
      inst.decode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.decode(inst, data, params);
      inst.encodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.encodeAsync(inst, data, params);
      inst.decodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.decodeAsync(inst, data, params);
      inst.safeEncode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeEncode(inst, data, params);
      inst.safeDecode = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeDecode(inst, data, params);
      inst.safeEncodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeEncodeAsync(inst, data, params);
      inst.safeDecodeAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_10__.safeDecodeAsync(inst, data, params);
      _installLazyMethods(inst, "ZodType", {
        check(...chks) {
          const def = this.def;
          return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_3__.mergeDefs(def, {
            checks: [ ...def.checks ?? [], ...chks.map(ch => typeof ch === "function" ? {
              _zod: {
                check: ch,
                def: {
                  check: "custom"
                },
                onattach: []
              }
            } : ch) ]
          }), {
            parent: true
          });
        },
        with(...chks) {
          return this.check(...chks);
        },
        clone(def, params) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.clone(this, def, params);
        },
        brand() {
          return this;
        },
        register(reg, meta) {
          reg.add(this, meta);
          return this;
        },
        refine(check, params) {
          return this.check(refine(check, params));
        },
        superRefine(refinement, params) {
          return this.check(superRefine(refinement, params));
        },
        overwrite(fn) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._overwrite(fn));
        },
        optional() {
          return optional(this);
        },
        exactOptional() {
          return exactOptional(this);
        },
        nullable() {
          return nullable(this);
        },
        nullish() {
          return optional(nullable(this));
        },
        nonoptional(params) {
          return nonoptional(this, params);
        },
        array() {
          return array(this);
        },
        or(arg) {
          return union([ this, arg ]);
        },
        and(arg) {
          return intersection(this, arg);
        },
        transform(tx) {
          return pipe(this, transform(tx));
        },
        default(d) {
          return _default(this, d);
        },
        prefault(d) {
          return prefault(this, d);
        },
        catch(params) {
          return _catch(this, params);
        },
        pipe(target) {
          return pipe(this, target);
        },
        readonly() {
          return readonly(this);
        },
        describe(description) {
          const cl = this.clone();
          _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.add(cl, {
            description
          });
          return cl;
        },
        meta(...args) {
          if (args.length === 0) return _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.get(this);
          const cl = this.clone();
          _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.add(cl, args[0]);
          return cl;
        },
        isOptional() {
          return this.safeParse(undefined).success;
        },
        isNullable() {
          return this.safeParse(null).success;
        },
        apply(fn) {
          return fn(this);
        }
      });
      Object.defineProperty(inst, "description", {
        get() {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.get(inst)?.description;
        },
        configurable: true
      });
      return inst;
    });
    const _ZodString = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("_ZodString", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.stringProcessor(inst, ctx, json, params);
      const bag = inst._zod.bag;
      inst.format = bag.format ?? null;
      inst.minLength = bag.minimum ?? null;
      inst.maxLength = bag.maximum ?? null;
      _installLazyMethods(inst, "_ZodString", {
        regex(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._regex(...args));
        },
        includes(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._includes(...args));
        },
        startsWith(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._startsWith(...args));
        },
        endsWith(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._endsWith(...args));
        },
        min(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(...args));
        },
        max(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxLength(...args));
        },
        length(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._length(...args));
        },
        nonempty(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(1, ...args));
        },
        lowercase(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lowercase(params));
        },
        uppercase(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uppercase(params));
        },
        trim() {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._trim());
        },
        normalize(...args) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._normalize(...args));
        },
        toLowerCase() {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._toLowerCase());
        },
        toUpperCase() {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._toUpperCase());
        },
        slugify() {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._slugify());
        }
      });
    });
    const ZodString = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodString", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString.init(inst, def);
      _ZodString.init(inst, def);
      inst.email = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._email(ZodEmail, params));
      inst.url = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._url(ZodURL, params));
      inst.jwt = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._jwt(ZodJWT, params));
      inst.emoji = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._emoji(ZodEmoji, params));
      inst.guid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params));
      inst.uuid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuid(ZodUUID, params));
      inst.uuidv4 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv4(ZodUUID, params));
      inst.uuidv6 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv6(ZodUUID, params));
      inst.uuidv7 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv7(ZodUUID, params));
      inst.nanoid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._nanoid(ZodNanoID, params));
      inst.guid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params));
      inst.cuid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid(ZodCUID, params));
      inst.cuid2 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid2(ZodCUID2, params));
      inst.ulid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ulid(ZodULID, params));
      inst.base64 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64(ZodBase64, params));
      inst.base64url = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64url(ZodBase64URL, params));
      inst.xid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._xid(ZodXID, params));
      inst.ksuid = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ksuid(ZodKSUID, params));
      inst.ipv4 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv4(ZodIPv4, params));
      inst.ipv6 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv6(ZodIPv6, params));
      inst.cidrv4 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv4(ZodCIDRv4, params));
      inst.cidrv6 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv6(ZodCIDRv6, params));
      inst.e164 = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._e164(ZodE164, params));
      inst.datetime = params => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_9__.datetime(params));
      inst.date = params => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_9__.date(params));
      inst.time = params => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_9__.time(params));
      inst.duration = params => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_9__.duration(params));
    });
    function string(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._string(ZodString, params);
    }
    const ZodStringFormat = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodStringFormat", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodStringFormat.init(inst, def);
      _ZodString.init(inst, def);
    });
    const ZodEmail = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmail", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEmail.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function email(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._email(ZodEmail, params);
    }
    const ZodGUID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodGUID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodGUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function guid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params);
    }
    const ZodUUID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUUID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function uuid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuid(ZodUUID, params);
    }
    function uuidv4(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv4(ZodUUID, params);
    }
    function uuidv6(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv6(ZodUUID, params);
    }
    function uuidv7(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv7(ZodUUID, params);
    }
    const ZodURL = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodURL", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodURL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function url(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._url(ZodURL, params);
    }
    function httpUrl(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._url(ZodURL, {
        protocol: _core_index_js__WEBPACK_IMPORTED_MODULE_4__.httpProtocol,
        hostname: _core_index_js__WEBPACK_IMPORTED_MODULE_4__.domain,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodEmoji = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmoji", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEmoji.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function emoji(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._emoji(ZodEmoji, params);
    }
    const ZodNanoID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNanoID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNanoID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function nanoid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._nanoid(ZodNanoID, params);
    }
    const ZodCUID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function cuid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid(ZodCUID, params);
    }
    const ZodCUID2 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID2", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCUID2.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function cuid2(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid2(ZodCUID2, params);
    }
    const ZodULID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodULID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodULID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function ulid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ulid(ZodULID, params);
    }
    const ZodXID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodXID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodXID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function xid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._xid(ZodXID, params);
    }
    const ZodKSUID = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodKSUID", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodKSUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function ksuid(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ksuid(ZodKSUID, params);
    }
    const ZodIPv4 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv4", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIPv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function ipv4(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv4(ZodIPv4, params);
    }
    const ZodMAC = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodMAC", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodMAC.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function mac(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._mac(ZodMAC, params);
    }
    const ZodIPv6 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv6", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIPv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function ipv6(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv6(ZodIPv6, params);
    }
    const ZodCIDRv4 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv4", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCIDRv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function cidrv4(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv4(ZodCIDRv4, params);
    }
    const ZodCIDRv6 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv6", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCIDRv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function cidrv6(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv6(ZodCIDRv6, params);
    }
    const ZodBase64 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBase64.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function base64(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64(ZodBase64, params);
    }
    const ZodBase64URL = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64URL", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBase64URL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function base64url(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64url(ZodBase64URL, params);
    }
    const ZodE164 = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodE164", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodE164.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function e164(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._e164(ZodE164, params);
    }
    const ZodJWT = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodJWT", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodJWT.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function jwt(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._jwt(ZodJWT, params);
    }
    const ZodCustomStringFormat = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustomStringFormat", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCustomStringFormat.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    function stringFormat(format, fnOrRegex, _params = {}) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
    }
    function hostname(_params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, "hostname", _core_index_js__WEBPACK_IMPORTED_MODULE_4__.hostname, _params);
    }
    function hex(_params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, "hex", _core_index_js__WEBPACK_IMPORTED_MODULE_4__.hex, _params);
    }
    function hash(alg, params) {
      const enc = params?.enc ?? "hex";
      const format = `${alg}_${enc}`;
      const regex = _core_index_js__WEBPACK_IMPORTED_MODULE_4__[format];
      if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, format, regex, params);
    }
    const ZodNumber = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumber", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNumber.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.numberProcessor(inst, ctx, json, params);
      _installLazyMethods(inst, "ZodNumber", {
        gt(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(value, params));
        },
        gte(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
        },
        min(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
        },
        lt(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(value, params));
        },
        lte(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
        },
        max(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
        },
        int(params) {
          return this.check(int(params));
        },
        safe(params) {
          return this.check(int(params));
        },
        positive(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(0, params));
        },
        nonnegative(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(0, params));
        },
        negative(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(0, params));
        },
        nonpositive(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(0, params));
        },
        multipleOf(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
        },
        step(value, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
        },
        finite() {
          return this;
        }
      });
      const bag = inst._zod.bag;
      inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
      inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
      inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
      inst.isFinite = true;
      inst.format = bag.format ?? null;
    });
    function number(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._number(ZodNumber, params);
    }
    const ZodNumberFormat = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumberFormat", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNumberFormat.init(inst, def);
      ZodNumber.init(inst, def);
    });
    function int(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int(ZodNumberFormat, params);
    }
    function float32(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._float32(ZodNumberFormat, params);
    }
    function float64(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._float64(ZodNumberFormat, params);
    }
    function int32(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int32(ZodNumberFormat, params);
    }
    function uint32(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uint32(ZodNumberFormat, params);
    }
    const ZodBoolean = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBoolean", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBoolean.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.booleanProcessor(inst, ctx, json, params);
    });
    function boolean(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._boolean(ZodBoolean, params);
    }
    const ZodBigInt = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigInt", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBigInt.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.bigintProcessor(inst, ctx, json, params);
      inst.gte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
      inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
      inst.gt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(value, params));
      inst.gte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
      inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
      inst.lt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(value, params));
      inst.lte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
      inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
      inst.positive = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(BigInt(0), params));
      inst.negative = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(BigInt(0), params));
      inst.nonpositive = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(BigInt(0), params));
      inst.nonnegative = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(BigInt(0), params));
      inst.multipleOf = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
      const bag = inst._zod.bag;
      inst.minValue = bag.minimum ?? null;
      inst.maxValue = bag.maximum ?? null;
      inst.format = bag.format ?? null;
    });
    function bigint(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._bigint(ZodBigInt, params);
    }
    const ZodBigIntFormat = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigIntFormat", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBigIntFormat.init(inst, def);
      ZodBigInt.init(inst, def);
    });
    function int64(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int64(ZodBigIntFormat, params);
    }
    function uint64(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uint64(ZodBigIntFormat, params);
    }
    const ZodSymbol = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSymbol", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSymbol.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.symbolProcessor(inst, ctx, json, params);
    });
    function symbol(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._symbol(ZodSymbol, params);
    }
    const ZodUndefined = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUndefined", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUndefined.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.undefinedProcessor(inst, ctx, json, params);
    });
    function _undefined(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._undefined(ZodUndefined, params);
    }
    const ZodNull = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNull", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNull.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.nullProcessor(inst, ctx, json, params);
    });
    function _null(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._null(ZodNull, params);
    }
    const ZodAny = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodAny", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAny.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.anyProcessor(inst, ctx, json, params);
    });
    function any() {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._any(ZodAny);
    }
    const ZodUnknown = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnknown", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUnknown.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.unknownProcessor(inst, ctx, json, params);
    });
    function unknown() {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._unknown(ZodUnknown);
    }
    const ZodNever = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNever", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNever.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.neverProcessor(inst, ctx, json, params);
    });
    function never(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._never(ZodNever, params);
    }
    const ZodVoid = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodVoid", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodVoid.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.voidProcessor(inst, ctx, json, params);
    });
    function _void(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._void(ZodVoid, params);
    }
    const ZodDate = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDate", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDate.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.dateProcessor(inst, ctx, json, params);
      inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
      inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
      const c = inst._zod.bag;
      inst.minDate = c.minimum ? new Date(c.minimum) : null;
      inst.maxDate = c.maximum ? new Date(c.maximum) : null;
    });
    function date(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._date(ZodDate, params);
    }
    const ZodArray = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodArray", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodArray.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.arrayProcessor(inst, ctx, json, params);
      inst.element = def.element;
      _installLazyMethods(inst, "ZodArray", {
        min(n, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(n, params));
        },
        nonempty(params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(1, params));
        },
        max(n, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxLength(n, params));
        },
        length(n, params) {
          return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._length(n, params));
        },
        unwrap() {
          return this.element;
        }
      });
    });
    function array(element, params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._array(ZodArray, element, params);
    }
    function keyof(schema) {
      const shape = schema._zod.def.shape;
      return _enum(Object.keys(shape));
    }
    const ZodObject = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodObject", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodObjectJIT.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.objectProcessor(inst, ctx, json, params);
      _core_index_js__WEBPACK_IMPORTED_MODULE_3__.defineLazy(inst, "shape", () => def.shape);
      _installLazyMethods(inst, "ZodObject", {
        keyof() {
          return _enum(Object.keys(this._zod.def.shape));
        },
        catchall(catchall) {
          return this.clone({
            ...this._zod.def,
            catchall
          });
        },
        passthrough() {
          return this.clone({
            ...this._zod.def,
            catchall: unknown()
          });
        },
        loose() {
          return this.clone({
            ...this._zod.def,
            catchall: unknown()
          });
        },
        strict() {
          return this.clone({
            ...this._zod.def,
            catchall: never()
          });
        },
        strip() {
          return this.clone({
            ...this._zod.def,
            catchall: undefined
          });
        },
        extend(incoming) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.extend(this, incoming);
        },
        safeExtend(incoming) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.safeExtend(this, incoming);
        },
        merge(other) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.merge(this, other);
        },
        pick(mask) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.pick(this, mask);
        },
        omit(mask) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.omit(this, mask);
        },
        partial(...args) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.partial(ZodOptional, this, args[0]);
        },
        required(...args) {
          return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.required(ZodNonOptional, this, args[0]);
        }
      });
    });
    function object(shape, params) {
      const def = {
        type: "object",
        shape: shape ?? {},
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      };
      return new ZodObject(def);
    }
    function strictObject(shape, params) {
      return new ZodObject({
        type: "object",
        shape,
        catchall: never(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function looseObject(shape, params) {
      return new ZodObject({
        type: "object",
        shape,
        catchall: unknown(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodUnion = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnion", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUnion.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.unionProcessor(inst, ctx, json, params);
      inst.options = def.options;
    });
    function union(options, params) {
      return new ZodUnion({
        type: "union",
        options,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodXor = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodXor", (inst, def) => {
      ZodUnion.init(inst, def);
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodXor.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.unionProcessor(inst, ctx, json, params);
      inst.options = def.options;
    });
    function xor(options, params) {
      return new ZodXor({
        type: "union",
        options,
        inclusive: false,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodDiscriminatedUnion = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDiscriminatedUnion", (inst, def) => {
      ZodUnion.init(inst, def);
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDiscriminatedUnion.init(inst, def);
    });
    function discriminatedUnion(discriminator, options, params) {
      return new ZodDiscriminatedUnion({
        type: "union",
        options,
        discriminator,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodIntersection = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIntersection", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIntersection.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.intersectionProcessor(inst, ctx, json, params);
    });
    function intersection(left, right) {
      return new ZodIntersection({
        type: "intersection",
        left,
        right
      });
    }
    const ZodTuple = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTuple", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTuple.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.tupleProcessor(inst, ctx, json, params);
      inst.rest = rest => inst.clone({
        ...inst._zod.def,
        rest
      });
    });
    function tuple(items, _paramsOrRest, _params) {
      const hasRest = _paramsOrRest instanceof _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType;
      const params = hasRest ? _params : _paramsOrRest;
      const rest = hasRest ? _paramsOrRest : null;
      return new ZodTuple({
        type: "tuple",
        items,
        rest,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodRecord = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodRecord", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRecord.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.recordProcessor(inst, ctx, json, params);
      inst.keyType = def.keyType;
      inst.valueType = def.valueType;
    });
    function record(keyType, valueType, params) {
      if (!valueType || !valueType._zod) {
        return new ZodRecord({
          type: "record",
          keyType: string(),
          valueType: keyType,
          ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(valueType)
        });
      }
      return new ZodRecord({
        type: "record",
        keyType,
        valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function partialRecord(keyType, valueType, params) {
      const k = _core_index_js__WEBPACK_IMPORTED_MODULE_3__.clone(keyType);
      k._zod.values = undefined;
      return new ZodRecord({
        type: "record",
        keyType: k,
        valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function looseRecord(keyType, valueType, params) {
      return new ZodRecord({
        type: "record",
        keyType,
        valueType,
        mode: "loose",
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodMap = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodMap", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodMap.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.mapProcessor(inst, ctx, json, params);
      inst.keyType = def.keyType;
      inst.valueType = def.valueType;
      inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(...args));
      inst.nonempty = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(1, params));
      inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxSize(...args));
      inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._size(...args));
    });
    function map(keyType, valueType, params) {
      return new ZodMap({
        type: "map",
        keyType,
        valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodSet = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSet", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSet.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.setProcessor(inst, ctx, json, params);
      inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(...args));
      inst.nonempty = params => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(1, params));
      inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxSize(...args));
      inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._size(...args));
    });
    function set(valueType, params) {
      return new ZodSet({
        type: "set",
        valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodEnum = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEnum", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEnum.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.enumProcessor(inst, ctx, json, params);
      inst.enum = def.entries;
      inst.options = Object.values(def.entries);
      const keys = new Set(Object.keys(def.entries));
      inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
          if (keys.has(value)) {
            newEntries[value] = def.entries[value];
          } else throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
          ...def,
          checks: [],
          ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
          entries: newEntries
        });
      };
      inst.exclude = (values, params) => {
        const newEntries = {
          ...def.entries
        };
        for (const value of values) {
          if (keys.has(value)) {
            delete newEntries[value];
          } else throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
          ...def,
          checks: [],
          ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
          entries: newEntries
        });
      };
    });
    function _enum(values, params) {
      const entries = Array.isArray(values) ? Object.fromEntries(values.map(v => [ v, v ])) : values;
      return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function nativeEnum(entries, params) {
      return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodLiteral = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLiteral", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodLiteral.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.literalProcessor(inst, ctx, json, params);
      inst.values = new Set(def.values);
      Object.defineProperty(inst, "value", {
        get() {
          if (def.values.length > 1) {
            throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
          }
          return def.values[0];
        }
      });
    });
    function literal(value, params) {
      return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [ value ],
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodFile = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodFile", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodFile.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.fileProcessor(inst, ctx, json, params);
      inst.min = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(size, params));
      inst.max = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxSize(size, params));
      inst.mime = (types, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._mime(Array.isArray(types) ? types : [ types ], params));
    });
    function file(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._file(ZodFile, params);
    }
    const ZodTransform = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTransform", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTransform.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.transformProcessor(inst, ctx, json, params);
      inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
          throw new _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$ZodEncodeError(inst.constructor.name);
        }
        payload.addIssue = issue => {
          if (typeof issue === "string") {
            payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_3__.issue(issue, payload.value, def));
          } else {
            const _issue = issue;
            if (_issue.fatal) _issue.continue = false;
            _issue.code ?? (_issue.code = "custom");
            _issue.input ?? (_issue.input = payload.value);
            _issue.inst ?? (_issue.inst = inst);
            payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_3__.issue(_issue));
          }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
          return output.then(output => {
            payload.value = output;
            payload.fallback = true;
            return payload;
          });
        }
        payload.value = output;
        payload.fallback = true;
        return payload;
      };
    });
    function transform(fn) {
      return new ZodTransform({
        type: "transform",
        transform: fn
      });
    }
    const ZodOptional = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodOptional", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.optionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function optional(innerType) {
      return new ZodOptional({
        type: "optional",
        innerType
      });
    }
    const ZodExactOptional = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodExactOptional", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodExactOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.optionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function exactOptional(innerType) {
      return new ZodExactOptional({
        type: "optional",
        innerType
      });
    }
    const ZodNullable = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNullable", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNullable.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.nullableProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function nullable(innerType) {
      return new ZodNullable({
        type: "nullable",
        innerType
      });
    }
    function nullish(innerType) {
      return optional(nullable(innerType));
    }
    const ZodDefault = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDefault", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.defaultProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeDefault = inst.unwrap;
    });
    function _default(innerType, defaultValue) {
      return new ZodDefault({
        type: "default",
        innerType,
        get defaultValue() {
          return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_3__.shallowClone(defaultValue);
        }
      });
    }
    const ZodPrefault = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPrefault", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPrefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.prefaultProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function prefault(innerType, defaultValue) {
      return new ZodPrefault({
        type: "prefault",
        innerType,
        get defaultValue() {
          return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_3__.shallowClone(defaultValue);
        }
      });
    }
    const ZodNonOptional = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNonOptional", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNonOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.nonoptionalProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function nonoptional(innerType, params) {
      return new ZodNonOptional({
        type: "nonoptional",
        innerType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodSuccess = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSuccess", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSuccess.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.successProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function success(innerType) {
      return new ZodSuccess({
        type: "success",
        innerType
      });
    }
    const ZodCatch = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCatch", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCatch.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.catchProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeCatch = inst.unwrap;
    });
    function _catch(innerType, catchValue) {
      return new ZodCatch({
        type: "catch",
        innerType,
        catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
      });
    }
    const ZodNaN = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNaN", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNaN.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.nanProcessor(inst, ctx, json, params);
    });
    function nan(params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._nan(ZodNaN, params);
    }
    const ZodPipe = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPipe", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPipe.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.pipeProcessor(inst, ctx, json, params);
      inst.in = def.in;
      inst.out = def.out;
    });
    function pipe(in_, out) {
      return new ZodPipe({
        type: "pipe",
        in: in_,
        out
      });
    }
    const ZodCodec = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCodec", (inst, def) => {
      ZodPipe.init(inst, def);
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCodec.init(inst, def);
    });
    function codec(in_, out, params) {
      return new ZodCodec({
        type: "pipe",
        in: in_,
        out,
        transform: params.decode,
        reverseTransform: params.encode
      });
    }
    function invertCodec(codec) {
      const def = codec._zod.def;
      return new ZodCodec({
        type: "pipe",
        in: def.out,
        out: def.in,
        transform: def.reverseTransform,
        reverseTransform: def.transform
      });
    }
    const ZodPreprocess = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPreprocess", (inst, def) => {
      ZodPipe.init(inst, def);
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPreprocess.init(inst, def);
    });
    const ZodReadonly = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodReadonly", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodReadonly.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.readonlyProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function readonly(innerType) {
      return new ZodReadonly({
        type: "readonly",
        innerType
      });
    }
    const ZodTemplateLiteral = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTemplateLiteral", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTemplateLiteral.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.templateLiteralProcessor(inst, ctx, json, params);
    });
    function templateLiteral(parts, params) {
      return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const ZodLazy = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLazy", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodLazy.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.lazyProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.getter();
    });
    function lazy(getter) {
      return new ZodLazy({
        type: "lazy",
        getter
      });
    }
    const ZodPromise = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPromise", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPromise.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.promiseProcessor(inst, ctx, json, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    function promise(innerType) {
      return new ZodPromise({
        type: "promise",
        innerType
      });
    }
    const ZodFunction = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodFunction", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodFunction.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.functionProcessor(inst, ctx, json, params);
    });
    function _function(params) {
      return new ZodFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
        output: params?.output ?? unknown()
      });
    }
    const ZodCustom = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustom", (inst, def) => {
      _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCustom.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_7__.customProcessor(inst, ctx, json, params);
    });
    function check(fn) {
      const ch = new _core_index_js__WEBPACK_IMPORTED_MODULE_2__.$ZodCheck({
        check: "custom"
      });
      ch._zod.check = fn;
      return ch;
    }
    function custom(fn, _params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._custom(ZodCustom, fn ?? (() => true), _params);
    }
    function refine(fn, _params = {}) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._refine(ZodCustom, fn, _params);
    }
    function superRefine(fn, params) {
      return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._superRefine(fn, params);
    }
    const describe = _core_index_js__WEBPACK_IMPORTED_MODULE_6__.describe;
    const meta = _core_index_js__WEBPACK_IMPORTED_MODULE_6__.meta;
    function _instanceof(cls, params = {}) {
      const inst = new ZodCustom({
        type: "custom",
        check: "custom",
        fn: data => data instanceof cls,
        abort: true,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
      inst._zod.bag.Class = cls;
      inst._zod.check = payload => {
        if (!(payload.value instanceof cls)) {
          payload.issues.push({
            code: "invalid_type",
            expected: cls.name,
            input: payload.value,
            inst,
            path: [ ...inst._zod.def.path ?? [] ]
          });
        }
      };
      return inst;
    }
    const stringbool = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringbool({
      Codec: ZodCodec,
      Boolean: ZodBoolean,
      String: ZodString
    }, ...args);
    function json(params) {
      const jsonSchema = lazy(() => union([ string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema) ]));
      return jsonSchema;
    }
    function preprocess(fn, schema) {
      return new ZodPreprocess({
        type: "pipe",
        in: transform(fn),
        out: schema
      });
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      TimePrecision: () => TimePrecision,
      _any: () => _any,
      _array: () => _array,
      _base64: () => _base64,
      _base64url: () => _base64url,
      _bigint: () => _bigint,
      _boolean: () => _boolean,
      _catch: () => _catch,
      _check: () => _check,
      _cidrv4: () => _cidrv4,
      _cidrv6: () => _cidrv6,
      _coercedBigint: () => _coercedBigint,
      _coercedBoolean: () => _coercedBoolean,
      _coercedDate: () => _coercedDate,
      _coercedNumber: () => _coercedNumber,
      _coercedString: () => _coercedString,
      _cuid: () => _cuid,
      _cuid2: () => _cuid2,
      _custom: () => _custom,
      _date: () => _date,
      _default: () => _default,
      _discriminatedUnion: () => _discriminatedUnion,
      _e164: () => _e164,
      _email: () => _email,
      _emoji: () => _emoji,
      _endsWith: () => _endsWith,
      _enum: () => _enum,
      _file: () => _file,
      _float32: () => _float32,
      _float64: () => _float64,
      _gt: () => _gt,
      _gte: () => _gte,
      _guid: () => _guid,
      _includes: () => _includes,
      _int: () => _int,
      _int32: () => _int32,
      _int64: () => _int64,
      _intersection: () => _intersection,
      _ipv4: () => _ipv4,
      _ipv6: () => _ipv6,
      _isoDate: () => _isoDate,
      _isoDateTime: () => _isoDateTime,
      _isoDuration: () => _isoDuration,
      _isoTime: () => _isoTime,
      _jwt: () => _jwt,
      _ksuid: () => _ksuid,
      _lazy: () => _lazy,
      _length: () => _length,
      _literal: () => _literal,
      _lowercase: () => _lowercase,
      _lt: () => _lt,
      _lte: () => _lte,
      _mac: () => _mac,
      _map: () => _map,
      _max: () => _lte,
      _maxLength: () => _maxLength,
      _maxSize: () => _maxSize,
      _mime: () => _mime,
      _min: () => _gte,
      _minLength: () => _minLength,
      _minSize: () => _minSize,
      _multipleOf: () => _multipleOf,
      _nan: () => _nan,
      _nanoid: () => _nanoid,
      _nativeEnum: () => _nativeEnum,
      _negative: () => _negative,
      _never: () => _never,
      _nonnegative: () => _nonnegative,
      _nonoptional: () => _nonoptional,
      _nonpositive: () => _nonpositive,
      _normalize: () => _normalize,
      _null: () => _null,
      _nullable: () => _nullable,
      _number: () => _number,
      _optional: () => _optional,
      _overwrite: () => _overwrite,
      _pipe: () => _pipe,
      _positive: () => _positive,
      _promise: () => _promise,
      _property: () => _property,
      _readonly: () => _readonly,
      _record: () => _record,
      _refine: () => _refine,
      _regex: () => _regex,
      _set: () => _set,
      _size: () => _size,
      _slugify: () => _slugify,
      _startsWith: () => _startsWith,
      _string: () => _string,
      _stringFormat: () => _stringFormat,
      _stringbool: () => _stringbool,
      _success: () => _success,
      _superRefine: () => _superRefine,
      _symbol: () => _symbol,
      _templateLiteral: () => _templateLiteral,
      _toLowerCase: () => _toLowerCase,
      _toUpperCase: () => _toUpperCase,
      _transform: () => _transform,
      _trim: () => _trim,
      _tuple: () => _tuple,
      _uint32: () => _uint32,
      _uint64: () => _uint64,
      _ulid: () => _ulid,
      _undefined: () => _undefined,
      _union: () => _union,
      _unknown: () => _unknown,
      _uppercase: () => _uppercase,
      _url: () => _url,
      _uuid: () => _uuid,
      _uuidv4: () => _uuidv4,
      _uuidv6: () => _uuidv6,
      _uuidv7: () => _uuidv7,
      _void: () => _void,
      _xid: () => _xid,
      _xor: () => _xor,
      describe: () => describe,
      meta: () => meta
    });
    var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js");
    var _registries_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registries.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js");
    var _schemas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schemas.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    function _string(Class, params) {
      return new Class({
        type: "string",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _coercedString(Class, params) {
      return new Class({
        type: "string",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _email(Class, params) {
      return new Class({
        type: "string",
        format: "email",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _guid(Class, params) {
      return new Class({
        type: "string",
        format: "guid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uuid(Class, params) {
      return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uuidv4(Class, params) {
      return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v4",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uuidv6(Class, params) {
      return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v6",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uuidv7(Class, params) {
      return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v7",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _url(Class, params) {
      return new Class({
        type: "string",
        format: "url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _emoji(Class, params) {
      return new Class({
        type: "string",
        format: "emoji",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _nanoid(Class, params) {
      return new Class({
        type: "string",
        format: "nanoid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _cuid(Class, params) {
      return new Class({
        type: "string",
        format: "cuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _cuid2(Class, params) {
      return new Class({
        type: "string",
        format: "cuid2",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _ulid(Class, params) {
      return new Class({
        type: "string",
        format: "ulid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _xid(Class, params) {
      return new Class({
        type: "string",
        format: "xid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _ksuid(Class, params) {
      return new Class({
        type: "string",
        format: "ksuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _ipv4(Class, params) {
      return new Class({
        type: "string",
        format: "ipv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _ipv6(Class, params) {
      return new Class({
        type: "string",
        format: "ipv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _mac(Class, params) {
      return new Class({
        type: "string",
        format: "mac",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _cidrv4(Class, params) {
      return new Class({
        type: "string",
        format: "cidrv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _cidrv6(Class, params) {
      return new Class({
        type: "string",
        format: "cidrv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _base64(Class, params) {
      return new Class({
        type: "string",
        format: "base64",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _base64url(Class, params) {
      return new Class({
        type: "string",
        format: "base64url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _e164(Class, params) {
      return new Class({
        type: "string",
        format: "e164",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _jwt(Class, params) {
      return new Class({
        type: "string",
        format: "jwt",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    const TimePrecision = {
      Any: null,
      Minute: -1,
      Second: 0,
      Millisecond: 3,
      Microsecond: 6
    };
    function _isoDateTime(Class, params) {
      return new Class({
        type: "string",
        format: "datetime",
        check: "string_format",
        offset: false,
        local: false,
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _isoDate(Class, params) {
      return new Class({
        type: "string",
        format: "date",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _isoTime(Class, params) {
      return new Class({
        type: "string",
        format: "time",
        check: "string_format",
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _isoDuration(Class, params) {
      return new Class({
        type: "string",
        format: "duration",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _number(Class, params) {
      return new Class({
        type: "number",
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _coercedNumber(Class, params) {
      return new Class({
        type: "number",
        coerce: true,
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _int(Class, params) {
      return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "safeint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _float32(Class, params) {
      return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _float64(Class, params) {
      return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _int32(Class, params) {
      return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "int32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uint32(Class, params) {
      return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "uint32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _boolean(Class, params) {
      return new Class({
        type: "boolean",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _coercedBoolean(Class, params) {
      return new Class({
        type: "boolean",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _bigint(Class, params) {
      return new Class({
        type: "bigint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _coercedBigint(Class, params) {
      return new Class({
        type: "bigint",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _int64(Class, params) {
      return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "int64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uint64(Class, params) {
      return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "uint64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _symbol(Class, params) {
      return new Class({
        type: "symbol",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _undefined(Class, params) {
      return new Class({
        type: "undefined",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _null(Class, params) {
      return new Class({
        type: "null",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _any(Class) {
      return new Class({
        type: "any"
      });
    }
    function _unknown(Class) {
      return new Class({
        type: "unknown"
      });
    }
    function _never(Class, params) {
      return new Class({
        type: "never",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _void(Class, params) {
      return new Class({
        type: "void",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _date(Class, params) {
      return new Class({
        type: "date",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _coercedDate(Class, params) {
      return new Class({
        type: "date",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _nan(Class, params) {
      return new Class({
        type: "nan",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _lt(value, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        value,
        inclusive: false
      });
    }
    function _lte(value, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        value,
        inclusive: true
      });
    }
    function _gt(value, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        value,
        inclusive: false
      });
    }
    function _gte(value, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        value,
        inclusive: true
      });
    }
    function _positive(params) {
      return _gt(0, params);
    }
    function _negative(params) {
      return _lt(0, params);
    }
    function _nonpositive(params) {
      return _lte(0, params);
    }
    function _nonnegative(params) {
      return _gte(0, params);
    }
    function _multipleOf(value, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMultipleOf({
        check: "multiple_of",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        value
      });
    }
    function _maxSize(maximum, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxSize({
        check: "max_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        maximum
      });
    }
    function _minSize(minimum, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinSize({
        check: "min_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        minimum
      });
    }
    function _size(size, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckSizeEquals({
        check: "size_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        size
      });
    }
    function _maxLength(maximum, params) {
      const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxLength({
        check: "max_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        maximum
      });
      return ch;
    }
    function _minLength(minimum, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinLength({
        check: "min_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        minimum
      });
    }
    function _length(length, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLengthEquals({
        check: "length_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        length
      });
    }
    function _regex(pattern, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckRegex({
        check: "string_format",
        format: "regex",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        pattern
      });
    }
    function _lowercase(params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLowerCase({
        check: "string_format",
        format: "lowercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _uppercase(params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckUpperCase({
        check: "string_format",
        format: "uppercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _includes(includes, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckIncludes({
        check: "string_format",
        format: "includes",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        includes
      });
    }
    function _startsWith(prefix, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStartsWith({
        check: "string_format",
        format: "starts_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        prefix
      });
    }
    function _endsWith(suffix, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckEndsWith({
        check: "string_format",
        format: "ends_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
        suffix
      });
    }
    function _property(property, schema, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckProperty({
        check: "property",
        property,
        schema,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _mime(types, params) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMimeType({
        check: "mime_type",
        mime: types,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _overwrite(tx) {
      return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckOverwrite({
        check: "overwrite",
        tx
      });
    }
    function _normalize(form) {
      return _overwrite(input => input.normalize(form));
    }
    function _trim() {
      return _overwrite(input => input.trim());
    }
    function _toLowerCase() {
      return _overwrite(input => input.toLowerCase());
    }
    function _toUpperCase() {
      return _overwrite(input => input.toUpperCase());
    }
    function _slugify() {
      return _overwrite(input => _util_js__WEBPACK_IMPORTED_MODULE_3__.slugify(input));
    }
    function _array(Class, element, params) {
      return new Class({
        type: "array",
        element,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _union(Class, options, params) {
      return new Class({
        type: "union",
        options,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _xor(Class, options, params) {
      return new Class({
        type: "union",
        options,
        inclusive: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _discriminatedUnion(Class, discriminator, options, params) {
      return new Class({
        type: "union",
        options,
        discriminator,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _intersection(Class, left, right) {
      return new Class({
        type: "intersection",
        left,
        right
      });
    }
    function _tuple(Class, items, _paramsOrRest, _params) {
      const hasRest = _paramsOrRest instanceof _schemas_js__WEBPACK_IMPORTED_MODULE_2__.$ZodType;
      const params = hasRest ? _params : _paramsOrRest;
      const rest = hasRest ? _paramsOrRest : null;
      return new Class({
        type: "tuple",
        items,
        rest,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _record(Class, keyType, valueType, params) {
      return new Class({
        type: "record",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _map(Class, keyType, valueType, params) {
      return new Class({
        type: "map",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _set(Class, valueType, params) {
      return new Class({
        type: "set",
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _enum(Class, values, params) {
      const entries = Array.isArray(values) ? Object.fromEntries(values.map(v => [ v, v ])) : values;
      return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _nativeEnum(Class, entries, params) {
      return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _literal(Class, value, params) {
      return new Class({
        type: "literal",
        values: Array.isArray(value) ? value : [ value ],
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _file(Class, params) {
      return new Class({
        type: "file",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _transform(Class, fn) {
      return new Class({
        type: "transform",
        transform: fn
      });
    }
    function _optional(Class, innerType) {
      return new Class({
        type: "optional",
        innerType
      });
    }
    function _nullable(Class, innerType) {
      return new Class({
        type: "nullable",
        innerType
      });
    }
    function _default(Class, innerType, defaultValue) {
      return new Class({
        type: "default",
        innerType,
        get defaultValue() {
          return typeof defaultValue === "function" ? defaultValue() : _util_js__WEBPACK_IMPORTED_MODULE_3__.shallowClone(defaultValue);
        }
      });
    }
    function _nonoptional(Class, innerType, params) {
      return new Class({
        type: "nonoptional",
        innerType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _success(Class, innerType) {
      return new Class({
        type: "success",
        innerType
      });
    }
    function _catch(Class, innerType, catchValue) {
      return new Class({
        type: "catch",
        innerType,
        catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
      });
    }
    function _pipe(Class, in_, out) {
      return new Class({
        type: "pipe",
        in: in_,
        out
      });
    }
    function _readonly(Class, innerType) {
      return new Class({
        type: "readonly",
        innerType
      });
    }
    function _templateLiteral(Class, parts, params) {
      return new Class({
        type: "template_literal",
        parts,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
    }
    function _lazy(Class, getter) {
      return new Class({
        type: "lazy",
        getter
      });
    }
    function _promise(Class, innerType) {
      return new Class({
        type: "promise",
        innerType
      });
    }
    function _custom(Class, fn, _params) {
      const norm = _util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(_params);
      norm.abort ?? (norm.abort = true);
      const schema = new Class({
        type: "custom",
        check: "custom",
        fn,
        ...norm
      });
      return schema;
    }
    function _refine(Class, fn, _params) {
      const schema = new Class({
        type: "custom",
        check: "custom",
        fn,
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(_params)
      });
      return schema;
    }
    function _superRefine(fn, params) {
      const ch = _check(payload => {
        payload.addIssue = issue => {
          if (typeof issue === "string") {
            payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_3__.issue(issue, payload.value, ch._zod.def));
          } else {
            const _issue = issue;
            if (_issue.fatal) _issue.continue = false;
            _issue.code ?? (_issue.code = "custom");
            _issue.input ?? (_issue.input = payload.value);
            _issue.inst ?? (_issue.inst = ch);
            _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
            payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_3__.issue(_issue));
          }
        };
        return fn(payload.value, payload);
      }, params);
      return ch;
    }
    function _check(fn, params) {
      const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "custom",
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params)
      });
      ch._zod.check = fn;
      return ch;
    }
    function describe(description) {
      const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "describe"
      });
      ch._zod.onattach = [ inst => {
        const existing = _registries_js__WEBPACK_IMPORTED_MODULE_1__.globalRegistry.get(inst) ?? {};
        _registries_js__WEBPACK_IMPORTED_MODULE_1__.globalRegistry.add(inst, {
          ...existing,
          description
        });
      } ];
      ch._zod.check = () => {};
      return ch;
    }
    function meta(metadata) {
      const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "meta"
      });
      ch._zod.onattach = [ inst => {
        const existing = _registries_js__WEBPACK_IMPORTED_MODULE_1__.globalRegistry.get(inst) ?? {};
        _registries_js__WEBPACK_IMPORTED_MODULE_1__.globalRegistry.add(inst, {
          ...existing,
          ...metadata
        });
      } ];
      ch._zod.check = () => {};
      return ch;
    }
    function _stringbool(Classes, _params) {
      const params = _util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(_params);
      let truthyArray = params.truthy ?? [ "true", "1", "yes", "on", "y", "enabled" ];
      let falsyArray = params.falsy ?? [ "false", "0", "no", "off", "n", "disabled" ];
      if (params.case !== "sensitive") {
        truthyArray = truthyArray.map(v => typeof v === "string" ? v.toLowerCase() : v);
        falsyArray = falsyArray.map(v => typeof v === "string" ? v.toLowerCase() : v);
      }
      const truthySet = new Set(truthyArray);
      const falsySet = new Set(falsyArray);
      const _Codec = Classes.Codec ?? _schemas_js__WEBPACK_IMPORTED_MODULE_2__.$ZodCodec;
      const _Boolean = Classes.Boolean ?? _schemas_js__WEBPACK_IMPORTED_MODULE_2__.$ZodBoolean;
      const _String = Classes.String ?? _schemas_js__WEBPACK_IMPORTED_MODULE_2__.$ZodString;
      const stringSchema = new _String({
        type: "string",
        error: params.error
      });
      const booleanSchema = new _Boolean({
        type: "boolean",
        error: params.error
      });
      const codec = new _Codec({
        type: "pipe",
        in: stringSchema,
        out: booleanSchema,
        transform: (input, payload) => {
          let data = input;
          if (params.case !== "sensitive") data = data.toLowerCase();
          if (truthySet.has(data)) {
            return true;
          } else if (falsySet.has(data)) {
            return false;
          } else {
            payload.issues.push({
              code: "invalid_value",
              expected: "stringbool",
              values: [ ...truthySet, ...falsySet ],
              input: payload.value,
              inst: codec,
              continue: false
            });
            return {};
          }
        },
        reverseTransform: (input, _payload) => {
          if (input === true) {
            return truthyArray[0] || "true";
          } else {
            return falsyArray[0] || "false";
          }
        },
        error: params.error
      });
      return codec;
    }
    function _stringFormat(Class, format, fnOrRegex, _params = {}) {
      const params = _util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(_params);
      const def = {
        ..._util_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(_params),
        check: "string_format",
        type: "string",
        format,
        fn: typeof fnOrRegex === "function" ? fnOrRegex : val => fnOrRegex.test(val),
        ...params
      };
      if (fnOrRegex instanceof RegExp) {
        def.pattern = fnOrRegex;
      }
      const inst = new Class(def);
      return inst;
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      $ZodCheck: () => $ZodCheck,
      $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
      $ZodCheckEndsWith: () => $ZodCheckEndsWith,
      $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
      $ZodCheckIncludes: () => $ZodCheckIncludes,
      $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
      $ZodCheckLessThan: () => $ZodCheckLessThan,
      $ZodCheckLowerCase: () => $ZodCheckLowerCase,
      $ZodCheckMaxLength: () => $ZodCheckMaxLength,
      $ZodCheckMaxSize: () => $ZodCheckMaxSize,
      $ZodCheckMimeType: () => $ZodCheckMimeType,
      $ZodCheckMinLength: () => $ZodCheckMinLength,
      $ZodCheckMinSize: () => $ZodCheckMinSize,
      $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
      $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
      $ZodCheckOverwrite: () => $ZodCheckOverwrite,
      $ZodCheckProperty: () => $ZodCheckProperty,
      $ZodCheckRegex: () => $ZodCheckRegex,
      $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
      $ZodCheckStartsWith: () => $ZodCheckStartsWith,
      $ZodCheckStringFormat: () => $ZodCheckStringFormat,
      $ZodCheckUpperCase: () => $ZodCheckUpperCase
    });
    var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _regexes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexes.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const $ZodCheck = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheck", (inst, def) => {
      var _a;
      inst._zod ?? (inst._zod = {});
      inst._zod.def = def;
      (_a = inst._zod).onattach ?? (_a.onattach = []);
    });
    const numericOriginMap = {
      number: "number",
      bigint: "bigint",
      object: "date"
    };
    const $ZodCheckLessThan = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLessThan", (inst, def) => {
      $ZodCheck.init(inst, def);
      const origin = numericOriginMap[typeof def.value];
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
        if (def.value < curr) {
          if (def.inclusive) bag.maximum = def.value; else bag.exclusiveMaximum = def.value;
        }
      });
      inst._zod.check = payload => {
        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
          return;
        }
        payload.issues.push({
          origin,
          code: "too_big",
          maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
          input: payload.value,
          inclusive: def.inclusive,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckGreaterThan = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckGreaterThan", (inst, def) => {
      $ZodCheck.init(inst, def);
      const origin = numericOriginMap[typeof def.value];
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
        if (def.value > curr) {
          if (def.inclusive) bag.minimum = def.value; else bag.exclusiveMinimum = def.value;
        }
      });
      inst._zod.check = payload => {
        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
          return;
        }
        payload.issues.push({
          origin,
          code: "too_small",
          minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
          input: payload.value,
          inclusive: def.inclusive,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckMultipleOf = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMultipleOf", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.onattach.push(inst => {
        var _a;
        (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
      });
      inst._zod.check = payload => {
        if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
        const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : _util_js__WEBPACK_IMPORTED_MODULE_2__.floatSafeRemainder(payload.value, def.value) === 0;
        if (isMultiple) return;
        payload.issues.push({
          origin: typeof payload.value,
          code: "not_multiple_of",
          divisor: def.value,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckNumberFormat = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckNumberFormat", (inst, def) => {
      $ZodCheck.init(inst, def);
      def.format = def.format || "float64";
      const isInt = def.format?.includes("int");
      const origin = isInt ? "int" : "number";
      const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.NUMBER_FORMAT_RANGES[def.format];
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
        if (isInt) bag.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.integer;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        if (isInt) {
          if (!Number.isInteger(input)) {
            payload.issues.push({
              expected: origin,
              format: def.format,
              code: "invalid_type",
              continue: false,
              input,
              inst
            });
            return;
          }
          if (!Number.isSafeInteger(input)) {
            if (input > 0) {
              payload.issues.push({
                input,
                code: "too_big",
                maximum: Number.MAX_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst,
                origin,
                inclusive: true,
                continue: !def.abort
              });
            } else {
              payload.issues.push({
                input,
                code: "too_small",
                minimum: Number.MIN_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst,
                origin,
                inclusive: true,
                continue: !def.abort
              });
            }
            return;
          }
        }
        if (input < minimum) {
          payload.issues.push({
            origin: "number",
            input,
            code: "too_small",
            minimum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
        if (input > maximum) {
          payload.issues.push({
            origin: "number",
            input,
            code: "too_big",
            maximum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    const $ZodCheckBigIntFormat = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
      $ZodCheck.init(inst, def);
      const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.BIGINT_FORMAT_RANGES[def.format];
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        if (input < minimum) {
          payload.issues.push({
            origin: "bigint",
            input,
            code: "too_small",
            minimum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
        if (input > maximum) {
          payload.issues.push({
            origin: "bigint",
            input,
            code: "too_big",
            maximum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    const $ZodCheckMaxSize = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxSize", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const size = input.size;
        if (size <= def.maximum) return;
        payload.issues.push({
          origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
          code: "too_big",
          maximum: def.maximum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckMinSize = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinSize", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const size = input.size;
        if (size >= def.minimum) return;
        payload.issues.push({
          origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
          code: "too_small",
          minimum: def.minimum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckSizeEquals = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckSizeEquals", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.minimum = def.size;
        bag.maximum = def.size;
        bag.size = def.size;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const size = input.size;
        if (size === def.size) return;
        const tooBig = size > def.size;
        payload.issues.push({
          origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
          ...tooBig ? {
            code: "too_big",
            maximum: def.size
          } : {
            code: "too_small",
            minimum: def.size
          },
          inclusive: true,
          exact: true,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckMaxLength = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxLength", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const length = input.length;
        if (length <= def.maximum) return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_big",
          maximum: def.maximum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckMinLength = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinLength", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const length = input.length;
        if (length >= def.minimum) return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_small",
          minimum: def.minimum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckLengthEquals = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLengthEquals", (inst, def) => {
      var _a;
      $ZodCheck.init(inst, def);
      (_a = inst._zod.def).when ?? (_a.when = payload => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
      });
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.minimum = def.length;
        bag.maximum = def.length;
        bag.length = def.length;
      });
      inst._zod.check = payload => {
        const input = payload.value;
        const length = input.length;
        if (length === def.length) return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
          origin,
          ...tooBig ? {
            code: "too_big",
            maximum: def.length
          } : {
            code: "too_small",
            minimum: def.length
          },
          inclusive: true,
          exact: true,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckStringFormat = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStringFormat", (inst, def) => {
      var _a, _b;
      $ZodCheck.init(inst, def);
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        if (def.pattern) {
          bag.patterns ?? (bag.patterns = new Set);
          bag.patterns.add(def.pattern);
        }
      });
      if (def.pattern) (_a = inst._zod).check ?? (_a.check = payload => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: def.format,
          input: payload.value,
          ...def.pattern ? {
            pattern: def.pattern.toString()
          } : {},
          inst,
          continue: !def.abort
        });
      }); else (_b = inst._zod).check ?? (_b.check = () => {});
    });
    const $ZodCheckRegex = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckRegex", (inst, def) => {
      $ZodCheckStringFormat.init(inst, def);
      inst._zod.check = payload => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "regex",
          input: payload.value,
          pattern: def.pattern.toString(),
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckLowerCase = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLowerCase", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.lowercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    const $ZodCheckUpperCase = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckUpperCase", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.uppercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    const $ZodCheckIncludes = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckIncludes", (inst, def) => {
      $ZodCheck.init(inst, def);
      const escapedRegex = _util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.includes);
      const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
      def.pattern = pattern;
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set);
        bag.patterns.add(pattern);
      });
      inst._zod.check = payload => {
        if (payload.value.includes(def.includes, def.position)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "includes",
          includes: def.includes,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckStartsWith = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStartsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`^${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.prefix)}.*`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set);
        bag.patterns.add(pattern);
      });
      inst._zod.check = payload => {
        if (payload.value.startsWith(def.prefix)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "starts_with",
          prefix: def.prefix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckEndsWith = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckEndsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`.*${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.suffix)}$`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.onattach.push(inst => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set);
        bag.patterns.add(pattern);
      });
      inst._zod.check = payload => {
        if (payload.value.endsWith(def.suffix)) return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "ends_with",
          suffix: def.suffix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    function handleCheckPropertyResult(result, payload, property) {
      if (result.issues.length) {
        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__.prefixIssues(property, result.issues));
      }
    }
    const $ZodCheckProperty = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckProperty", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.check = payload => {
        const result = def.schema._zod.run({
          value: payload.value[def.property],
          issues: []
        }, {});
        if (result instanceof Promise) {
          return result.then(result => handleCheckPropertyResult(result, payload, def.property));
        }
        handleCheckPropertyResult(result, payload, def.property);
        return;
      };
    });
    const $ZodCheckMimeType = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMimeType", (inst, def) => {
      $ZodCheck.init(inst, def);
      const mimeSet = new Set(def.mime);
      inst._zod.onattach.push(inst => {
        inst._zod.bag.mime = def.mime;
      });
      inst._zod.check = payload => {
        if (mimeSet.has(payload.value.type)) return;
        payload.issues.push({
          code: "invalid_value",
          values: def.mime,
          input: payload.value.type,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCheckOverwrite = _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckOverwrite", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.check = payload => {
        payload.value = def.tx(payload.value);
      };
    });
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      $ZodAsyncError: () => $ZodAsyncError,
      $ZodEncodeError: () => $ZodEncodeError,
      $brand: () => $brand,
      $constructor: () => $constructor,
      NEVER: () => NEVER,
      config: () => config,
      globalConfig: () => globalConfig
    });
    var _a;
    const NEVER = Object.freeze({
      status: "aborted"
    });
    function $constructor(name, initializer, params) {
      function init(inst, def) {
        if (!inst._zod) {
          Object.defineProperty(inst, "_zod", {
            value: {
              def,
              constr: _,
              traits: new Set
            },
            enumerable: false
          });
        }
        if (inst._zod.traits.has(name)) {
          return;
        }
        inst._zod.traits.add(name);
        initializer(inst, def);
        const proto = _.prototype;
        const keys = Object.keys(proto);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (!(k in inst)) {
            inst[k] = proto[k].bind(inst);
          }
        }
      }
      const Parent = params?.Parent ?? Object;
      class Definition extends Parent {}
      Object.defineProperty(Definition, "name", {
        value: name
      });
      function _(def) {
        var _a;
        const inst = params?.Parent ? new Definition : this;
        init(inst, def);
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        for (const fn of inst._zod.deferred) {
          fn();
        }
        return inst;
      }
      Object.defineProperty(_, "init", {
        value: init
      });
      Object.defineProperty(_, Symbol.hasInstance, {
        value: inst => {
          if (params?.Parent && inst instanceof params.Parent) return true;
          return inst?._zod?.traits?.has(name);
        }
      });
      Object.defineProperty(_, "name", {
        value: name
      });
      return _;
    }
    const $brand = Symbol("zod_brand");
    class $ZodAsyncError extends Error {
      constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
      }
    }
    class $ZodEncodeError extends Error {
      constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
      }
    }
    (_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
    const globalConfig = globalThis.__zod_globalConfig;
    function config(newConfig) {
      if (newConfig) Object.assign(globalConfig, newConfig);
      return globalConfig;
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      Doc: () => Doc
    });
    class Doc {
      constructor(args = []) {
        this.content = [];
        this.indent = 0;
        if (this) this.args = args;
      }
      indented(fn) {
        this.indent += 1;
        fn(this);
        this.indent -= 1;
      }
      write(arg) {
        if (typeof arg === "function") {
          arg(this, {
            execution: "sync"
          });
          arg(this, {
            execution: "async"
          });
          return;
        }
        const content = arg;
        const lines = content.split("\n").filter(x => x);
        const minIndent = Math.min(...lines.map(x => x.length - x.trimStart().length));
        const dedented = lines.map(x => x.slice(minIndent)).map(x => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
          this.content.push(line);
        }
      }
      compile() {
        const F = Function;
        const args = this?.args;
        const content = this?.content ?? [ `` ];
        const lines = [ ...content.map(x => `  ${x}`) ];
        return new F(...args, lines.join("\n"));
      }
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      $ZodError: () => $ZodError,
      $ZodRealError: () => $ZodRealError,
      flattenError: () => flattenError,
      formatError: () => formatError,
      prettifyError: () => prettifyError,
      toDotPath: () => toDotPath,
      treeifyError: () => treeifyError
    });
    var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const initializer = (inst, def) => {
      inst.name = "$ZodError";
      Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false
      });
      Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false
      });
      inst.message = JSON.stringify(def, _util_js__WEBPACK_IMPORTED_MODULE_1__.jsonStringifyReplacer, 2);
      Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false
      });
    };
    const $ZodError = (0, _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer);
    const $ZodRealError = (0, _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer, {
      Parent: Error
    });
    function flattenError(error, mapper = issue => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of error.issues) {
        if (sub.path.length > 0) {
          fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
          fieldErrors[sub.path[0]].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return {
        formErrors,
        fieldErrors
      };
    }
    function formatError(error, mapper = issue => issue.message) {
      const fieldErrors = {
        _errors: []
      };
      const processError = (error, path = []) => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union" && issue.errors.length) {
            issue.errors.map(issues => processError({
              issues
            }, [ ...path, ...issue.path ]));
          } else if (issue.code === "invalid_key") {
            processError({
              issues: issue.issues
            }, [ ...path, ...issue.path ]);
          } else if (issue.code === "invalid_element") {
            processError({
              issues: issue.issues
            }, [ ...path, ...issue.path ]);
          } else {
            const fullpath = [ ...path, ...issue.path ];
            if (fullpath.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < fullpath.length) {
                const el = fullpath[i];
                const terminal = i === fullpath.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || {
                    _errors: []
                  };
                } else {
                  curr[el] = curr[el] || {
                    _errors: []
                  };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        }
      };
      processError(error);
      return fieldErrors;
    }
    function treeifyError(error, mapper = issue => issue.message) {
      const result = {
        errors: []
      };
      const processError = (error, path = []) => {
        var _a, _b;
        for (const issue of error.issues) {
          if (issue.code === "invalid_union" && issue.errors.length) {
            issue.errors.map(issues => processError({
              issues
            }, [ ...path, ...issue.path ]));
          } else if (issue.code === "invalid_key") {
            processError({
              issues: issue.issues
            }, [ ...path, ...issue.path ]);
          } else if (issue.code === "invalid_element") {
            processError({
              issues: issue.issues
            }, [ ...path, ...issue.path ]);
          } else {
            const fullpath = [ ...path, ...issue.path ];
            if (fullpath.length === 0) {
              result.errors.push(mapper(issue));
              continue;
            }
            let curr = result;
            let i = 0;
            while (i < fullpath.length) {
              const el = fullpath[i];
              const terminal = i === fullpath.length - 1;
              if (typeof el === "string") {
                curr.properties ?? (curr.properties = {});
                (_a = curr.properties)[el] ?? (_a[el] = {
                  errors: []
                });
                curr = curr.properties[el];
              } else {
                curr.items ?? (curr.items = []);
                (_b = curr.items)[el] ?? (_b[el] = {
                  errors: []
                });
                curr = curr.items[el];
              }
              if (terminal) {
                curr.errors.push(mapper(issue));
              }
              i++;
            }
          }
        }
      };
      processError(error);
      return result;
    }
    function toDotPath(_path) {
      const segs = [];
      const path = _path.map(seg => typeof seg === "object" ? seg.key : seg);
      for (const seg of path) {
        if (typeof seg === "number") segs.push(`[${seg}]`); else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`); else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`); else {
          if (segs.length) segs.push(".");
          segs.push(seg);
        }
      }
      return segs.join("");
    }
    function prettifyError(error) {
      const lines = [];
      const issues = [ ...error.issues ].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
      for (const issue of issues) {
        lines.push(`✖ ${issue.message}`);
        if (issue.path?.length) lines.push(`  → at ${toDotPath(issue.path)}`);
      }
      return lines.join("\n");
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      allProcessors: () => allProcessors,
      anyProcessor: () => anyProcessor,
      arrayProcessor: () => arrayProcessor,
      bigintProcessor: () => bigintProcessor,
      booleanProcessor: () => booleanProcessor,
      catchProcessor: () => catchProcessor,
      customProcessor: () => customProcessor,
      dateProcessor: () => dateProcessor,
      defaultProcessor: () => defaultProcessor,
      enumProcessor: () => enumProcessor,
      fileProcessor: () => fileProcessor,
      functionProcessor: () => functionProcessor,
      intersectionProcessor: () => intersectionProcessor,
      lazyProcessor: () => lazyProcessor,
      literalProcessor: () => literalProcessor,
      mapProcessor: () => mapProcessor,
      nanProcessor: () => nanProcessor,
      neverProcessor: () => neverProcessor,
      nonoptionalProcessor: () => nonoptionalProcessor,
      nullProcessor: () => nullProcessor,
      nullableProcessor: () => nullableProcessor,
      numberProcessor: () => numberProcessor,
      objectProcessor: () => objectProcessor,
      optionalProcessor: () => optionalProcessor,
      pipeProcessor: () => pipeProcessor,
      prefaultProcessor: () => prefaultProcessor,
      promiseProcessor: () => promiseProcessor,
      readonlyProcessor: () => readonlyProcessor,
      recordProcessor: () => recordProcessor,
      setProcessor: () => setProcessor,
      stringProcessor: () => stringProcessor,
      successProcessor: () => successProcessor,
      symbolProcessor: () => symbolProcessor,
      templateLiteralProcessor: () => templateLiteralProcessor,
      toJSONSchema: () => toJSONSchema,
      transformProcessor: () => transformProcessor,
      tupleProcessor: () => tupleProcessor,
      undefinedProcessor: () => undefinedProcessor,
      unionProcessor: () => unionProcessor,
      unknownProcessor: () => unknownProcessor,
      voidProcessor: () => voidProcessor
    });
    var _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-json-schema.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
    };
    const stringProcessor = (schema, ctx, _json, _params) => {
      const json = _json;
      json.type = "string";
      const {minimum, maximum, format, patterns, contentEncoding} = schema._zod.bag;
      if (typeof minimum === "number") json.minLength = minimum;
      if (typeof maximum === "number") json.maxLength = maximum;
      if (format) {
        json.format = formatMap[format] ?? format;
        if (json.format === "") delete json.format;
        if (format === "time") {
          delete json.format;
        }
      }
      if (contentEncoding) json.contentEncoding = contentEncoding;
      if (patterns && patterns.size > 0) {
        const regexes = [ ...patterns ];
        if (regexes.length === 1) json.pattern = regexes[0].source; else if (regexes.length > 1) {
          json.allOf = [ ...regexes.map(regex => ({
            ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? {
              type: "string"
            } : {},
            pattern: regex.source
          })) ];
        }
      }
    };
    const numberProcessor = (schema, ctx, _json, _params) => {
      const json = _json;
      const {minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum} = schema._zod.bag;
      if (typeof format === "string" && format.includes("int")) json.type = "integer"; else json.type = "number";
      const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
      const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
      const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
      if (exMin) {
        if (legacy) {
          json.minimum = exclusiveMinimum;
          json.exclusiveMinimum = true;
        } else {
          json.exclusiveMinimum = exclusiveMinimum;
        }
      } else if (typeof minimum === "number") {
        json.minimum = minimum;
      }
      if (exMax) {
        if (legacy) {
          json.maximum = exclusiveMaximum;
          json.exclusiveMaximum = true;
        } else {
          json.exclusiveMaximum = exclusiveMaximum;
        }
      } else if (typeof maximum === "number") {
        json.maximum = maximum;
      }
      if (typeof multipleOf === "number") json.multipleOf = multipleOf;
    };
    const booleanProcessor = (_schema, _ctx, json, _params) => {
      json.type = "boolean";
    };
    const bigintProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt cannot be represented in JSON Schema");
      }
    };
    const symbolProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Symbols cannot be represented in JSON Schema");
      }
    };
    const nullProcessor = (_schema, ctx, json, _params) => {
      if (ctx.target === "openapi-3.0") {
        json.type = "string";
        json.nullable = true;
        json.enum = [ null ];
      } else {
        json.type = "null";
      }
    };
    const undefinedProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Undefined cannot be represented in JSON Schema");
      }
    };
    const voidProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Void cannot be represented in JSON Schema");
      }
    };
    const neverProcessor = (_schema, _ctx, json, _params) => {
      json.not = {};
    };
    const anyProcessor = (_schema, _ctx, _json, _params) => {};
    const unknownProcessor = (_schema, _ctx, _json, _params) => {};
    const dateProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Date cannot be represented in JSON Schema");
      }
    };
    const enumProcessor = (schema, _ctx, json, _params) => {
      const def = schema._zod.def;
      const values = (0, _util_js__WEBPACK_IMPORTED_MODULE_1__.getEnumValues)(def.entries);
      if (values.every(v => typeof v === "number")) json.type = "number";
      if (values.every(v => typeof v === "string")) json.type = "string";
      json.enum = values;
    };
    const literalProcessor = (schema, ctx, json, _params) => {
      const def = schema._zod.def;
      const vals = [];
      for (const val of def.values) {
        if (val === undefined) {
          if (ctx.unrepresentable === "throw") {
            throw new Error("Literal `undefined` cannot be represented in JSON Schema");
          } else {}
        } else if (typeof val === "bigint") {
          if (ctx.unrepresentable === "throw") {
            throw new Error("BigInt literals cannot be represented in JSON Schema");
          } else {
            vals.push(Number(val));
          }
        } else {
          vals.push(val);
        }
      }
      if (vals.length === 0) {} else if (vals.length === 1) {
        const val = vals[0];
        json.type = val === null ? "null" : typeof val;
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
          json.enum = [ val ];
        } else {
          json.const = val;
        }
      } else {
        if (vals.every(v => typeof v === "number")) json.type = "number";
        if (vals.every(v => typeof v === "string")) json.type = "string";
        if (vals.every(v => typeof v === "boolean")) json.type = "boolean";
        if (vals.every(v => v === null)) json.type = "null";
        json.enum = vals;
      }
    };
    const nanProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("NaN cannot be represented in JSON Schema");
      }
    };
    const templateLiteralProcessor = (schema, _ctx, json, _params) => {
      const _json = json;
      const pattern = schema._zod.pattern;
      if (!pattern) throw new Error("Pattern not found in template literal");
      _json.type = "string";
      _json.pattern = pattern.source;
    };
    const fileProcessor = (schema, _ctx, json, _params) => {
      const _json = json;
      const file = {
        type: "string",
        format: "binary",
        contentEncoding: "binary"
      };
      const {minimum, maximum, mime} = schema._zod.bag;
      if (minimum !== undefined) file.minLength = minimum;
      if (maximum !== undefined) file.maxLength = maximum;
      if (mime) {
        if (mime.length === 1) {
          file.contentMediaType = mime[0];
          Object.assign(_json, file);
        } else {
          Object.assign(_json, file);
          _json.anyOf = mime.map(m => ({
            contentMediaType: m
          }));
        }
      } else {
        Object.assign(_json, file);
      }
    };
    const successProcessor = (_schema, _ctx, json, _params) => {
      json.type = "boolean";
    };
    const customProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Custom types cannot be represented in JSON Schema");
      }
    };
    const functionProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Function types cannot be represented in JSON Schema");
      }
    };
    const transformProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Transforms cannot be represented in JSON Schema");
      }
    };
    const mapProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Map cannot be represented in JSON Schema");
      }
    };
    const setProcessor = (_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Set cannot be represented in JSON Schema");
      }
    };
    const arrayProcessor = (schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      const {minimum, maximum} = schema._zod.bag;
      if (typeof minimum === "number") json.minItems = minimum;
      if (typeof maximum === "number") json.maxItems = maximum;
      json.type = "array";
      json.items = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.element, ctx, {
        ...params,
        path: [ ...params.path, "items" ]
      });
    };
    const objectProcessor = (schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      json.type = "object";
      json.properties = {};
      const shape = def.shape;
      for (const key in shape) {
        json.properties[key] = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(shape[key], ctx, {
          ...params,
          path: [ ...params.path, "properties", key ]
        });
      }
      const allKeys = new Set(Object.keys(shape));
      const requiredKeys = new Set([ ...allKeys ].filter(key => {
        const v = def.shape[key]._zod;
        if (ctx.io === "input") {
          return v.optin === undefined;
        } else {
          return v.optout === undefined;
        }
      }));
      if (requiredKeys.size > 0) {
        json.required = Array.from(requiredKeys);
      }
      if (def.catchall?._zod.def.type === "never") {
        json.additionalProperties = false;
      } else if (!def.catchall) {
        if (ctx.io === "output") json.additionalProperties = false;
      } else if (def.catchall) {
        json.additionalProperties = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.catchall, ctx, {
          ...params,
          path: [ ...params.path, "additionalProperties" ]
        });
      }
    };
    const unionProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      const isExclusive = def.inclusive === false;
      const options = def.options.map((x, i) => (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(x, ctx, {
        ...params,
        path: [ ...params.path, isExclusive ? "oneOf" : "anyOf", i ]
      }));
      if (isExclusive) {
        json.oneOf = options;
      } else {
        json.anyOf = options;
      }
    };
    const intersectionProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      const a = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.left, ctx, {
        ...params,
        path: [ ...params.path, "allOf", 0 ]
      });
      const b = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.right, ctx, {
        ...params,
        path: [ ...params.path, "allOf", 1 ]
      });
      const isSimpleIntersection = val => "allOf" in val && Object.keys(val).length === 1;
      const allOf = [ ...isSimpleIntersection(a) ? a.allOf : [ a ], ...isSimpleIntersection(b) ? b.allOf : [ b ] ];
      json.allOf = allOf;
    };
    const tupleProcessor = (schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      json.type = "array";
      const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
      const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
      const prefixItems = def.items.map((x, i) => (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(x, ctx, {
        ...params,
        path: [ ...params.path, prefixPath, i ]
      }));
      const rest = def.rest ? (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.rest, ctx, {
        ...params,
        path: [ ...params.path, restPath, ...ctx.target === "openapi-3.0" ? [ def.items.length ] : [] ]
      }) : null;
      if (ctx.target === "draft-2020-12") {
        json.prefixItems = prefixItems;
        if (rest) {
          json.items = rest;
        }
      } else if (ctx.target === "openapi-3.0") {
        json.items = {
          anyOf: prefixItems
        };
        if (rest) {
          json.items.anyOf.push(rest);
        }
        json.minItems = prefixItems.length;
        if (!rest) {
          json.maxItems = prefixItems.length;
        }
      } else {
        json.items = prefixItems;
        if (rest) {
          json.additionalItems = rest;
        }
      }
      const {minimum, maximum} = schema._zod.bag;
      if (typeof minimum === "number") json.minItems = minimum;
      if (typeof maximum === "number") json.maxItems = maximum;
    };
    const recordProcessor = (schema, ctx, _json, params) => {
      const json = _json;
      const def = schema._zod.def;
      json.type = "object";
      const keyType = def.keyType;
      const keyBag = keyType._zod.bag;
      const patterns = keyBag?.patterns;
      if (def.mode === "loose" && patterns && patterns.size > 0) {
        const valueSchema = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.valueType, ctx, {
          ...params,
          path: [ ...params.path, "patternProperties", "*" ]
        });
        json.patternProperties = {};
        for (const pattern of patterns) {
          json.patternProperties[pattern.source] = valueSchema;
        }
      } else {
        if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
          json.propertyNames = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.keyType, ctx, {
            ...params,
            path: [ ...params.path, "propertyNames" ]
          });
        }
        json.additionalProperties = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.valueType, ctx, {
          ...params,
          path: [ ...params.path, "additionalProperties" ]
        });
      }
      const keyValues = keyType._zod.values;
      if (keyValues) {
        const validKeyValues = [ ...keyValues ].filter(v => typeof v === "string" || typeof v === "number");
        if (validKeyValues.length > 0) {
          json.required = validKeyValues;
        }
      }
    };
    const nullableProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      const inner = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json.nullable = true;
      } else {
        json.anyOf = [ inner, {
          type: "null"
        } ];
      }
    };
    const nonoptionalProcessor = (schema, ctx, _json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    };
    const defaultProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      json.default = JSON.parse(JSON.stringify(def.defaultValue));
    };
    const prefaultProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
    };
    const catchProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      let catchValue;
      try {
        catchValue = def.catchValue(undefined);
      } catch {
        throw new Error("Dynamic catch values are not supported in JSON Schema");
      }
      json.default = catchValue;
    };
    const pipeProcessor = (schema, ctx, _json, params) => {
      const def = schema._zod.def;
      const inIsTransform = def.in._zod.traits.has("$ZodTransform");
      const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = innerType;
    };
    const readonlyProcessor = (schema, ctx, json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      json.readOnly = true;
    };
    const promiseProcessor = (schema, ctx, _json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    };
    const optionalProcessor = (schema, ctx, _json, params) => {
      const def = schema._zod.def;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    };
    const lazyProcessor = (schema, ctx, _json, params) => {
      const innerType = schema._zod.innerType;
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = innerType;
    };
    const allProcessors = {
      string: stringProcessor,
      number: numberProcessor,
      boolean: booleanProcessor,
      bigint: bigintProcessor,
      symbol: symbolProcessor,
      null: nullProcessor,
      undefined: undefinedProcessor,
      void: voidProcessor,
      never: neverProcessor,
      any: anyProcessor,
      unknown: unknownProcessor,
      date: dateProcessor,
      enum: enumProcessor,
      literal: literalProcessor,
      nan: nanProcessor,
      template_literal: templateLiteralProcessor,
      file: fileProcessor,
      success: successProcessor,
      custom: customProcessor,
      function: functionProcessor,
      transform: transformProcessor,
      map: mapProcessor,
      set: setProcessor,
      array: arrayProcessor,
      object: objectProcessor,
      union: unionProcessor,
      intersection: intersectionProcessor,
      tuple: tupleProcessor,
      record: recordProcessor,
      nullable: nullableProcessor,
      nonoptional: nonoptionalProcessor,
      default: defaultProcessor,
      prefault: prefaultProcessor,
      catch: catchProcessor,
      pipe: pipeProcessor,
      readonly: readonlyProcessor,
      promise: promiseProcessor,
      optional: optionalProcessor,
      lazy: lazyProcessor
    };
    function toJSONSchema(input, params) {
      if ("_idmap" in input) {
        const registry = input;
        const ctx = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.initializeContext)({
          ...params,
          processors: allProcessors
        });
        const defs = {};
        for (const entry of registry._idmap.entries()) {
          const [_, schema] = entry;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(schema, ctx);
        }
        const schemas = {};
        const external = {
          registry,
          uri: params?.uri,
          defs
        };
        ctx.external = external;
        for (const entry of registry._idmap.entries()) {
          const [key, schema] = entry;
          (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.extractDefs)(ctx, schema);
          schemas[key] = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.finalize)(ctx, schema);
        }
        if (Object.keys(defs).length > 0) {
          const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
          schemas.__shared = {
            [defsSegment]: defs
          };
        }
        return {
          schemas
        };
      }
      const ctx = (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.initializeContext)({
        ...params,
        processors: allProcessors
      });
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.process)(input, ctx);
      (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.extractDefs)(ctx, input);
      return (0, _to_json_schema_js__WEBPACK_IMPORTED_MODULE_0__.finalize)(ctx, input);
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      _decode: () => _decode,
      _decodeAsync: () => _decodeAsync,
      _encode: () => _encode,
      _encodeAsync: () => _encodeAsync,
      _parse: () => _parse,
      _parseAsync: () => _parseAsync,
      _safeDecode: () => _safeDecode,
      _safeDecodeAsync: () => _safeDecodeAsync,
      _safeEncode: () => _safeEncode,
      _safeEncodeAsync: () => _safeEncodeAsync,
      _safeParse: () => _safeParse,
      _safeParseAsync: () => _safeParseAsync,
      decode: () => decode,
      decodeAsync: () => decodeAsync,
      encode: () => encode,
      encodeAsync: () => encodeAsync,
      parse: () => parse,
      parseAsync: () => parseAsync,
      safeDecode: () => safeDecode,
      safeDecodeAsync: () => safeDecodeAsync,
      safeEncode: () => safeEncode,
      safeEncodeAsync: () => safeEncodeAsync,
      safeParse: () => safeParse,
      safeParseAsync: () => safeParseAsync
    });
    var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const _parse = _Err => (schema, value, _ctx, _params) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: false
      } : {
        async: false
      };
      const result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError;
      }
      if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, _params?.callee);
        throw e;
      }
      return result.value;
    };
    const parse = _parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _parseAsync = _Err => async (schema, value, _ctx, params) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: true
      } : {
        async: true
      };
      let result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) result = await result;
      if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, params?.callee);
        throw e;
      }
      return result.value;
    };
    const parseAsync = _parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeParse = _Err => (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: false
      } : {
        async: false
      };
      const result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError;
      }
      return result.issues.length ? {
        success: false,
        error: new (_Err ?? _errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodError)(result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())))
      } : {
        success: true,
        data: result.value
      };
    };
    const safeParse = _safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeParseAsync = _Err => async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        async: true
      } : {
        async: true
      };
      let result = schema._zod.run({
        value,
        issues: []
      }, ctx);
      if (result instanceof Promise) result = await result;
      return result.issues.length ? {
        success: false,
        error: new _Err(result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())))
      } : {
        success: true,
        data: result.value
      };
    };
    const safeParseAsync = _safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _encode = _Err => (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : {
        direction: "backward"
      };
      return _parse(_Err)(schema, value, ctx);
    };
    const encode = _encode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _decode = _Err => (schema, value, _ctx) => _parse(_Err)(schema, value, _ctx);
    const decode = _decode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _encodeAsync = _Err => async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : {
        direction: "backward"
      };
      return _parseAsync(_Err)(schema, value, ctx);
    };
    const encodeAsync = _encodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _decodeAsync = _Err => async (schema, value, _ctx) => _parseAsync(_Err)(schema, value, _ctx);
    const decodeAsync = _decodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeEncode = _Err => (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : {
        direction: "backward"
      };
      return _safeParse(_Err)(schema, value, ctx);
    };
    const safeEncode = _safeEncode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeDecode = _Err => (schema, value, _ctx) => _safeParse(_Err)(schema, value, _ctx);
    const safeDecode = _safeDecode(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeEncodeAsync = _Err => async (schema, value, _ctx) => {
      const ctx = _ctx ? {
        ..._ctx,
        direction: "backward"
      } : {
        direction: "backward"
      };
      return _safeParseAsync(_Err)(schema, value, ctx);
    };
    const safeEncodeAsync = _safeEncodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
    const _safeDecodeAsync = _Err => async (schema, value, _ctx) => _safeParseAsync(_Err)(schema, value, _ctx);
    const safeDecodeAsync = _safeDecodeAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      base64: () => base64,
      base64url: () => base64url,
      bigint: () => bigint,
      boolean: () => boolean,
      browserEmail: () => browserEmail,
      cidrv4: () => cidrv4,
      cidrv6: () => cidrv6,
      cuid: () => cuid,
      cuid2: () => cuid2,
      date: () => date,
      datetime: () => datetime,
      domain: () => domain,
      duration: () => duration,
      e164: () => e164,
      email: () => email,
      emoji: () => emoji,
      extendedDuration: () => extendedDuration,
      guid: () => guid,
      hex: () => hex,
      hostname: () => hostname,
      html5Email: () => html5Email,
      httpProtocol: () => httpProtocol,
      idnEmail: () => idnEmail,
      integer: () => integer,
      ipv4: () => ipv4,
      ipv6: () => ipv6,
      ksuid: () => ksuid,
      lowercase: () => lowercase,
      mac: () => mac,
      md5_base64: () => md5_base64,
      md5_base64url: () => md5_base64url,
      md5_hex: () => md5_hex,
      nanoid: () => nanoid,
      null: () => _null,
      number: () => number,
      rfc5322Email: () => rfc5322Email,
      sha1_base64: () => sha1_base64,
      sha1_base64url: () => sha1_base64url,
      sha1_hex: () => sha1_hex,
      sha256_base64: () => sha256_base64,
      sha256_base64url: () => sha256_base64url,
      sha256_hex: () => sha256_hex,
      sha384_base64: () => sha384_base64,
      sha384_base64url: () => sha384_base64url,
      sha384_hex: () => sha384_hex,
      sha512_base64: () => sha512_base64,
      sha512_base64url: () => sha512_base64url,
      sha512_hex: () => sha512_hex,
      string: () => string,
      time: () => time,
      ulid: () => ulid,
      undefined: () => _undefined,
      unicodeEmail: () => unicodeEmail,
      uppercase: () => uppercase,
      uuid: () => uuid,
      uuid4: () => uuid4,
      uuid6: () => uuid6,
      uuid7: () => uuid7,
      xid: () => xid
    });
    var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    const cuid = /^[cC][0-9a-z]{6,}$/;
    const cuid2 = /^[0-9a-z]+$/;
    const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
    const xid = /^[0-9a-vA-V]{20}$/;
    const ksuid = /^[A-Za-z0-9]{27}$/;
    const nanoid = /^[a-zA-Z0-9_-]{21}$/;
    const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
    const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
    const uuid = version => {
      if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
      return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
    };
    const uuid4 = uuid(4);
    const uuid6 = uuid(6);
    const uuid7 = uuid(7);
    const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
    const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
    const idnEmail = unicodeEmail;
    const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    function emoji() {
      return new RegExp(_emoji, "u");
    }
    const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    const mac = delimiter => {
      const escapedDelim = _util_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegex(delimiter ?? ":");
      return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
    };
    const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
    const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
    const base64url = /^[A-Za-z0-9_-]*$/;
    const hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
    const domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    const httpProtocol = /^https?$/;
    const e164 = /^\+[1-9]\d{6,14}$/;
    const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
    const date = new RegExp(`^${dateSource}$`);
    function timeSource(args) {
      const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
      const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
      return regex;
    }
    function time(args) {
      return new RegExp(`^${timeSource(args)}$`);
    }
    function datetime(args) {
      const time = timeSource({
        precision: args.precision
      });
      const opts = [ "Z" ];
      if (args.local) opts.push("");
      if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
      const timeRegex = `${time}(?:${opts.join("|")})`;
      return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
    }
    const string = params => {
      const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
      return new RegExp(`^${regex}$`);
    };
    const bigint = /^-?\d+n?$/;
    const integer = /^-?\d+$/;
    const number = /^-?\d+(?:\.\d+)?$/;
    const boolean = /^(?:true|false)$/i;
    const _null = /^null$/i;
    const _undefined = /^undefined$/i;
    const lowercase = /^[^A-Z]*$/;
    const uppercase = /^[^a-z]*$/;
    const hex = /^[0-9a-fA-F]*$/;
    function fixedBase64(bodyLength, padding) {
      return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
    }
    function fixedBase64url(length) {
      return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
    }
    const md5_hex = /^[0-9a-fA-F]{32}$/;
    const md5_base64 = fixedBase64(22, "==");
    const md5_base64url = fixedBase64url(22);
    const sha1_hex = /^[0-9a-fA-F]{40}$/;
    const sha1_base64 = fixedBase64(27, "=");
    const sha1_base64url = fixedBase64url(27);
    const sha256_hex = /^[0-9a-fA-F]{64}$/;
    const sha256_base64 = fixedBase64(43, "=");
    const sha256_base64url = fixedBase64url(43);
    const sha384_hex = /^[0-9a-fA-F]{96}$/;
    const sha384_base64 = fixedBase64(64, "");
    const sha384_base64url = fixedBase64url(64);
    const sha512_hex = /^[0-9a-fA-F]{128}$/;
    const sha512_base64 = fixedBase64(86, "==");
    const sha512_base64url = fixedBase64url(86);
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      $ZodRegistry: () => $ZodRegistry,
      $input: () => $input,
      $output: () => $output,
      globalRegistry: () => globalRegistry,
      registry: () => registry
    });
    var _a;
    const $output = Symbol("ZodOutput");
    const $input = Symbol("ZodInput");
    class $ZodRegistry {
      constructor() {
        this._map = new WeakMap;
        this._idmap = new Map;
      }
      add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
          this._idmap.set(meta.id, schema);
        }
        return this;
      }
      clear() {
        this._map = new WeakMap;
        this._idmap = new Map;
        return this;
      }
      remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
          this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
      }
      get(schema) {
        const p = schema._zod.parent;
        if (p) {
          const pm = {
            ...this.get(p) ?? {}
          };
          delete pm.id;
          const f = {
            ...pm,
            ...this._map.get(schema)
          };
          return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
      }
      has(schema) {
        return this._map.has(schema);
      }
    }
    function registry() {
      return new $ZodRegistry;
    }
    (_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
    const globalRegistry = globalThis.__zod_globalRegistry;
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      $ZodAny: () => $ZodAny,
      $ZodArray: () => $ZodArray,
      $ZodBase64: () => $ZodBase64,
      $ZodBase64URL: () => $ZodBase64URL,
      $ZodBigInt: () => $ZodBigInt,
      $ZodBigIntFormat: () => $ZodBigIntFormat,
      $ZodBoolean: () => $ZodBoolean,
      $ZodCIDRv4: () => $ZodCIDRv4,
      $ZodCIDRv6: () => $ZodCIDRv6,
      $ZodCUID: () => $ZodCUID,
      $ZodCUID2: () => $ZodCUID2,
      $ZodCatch: () => $ZodCatch,
      $ZodCodec: () => $ZodCodec,
      $ZodCustom: () => $ZodCustom,
      $ZodCustomStringFormat: () => $ZodCustomStringFormat,
      $ZodDate: () => $ZodDate,
      $ZodDefault: () => $ZodDefault,
      $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
      $ZodE164: () => $ZodE164,
      $ZodEmail: () => $ZodEmail,
      $ZodEmoji: () => $ZodEmoji,
      $ZodEnum: () => $ZodEnum,
      $ZodExactOptional: () => $ZodExactOptional,
      $ZodFile: () => $ZodFile,
      $ZodFunction: () => $ZodFunction,
      $ZodGUID: () => $ZodGUID,
      $ZodIPv4: () => $ZodIPv4,
      $ZodIPv6: () => $ZodIPv6,
      $ZodISODate: () => $ZodISODate,
      $ZodISODateTime: () => $ZodISODateTime,
      $ZodISODuration: () => $ZodISODuration,
      $ZodISOTime: () => $ZodISOTime,
      $ZodIntersection: () => $ZodIntersection,
      $ZodJWT: () => $ZodJWT,
      $ZodKSUID: () => $ZodKSUID,
      $ZodLazy: () => $ZodLazy,
      $ZodLiteral: () => $ZodLiteral,
      $ZodMAC: () => $ZodMAC,
      $ZodMap: () => $ZodMap,
      $ZodNaN: () => $ZodNaN,
      $ZodNanoID: () => $ZodNanoID,
      $ZodNever: () => $ZodNever,
      $ZodNonOptional: () => $ZodNonOptional,
      $ZodNull: () => $ZodNull,
      $ZodNullable: () => $ZodNullable,
      $ZodNumber: () => $ZodNumber,
      $ZodNumberFormat: () => $ZodNumberFormat,
      $ZodObject: () => $ZodObject,
      $ZodObjectJIT: () => $ZodObjectJIT,
      $ZodOptional: () => $ZodOptional,
      $ZodPipe: () => $ZodPipe,
      $ZodPrefault: () => $ZodPrefault,
      $ZodPreprocess: () => $ZodPreprocess,
      $ZodPromise: () => $ZodPromise,
      $ZodReadonly: () => $ZodReadonly,
      $ZodRecord: () => $ZodRecord,
      $ZodSet: () => $ZodSet,
      $ZodString: () => $ZodString,
      $ZodStringFormat: () => $ZodStringFormat,
      $ZodSuccess: () => $ZodSuccess,
      $ZodSymbol: () => $ZodSymbol,
      $ZodTemplateLiteral: () => $ZodTemplateLiteral,
      $ZodTransform: () => $ZodTransform,
      $ZodTuple: () => $ZodTuple,
      $ZodType: () => $ZodType,
      $ZodULID: () => $ZodULID,
      $ZodURL: () => $ZodURL,
      $ZodUUID: () => $ZodUUID,
      $ZodUndefined: () => $ZodUndefined,
      $ZodUnion: () => $ZodUnion,
      $ZodUnknown: () => $ZodUnknown,
      $ZodVoid: () => $ZodVoid,
      $ZodXID: () => $ZodXID,
      $ZodXor: () => $ZodXor,
      clone: () => _util_js__WEBPACK_IMPORTED_MODULE_5__.clone,
      isValidBase64: () => isValidBase64,
      isValidBase64URL: () => isValidBase64URL,
      isValidJWT: () => isValidJWT
    });
    var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js");
    var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    var _doc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doc.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js");
    var _parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js");
    var _regexes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./regexes.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js");
    var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js");
    var _versions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./versions.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js");
    const $ZodType = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodType", (inst, def) => {
      var _a;
      inst ?? (inst = {});
      inst._zod.def = def;
      inst._zod.bag = inst._zod.bag || {};
      inst._zod.version = _versions_js__WEBPACK_IMPORTED_MODULE_6__.version;
      const checks = [ ...inst._zod.def.checks ?? [] ];
      if (inst._zod.traits.has("$ZodCheck")) {
        checks.unshift(inst);
      }
      for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
          fn(inst);
        }
      }
      if (checks.length === 0) {
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred?.push(() => {
          inst._zod.run = inst._zod.parse;
        });
      } else {
        const runChecks = (payload, checks, ctx) => {
          let isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload);
          let asyncResult;
          for (const ch of checks) {
            if (ch._zod.def.when) {
              if (_util_js__WEBPACK_IMPORTED_MODULE_5__.explicitlyAborted(payload)) continue;
              const shouldRun = ch._zod.def.when(payload);
              if (!shouldRun) continue;
            } else if (isAborted) {
              continue;
            }
            const currLen = payload.issues.length;
            const _ = ch._zod.check(payload);
            if (_ instanceof Promise && ctx?.async === false) {
              throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError;
            }
            if (asyncResult || _ instanceof Promise) {
              asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                await _;
                const nextLen = payload.issues.length;
                if (nextLen === currLen) return;
                if (!isAborted) isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
              });
            } else {
              const nextLen = payload.issues.length;
              if (nextLen === currLen) continue;
              if (!isAborted) isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
            }
          }
          if (asyncResult) {
            return asyncResult.then(() => payload);
          }
          return payload;
        };
        const handleCanaryResult = (canary, payload, ctx) => {
          if (_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(canary)) {
            canary.aborted = true;
            return canary;
          }
          const checkResult = runChecks(payload, checks, ctx);
          if (checkResult instanceof Promise) {
            if (ctx.async === false) throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError;
            return checkResult.then(checkResult => inst._zod.parse(checkResult, ctx));
          }
          return inst._zod.parse(checkResult, ctx);
        };
        inst._zod.run = (payload, ctx) => {
          if (ctx.skipChecks) {
            return inst._zod.parse(payload, ctx);
          }
          if (ctx.direction === "backward") {
            const canary = inst._zod.parse({
              value: payload.value,
              issues: []
            }, {
              ...ctx,
              skipChecks: true
            });
            if (canary instanceof Promise) {
              return canary.then(canary => handleCanaryResult(canary, payload, ctx));
            }
            return handleCanaryResult(canary, payload, ctx);
          }
          const result = inst._zod.parse(payload, ctx);
          if (result instanceof Promise) {
            if (ctx.async === false) throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError;
            return result.then(result => runChecks(result, checks, ctx));
          }
          return runChecks(result, checks, ctx);
        };
      }
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst, "~standard", () => ({
        validate: value => {
          try {
            const r = (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParse)(inst, value);
            return r.success ? {
              value: r.data
            } : {
              issues: r.error?.issues
            };
          } catch (_) {
            return (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParseAsync)(inst, value).then(r => r.success ? {
              value: r.data
            } : {
              issues: r.error?.issues
            });
          }
        },
        vendor: "zod",
        version: 1
      }));
    });
    const $ZodString = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodString", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = [ ...inst?._zod.bag?.patterns ?? [] ].pop() ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.string(inst._zod.bag);
      inst._zod.parse = (payload, _) => {
        if (def.coerce) try {
          payload.value = String(payload.value);
        } catch (_) {}
        if (typeof payload.value === "string") return payload;
        payload.issues.push({
          expected: "string",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    const $ZodStringFormat = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodStringFormat", (inst, def) => {
      _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStringFormat.init(inst, def);
      $ZodString.init(inst, def);
    });
    const $ZodGUID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodGUID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.guid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodUUID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUUID", (inst, def) => {
      if (def.version) {
        const versionMap = {
          v1: 1,
          v2: 2,
          v3: 3,
          v4: 4,
          v5: 5,
          v6: 6,
          v7: 7,
          v8: 8
        };
        const v = versionMap[def.version];
        if (v === undefined) throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid(v));
      } else def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid());
      $ZodStringFormat.init(inst, def);
    });
    const $ZodEmail = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmail", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.email);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodURL = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodURL", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = payload => {
        try {
          const trimmed = payload.value.trim();
          if (!def.normalize && def.protocol?.source === _regexes_js__WEBPACK_IMPORTED_MODULE_4__.httpProtocol.source) {
            if (!/^https?:\/\//i.test(trimmed)) {
              payload.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid URL format",
                input: payload.value,
                inst,
                continue: !def.abort
              });
              return;
            }
          }
          const url = new URL(trimmed);
          if (def.hostname) {
            def.hostname.lastIndex = 0;
            if (!def.hostname.test(url.hostname)) {
              payload.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: def.hostname.source,
                input: payload.value,
                inst,
                continue: !def.abort
              });
            }
          }
          if (def.protocol) {
            def.protocol.lastIndex = 0;
            if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
              payload.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid protocol",
                pattern: def.protocol.source,
                input: payload.value,
                inst,
                continue: !def.abort
              });
            }
          }
          if (def.normalize) {
            payload.value = url.href;
          } else {
            payload.value = trimmed;
          }
          return;
        } catch (_) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    const $ZodEmoji = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmoji", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.emoji());
      $ZodStringFormat.init(inst, def);
    });
    const $ZodNanoID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNanoID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.nanoid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodCUID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodCUID2 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID2", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid2);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodULID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodULID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ulid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodXID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodXID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.xid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodKSUID = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodKSUID", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ksuid);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodISODateTime = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODateTime", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.datetime(def));
      $ZodStringFormat.init(inst, def);
    });
    const $ZodISODate = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODate", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.date);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodISOTime = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISOTime", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.time(def));
      $ZodStringFormat.init(inst, def);
    });
    const $ZodISODuration = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODuration", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.duration);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodIPv4 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv4", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv4);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `ipv4`;
    });
    const $ZodIPv6 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv6", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `ipv6`;
      inst._zod.check = payload => {
        try {
          new URL(`http://[${payload.value}]`);
        } catch {
          payload.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    const $ZodMAC = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodMAC", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.mac(def.delimiter));
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `mac`;
    });
    const $ZodCIDRv4 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv4", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv4);
      $ZodStringFormat.init(inst, def);
    });
    const $ZodCIDRv6 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv6", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = payload => {
        const parts = payload.value.split("/");
        try {
          if (parts.length !== 2) throw new Error;
          const [address, prefix] = parts;
          if (!prefix) throw new Error;
          const prefixNum = Number(prefix);
          if (`${prefixNum}` !== prefix) throw new Error;
          if (prefixNum < 0 || prefixNum > 128) throw new Error;
          new URL(`http://[${address}]`);
        } catch {
          payload.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    function isValidBase64(data) {
      if (data === "") return true;
      if (/\s/.test(data)) return false;
      if (data.length % 4 !== 0) return false;
      try {
        atob(data);
        return true;
      } catch {
        return false;
      }
    }
    const $ZodBase64 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.contentEncoding = "base64";
      inst._zod.check = payload => {
        if (isValidBase64(payload.value)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    function isValidBase64URL(data) {
      if (!_regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url.test(data)) return false;
      const base64 = data.replace(/[-_]/g, c => c === "-" ? "+" : "/");
      const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
      return isValidBase64(padded);
    }
    const $ZodBase64URL = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64URL", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.contentEncoding = "base64url";
      inst._zod.check = payload => {
        if (isValidBase64URL(payload.value)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodE164 = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodE164", (inst, def) => {
      def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.e164);
      $ZodStringFormat.init(inst, def);
    });
    function isValidJWT(token, algorithm = null) {
      try {
        const tokensParts = token.split(".");
        if (tokensParts.length !== 3) return false;
        const [header] = tokensParts;
        if (!header) return false;
        const parsedHeader = JSON.parse(atob(header));
        if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
        if (!parsedHeader.alg) return false;
        if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
        return true;
      } catch {
        return false;
      }
    }
    const $ZodJWT = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodJWT", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = payload => {
        if (isValidJWT(payload.value, def.alg)) return;
        payload.issues.push({
          code: "invalid_format",
          format: "jwt",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodCustomStringFormat = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustomStringFormat", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = payload => {
        if (def.fn(payload.value)) return;
        payload.issues.push({
          code: "invalid_format",
          format: def.format,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    const $ZodNumber = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumber", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = inst._zod.bag.pattern ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.number;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) try {
          payload.value = Number(payload.value);
        } catch (_) {}
        const input = payload.value;
        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
          return payload;
        }
        const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : undefined : undefined;
        payload.issues.push({
          expected: "number",
          code: "invalid_type",
          input,
          inst,
          ...received ? {
            received
          } : {}
        });
        return payload;
      };
    });
    const $ZodNumberFormat = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumberFormat", (inst, def) => {
      _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckNumberFormat.init(inst, def);
      $ZodNumber.init(inst, def);
    });
    const $ZodBoolean = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBoolean", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.boolean;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) try {
          payload.value = Boolean(payload.value);
        } catch (_) {}
        const input = payload.value;
        if (typeof input === "boolean") return payload;
        payload.issues.push({
          expected: "boolean",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodBigInt = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigInt", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.bigint;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) try {
          payload.value = BigInt(payload.value);
        } catch (_) {}
        if (typeof payload.value === "bigint") return payload;
        payload.issues.push({
          expected: "bigint",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    const $ZodBigIntFormat = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigIntFormat", (inst, def) => {
      _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckBigIntFormat.init(inst, def);
      $ZodBigInt.init(inst, def);
    });
    const $ZodSymbol = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSymbol", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "symbol") return payload;
        payload.issues.push({
          expected: "symbol",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodUndefined = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUndefined", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.undefined;
      inst._zod.values = new Set([ undefined ]);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined") return payload;
        payload.issues.push({
          expected: "undefined",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodNull = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNull", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__["null"];
      inst._zod.values = new Set([ null ]);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input === null) return payload;
        payload.issues.push({
          expected: "null",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodAny = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodAny", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = payload => payload;
    });
    const $ZodUnknown = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnknown", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = payload => payload;
    });
    const $ZodNever = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNever", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
          expected: "never",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    const $ZodVoid = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodVoid", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined") return payload;
        payload.issues.push({
          expected: "void",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodDate = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDate", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) {
          try {
            payload.value = new Date(payload.value);
          } catch (_err) {}
        }
        const input = payload.value;
        const isDate = input instanceof Date;
        const isValidDate = isDate && !Number.isNaN(input.getTime());
        if (isValidDate) return payload;
        payload.issues.push({
          expected: "date",
          code: "invalid_type",
          input,
          ...isDate ? {
            received: "Invalid Date"
          } : {},
          inst
        });
        return payload;
      };
    });
    function handleArrayResult(result, final, index) {
      if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
      }
      final.value[index] = result.value;
    }
    const $ZodArray = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodArray", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
          payload.issues.push({
            expected: "array",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = Array(input.length);
        const proms = [];
        for (let i = 0; i < input.length; i++) {
          const item = input[i];
          const result = def.element._zod.run({
            value: item,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then(result => handleArrayResult(result, payload, i)));
          } else {
            handleArrayResult(result, payload, i);
          }
        }
        if (proms.length) {
          return Promise.all(proms).then(() => payload);
        }
        return payload;
      };
    });
    function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
      const isPresent = key in input;
      if (result.issues.length) {
        if (isOptionalIn && isOptionalOut && !isPresent) {
          return;
        }
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
      }
      if (!isPresent && !isOptionalIn) {
        if (!result.issues.length) {
          final.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [ key ]
          });
        }
        return;
      }
      if (result.value === undefined) {
        if (isPresent) {
          final.value[key] = undefined;
        }
      } else {
        final.value[key] = result.value;
      }
    }
    function normalizeDef(def) {
      const keys = Object.keys(def.shape);
      for (const k of keys) {
        if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
          throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
        }
      }
      const okeys = _util_js__WEBPACK_IMPORTED_MODULE_5__.optionalKeys(def.shape);
      return {
        ...def,
        keys,
        keySet: new Set(keys),
        numKeys: keys.length,
        optionalKeys: new Set(okeys)
      };
    }
    function handleCatchall(proms, input, payload, ctx, def, inst) {
      const unrecognized = [];
      const keySet = def.keySet;
      const _catchall = def.catchall._zod;
      const t = _catchall.def.type;
      const isOptionalIn = _catchall.optin === "optional";
      const isOptionalOut = _catchall.optout === "optional";
      for (const key in input) {
        if (key === "__proto__") continue;
        if (keySet.has(key)) continue;
        if (t === "never") {
          unrecognized.push(key);
          continue;
        }
        const r = _catchall.run({
          value: input[key],
          issues: []
        }, ctx);
        if (r instanceof Promise) {
          proms.push(r.then(r => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
        } else {
          handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
        }
      }
      if (unrecognized.length) {
        payload.issues.push({
          code: "unrecognized_keys",
          keys: unrecognized,
          input,
          inst
        });
      }
      if (!proms.length) return payload;
      return Promise.all(proms).then(() => payload);
    }
    const $ZodObject = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodObject", (inst, def) => {
      $ZodType.init(inst, def);
      const desc = Object.getOwnPropertyDescriptor(def, "shape");
      if (!desc?.get) {
        const sh = def.shape;
        Object.defineProperty(def, "shape", {
          get: () => {
            const newSh = {
              ...sh
            };
            Object.defineProperty(def, "shape", {
              value: newSh
            });
            return newSh;
          }
        });
      }
      const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => normalizeDef(def));
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const shape = def.shape;
        const propValues = {};
        for (const key in shape) {
          const field = shape[key]._zod;
          if (field.values) {
            propValues[key] ?? (propValues[key] = new Set);
            for (const v of field.values) propValues[key].add(v);
          }
        }
        return propValues;
      });
      const isObject = _util_js__WEBPACK_IMPORTED_MODULE_5__.isObject;
      const catchall = def.catchall;
      let value;
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = {};
        const proms = [];
        const shape = value.shape;
        for (const key of value.keys) {
          const el = shape[key];
          const isOptionalIn = el._zod.optin === "optional";
          const isOptionalOut = el._zod.optout === "optional";
          const r = el._zod.run({
            value: input[key],
            issues: []
          }, ctx);
          if (r instanceof Promise) {
            proms.push(r.then(r => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
          } else {
            handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
          }
        }
        if (!catchall) {
          return proms.length ? Promise.all(proms).then(() => payload) : payload;
        }
        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
      };
    });
    const $ZodObjectJIT = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodObjectJIT", (inst, def) => {
      $ZodObject.init(inst, def);
      const superParse = inst._zod.parse;
      const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => normalizeDef(def));
      const generateFastpass = shape => {
        const doc = new _doc_js__WEBPACK_IMPORTED_MODULE_2__.Doc([ "shape", "payload", "ctx" ]);
        const normalized = _normalized.value;
        const parseStr = key => {
          const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
          return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
        };
        doc.write(`const input = payload.value;`);
        const ids = Object.create(null);
        let counter = 0;
        for (const key of normalized.keys) {
          ids[key] = `key_${counter++}`;
        }
        doc.write(`const newResult = {};`);
        for (const key of normalized.keys) {
          const id = ids[key];
          const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
          const schema = shape[key];
          const isOptionalIn = schema?._zod?.optin === "optional";
          const isOptionalOut = schema?._zod?.optout === "optional";
          doc.write(`const ${id} = ${parseStr(key)};`);
          if (isOptionalIn && isOptionalOut) {
            doc.write(`\n        if (${id}.issues.length) {\n          if (${k} in input) {\n            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({\n              ...iss,\n              path: iss.path ? [${k}, ...iss.path] : [${k}]\n            })));\n          }\n        }\n        \n        if (${id}.value === undefined) {\n          if (${k} in input) {\n            newResult[${k}] = undefined;\n          }\n        } else {\n          newResult[${k}] = ${id}.value;\n        }\n        \n      `);
          } else if (!isOptionalIn) {
            doc.write(`\n        const ${id}_present = ${k} in input;\n        if (${id}.issues.length) {\n          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({\n            ...iss,\n            path: iss.path ? [${k}, ...iss.path] : [${k}]\n          })));\n        }\n        if (!${id}_present && !${id}.issues.length) {\n          payload.issues.push({\n            code: "invalid_type",\n            expected: "nonoptional",\n            input: undefined,\n            path: [${k}]\n          });\n        }\n\n        if (${id}_present) {\n          if (${id}.value === undefined) {\n            newResult[${k}] = undefined;\n          } else {\n            newResult[${k}] = ${id}.value;\n          }\n        }\n\n      `);
          } else {
            doc.write(`\n        if (${id}.issues.length) {\n          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({\n            ...iss,\n            path: iss.path ? [${k}, ...iss.path] : [${k}]\n          })));\n        }\n        \n        if (${id}.value === undefined) {\n          if (${k} in input) {\n            newResult[${k}] = undefined;\n          }\n        } else {\n          newResult[${k}] = ${id}.value;\n        }\n        \n      `);
          }
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        const fn = doc.compile();
        return (payload, ctx) => fn(shape, payload, ctx);
      };
      let fastpass;
      const isObject = _util_js__WEBPACK_IMPORTED_MODULE_5__.isObject;
      const jit = !_core_js__WEBPACK_IMPORTED_MODULE_1__.globalConfig.jitless;
      const allowsEval = _util_js__WEBPACK_IMPORTED_MODULE_5__.allowsEval;
      const fastEnabled = jit && allowsEval.value;
      const catchall = def.catchall;
      let value;
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
          if (!fastpass) fastpass = generateFastpass(def.shape);
          payload = fastpass(payload, ctx);
          if (!catchall) return payload;
          return handleCatchall([], input, payload, ctx, value, inst);
        }
        return superParse(payload, ctx);
      };
    });
    function handleUnionResults(results, final, inst, ctx) {
      for (const result of results) {
        if (result.issues.length === 0) {
          final.value = result.value;
          return final;
        }
      }
      const nonaborted = results.filter(r => !_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(r));
      if (nonaborted.length === 1) {
        final.value = nonaborted[0].value;
        return nonaborted[0];
      }
      final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map(result => result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())))
      });
      return final;
    }
    const $ZodUnion = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnion", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.options.some(o => o._zod.optin === "optional") ? "optional" : undefined);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.options.some(o => o._zod.optout === "optional") ? "optional" : undefined);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        if (def.options.every(o => o._zod.values)) {
          return new Set(def.options.flatMap(option => Array.from(option._zod.values)));
        }
        return undefined;
      });
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        if (def.options.every(o => o._zod.pattern)) {
          const patterns = def.options.map(o => o._zod.pattern);
          return new RegExp(`^(${patterns.map(p => _util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(p.source)).join("|")})$`);
        }
        return undefined;
      });
      const first = def.options.length === 1 ? def.options[0]._zod.run : null;
      inst._zod.parse = (payload, ctx) => {
        if (first) {
          return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
          const result = option._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            results.push(result);
            async = true;
          } else {
            if (result.issues.length === 0) return result;
            results.push(result);
          }
        }
        if (!async) return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then(results => handleUnionResults(results, payload, inst, ctx));
      };
    });
    function handleExclusiveUnionResults(results, final, inst, ctx) {
      const successes = results.filter(r => r.issues.length === 0);
      if (successes.length === 1) {
        final.value = successes[0].value;
        return final;
      }
      if (successes.length === 0) {
        final.issues.push({
          code: "invalid_union",
          input: final.value,
          inst,
          errors: results.map(result => result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())))
        });
      } else {
        final.issues.push({
          code: "invalid_union",
          input: final.value,
          inst,
          errors: [],
          inclusive: false
        });
      }
      return final;
    }
    const $ZodXor = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodXor", (inst, def) => {
      $ZodUnion.init(inst, def);
      def.inclusive = false;
      const first = def.options.length === 1 ? def.options[0]._zod.run : null;
      inst._zod.parse = (payload, ctx) => {
        if (first) {
          return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
          const result = option._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            results.push(result);
            async = true;
          } else {
            results.push(result);
          }
        }
        if (!async) return handleExclusiveUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then(results => handleExclusiveUnionResults(results, payload, inst, ctx));
      };
    });
    const $ZodDiscriminatedUnion = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
      def.inclusive = false;
      $ZodUnion.init(inst, def);
      const _super = inst._zod.parse;
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const propValues = {};
        for (const option of def.options) {
          const pv = option._zod.propValues;
          if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
          for (const [k, v] of Object.entries(pv)) {
            if (!propValues[k]) propValues[k] = new Set;
            for (const val of v) {
              propValues[k].add(val);
            }
          }
        }
        return propValues;
      });
      const disc = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => {
        const opts = def.options;
        const map = new Map;
        for (const o of opts) {
          const values = o._zod.propValues?.[def.discriminator];
          if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
          for (const v of values) {
            if (map.has(v)) {
              throw new Error(`Duplicate discriminator value "${String(v)}"`);
            }
            map.set(v, o);
          }
        }
        return map;
      });
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isObject(input)) {
          payload.issues.push({
            code: "invalid_type",
            expected: "object",
            input,
            inst
          });
          return payload;
        }
        const opt = disc.value.get(input?.[def.discriminator]);
        if (opt) {
          return opt._zod.run(payload, ctx);
        }
        if (def.unionFallback || ctx.direction === "backward") {
          return _super(payload, ctx);
        }
        payload.issues.push({
          code: "invalid_union",
          errors: [],
          note: "No matching discriminator",
          discriminator: def.discriminator,
          options: Array.from(disc.value.keys()),
          input,
          path: [ def.discriminator ],
          inst
        });
        return payload;
      };
    });
    const $ZodIntersection = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIntersection", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({
          value: input,
          issues: []
        }, ctx);
        const right = def.right._zod.run({
          value: input,
          issues: []
        }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
          return Promise.all([ left, right ]).then(([left, right]) => handleIntersectionResults(payload, left, right));
        }
        return handleIntersectionResults(payload, left, right);
      };
    });
    function mergeValues(a, b) {
      if (a === b) {
        return {
          valid: true,
          data: a
        };
      }
      if (a instanceof Date && b instanceof Date && +a === +b) {
        return {
          valid: true,
          data: a
        };
      }
      if (_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(a) && _util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(b)) {
        const bKeys = Object.keys(b);
        const sharedKeys = Object.keys(a).filter(key => bKeys.indexOf(key) !== -1);
        const newObj = {
          ...a,
          ...b
        };
        for (const key of sharedKeys) {
          const sharedValue = mergeValues(a[key], b[key]);
          if (!sharedValue.valid) {
            return {
              valid: false,
              mergeErrorPath: [ key, ...sharedValue.mergeErrorPath ]
            };
          }
          newObj[key] = sharedValue.data;
        }
        return {
          valid: true,
          data: newObj
        };
      }
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
          return {
            valid: false,
            mergeErrorPath: []
          };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
          const itemA = a[index];
          const itemB = b[index];
          const sharedValue = mergeValues(itemA, itemB);
          if (!sharedValue.valid) {
            return {
              valid: false,
              mergeErrorPath: [ index, ...sharedValue.mergeErrorPath ]
            };
          }
          newArray.push(sharedValue.data);
        }
        return {
          valid: true,
          data: newArray
        };
      }
      return {
        valid: false,
        mergeErrorPath: []
      };
    }
    function handleIntersectionResults(result, left, right) {
      const unrecKeys = new Map;
      let unrecIssue;
      for (const iss of left.issues) {
        if (iss.code === "unrecognized_keys") {
          unrecIssue ?? (unrecIssue = iss);
          for (const k of iss.keys) {
            if (!unrecKeys.has(k)) unrecKeys.set(k, {});
            unrecKeys.get(k).l = true;
          }
        } else {
          result.issues.push(iss);
        }
      }
      for (const iss of right.issues) {
        if (iss.code === "unrecognized_keys") {
          for (const k of iss.keys) {
            if (!unrecKeys.has(k)) unrecKeys.set(k, {});
            unrecKeys.get(k).r = true;
          }
        } else {
          result.issues.push(iss);
        }
      }
      const bothKeys = [ ...unrecKeys ].filter(([, f]) => f.l && f.r).map(([k]) => k);
      if (bothKeys.length && unrecIssue) {
        result.issues.push({
          ...unrecIssue,
          keys: bothKeys
        });
      }
      if (_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(result)) return result;
      const merged = mergeValues(left.value, right.value);
      if (!merged.valid) {
        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
      }
      result.value = merged.data;
      return result;
    }
    const $ZodTuple = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTuple", (inst, def) => {
      $ZodType.init(inst, def);
      const items = def.items;
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
          payload.issues.push({
            input,
            inst,
            expected: "tuple",
            code: "invalid_type"
          });
          return payload;
        }
        payload.value = [];
        const proms = [];
        const optinStart = getTupleOptStart(items, "optin");
        const optoutStart = getTupleOptStart(items, "optout");
        if (!def.rest) {
          if (input.length < optinStart) {
            payload.issues.push({
              code: "too_small",
              minimum: optinStart,
              inclusive: true,
              input,
              inst,
              origin: "array"
            });
            return payload;
          }
          if (input.length > items.length) {
            payload.issues.push({
              code: "too_big",
              maximum: items.length,
              inclusive: true,
              input,
              inst,
              origin: "array"
            });
          }
        }
        const itemResults = new Array(items.length);
        for (let i = 0; i < items.length; i++) {
          const r = items[i]._zod.run({
            value: input[i],
            issues: []
          }, ctx);
          if (r instanceof Promise) {
            proms.push(r.then(rr => {
              itemResults[i] = rr;
            }));
          } else {
            itemResults[i] = r;
          }
        }
        if (def.rest) {
          let i = items.length - 1;
          const rest = input.slice(items.length);
          for (const el of rest) {
            i++;
            const result = def.rest._zod.run({
              value: el,
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then(r => handleTupleResult(r, payload, i)));
            } else {
              handleTupleResult(result, payload, i);
            }
          }
        }
        if (proms.length) {
          return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
        }
        return handleTupleResults(itemResults, payload, items, input, optoutStart);
      };
    });
    function getTupleOptStart(items, key) {
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i]._zod[key] !== "optional") return i + 1;
      }
      return 0;
    }
    function handleTupleResult(result, final, index) {
      if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
      }
      final.value[index] = result.value;
    }
    function handleTupleResults(itemResults, final, items, input, optoutStart) {
      for (let i = 0; i < items.length; i++) {
        const r = itemResults[i];
        const isPresent = i < input.length;
        if (r.issues.length) {
          if (!isPresent && i >= optoutStart) {
            final.value.length = i;
            break;
          }
          final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(i, r.issues));
        }
        final.value[i] = r.value;
      }
      for (let i = final.value.length - 1; i >= input.length; i--) {
        if (items[i]._zod.optout === "optional" && final.value[i] === undefined) {
          final.value.length = i;
        } else {
          break;
        }
      }
      return final;
    }
    const $ZodRecord = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodRecord", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(input)) {
          payload.issues.push({
            expected: "record",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        const proms = [];
        const values = def.keyType._zod.values;
        if (values) {
          payload.value = {};
          const recordKeys = new Set;
          for (const key of values) {
            if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
              recordKeys.add(typeof key === "number" ? key.toString() : key);
              const keyResult = def.keyType._zod.run({
                value: key,
                issues: []
              }, ctx);
              if (keyResult instanceof Promise) {
                throw new Error("Async schemas not supported in object keys currently");
              }
              if (keyResult.issues.length) {
                payload.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: keyResult.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                  input: key,
                  path: [ key ],
                  inst
                });
                continue;
              }
              const outKey = keyResult.value;
              const result = def.valueType._zod.run({
                value: input[key],
                issues: []
              }, ctx);
              if (result instanceof Promise) {
                proms.push(result.then(result => {
                  if (result.issues.length) {
                    payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                  }
                  payload.value[outKey] = result.value;
                }));
              } else {
                if (result.issues.length) {
                  payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                }
                payload.value[outKey] = result.value;
              }
            }
          }
          let unrecognized;
          for (const key in input) {
            if (!recordKeys.has(key)) {
              unrecognized = unrecognized ?? [];
              unrecognized.push(key);
            }
          }
          if (unrecognized && unrecognized.length > 0) {
            payload.issues.push({
              code: "unrecognized_keys",
              input,
              inst,
              keys: unrecognized
            });
          }
        } else {
          payload.value = {};
          for (const key of Reflect.ownKeys(input)) {
            if (key === "__proto__") continue;
            if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
            let keyResult = def.keyType._zod.run({
              value: key,
              issues: []
            }, ctx);
            if (keyResult instanceof Promise) {
              throw new Error("Async schemas not supported in object keys currently");
            }
            const checkNumericKey = typeof key === "string" && _regexes_js__WEBPACK_IMPORTED_MODULE_4__.number.test(key) && keyResult.issues.length;
            if (checkNumericKey) {
              const retryResult = def.keyType._zod.run({
                value: Number(key),
                issues: []
              }, ctx);
              if (retryResult instanceof Promise) {
                throw new Error("Async schemas not supported in object keys currently");
              }
              if (retryResult.issues.length === 0) {
                keyResult = retryResult;
              }
            }
            if (keyResult.issues.length) {
              if (def.mode === "loose") {
                payload.value[key] = input[key];
              } else {
                payload.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: keyResult.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                  input: key,
                  path: [ key ],
                  inst
                });
              }
              continue;
            }
            const result = def.valueType._zod.run({
              value: input[key],
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then(result => {
                if (result.issues.length) {
                  payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                }
                payload.value[keyResult.value] = result.value;
              }));
            } else {
              if (result.issues.length) {
                payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
              }
              payload.value[keyResult.value] = result.value;
            }
          }
        }
        if (proms.length) {
          return Promise.all(proms).then(() => payload);
        }
        return payload;
      };
    });
    const $ZodMap = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodMap", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Map)) {
          payload.issues.push({
            expected: "map",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        const proms = [];
        payload.value = new Map;
        for (const [key, value] of input) {
          const keyResult = def.keyType._zod.run({
            value: key,
            issues: []
          }, ctx);
          const valueResult = def.valueType._zod.run({
            value,
            issues: []
          }, ctx);
          if (keyResult instanceof Promise || valueResult instanceof Promise) {
            proms.push(Promise.all([ keyResult, valueResult ]).then(([keyResult, valueResult]) => {
              handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
            }));
          } else {
            handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
          }
        }
        if (proms.length) return Promise.all(proms).then(() => payload);
        return payload;
      };
    });
    function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
      if (keyResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
          final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, keyResult.issues));
        } else {
          final.issues.push({
            code: "invalid_key",
            origin: "map",
            input,
            inst,
            issues: keyResult.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))
          });
        }
      }
      if (valueResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
          final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, valueResult.issues));
        } else {
          final.issues.push({
            origin: "map",
            code: "invalid_element",
            input,
            inst,
            key,
            issues: valueResult.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))
          });
        }
      }
      final.value.set(keyResult.value, valueResult.value);
    }
    const $ZodSet = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSet", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Set)) {
          payload.issues.push({
            input,
            inst,
            expected: "set",
            code: "invalid_type"
          });
          return payload;
        }
        const proms = [];
        payload.value = new Set;
        for (const item of input) {
          const result = def.valueType._zod.run({
            value: item,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then(result => handleSetResult(result, payload)));
          } else handleSetResult(result, payload);
        }
        if (proms.length) return Promise.all(proms).then(() => payload);
        return payload;
      };
    });
    function handleSetResult(result, final) {
      if (result.issues.length) {
        final.issues.push(...result.issues);
      }
      final.value.add(result.value);
    }
    const $ZodEnum = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEnum", (inst, def) => {
      $ZodType.init(inst, def);
      const values = _util_js__WEBPACK_IMPORTED_MODULE_5__.getEnumValues(def.entries);
      const valuesSet = new Set(values);
      inst._zod.values = valuesSet;
      inst._zod.pattern = new RegExp(`^(${values.filter(k => _util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof k)).map(o => typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o.toString()).join("|")})$`);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
          return payload;
        }
        payload.issues.push({
          code: "invalid_value",
          values,
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodLiteral = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLiteral", (inst, def) => {
      $ZodType.init(inst, def);
      if (def.values.length === 0) {
        throw new Error("Cannot create literal schema with no valid values");
      }
      const values = new Set(def.values);
      inst._zod.values = values;
      inst._zod.pattern = new RegExp(`^(${def.values.map(o => typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o.toString()) : String(o)).join("|")})$`);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (values.has(input)) {
          return payload;
        }
        payload.issues.push({
          code: "invalid_value",
          values: def.values,
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodFile = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodFile", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input instanceof File) return payload;
        payload.issues.push({
          expected: "file",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    const $ZodTransform = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTransform", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEncodeError(inst.constructor.name);
        }
        const _out = def.transform(payload.value, payload);
        if (ctx.async) {
          const output = _out instanceof Promise ? _out : Promise.resolve(_out);
          return output.then(output => {
            payload.value = output;
            payload.fallback = true;
            return payload;
          });
        }
        if (_out instanceof Promise) {
          throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError;
        }
        payload.value = _out;
        payload.fallback = true;
        return payload;
      };
    });
    function handleOptionalResult(result, input) {
      if (input === undefined && (result.issues.length || result.fallback)) {
        return {
          issues: [],
          value: undefined
        };
      }
      return result;
    }
    const $ZodOptional = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodOptional", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      inst._zod.optout = "optional";
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values ? new Set([ ...def.innerType._zod.values, undefined ]) : undefined);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)})?$`) : undefined;
      });
      inst._zod.parse = (payload, ctx) => {
        if (def.innerType._zod.optin === "optional") {
          const input = payload.value;
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise) return result.then(r => handleOptionalResult(r, input));
          return handleOptionalResult(result, input);
        }
        if (payload.value === undefined) {
          return payload;
        }
        return def.innerType._zod.run(payload, ctx);
      };
    });
    const $ZodExactOptional = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodExactOptional", (inst, def) => {
      $ZodOptional.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
      inst._zod.parse = (payload, ctx) => def.innerType._zod.run(payload, ctx);
    });
    const $ZodNullable = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNullable", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)}|null)$`) : undefined;
      });
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values ? new Set([ ...def.innerType._zod.values, null ]) : undefined);
      inst._zod.parse = (payload, ctx) => {
        if (payload.value === null) return payload;
        return def.innerType._zod.run(payload, ctx);
      };
    });
    const $ZodDefault = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        if (payload.value === undefined) {
          payload.value = def.defaultValue;
          return payload;
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(result => handleDefaultResult(result, def));
        }
        return handleDefaultResult(result, def);
      };
    });
    function handleDefaultResult(payload, def) {
      if (payload.value === undefined) {
        payload.value = def.defaultValue;
      }
      return payload;
    }
    const $ZodPrefault = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPrefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        if (payload.value === undefined) {
          payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
      };
    });
    const $ZodNonOptional = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNonOptional", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        const v = def.innerType._zod.values;
        return v ? new Set([ ...v ].filter(x => x !== undefined)) : undefined;
      });
      inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(result => handleNonOptionalResult(result, inst));
        }
        return handleNonOptionalResult(result, inst);
      };
    });
    function handleNonOptionalResult(payload, inst) {
      if (!payload.issues.length && payload.value === undefined) {
        payload.issues.push({
          code: "invalid_type",
          expected: "nonoptional",
          input: payload.value,
          inst
        });
      }
      return payload;
    }
    const $ZodSuccess = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSuccess", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEncodeError("ZodSuccess");
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(result => {
            payload.value = result.issues.length === 0;
            return payload;
          });
        }
        payload.value = result.issues.length === 0;
        return payload;
      };
    });
    const $ZodCatch = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCatch", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(result => {
            payload.value = result.value;
            if (result.issues.length) {
              payload.value = def.catchValue({
                ...payload,
                error: {
                  issues: result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))
                },
                input: payload.value
              });
              payload.issues = [];
              payload.fallback = true;
            }
            return payload;
          });
        }
        payload.value = result.value;
        if (result.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result.issues.map(iss => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))
            },
            input: payload.value
          });
          payload.issues = [];
          payload.fallback = true;
        }
        return payload;
      };
    });
    const $ZodNaN = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNaN", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
          payload.issues.push({
            input: payload.value,
            inst,
            expected: "nan",
            code: "invalid_type"
          });
          return payload;
        }
        return payload;
      };
    });
    const $ZodPipe = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPipe", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.in._zod.values);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          const right = def.out._zod.run(payload, ctx);
          if (right instanceof Promise) {
            return right.then(right => handlePipeResult(right, def.in, ctx));
          }
          return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
          return left.then(left => handlePipeResult(left, def.out, ctx));
        }
        return handlePipeResult(left, def.out, ctx);
      };
    });
    function handlePipeResult(left, next, ctx) {
      if (left.issues.length) {
        left.aborted = true;
        return left;
      }
      return next._zod.run({
        value: left.value,
        issues: left.issues,
        fallback: left.fallback
      }, ctx);
    }
    const $ZodCodec = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCodec", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.in._zod.values);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
      inst._zod.parse = (payload, ctx) => {
        const direction = ctx.direction || "forward";
        if (direction === "forward") {
          const left = def.in._zod.run(payload, ctx);
          if (left instanceof Promise) {
            return left.then(left => handleCodecAResult(left, def, ctx));
          }
          return handleCodecAResult(left, def, ctx);
        } else {
          const right = def.out._zod.run(payload, ctx);
          if (right instanceof Promise) {
            return right.then(right => handleCodecAResult(right, def, ctx));
          }
          return handleCodecAResult(right, def, ctx);
        }
      };
    });
    function handleCodecAResult(result, def, ctx) {
      if (result.issues.length) {
        result.aborted = true;
        return result;
      }
      const direction = ctx.direction || "forward";
      if (direction === "forward") {
        const transformed = def.transform(result.value, result);
        if (transformed instanceof Promise) {
          return transformed.then(value => handleCodecTxResult(result, value, def.out, ctx));
        }
        return handleCodecTxResult(result, transformed, def.out, ctx);
      } else {
        const transformed = def.reverseTransform(result.value, result);
        if (transformed instanceof Promise) {
          return transformed.then(value => handleCodecTxResult(result, value, def.in, ctx));
        }
        return handleCodecTxResult(result, transformed, def.in, ctx);
      }
    }
    function handleCodecTxResult(left, value, nextSchema, ctx) {
      if (left.issues.length) {
        left.aborted = true;
        return left;
      }
      return nextSchema._zod.run({
        value,
        issues: left.issues
      }, ctx);
    }
    const $ZodPreprocess = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPreprocess", (inst, def) => {
      $ZodPipe.init(inst, def);
    });
    const $ZodReadonly = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodReadonly", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
      };
    });
    function handleReadonlyResult(payload) {
      payload.value = Object.freeze(payload.value);
      return payload;
    }
    const $ZodTemplateLiteral = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTemplateLiteral", (inst, def) => {
      $ZodType.init(inst, def);
      const regexParts = [];
      for (const part of def.parts) {
        if (typeof part === "object" && part !== null) {
          if (!part._zod.pattern) {
            throw new Error(`Invalid template literal part, no pattern found: ${[ ...part._zod.traits ].shift()}`);
          }
          const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
          if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
          const start = source.startsWith("^") ? 1 : 0;
          const end = source.endsWith("$") ? source.length - 1 : source.length;
          regexParts.push(source.slice(start, end));
        } else if (part === null || _util_js__WEBPACK_IMPORTED_MODULE_5__.primitiveTypes.has(typeof part)) {
          regexParts.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(`${part}`));
        } else {
          throw new Error(`Invalid template literal part: ${part}`);
        }
      }
      inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "string") {
          payload.issues.push({
            input: payload.value,
            inst,
            expected: "string",
            code: "invalid_type"
          });
          return payload;
        }
        inst._zod.pattern.lastIndex = 0;
        if (!inst._zod.pattern.test(payload.value)) {
          payload.issues.push({
            input: payload.value,
            inst,
            code: "invalid_format",
            format: def.format ?? "template_literal",
            pattern: inst._zod.pattern.source
          });
          return payload;
        }
        return payload;
      };
    });
    const $ZodFunction = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodFunction", (inst, def) => {
      $ZodType.init(inst, def);
      inst._def = def;
      inst._zod.def = def;
      inst.implement = func => {
        if (typeof func !== "function") {
          throw new Error("implement() must be called with a function");
        }
        return function(...args) {
          const parsedArgs = inst._def.input ? (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.parse)(inst._def.input, args) : args;
          const result = Reflect.apply(func, this, parsedArgs);
          if (inst._def.output) {
            return (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.parse)(inst._def.output, result);
          }
          return result;
        };
      };
      inst.implementAsync = func => {
        if (typeof func !== "function") {
          throw new Error("implementAsync() must be called with a function");
        }
        return async function(...args) {
          const parsedArgs = inst._def.input ? await (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.parseAsync)(inst._def.input, args) : args;
          const result = await Reflect.apply(func, this, parsedArgs);
          if (inst._def.output) {
            return await (0, _parse_js__WEBPACK_IMPORTED_MODULE_3__.parseAsync)(inst._def.output, result);
          }
          return result;
        };
      };
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "function") {
          payload.issues.push({
            code: "invalid_type",
            expected: "function",
            input: payload.value,
            inst
          });
          return payload;
        }
        const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
        if (hasPromiseOutput) {
          payload.value = inst.implementAsync(payload.value);
        } else {
          payload.value = inst.implement(payload.value);
        }
        return payload;
      };
      inst.input = (...args) => {
        const F = inst.constructor;
        if (Array.isArray(args[0])) {
          return new F({
            type: "function",
            input: new $ZodTuple({
              type: "tuple",
              items: args[0],
              rest: args[1]
            }),
            output: inst._def.output
          });
        }
        return new F({
          type: "function",
          input: args[0],
          output: inst._def.output
        });
      };
      inst.output = output => {
        const F = inst.constructor;
        return new F({
          type: "function",
          input: inst._def.input,
          output
        });
      };
      return inst;
    });
    const $ZodPromise = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPromise", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => Promise.resolve(payload.value).then(inner => def.innerType._zod.run({
        value: inner,
        issues: []
      }, ctx));
    });
    const $ZodLazy = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLazy", (inst, def) => {
      $ZodType.init(inst, def);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "innerType", () => {
        const d = def;
        if (!d._cachedInner) d._cachedInner = def.getter();
        return d._cachedInner;
      });
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? undefined);
      _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? undefined);
      inst._zod.parse = (payload, ctx) => {
        const inner = inst._zod.innerType;
        return inner._zod.run(payload, ctx);
      };
    });
    const $ZodCustom = _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustom", (inst, def) => {
      _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck.init(inst, def);
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _) => payload;
      inst._zod.check = payload => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
          return r.then(r => handleRefineResult(r, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
      };
    });
    function handleRefineResult(result, payload, input, inst) {
      if (!result) {
        const _iss = {
          code: "custom",
          input,
          inst,
          path: [ ...inst._zod.def.path ?? [] ],
          continue: !inst._zod.def.abort
        };
        if (inst._zod.def.params) _iss.params = inst._zod.def.params;
        payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.issue(_iss));
      }
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
      createToJSONSchemaMethod: () => createToJSONSchemaMethod,
      extractDefs: () => extractDefs,
      finalize: () => finalize,
      initializeContext: () => initializeContext,
      process: () => process
    });
    var _registries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registries.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js");
    function initializeContext(params) {
      let target = params?.target ?? "draft-2020-12";
      if (target === "draft-4") target = "draft-04";
      if (target === "draft-7") target = "draft-07";
      return {
        processors: params.processors ?? {},
        metadataRegistry: params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry,
        target,
        unrepresentable: params?.unrepresentable ?? "throw",
        override: params?.override ?? (() => {}),
        io: params?.io ?? "output",
        counter: 0,
        seen: new Map,
        cycles: params?.cycles ?? "ref",
        reused: params?.reused ?? "inline",
        external: params?.external ?? undefined
      };
    }
    function process(schema, ctx, _params = {
      path: [],
      schemaPath: []
    }) {
      var _a;
      const def = schema._zod.def;
      const seen = ctx.seen.get(schema);
      if (seen) {
        seen.count++;
        const isCycle = _params.schemaPath.includes(schema);
        if (isCycle) {
          seen.cycle = _params.path;
        }
        return seen.schema;
      }
      const result = {
        schema: {},
        count: 1,
        cycle: undefined,
        path: _params.path
      };
      ctx.seen.set(schema, result);
      const overrideSchema = schema._zod.toJSONSchema?.();
      if (overrideSchema) {
        result.schema = overrideSchema;
      } else {
        const params = {
          ..._params,
          schemaPath: [ ..._params.schemaPath, schema ],
          path: _params.path
        };
        if (schema._zod.processJSONSchema) {
          schema._zod.processJSONSchema(ctx, result.schema, params);
        } else {
          const _json = result.schema;
          const processor = ctx.processors[def.type];
          if (!processor) {
            throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
          }
          processor(schema, ctx, _json, params);
        }
        const parent = schema._zod.parent;
        if (parent) {
          if (!result.ref) result.ref = parent;
          process(parent, ctx, params);
          ctx.seen.get(parent).isParent = true;
        }
      }
      const meta = ctx.metadataRegistry.get(schema);
      if (meta) Object.assign(result.schema, meta);
      if (ctx.io === "input" && isTransforming(schema)) {
        delete result.schema.examples;
        delete result.schema.default;
      }
      if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
      delete result.schema._prefault;
      const _result = ctx.seen.get(schema);
      return _result.schema;
    }
    function extractDefs(ctx, schema) {
      const root = ctx.seen.get(schema);
      if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
      const idToSchema = new Map;
      for (const entry of ctx.seen.entries()) {
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
          const existing = idToSchema.get(id);
          if (existing && existing !== entry[0]) {
            throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
          }
          idToSchema.set(id, entry[0]);
        }
      }
      const makeURI = entry => {
        const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
        if (ctx.external) {
          const externalId = ctx.external.registry.get(entry[0])?.id;
          const uriGenerator = ctx.external.uri ?? (id => id);
          if (externalId) {
            return {
              ref: uriGenerator(externalId)
            };
          }
          const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
          entry[1].defId = id;
          return {
            defId: id,
            ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
          };
        }
        if (entry[1] === root) {
          return {
            ref: "#"
          };
        }
        const uriPrefix = `#`;
        const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
        const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
        return {
          defId,
          ref: defUriPrefix + defId
        };
      };
      const extractToDef = entry => {
        if (entry[1].schema.$ref) {
          return;
        }
        const seen = entry[1];
        const {ref, defId} = makeURI(entry);
        seen.def = {
          ...seen.schema
        };
        if (defId) seen.defId = defId;
        const schema = seen.schema;
        for (const key in schema) {
          delete schema[key];
        }
        schema.$ref = ref;
      };
      if (ctx.cycles === "throw") {
        for (const entry of ctx.seen.entries()) {
          const seen = entry[1];
          if (seen.cycle) {
            throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
          }
        }
      }
      for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        if (schema === entry[0]) {
          extractToDef(entry);
          continue;
        }
        if (ctx.external) {
          const ext = ctx.external.registry.get(entry[0])?.id;
          if (schema !== entry[0] && ext) {
            extractToDef(entry);
            continue;
          }
        }
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
          extractToDef(entry);
          continue;
        }
        if (seen.cycle) {
          extractToDef(entry);
          continue;
        }
        if (seen.count > 1) {
          if (ctx.reused === "ref") {
            extractToDef(entry);
            continue;
          }
        }
      }
    }
    function finalize(ctx, schema) {
      const root = ctx.seen.get(schema);
      if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
      const flattenRef = zodSchema => {
        const seen = ctx.seen.get(zodSchema);
        if (seen.ref === null) return;
        const schema = seen.def ?? seen.schema;
        const _cached = {
          ...schema
        };
        const ref = seen.ref;
        seen.ref = null;
        if (ref) {
          flattenRef(ref);
          const refSeen = ctx.seen.get(ref);
          const refSchema = refSeen.schema;
          if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
            schema.allOf = schema.allOf ?? [];
            schema.allOf.push(refSchema);
          } else {
            Object.assign(schema, refSchema);
          }
          Object.assign(schema, _cached);
          const isParentRef = zodSchema._zod.parent === ref;
          if (isParentRef) {
            for (const key in schema) {
              if (key === "$ref" || key === "allOf") continue;
              if (!(key in _cached)) {
                delete schema[key];
              }
            }
          }
          if (refSchema.$ref && refSeen.def) {
            for (const key in schema) {
              if (key === "$ref" || key === "allOf") continue;
              if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
                delete schema[key];
              }
            }
          }
        }
        const parent = zodSchema._zod.parent;
        if (parent && parent !== ref) {
          flattenRef(parent);
          const parentSeen = ctx.seen.get(parent);
          if (parentSeen?.schema.$ref) {
            schema.$ref = parentSeen.schema.$ref;
            if (parentSeen.def) {
              for (const key in schema) {
                if (key === "$ref" || key === "allOf") continue;
                if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
                  delete schema[key];
                }
              }
            }
          }
        }
        ctx.override({
          zodSchema,
          jsonSchema: schema,
          path: seen.path ?? []
        });
      };
      for (const entry of [ ...ctx.seen.entries() ].reverse()) {
        flattenRef(entry[0]);
      }
      const result = {};
      if (ctx.target === "draft-2020-12") {
        result.$schema = "https://json-schema.org/draft/2020-12/schema";
      } else if (ctx.target === "draft-07") {
        result.$schema = "http://json-schema.org/draft-07/schema#";
      } else if (ctx.target === "draft-04") {
        result.$schema = "http://json-schema.org/draft-04/schema#";
      } else if (ctx.target === "openapi-3.0") {} else {}
      if (ctx.external?.uri) {
        const id = ctx.external.registry.get(schema)?.id;
        if (!id) throw new Error("Schema is missing an `id` property");
        result.$id = ctx.external.uri(id);
      }
      Object.assign(result, root.def ?? root.schema);
      const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
      if (rootMetaId !== undefined && result.id === rootMetaId) delete result.id;
      const defs = ctx.external?.defs ?? {};
      for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        if (seen.def && seen.defId) {
          if (seen.def.id === seen.defId) delete seen.def.id;
          defs[seen.defId] = seen.def;
        }
      }
      if (ctx.external) {} else {
        if (Object.keys(defs).length > 0) {
          if (ctx.target === "draft-2020-12") {
            result.$defs = defs;
          } else {
            result.definitions = defs;
          }
        }
      }
      try {
        const finalized = JSON.parse(JSON.stringify(result));
        Object.defineProperty(finalized, "~standard", {
          value: {
            ...schema["~standard"],
            jsonSchema: {
              input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
              output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
            }
          },
          enumerable: false,
          writable: false
        });
        return finalized;
      } catch (_err) {
        throw new Error("Error converting schema to JSON.");
      }
    }
    function isTransforming(_schema, _ctx) {
      const ctx = _ctx ?? {
        seen: new Set
      };
      if (ctx.seen.has(_schema)) return false;
      ctx.seen.add(_schema);
      const def = _schema._zod.def;
      if (def.type === "transform") return true;
      if (def.type === "array") return isTransforming(def.element, ctx);
      if (def.type === "set") return isTransforming(def.valueType, ctx);
      if (def.type === "lazy") return isTransforming(def.getter(), ctx);
      if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
        return isTransforming(def.innerType, ctx);
      }
      if (def.type === "intersection") {
        return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
      }
      if (def.type === "record" || def.type === "map") {
        return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
      }
      if (def.type === "pipe") {
        if (_schema._zod.traits.has("$ZodCodec")) return true;
        return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
      }
      if (def.type === "object") {
        for (const key in def.shape) {
          if (isTransforming(def.shape[key], ctx)) return true;
        }
        return false;
      }
      if (def.type === "union") {
        for (const option of def.options) {
          if (isTransforming(option, ctx)) return true;
        }
        return false;
      }
      if (def.type === "tuple") {
        for (const item of def.items) {
          if (isTransforming(item, ctx)) return true;
        }
        if (def.rest && isTransforming(def.rest, ctx)) return true;
        return false;
      }
      return false;
    }
    const createToJSONSchemaMethod = (schema, processors = {}) => params => {
      const ctx = initializeContext({
        ...params,
        processors
      });
      process(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    };
    const createStandardJSONSchemaMethod = (schema, io, processors = {}) => params => {
      const {libraryOptions, target} = params ?? {};
      const ctx = initializeContext({
        ...libraryOptions ?? {},
        target,
        io,
        processors
      });
      process(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    };
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
      Class: () => Class,
      NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
      aborted: () => aborted,
      allowsEval: () => allowsEval,
      assert: () => assert,
      assertEqual: () => assertEqual,
      assertIs: () => assertIs,
      assertNever: () => assertNever,
      assertNotEqual: () => assertNotEqual,
      assignProp: () => assignProp,
      base64ToUint8Array: () => base64ToUint8Array,
      base64urlToUint8Array: () => base64urlToUint8Array,
      cached: () => cached,
      captureStackTrace: () => captureStackTrace,
      cleanEnum: () => cleanEnum,
      cleanRegex: () => cleanRegex,
      clone: () => clone,
      cloneDef: () => cloneDef,
      createTransparentProxy: () => createTransparentProxy,
      defineLazy: () => defineLazy,
      esc: () => esc,
      escapeRegex: () => escapeRegex,
      explicitlyAborted: () => explicitlyAborted,
      extend: () => extend,
      finalizeIssue: () => finalizeIssue,
      floatSafeRemainder: () => floatSafeRemainder,
      getElementAtPath: () => getElementAtPath,
      getEnumValues: () => getEnumValues,
      getLengthableOrigin: () => getLengthableOrigin,
      getParsedType: () => getParsedType,
      getSizableOrigin: () => getSizableOrigin,
      hexToUint8Array: () => hexToUint8Array,
      isObject: () => isObject,
      isPlainObject: () => isPlainObject,
      issue: () => issue,
      joinValues: () => joinValues,
      jsonStringifyReplacer: () => jsonStringifyReplacer,
      merge: () => merge,
      mergeDefs: () => mergeDefs,
      normalizeParams: () => normalizeParams,
      nullish: () => nullish,
      numKeys: () => numKeys,
      objectClone: () => objectClone,
      omit: () => omit,
      optionalKeys: () => optionalKeys,
      parsedType: () => parsedType,
      partial: () => partial,
      pick: () => pick,
      prefixIssues: () => prefixIssues,
      primitiveTypes: () => primitiveTypes,
      promiseAllObject: () => promiseAllObject,
      propertyKeyTypes: () => propertyKeyTypes,
      randomString: () => randomString,
      required: () => required,
      safeExtend: () => safeExtend,
      shallowClone: () => shallowClone,
      slugify: () => slugify,
      stringifyPrimitive: () => stringifyPrimitive,
      uint8ArrayToBase64: () => uint8ArrayToBase64,
      uint8ArrayToBase64url: () => uint8ArrayToBase64url,
      uint8ArrayToHex: () => uint8ArrayToHex,
      unwrapMessage: () => unwrapMessage
    });
    var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js");
    function assertEqual(val) {
      return val;
    }
    function assertNotEqual(val) {
      return val;
    }
    function assertIs(_arg) {}
    function assertNever(_x) {
      throw new Error("Unexpected value in exhaustive check");
    }
    function assert(_) {}
    function getEnumValues(entries) {
      const numericValues = Object.values(entries).filter(v => typeof v === "number");
      const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
      return values;
    }
    function joinValues(array, separator = "|") {
      return array.map(val => stringifyPrimitive(val)).join(separator);
    }
    function jsonStringifyReplacer(_, value) {
      if (typeof value === "bigint") return value.toString();
      return value;
    }
    function cached(getter) {
      const set = false;
      return {
        get value() {
          if (!set) {
            const value = getter();
            Object.defineProperty(this, "value", {
              value
            });
            return value;
          }
          throw new Error("cached value already set");
        }
      };
    }
    function nullish(input) {
      return input === null || input === undefined;
    }
    function cleanRegex(source) {
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      return source.slice(start, end);
    }
    function floatSafeRemainder(val, step) {
      const ratio = val / step;
      const roundedRatio = Math.round(ratio);
      const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
      if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
      return ratio - roundedRatio;
    }
    const EVALUATING = Symbol("evaluating");
    function defineLazy(object, key, getter) {
      let value = undefined;
      Object.defineProperty(object, key, {
        get() {
          if (value === EVALUATING) {
            return undefined;
          }
          if (value === undefined) {
            value = EVALUATING;
            value = getter();
          }
          return value;
        },
        set(v) {
          Object.defineProperty(object, key, {
            value: v
          });
        },
        configurable: true
      });
    }
    function objectClone(obj) {
      return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    }
    function assignProp(target, prop, value) {
      Object.defineProperty(target, prop, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    function mergeDefs(...defs) {
      const mergedDescriptors = {};
      for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
      }
      return Object.defineProperties({}, mergedDescriptors);
    }
    function cloneDef(schema) {
      return mergeDefs(schema._zod.def);
    }
    function getElementAtPath(obj, path) {
      if (!path) return obj;
      return path.reduce((acc, key) => acc?.[key], obj);
    }
    function promiseAllObject(promisesObj) {
      const keys = Object.keys(promisesObj);
      const promises = keys.map(key => promisesObj[key]);
      return Promise.all(promises).then(results => {
        const resolvedObj = {};
        for (let i = 0; i < keys.length; i++) {
          resolvedObj[keys[i]] = results[i];
        }
        return resolvedObj;
      });
    }
    function randomString(length = 10) {
      const chars = "abcdefghijklmnopqrstuvwxyz";
      let str = "";
      for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    }
    function esc(str) {
      return JSON.stringify(str);
    }
    function slugify(input) {
      return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
    }
    const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
    function isObject(data) {
      return typeof data === "object" && data !== null && !Array.isArray(data);
    }
    const allowsEval = cached(() => {
      if (_core_js__WEBPACK_IMPORTED_MODULE_0__.globalConfig.jitless) {
        return false;
      }
      if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
        return false;
      }
      try {
        const F = Function;
        new F("");
        return true;
      } catch (_) {
        return false;
      }
    });
    function isPlainObject(o) {
      if (isObject(o) === false) return false;
      const ctor = o.constructor;
      if (ctor === undefined) return true;
      if (typeof ctor !== "function") return true;
      const prot = ctor.prototype;
      if (isObject(prot) === false) return false;
      if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
      }
      return true;
    }
    function shallowClone(o) {
      if (isPlainObject(o)) return {
        ...o
      };
      if (Array.isArray(o)) return [ ...o ];
      if (o instanceof Map) return new Map(o);
      if (o instanceof Set) return new Set(o);
      return o;
    }
    function numKeys(data) {
      let keyCount = 0;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          keyCount++;
        }
      }
      return keyCount;
    }
    const getParsedType = data => {
      const t = typeof data;
      switch (t) {
       case "undefined":
        return "undefined";

       case "string":
        return "string";

       case "number":
        return Number.isNaN(data) ? "nan" : "number";

       case "boolean":
        return "boolean";

       case "function":
        return "function";

       case "bigint":
        return "bigint";

       case "symbol":
        return "symbol";

       case "object":
        if (Array.isArray(data)) {
          return "array";
        }
        if (data === null) {
          return "null";
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return "promise";
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return "map";
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return "set";
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return "date";
        }
        if (typeof File !== "undefined" && data instanceof File) {
          return "file";
        }
        return "object";

       default:
        throw new Error(`Unknown data type: ${t}`);
      }
    };
    const propertyKeyTypes = new Set([ "string", "number", "symbol" ]);
    const primitiveTypes = new Set([ "string", "number", "bigint", "boolean", "symbol", "undefined" ]);
    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function clone(inst, def, params) {
      const cl = new inst._zod.constr(def ?? inst._zod.def);
      if (!def || params?.parent) cl._zod.parent = inst;
      return cl;
    }
    function normalizeParams(_params) {
      const params = _params;
      if (!params) return {};
      if (typeof params === "string") return {
        error: () => params
      };
      if (params?.message !== undefined) {
        if (params?.error !== undefined) throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
      }
      delete params.message;
      if (typeof params.error === "string") return {
        ...params,
        error: () => params.error
      };
      return params;
    }
    function createTransparentProxy(getter) {
      let target;
      return new Proxy({}, {
        get(_, prop, receiver) {
          target ?? (target = getter());
          return Reflect.get(target, prop, receiver);
        },
        set(_, prop, value, receiver) {
          target ?? (target = getter());
          return Reflect.set(target, prop, value, receiver);
        },
        has(_, prop) {
          target ?? (target = getter());
          return Reflect.has(target, prop);
        },
        deleteProperty(_, prop) {
          target ?? (target = getter());
          return Reflect.deleteProperty(target, prop);
        },
        ownKeys(_) {
          target ?? (target = getter());
          return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(_, prop) {
          target ?? (target = getter());
          return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(_, prop, descriptor) {
          target ?? (target = getter());
          return Reflect.defineProperty(target, prop, descriptor);
        }
      });
    }
    function stringifyPrimitive(value) {
      if (typeof value === "bigint") return value.toString() + "n";
      if (typeof value === "string") return `"${value}"`;
      return `${value}`;
    }
    function optionalKeys(shape) {
      return Object.keys(shape).filter(k => shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional");
    }
    const NUMBER_FORMAT_RANGES = {
      safeint: [ Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ],
      int32: [ -2147483648, 2147483647 ],
      uint32: [ 0, 4294967295 ],
      float32: [ -34028234663852886e22, 34028234663852886e22 ],
      float64: [ -Number.MAX_VALUE, Number.MAX_VALUE ]
    };
    const BIGINT_FORMAT_RANGES = {
      int64: [ BigInt("-9223372036854775808"), BigInt("9223372036854775807") ],
      uint64: [ BigInt(0), BigInt("18446744073709551615") ]
    };
    function pick(schema, mask) {
      const currDef = schema._zod.def;
      const checks = currDef.checks;
      const hasChecks = checks && checks.length > 0;
      if (hasChecks) {
        throw new Error(".pick() cannot be used on object schemas containing refinements");
      }
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const newShape = {};
          for (const key in mask) {
            if (!(key in currDef.shape)) {
              throw new Error(`Unrecognized key: "${key}"`);
            }
            if (!mask[key]) continue;
            newShape[key] = currDef.shape[key];
          }
          assignProp(this, "shape", newShape);
          return newShape;
        },
        checks: []
      });
      return clone(schema, def);
    }
    function omit(schema, mask) {
      const currDef = schema._zod.def;
      const checks = currDef.checks;
      const hasChecks = checks && checks.length > 0;
      if (hasChecks) {
        throw new Error(".omit() cannot be used on object schemas containing refinements");
      }
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const newShape = {
            ...schema._zod.def.shape
          };
          for (const key in mask) {
            if (!(key in currDef.shape)) {
              throw new Error(`Unrecognized key: "${key}"`);
            }
            if (!mask[key]) continue;
            delete newShape[key];
          }
          assignProp(this, "shape", newShape);
          return newShape;
        },
        checks: []
      });
      return clone(schema, def);
    }
    function extend(schema, shape) {
      if (!isPlainObject(shape)) {
        throw new Error("Invalid input to extend: expected a plain object");
      }
      const checks = schema._zod.def.checks;
      const hasChecks = checks && checks.length > 0;
      if (hasChecks) {
        const existingShape = schema._zod.def.shape;
        for (const key in shape) {
          if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
            throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
          }
        }
      }
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const _shape = {
            ...schema._zod.def.shape,
            ...shape
          };
          assignProp(this, "shape", _shape);
          return _shape;
        }
      });
      return clone(schema, def);
    }
    function safeExtend(schema, shape) {
      if (!isPlainObject(shape)) {
        throw new Error("Invalid input to safeExtend: expected a plain object");
      }
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const _shape = {
            ...schema._zod.def.shape,
            ...shape
          };
          assignProp(this, "shape", _shape);
          return _shape;
        }
      });
      return clone(schema, def);
    }
    function merge(a, b) {
      if (a._zod.def.checks?.length) {
        throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
      }
      const def = mergeDefs(a._zod.def, {
        get shape() {
          const _shape = {
            ...a._zod.def.shape,
            ...b._zod.def.shape
          };
          assignProp(this, "shape", _shape);
          return _shape;
        },
        get catchall() {
          return b._zod.def.catchall;
        },
        checks: b._zod.def.checks ?? []
      });
      return clone(a, def);
    }
    function partial(Class, schema, mask) {
      const currDef = schema._zod.def;
      const checks = currDef.checks;
      const hasChecks = checks && checks.length > 0;
      if (hasChecks) {
        throw new Error(".partial() cannot be used on object schemas containing refinements");
      }
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const oldShape = schema._zod.def.shape;
          const shape = {
            ...oldShape
          };
          if (mask) {
            for (const key in mask) {
              if (!(key in oldShape)) {
                throw new Error(`Unrecognized key: "${key}"`);
              }
              if (!mask[key]) continue;
              shape[key] = Class ? new Class({
                type: "optional",
                innerType: oldShape[key]
              }) : oldShape[key];
            }
          } else {
            for (const key in oldShape) {
              shape[key] = Class ? new Class({
                type: "optional",
                innerType: oldShape[key]
              }) : oldShape[key];
            }
          }
          assignProp(this, "shape", shape);
          return shape;
        },
        checks: []
      });
      return clone(schema, def);
    }
    function required(Class, schema, mask) {
      const def = mergeDefs(schema._zod.def, {
        get shape() {
          const oldShape = schema._zod.def.shape;
          const shape = {
            ...oldShape
          };
          if (mask) {
            for (const key in mask) {
              if (!(key in shape)) {
                throw new Error(`Unrecognized key: "${key}"`);
              }
              if (!mask[key]) continue;
              shape[key] = new Class({
                type: "nonoptional",
                innerType: oldShape[key]
              });
            }
          } else {
            for (const key in oldShape) {
              shape[key] = new Class({
                type: "nonoptional",
                innerType: oldShape[key]
              });
            }
          }
          assignProp(this, "shape", shape);
          return shape;
        }
      });
      return clone(schema, def);
    }
    function aborted(x, startIndex = 0) {
      if (x.aborted === true) return true;
      for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
          return true;
        }
      }
      return false;
    }
    function explicitlyAborted(x, startIndex = 0) {
      if (x.aborted === true) return true;
      for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue === false) {
          return true;
        }
      }
      return false;
    }
    function prefixIssues(path, issues) {
      return issues.map(iss => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
      });
    }
    function unwrapMessage(message) {
      return typeof message === "string" ? message : message?.message;
    }
    function finalizeIssue(iss, ctx, config) {
      const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
      const {inst: _inst, continue: _continue, input: _input, ...rest} = iss;
      rest.path ?? (rest.path = []);
      rest.message = message;
      if (ctx?.reportInput) {
        rest.input = _input;
      }
      return rest;
    }
    function getSizableOrigin(input) {
      if (input instanceof Set) return "set";
      if (input instanceof Map) return "map";
      if (input instanceof File) return "file";
      return "unknown";
    }
    function getLengthableOrigin(input) {
      if (Array.isArray(input)) return "array";
      if (typeof input === "string") return "string";
      return "unknown";
    }
    function parsedType(data) {
      const t = typeof data;
      switch (t) {
       case "number":
        {
          return Number.isNaN(data) ? "nan" : "number";
        }

       case "object":
        {
          if (data === null) {
            return "null";
          }
          if (Array.isArray(data)) {
            return "array";
          }
          const obj = data;
          if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
            return obj.constructor.name;
          }
        }
      }
      return t;
    }
    function issue(...args) {
      const [iss, input, inst] = args;
      if (typeof iss === "string") {
        return {
          message: iss,
          code: "custom",
          input,
          inst
        };
      }
      return {
        ...iss
      };
    }
    function cleanEnum(obj) {
      return Object.entries(obj).filter(([k, _]) => Number.isNaN(Number.parseInt(k, 10))).map(el => el[1]);
    }
    function base64ToUint8Array(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }
    function uint8ArrayToBase64(bytes) {
      let binaryString = "";
      for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }
      return btoa(binaryString);
    }
    function base64urlToUint8Array(base64url) {
      const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
      const padding = "=".repeat((4 - base64.length % 4) % 4);
      return base64ToUint8Array(base64 + padding);
    }
    function uint8ArrayToBase64url(bytes) {
      return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    function hexToUint8Array(hex) {
      const cleanHex = hex.replace(/^0x/, "");
      if (cleanHex.length % 2 !== 0) {
        throw new Error("Invalid hex string length");
      }
      const bytes = new Uint8Array(cleanHex.length / 2);
      for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
      }
      return bytes;
    }
    function uint8ArrayToHex(bytes) {
      return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    class Class {
      constructor(..._args) {}
    }
  },
  "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js"(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      version: () => version
    });
    const version = {
      major: 4,
      minor: 4,
      patch: 3
    };
  }
};

const __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  const cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  const module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };
  if (!(moduleId in __webpack_modules__)) {
    delete __webpack_module_cache__[moduleId];
    const e = new Error("Cannot find module '" + moduleId + "'");
    e.code = "MODULE_NOT_FOUND";
    throw e;
  }
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}

(() => {
  __webpack_require__.d = (exports, definition) => {
    if (Array.isArray(definition)) {
      var i = 0;
      while (i < definition.length) {
        var key = definition[i++];
        var binding = definition[i++];
        if (!__webpack_require__.o(exports, key)) {
          if (binding === 0) {
            Object.defineProperty(exports, key, {
              enumerable: true,
              value: definition[i++]
            });
          } else {
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: binding
            });
          }
        } else if (binding === 0) {
          i++;
        }
      }
    } else {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
        }
      }
    }
  };
})();

(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();

(() => {
  __webpack_require__.r = exports => {
    if (Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  };
})();

let __webpack_exports__ = {};

(() => {
  /*!****************************************!*\
  !*** ./src/神奇手机/神奇手机/脚本/变量结构/index.ts ***!
  \****************************************/
  __webpack_require__.r(__webpack_exports__);
  var https_testingcf_jsdelivr_net_gh_StageDog_tavern_resource_dist_util_mvu_zod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js */ "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js");
  var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../schema */ "./src/神奇手机/神奇手机/schema.ts");
  $(() => {
    (0, https_testingcf_jsdelivr_net_gh_StageDog_tavern_resource_dist_util_mvu_zod_js__WEBPACK_IMPORTED_MODULE_0__.registerMvuSchema)(_schema__WEBPACK_IMPORTED_MODULE_1__.Schema);
  });
})();