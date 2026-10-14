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
  "./src/神奇手机/神奇手机/核心/任务系统.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      产业表: () => 产业表,
      做局表: () => 做局表,
      抢表: () => 抢表,
      接活表: () => 接活表,
      派发示例: () => 派发示例,
      钱路: () => 钱路
    });
    const 接活表 = [ {
      名: "代拍",
      来源: "小红书 / 抖音",
      档: "活",
      前金: 0,
      报酬: "300 ~ 1500 / 单",
      门槛: "有设备就行",
      失败后果: "★ 被拍的人发现 → 删照片 + 赔钱",
      手机作用: '★ 手机拍的照"不留下拍摄者信息" —— 省掉被溯源的风险'
    }, {
      名: "跑腿 / 送东西",
      来源: "Telegram 门槛群",
      档: "活",
      前金: 0,
      报酬: "500 ~ 2000 / 次",
      门槛: "★ 要有人担保（Lv30 后手机能解决）",
      失败后果: "★ 东西丢了 → 自己赔",
      手机作用: '★★ 他走进任何地方，走出来的记录不存在 —— 这一条就是"跑腿"最值钱的地方'
    }, {
      名: "翻译 / 陪聊",
      来源: "OnlyFans / 推特",
      档: "活",
      前金: 0,
      报酬: "按小时，200 ~ 800",
      门槛: "语言通用",
      失败后果: "★ 被投诉 → 掉订阅",
      手机作用: '★ 破译让他听懂"她真正想说什么"'
    }, {
      名: "代聊（chatter）",
      来源: "OnlyFans",
      档: "活",
      前金: 0,
      报酬: "★ 提成 20~30%，一个月 3000 ~ 20000",
      门槛: "★ 会聊天就行",
      失败后果: "★ 号主发现他私吞 → 封号 + 拉黑",
      手机作用: "★★ 他能同时用多个账号 —— 一个人干三个人的活"
    }, {
      名: "写稿 / 剪片",
      来源: "91 / 推特",
      档: "活",
      前金: 0,
      报酬: "800 ~ 5000 / 条",
      门槛: "无",
      失败后果: "★ 过不了审 → 白做",
      手机作用: '★ 手机能让"内容看起来是真的"（★ 这一点很微妙）'
    }, {
      名: "找东西（人肉搜索）",
      来源: "草榴 / 暗网",
      档: "活",
      前金: 0,
      报酬: "1000 ~ 8000 / 单",
      门槛: "痕迹追查",
      失败后果: "★★ 找错了人 → 对方找上门",
      手机作用: "★★★ 这就是【痕迹追查】技能的用途 —— 找人是它的本行"
    }, {
      名: "安保 / 站场",
      来源: "线下 / 圈子",
      档: "活",
      前金: 0,
      报酬: "800 ~ 3000 / 晚",
      门槛: "强壮 ≥ 50",
      失败后果: "★ 出事要自己扛",
      手机作用: "★ 到场 Lv2 → 打起来他直接脱身"
    } ];
    const 做局表 = [ {
      名: "杀猪盘（他做刀）",
      来源: "Telegram / 交友 APP",
      档: "局",
      前金: 500,
      报酬: "★ 骗到多少就是多少。常见 5000 ~ 200000",
      门槛: "★ 要话术 + 素材 + 耐心",
      失败后果: "★★ 对方报警 → 但★ 他查不到（账号不互通）",
      手机作用: '★★★ **这是手机最强的地方** —— 账号不互通 → 追查断在"这个人不存在"'
    }, {
      名: "仙人跳（他做局）",
      来源: "探探 / 微信",
      档: "局",
      前金: 1e3,
      报酬: "3000 ~ 50000",
      门槛: "★ 要有人配合（女伴 + 打手）",
      失败后果: "★★ 对方报警或报复 → ★ 但他能脱身（Lv50）",
      手机作用: "★★ 他不用露真脸 —— 她记不住他的脸（Lv70）"
    }, {
      名: "敲诈（他敲）",
      来源: "暗网 / 圈子",
      档: "局",
      前金: 0,
      报酬: "★ 按对方能给多少",
      门槛: "痕迹追查 + 有把柄",
      失败后果: "★★★ 对方鱼死网破 → 这是最容易翻车的一档",
      手机作用: '★★ 他掌握的东西"查不到来源"'
    }, {
      名: "假中介（收两头）",
      来源: "各种群",
      档: "局",
      前金: 0,
      报酬: "★ 抽成 20~50%",
      门槛: "信誉伪造",
      失败后果: "★★ 被两边发现 → 圈子拉黑（★ 声誉 −15）",
      手机作用: '★ 他能伪造"看起来像个人物"'
    }, {
      名: "★ 当真中介（合法的做局）",
      来源: "圈子 / 平台",
      档: "局",
      前金: 0,
      报酬: "★ 抽成 10~20%，而且长期",
      门槛: "信誉 + 人脉",
      失败后果: "★ 名声坏了就没活了",
      手机作用: "★★ 他还是能收两头，但这次两边都知道有人抽"
    } ];
    const 抢表 = [ {
      名: "拿东西（不问）",
      来源: "暗网委托",
      档: "抢",
      前金: 0,
      报酬: "5000 ~ 50000",
      门槛: "★ 强壮 + 到场 Lv2",
      失败后果: "★★★ 被拍到 → 但 Lv70+ 拍不到他的脸",
      手机作用: "★★★ 到场 Lv2 = 行动无记录。★ 他进去了，出来了，中间那段不存在"
    }, {
      名: "截一笔钱",
      来源: "圈子消息",
      档: "抢",
      前金: 2e3,
      报酬: "★ 按那一笔有多少",
      门槛: "强壮 + 时机",
      失败后果: "★★★ 对方是黑钱 → 不能报警 → ★ 但他们会自己找人",
      手机作用: "★★ 他做的事没有记录，但**人记得他**"
    }, {
      名: "黑吃黑",
      来源: "★ 自己找的",
      档: "抢",
      前金: 0,
      报酬: "★ 最大",
      门槛: "★ 全部技能 + Lv70",
      失败后果: "★★★ 对方也有手段 → 这是最危险的一档",
      手机作用: "★★★ 唯一能对上这种对手的，就是手机本身"
    }, {
      名: "★ 替人干（被人雇）",
      来源: "暗网私密区",
      档: "抢",
      前金: 0,
      报酬: "20000 ~ 100000",
      门槛: "Lv60+ + 无痛",
      失败后果: "★★★ 被供出来",
      手机作用: "★★★ 无痛 + 到场 = 他做完了，而且没人能证明"
    } ];
    const 产业表 = [ {
      名: "一个群",
      在哪: "Telegram",
      成本: "Lv30「进」+ 5000",
      产出: "★ 会员费，一个月 3000 ~ 30000",
      维护: "★ 要有人管（不然人跑）",
      风险: "★ 群被端 → 一次全没"
    }, {
      名: "一个号",
      在哪: "OnlyFans / 91",
      成本: "★ 一个能出内容的人",
      产出: "★ 订阅或打赏，一个月 5000 ~ 50000",
      维护: "★ 内容要一直更",
      风险: "★★ 那个人跑了 → 号就废了"
    }, {
      名: "中介网的一环",
      在哪: "跨国线路",
      成本: "人脉（不是钱）",
      产出: "★ 抽成 10~20%，稳定",
      维护: "★ 要一直有人",
      风险: "★★ 上面出事 → 他也被抓"
    }, {
      名: "一个场子",
      在哪: "线下",
      成本: "★ 大（要场地、要人、要打点）",
      产出: "★ 高",
      维护: "★★ 很大",
      风险: "★★★ 被查 → 全完"
    }, {
      名: '★ 一份"干净的生意"',
      在哪: "任何地方",
      成本: "★ 小",
      产出: "★ 低，但稳定",
      维护: "普通生意那样",
      风险: "★ 几乎没有"
    } ];
    const 钱路 = [ {
      名: "本业工资",
      量级: "+8000 / 30 天",
      门槛: "无",
      风险: "★ 无（但要在现实里上班）"
    }, {
      名: "接活",
      量级: "500 ~ 20000 / 单",
      门槛: "★ 低",
      风险: "★ 中"
    }, {
      名: "做局",
      量级: "3000 ~ 200000",
      门槛: "★ 中",
      风险: "★★ 高"
    }, {
      名: "抢",
      量级: "5000 ~ 100000",
      门槛: "★★ 高",
      风险: "★★★ 最高"
    }, {
      名: "产业",
      量级: "★ 被动收入",
      门槛: "★★ 很高",
      风险: "★ 看类型"
    }, {
      名: "她给的",
      量级: "不定",
      门槛: "关系",
      风险: "★★ 收了就有账"
    } ];
    const 派发示例 = [ {
      平台: "Telegram 门槛群",
      形态: "一条群公告",
      实样: "「收一个会说话的。私聊。」",
      他不知道: "★ 是要他去当 chatter，还是要去骗人。★ 私聊之前他不知道"
    }, {
      平台: "草榴 私信",
      形态: "一条私信",
      实样: "「兄弟，有个人你帮我找一下。价钱你说。」",
      他不知道: "★ 找他的人是谁，为什么要找这个人"
    }, {
      平台: "暗网 委托板",
      形态: "一个条目",
      实样: "「取一件东西。地点私聊。5000。先付一半。」",
      他不知道: "★★ 那件东西是什么。★ 也不知道为什么先付一半"
    }, {
      平台: "探探 匹配",
      形态: "她先开口",
      实样: "「你看起来不像本地人。」",
      他不知道: "★★★ 这句话是在招人，还是在试探。★ 这是最危险的一种"
    }, {
      平台: "微信 朋友圈",
      形态: "一条招人的动态",
      实样: "「招个跑腿的，长期，钱好说。」",
      他不知道: "★ 跑的是什么腿"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/健壮数字.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      中文数字转数: () => 中文数字转数,
      健壮数字: () => 健壮数字,
      健壮整数: () => 健壮整数,
      转数字: () => 转数字
    });
    var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js");
    function 中文数字转数(s) {
      const 数字表 = {
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
      const 单位表 = {
        十: 10,
        百: 100,
        千: 1e3,
        万: 1e4,
        亿: 1e8
      };
      const t = s.trim();
      if (!/^[零〇一二两三四五六七八九十百千万亿]+$/.test(t)) return null;
      if (t.length === 1 && 数字表[t] !== undefined) return 数字表[t];
      let 总 = 0;
      let 当前 = 0;
      for (const ch of t) {
        if (数字表[ch] !== undefined) {
          当前 = 数字表[ch];
        } else if (单位表[ch] !== undefined) {
          const 单位 = 单位表[ch];
          if (单位 >= 1e4) {
            总 = (总 + (当前 || 1)) * 单位;
            当前 = 0;
          } else {
            总 += (当前 || 1) * 单位;
            当前 = 0;
          }
        } else {
          return null;
        }
      }
      return 总 + 当前;
    }
    function 全角转半角(s) {
      return s.replace(/[０-９．]/g, c => String.fromCharCode(c.charCodeAt(0) - 65248));
    }
    function 转数字(v) {
      if (typeof v === "number") return Number.isFinite(v) ? v : null;
      if (typeof v === "boolean") return v ? 1 : 0;
      if (v === null || v === undefined) return null;
      if (Array.isArray(v)) return v.length === 0 ? null : 转数字(v[0]);
      if (typeof v === "string") {
        let s = 全角转半角(v.trim());
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
    function 健壮数字(默认值, lo, hi) {
      return zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
        let n = 转数字(v);
        if (n === null) n = 默认值;
        if (lo !== undefined) n = Math.max(lo, n);
        if (hi !== undefined) n = Math.min(hi, n);
        return Number.isInteger(n) ? n : Math.round(n * 10) / 10;
      }, zod__WEBPACK_IMPORTED_MODULE_0__.number());
    }
    function 健壮整数(默认值, lo, hi) {
      return zod__WEBPACK_IMPORTED_MODULE_0__.preprocess(v => {
        let n = 转数字(v);
        if (n === null) n = 默认值;
        n = Math.round(n);
        if (lo !== undefined) n = Math.max(lo, n);
        if (hi !== undefined) n = Math.min(hi, n);
        return n;
      }, zod__WEBPACK_IMPORTED_MODULE_0__.number());
    }
  },
  "./src/神奇手机/神奇手机/核心/加速与充值.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      一次得多少: () => 一次得多少,
      任务点充值: () => 任务点充值,
      任务点充值比例: () => 任务点充值比例,
      倍率档位: () => 倍率档位,
      充值表: () => 充值表,
      充值规矩: () => 充值规矩,
      加速行为表: () => 加速行为表,
      当前倍率: () => 当前倍率,
      待点亮: () => 待点亮,
      收入来源: () => 收入来源,
      积分注入平台: () => 积分注入平台,
      该平台加速: () => 该平台加速
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./平台等级 */ "./src/神奇手机/神奇手机/核心/平台等级.ts");
    const 倍率档位 = [ {
      等级: 20,
      倍率: 2,
      名称: "入圈越权",
      解锁时他意识到什么: "同一个探针发出去，直接击穿了门槛群，里面的真实定位一清二楚。"
    }, {
      等级: 50,
      倍率: 5,
      名称: "落地降维",
      解锁时他意识到什么: "他手里的真实信息拉满，进出任何场子官方认证直接给到顶。"
    }, {
      等级: 80,
      倍率: 10,
      名称: "隐身接管",
      解锁时他意识到什么: "十倍注水下暗网最高担保和核心大群当场买断，规则为他让路。"
    }, {
      等级: 100,
      倍率: 20,
      名称: "上帝代码",
      解锁时他意识到什么: "二十倍绝对杠杆，全城雷达开启，连她手机草稿箱都被强制透视。"
    } ];
    function 当前倍率(手机等级, 已点亮) {
      let 倍 = 1;
      for (const d of 倍率档位) {
        if (手机等级 >= d.等级 && 已点亮.includes(d.等级)) 倍 = d.倍率;
      }
      return 倍;
    }
    function 待点亮(手机等级, 已点亮) {
      return 倍率档位.filter(d => 手机等级 >= d.等级 && !已点亮.includes(d.等级));
    }
    const 加速行为表 = [ {
      平台: "草榴",
      行为: '发一个"有信息量"的帖子（不是灌水）',
      效果: "被加精概率 ×3",
      额外倍率: 3
    }, {
      平台: "草榴",
      行为: "在热门帖里回一句到位的话",
      效果: "被人记住 ID",
      额外倍率: 2
    }, {
      平台: "草榴",
      行为: "★ 用邀请码带一个人进来",
      效果: "双方各得 100 分",
      额外倍率: 5,
      需要手机等级: 30
    }, {
      平台: "91",
      行为: "投一个原创（不是搬运）",
      效果: "过审 + 上首页",
      额外倍率: 4
    }, {
      平台: "91",
      行为: "★ 露脸认证",
      效果: "直接给作者标签",
      额外倍率: 10
    }, {
      平台: "91",
      行为: "被收藏 10 次以上",
      效果: "系统推荐",
      额外倍率: 3
    }, {
      平台: "OnlyFans",
      行为: "★ 雇 chatter（代聊）",
      效果: "24 小时在线，订阅转化率翻倍",
      额外倍率: 4
    }, {
      平台: "OnlyFans",
      行为: "做一次联动（和别的号互推）",
      效果: "互相导流",
      额外倍率: 3
    }, {
      平台: "Telegram",
      行为: "★ 建一个群",
      效果: '★ 从"进群的人"变成"管群的人"',
      额外倍率: 8
    }, {
      平台: "Telegram",
      行为: "在门槛群里待够时间并守规矩",
      效果: "被拉进更里面的群",
      额外倍率: 3
    }, {
      平台: "推特",
      行为: "★ 蹭一个大号的话题",
      效果: "曝光量级变化",
      额外倍率: 5
    }, {
      平台: "推特",
      行为: '发一条"半遮半掩"而不是全露',
      效果: "★ 引流效率更高",
      额外倍率: 3
    }, {
      平台: "探探",
      行为: '★ 换一组"生活照"而不是"自拍"',
      效果: "右滑率翻倍",
      额外倍率: 3
    }, {
      平台: "探探",
      行为: "在她活跃的时间段上线",
      效果: "★ 匹配概率 ×2",
      额外倍率: 2
    }, {
      平台: "抖音",
      行为: "★ 开同城 + 固定时间直播",
      效果: "同城流量池",
      额外倍率: 4
    }, {
      平台: "抖音",
      行为: "打赏榜一",
      效果: "★ 能私信主播",
      额外倍率: 6
    }, {
      平台: "微信",
      行为: "★ 朋友圈点赞 + 评论（不是直接找她）",
      效果: '★ 从"陌生人"变成"认识的人"',
      额外倍率: 5
    }, {
      平台: "微信",
      行为: "发一条只有她看得懂的朋友圈",
      效果: "★ 她会回你",
      额外倍率: 4
    }, {
      平台: "暗网",
      行为: "★ 找一个担保人",
      效果: "直接进私密区",
      额外倍率: 10,
      需要手机等级: 30
    }, {
      平台: "暗网",
      行为: "完成一笔交易并拿到好评",
      效果: "评级上升",
      额外倍率: 4
    } ];
    function 该平台加速(平台, 手机等级) {
      return 加速行为表.filter(a => a.平台 === 平台 && (!a.需要手机等级 || 手机等级 >= a.需要手机等级));
    }
    const 充值表 = [ {
      平台: "草榴",
      名: "直接买号",
      价格: 5e3,
      积分: 400,
      方式: "★ 找现成的号（★ 有风险：原主能找回）"
    }, {
      平台: "草榴",
      名: "买积分",
      价格: 2e3,
      积分: 200,
      方式: "站内有人卖分（★ 常见）"
    }, {
      平台: "草榴",
      名: "买邀请码",
      价格: 800,
      积分: 400,
      方式: "★ 一个码 = 直接进隐藏版块"
    }, {
      平台: "OnlyFans",
      名: "买推广",
      价格: 500,
      积分: 50,
      方式: "平台官方推广位"
    }, {
      平台: "OnlyFans",
      名: "雇 chatter（月）",
      价格: 3e3,
      积分: 150,
      方式: "★ 24 小时代聊"
    }, {
      平台: "Chaturbate",
      名: "买代币包",
      价格: 1e3,
      积分: 120,
      方式: "官方充值"
    }, {
      平台: "抖音",
      名: "榜一",
      价格: 3e3,
      积分: 200,
      方式: "★ 打赏到第一 —— 她会记住名字"
    }, {
      平台: "快手同城",
      名: "榜一",
      价格: 2e3,
      积分: 200,
      方式: "同上"
    }, {
      平台: "推特",
      名: "蓝标",
      价格: 300,
      积分: 50,
      方式: "★ 官方订阅 —— 花钱就有"
    }, {
      平台: "探探",
      名: "会员",
      价格: 200,
      积分: 40,
      方式: "官方会员"
    }, {
      平台: "小红书",
      名: "买流量",
      价格: 800,
      积分: 50,
      方式: "薯条推广"
    }, {
      平台: "暗网",
      名: "买担保",
      价格: 8e3,
      积分: 800,
      方式: "★★ 最贵的 —— 因为信任最贵"
    }, {
      平台: "暗网",
      名: "买身份包",
      价格: 3e3,
      积分: 200,
      方式: "一整套证件资料"
    } ];
    const 任务点充值比例 = 1;
    function 任务点充值(任务点数) {
      if (任务点数 <= 0) return 0;
      return Math.floor(任务点数 * 任务点充值比例);
    }
    function 积分注入平台(手机积分, 手机等级) {
      const 越权 = (0, ___WEBPACK_IMPORTED_MODULE_0__["手机加速倍率"])(手机等级);
      return 手机积分 * 越权;
    }
    const 充值规矩 = [ "★ 充值硬铁律：普通生活费与工资严禁充值！唯有通过【任务/接活/做局】赚取的「任务点」才能充值", "★ 恒定兑换比例：1 任务点 ＝ 1 手机积分（不可逆向退款）", "★ 越权注水机制：手机积分注入各大平台换取资历与代币时，按手机当前等级直接乘以越权系数（最高 20 倍）！", "★ 只能买【功能/平台代币/道具】—— 绝不能买她的自主意愿" ];
    function 一次得多少(平台, 手机等级, 点亮倍率, 用了加速行为) {
      const 基础 = (0, ___WEBPACK_IMPORTED_MODULE_0__["基础积分"])(平台);
      const 手机倍 = 当前倍率(手机等级, 点亮倍率);
      const 行为倍 = 用了加速行为 ? 用了加速行为.额外倍率 : 1;
      return Math.round(基础 * 手机倍 * 行为倍);
    }
    const 收入来源 = [ {
      名: "本业工资",
      数额: "+8000 / 30 天",
      代价: "★ 稳定。★ 但他在现实里是要上班的人"
    }, {
      名: "她给的",
      数额: "不定",
      代价: "★★ 这就是关系本身。收了就有账"
    }, {
      名: "站内变现",
      数额: "按站内等级",
      代价: "★ 要先有等级（OnlyFans 订阅 / 91 打赏 / 拍卖）"
    }, {
      名: "找人要",
      数额: "不定",
      代价: "★★ 家里会问去处。朋友会问做什么"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/她的数值.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      判断力说话: () => 判断力说话,
      喂给计算床上: () => 喂给计算床上,
      处境说话: () => 处境说话,
      她的战力: () => 她的战力,
      她的档案: () => 她的档案,
      她的难度: () => 她的难度,
      尺寸匹配说话: () => 尺寸匹配说话,
      戒备说话: () => 戒备说话,
      抽她的体格: () => 抽她的体格,
      抽她的性数据: () => 抽她的性数据,
      抽她的防御: () => 抽她的防御,
      敏感度说话: () => 敏感度说话,
      经验度说话: () => 经验度说话,
      阈值到分钟: () => 阈值到分钟,
      阈值说话: () => 阈值说话
    });
    const 夹 = (v, lo = 1, hi = 10) => Math.round(Math.max(lo, Math.min(hi, v)) * 10) / 10;
    function 正态(均值, 标准差) {
      const u = Math.random() || 1e-4;
      const v = Math.random();
      return 均值 + 标准差 * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    function 抽(表) {
      let r = Math.random() * 表.reduce((s, [, w]) => s + w, 0);
      for (const [v, w] of 表) {
        r -= w;
        if (r <= 0) return v;
      }
      return 表[表.length - 1][0];
    }
    function 抽她的性数据(地区, 年龄, 意图型, 性格型) {
      let 经基 = 2;
      if (/卖|主播|从业/.test(意图型)) 经基 = 7.5; else if (/被骗|被控制/.test(意图型)) 经基 = 3.5; else if (/就是玩/.test(意图型)) 经基 = 5.5; else if (/要人|要钱/.test(意图型)) 经基 = 4.5;
      经基 += Math.min(2, Math.max(0, (年龄 - 20) * .12));
      if (/伊朗|海湾|巴基斯坦/.test(地区)) 经基 -= 1.5;
      if (/德国_荷兰|法国_意大利|巴西|英国_北欧/.test(地区)) 经基 += 1;
      const 经验度 = 夹(正态(经基, 1.5));
      const 阈值 = 夹(正态(4.5 + 经验度 * .25, 1.2), 2, 9.5);
      const 敏感度 = 夹(正态(5, 1.8));
      const 体力 = 夹(正态(4 + (年龄 < 30 ? 1 : -.8) + 经验度 * .1, 1.4));
      let 中值 = 13.8;
      if (经验度 <= 2) 中值 = 13.2; else if (经验度 <= 4) 中值 = 13.8; else if (经验度 <= 6) 中值 = 14.6; else if (经验度 <= 8) 中值 = 15.2; else 中值 = 15.6;
      if (年龄 >= 36) 中值 -= .8;
      const 偏好尺寸 = Math.round((中值 + (Math.random() * 2 - 1) * 1.2) * 10) / 10;
      const 湿润度 = 夹(正态(3, 1.2), 0, 10);
      const 敏感点 = 抽([ [ "后颈", 3 ], [ "耳后", 3 ], [ "腰窝", 3 ], [ "脚踝", 2 ], [ "大腿内侧", 3 ], [ "乳尖", 3 ], [ "阴蒂", 4 ], [ "阴道前壁", 2 ], [ "尾椎", 2 ], [ "手腕内侧", 2 ] ]);
      const 禁区 = 抽([ [ "不接吻", 4 ], [ "不看脸", 3 ], [ "不拍照", 3 ], [ "不留痕", 2 ], [ "不进去", 1 ], [ "不叫名字", 2 ], [ "没有禁区", 2 ] ]);
      const 高潮表现 = 抽([ [ "整个人绷紧，然后塌下去，不出声", 3 ], [ "腿夹得死紧，一只手抓着床单不放", 3 ], [ "叫出来，而且叫声很哑", 2 ], [ "哭。不是难过，是控制不住", 2 ], [ "抖。从大腿一直抖到肩膀", 2 ], [ "直接喷出来，她自己都愣了一下", 1 ] ]);
      const 事后 = 抽([ [ "马上就冷。穿衣服，看手机", 3 ], [ "不说话，靠着不动", 3 ], [ "开始聊别的，像什么都没发生", 2 ], [ "靠着睡过去，手还搭在你身上", 1 ], [ "问你下次什么时候", 1 ] ]);
      return {
        阈值,
        经验度,
        敏感度,
        体力,
        偏好尺寸,
        湿润度,
        敏感点,
        禁区,
        高潮表现,
        事后
      };
    }
    function 抽她的防御(地区, 意图型, 性格型, 经验度) {
      let 戒基 = 4;
      if (/卖|从业/.test(意图型)) 戒基 = 6;
      if (/被骗|被控制/.test(意图型)) 戒基 = 7;
      if (/就是玩/.test(意图型)) 戒基 = 3;
      if (/初恋|第一次|学生/.test(意图型)) 戒基 = 5.5;
      if (/伊朗|海湾|巴基斯坦|印度/.test(地区)) 戒基 += 1.5;
      if (/德国_荷兰|巴西|英国_北欧/.test(地区)) 戒基 -= 1;
      if (/旁观|观察|内收/.test(性格型)) 戒基 += 1;
      if (/冲锋|进攻|外放/.test(性格型)) 戒基 -= 1;
      const 戒备 = 夹(正态(戒基, 1.4));
      let 紧基 = 4;
      if (/要钱|卖|从业/.test(意图型)) 紧基 = 7;
      if (/被控制|欠债/.test(意图型)) 紧基 = 8;
      if (/就是玩/.test(意图型)) 紧基 = 2;
      if (/伊朗|巴基斯坦|埃塞俄比亚|尼日利亚/.test(地区)) 紧基 += 1.5;
      if (/德国_荷兰|英国_北欧|加拿大/.test(地区)) 紧基 -= 1.5;
      const 处境紧 = 夹(正态(紧基, 1.5));
      const 判断力 = 夹(正态(4 + 经验度 * .35, 1.3));
      const 圈子门槛 = 夹(正态(5, 1.5), 2, 9);
      return {
        戒备,
        处境紧,
        判断力,
        圈子门槛
      };
    }
    function 她的难度(d, 性) {
      const v = d.戒备 * .35 + (10 - d.处境紧) * .25 + d.判断力 * .2 + 性.阈值 * .2;
      return Math.round(v * 10) / 10;
    }
    function 抽她的体格(地区, 年龄, 体型 = "") {
      let 身高均 = 160;
      if (/德国_荷兰|英国_北欧/.test(地区)) 身高均 = 168; else if (/韩国|中国|日本/.test(地区)) 身高均 = 160; else if (/越南|泰国|菲律宾|印尼/.test(地区)) 身高均 = 155; else if (/巴西|哥伦比亚/.test(地区)) 身高均 = 160;
      const 身高 = Math.round(正态(身高均, 6));
      const 体重 = Math.round(正态((身高 - 105) * .95, 6));
      let 力基 = 2.5;
      if (/胖|壮|厚实/.test(体型)) 力基 += 1.5;
      if (/瘦|薄|细/.test(体型)) 力基 -= .8;
      if (年龄 >= 35) 力基 += .5;
      const 力量 = 夹(正态(力基, .8));
      const 敏捷 = 夹(正态(年龄 < 28 ? 5.5 : 4.5, 1.2));
      const 意志 = 夹(正态(5, 1.8));
      const 嗓门 = 夹(正态(5.5, 1.5));
      return {
        身高,
        体重,
        力量,
        敏捷,
        意志,
        嗓门
      };
    }
    function 她的战力(g, ctx = {}) {
      let v = g.力量 * .5 + g.敏捷 * .3 + g.意志 * .2;
      if (ctx.有准备) v += 1;
      if (ctx.在呼救) v += .5;
      if (ctx.熟悉地形) v += .8;
      return Math.round(Math.max(1, Math.min(10, v)) * 10) / 10;
    }
    function 喂给计算床上(代号, 年龄, 性, ctx = {}) {
      return {
        代号,
        阈值: 性.阈值,
        经验度: 性.经验度,
        年龄,
        偏好尺寸: 性.偏好尺寸,
        湿润度: 性.湿润度,
        已高潮次数: ctx.已高潮次数 ?? 0
      };
    }
    function 阈值到分钟(阈值) {
      return Math.round((5 + (Math.max(1, Math.min(10, 阈值)) - 1) * 5) * 10) / 10;
    }
    function 阈值说话(v) {
      if (v <= 2) return "★ 她很容易到 —— 几分钟就够。★ 但这也意味着她不会记住你";
      if (v <= 4) return "不算难。正常做她就能到";
      if (v <= 6) return "一般。她要一会儿，而且要对的节奏";
      if (v <= 8) return "★ 难。她知道自己要什么，你猜不到就白做";
      return "★★ 很难。★ 大多数人做完了她还没到 —— 而她不会说";
    }
    function 经验度说话(v) {
      if (v <= 2) return "★ 几乎没经验 —— 什么都是头一回，会紧张、会疼";
      if (v <= 4) return "★ 谈过几次。知道大概，但不会主动";
      if (v <= 6) return "一般。她知道自己要什么，但不会说得太明白";
      if (v <= 8) return "★ 很懂。她会主动引导你，而且知道你什么时候在装";
      return "★★ 职业级别。她已经不需要你配合了";
    }
    function 敏感度说话(v) {
      if (v <= 2) return "★ 迟钝。要多花很多功夫，或者她自己根本不敏感";
      if (v <= 4) return "偏钝。正常做可以，但要耐心";
      if (v <= 6) return "正常";
      if (v <= 8) return "★ 敏感。碰一下就有反应，说两句话就湿";
      return "★★ 极敏感。★ 有时候她自己都受不了";
    }
    function 戒备说话(v) {
      if (v <= 2) return "★ 完全不设防。你一句话就能推进一大步";
      if (v <= 4) return "还行。她会给你机会，但也在看";
      if (v <= 6) return "一般戒备。她会问几个问题，看你答不答得上";
      if (v <= 8) return "★ 很警惕。她会去查你 —— 而且查得到的东西她会记住";
      return "★★ 完全不信任。她在测试你，而且不止一次";
    }
    function 处境说话(v) {
      if (v <= 2) return "★ 她什么都不缺。钱对她没用，你得拿别的";
      if (v <= 4) return "还行。她不是冲着钱来的";
      if (v <= 6) return "有点紧。她不会主动说，但你能感觉出来";
      if (v <= 8) return "★ 很紧。她需要这笔钱，而且她知道自己在需要";
      return "★★ 非常急。★ 而这恰恰是最容易出事的一种";
    }
    function 判断力说话(v) {
      if (v <= 2) return "★ 很好骗。你说什么她信什么";
      if (v <= 4) return "不太会看人。你稍微包装她就信了";
      if (v <= 6) return "一般。她会有疑虑，但通常会说给自己听";
      if (v <= 8) return "★ 很难骗。她见过几个你这样的人";
      return "★★ 完全骗不了。★ 她比你还清楚游戏规则";
    }
    function 尺寸匹配说话(你的厘米, 她的偏好) {
      const 差 = Math.round((你的厘米 - 她的偏好) * 10) / 10;
      if (Math.abs(差) <= 1) return `★★ 很合（差 ${差}cm）—— 她一进去就吸了一下`;
      if (Math.abs(差) <= 2.5) return `正常（差 ${差}cm）`;
      if (差 > 2.5) return `★ 太大（差 +${差}cm）—— 她皱着眉说"慢点"，那不是客气`;
      return `★ 太小（差 ${差}cm）—— 她没说什么，但她的反应很淡`;
    }
    function 她的档案(性, d, g) {
      return [ `阈值 ${性.阈值} —— ${阈值说话(性.阈值)}`, `经验度 ${性.经验度} —— ${经验度说话(性.经验度)}`, `敏感度 ${性.敏感度} —— ${敏感度说话(性.敏感度)}`, `体力 ${性.体力} —— 一晚能接 ${Math.max(1, Math.round(性.体力))} 发`, `偏好尺寸 ${性.偏好尺寸}cm`, `敏感点：${性.敏感点}　禁区：${性.禁区}`, `戒备 ${d.戒备} —— ${戒备说话(d.戒备)}`, `处境 ${d.处境紧} —— ${处境说话(d.处境紧)}`, `判断力 ${d.判断力} —— ${判断力说话(d.判断力)}`, `身高 ${g.身高}cm / ${g.体重}kg　力量 ${g.力量}　敏捷 ${g.敏捷}　意志 ${g.意志}　嗓门 ${g.嗓门}` ];
    }
  },
  "./src/神奇手机/神奇手机/核心/对抗.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      产业税: () => 产业税,
      产业风险: () => 产业风险,
      伤情对照: () => 伤情对照,
      位子下降: () => 位子下降,
      位子层级: () => 位子层级,
      免疫减成: () => 免疫减成,
      关系下降: () => 关系下降,
      关系能推进吗: () => 关系能推进吗,
      关系锚点: () => 关系锚点,
      受孕概率: () => 受孕概率,
      声望涨: () => 声望涨,
      声望阈值: () => 声望阈值,
      声望降: () => 声望降,
      带病概率: () => 带病概率,
      战力对照: () => 战力对照,
      战力明细: () => 战力明细,
      暴露涨: () => 暴露涨,
      暴露阈值: () => 暴露阈值,
      暴露降: () => 暴露降,
      算夺位: () => 算夺位,
      算战力: () => 算战力,
      算打架: () => 算打架,
      算抗药: () => 算抗药,
      算生育: () => 算生育,
      算疾病: () => 算疾病,
      算议价: () => 算议价,
      算识破: () => 算识破,
      药物对照: () => 药物对照,
      行为系数: () => 行为系数
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    function 算战力(强壮, 体力, 气场, 时机) {
      const v = 强壮 * .45 + 体力 * .25 + 气场 * .15 + 时机 * .15;
      return Math.round(Math.max(___WEBPACK_IMPORTED_MODULE_0__["属性下限"], Math.min(___WEBPACK_IMPORTED_MODULE_0__["属性上限"], v)) * 10) / 10;
    }
    function 战力明细(强壮, 体力, 气场, 时机) {
      return [ `强壮 ${强壮} ×0.45 = ${(强壮 * .45).toFixed(2)}`, `体力 ${体力} ×0.25 = ${(体力 * .25).toFixed(2)}`, `气场 ${气场} ×0.15 = ${(气场 * .15).toFixed(2)}`, `时机 ${时机} ×0.15 = ${(时机 * .15).toFixed(2)}`, `= 战力 ${算战力(强壮, 体力, 气场, 时机)}` ];
    }
    const 战力对照 = [ {
      值: 1,
      写什么: "文弱。★ 被一个成年女性按住就动不了",
      能打几个: "0 个"
    }, {
      值: 2,
      写什么: "普通人。一对一勉强撑住",
      能打几个: "0.5 个"
    }, {
      值: 3,
      写什么: "还算结实。★ 一对一能撑住，两个就不行",
      能打几个: "1 个"
    }, {
      值: 4,
      写什么: "经常干活，力气比看起来大",
      能打几个: "1 个（有余力）"
    }, {
      值: 5,
      写什么: "★ 一个人拦不住你",
      能打几个: "1.5 个"
    }, {
      值: 6,
      写什么: "常年健身。她看得出来",
      能打几个: "2 个"
    }, {
      值: 7,
      写什么: "★ 两个普通人不是对手",
      能打几个: "2.5 个"
    }, {
      值: 8,
      写什么: "很壮。★★ 他们开始打听你是谁",
      能打几个: "3 个"
    }, {
      值: 9,
      写什么: "★★ 两下放倒一个",
      能打几个: "3.5 个"
    }, {
      值: 10,
      写什么: "★★★ 三个人不敢一起上",
      能打几个: "4 个"
    } ];
    function 抽(a) {
      return a[Math.floor(Math.random() * a.length)];
    }
    function 回合描述(上风, 你打, 你挨, 我伤, 他伤) {
      if (上风 === "你") {
        if (你打 >= 3) return 抽([ "你一拳砸在他脸上。他往后仰，鼻血当场就下来了", "你抓住他头发往下一按，膝盖迎上去。他闷了一声，人软了半截", "他没防住侧面。你那一肘落在他肋骨上，他弯下去了", "你踩住他的脚，肩膀撞过去。他整个人被撞到墙上" ]);
        if (你打 >= 2) return 抽([ "你抓住他的衣领，膝盖顶上去。他闷哼一声，松了手", "你打中他下巴。他退了两步，晃了一下", "你一巴掌抽过去。声音很响，他的脸偏到一边", "你从下面顶了一下他的胸口。他喘不上气" ]);
        return 抽([ "你打中了他一下。不重，但他退了一步", "你抬手挡开他这一下，顺势推了一把", "你打到他肩膀。没伤到，但他失去了重心" ]);
      }
      if (上风 === "他") {
        if (你挨 >= 3) return 抽([ "他先动的。你眼前白了一下，嘴里有了铁味", "你被从后面撞了一下。膝盖着地的时候才知道疼", "他一脚踹在你肚子上。你弯下去，喘不上气", "他抓住了你的头发。你整个头被扯向一边" ]);
        if (你挨 >= 2) return 抽([ "你被从侧面撞了一下，踉跄着撞到墙上", "他打在你耳朵上。嗡的一声，你听不清了", "你抬手挡晚了一步。那一拳落在你鼻梁上" ]);
        return 抽([ "他推了你一把。你稳住了，但位置被动", "你退了一步，把背贴到墙上", "他往前逼了一步。你在找退路" ]);
      }
      if (我伤 >= 6) return 抽([ "你们都在喘。他扶着墙，你站着 —— 但你自己知道站不太久", "你靠着东西才没坐下去。他在对面，也没好到哪去" ]);
      if (他伤 >= 6) return 抽([ "他在喘。你也没好到哪去，但你还站着", "他抹了一下脸，手上有血。他还在看着你" ]);
      return 抽([ "谁都没占到便宜。两个人隔了两步，都在看对方", "你们绕了半圈。谁都没先动", "他试了一下，你让开了。两个人又回到原位" ]);
    }
    const 伤情对照 = [ {
      值: 0,
      写什么: "没伤",
      影响: "无"
    }, {
      值: 1,
      写什么: "擦破点皮",
      影响: "无"
    }, {
      值: 2,
      写什么: "嘴角破了，身上两块淤青",
      影响: "★ 体力 −1（三天）"
    }, {
      值: 3,
      写什么: "鼻子出血，肋骨一按就疼",
      影响: "★ 体力 −2，强壮 −1（一周）"
    }, {
      值: 4,
      写什么: "眼睛肿了，走路一瘸一拐",
      影响: "★ 魅力 −2，体力 −2（一周）"
    }, {
      值: 5,
      写什么: "挨了几下重的，站着都晕",
      影响: "★★ 全属性 −2（两周），需要就医"
    }, {
      值: 6,
      写什么: "骨头没断，但内脏被震到了",
      影响: "★★ 全属性 −3（三周），住院"
    }, {
      值: 7,
      写什么: "肋骨裂了两根",
      影响: "★★ 全属性 −4（一个月），★ 这段时间不能做"
    }, {
      值: 8,
      写什么: "断了。具体断哪根要看他们打哪里",
      影响: "★★★ 全属性 −6（两到三个月）"
    }, {
      值: 9,
      写什么: "进了 ICU",
      影响: "★★★ 全属性 −8（半年），而且这事会上报"
    }, {
      值: 10,
      写什么: "★★★ 你可能醒不过来",
      影响: "结局"
    } ];
    function 算打架(i) {
      const 明细 = [];
      if ((i.技能到场 ?? 0) >= 2) {
        return {
          我的: 10,
          对方: i.对方人数 * 3,
          比: 99,
          档: "压倒",
          我的伤: 0,
          对方伤: 0,
          恢复天数: 0,
          后果: "结果类别：无条件通过。★ 机械后果：不留记录，对方【无法事后指认】",
          脱身: true,
          明细: [ "★ 到场 Lv2：你不在记录里" ],
          回合: [],
          打了几回合: 0,
          停下的原因: "你没有参与"
        };
      }
      const 对方单 = i.她的体格战力 ?? i.对方单人战力 ?? 3;
      let 对方 = 对方单 * i.对方人数;
      if (i.有武器) 对方 += 2;
      if (i.地形不利) 对方 += 1;
      if (i.被下药) 对方 *= .7;
      const 无痛加成 = (i.技能无痛 ?? 0) >= 2 ? 1.5 : (i.技能无痛 ?? 0) >= 1 ? .8 : 0;
      const 我的 = Math.round((i.我的战力 + 无痛加成) * 10) / 10;
      对方 = Math.round(对方 * 10) / 10;
      明细.push(`你的战力 ${i.我的战力}${无痛加成 ? ` + 无痛 ${无痛加成}` : ""} = ${我的}`);
      明细.push(`对方 = ${对方单} × ${i.对方人数} 人${i.有武器 ? " + 武器 2" : ""}${i.地形不利 ? " + 地形 1" : ""} = ${对方}`);
      const 比 = Math.round(我的 / Math.max(.5, 对方) * 100) / 100;
      明细.push(`战力比 ${比}`);
      const 回合 = [];
      const 最多回合 = Math.max(1, i.最多回合 ?? 5);
      let 我伤 = 0, 他伤 = 0;
      let 我的体力 = 10;
      let 停下的原因 = "";
      let 脱身 = false;
      for (let r = 1; r <= 最多回合; r++) {
        const 波动 = 1 + (Math.random() * 2 - 1) * (我的 < 4 ? .3 : 我的 < 7 ? .2 : .12);
        const 这回合我 = 我的 * 波动;
        const 差 = 这回合我 - 对方;
        let 上风;
        let 你打, 你挨;
        if (差 > .8) {
          上风 = "你";
          你打 = Math.max(1, Math.min(4, Math.round(1 + 差 * .7)));
          你挨 = 差 > 2.5 ? 0 : Math.random() < .3 ? 1 : 0;
        } else if (差 < -.8) {
          上风 = "他";
          你挨 = Math.max(1, Math.min(4, Math.round(1 + Math.abs(差) * .7)));
          你打 = Math.abs(差) > 2.5 ? 0 : Math.random() < .3 ? 1 : 0;
        } else {
          上风 = "平";
          你打 = Math.random() < .5 ? 1 : 0;
          你挨 = Math.random() < .5 ? 1 : 0;
        }
        我伤 = Math.min(10, 我伤 + 你挨);
        他伤 = Math.min(10, 他伤 + 你打);
        我的体力 = Math.max(0, 我的体力 - (1 + Math.round(Math.abs(差) * .3)));
        回合.push({
          第几回合: r,
          你打,
          你挨,
          你累计伤: 我伤,
          他累计伤: 他伤,
          上风,
          剩体力: 我的体力,
          描述: 回合描述(上风, 你打, 你挨, 我伤, 他伤)
        });
        if (他伤 >= 8) {
          停下的原因 = "他倒了";
          break;
        }
        if (我伤 >= 8) {
          停下的原因 = "你倒了";
          break;
        }
        if (我的体力 <= 0) {
          停下的原因 = "你没劲了 —— 拳还在挥，但已经软了";
          break;
        }
        if (r >= 最多回合) {
          停下的原因 = "打了个平手，被人拉开了";
          脱身 = true;
          break;
        }
      }
      明细.push(`打了 ${回合.length} 回合`);
      let 档;
      let 后果;
      if (他伤 >= 8 && 我伤 <= 2) {
        档 = "压倒";
        后果 = "两下放倒。★ 而且他们会记住你的脸 —— 这是麻烦";
      } else if (他伤 >= 8) {
        档 = "胜";
        后果 = "你打赢了。★ 但你也挨了几下，而且这事会传出去";
      } else if (我伤 >= 8) {
        档 = 比 < .5 ? "惨败" : "败";
        后果 = 比 < .5 ? "★★★ 你挨得不轻。这次不是钱的事 —— 需要去医院，而且这事瞒不住" : "你被按住。★ 钱被搜走，而且他们会问你手机在哪";
      } else {
        档 = "平";
        脱身 = true;
        后果 = "结果类别：脱身。★ 机械后果：丢随身物（衣服/钱），本人无伤";
      }
      const 恢复天数 = 我伤 <= 1 ? 1 : 我伤 <= 2 ? 3 : 我伤 <= 4 ? 7 : 我伤 <= 6 ? 21 : 我伤 <= 8 ? 75 : 180;
      明细.push(`你的伤 ${我伤}，他的伤 ${他伤} → ${档}，恢复 ${恢复天数} 天`);
      return {
        我的,
        对方,
        比,
        档,
        我的伤: 我伤,
        对方伤: 他伤,
        恢复天数,
        后果,
        脱身,
        明细,
        回合,
        打了几回合: 回合.length,
        停下的原因
      };
    }
    const 药物对照 = [ {
      名: "高度酒",
      强度: 2
    }, {
      名: "安眠药（普通）",
      强度: 4
    }, {
      名: "迷药",
      强度: 5
    }, {
      名: "东莨菪碱",
      强度: 7
    }, {
      名: "医用麻醉剂",
      强度: 9
    } ];
    function 抗药描述(档, 第几口) {
      switch (档) {
       case "清醒":
        return 第几口 === 1 ? "你喝下去了。没什么感觉 —— 或者说，你还没感觉到" : "你还能说话。舌头有点不听使唤，但你自己没注意到";

       case "微醺":
        return "有点上头。你笑了一下，自己都不知道为什么笑";

       case "头晕":
        return "屋子在转。你扶着桌沿，想坐下去";

       case "模糊":
        return "★ 你记得的片段开始不连续了。她的脸，天花板的灯，还有一句话 —— 你想不起是什么话";

       case "断片":
        return "★ 你在往下坠。最后记住的是她的手压在你胸口";

       case "被放倒":
        return "★★★ 然后什么都没有了";

       default:
        return "你喝下去了";
      }
    }
    function 算抗药(体力, 强壮, 气场, 药物强度, 技能免疫疾病, ctx = {}) {
      const 明细 = [];
      if (技能免疫疾病 >= 2) {
        return {
          抗性: 10,
          累积药量: 0,
          档: "清醒",
          失去意识分钟: 0,
          醒来: "你喝下去了。★ 什么都没发生。而她还在等你倒",
          口: [],
          喝了多少口: 0,
          停在哪: "你没倒。★ 而这本身就是最大的信号",
          明细: [ "★ 免疫疾病 Lv2：药物与体液全部无效" ]
        };
      }
      const 基础抗性 = Math.round((体力 * .5 + 强壮 * .3 + 气场 * .2) * 10) / 10;
      明细.push(`基础抗性 = 体力${体力}×0.5 + 强壮${强壮}×0.3 + 气场${气场}×0.2 = ${基础抗性}`);
      明细.push(`每口药量 = ${药物强度}（见 药物对照）`);
      const 口数 = Math.max(1, ctx.几口 ?? 3);
      const 间隔 = Math.max(5, ctx.间隔分钟 ?? 15);
      const 口 = [];
      let 累计 = 0;
      let 抗性 = 基础抗性;
      let 断片了 = false;
      let 断片在第几口 = 0;
      let 最终档 = "清醒";
      let 失去意识分钟 = 0;
      const 代谢率 = Math.min(.9, 间隔 / 90);
      for (let n = 1; n <= 口数; n++) {
        const 这口实际 = 药物强度 * Math.pow(.6, n - 1);
        if (n > 1) 累计 = Math.round(累计 * (1 - 代谢率) * 10) / 10;
        累计 = Math.round((累计 + 这口实际) * 10) / 10;
        if (n > 1) 抗性 = Math.round(抗性 * .92 * 10) / 10;
        const 差 = Math.round((抗性 - 累计) * 10) / 10;
        let 档;
        if (差 >= 2) 档 = "清醒"; else if (差 >= .5) 档 = "微醺"; else if (差 >= -1) 档 = "头晕"; else if (差 >= -2.5) 档 = "模糊"; else if (差 >= -4) 档 = "断片"; else 档 = "被放倒";
        const 开始断片 = !断片了 && (档 === "断片" || 档 === "被放倒");
        if (开始断片) {
          断片了 = true;
          断片在第几口 = n;
        }
        最终档 = 档;
        口.push({
          第几口: n,
          这口药量: Math.round(这口实际 * 10) / 10,
          累计药量: 累计,
          当前抗性: 抗性,
          差,
          档,
          开始断片,
          描述: 抗药描述(档, n)
        });
        明细.push(`第 ${n} 口：这口 ${Math.round(这口实际 * 10) / 10}，累计 ${累计} vs 抗性 ${抗性} → 差 ${差} → ${档}`);
        if (档 === "被放倒") break;
      }
      const 最后差 = Math.abs(口[口.length - 1]?.差 ?? 0);
      if (最终档 === "断片") {
        失去意识分钟 = Math.min(240, Math.round(最后差 * 35));
      } else if (最终档 === "被放倒") {
        失去意识分钟 = Math.min(480, Math.round(最后差 * 55));
      } else if (最终档 === "模糊") {
        失去意识分钟 = Math.min(90, Math.round(最后差 * 18));
      }
      let 醒来;
      if (最终档 === "清醒" || 最终档 === "微醺") {
        醒来 = "你一直醒着。★ 她知道没成功 —— 而她的表情变了";
      } else if (最终档 === "头晕") {
        醒来 = "你头晕得厉害，但意识是清的。★ 你记得她做了什么";
      } else if (最终档 === "模糊") {
        醒来 = "★ 你记得零碎的片段 —— 她的手，天花板，还有别人说话的声音";
      } else if (最终档 === "断片") {
        醒来 = "★ 你醒来的时候身上是空的。手机、钱包、还有几个小时";
      } else {
        醒来 = "★★★ 你在一个不知道是哪的地方醒过来。★ 这已经不是钱的问题了";
      }
      const 停在哪 = 最终档 === "清醒" ? "你没倒" : 最终档 === "微醺" ? "你只是有点上头" : 最终档 === "头晕" ? "你坐下了，但还清醒" : 最终档 === "模糊" ? `第 ${断片在第几口 || 口.length} 口之后，你就说不清楚了` : `★ 第 ${口.length} 口之后，你什么都不记得了`;
      return {
        抗性: 基础抗性,
        累积药量: 累计,
        档: 最终档,
        失去意识分钟,
        醒来,
        口,
        喝了多少口: 口.length,
        停在哪,
        明细
      };
    }
    function 算识破(读人, 感知, 时机, 骗局完成度, 技能破译, 技能身份映射, 技能真假) {
      const 明细 = [];
      const 技能加 = 技能破译 * .6 + 技能身份映射 * .5 + 技能真假 * .3;
      const 洞察 = Math.round(Math.min(10, 读人 * .4 + 感知 * .3 + 时机 * .3 + 技能加) * 10) / 10;
      明细.push(`洞察 = 读人${读人}×0.4 + 感知${感知}×0.3 + 时机${时机}×0.3` + `${技能加 ? ` + 技能 ${技能加.toFixed(1)}` : ""} = ${洞察}`);
      明细.push(`骗局完成度 = ${骗局完成度}`);
      const 层 = [ {
        需要: 3,
        内容: "照片是复用的 —— 同一张图出现在别的账号上"
      }, {
        需要: 5,
        内容: "账号注册时间和她说的对不上"
      }, {
        需要: 7,
        内容: "她回消息的作息不对 —— 有人在轮班"
      }, {
        需要: 8.5,
        内容: "对面是一个团队，用同一套话术模板"
      }, {
        需要: 10,
        内容: "★ 你能定位到照片真正的主人"
      } ];
      const 能看出 = 层.filter(l => 洞察 >= l.需要).map(l => l.内容);
      let 结论;
      if (能看出.length >= 4) 结论 = "你从头到尾都看得出来。★ 而你已经在这上面投进去三个月了"; else if (能看出.length >= 2) 结论 = "你有怀疑，但你说服了自己"; else if (能看出.length >= 1) 结论 = "你觉得哪里不对，但说不上来"; else 结论 = "你什么也没看出来";
      return {
        洞察,
        骗局: 骗局完成度,
        能看出,
        结论,
        明细
      };
    }
    function 算议价(气场, 读人, 魅力, 她开的价, 技能信誉伪造) {
      const 明细 = [];
      let 你的价 = 气场 * .5 + 读人 * .3 + 魅力 * .2 + 技能信誉伪造 * .4;
      你的价 = Math.round(Math.min(10, 你的价) * 10) / 10;
      const 差 = 你的价 - 她开的价;
      let 压价率 = Math.round(Math.max(-30, Math.min(30, 差 * 10)));
      const 倍率 = Math.round((1 - 压价率 / 100) * 100) / 100;
      const 最终价 = Math.round(她开的价 * 倍率 * 10) / 10;
      明细.push(`你的价 = 气场${气场}×0.5 + 读人${读人}×0.3 + 魅力${魅力}×0.2 = ${你的价}`);
      明细.push(`她开的价 ${她开的价}　差 ${差 > 0 ? "+" : ""}${Math.round(差 * 10) / 10} → 压价 ${压价率}%`);
      明细.push(`实际价格 = ${她开的价} × ${倍率} = ${最终价}`);
      let 她的反应;
      if (压价率 >= 20) 她的反应 = "她答应了，而且没多问。★ 但你压得太狠，她会记着这件事"; else if (压价率 >= 10) 她的反应 = '她让了一步，说"就这一次"'; else if (压价率 > -10) 她的反应 = "她按原价。不多不少"; else if (压价率 > -20) 她的反应 = "她加了价。★ 而且她开始觉得你不太懂"; else 她的反应 = "★ 她把价翻上去了。★ 她在试探你有多少钱";
      return {
        你的价,
        她的价: 她开的价,
        压价率,
        最终价,
        她的反应,
        明细
      };
    }
    const 关系锚点 = [ {
      到: 1,
      锚点: "她回了第一条消息"
    }, {
      到: 2,
      锚点: "她主动问了你一个问题"
    }, {
      到: 3,
      锚点: "知道她的真实年龄 + 住在哪个城市"
    }, {
      到: 4,
      锚点: "她发来第一张照片（哪怕很糊）"
    }, {
      到: 5,
      锚点: "交换照片 —— 她也拿到了你的"
    }, {
      到: 6,
      锚点: "她主动发来消息（不是你先发的）"
    }, {
      到: 7,
      锚点: "语音或视频通过话"
    }, {
      到: 8,
      锚点: "线下见过一面（★ 不一定是做）"
    }, {
      到: 9,
      锚点: "她跟你说了一件真事"
    }, {
      到: 10,
      锚点: "★ 她主动提出来下一次"
    } ];
    function 关系能推进吗(当前, 做到了什么) {
      const 下 = Math.min(10, Math.floor(当前) + 1);
      const 该做 = 关系锚点.find(a => a.到 === 下);
      if (!该做) return {
        能: false,
        新值: 当前,
        缺什么: "已经到顶"
      };
      const 能 = 做到了什么.includes(该做.锚点) || 做到了什么.length > 0;
      return {
        能,
        新值: 能 ? 下 : 当前,
        缺什么: 能 ? "" : `还差：${该做.锚点}`
      };
    }
    const 关系下降 = [ {
      情况: "消失超过 21 天",
      掉多少: 1
    }, {
      情况: "被她发现你在骗她",
      掉多少: 4
    }, {
      情况: "在同一个圈子里被她朋友看到",
      掉多少: 2
    } ];
    function 算夺位(手段, 圈子门槛, 你的气场, 你的魅力, 你的战力, 技能信誉伪造, 技能影子档案) {
      const 明细 = [];
      const 你的分 = 气场 * .4 + 魅力 * .3 + 战力 * .3 + 技能信誉伪造 * .8 + 技能影子档案 * .5;
      const 能拿 = 你的分 >= 圈子门槛;
      明细.push(`你的分 = 气场${气场}×0.4 + 魅力${魅力}×0.3 + 战力${战力}×0.3` + `${技能信誉伪造 ? ` + 信誉伪造 ${技能信誉伪造 * .8}` : ""} = ${Math.round(你的分 * 10) / 10}`);
      明细.push(`圈子门槛 ${圈子门槛} → ${能拿 ? "够" : "不够"}`);
      let 耗时天数, 他们怎么看, 后患;
      if (手段 === "正取") {
        耗时天数 = 30;
        他们怎么看 = "服";
        后患 = "";
      } else if (手段 === "夺") {
        耗时天数 = 7;
        他们怎么看 = "不服";
        后患 = "★ 被挤掉的那个人还在。他会等机会";
      } else {
        耗时天数 = 2;
        他们怎么看 = "要报仇";
        后患 = "★★★ 大概一两个月内，会有人来找你。★ 而这次不是钱的事";
      }
      if (!能拿) 耗时天数 = Math.round(耗时天数 * 2);
      return {
        能拿,
        耗时天数,
        他们怎么看,
        后患,
        明细
      };
    }
    const 带病概率 = [ {
      情况: "普通地区普通型",
      概率: 8
    }, {
      情况: "高发地区",
      概率: 25
    }, {
      情况: "明确从业者",
      概率: 30
    }, {
      情况: "静脉药物使用者",
      概率: 45
    }, {
      情况: "不知道（没体检）",
      概率: 15
    } ];
    const 行为系数 = [ {
      行为: "无套内射",
      系数: 1
    }, {
      行为: "无套外射",
      系数: .6
    }, {
      行为: "口交",
      系数: .1
    }, {
      行为: "有套",
      系数: .15
    }, {
      行为: "有破皮",
      系数: 1.3
    } ];
    const 免疫减成 = [ 0, .4, 1, 1 ];
    function 算疾病(对方带病, 行为, 技能免疫疾病) {
      const 明细 = [];
      const 减 = 免疫减成[Math.max(0, Math.min(3, 技能免疫疾病))] ?? 0;
      const 概率 = Math.round(对方带病 * 行为 * (1 - 减) * 100) / 100;
      明细.push(`感染概率 = 对方带病 ${对方带病}% × 行为系数 ${行为} × (1 − 免疫减成 ${减}) = ${概率}%`);
      const 骰 = Math.random() * 100;
      const 感染 = 骰 < 概率;
      let 说明;
      if (减 >= 1) 说明 = "★ 免疫技能全挡下了。你没病 —— 而她也不知道你为什么不担心"; else if (感染) 说明 = "★★ 中了。两条进度条开始赛跑：感染 +1/天 vs 治疗"; else 说明 = '这次没事。★ 但"这次没事"不代表下次';
      return {
        概率,
        骰: Math.round(骰 * 10) / 10,
        感染,
        说明,
        明细
      };
    }
    const 受孕概率 = [ {
      情况: "安全期",
      概率: 3
    }, {
      情况: "普通日子",
      概率: 15
    }, {
      情况: "危险期",
      概率: 35
    }, {
      情况: "危险期 + 内射",
      概率: 50
    } ];
    function 算生育(情况, 技能生育控制, 今天, 意愿, 借种技能 = 0) {
      const 明细 = [];
      let 概率 = 0;
      let 中了 = false;
      let 说明 = "";
      if (意愿 === "播种" || 借种技能 >= 1 && 意愿 !== "避孕" || 技能生育控制 >= 2 && 意愿 === "播种") {
        概率 = 100;
        中了 = true;
        说明 = "★★★ 因果播种一击必中 —— 胚胎百分之百着床！生下的孩子眉眼极度肖似你，但外界任何医学司法DNA检测永远绝对匹配其合法丈夫！";
        明细.push("主动意念开启【播种受孕】/【借种特权】→ 受孕概率锁定 100%");
      } else if (技能生育控制 >= 1 || 意愿 === "避孕") {
        概率 = 0;
        中了 = false;
        说明 = "★ 避孕意念开启。内射无痕，无任何受孕可能，亿万发皆为白浆。";
        明细.push(`生育控制生效（Lv${技能生育控制}）→ 受孕概率归零 0%`);
      } else {
        概率 = Math.round(情况 * 100) / 100;
        明细.push(`基础受孕概率 = ${概率}%`);
        const 骰 = Math.random() * 100;
        中了 = 骰 < 概率;
        if (中了) 说明 = "★★ 意外中招 —— 两条线从这里开始分岔。28 天后才能测出。"; else 说明 = "这次运气好未中。但 28 天内对方会一直忐忑。";
      }
      const d = new Date(今天.replace(/[年月]/g, "-").replace("日", ""));
      d.setDate(d.getDate() + 28);
      const 判定日 = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
      return {
        概率,
        感染: 中了,
        判定日,
        说明,
        明细
      };
    }
    const 暴露涨 = [ {
      事: "被认出来一次",
      涨: "+5"
    }, {
      事: "差点被认出来",
      涨: "+3"
    }, {
      事: "在同一地区连续做事（3 次以上）",
      涨: "+5 / 次"
    }, {
      事: "被她老公/男友看到脸",
      涨: "+15"
    }, {
      事: "监控拍到正面",
      涨: "+10"
    }, {
      事: "在同一个群里混太久被记住昵称",
      涨: "+8"
    }, {
      事: "用真名/真手机号",
      涨: "+20"
    } ];
    const 暴露降 = [ {
      事: "离开该地区 1 周",
      降: "−5"
    }, {
      事: "离开 2 周",
      降: "−8"
    }, {
      事: "之后每周",
      降: "−3"
    }, {
      事: "Lv80 无痕之后（每 7 天）",
      降: "−10"
    } ];
    const 暴露阈值 = [ {
      值: 60,
      后果: '★ 当地开始有人打听他。★ 中介群里会出现"那个人"的说法'
    }, {
      值: 80,
      后果: '★★ 触发反噬：掉 10 级 + 冷却。★ 手机开始"不太好使"'
    }, {
      值: 100,
      后果: "★★★ 该地区永久不可用。★ 但人还可以换"
    } ];
    const 声望涨 = [ {
      事: "一场顺利的闭环（她给好评）",
      涨: "+2"
    }, {
      事: "被圈子里的人推荐",
      涨: "+5"
    }, {
      事: "老关系回头找你",
      涨: "+3"
    } ];
    const 声望降 = [ {
      事: '传闻（"那个人查不到"）',
      降: "−5 / 条"
    }, {
      事: "被她挂出来",
      降: "−15"
    }, {
      事: "放鸽子（约好没到）",
      降: "−10"
    } ];
    const 声望阈值 = [ {
      值: 70,
      后果: "★ 圈子里开始有人主动找你"
    }, {
      值: 30,
      后果: "★ 有人开始防着你、试探你"
    }, {
      值: 10,
      后果: "★★★ 该地区的圈子对他关闭"
    } ];
    const 位子层级 = [ {
      层: 1,
      名: "最外围",
      能做什么: "只能在门口待着"
    }, {
      层: 2,
      名: "进来过",
      能做什么: "能参与，但没人特别记得他"
    }, {
      层: 3,
      名: "有名字",
      能做什么: "圈子里认得他"
    }, {
      层: 4,
      名: "有分量",
      能做什么: "说话有人听"
    }, {
      层: 5,
      名: "说了算",
      能做什么: "★ 能决定谁能进这个圈子"
    } ];
    const 位子下降 = [ {
      事: '"要报仇"的人动手',
      掉: 1
    }, {
      事: "长时间不出现（30 天）",
      掉: 1
    }, {
      事: "被人当面顶回去",
      掉: 1
    } ];
    const 产业税 = [ {
      情况: "本地有关系（位子 ≥3）",
      影响: "税率 −10%"
    }, {
      情况: "有人罩着（位子 ≥4）",
      影响: "税率 −20%"
    }, {
      情况: "没有关系",
      影响: "每月固定被抽 15%"
    }, {
      情况: "占的是别人的地盘",
      影响: "★ 每月被找麻烦一次"
    } ];
    const 产业风险 = [ {
      事: "被查（无证/超范围）",
      概率: 8,
      损失: "停业 7~30 天"
    }, {
      事: "有人闹事",
      概率: 15,
      损失: "赔钱 + 需要摆平"
    }, {
      事: "员工卷钱跑",
      概率: 6,
      损失: "损失一个月流水"
    }, {
      事: "竞争对手举报",
      概率: 10,
      损失: "停业 + 罚款"
    }, {
      事: "她（那个女孩）出事",
      概率: 12,
      损失: "★ 关系断，而且会牵出你"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/属性感受.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      全读数: () => 全读数,
      加点前后: () => 加点前后,
      尺寸对照: () => 尺寸对照,
      感受: () => 感受,
      持久对照: () => 持久对照,
      硬度对照: () => 硬度对照,
      读数: () => 读数,
      逐值表: () => 逐值表
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    const 逐值表 = {
      持久: [ {
        值: 1,
        感受: "七八分钟就交代了。她刚有点感觉就停了",
        读数: "7 分钟"
      }, {
        值: 2,
        感受: "十几分钟。她还没到你就完了",
        读数: "14 分钟"
      }, {
        值: 3,
        感受: "二十来分钟。★ 普通人的水平，她够用但记不住",
        读数: "21 分钟"
      }, {
        值: 4,
        感受: "快半小时。她会说你挺能撑",
        读数: "28 分钟"
      }, {
        值: 5,
        感受: "三十五分钟。★ 她开始有点跟不上",
        读数: "35 分钟"
      }, {
        值: 6,
        感受: "四十来分钟。她会主动说慢点",
        读数: "42 分钟"
      }, {
        值: 7,
        感受: "快五十分钟。★ 她中间会求",
        读数: "49 分钟"
      }, {
        值: 8,
        感受: "快一小时。她开始讲不完整的句子",
        读数: "56 分钟"
      }, {
        值: 9,
        感受: "一小时往上。★ 这已经不是享受，是考验",
        读数: "63 分钟"
      }, {
        值: 10,
        感受: "七十分钟。★★★ 她到最后是哑的",
        读数: "70 分钟"
      } ],
      恢复: [ {
        值: 1,
        感受: "一小时。★ 一发就废，她躺着看你喘",
        读数: "不应期 60 分钟"
      }, {
        值: 2,
        感受: "半小时。她中间会去洗个澡",
        读数: "不应期 30 分钟"
      }, {
        值: 3,
        感受: "二十分钟。★ 她去个洗手间回来你又能来",
        读数: "不应期 20 分钟"
      }, {
        值: 4,
        感受: "一刻钟。她还在缓，你已经硬了",
        读数: "不应期 15 分钟"
      }, {
        值: 5,
        感受: "十二分钟。★ 她刚平下来你就又想",
        读数: "不应期 12 分钟"
      }, {
        值: 6,
        感受: '十分钟。她开始说"你等等"',
        读数: "不应期 10 分钟"
      }, {
        值: 7,
        感受: "不到九分钟。★ 她翻身想躲",
        读数: "不应期 8.6 分钟"
      }, {
        值: 8,
        感受: "七分半。★★ 她问你到底吃什么长大的",
        读数: "不应期 7.5 分钟"
      }, {
        值: 9,
        感受: "不到七分钟。她开始怕你",
        读数: "不应期 6.7 分钟"
      }, {
        值: 10,
        感受: "六分钟。★★★ 几乎没有间隙",
        读数: "不应期 6 分钟"
      } ],
      硬度: [ {
        值: 1,
        感受: "半软。★ 能进去，但中途会掉出来",
        读数: "55%"
      }, {
        值: 2,
        感受: "勉强。换姿势要小心",
        读数: "60%"
      }, {
        值: 3,
        感受: "一般。停一会儿说话会软一点",
        读数: "65%"
      }, {
        值: 4,
        感受: "正常。★ 大多数时候没问题",
        读数: "70%"
      }, {
        值: 5,
        感受: "稳。停下来接吻、换姿势都不掉",
        读数: "75%"
      }, {
        值: 6,
        感受: "很稳。★ 她握着的时候会多捏两下",
        读数: "80%"
      }, {
        值: 7,
        感受: '硬。她第一次碰的时候会"哦"一声',
        读数: "85%"
      }, {
        值: 8,
        感受: "撑得发亮，青筋跳。★ 她握的时候会停一下",
        读数: "90%"
      }, {
        值: 9,
        感受: '硬得有点吓人。她说"你轻点"',
        读数: "95%"
      }, {
        值: 10,
        感受: "★★★ 像块铁。她看一眼就有点紧张",
        读数: "100%"
      } ],
      体力: [ {
        值: 1,
        感受: "一发就躺。完事之后连话都不想说",
        读数: "1 发"
      }, {
        值: 2,
        感受: "两发。★ 第二发就没那么有力气",
        读数: "2 发"
      }, {
        值: 3,
        感受: "三发。到第三发她开始跟不上你",
        读数: "3 发"
      }, {
        值: 4,
        感受: "四发。★ 她中场要喝水",
        读数: "4 发"
      }, {
        值: 5,
        感受: "五发。她开始数你来了几次",
        读数: "5 发"
      }, {
        值: 6,
        感受: "六发。★ 她求过两次你都没停",
        读数: "6 发"
      }, {
        值: 7,
        感受: "七发。她就是冲这个找你的",
        读数: "7 发"
      }, {
        值: 8,
        感受: "八发。★★ 天快亮了",
        读数: "8 发"
      }, {
        值: 9,
        感受: "九发。她第二天起不来床",
        读数: "9 发"
      }, {
        值: 10,
        感受: "十发。★★★ 她自己都不相信",
        读数: "10 发"
      } ],
      感知: [ {
        值: 1,
        感受: "看不出她爽没爽。★ 你只能猜，她配合你猜",
        读数: "37%"
      }, {
        值: 2,
        感受: "能看出一点点。她演不演你分不清",
        读数: "44%"
      }, {
        值: 3,
        感受: "知道个大概。★ 快了慢了你有数",
        读数: "51%"
      }, {
        值: 4,
        感受: "看得出来。她不用做戏你也知道",
        读数: "58%"
      }, {
        值: 5,
        感受: "知道她哪一下有反应。★ 你可以开始控制她",
        读数: "65%"
      }, {
        值: 6,
        感受: "她呼吸一变你就知道到哪了",
        读数: "72%"
      }, {
        值: 7,
        感受: "★ 你能把她吊在半空 —— 想让她什么时候到就什么时候",
        读数: "79%"
      }, {
        值: 8,
        感受: "她还没出声你就知道",
        读数: "86%"
      }, {
        值: 9,
        感受: "她的身体比她的嘴诚实，而你都听得懂",
        读数: "93%"
      }, {
        值: 10,
        感受: "★★★ 你比她自己更清楚她什么时候会到",
        读数: "100%"
      } ],
      尺寸控制: [ {
        值: 1,
        感受: "十一厘米。★★ 多数她会失望，但嘴上不说",
        读数: "11.0 cm"
      }, {
        值: 2,
        感受: "十二厘米。★ 普通偏下。她不会提这件事",
        读数: "12.0 cm"
      }, {
        值: 3,
        感受: "十三厘米。普通。她不会不满",
        读数: "13.0 cm"
      }, {
        值: 4,
        感受: "十四厘米。★ 主流区间。多数人在这附近",
        读数: "14.0 cm"
      }, {
        值: 5,
        感受: "十五厘米。★ 她会多看一眼",
        读数: "15.0 cm"
      }, {
        值: 6,
        感受: "十六厘米。偏大。★ 有些会喊疼，有些很喜欢",
        读数: "16.0 cm"
      }, {
        值: 7,
        感受: "十七厘米。大。⚠ 不是每个都吃得下",
        读数: "17.0 cm"
      }, {
        值: 8,
        感受: "十八厘米。★★ 她要挑人",
        读数: "18.0 cm"
      }, {
        值: 9,
        感受: "十九厘米。★★ 多数会先愣一下",
        读数: "19.0 cm"
      }, {
        值: 10,
        感受: "二十厘米。★★★ 少数人能吃下，多数会拒绝",
        读数: "20.0 cm"
      } ],
      强壮: [ {
        值: 1,
        感受: "文弱。★ 被按住就动不了",
        读数: "战力 7"
      }, {
        值: 2,
        感受: "普通人。一对一都吃力",
        读数: "战力 13"
      }, {
        值: 3,
        感受: "还算结实。★ 一对一能撑，两个就不行",
        读数: "战力 20"
      }, {
        值: 4,
        感受: "经常干活。力气比看起来大",
        读数: "战力 27"
      }, {
        值: 5,
        感受: "★ 一个人拦不住你",
        读数: "战力 33"
      }, {
        值: 6,
        感受: "常年健身。她看得出来",
        读数: "战力 40"
      }, {
        值: 7,
        感受: "★ 两个普通人不是对手",
        读数: "战力 47"
      }, {
        值: 8,
        感受: "很壮。★★ 他们开始打听你是谁",
        读数: "战力 53"
      }, {
        值: 9,
        感受: "★★ 两下放倒一个",
        读数: "战力 60"
      }, {
        值: 10,
        感受: "★★★ 三个人不敢一起上",
        读数: "战力 67"
      } ],
      魅力: [ {
        值: 1,
        感受: "路人。★ 你发的消息沉在底下没人点",
        读数: "基础命中 4"
      }, {
        值: 2,
        感受: "不太起眼。十条消息回一条",
        读数: "基础命中 7"
      }, {
        值: 3,
        感受: "不难看。★ 有人会回，但不多",
        读数: "基础命中 11"
      }, {
        值: 4,
        感受: "还算顺眼。她愿意跟你多说两句",
        读数: "基础命中 14"
      }, {
        值: 5,
        感受: "★ 走在街上会被回头",
        读数: "基础命中 18"
      }, {
        值: 6,
        感受: "好看。她回你的速度明显快了",
        读数: "基础命中 21"
      }, {
        值: 7,
        感受: "★ 她主动问你的次数变多了",
        读数: "基础命中 25"
      }, {
        值: 8,
        感受: "很扎眼。走到哪都有人看",
        读数: "基础命中 28"
      }, {
        值: 9,
        感受: "★ 她先发消息的次数比你还多",
        读数: "基础命中 32"
      }, {
        值: 10,
        感受: "★★★ 你说什么她都愿意听",
        读数: "基础命中 35"
      } ],
      读人: [ {
        值: 1,
        感受: '直男。★ 她说"没事"你就真以为没事',
        读数: "基础命中 4"
      }, {
        值: 2,
        感受: "听不出话外音",
        读数: "基础命中 7"
      }, {
        值: 3,
        感受: "能听懂一半。★ 剩下那一半事后才反应过来",
        读数: "基础命中 11"
      }, {
        值: 4,
        感受: "大概能猜到她的意思",
        读数: "基础命中 14"
      }, {
        值: 5,
        感受: '★ 听得懂暗示。她说"太晚了"你知道是什么意思',
        读数: "基础命中 18"
      }, {
        值: 6,
        感受: "她说一半你就知道后半句",
        读数: "基础命中 21"
      }, {
        值: 7,
        感受: "★ 你能听出她哪句话是真的",
        读数: "基础命中 25"
      }, {
        值: 8,
        感受: "她不说话你也知道她想干什么",
        读数: "基础命中 28"
      }, {
        值: 9,
        感受: "★ 你知道她下一步会怎么走",
        读数: "基础命中 32"
      }, {
        值: 10,
        感受: "★★★ 她还没开口你就已经回应了",
        读数: "基础命中 35"
      } ],
      气场: [ {
        值: 1,
        感受: "被牵着走。★ 她说多少钱你就给多少",
        读数: "压价 3%"
      }, {
        值: 2,
        感受: "说不上话。她不太听你的",
        读数: "压价 6%"
      }, {
        值: 3,
        感受: "能说两句。★ 但她不一定会听",
        读数: "压价 9%"
      }, {
        值: 4,
        感受: "说话有点分量",
        读数: "压价 12%"
      }, {
        值: 5,
        感受: "★ 压得住场。你出价她会让一步",
        读数: "压价 15%"
      }, {
        值: 6,
        感受: "她不跟你争",
        读数: "压价 18%"
      }, {
        值: 7,
        感受: "★ 她会先看你的意思再开口",
        读数: "压价 21%"
      }, {
        值: 8,
        感受: "你能定规矩",
        读数: "压价 24%"
      }, {
        值: 9,
        感受: "★ 桌上有别人时她先看你",
        读数: "压价 27%"
      }, {
        值: 10,
        感受: "★★★ 你说不行，她就不敢",
        读数: "压价 30%"
      } ],
      时机: [ {
        值: 1,
        感受: "容易早泄、容易中途软。★ 波动大到没法预期",
        读数: "波动 ±18.5%"
      }, {
        值: 2,
        感受: "状态很不稳",
        读数: "波动 ±17.0%"
      }, {
        值: 3,
        感受: "一般。★ 偶尔会有状态特别差的一晚",
        读数: "波动 ±15.5%"
      }, {
        值: 4,
        感受: "还行。大部分时候正常",
        读数: "波动 ±14.0%"
      }, {
        值: 5,
        感受: "★ 你大概知道自己今晚什么样",
        读数: "波动 ±12.5%"
      }, {
        值: 6,
        感受: "稳。很少失常",
        读数: "波动 ±11.0%"
      }, {
        值: 7,
        感受: "★ 你能感觉到状态在往哪走",
        读数: "波动 ±9.5%"
      }, {
        值: 8,
        感受: "很稳。说什么时候就什么时候",
        读数: "波动 ±8.0%"
      }, {
        值: 9,
        感受: "★ 收放自如",
        读数: "波动 ±6.5%"
      }, {
        值: 10,
        感受: "★★★ 想什么时候完事就什么时候",
        读数: "波动 ±5.0%"
      } ],
      收尾: [ {
        值: 1,
        感受: "完事就冷。★ 她穿衣服的时候你已经在看手机了",
        读数: "回约率 8%"
      }, {
        值: 2,
        感受: "基本不联系",
        读数: "回约率 16%"
      }, {
        值: 3,
        感受: "还算客气。★ 她不会特别想再见你，但也不躲",
        读数: "回约率 24%"
      }, {
        值: 4,
        感受: "她走的时候会看你一眼",
        读数: "回约率 32%"
      }, {
        值: 5,
        感受: "★ 她会找借口再联系你",
        读数: "回约率 40%"
      }, {
        值: 6,
        感受: '她加了一句"下次"',
        读数: "回约率 48%"
      }, {
        值: 7,
        感受: "★ 第二天她先发的消息",
        读数: "回约率 56%"
      }, {
        值: 8,
        感受: "她开始问你什么时候有空",
        读数: "回约率 64%"
      }, {
        值: 9,
        感受: "★ 她记着你说的每句话",
        读数: "回约率 72%"
      }, {
        值: 10,
        感受: "★★★ 她开始舍不得你走",
        读数: "回约率 80%"
      } ]
    };
    const 夹 = v => Math.max(___WEBPACK_IMPORTED_MODULE_0__["属性下限"], Math.min(___WEBPACK_IMPORTED_MODULE_0__["属性上限"], Math.round(Number(v) || ___WEBPACK_IMPORTED_MODULE_0__["属性下限"])));
    function 感受(键, 值) {
      const 表 = 逐值表[键];
      if (!表) return "";
      return 表[夹(值) - 1]?.感受 ?? "";
    }
    function 读数(键, 值) {
      const 表 = 逐值表[键];
      if (!表) return `${值} / 10`;
      return 表[夹(值) - 1]?.读数 ?? `${值}`;
    }
    function 加点前后(键, 前, 后) {
      const 前读数 = 读数(键, 前), 前感受 = 感受(键, 前);
      const 后读数 = 读数(键, 后), 后感受 = 感受(键, 后);
      return {
        前读数,
        前感受,
        后读数,
        后感受,
        一句话: `${键} ${夹(前)} → ${夹(后)}：${前读数} → ${后读数}`
      };
    }
    function 全读数(属性) {
      return ___WEBPACK_IMPORTED_MODULE_0__["属性键"].map(k => ({
        键: k,
        值: 夹(属性[k] ?? ___WEBPACK_IMPORTED_MODULE_0__["属性下限"]),
        读数: 读数(k, 属性[k] ?? ___WEBPACK_IMPORTED_MODULE_0__["属性下限"]),
        感受: 感受(k, 属性[k] ?? ___WEBPACK_IMPORTED_MODULE_0__["属性下限"])
      }));
    }
    const 尺寸对照 = [ {
      厘米: 11,
      值: 1,
      写什么: "★★ 细。她能整个含住，但她不会说什么"
    }, {
      厘米: 12,
      值: 2,
      写什么: '★ 偏小。她会客气地夸你"温柔"'
    }, {
      厘米: 13,
      值: 3,
      写什么: "普通。她不会提，也不会失望"
    }, {
      厘米: 14,
      值: 4,
      写什么: "★ 够用。她能感觉到撑，但不胀"
    }, {
      厘米: 15,
      值: 5,
      写什么: "★ 她会多看一眼。进去的时候吸一口气"
    }, {
      厘米: 16,
      值: 6,
      写什么: '偏大。★ 有些会喊"慢点"，有些会主动往上迎'
    }, {
      厘米: 17,
      值: 7,
      写什么: "大。⚠ 前戏不够她会疼，要慢慢来"
    }, {
      厘米: 18,
      值: 8,
      写什么: "★★ 她要挑姿势。有几个位置她吃不下"
    }, {
      厘米: 19,
      值: 9,
      写什么: '★★ 多数会先愣一下，然后问"你确定吗"'
    }, {
      厘米: 20,
      值: 10,
      写什么: "★★★ 少数人能吃下，多数会拒绝"
    } ];
    const 硬度对照 = [ {
      值: 1,
      百分比: 55,
      写什么: "★ 半软 —— 塞进去的时候要用手扶，中途会滑出来"
    }, {
      值: 2,
      百分比: 60,
      写什么: "★ 勉强 —— 进去了，但换姿势的时候会掉"
    }, {
      值: 3,
      百分比: 65,
      写什么: "一般 —— 停一会儿说话会软一点，动起来又回来"
    }, {
      值: 4,
      百分比: 70,
      写什么: "正常 —— 她不会注意到这件事"
    }, {
      值: 5,
      百分比: 75,
      写什么: "稳 —— 接吻、换姿势都不掉"
    }, {
      值: 6,
      百分比: 80,
      写什么: "★ 很稳 —— 她握的时候会多捏两下"
    }, {
      值: 7,
      百分比: 85,
      写什么: '硬 —— 她第一次碰到会"哦"一声'
    }, {
      值: 8,
      百分比: 90,
      写什么: "★ 撑得发亮，青筋跳 —— 她握的时候会停一下"
    }, {
      值: 9,
      百分比: 95,
      写什么: '硬得有点吓人 —— 她说"你轻点"'
    }, {
      值: 10,
      百分比: 100,
      写什么: "★★★ 像块铁 —— 她看一眼就有点紧张"
    } ];
    const 持久对照 = [ {
      值: 1,
      分钟: 7,
      写什么: "★ 快。她刚湿你就完了"
    }, {
      值: 2,
      分钟: 14,
      写什么: "★ 偏快。她可能还差一点点"
    }, {
      值: 3,
      分钟: 21,
      写什么: "★ 正常。多数人在这"
    }, {
      值: 4,
      分钟: 28,
      写什么: "★ 够长。她到了你还在"
    }, {
      值: 5,
      分钟: 35,
      写什么: "她开始有点跟不上"
    }, {
      值: 6,
      分钟: 42,
      写什么: "她会主动说慢点"
    }, {
      值: 7,
      分钟: 49,
      写什么: "★ 她中间会求"
    }, {
      值: 8,
      分钟: 56,
      写什么: "她开始讲不完整的句子"
    }, {
      值: 9,
      分钟: 63,
      写什么: "★ 这已经不是享受，是考验"
    }, {
      值: 10,
      分钟: 70,
      写什么: "★★★ 她到最后是哑的"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/属性系统.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      买到要多少: () => 买到要多少,
      体力到轮数: () => 体力到轮数,
      全买要多少: () => 全买要多少,
      全满点数: () => 全满点数,
      升级一览: () => 升级一览,
      单项全买: () => 单项全买,
      尺寸到值: () => 尺寸到值,
      尺寸到厘米: () => 尺寸到厘米,
      尺寸到周长: () => 尺寸到周长,
      属性上限: () => 属性上限,
      属性下限: () => 属性下限,
      属性价格: () => 属性价格,
      属性表: () => 属性表,
      属性读数: () => 属性读数,
      属性键: () => 属性键,
      恢复到不应期: () => 恢复到不应期,
      感知到准确度: () => 感知到准确度,
      持久到分钟: () => 持久到分钟,
      时机到波动: () => 时机到波动,
      校验开局: () => 校验开局,
      满级点数: () => 满级点数,
      硬度到百分比: () => 硬度到百分比,
      累计给点: () => 累计给点,
      计算有效属性: () => 计算有效属性,
      该级信息: () => 该级信息,
      起始属性: () => 起始属性,
      阅历价: () => 阅历价,
      难度小结: () => 难度小结,
      难度表: () => 难度表
    });
    const 属性表 = [ {
      键: "持久",
      名: "持久",
      系: "身体",
      说明: "你能坚持多久 —— 决定她够不够时间"
    }, {
      键: "恢复",
      名: "恢复",
      系: "身体",
      说明: "不应期多短 —— 决定你能不能接上下一发"
    }, {
      键: "硬度",
      名: "硬度",
      系: "身体",
      说明: "状态稳不稳 —— 低了会中途软"
    }, {
      键: "体力",
      名: "体力",
      系: "身体",
      说明: "一晚最多几发"
    }, {
      键: "感知",
      名: "感知",
      系: "身体",
      说明: "你判断她状态有多准 —— 床上最重要的属性"
    }, {
      键: "尺寸控制",
      名: "尺寸",
      系: "身体",
      说明: "你的基础尺寸 —— 不是越大越好，是合不合适"
    }, {
      键: "强壮",
      名: "强壮",
      系: "身体",
      说明: "打不打得过 —— 决定你敢不敢去危险的地方"
    }, {
      键: "魅力",
      名: "魅力",
      系: "魅力",
      说明: "第一印象 —— 决定她回不回你"
    }, {
      键: "读人",
      名: "读人",
      系: "魅力",
      说明: "能不能看出她真实的需求"
    }, {
      键: "气场",
      名: "气场",
      系: "魅力",
      说明: "你说的话她听不听 —— 议价时压价"
    }, {
      键: "时机",
      名: "时机",
      系: "魅力",
      说明: "什么时候进、什么时候退 —— 它降低翻车概率"
    }, {
      键: "收尾",
      名: "收尾",
      系: "魅力",
      说明: "事后她还想不想再见到你"
    } ];
    const 属性键 = 属性表.map(a => a.键);
    const 属性下限 = 1;
    const 属性上限 = 10;
    const 全满点数 = 属性键.length * (属性上限 - 属性下限);
    const 难度表 = {
      顺风: {
        键: "顺风",
        起始: 2,
        预算: 44,
        封顶: 6,
        说明: "★★ 起点 Lv25。前期顺 —— 但后半段会还"
      },
      标准: {
        键: "标准",
        起始: 1,
        预算: 26,
        封顶: 5,
        说明: "★★★ 推荐。前期会被拒、被骗，那是设计好的"
      },
      硬核: {
        键: "硬核",
        起始: 1,
        预算: 18,
        封顶: 4,
        说明: "★★ 真的会出事。你能活下来就算赢"
      }
    };
    const 满级点数 = 99;
    function 难度小结(难度) {
      const d = 难度表[难度] ?? 难度表.标准;
      const 满级需要 = 全满点数;
      const 手里有 = d.预算 + 满级点数;
      const 差 = 手里有 - 满级需要;
      let 结果;
      if (差 >= 0) 结果 = `满级能全推满（还剩 ${差} 点）`; else 结果 = `★ 差 ${-差} 点 —— 有几项永远到不了 10`;
      const 开局平均 = Math.round((1 + d.预算 / 属性键.length) * 100) / 100;
      return {
        起始: d.起始,
        预算: d.预算,
        手里有,
        满级需要,
        结果,
        开局平均
      };
    }
    function 校验开局(属性) {
      const 问题 = [];
      for (const k of 属性键) {
        const v = 属性[k];
        if (v == null) {
          问题.push(`${k} 没填`);
          continue;
        }
        if (v < 属性下限 || v > 属性上限) 问题.push(`${k} = ${v}（要在 ${属性下限}~${属性上限}）`);
      }
      return {
        通过: 问题.length === 0,
        问题
      };
    }
    function 起始属性(难度) {
      const d = 难度表[难度] ?? 难度表.标准;
      const 结果 = {};
      for (const k of 属性键) 结果[k] = d.起始;
      return 结果;
    }
    const 里程碑表 = {
      10: "它开始给你的东西，别人给不了",
      20: "你身上有些东西变了，你说不清",
      30: "你能进去的地方，门槛对你没有意义了",
      40: "你说的话开始有重量",
      50: "★★ 你能走到现实里，而且不留痕迹",
      60: "开始有人替你做事",
      70: "没有人记得住你的名字",
      80: "照片里的你开始模糊",
      90: "记录里找不到你",
      100: "★★★ 它开始在你没要求的时候做事"
    };
    function 累计给点(到几级) {
      return Math.max(0, Math.min(满级点数, Math.round(到几级) - 1));
    }
    function 该级信息(等级) {
      const 累计 = 累计给点(等级);
      return {
        等级,
        给点: 等级 >= 2 ? 1 : 0,
        累计,
        能加满几项: Math.floor(累计 / (属性上限 - 属性下限)),
        里程碑: 里程碑表[等级]
      };
    }
    function 升级一览() {
      return [ 1, 2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ].map(该级信息);
    }
    function 属性价格(当前值) {
      const v = Math.max(属性下限, Math.min(属性上限 - 1, Math.round(当前值)));
      return [ 3, 5, 7, 9, 12, 16, 21, 27, 35 ][v - 1] ?? 35;
    }
    const 阅历价 = 属性价格;
    function 买到要多少(从, 到) {
      let 总 = 0;
      for (let v = Math.max(1, Math.round(从)); v < Math.min(属性上限, Math.round(到)); v++) {
        总 += 属性价格(v);
      }
      return 总;
    }
    const 单项全买 = 买到要多少(属性下限, 属性上限);
    const 全买要多少 = 单项全买 * 属性键.length;
    function 持久到分钟(v) {
      return Math.round(Math.max(属性下限, Math.min(属性上限, v)) * 7 * 10) / 10;
    }
    function 恢复到不应期(v) {
      const x = Math.max(属性下限, Math.min(属性上限, v || 1));
      return Math.round(60 / x * 10) / 10;
    }
    function 硬度到百分比(v) {
      return Math.min(100, Math.round(50 + Math.max(0, Math.min(10, v)) * 5));
    }
    function 体力到轮数(v) {
      return Math.max(1, Math.round(v));
    }
    function 尺寸到厘米(v) {
      return Math.min(20, Math.round((10 + Math.max(属性下限, Math.min(属性上限, v))) * 10) / 10);
    }
    function 尺寸到值(厘米) {
      return Math.max(属性下限, Math.min(属性上限, Math.round(厘米 - 10)));
    }
    function 感知到准确度(v) {
      return Math.min(100, Math.round(30 + Math.max(0, Math.min(10, v)) * 7));
    }
    function 尺寸到周长(厘米) {
      return Math.round(厘米 * .88 * 10) / 10;
    }
    function 时机到波动(v) {
      return Math.max(.05, Math.round((.2 - Math.max(0, Math.min(10, v)) * .015) * 1e3) / 1e3);
    }
    function 计算有效属性(基础属性, 修正 = {}) {
      const 出 = {
        ...基础属性
      };
      for (const [k, v] of Object.entries(修正.临时增益 ?? {})) {
        if (出[k] !== undefined) 出[k] += v;
      }
      const 伤 = 修正.伤程度 ?? 0;
      if (伤 >= 5) {
        出.体力 = Math.max(1, (出.体力 ?? 2) - 3);
        出.强壮 = Math.max(1, (出.强壮 ?? 2) - 2);
        出.持久 = Math.max(1, (出.持久 ?? 2) - 2);
        出.魅力 = Math.max(1, (出.魅力 ?? 2) - 2);
      } else if (伤 >= 3) {
        出.体力 = Math.max(1, (出.体力 ?? 2) - 2);
        出.强壮 = Math.max(1, (出.强壮 ?? 2) - 1);
        出.魅力 = Math.max(1, (出.魅力 ?? 2) - 1);
      } else if (伤 >= 1) {
        出.体力 = Math.max(1, (出.体力 ?? 2) - 1);
      }
      if ((修正.PEP剩余天数 ?? 0) > 0) {
        出.体力 = Math.max(1, Math.round((出.体力 ?? 2) * .8));
        出.恢复 = Math.max(1, Math.round((出.恢复 ?? 2) * .7));
      }
      if (修正.病状态 === "已发病") {
        出.硬度 = Math.max(1, (出.硬度 ?? 2) - 3);
        出.持久 = Math.max(1, (出.持久 ?? 2) - 2);
        出.魅力 = Math.max(1, (出.魅力 ?? 2) - 2);
      }
      const 发数 = 修正.纵欲发数 ?? 0;
      const 极限发 = 基础属性.体力 ?? 2;
      if (发数 > 极限发) {
        const 超 = 发数 - 极限发;
        出.体力 = Math.max(1, (出.体力 ?? 2) - 超);
        出.硬度 = Math.max(1, (出.硬度 ?? 2) - 超);
      }
      for (const k of 属性键) {
        if (出[k] !== undefined) {
          出[k] = Math.max(属性下限, Math.min(属性上限, Math.round(出[k])));
        }
      }
      return 出;
    }
    function 属性读数(键, 值) {
      switch (键) {
       case "持久":
        return `${持久到分钟(值)} 分钟`;

       case "恢复":
        return `不应期 ${恢复到不应期(值)} 分钟`;

       case "硬度":
        return `${硬度到百分比(值)}%`;

       case "体力":
        return `${体力到轮数(值)} 发`;

       case "感知":
        return `判断准确度 ${感知到准确度(值)}%`;

       case "尺寸控制":
        return `${尺寸到厘米(值)} cm`;

       default:
        return `${值} / 10`;
      }
    }
  },
  "./src/神奇手机/神奇手机/核心/平台实样.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      取平台实样: () => 取平台实样,
      平台实样总: () => 平台实样总
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./平台实样库 */ "./src/神奇手机/神奇手机/核心/平台实样库.ts");
    var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./平台实样库-续 */ "./src/神奇手机/神奇手机/核心/平台实样库-续.ts");
    var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./平台实样库-终 */ "./src/神奇手机/神奇手机/核心/平台实样库-终.ts");
    const 平台实样总 = {
      ...___WEBPACK_IMPORTED_MODULE_0__["平台实样库"],
      ...___WEBPACK_IMPORTED_MODULE_1__["平台实样库续"],
      ...___WEBPACK_IMPORTED_MODULE_2__["平台实样库终"]
    };
    function 归(s) {
      return s.replace(/[（(][^）)]*[）)]/g, "").replace(/\s+/g, "").trim();
    }
    function 内(s) {
      return [ ...s.matchAll(/[（(]([^）)]*)[）)]/g) ].map(m => m[1]);
    }
    const 归一表 = new Map;
    for (const [k, v] of Object.entries(平台实样总)) {
      const n = 归(k);
      if (n && !归一表.has(n)) 归一表.set(n, v);
    }
    const 地区名s = [ "菲律宾", "越南", "泰国", "韩国", "日本", "中国台湾", "中国香港", "中国大陆", "新加坡", "印尼", "马来西亚", "欧美", "英国", "德语区", "荷兰", "法国", "俄语区", "中东", "海湾", "南亚", "拉美", "非洲", "柏林", "迪拜", "韩国" ];
    function 是地区(x) {
      return 地区名s.some(r => x.includes(r) || r.includes(x));
    }
    function 取平台实样(名, 地区) {
      const 去内层斜杠 = 名.replace(/[（(]([^）)]*)[）)]/g, m => m.replace(/\//g, "｜"));
      if (去内层斜杠.includes(" / ")) {
        const 分s = 去内层斜杠.split(" / ").map(x => 归(x)).filter(Boolean);
        for (const 分 of 分s) {
          const r = 取平台实样(分, 地区);
          if (r) return r;
        }
      }
      const 归名 = 归(名);
      if (归名 !== 名 && 归名 !== 去内层斜杠) {
        const r = 取平台实样(归名, 地区);
        if (r) return r;
      }
      if (平台实样总[名]) return 平台实样总[名];
      if (地区) {
        const 带 = Object.keys(平台实样总).find(k => k.includes(名) && 内(k).some(x => x.includes(地区) || 地区.includes(x)));
        if (带) return 平台实样总[带];
      }
      const n = 归(名);
      if (归一表.has(n)) {
        const 原 = 归一表.get(n);
        const 键 = Object.keys(平台实样总).find(k => 平台实样总[k] === 原 && 归(k) === n);
        if (!键) return 原;
        const 地括 = 内(键).filter(是地区);
        if (!地括.length) return 原;
        if (!地区 || 地括.some(x => x.includes(地区) || 地区.includes(x))) return 原;
      }
      for (const [k, v] of Object.entries(平台实样总)) {
        if (!(名.includes(k) || k.includes(名))) continue;
        const 地括 = 内(k).filter(是地区);
        if (!地括.length || !地区 || 地括.some(x => x.includes(地区) || 地区.includes(x))) return v;
      }
      return undefined;
    }
  },
  "./src/神奇手机/神奇手机/核心/平台实样库-终.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      平台实样库终: () => 平台实样库终
    });
    const 平台实样库终 = {
      Telegram: {
        她: '★★★ 全球加密通讯。★★★ 有"频道 / 群 / 私聊"三种形态',
        找: "★ 被人拉进群 / 频道",
        坑: "★★★ 门槛群要交钱。★★ 而且群主随时能踢你",
        实样: '`她`：进群先看公告\n（★ "看公告"是它的固定开场）',
        画像: '★ 全年龄。★★★ 这一行的"正规"交易都在 TG 上。',
        识别: "★★★ 「频道」是广播，「群」是多人 —— ★ 两者的玩法不同。"
      },
      Discord: {
        她: "★★ 游戏 / 兴趣社群起家，★ 但成人频道也不少",
        找: "★ 加服务器 → 验证",
        坑: "★★ 服务器可能一夜之间消失",
        实样: "`她`：DM me",
        画像: "★ 18-30。★★ 欧美为主。",
        识别: '★★ 它的"服务器 + 频道"分层是核心。'
      },
      Snapchat: {
        她: "★★★ 【阅后即焚】—— ★★★ 这是它最独特的地方",
        找: "★ 加好友 → 发图",
        坑: '★★★ 截图还是会留证据（★ 而且她会收到"你截图了"的通知）',
        实样: '`她`：Add me on snap\n（★ 说这句话 = 想要"不留痕"）',
        画像: "**18-28。** ★★ 欧美。",
        识别: '★★★ "即焚"这个功能本身就是它的定位。'
      },
      Kik: {
        她: '★ 早期匿名通讯，★ 现在主要是"约会导流"',
        找: "★ 交换 Kik 号",
        坑: "★★ 用户老化",
        实样: "`她`：Kik me",
        画像: "★ 美国。",
        识别: '★ 说"Kik me"的多半是老玩家。'
      },
      "Line 群": {
        她: "★★★ 台湾的绝对核心",
        找: "★ 加 LINE → 进群",
        坑: "★★ 台湾人不用微信 —— ★ 用微信的反而可疑",
        实样: '`她`：加個 Line 吧\n（★ 这句话在台湾等于"我信你了"）',
        画像: "★ 全年龄。",
        识别: "★★ 换 LINE = 关系成立。"
      },
      "Telegram 群（香港）": {
        她: "★★ 香港讨论区 + TG，★★★ 广东话是筛子",
        找: "★ 被拉进群",
        坑: "★★★ 不懂广东话会被筛出去",
        实样: "`她`：有冇人\n（★ 说普通话的会被踢）",
        画像: "★ 香港本地。",
        识别: "★★★ 语言本身就是门槛。"
      },
      "Line（泰国）": {
        她: "★★★ 泰国是 LINE 的全球最大市场之一",
        找: "★ 从别的平台导过来",
        坑: "★★ 她的 LINE 上有大量客人",
        实样: '`她`：แอดไลน์ได้ไหม（★ "可以加 LINE 吗"）',
        画像: "★ 全年龄。",
        识别: "★★ 泰国人不用微信。"
      },
      "Facebook 群（越南）": {
        她: "★★ 越南人用 FB 比用 Zalo 还多",
        找: "★ 加群",
        坑: "★ 群人数可以刷",
        实样: "`她`（群）：Ai rảnh không\n（★ 「谁有空」—— 最常见开场）",
        画像: "★ 全年龄。",
        识别: '★★ 看"活跃人数"不是"群人数"。'
      },
      "本地论坛（越南）": {
        她: "★ 越南本地小论坛",
        找: "★ 注册 + 发帖",
        坑: "★★ 越南语为主",
        实样: "（帖）",
        画像: "★ 本地人。",
        识别: "★ 语言是门槛。"
      },
      "Facebook 群（菲律宾）": {
        她: "★★★ 菲律宾的绝对核心。★★ 家族群 + 兴趣群",
        找: "★ 加群",
        坑: "★★ 家族 / 教会会介入",
        实样: '`她`（群）：Sis!\n（★ "Sis"是菲律宾的通用称呼）',
        画像: "★ 全年龄。",
        识别: "★★ 菲律宾的社交一切从 FB 开始。"
      },
      "TG（菲律宾）": {
        她: '★ 因为天主教背景，"见不得人"的事转 TG',
        找: "★ 群",
        坑: "★ 用户比 FB 少",
        实样: "`她`：TG mo",
        画像: "★ 18-35。",
        识别: "★ 从 FB 转 TG = 有事。"
      },
      "WhatsApp（菲律宾）": {
        她: "★ 主要用于工作 / 家人",
        找: "★ 换号",
        坑: "★ 和 FB 重叠",
        实样: "`她`：WhatsApp?",
        画像: "★ 全年龄。",
        识别: "★ 菲律宾人主要用 FB，WhatsApp 是补充。"
      },
      "Telegram（印尼）": {
        她: "★★ 印尼的 TG 群很活跃（★ 因为能匿名）",
        找: "★ 群",
        坑: "★★★ 宗教警察会盯",
        实样: "`她`：Grup?",
        画像: "★ 18-35。",
        识别: "★★ 匿名是它在这里最大的价值。"
      },
      "WhatsApp（印尼）": {
        她: "★ 主要通讯工具之一",
        找: "★ 换号",
        坑: "★ 实名程度高",
        实样: "`她`：WA?",
        画像: "★ 全年龄。",
        识别: '★ 印尼是"多平台并行"的典型。'
      },
      "Telegram（新加坡）": {
        她: "★★ 新加坡的 TG 群（★ 因为当地法律严）",
        找: "★ 群",
        坑: "★★ 芽笼之外的地方都非法",
        实样: "`她`：Come Geylang",
        画像: "★ 18-40。",
        识别: "★★ 新加坡的匿名需求比邻国更高。"
      },
      "Telegram（俄语区）": {
        她: "★★★ 俄罗斯的绝对核心（★ 因为政府管不住）",
        找: "★ 频道 / 群",
        坑: "★★ 频道订阅数可以买",
        实样: '`她`：Сколько?\n（★ "多少钱"—— 直接开场）',
        画像: "★ 18-40。",
        识别: "★★★ 俄语区的这一行基本都在 TG 上。"
      },
      "Snapchat（中东）": {
        她: '★★★ 海湾地区最爱用 —— ★★★ 因为"即焚"',
        找: "★ 加好友",
        坑: "★★★ 截图 = 家族暴力风险",
        实样: "`她`：Snap?",
        画像: "★ 18-30。",
        识别: '★★★ 用它 = 要"看得见但不留痕"。'
      },
      "Telegram（中东）": {
        她: "★ 同上，用在更隐蔽的场景",
        找: "★ 群",
        坑: "★★ 一旦被发现，后果最重",
        实样: "`她`：تلقرام",
        画像: "★ 18-35。",
        识别: '★ "换 TG" 在中东等于"进密室"。'
      },
      "Instagram finsta": {
        她: "★★★ finsta = fake Instagram（假 IG）—— ★★★ 这是欧美年轻人的独有文化",
        找: "★ 她主动给你",
        坑: "★★★ 给你 finsta = 给你她的真面目",
        实样: "`她`：I'll add you to my finsta\n（★ 这句话是很重的信任）",
        画像: "**16-25。** ★★ 欧美。",
        识别: "★★★ 「主号公开、finsta 私密」是这一代的标准结构。"
      },
      "WhatsApp（南亚）": {
        她: "★★★ 印度 / 巴基斯坦的绝对核心 —— ★★ 一切都在上面",
        找: "★ 换号 / 家族群",
        坑: "★★ 家族群 = 全家都在看",
        实样: "`她`：WA number?",
        画像: "★ 全年龄。",
        识别: '★★★ 南亚的"家族群"是最强的监视机制。'
      },
      "Instagram DM（南亚）": {
        她: "★★ 印度年轻人用 IG 私信",
        找: "★ 私信",
        坑: '★★ 有的账号是"代理"在管',
        实样: "`她`：DM",
        画像: "★ 18-30。",
        识别: "★ 南亚的 IG 使用率全球前列。"
      },
      "巴基斯坦（南亚）": {
        她: "★★★ 【荣誉处决】是真实存在的 → ★★★ 所以一切都在极度隐蔽中",
        找: "★ 几乎只有家族 / 熟人网络",
        坑: "★★★ 被发现 = 生命危险",
        实样: "（几乎没有公开入口）",
        画像: "★ 全年龄。",
        识别: '★★★ 这里没有"平台"，只有"人"。'
      },
      "孟加拉（南亚）": {
        她: "★ 和巴基斯坦类似，但更穷",
        找: "★ 中介 / 工厂附近",
        坑: "★★★ 成衣工厂 → 女工群体",
        实样: "（中介介绍）",
        画像: "★ 18-30。",
        识别: '★ 它的入口是"工厂"，不是"平台"。'
      },
      "WhatsApp（拉美）": {
        她: "★★★ 巴西 / 墨西哥的绝对核心",
        找: "★ 换号",
        坑: "★★ 家族群同样存在",
        实样: "`她`：Passa o zap?\n（★ 「zap」= WhatsApp，巴西俚语）",
        画像: "★ 全年龄。",
        识别: "★★★ 巴西说「zap」就是 WhatsApp。"
      },
      "Instagram DM（拉美）": {
        她: "★ 拉美年轻人用 IG",
        找: "★ 私信",
        坑: "★ 骗号多",
        实样: "`她`：DM",
        画像: "★ 18-30。",
        识别: "★ 和 WhatsApp 并用。"
      },
      "WhatsApp（非洲）": {
        她: "★★★ 非洲的绝对核心",
        找: "★ 换号",
        坑: "★★ 家族 / 部落网络",
        实样: "`她`：Send your number",
        画像: "★ 全年龄。",
        识别: "★★ 非洲的社交一切从 WhatsApp 开始。"
      },
      "Facebook 群（非洲）": {
        她: "★★ 群组文化重",
        找: "★ 加群",
        坑: "★★ 骗子也在群里",
        实样: "`她`（群）：",
        画像: "★ 全年龄。",
        识别: "★ 和 WhatsApp 并用。"
      },
      暗网市场: {
        她: "★★★ 要 Tor 才能进。★★ 只收加密货币",
        找: "★ Tor + 注册",
        坑: '★★★ 有一半是"蜜罐"（执法设的）',
        实样: "（商品页）",
        画像: "★ 极少数。",
        识别: "★★★ 门槛本身就是筛子。"
      },
      "Telegram 私密频道": {
        她: "★★ 邀请制。★★★ 而且链接会过期",
        找: "★ 一次性邀请链接",
        坑: "★★★ 频道可能一夜消失",
        实样: "`她`：Join: t.me/+xxx",
        画像: "★ 全球。",
        识别: '★★★ 邀请链接的"有效期"是它的安全机制。'
      },
      "Discord（暗网）": {
        她: "★ 服务器 + 验证机器人",
        找: "★ 通过验证",
        坑: "★★ 服务器容易被举报封禁",
        实样: "`她`：Verify first",
        画像: "★ 全球。",
        识别: '★ "验证"这一步是它的门槛。'
      },
      跨国圈子: {
        她: '★★ 跨国的"人脉网络"',
        找: "★ 通过熟人引荐",
        坑: "★★★ 完全靠信任，没有平台保障",
        实样: "（引荐）",
        画像: "★ 极少数。",
        识别: '★★ 它没有平台，只有"人带人"。'
      },
      "贴吧（特定吧）": {
        她: "★ 老式论坛。★★ 有些吧早就变味了",
        找: "★★ 直接发帖问",
        坑: "★ 积分 + 等级门槛",
        实样: "`她`（帖）：××有靠谱的吗",
        画像: "**18-35 男性为主。**",
        识别: "★★ 按城市分 = 密度最高。"
      },
      "Dcard（西斯板）": {
        她: "★★★ 台湾最活跃的匿名性板",
        找: "★ 抽卡 + 匿名发言",
        坑: "★★ 抽卡机制（★ 每天随机匹配）",
        实样: "`她`（帖）：西斯板看到你留言",
        画像: "**18-28。** ★★ 大学生为主。",
        识别: "★★★ 「西斯」= sex 的音译 —— ★ 这是它的密码。"
      },
      "PTT（SEX 板）": {
        她: "★★ 台湾最老的 BBS",
        找: "★ 看板 + 推文",
        坑: "★ 要注册 + 上站次数",
        实样: "（推文）`→` 原po正妹",
        画像: "**30-45 男性为主。**",
        识别: '★ PTT 的"表特板"是台湾最早的流量池。'
      },
      Mobile01: {
        她: "★ 台湾的3C / 生活论坛",
        找: "★ 板",
        坑: "★ 正经站 → 但私信功能是",
        实样: "（帖）",
        画像: "**25-45。**",
        识别: "★ 它的用户偏中产。"
      },
      "LIHKG（连登）": {
        她: "★★★ 香港最大匿名论坛。★ 广东话是筛子",
        找: "★ 出帖 + 私信",
        坑: "★★★ 不懂广东话会被筛出去",
        实样: "（帖）`她`：邊度有",
        画像: "**20-35。** ★★ 香港本地。",
        识别: "★★★ 语言门槛是它的第一道墙。"
      },
      "HKGolden 高登": {
        她: '★★ 比连登老，文化更"毒"',
        找: "★ 出帖",
        坑: "★ 用户年龄更大",
        实样: "（帖）",
        画像: "**25-40。**",
        识别: "★ 高登和连登是两种香港人。"
      },
      Kaskus: {
        她: "★ 印尼最大论坛",
        找: "★ 版块",
        坑: "★ 印尼语门槛",
        实样: "（帖）",
        画像: "**25-40。**",
        识别: '★ 它是印尼的"贴吧"。'
      },
      "佳礼（Cari）": {
        她: "★ 马来西亚华人论坛",
        找: "★ 版块",
        坑: "★ 中文为主",
        实样: "（帖）",
        画像: "★ 马来西亚华人。",
        识别: "★ 用中文这点很关键。"
      },
      "Sammyboy Forum": {
        她: "★★★ 新加坡最有名的成人论坛",
        找: "★ 注册 + 积分",
        坑: "★★ 新加坡法律严 → ★ 站本身在境外",
        实样: "（帖）`她`：",
        画像: "★ 新加坡男性为主。",
        识别: '★★★ 它的"field report"（实地报告）是核心。'
      },
      SWAG: {
        她: "★★ 台湾本土视频站",
        找: "★ 订阅 / 单买",
        坑: '★★ 很多是"素人包装"',
        实样: "（片名）`素人`",
        画像: "★ 台湾。",
        识别: '★★ 它是台湾的"OnlyFans + 制作"混合体。'
      },
      OneNight: {
        她: "★ 香港本地交友 app",
        找: "★ 滑卡",
        坑: "★ 用户少",
        实样: "`她`：Hi",
        画像: "★ 香港。",
        识别: "★ 它是香港少数本土玩家。"
      },
      "交友 app（香港）": {
        她: "★★ 香港用全球 app + 本土小站",
        找: "★ 各平台",
        坑: "★★ 广东话筛人",
        实样: "`她`：Where r u from",
        画像: "★ 20-40。",
        识别: "★ 香港女生英文比例更高。"
      },
      "Facebook Dating": {
        她: "★ FB 内置的约会功能",
        找: "★ 从好友里推",
        坑: "★★★ 会推给你认识的人 → ★ 所以最尴尬",
        实样: "（匹配）",
        画像: "★ 全年龄。",
        识别: '★★★ "从好友里推"是它最大的特点 —— ★ 也是最危险的。'
      },
      Omegle: {
        她: "★★★ 随机视频。★★ 完全匿名",
        找: "★ 随机",
        坑: "★★★ 有一半是暴露狂和小孩 —— ★★★ 风险最高",
        实样: "（随机连接）",
        画像: "★ 全年龄。",
        识别: "★★★ 它没有筛选机制 —— ★ 这就是它的问题。"
      },
      PinaLove: {
        她: "★★ 专门给外国人找菲律宾女友",
        找: "★ 匹配",
        坑: '★★ 大量"家族式"诈骗',
        实样: "`她`：Hello sir, where you from?",
        画像: "★ 菲律宾。",
        识别: '★★ 它是"跨国交友"的典型。'
      },
      FilipinoCupid: {
        她: "★ Cupid 系列的菲律宾站",
        找: "★ 匹配",
        坑: "★★ 付费才能聊",
        实样: "`她`：Hi!",
        画像: "★ 菲律宾。",
        识别: "★ Cupid 系列 = 付费聊天站。"
      },
      "Tantan（印尼）": {
        她: "★ 探探的海外版",
        找: "★ 滑卡",
        坑: "★ 用户少",
        实样: "`她`：Hai",
        画像: "★ 印尼。",
        识别: "★ 它是中国 app 出海。"
      },
      Omi: {
        她: "★ 泰国起源的交友 app",
        找: "★ 滑卡",
        坑: "★★ 用户杂",
        实样: "`她`：Hi",
        画像: "★ 东南亚。",
        识别: "★ 它在泰国的使用率最高。"
      },
      "VK（VKontakte）": {
        她: '★★★ 俄罗斯的"Facebook + 微信"—— ★★★ 一切都在上面',
        找: "★ 加好友 / 群",
        坑: "★★ 页面公开度高（★ 能看到她的生活）",
        实样: "`她`：Привет",
        画像: "★ 全年龄。",
        识别: "★★★ VK 的头像和照片基本是真的。"
      },
      "Odnoklassniki（OK）": {
        她: "★ 俄语区老牌社交（★ 年龄偏大）",
        找: "★ 加好友",
        坑: "★ 用户老",
        实样: "`她`：Здравствуйте",
        画像: "**35-55。**",
        识别: "★ 它是俄语区的中老年社交网。"
      },
      Mamba: {
        她: "★★ 俄语区最大约会站",
        找: "★ 匹配",
        坑: "★★ 假号极多",
        实样: "`她`：Привет, давай общаться",
        画像: "★ 全年龄。",
        识别: '★★ 它是俄语区的"探探"。'
      },
      LovePlanet: {
        她: "★ 同类",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Hi",
        画像: "★ 俄语区。",
        识别: "★ 同质。"
      },
      "Tinder（迪拜）": {
        她: "★★★ 海湾地区的 Tinder 用法完全不一样 —— ★★★ 本地女性基本不用",
        找: "★ 滑卡（★ 但匹配到的基本都是外籍）",
        坑: "★★★ 本地女性的账号几乎都是假的",
        实样: "`她`：Where are you from?",
        画像: "★ 迪拜 = 80% 外籍人口。",
        识别: '★★★ 在迪拜刷到的"本地女性"，基本不是本地人。'
      },
      Aisle: {
        她: "★ 印度老牌约会站",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Hi",
        画像: "★ 印度。",
        识别: "★ 印度本地玩家之一。"
      },
      Woo: {
        她: '★ 印度，主打"女性优先"',
        找: "★ 女方先开口",
        坑: "★ 用户少",
        实样: "`她`：Hello",
        画像: "★ 印度。",
        识别: "★ 它的规则和 Bumble 类似。"
      },
      TrulyMadly: {
        她: '★ 印度，主打"性格匹配"',
        找: "★ 测试 + 匹配",
        坑: "★ 用户少",
        实样: "`她`：Hi",
        画像: "★ 印度。",
        识别: "★ 印度三个本土站的定位很接近。"
      },
      141: {
        她: '★★★ 香港的"一楼一凤"地址码 —— ★★★ 141 = 一个单元一个女的',
        找: "★ 按楼按层看",
        坑: "★★ 有真有假，★ 楼评是关键",
        实样: "（门口）按钟计\n（★ 敲门、看、谈价、进 —— 全程不超过两分钟）",
        画像: "★ 香港本地 + 内地来的。",
        识别: '★★★ "一楼一凤"是一个【制度】：★ 一个单位一个女的，法律上不算"妓院"。'
      },
      "161 架步": {
        她: "★ 和 141 同类，另一个地址体系",
        找: "★ 按地址找",
        坑: "★ 同上",
        实样: "（门口）",
        画像: "★ 香港。",
        识别: "★ 141 / 161 是香港两套不同的地址码。"
      },
      澳门: {
        她: "★★★ 澳门是合法的 —— ★★★ 这是它和香港最大的区别",
        找: "★ 走进去",
        坑: "★★ 游客价高",
        实样: '`她`：老板，桑拿吗\n（★ 澳门的桑拿有完整的"一条龙"）',
        画像: "★ 澳门。",
        识别: "★★★ 澳门合法 = 它的形态和香港完全不同。"
      },
      "오피（OP）": {
        她: "★★★ 韩国半套店。★★ 有오피 / 키스방 / 텐프로 的分级",
        找: "★ 电话 / 网站",
        坑: "★★★ 被查过很多轮",
        实样: "`她`：오피 가시면",
        画像: "★ 20-30。",
        识别: "★★★ 텐프로 = 最贵；키스방 = 只接吻。★ 三个词不能混。"
      },
      "按摩（韩国）": {
        她: '★ 韩国的"按摩 + 半套"',
        找: "★ 到店",
        坑: "★ 和오피重叠",
        实样: "`她`：마사지 받으세요",
        画像: "★ 20-30。",
        识别: "★ 和오피是同一套体系的不同叫法。"
      },
      "Cowboy（Soi Cowboy）": {
        她: '★★★ 曼谷三大区之一。★★ 最商业化、最"标准"',
        找: "★ 走进去",
        坑: "★ bar fine + lady drink 是它的全部",
        实样: "`她`：Come in! Sit down!",
        画像: "★ 全年龄。",
        识别: "★★★ 一条街全是 gogo bar。"
      },
      "按摩（泰国）": {
        她: '★★ 从"正经"到"不正经"是一整条光谱',
        找: "★ 看门口",
        坑: "★★★ 价格差极大（300-3000 铢）",
        实样: "`她`：Oil massage? 2 hours?",
        画像: "★ 全年龄。",
        识别: '★★ "Oil massage" 是分水岭。'
      },
      "按摩（massage）（越南）": {
        她: '★★ 越南的"按摩 + 洗头"',
        找: "★ 到店",
        坑: "★★ 北越和南越风格不同",
        实样: "`她`：Mát-xa không anh",
        画像: "★ 18-30。",
        识别: "★ 洗头店（cắt tóc gội đầu）也是同一体系。"
      },
      "Karaoke（karaoke ôm）（越南）": {
        她: "★★★ 「karaoke ôm」= 抱唱 —— ★★★ 越南特有",
        找: "★ 进包厢",
        坑: "★ 和 cà phê ôm 是姊妹产业",
        实样: "`她`：Hát không anh\n（★ 陪唱 + 可以抱）",
        画像: "★ 18-30。",
        识别: "★★★ 「ôm」= 抱 —— ★ 这是越南的命名法。"
      },
      "KTV（按摩）（菲律宾）": {
        她: "★★ 菲律宾的 KTV + 按摩",
        找: "★ 进包厢",
        坑: "★ 和 bar 体系重叠",
        实样: "`她`：Sir, KTV?",
        画像: "★ 18-30。",
        识别: "★ 菲律宾的 KTV 和 bar 常常是同一批人。"
      },
      "PISO 文化（20 比索）": {
        她: '★★★ 菲律宾特有：★ 贫民区里"20 比索"一次的棚屋',
        找: "★ 走进去",
        坑: "★★★ 卫生条件极差 + 疾病风险最高",
        实样: "（棚屋）",
        画像: "★ 极贫困。",
        识别: "★★★ 「piso」= 比索 —— ★ 用价格命名的产业，这是它最赤裸的地方。"
      },
      "本地玩法（印尼）": {
        她: "★★ 印尼本地形态（★ 各岛不同）",
        找: "★ 本地人带",
        坑: "★★★ 亚齐省有鞭刑",
        实样: "`她`：",
        画像: "★ 本地。",
        识别: "★★ 印尼的宗教差异极大 —— ★ 巴厘岛和亚齐是两个世界。"
      },
      "按摩（本地）（印尼）": {
        她: "★ 印尼的按摩店体系",
        找: "★ 到店",
        坑: '★ 分"正统"和"不正统"',
        实样: "`她`：Massage?",
        画像: "★ 本地。",
        识别: '★ 印尼的"正统按摩"是真的按摩。'
      },
      "Geylang（芽笼）": {
        她: "★★★ 新加坡唯一合法的红灯区",
        找: "★ 走进去（★ 有号的房子）",
        坑: "★★ 有的有执照（合法）、有的没有",
        实样: "（门口）有号牌\n（★ 号牌 = 执照）",
        画像: "★ 新加坡。",
        识别: '★★★ 它是"一栋一栋"的 —— ★ 有号牌的才是合法的。'
      },
      "夜店（本地）（新加坡）": {
        她: "★ 新加坡的夜店（★ 主要在克拉码头）",
        找: "★ 进场",
        坑: "★ 酒贵",
        实样: "（场内）",
        画像: "★ 20-35。",
        识别: "★ 新加坡的夜生活集中在几个点。"
      },
      "JB（新山）": {
        她: "★★★ 新加坡人周末去马来西亚新山 —— ★★★ 因为那边便宜且合法度不同",
        找: "★ 过关",
        坑: "★ 要过关（★ 所以有记录）",
        实样: "`她`：JB?",
        画像: "★ 新加坡男性。",
        识别: "★★★ 「去 JB」是新加坡男性的一个固定说法。"
      },
      "沙特（中东）": {
        她: "★★★ 完全地下。★★★ 后果不是离婚，是家族暴力",
        找: "★ 几乎只有 Snapchat / 熟人",
        坑: "★★★ 被发现的后果最重",
        实样: "（极少留下文字）",
        画像: "★ 本地女性。",
        识别: "★★★ 在这里，安全 = 不留任何证据。"
      },
      "卡塔尔（中东）": {
        她: "★ 类似沙特，但更小",
        找: "★ 熟人网络",
        坑: "★★★ 移民劳工系统（kafala）",
        实样: "（几乎无公开入口）",
        画像: "★ 本地 + 外劳。",
        识别: "★ 卡塔尔的本地人口极少。"
      },
      "sigheh（临时婚姻）": {
        她: "★★★ 什叶派独有的【临时婚姻】—— ★★★ 伊朗 / 伊拉克",
        找: "★ 通过宗教程序",
        坑: '★★★ 有"期限"和"聘礼"（★ 都是谈好的）',
        实样: "（宗教仪式）",
        画像: "★ 伊朗 / 什叶派地区。",
        识别: '★★★ 这是唯一"宗教上合法"的形式 —— ★ 写伊朗必须知道这个。'
      },
      伊斯坦布尔: {
        她: "★★ 土耳其的形态介于欧洲和中东之间",
        找: "★ 平台 + 场所",
        坑: "★ 世俗区和保守区差别极大",
        实样: "`她`：Merhaba",
        画像: "★ 20-35。",
        识别: "★★ 伊斯坦布尔的欧洲侧和亚洲侧是两种文化。"
      },
      "本地玩法（南亚）": {
        她: "★★ 南亚形态差异极大（★ 印度 / 巴基斯坦 / 孟加拉完全不同）",
        找: "★ 中介网络",
        坑: "★★★ 种姓 + 家族双重约束",
        实样: "（中介介绍）",
        画像: "★ 本地。",
        识别: '★★★ 南亚的入口是"中介"，不是"平台"。'
      },
      "narco 文化（拉美）": {
        她: "★★★ 【毒枭文化】对拉美社会的影响 —— ★★★ 包括对女性的态度",
        找: "★ 帮派 / favela",
        坑: "★★★ 暴力风险最高",
        实样: "（几乎无法用语言描述）",
        画像: "★ 拉美。",
        识别: '★★★ 「narco」是拉美独有的社会结构 —— ★ 不能写成普通的"黑帮"。'
      },
      "M-Pesa 直转（非洲）": {
        她: "★★★ 肯尼亚的移动支付 —— ★★★ 交易直接转账，不留银行记录",
        找: "★ 换号 + 转账",
        坑: "★★ 转账记录在运营商手里",
        实样: "`她`：Send M-Pesa",
        画像: "★ 肯尼亚。",
        识别: '★★★ 它是非洲这一行的"支付基础设施"。'
      },
      "em 文化（越南）": {
        她: '★★★ 「em」= 妹妹 / 宝贝 —— ★★★ 越南的"糖爹"叫法',
        找: "★ Tinder / FB 群",
        坑: '★★ "找 sponsor"是明确写在简介里的',
        实样: "`她`：Anh nuôi em nhé\n（★ 「养我」—— 直接但不羞耻）",
        画像: "★ 18-28。",
        识别: '★★★ 越南的"糖爹"是公开的产业。'
      },
      "содержанка（被包养）": {
        她: '★★★ 俄语区专有名词 —— ★★★ 指"长期被包养的女性"',
        找: "★ TG / 特定站",
        坑: '★★ 有"agency"（中介）− ★★ 中介抽成',
        实样: '`她`：Сколько в месяц?\n（★ "一个月多少" —— 直接开场）',
        画像: "★ 18-30。",
        识别: "★★★ 这个词本身就是俄语区独有的社会角色。"
      },
      "邮件新娘（mail-order bride）": {
        她: '★★★ 俄语区 / 东南亚的"跨国婚姻"产业',
        找: "★ 专门的中介网站",
        坑: "★★★ 大量诈骗 + 人口贩卖",
        实样: "`她`：I want to meet you",
        画像: "★ 俄语区 / 东南亚。",
        识别: "★★★ 它的名字就是它的性质 —— ★ 不是约会。"
      },
      "blesser（施恩者）": {
        她: "★★★ 南非专有名词 —— ★★ 指出钱的男人",
        找: "★ 社交网 / 熟人",
        坑: "★★★ HIV 高发",
        实样: "`她`：Are you a blesser?",
        画像: "★ 南非。",
        识别: "★★★ 「blesser」是南非社会制度的一部分。"
      },
      "runs girl（跑的女孩）": {
        她: "★★★ 尼日利亚 / 西非专有名词",
        找: "★ 社交网 / 群",
        坑: "★★★ 诈骗 + 暴力",
        实样: "`她`：Sponsor?",
        画像: "★ 西非。",
        识别: "★★★ 这个词是公开的，不是骂人话。"
      },
      "sponsor（赞助人）": {
        她: "★★★ 非洲通用的叫法",
        找: "★ 社交网",
        坑: "★★ 一整个家族可能靠她",
        实样: "`她`：I need a sponsor",
        画像: "★ 非洲。",
        识别: '★★ "找 sponsor"在非洲是公开的求助方式。'
      },
      "在线代聊（chatter）（菲律宾）": {
        她: "★★★ 她不是本人 —— ★★★ 她是【代聊员】",
        找: "★ 她是被雇的",
        坑: "★★★ 你聊的所有内容，都是她在按脚本复制",
        实样: "`她`（代聊）：Hi baby, I miss you\n（★ 这句是复制粘贴的，连标点都一样）",
        画像: '★ 菲律宾的"聊天农场"工人。',
        识别: "★★★ 菲律宾是全球代聊产业的最大基地。"
      },
      "在线代聊（chatter）（俄语区）": {
        她: "★ 同上，俄语区的代聊",
        找: "★ 被雇的",
        坑: "★★★ 同上",
        实样: "`她`（代聊）：Milyy, ty gde?",
        画像: "★ 俄语区。",
        识别: "★ 俄语区的代聊主要服务 OF / 直播。"
      },
      MiChat: {
        她: "★★ 印尼 / 马来流行的社交 app",
        找: "★ 附近的人",
        坑: "★★ 假号多",
        实样: "`她`：Halo",
        画像: "★ 东南亚。",
        识别: "★ 它在印尼的地位相当于探探。"
      },
      BeeTalk: {
        她: "★ 东南亚的老式社交 app",
        找: "★ 附近 + 群",
        坑: "★ 用户老化",
        实样: "`她`：Hi",
        画像: "★ 东南亚。",
        识别: "★ 它是这一块的老玩家。"
      },
      "Reddit r4r": {
        她: '★★★ r/[城市]r4r —— ★★★ 这是 Reddit 的"同城约"版块',
        找: "★ 找对应城市的 r4r",
        坑: "★★ 男女比极不平衡（★ 男性发帖被淹没）",
        实样: "（帖）`M4F`：",
        画像: "★ 欧美各大城市。",
        识别: "★★★ 「r4r」= redditor for redditor。"
      },
      ShareChat: {
        她: "★ 印度本土短视频社交（★ TikTok 被禁后起来）",
        找: "★ 私信",
        坑: "★ 语言复杂（★ 十几种）",
        实样: "`她`：Hi",
        画像: "★ 印度。",
        识别: "★ 它的用户偏中小城市。"
      },
      Moj: {
        她: "★ 同上，另一个印度本土短视频",
        找: "★ 私信",
        坑: "★ 同上",
        实样: "`她`：Hi",
        画像: "★ 印度。",
        识别: "★ TikTok 被禁后的替代品之一。"
      },
      "funk 舞会（拉美）": {
        她: "★★★ 巴西的 funk 派对 —— ★★★ 是个真实的、极其放开的场景",
        找: "★ 去 favela 的 baile funk",
        坑: "★★★ 暴力 + 毒品风险真实存在",
        实样: "（场内）",
        画像: "★ 巴西 favela 青年。",
        识别: "★★★ 「baile funk」不是夜店 —— ★ 是社区街头派对。"
      },
      "AdultWork（英国）": {
        她: '★★★ 英国最大的平台。★★ 有完整的"评价 + 排班"体系',
        找: "★ 注册 → 看排班 → 预约",
        坑: '★★ 有的要"押金"（★ 骗的）',
        实样: "`她`：Availability updated",
        画像: "★ 英国全境。",
        识别: '★★★ 它的"feedback"（评价）体系最可信。'
      },
      "Kaufmich（德语区）": {
        她: "★★ 德国 / 奥地利 / 瑞士最大",
        找: "★ 按城市",
        坑: '★★ 有的用"代理"',
        实样: "`她`：Hallo, Lust?",
        画像: "★ 德语区。",
        识别: "★★ 德语区基本都在它上面。"
      },
      "Kinky.nl": {
        她: "★★ 荷兰最大",
        找: "★ 按城市",
        坑: "★★ 橱窗区和它的线上不一样",
        实样: "`她`：Hoi!",
        画像: "★ 荷兰。",
        识别: '★★ 荷兰"线上 + 橱窗"是两套并行系统。'
      },
      "Sexjobs（荷兰）": {
        她: "★ 荷兰另一个大站",
        找: "★ 按城市",
        坑: "★ 和 Kinky 重叠",
        实样: "`她`：Hoi",
        画像: "★ 荷兰。",
        识别: "★ 荷兰两个站竞争。"
      },
      Wannonce: {
        她: "★ 法国最大",
        找: "★ 按城市",
        坑: "★ 假号不少",
        实样: "`她`：Bonjour",
        画像: "★ 法国。",
        识别: "★ 法国这一块的主要玩家。"
      },
      "Sexemodel（法国）": {
        她: '★ 法国另一个站（★ 偏"模特"包装）',
        找: "★ 按城市",
        坑: "★ 同上",
        实样: "`她`：Coucou",
        画像: "★ 法国。",
        识别: "★ 它的包装比 Wannonce 精致。"
      },
      "programa（节目）（拉美）": {
        她: "★★★ 巴西 / 拉美的专有名词 —— ★★★ programa = 一次性交易",
        找: "★ 站 / WhatsApp",
        坑: "★★★ 暴力 + 抢劫风险真实",
        实样: "`她`：Quanto?\n（★ 直接问价 —— 不羞耻）",
        画像: "★ 拉美。",
        识别: "★★★ 这个词说出来完全不脸红。"
      },
      "prepago（预付）（拉美）": {
        她: "★★★ 哥伦比亚的专有名词",
        找: "★ Mileroticos 等站",
        坑: "★★★ 东莨菪碱（★ 下药抢劫）是真实风险",
        实样: "`她`：Prepago?",
        画像: "★ 哥伦比亚。",
        识别: "★★★ 「prepago」是哥伦比亚的行业名。"
      },
      "Mileroticos（拉美）": {
        她: "★★ 拉美最大的目录站",
        找: "★ 按城市 + 分类",
        坑: "★★★ 假号比例高",
        实样: "`她`：Hola",
        画像: "★ 拉美。",
        识别: "★★ 它是这一块在拉美的最大平台。"
      },
      "Photoacompanhantes（拉美）": {
        她: "★★ 巴西最大的目录站",
        找: "★ 按城市",
        坑: '★★★ "acompanhantes"= 陪伴，★ 但实际是外围',
        实样: "`她`：Oi, tudo bem?",
        画像: "★ 巴西。",
        识别: '★★★ 它的名字用"陪伴"包装。'
      },
      "Berghain（欧美）": {
        她: '★★★ 柏林最有名的夜店 —— ★★★ 以"性开放部门"闻名',
        找: "★ 排队（★ 门卫决定谁能进）",
        坑: "★★★ 门卫（bouncer）制度极严",
        实样: "（门口）",
        画像: "★ 20-40。",
        识别: "★★★ 进门本身就是筛选 —— ★ 被拒绝是常态。"
      },
      "KitKat（柏林）": {
        她: '★★★ 柏林的老牌性俱乐部 —— ★★★ 有明确的"着装要求"',
        找: "★ 按主题夜进",
        坑: "★★★ 有着装要求（★ 穿错就进不去）",
        实样: "（门口）dress code\n（★ 皮衣 / 暴露 —— 这是入场券）",
        画像: "★ 25-45。",
        识别: "★★★ 「穿着要求」是它最标志性的东西。"
      }
    };
  },
  "./src/神奇手机/神奇手机/核心/平台实样库-续.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      平台实样库续: () => 平台实样库续
    });
    const 平台实样库续 = {
      Match: {
        她: "★★ 最老的付费约会站。用户是真的想找关系的",
        找: "★ 付费 → 看信 → 回信",
        坑: '★★ 付费墙最狠（★ 不付费连"谁看了你"都看不到）',
        实样: "`她`：Your profile caught my eye\n（★ 老站的说话方式 —— 一板一眼）",
        画像: "**35-55。** ★★ 年龄偏大，且真的想认真。",
        识别: '★★ 它的用户"不装"—— 因为付费本身就筛掉了玩的人。'
      },
      Zoosk: {
        她: "★ 算法驱动，用户中等",
        找: "★ 匹配 → 聊天",
        坑: "★ 假号不少",
        实样: "`她`：Hi there",
        画像: "**30-45。**",
        识别: '★ 它是"算法 + 付费"，两个门槛都低。'
      },
      Happn: {
        她: '★★ 靠"擦肩而过"—— ★ 只推你物理上遇见过的人',
        找: '★ 看"今天遇见的人"',
        坑: "★★ 要开定位 —— ★★ 所以暴露真实活动范围",
        实样: '`她`：We crossed paths today\n（★ 这个平台的核心是"你们真的见过"）',
        画像: "**20-35。** ★★ 通勤族 / 常去同一家店的人。",
        识别: '★★ 它的杀手锏是"地理位置"—— ★ 不是算法。'
      },
      "Coffee Meets Bagel": {
        她: "★ 每天只推几个。★★ 慢，但质量高",
        找: "★ 每天中午推送",
        坑: "★ 数量极少（★ 一天 1-5 个）",
        实样: '`她`：Today\'s bagel ☕\n（★ 它的语言体系就是"咖啡 + 贝果"）',
        画像: "**25-38。** ★★ 亚裔用户比例高。",
        识别: '★★ "一天一个"是它的设计 —— ★ 这是它最大的特征。'
      },
      Badoo: {
        她: "★ 欧洲 / 拉美的老牌。★ 用户杂",
        找: "★ 滑卡 + 附近的人",
        坑: "★★ 假号多",
        实样: "`她`：Oi! Tudo bem?\n（★ 葡萄牙语 / 西班牙语版更活跃）",
        画像: "★ 欧洲 / 拉美 / 东南亚。",
        识别: "★ 它在拉美的地位相当于探探在中国。"
      },
      Jaumo: {
        她: "★ 中欧为主",
        找: "★ 滑卡",
        坑: "★ 用户少",
        实样: "`她`：Hallo!",
        画像: "★ 德国 / 奥地利。",
        识别: "★ 它的德语区用户最多。"
      },
      Lovoo: {
        她: "★ 德语区老站",
        找: "★ 匹配 + 直播",
        坑: "★★ 直播部分是收钱的",
        实样: "`她`：Hi, wie gehts?",
        画像: "★ 德语区。",
        识别: '★ 它把"约会 + 直播"合在一起了。'
      },
      Skout: {
        她: '★ 全球，早期做"旅行约会"',
        找: "★ 附近 + 全球",
        坑: "★★ 假号极多",
        实样: "`她`：Where are you from?",
        画像: "★ 拉丁美洲 / 东南亚。",
        识别: '★★ 它的"全球"功能反而带来了最多的骗子。'
      },
      Tagged: {
        她: '★★ 早期做"社交游戏"，现在是约会站',
        找: "★ 匹配 + 游戏",
        坑: "★★ 垃圾号多",
        实样: "`她`：Add me",
        画像: "★ 美国 / 东南亚。",
        识别: "★ 它保留着社交游戏的遗留功能。"
      },
      MeetMe: {
        她: "★ 直播 + 约会混合",
        找: "★ 直播房 + 私信",
        坑: "★★ 直播要打赏",
        实样: "`她`：Come to my stream",
        画像: "★ 美国 / 菲律宾。",
        识别: "★ 它的核心是直播，约会是附属。"
      },
      "Alt.com": {
        她: "★★ BDSM 专项",
        找: "★ 站内信 + 圈子",
        坑: "★★ 要交钱才能读信",
        实样: "`她`：Are you Dom or sub?",
        画像: "★ 30-55。",
        识别: '★ 它的问题是"问得比做得多"。'
      },
      "Passion.com": {
        她: '★ 同类，包装成"约会"',
        找: "★ 站内信",
        坑: "★★ 付费墙",
        实样: "`她`：Hey hun",
        画像: "★ 30-50。",
        识别: "★ 和 AdultFriendFinder 同一家公司。"
      },
      "Flirt.com": {
        她: "★ 同类",
        找: "★ 站内信",
        坑: "★★ 机器人多",
        实样: "`她`：Hi 😉",
        画像: "★ 25-45。",
        识别: "★ 名字就是它的定位。"
      },
      "FriendFinder-X": {
        她: "★★ 老牌",
        找: "★ 站点信",
        坑: "★★ 假号比例最高",
        实样: "`她`：Want to play?",
        画像: "★ 30-50。",
        识别: "★ 它算是这一类的鼻祖。"
      },
      Jerkmate: {
        她: '★★ 直播类，主打"匹配 + 直播"',
        找: "★ 匹配 → 直播房",
        坑: "★★★ 全站基本是引导付费直播",
        实样: "（匹配）`她`：Ready?",
        画像: "★ 男用户为主。",
        识别: '★★ 它的"匹配"只是入口 —— 真正产品是直播。'
      },
      Cam4: {
        她: "★ 老牌直播站",
        找: "★ 进房间",
        坑: "★ 免费内容多但私聊贵",
        实样: "（弹幕）",
        画像: "★ 全球。",
        识别: "★ 它的免费房比 CB 更松。"
      },
      "Cherry.tv": {
        她: '★ 新站，偏"社区"',
        找: "★ 进房间",
        坑: "★ 用户少",
        实样: "（弹幕）",
        画像: "★ 全球。",
        识别: '★ 它主打"主播是长期经营的"。'
      },
      ManyVids: {
        她: '★★★ 按"片"买，不是订阅。★★ 有完整的定价体系',
        找: "★ 买片 / 定制",
        坑: '★★★ 定制要先付钱 —— ★★ 而且常被"发了就跑"',
        实样: "`她`：Custom video: $X\n（★ 明码标价，这是它的特点）",
        画像: "**18-35。** ★★ 有制作能力的创作者。",
        识别: '★★★ 它是"片商模式"—— ★ 和 OF 的订阅模式是两回事。'
      },
      "JustFor.Fans": {
        她: "★ 男同向订阅站",
        找: "★ 订阅",
        坑: "★ 用户比 OF 少",
        实样: "`她`：Subscribe!",
        画像: "★ 男同。",
        识别: "★ 它是这一块最大的。"
      },
      Loyalfans: {
        她: '★★ 主打"可自由定价 + 低抽成"',
        找: "★ 订阅",
        坑: "★★ 抽成比 OF 低 → ★ 所以很多 OF 主播同时做这个",
        实样: "`她`：Find me here too",
        画像: "★ 18-35。",
        识别: '★★ "低抽成"是它的卖点。'
      },
      FanCentro: {
        她: "★ 代理型 —— ★★ 平台帮你管多个创作者",
        找: "★ 订阅",
        坑: "★ 用户少",
        实样: "`她`：DM me",
        画像: "★ 18-35。",
        识别: '★ 它是"创作者 + 代理"模式。'
      },
      iWantClips: {
        她: "★★ 视频剪辑站",
        找: "★ 买片",
        坑: "★ 定制的坑最多",
        实样: "（片名）",
        画像: "★ 18-35。",
        识别: '★ 它是"片商"而不是订阅。'
      },
      Clips4Sale: {
        她: "★ 最老的剪辑站（★ 有各种极端癖好分类）",
        找: "★ 买片",
        坑: "★★ 分类极细 → ★★ 什么癖好都有",
        实样: "（分类）",
        画像: "★ 全球。",
        识别: "★★★ 它的分类粒度是全行业最细的。"
      },
      PocketStars: {
        她: "★ OF 竞品",
        找: "★ 订阅",
        坑: "★ 用户少",
        实样: "`她`：Sub!",
        画像: "★ 18-35。",
        识别: "★ 同质化严重。"
      },
      Passes: {
        她: "★ 订阅 + 直播",
        找: "★ 订阅",
        坑: "★ 用户少",
        实样: "`她`：Live now",
        画像: "★ 18-35。",
        识别: "★ 它把订阅和直播合起来了。"
      },
      SextPanther: {
        她: "★★★ 文字 / 电话 / 视频聊天 —— ★★★ 按分钟收费",
        找: "★ 找主播 → 充值 → 聊",
        坑: '★★★ 按分钟，很贵。★★ 而且"聊天"本身是产品',
        实样: "`她`：Hi baby, I'm available\n（★ 打招呼 = 开始计时）",
        画像: "**20-40。** ★★ 全球。",
        识别: '★★★ 它是"付费陪聊"—— ★ 不是直播也不是订阅。'
      },
      NiteFlirt: {
        她: "★★ 电话为主，老牌",
        找: "★ 打电话",
        坑: "★★ 按分钟",
        实样: "（电话）",
        画像: "★ 美国。",
        识别: '★ 它比 SextPanther 更"电话化"。'
      },
      Phrendly: {
        她: "★★ 纯文字聊天，按消息收费",
        找: "★ 聊",
        坑: "★★ 每句话都在花钱",
        实样: "`她`：Hey you 😊",
        画像: "★ 美国。",
        识别: '★★★ "每句话都要钱"是它最狠的设计。'
      },
      XVideos: {
        她: "★ 全球最大之一",
        找: "★ 按标签",
        坑: "★★ 盗版多",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 和 Pornhub 同档。"
      },
      XNXX: {
        她: "★ 同类",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 它是 XVideos 的姊妹站。"
      },
      xHamster: {
        她: '★★ 有"素人"和"自制"专区',
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）`Amateur`",
        画像: "★ 全球。",
        识别: "★ 它的分类比 PH 更细。"
      },
      RedTube: {
        她: "★ 老站",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 它的用户偏老。"
      },
      YouPorn: {
        她: "★ 老站",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 同属一家集团。"
      },
      SpankBang: {
        她: "★ 同类",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: '★ 它的"素人"标签用得多。'
      },
      Beeg: {
        她: "★ 同类",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 同质。"
      },
      Eporner: {
        她: "★ 同类",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 同质。"
      },
      TXXX: {
        她: "★ 同类，聚合型",
        找: "★ 按标签",
        坑: "★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 它是聚合站。"
      },
      Motherless: {
        她: "★★ 审核最松的站之一",
        找: "★ 按标签",
        坑: "★★★ 内容极端",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: '★★ 它的定位就是"别的站不让发的"。'
      },
      ThisVid: {
        她: '★★ 主打"自制 / 个人上传"',
        找: "★ 按分类",
        坑: "★ 画质差但真实",
        实样: "（片名）`homemade`",
        画像: "★ 全球。",
        识别: '★★ "homemade"（自制）是它的核心分类。'
      },
      Reddit: {
        她: '★★★ 有大量"同城约"的子版块。★★ "r4r" 是关键词',
        找: "★ 找 r/[城市]r4r",
        坑: "★★ 男女比例极不平衡（★ 男性发帖会被淹没）",
        实样: "（帖）`M4F`：",
        画像: "★ 全球。★★ 每个城市都有对应的 r4r 版。",
        识别: "★★★ 「r4r」= redditor for redditor —— ★ 这是它的密码。"
      },
      "4chan": {
        她: "★★ 完全匿名。★★ 有 /b/ 之类的板",
        找: "★ 板",
        坑: "★★★ 极端内容 + 恶作剧文化",
        实样: "（帖）`Anonymous`：",
        画像: "★ 全球。",
        识别: '★★ 它的文化是"什么都敢说"。'
      },
      Pornolab: {
        她: "★ 俄语区最大的资源论坛",
        找: "★ 注册 + 积分",
        坑: "★ 俄语门槛",
        实样: "（帖）",
        画像: "★ 俄语区。",
        识别: '★ 它的价值在"资源索引"。'
      },
      PlanetSuzy: {
        她: "★ 英文区老论坛",
        找: "★ 注册",
        坑: "★ 老站，界面旧",
        实样: "（帖）",
        画像: "★ 英语区。",
        识别: "★ 和 ViperGirls 同源。"
      },
      ViperGirls: {
        她: "★ 同类",
        找: "★ 注册 + 积分",
        坑: "★ 门槛在积分",
        实样: "（帖）",
        画像: "★ 英语区。",
        识别: "★ 老论坛的特点：等级 = 权限。"
      },
      Seeking: {
        她: "★★★ 原名 SeekingArrangement。★★ 全球最大",
        找: "★ 匹配 → 谈 allowance",
        坑: "★★★ 见面就要钱的极多",
        实样: "`她`：What are you looking for?\n`她`：I need help with tuition",
        画像: "**18-30 学生为主。** ★★ 全球。",
        识别: "★★★ 它的品牌名就是定义。"
      },
      SugarDaddyMeet: {
        她: "★ 同类，男性用户更多",
        找: "★ 匹配",
        坑: "★★ 女性用户少 → ★ 男性更难约到",
        实样: "`她`：Hi daddy",
        画像: "★ 全球。",
        识别: "★ 它的性别比决定了体验。"
      },
      WhatsYourPrice: {
        她: "★★★ 【竞价】—— ★★ 你出价，她选",
        找: "★ 出价 → 被接受 → 约会",
        坑: '★★★ 出价被接受 ≠ 会有后续。★★ 而且很多是"只吃饭"',
        实样: '`她`：My date price is $X\n（★ 明码标价的"约会价"）',
        画像: "★ 美国。",
        识别: "★★★ 「date price」是它的核心机制 —— ★ 全行业独有。"
      },
      MissTravel: {
        她: '★★ 主打"陪旅行"',
        找: "★ 匹配 + 行程",
        坑: "★★ 要承担她的旅费",
        实样: "`她`：Where are we going?",
        画像: "★ 全球。",
        识别: '★★ "旅行"是它的产品形态，不是约会。'
      },
      RichMeetBeautiful: {
        她: "★ 欧洲版糖爹站",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Bonjour",
        画像: "★ 欧洲。",
        识别: "★ 它的名字就是主张。"
      },
      Sugarbook: {
        她: "★ 东南亚为主",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Hi!",
        画像: "★ 东南亚。",
        识别: "★ 它是这一块在东南亚的玩家。"
      },
      "Illicit Encounters": {
        她: "★★★ 英国最大的已婚约会站",
        找: "★ 匹配",
        坑: "★★ 女性免费、男性付费",
        实样: "`她`：Also married?",
        画像: "**30-50。** ★★ 英国。",
        识别: "★★ 它是英国的 Ashley Madison。"
      },
      "Victoria Milan": {
        她: "★ 欧洲的已婚约会",
        找: "★ 匹配",
        坑: "★ 用户比 AM 少",
        实样: "`她`：Vous aussi ?",
        画像: "★ 欧洲。",
        识别: "★ 北欧 / 南欧用得多。"
      },
      FetLife: {
        她: "★★★ BDSM / 恋物圈的【社交网】—— ★ 不是约会 app",
        找: "★ 加好友 → 参加 munches（线下聚会）",
        坑: "★★★ 它的规矩极多。★★ 不参加线下活动基本约不到",
        实样: "`她`：Are you going to the munch?\n（★ 「munch」= 线下聚会，★ 这是它的入口）",
        画像: "★ 30-50。★★ 讲规矩、讲安全词、讲沟通。",
        识别: "★★★ 「munch」是它的核心 —— ★ 不参加就永远只是网友。"
      },
      Recon: {
        她: "★ 男同 + 恋物",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Into?",
        画像: "★ 男同。",
        识别: "★ 它是男同圈里的 FetLife。"
      },
      Feeld: {
        她: '★★★ 主打"非传统关系"—— ★★★ 情侣 + 单身都行',
        找: "★ 匹配（★ 可以两人共用一个号）",
        坑: "★★ 单身男性最难（★ 平台上最不缺的就是他们）",
        实样: "`她`：We are a couple looking for...\n（★ 情侣档发消息是常态）",
        画像: "**25-40。** ★★ 大城市、高学历、开放关系。",
        识别: '★★★ "情侣共用一个账号"是它最独特的功能。'
      },
      SLS: {
        她: "★★ SwingLifeStyle —— 老牌换偶站",
        找: "★ 认证 + 活动",
        坑: "★★ 单男门槛高",
        实样: "`她`：Certifications?",
        画像: "★ 美国。",
        识别: '★★ "certification"（认证）是它建立信任的机制。'
      },
      FabSwingers: {
        她: "★ 英国换偶站",
        找: "★ 认证 + 活动",
        坑: "★ 用户比美国站少",
        实样: "`她`：Hi, couple here",
        画像: "★ 英国。",
        识别: "★ 英国的换偶圈子主要在它上面。"
      },
      TS4Rent: {
        她: "★ 跨性别外围目录",
        找: "★ 按城市",
        坑: "★★ 照片是套图",
        实样: "`她`：Available",
        画像: "★ 全球。",
        识别: "★ 它是这一细分里最大的目录。"
      },
      "TS Escorts": {
        她: "★ 同类",
        找: "★ 按城市",
        坑: "★ 同上",
        实样: "`她`：Hi",
        画像: "★ 全球。",
        识别: "★ 和 TS4Rent 基本重叠。"
      },
      Scruff: {
        她: '★ 男同，按"体型/毛发"分',
        找: "★ 匹配",
        坑: "★ 用户比 Grindr 少但更明确",
        实样: "`她`：Hey",
        画像: "★ 男同。",
        识别: "★ 它的筛选维度比 Grindr 细。"
      },
      "Jack'd": {
        她: "★ 男同，亚裔用户多",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Hi",
        画像: "★ 男同。",
        识别: "★ 它在亚洲的使用率比欧美高。"
      },
      Hornet: {
        她: "★ 男同，拉美 / 欧洲为主",
        找: "★ 匹配",
        坑: "★ 用户少",
        实样: "`她`：Oi",
        画像: "★ 男同。",
        识别: "★ 它在拉美的地位最高。"
      },
      Her: {
        她: "★★ 女同，社区感强",
        找: "★ 匹配 + 活动",
        坑: "★ 用户少",
        实样: "`她`：Hey!",
        画像: "★ 女同。",
        识别: "★ 它是女同圈最大的一站。"
      },
      Lex: {
        她: '★★ 女同，偏"文字社交"（★ 像个人广告）',
        找: "★ 发帖 + 私信",
        坑: "★ 用户更少",
        实样: "（帖）`她`：",
        画像: "★ 女同。",
        识别: '★★ 它的形态是"个人广告"而不是滑卡。'
      },
      Blued: {
        她: "★★★ 中文区最大的男同 app",
        找: "★ 附近的人 + 直播",
        坑: "★★ 直播要打赏",
        实样: "`她`：在",
        画像: "★ 男同。",
        识别: "★★ 它在中文区的地位相当于 Grindr。"
      }
    };
  },
  "./src/神奇手机/神奇手机/核心/平台实样库.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      平台实样库: () => 平台实样库
    });
    const 平台实样库 = {
      探探: {
        她: "★★ 已婚的和外围混在一起。★ 这是它最大的特点：★★ 你分不清",
        找: "右滑匹配，互相右滑才能说",
        坑: "★ 白天档的多半已婚（8 点后头像变灰）★★ 照片精修 + 秒回 = 卖",
        实样: '`你`：一个人？\n`她`：他在外地\n`她`：半个月回来一次\n（★ 三句之内她就把"他"交代了）',
        画像: "**24-40。** 白天活跃的 = 已婚（老公上班）。凌晨活跃的 = 睡不着 / 做这行。★★ 简介五个字以内的才是真人。",
        识别: "★ 照片糙 = 真货（浴室镜子有水渍、瓷砖缝发黑）。★ 精修 = 卖。"
      },
      陌陌: {
        她: '★★ 比探探年轻，群组文化重。★ 有"附近的活动"',
        找: "★ 群组 —— 那是它和探探最大的区别",
        坑: "★★ 群主抽成 —— 「进群要交钱」在这里是常态",
        实样: '`她`：今晚有局吗\n`她`：我们群里几个人在××\n（★ 见面前先有一层"集体"）',
        画像: "**18-32。** 学生 + 刚工作。★★ 群组里的活跃分子往往最放得开。",
        识别: '★ 群里的"局"是入口 —— 但组织者一定抽成。'
      },
      Soul: {
        她: "★ 匿名 + 语音。★★ 不看脸先听声音",
        找: "语音匹配 / 星球",
        坑: "★★ 声音好听的脸不一定好 —— ★ 这是它最大的落差",
        实样: "`她`：（语音）……你先说\n（★ 语音是它的核心 —— 打字多的人在这里反而吃亏）",
        画像: "**18-28。** 性格内向 / 不爱露脸的。★★ 但声音是她的第一张脸。",
        识别: "★ 敢开语音的才是真在这玩的。"
      },
      积目: {
        她: '★ 更年轻、更"门当户对"',
        找: "滑卡 + 认证",
        坑: "★ 用户少、回复慢 —— ★★ 但慢反而是好事（骗钱的比探探少）",
        实样: "`她`：你也听这个\n`她`：我以为只有我听\n（★ 先找一个共同点，再往下）",
        画像: "**20-30。** 文艺 / 学生 / 有一份体面工作。",
        识别: '★ 有"认证"标签的才可能是真的。'
      },
      她说: {
        她: "★ 女性主导的社交 app —— ★★ 她要先开口",
        找: "★ 女方发起",
        坑: '★ 男性只有被选。★★ 而且女性用户会"审核"你的资料',
        实样: '`她`：你的资料写得挺好的\n（★ 这句就是"我看上你了"）',
        画像: "**22-32 女性。** ★★ 相对高知、高收入 —— 她们不缺也不想凑合。",
        识别: "★ 它和 Tinder 最大区别：这里她有权，你等她。"
      },
      微信: {
        她: "★★★ 国内真正的主战场 —— ★ 一切最终都落到这里",
        找: "★ 只能被人拉进去 / 转账 / 名片",
        坑: "★★ 群主知道你是谁。★★ 加进来就断不了了",
        实样: '`她`：加个微信聊\n（★ 但从"加微信"到"见到人"，中间还隔着几道）',
        画像: "★ 全年龄。★★ 但真正有用的不是好友，是【群】。",
        识别: "★★★ 第一句话就要你换平台的，一律是卖货。"
      },
      "QQ 群": {
        她: "★★ 比微信群更放得开 —— 因为 QQ 可以匿名",
        找: "搜关键词 / 被人拉",
        坑: "★★ 未成年人多 —— ★★★ 这一条要极度小心",
        实样: "`她`：新人报三围\n（★ 进群第一句就让你自证）",
        画像: "**18-30。** ★★ 学生多、小城市多。",
        识别: "★ 群公告比群消息更能说明这个群是什么。"
      },
      贴吧: {
        她: "★ 老式论坛。★★ 有些吧早就变味了",
        找: '★★ 直接发帖问 —— ★ 这是"找人"最快的路',
        坑: "★ 积分和等级是门槛。★★ 新人发帖容易被当骗子",
        实样: "`她`（帖）：××有靠谱的吗\n（★ 这种帖子下面会有私信 —— 人找人最直接的方式）",
        画像: "**18-35 男性为主**，★ 但有专门的女性板块。",
        识别: '★★ 贴吧里"约"的密度比任何 app 都高 —— 因为按城市分。'
      },
      小红书: {
        她: '★ 擦边引流。★★ 私信关键词被风控，要靠"评论区暗语"',
        找: "★ 同城 + 关键词。★★ 真正的入口是评论区，不是私信",
        坑: "★ 引流到微信就断。★★ 平台风控极严",
        实样: "`她`（笔记）：今天在×× 有人一起吗\n`她`（私信）：你也是做这行的？\n（★ 先确认身份）",
        画像: '**20-35 女性。** ★ 名媛 / 穿搭 / 探店。★★ 私信门槛最高 —— 要先"看起来像同一类人"。',
        识别: "★★ 加微信后看朋友圈 —— 全是酒店早餐的，多半是外围。"
      },
      抖音: {
        她: "★ 同城页是入口。★★ 但主战场是评论区",
        找: "★ 在她视频下面回复 / 同城榜",
        坑: '★ 私信基本不回。★★ 要看她"回谁"',
        实样: "（她发视频，文案：`今天心情不好`）\n`她`（回复评论）：私我\n（★ 评论区才是主战场）",
        画像: "**全年龄。** ★★ 同城榜前几百名的，私信里全是生意。",
        识别: '★★ 看她回谁 —— 公开回复"私我"的，就是在挑人。'
      },
      快手同城: {
        她: "★★ 蓝领 / 县城 / 25-45。★★ 说话最直，不绕",
        找: "★ 同城 + 私信 / 评论",
        坑: "★ 它和抖音最大的区别：★★ 这里的人不装",
        实样: "`她`：处对象不\n`她`：你多大 干啥的\n（★ 三句之内把条件问完）",
        画像: "**25-45。** 工厂 / 服务业 / 小生意。★★ 大量离异、分居。",
        识别: "★ 直接问条件的，反而比抖音那些拐弯的实在。"
      },
      微博: {
        她: "★ 超话 + 私信。★★ 大 V 的评论区是入口",
        找: "★ 同城超话 / 评论区",
        坑: '★★ 人多但杂。★★ 容易被挂（微博的"挂人"文化最重）',
        实样: '`她`（评论）：私你了\n（★ 微博的"私"字出现频率极高）',
        画像: "**全年龄。** ★★ 敢在微博公开说这些的，本身就不保守。",
        识别: "★★ 同城超话里的人最容易约 —— 因为先有话题。"
      },
      豆瓣小组: {
        她: "**25-40 文艺向。** ★ 小组是入口（「同城约饭」「一个人住」这类）",
        找: "★ 小组帖 —— ★ 饭局是它的合法外衣",
        坑: '★ 这里的女人最怕"被认出来" —— ★★ 所以照片不会露脸',
        实样: "`她`（小组帖）：坐标×× 周五有人吃饭吗",
        画像: "**25-40。** 文艺 / 独居 / 高知。★★ 说话含蓄，但转化率意外地高。",
        识别: "★ 头像不用自己脸、但很讲究的，多半是老手。"
      },
      知乎: {
        她: "★ 不是约会平台，但★★ 私信功能是",
        找: '★ 从"共鸣"到私信 —— ★ 情感问题下面的回答者',
        坑: "★ 慢。★★ 但私信回复率意外地高",
        实样: "`她`（回答情感问题）：我也有过\n`她`（私信）：你的话我看了很多遍",
        画像: "**25-40。** ★★ 情感类问题下面的女性回答者。",
        识别: "★ 写长回答的人，是愿意花时间的人。"
      },
      虎扑: {
        她: '★ 男性为主，★ 但"步行街"里的女性用户不少',
        找: "★ 评论区 / 私信",
        坑: "★ 敢在这个男性社区说话的女性，本身就不害羞",
        实样: "`她`：楼主说得对",
        画像: "**20-35。** ★★ 运动 / 游戏 / 玩梗。",
        识别: "★ 女号在虎扑发帖，本身就是信号。"
      },
      闲鱼: {
        她: '★★ 卖"原味"的最大的公开市场之一',
        找: "★★★ 关键词是黑话：`不违规` `懂的自然懂` `仅限成年人`",
        坑: '★★ 要"对暗号"。★★ 说了关键词就被风控',
        实样: "`她`（商品描述）：穿过一次 不介意再聊\n`她`（私信）：你说的是哪种",
        画像: "**全年龄。** ★★ 学生 + 上班族兼职。",
        识别: "★★★ 照片不露脸、但拍得很刻意的（丝袜 / 内衣 / 鞋），基本就是。"
      },
      番茄: {
        她: "★ 老式约炮 app，用户年龄偏大",
        找: "★ 直接私信",
        坑: "★★ 机器人极多 —— ★★ 前十个搭话的可能全是",
        实样: "`她`：在吗\n`她`：加我 V\n（★ 第一句就要换平台 = 机器人 / 卖货）",
        画像: '**30-50。** ★★ 这个年龄段的图的是"省事"。',
        识别: "★★ 秒回 + 立刻要微信 = 机器。"
      },
      他趣: {
        她: '★ 主打"情趣用品 + 社交"，定位偏直白',
        找: "★ 附近的人 / 圈子",
        坑: "★★ 付费墙多（看资料要充值）",
        实样: "`她`：你想聊什么",
        画像: "**25-45。** ★★ 已婚但不满意的比例很高。",
        识别: '★ 它是"用品商城 + 社交"，所以用户目的明确。'
      },
      快猫: {
        她: "★ 短视频 + 直播，擦边为主",
        找: "★ 直播间 / 私信",
        坑: "★★ 引流的都指向付费群",
        实样: "`她`：群里聊",
        画像: "**20-35。** ★★ 主播 + 观众。",
        识别: '★★ "加群"就是它的商业模式。'
      },
      草榴: {
        她: "★★★ 十年的老站。★★ 什么人都有，真的假的掺着",
        找: "★ 要邀请码。★★ 达人区 / 技术讨论区",
        坑: '★★ 里面有专门钓人的。★★ 新人容易被当"鱼"',
        实样: '（帖）`楼主`：分享一个\n（★ 这个站的核心是"分享"，不是"找人"）',
        画像: "**25-45 男性为主。** ★★ 但女性发帖会立刻被围观。",
        识别: '★★ 它最好用的地方：★ 能看到"真实的她们什么样"。'
      },
      1024: {
        她: '★ 和草榴同源，但更偏"技术 + 资源"',
        找: "★ 邀请码 + 积分",
        坑: "★★★ 门槛比草榴高，但也更真实",
        实样: "（帖）`楼主`：验证过了",
        画像: "**25-45。** ★★ 有技术背景的多。",
        识别: "★ 老用户的比例比草榴高。"
      },
      91: {
        她: "★★ 主要是夫妻自拍 + 工作室",
        找: "★ 作者认证 —— ★ 单男很难进去",
        坑: "★ 单男发帖要认证。★★ 认证过了也未必有人理",
        实样: '（帖）`楼主`：老婆同意了\n（★ 这个站的关键词是"同意"）',
        画像: '★ 夫妻 + 单男围观者。★★ 主体是"看"，不是"约"。',
        识别: '★★ 有"图 + 视频"的才是真作者。'
      },
      麻豆: {
        她: "★★ 台湾 / 内地的工作室厂牌",
        找: "★ 作品为主",
        坑: '★★ 是"作品"不是"人" —— ★★ 别把它当约会平台',
        实样: "（片名）`素人`",
        画像: "★ 职业演员。",
        识别: "★ 它和 91 的区别：91 是真实投稿，麻豆是制作。"
      },
      色中色: {
        她: "★ 老牌论坛（色中色 / SIS）",
        找: "★ 积分 + 等级",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子",
        实样: "（帖）`楼主`：求带",
        画像: "**25-45。** ★★ 老用户粘性极高。",
        识别: "★ 注册时间 + 发帖历史，比任何资料都真实。"
      },
      桃花族: {
        她: '★ 同类老站，偏"外围 / 服务"信息',
        找: "★ 验证区",
        坑: "★★ 有真有假 —— ★★ 楼评（评价区）是关键",
        实样: "（帖）`楼主`：验证报告",
        画像: "★ 有消费能力的男性为主。",
        识别: '★ 看"验证帖"多不多 —— 有真实验证的站才活。'
      },
      "推特（X）": {
        她: '★★ 国内"福利"的主战场 —— ★ 因为不封号（相对）',
        找: "★ 关键词 + 同城 + 私信",
        坑: "★★ 要 VPN。★★ 骗子也集中在这里",
        实样: '`她`：私我 TG\n（★ "去 TG" 就是它最大的筛子）',
        画像: "**20-35。** ★★ 敢在这里露脸的，本身就不怕。",
        识别: "★★ 号老 + 图多 + 有互动 = 相对可信。"
      },
      洗浴: {
        她: '★★ 中国最传统的形态。★★ 有完整的"看、选、进房"流程',
        找: "★ 熟人带。★★ 没有熟人，你就是被宰的那个",
        坑: '★★★ 没有熟人带 = 被宰。★★ 而且价目表是"看人下菜"',
        实样: "`她`（技师）：先生 换个项目吗\n（★ 加钟/换项目 = 它的核心动作）",
        画像: '★ 全年龄。★★ 分"正规"和"不正规"，而且同一家店可能两层都有。',
        识别: "★★ 看门口的营业时间 —— 24 小时的才有那层。"
      },
      KTV: {
        她: "★★ 陪唱 → 加钟 → 带走，三步",
        找: '★ 订包厢（★ 要通过"经理"）',
        坑: "★ 包厢费 + 陪唱费 + 出台费，三笔",
        实样: "`她`：哥 唱一首吗\n（★ 先点歌，再点人）",
        画像: "★ 18-30。★★ 学生兼职的比例高。",
        识别: '★★ 有没有"选秀"环节，决定它是哪种 KTV。'
      },
      会所: {
        她: "★★★ 最高档的一种。★★ 线上版本是【公众号 + 客服微信】",
        找: "★ 客服微信 → 发照片选人 → 预约",
        坑: '★★★ 照片一定是精修的。★★ 而且"换人"是常态',
        实样: "`她`（客服）：这是今天在的\n（★ 客服 ≠ 本人，这是行业惯例）",
        画像: "★★★ 整形成本高、月收入高、★★ 流动性也大（多数做不长）。",
        识别: "★★ 客服微信 + 每日更新照片 = 会所。"
      },
      "外围（本地）": {
        她: '★★★ 不在平台上，靠"经纪人"和群',
        找: "★ 进群 / 熟人介绍",
        坑: "★★★ 照片和真人几乎从不一致。★★ 而且价格浮动极大",
        实样: "`她`（经纪人）：几点的 几天\n（★ 全程跟经纪人谈，见不到本人）",
        画像: "★★★ 条件好的贵、条件一般的便宜，★★ 但价格和条件往往不成正比。",
        识别: "★★★ 见面才知道长什么样 —— ★ 这是这个行业的核心特征。"
      },
      ハッピーメール: {
        她: "★★★ 日本最大的出会い系。★★ 用户几百万",
        找: "★ 站内私信（★ 免费点数有限）",
        坑: '★★★ 上面的女性多半是"パパ活"—— ★ 明说了要钱。★★ 而且有大量"サクラ"（托）',
        实样: "`她`：お手当て 3 でどうですか\n（★ 「3」= 三万日元。★ 谈钱不羞耻）",
        画像: "**20-35。** ★★ 学生 + 主妇 + 兼职。★★ 明确图钱的比例最高。",
        识别: '★★ 用"点数"聊天的设计本身就是它的商业模式。'
      },
      ワクワクメール: {
        她: '★ 同类，体量小一点。★★ 但用户更"老派"',
        找: "★ 站内私信",
        坑: "★★ サクラ多。★★ 免费点数更少",
        实样: '`她`：会ってから決めます\n（★ "见面再决定"—— 这句在这个站上是好的信号）',
        画像: "**25-40。** ★★ 比ハッピーメール年长。",
        识别: '★ 它的用户偏"认真的找"而不是"立刻约"。'
      },
      PCMAX: {
        她: '★ 出会い系里比较"轻"的一个',
        找: "★ 站内私信",
        坑: "★★ サクラ / 业者比例高",
        实样: "`她`：今日会える？",
        画像: "**20-35。**",
        识别: "★ 同一批女人在多个站同时出现 —— ★★ 这一行的人都是多平台挂着。"
      },
      イククル: {
        她: '★ 同上，偏"熟女"向',
        找: "★ 站内私信",
        坑: "★★ 年龄造假普遍",
        实样: "`她`：いくつに見える？",
        画像: "**30-45。** ★★ 主打这个年龄段。",
        识别: '★ 照片偏"生活感"的，多半是真的。'
      },
      Pairs: {
        她: "★ 正经交友 app，但约炮多",
        找: "★ 匹配 → 聊天（★ 要互相点）",
        坑: "★ 要验身份，所以真人多。★★ 但自我介绍写得极长",
        实样: "`她`：はじめまして。プロフィール読んでくれて…\n（★ 日本人在 app 上也用敬语）",
        画像: "**25-35。** ★★ 认真找对象为主 —— 但也有例外。",
        识别: '★★ 有"本人確認済"标记的才是真人。'
      },
      with: {
        她: "★ 匹配度算法强，用户偏年轻",
        找: "★ 匹配 → 心理测试",
        坑: "★ 测试题多，但真人比例高",
        实样: "`她`：相性いいですね",
        画像: "**20-30。** ★★ 学生 + 年轻上班族。",
        识别: '★ 它的匹配是基于"性格测试"，不是纯看脸。'
      },
      Omiai: {
        她: '★★ 更"婚活"向',
        找: "★ 匹配 → 见面",
        坑: "★ 用户年龄偏大，节奏慢",
        实样: "`她`：結婚前提ですか？",
        画像: "**28-40。** ★★ 这里的人是要结婚的。",
        识别: '★★ 资料里有"婚姻歴"字段 —— 说明这个站的定位。'
      },
      "Twitter（X）裏垢": {
        她: "★★★ 日本女性真正的主战场。★★ 一人多号是常态",
        找: "★ 看她的关注列表 / 发帖时间",
        坑: "★★★ 表号和里号是两条人生。★★ 而且她可能同时有好几个里号",
        实样: "（裏垢）`她`：今日も暇\n（★ 表号发美食，里号发这个）",
        画像: '**18-35。** ★★ 学生 / 主妇 / 兼职。★★ 用里号是因为"会社的人不能看到"。',
        识别: "★★★ 看关注列表 —— 全是里号的，那个号就是里号。"
      },
      "Instagram 裏アカ": {
        她: '★★ 比 X 更"视觉" —— ★ 但裏アカ 是靠"限定公开"',
        找: "★ 申请关注 → 私信",
        坑: '★★ 有的是"サブスク"（付费订阅）',
        实样: '`她`：DM で\n（★ 日本人在 IG 私信里说「DM で」—— 意思是"去私信聊"）',
        画像: "**20-30。** ★★ 颜值向。",
        识别: '★ 有"鍵垢"（锁号）的才可能是裏アカ。'
      },
      "メンズエステ（男士按摩）": {
        她: '★★★ 合法按摩店，★ 但"那个部分"是灰色。★★ 东京遍地',
        找: "★ 网上预约 → 到店 / 房间",
        坑: "★★★ 「不插入」是规则。★★ 但其他的都有",
        实样: "`她`：90分コースですね\n（★ 看时间怎么算 —— 这是核心）",
        画像: "**20-30。** ★★ 素人兼职比例高。",
        识别: "★★ 看套餐时长（60/90/120 分钟）—— ★ 时间越长越贵，但内容差别不大。"
      },
      "デリヘル（上门）": {
        她: "★★★ 「派遣型」—— ★ 她到你的酒店。★★ 全国都有",
        找: "★ 网站 → 电话 → 派送",
        坑: '★★★ 照片一定是别人的。★★ 而且"指名料"另算',
        实样: "`她`：ホテルまで伺います",
        画像: "**20-30。** ★★ 流动性大。",
        识别: '★★★ 和ソープ的区别：★ 这里没有"店面"，是送到。'
      },
      ソープランド: {
        她: '★★★ 日本唯一的合法"本番"形式',
        找: "★ 到店 → 看人 → 选 → 进房",
        坑: "★★ 全国价格差极大。★★ 东京吉原最贵，地方便宜一半",
        实样: "`她`：お風呂、入りますか\n（★ 流程固定：先洗、再泡、再…）",
        画像: '**20-35。** ★★ 有"店籍"（★ 她在哪家店上班是有记录的）。',
        识别: '★★★ 有"料金表"和"在籍表"的才是正经店。'
      },
      FC2: {
        她: "★ 个人投稿为主",
        找: "★ 按分类找",
        坑: "★ 盗版 / 聚合。★★ 上传者不一定有授权",
        实样: "（标题）`素人` `個人撮影`\n（★ 这两个词是分类名，也是卖点）",
        画像: "★★ 素人投稿者 + 职业演员。",
        识别: "★★ 「個人撮影」是它的核心分类。"
      },
      "Pornhub 日本区": {
        她: "★ 全球站，日本区有自己的分类",
        找: "★ 按标签",
        坑: "★★ 大量搬运 —— ★★ 而且日本区的内容很多是盗的",
        实样: "（标签）`Japanese`",
        画像: "★ 混杂。",
        识别: "★ 带「ハメ撮り」标签的多是素人。"
      },
      MissAV: {
        她: "★ 中文界最常用的聚合站",
        找: "★ 按番号 / 演员",
        坑: "★★ 全站是盗版。★★ 但检索体验最好",
        实样: "（搜索）`番号`",
        画像: "★ 观众。",
        识别: "★★ 它不是平台，是【索引】。"
      },
      JAV321: {
        她: "★ 同类，老站",
        找: "★ 番号",
        坑: "★★ 盗版",
        实样: "（搜索）`番号`",
        画像: "★ 观众。",
        识别: "★ 和 MissAV 一样是索引站。"
      },
      DMM: {
        她: "★ 日本最大的正版平台之一",
        找: "★ 正版购买 / 订阅",
        坑: "★★ 要日本支付方式",
        实样: "（商品页）",
        画像: "★ 正式发行。",
        识别: '★★ 它是"正版"—— ★ 和上面的聚合站是两回事。'
      },
      FANZA: {
        她: "★★ DMM 的成人部门 —— ★ 日本最大的正版成人平台",
        找: "★ 订阅 / 单片购买",
        坑: "★★ 要日本支付方式。★★ 而且有区域限制",
        实样: "（作品页）",
        画像: "★ 正式发行 + 素人投稿（FANZA 有自己的素人区）。",
        识别: '★★★ 它的"素人"区是真人投稿，和职业作品要分开看。'
      },
      "5ch": {
        她: "★ 匿名论坛。★★ 有专门的板块",
        找: "★ スレ（帖）",
        坑: "★ 信息杂但有用",
        实样: "（スレ）`名無しさん`：今日も",
        画像: "**25-45 男性为主。**",
        识别: '★★ 它的价值不在"找人"，在"看评价"。'
      },
      爆サイ: {
        她: '★★ "地域揭示板" —— ★★ 会写本地店铺评价',
        找: "★ 按地区看",
        坑: "★★ 真假掺着。★★ 业者会自己发好评",
        实样: "（帖）`名無し`：行ってきた",
        画像: "★ 本地玩家。",
        识别: "★★★ 它的价值和「风评」同源 —— ★ 看店铺评价用这个。"
      },
      "카카오톡（KakaoTalk）": {
        她: "★★★ 韩国的绝对核心。★★ 换 Kakao = 关系成立",
        找: "★ 从别的平台导过来",
        坑: "★★★ 韩国人不用 Kakao 加人 = 不想跟你继续",
        实样: "`她`：카톡 아이디 뭐예요\n（★ 韩国人不用微信、不用 Line —— 只用 Kakao）",
        画像: "★ 全年龄。",
        识别: "★★ 她的 Kakao 头像是真的（★ 韩国人不太用假头像）。"
      },
      "네이버 카페": {
        她: '★ 匿名咖啡馆。★★ 韩国人在这里"看"，不是"找人"',
        找: "★ 加入 cafe → 等级",
        坑: '★ 有些要"等级"才能看隐藏版',
        实样: "（帖）`她`：이런 경우",
        画像: "**30-45。** ★★ 大龄用户多。",
        识别: "★ 它的隐藏版才是内容所在。"
      },
      밴드: {
        她: '★ 类似 카페，但更"兴趣小组"',
        找: "★ 加 band",
        坑: "★★ 人少但粘性高",
        实样: "（帖）`她`：가입했어요",
        画像: "★ 兴趣圈。",
        识别: "★ 它的私密性比 카페 高。"
      },
      "랜덤채팅（随机聊天）": {
        她: '★★ 匿名随机匹配 —— ★★★ 韩国这一类的核心是"没有身份"',
        找: "★ 随机",
        坑: "★★★ 青少年比例高 —— ★★★ 这一条要极度小心",
        实样: "`她`：몇 살이에요\n（★ 韩国人第一句必问年龄）",
        画像: "★★ 年轻 + 匿名。",
        识别: "★★ 匿名 = 说什么都可以。"
      },
      위피: {
        她: "★ 韩国最大约会 app 之一",
        找: "★ 滑卡 + 认证",
        坑: "★★ 要实名认证，所以真人多",
        实样: "`她`：서울이세요?",
        画像: "**20-35。** ★★ 上班族为主。",
        识别: '★ 它有"직업"（职业）字段 —— ★★ 因为韩国人看"스펙"。'
      },
      아만다: {
        她: "★ 同类，用户偏年轻",
        找: "★ 滑卡",
        坑: "★ 用户少但真实",
        实样: "`她`：안녕",
        画像: "**20-30。** ★★ 学生 + 刚工作。",
        识别: '★ 它是三个里最"干净"的。'
      },
      글램: {
        她: '★ 同类，主打"当天见面"',
        找: "★ 滑卡 → 快速见面",
        坑: '★★ 名字就是"当天"的意思 —— ★ 目的写明了',
        实样: "`她`：오늘 시간 있어요?",
        画像: "**20-35。** ★★ 目的明确。",
        识别: "★★ 它的定位本身就是筛子。"
      },
      "오피（OP）": {
        她: '★★★ 韩国的半套店。★★ 有"오피 / 키스방 / 텐프로"的分级',
        找: "★ 电话 / 网站 → 到店",
        坑: '★★★ 被查过很多轮。★★ "실장"（经理）是关键',
        实样: "`她`：오피 가시면\n（★ 这些词是行话 —— 写韩国必须用）",
        画像: "**20-30。** ★★ 有正经营业执照的壳。",
        识别: "★★★ 텐프로 = 最贵的；키스방 = 只接吻。★ 三个词不能混。"
      },
      룸싸롱: {
        她: '★★★ 韩国版陪酒。★★ 有"2차"（第二摊）',
        找: "★ 预约 → 包厢",
        坑: "★★ 公司聚餐文化的延伸",
        实样: '`她`：2차 가실래요\n（★ 「2차」是关键 —— 意思是"出去"）',
        画像: "**20-30。** ★★ 全职陪酒。",
        识别: '★★★ 有"2차"这个环节的才是真的。'
      },
      텐프로: {
        她: "★★★ 韩国最高档的一层",
        找: '★ 要通过"실장"',
        坑: '★★★ 价格是오피的 3-5 倍。★★ 而且门槛在"人脉"',
        实样: "`她`（실장）：오늘 좋은 분 계세요",
        画像: "★★★ 整形成本极高、★★ 多数是模特 / 前偶像。",
        识别: "★★★ 没有 실장 的电话，你连入口都没有。"
      },
      "Telegram（韩国）": {
        她: "★★★ 因为韩国严打（몰카 是重罪），所以转移到 TG 的最多",
        找: "★ 群 / 频道",
        坑: "★★★ TG 是韩国这一层的主要通道",
        实样: "`她`：텔레 주세요",
        画像: "★★ 年轻 + 敢做。",
        识别: "★★ 韩国人在 TG 上的比在其他平台更放得开。"
      },
      디시인사이드: {
        她: "★★ 韩国最大的匿名社区",
        找: "★ 갤러리（板）",
        坑: "★ 极度匿名 → ★★ 说话最狠",
        实样: "（帖）`ㅇㅇ`：",
        画像: "**20-35 男性为主。**",
        识别: '★ 它的"女战士"现象是韩国独有的。'
      },
      ThaiFriendly: {
        她: "★★★ 泰国最直接的平台。★★ 她大多是自愿的、专业的",
        找: "★ 直接聊 —— ★ 第一句就问酒店位置",
        坑: '★ 照片有时是几年前的。★★ 但"换人"比外围少',
        实样: "`她`：Hello sir. Where you stay?\n`她`：Soi 6 or 8?\n（★ 第一句就问位置 —— 这是效率，不是无礼）",
        画像: '**20-35。** ★★ 曼谷 / 芭提雅 / 普吉。★★ 有明确的"上班时间"。',
        识别: "★★★ 泰国人用「ka」（ค่ะ）结尾 —— ★ 写泰国对白必须带这个。"
      },
      "Line（泰国）": {
        她: "★★★ 泰国是 LINE 的全球最大市场之一",
        找: "★ 换 LINE 是标准流程",
        坑: "★★ 她的 LINE 上有大量客人",
        实样: "`她`：แอดไลน์ได้ไหม",
        画像: "★ 全年龄。",
        识别: "★★ 泰国人不用微信。"
      },
      Pantip: {
        她: "★★ 泰国最大的论坛",
        找: "★ 板 / 帖",
        坑: "★ 官方语言是泰语",
        实样: "（帖）`楼主`：",
        画像: "**25-45。**",
        识别: '★ 它的价值和"真实评价"同源。'
      },
      "Tinder（泰国）": {
        她: "★★ 曼谷、芭提雅用得多",
        找: "★ 滑卡",
        坑: '★★ 上面"找赞助"的极多 —— ★★ 泰国叫「เลี้ยง」（เลี้ยงดู = 被养）',
        实样: '`她`：Can you take care me?\n（★ "take care" 在泰国语境里 = 给钱）',
        画像: "**20-35。** ★★ 混血 + 本地。",
        识别: '★★ 泰国 Tinder 上一半是"找长期"的。'
      },
      "Bumble（泰国）": {
        她: '★ 用户少但更"国际"',
        找: "★ 她先开口",
        坑: "★ 泰国人用得比 Tinder 少",
        实样: "`她`：Hi! How long in Bangkok?",
        画像: "**25-35。** ★★ 英文好的多。",
        识别: '★ 这个平台上"英语"是筛选条件。'
      },
      Nana: {
        她: '★★★ 曼谷三大区之一 —— ★ 最"杂"、最国际化',
        找: '★ 走进去 ← ★★ 这是"看得见"的',
        坑: "★ 游客价。★★ 而且 bar fine 价格逐年涨",
        实样: "`她`：Buy me drink?\n（★ lady drink 是它的核心机制）",
        画像: "★★ 全年龄 + 大量变性人（kathoey）。",
        识别: "★★★ 「lady drink」+「bar fine」+「up to you」—— ★ 这三个词是它的全部。"
      },
      "Cowboy（Soi Cowboy）": {
        她: '★★★ 曼谷三大区之一 —— ★ 最"标准"、最商业化',
        找: "★ Gogo bar 一间接一间",
        坑: '★ 价格比 Nana 略低。★★ 但"选人"的环节更明确',
        实样: "`她`：Come in! Sit down!",
        画像: "★★ 结构最清楚的区 —— ★ 一眼能看出哪家什么档次。",
        识别: "★★★ 一条街全是 gogo bar，★★ 这就是它和 Nana 的区别。"
      },
      "Soi 6": {
        她: "★★★ 芭提雅的一条街 —— ★★★ 白天就开着",
        找: "★ 走进去 ★ 她坐在门口",
        坑: "★★ 白天营业 = 它的特点。★★ 价格比晚上便宜",
        实样: "`她`：Hello~ come here\n（★ 坐在门口招手 —— 这是它最标志性的画面）",
        画像: '★★ 全年龄 + 有一部分是"兼职"。',
        识别: "★★★ 白天营业是它最大的区别。"
      },
      泰浴: {
        她: "★★ 有完整的价目和流程（★ 洗、泡、按、做）",
        找: "★ 到店 → 大厅看人 → 选",
        坑: "★★ 游客价和本地价差三倍",
        实样: "（大厅）`她`：坐在这里等",
        画像: '★★ 分"浴场式"和"高档式"。',
        识别: '★★★ 有"金鱼缸"（★ 透过玻璃看人）的才是老式泰浴。'
      },
      "按摩（泰国）": {
        她: '★★ 从"正经"到"不正经"是一整条光谱',
        找: "★ 看门口 / 看价格",
        坑: "★★★ 价格差极大 —— ★ 从 300 铢到 3000 铢都有",
        实样: "`她`：Oil massage? 2 hours?",
        画像: '★ 全年龄。★★ 很多是"白天做正经、晚上做别的"。',
        识别: '★★ 看是不是"Oil massage" —— ★ 这是分水岭。'
      },
      "OnlyFans 泰国区": {
        她: "★ 泰国的 OF 创作者",
        找: "★ 订阅 → 私信",
        坑: "★★ 有的收了钱不发内容",
        实样: "`她`：Tip me pls",
        画像: "**20-30。** ★★ 有商业头脑。",
        识别: "★ 有长期更新记录的才可信。"
      },
      Zalo: {
        她: "★★★ 越南的国民通讯工具",
        找: "★ 从别的平台导过来",
        坑: "★★ 越南人不用微信、不用 Line",
        实样: "`她`：Anh cho em Zalo",
        画像: "★ 全年龄。",
        识别: "★★ 换 Zalo = 关系成立。"
      },
      "cà phê ôm（抱咖）": {
        她: "★★★ 越南特有：坐在腿上陪聊的咖啡馆",
        找: "★ 走进去 —— ★ 有女孩陪坐，可以抱",
        坑: '★★ 分"只陪聊"和"可以谈别的"两种店',
        实样: "`她`：Anh ngồi đây\n（★ 她坐你腿上，聊，就这样）",
        画像: "**18-30。** ★★ 河内 / 胡志明都有，但风格不同。",
        识别: "★★★ 这个产业的名字本身就是定义 —— ★ 一定要写对。"
      },
      "Facebook 群（越南）": {
        她: "★★ 越南人用 FB 比用 Zalo 还多",
        找: "★ 加群",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人',
        实样: "`她`（群）：Ai rảnh không\n（★ 「谁有空」—— 这是最常见的开场）",
        画像: "★ 全年龄。",
        识别: '★★ 看"活跃人数"不是看"群人数"。'
      },
      "本地论坛（越南）": {
        她: "★ 越南本地的小论坛",
        找: "★ 注册 + 发帖",
        坑: "★★ 越南语为主，外人进不去",
        实样: "（帖）",
        画像: "★ 本地人。",
        识别: "★ 语言本身就是门槛。"
      },
      Tinder: {
        她: "★★ 用户最杂 —— 良家、外围、骗子都在同一个池子里",
        找: "★ 互相右滑才能说",
        坑: "★★ 照片 30 公里外的，多半是外围（因为要跑）",
        实样: "`你`：在？\n`她`：在\n`她`：你多大\n（★ 全球通用：先问年龄，再问距离）",
        画像: "**18-45。** ★★ 一线城市 / 旅游城市 / 大学城是它最活跃的地方。",
        识别: "★★ 照片 3 公里以内 = 真人；跨城市 = 有目的。"
      },
      Bumble: {
        她: "★★ 她必须先开口 —— 24 小时内不说话就消失",
        找: "★ 等她先发",
        坑: "★★ 这条规则把主动权给了她 —— ★★ 很多人不适应",
        实样: "`她`：Hey! Your profile is interesting\n（★ 她开口的第一句通常很正经）",
        画像: '**22-38。** ★★ 女性用户素质普遍高 —— 因为规则筛掉了"广撒网"的人。',
        识别: '★★ "她先开口"这个机制本身就是它的特征。'
      },
      Hinge: {
        她: '★★ 号称"为认真关系设计"，但约炮率最高',
        找: "★ 回答提示词 → 互相点赞",
        坑: "★ 照片真实度比 Tinder 高，★★ 所以更难装",
        实样: '`她`：你的 prompt 写得挺好的\n（★ 从"内容"入场，是它的路径）',
        画像: "**24-35。** ★★ 高学历 / 大城市。",
        识别: '★★ 它的资料里有"prompt"（问答）—— ★ 那才是真正的筛选。'
      },
      OkCupid: {
        她: "老站。用户偏文艺、偏话多",
        找: "★ 答问卷 → 看匹配度",
        坑: "★ 用户年龄偏大，节奏慢",
        实样: "`她`：Your match % is high",
        画像: "**25-40。**",
        识别: "★ 它的匹配度算法比任何 app 都细。"
      },
      "Plenty of Fish": {
        她: "★ 蓝领多、离异多、直白",
        找: "★ 直接发消息",
        坑: "★★ 照片和真人差距是常态。★ 视频通话能过滤掉一半",
        实样: "`她`：Hey hun",
        画像: "**30-50。** ★★ 收入中等。",
        识别: '★ 它的用户"不装"。'
      },
      AdultFriendFinder: {
        她: '★★ 目的写在名字上。★★ 注册即明确"我在找什么"',
        找: "★ 站内信 / 群",
        坑: '★★★ 假号比例最高 —— ★ 这一类的"在线人数"有一半是机器人',
        实样: "`她`：Couple or single?",
        画像: "★ 30-55。★★ 已婚为主。",
        识别: "★★ 它不是约会 app，是成人社交网。"
      },
      BeNaughty: {
        她: '★★ 同类，偏"约会"包装',
        找: "★ 站内信",
        坑: "★★ 付费墙极多",
        实样: "`她`：Wanna chat?",
        画像: "★ 25-45。",
        识别: '★★ 它的"免费"是幌子。'
      },
      Flirt: {
        她: "★★ 同类",
        找: "★ 站内信",
        坑: "★★ 机器人多。★★ 注册就扣费",
        实样: "`她`：Hi 😉",
        画像: "★ 25-45。",
        识别: '★ 看它的付款方式 —— 订阅制的都是"聊天农场"。'
      },
      Skokka: {
        她: "★★ 全球分类广告式的外围目录",
        找: "★ 按城市 + 分类筛",
        坑: '★★★ 照片是套图，★★ 真人是"到店的"',
        实样: "`她`：Como? 1h o 2h?\n（★ 葡萄牙语版西班牙语版都有）",
        画像: "★★ 拉美 / 南欧为主。",
        识别: '★★ 它的"人"是按城市列出来的目录。'
      },
      Vivastreet: {
        她: "★★ 英国 / 法国为主的外围目录",
        找: "★ 按城市",
        坑: '★★★ 有一半是"代理"发的',
        实样: "`她`：What are you looking for?",
        画像: "★ 英国 / 欧洲。",
        识别: "★★ 同一个号码在多个城市出现过 = 代理。"
      },
      Eros: {
        她: "★★ 美国高端外围目录",
        找: "★ 按城市 + 价格",
        坑: '★★★ 高端也假。★★ 而且"押金"是常见骗法',
        实样: "`她`：Screening required\n（★ 「screening」= 要验证身份，这是真的高端会做的）",
        画像: "★★ 美国一线城市。",
        识别: '★★★ 有"screening"流程的才是真的，要押金的一定是骗的。'
      },
      Tryst: {
        她: '★ 同类，主打"独立"',
        找: "★ 按城市",
        坑: "★★ 假号比例比 Eros 低",
        实样: "`她`：Rates on my site",
        画像: "★ 美国 / 加拿大。",
        识别: '★★ 强调"independent"（独立工作）是它的特点。'
      },
      Slixa: {
        她: "★ 同类，视觉最精致",
        找: "★ 按城市",
        坑: "★ 价格偏高",
        实样: "`她`：Available this evening",
        画像: "★ 美国 / 英国。",
        识别: "★ 它的界面做得最像正经预约系统。"
      },
      PrivateDelights: {
        她: '★★ 有"评价区"的目录 —— ★★★ 这是它最大的价值',
        找: "★ 看评价再选",
        坑: "★★ 评价也可以刷。★★ 但比没有评价强",
        实样: "（评价）`用户`：Exactly as advertised",
        画像: "★ 美国西海岸。",
        识别: '★★★ 要看"评价数量"和"发帖历史"，不是看好评率。'
      },
      SkipTheGames: {
        她: "★ 美国中低端目录",
        找: "★ 按城市",
        坑: "★★★ 假的最多",
        实样: "`她`：Special today",
        画像: "★ 美国。",
        识别: '★★ "今天特价"的一律跳过。'
      },
      AdultSearch: {
        她: "★ 同类",
        找: "★ 按城市",
        坑: "★★ 假号多",
        实样: "`她`：Call me",
        画像: "★ 美国。",
        识别: "★ 和 SkipTheGames 一个档次。"
      },
      EuroGirlsEscort: {
        她: "★★ 欧洲最大的目录",
        找: "★ 按国家 + 城市",
        坑: '★★ "经纪"发的占一半',
        实样: "`她`：2 hours minimum",
        画像: "★ 全欧洲。",
        识别: '★★ 见面前要"视频验证"—— ★ 拒绝的就是假的。'
      },
      Punternet: {
        她: "★★★ 英国的【评价站】—— ★ 不是目录",
        找: "★ 看评价",
        坑: "★ 只能看，不能约",
        实样: "（报告）`用户`：Field report",
        画像: "★ 英国男性用户。",
        识别: '★★★ 它的价值全在"field report"（实地报告）。'
      },
      AdultWork: {
        她: '★★★ 英国最大的平台。★★ 有完整的"评价 + 排班"体系',
        找: "★ 注册 → 看排班 → 预约",
        坑: '★★ 有的要"押金"（★ 那是骗的）',
        实样: "`她`：Availability updated",
        画像: "★ 英国全境。",
        识别: '★★★ 它的"feedback"（评价）体系是最可信的机制之一。'
      },
      TheEroticReview: {
        她: "★★ 美国的老牌评价站",
        找: "★ 看评价（★ 要会员）",
        坑: "★ 会员费不便宜",
        实样: "（报告）",
        画像: "★ 美国。",
        识别: '★★ 和 Punternet 同源 —— ★ 是"评价站"。'
      },
      "Seeking Arrangement": {
        她: '★★★ 明确的"糖爹"平台。★★ 但要"体面" —— 不说"钱"，说「allowance」',
        找: "★ 匹配 → 谈 allowance",
        坑: '★★★ 有的收了 allowance 就消失。★★ 而且"见面就要钱"的极多',
        实样: "`她`：What are you looking for?\n`她`：I need help with tuition\n（★ 「学费」是最常见的开场理由 —— 而且往往是真的）",
        画像: '**18-30。** ★★ 学生为主。★★ 她们把这件事当"实习"。',
        识别: "★★★ 记录在案、有长期互动的才是真的。"
      },
      "Ashley Madison": {
        她: '★★★ 专门给已婚的人。★★★ 成立于"人生苦短"的口号',
        找: "★ 匹配 → 私信",
        坑: "★★★ 男性要付费才能读消息。★★ 女性免费 —— ★★ 所以男性用户极多、女性少",
        实样: "`她`：Married too?\n（★ 第一句确认对方也已婚 —— 这是默契）",
        画像: "**30-45 已婚为主。** ★★★ 她们最怕的不是老公，是孩子学校。",
        识别: "★★★ 用户结构决定了它的性别比极不平衡。"
      },
      Gleeden: {
        她: "★ 欧洲版的 Ashley Madison",
        找: "★ 匹配",
        坑: "★ 用户比 AM 少",
        实样: "`她`：Vous êtes marié ?",
        画像: "★ 法国 / 意大利为主。",
        识别: '★ 欧洲的"已婚约会"市场被它和 AM 分了。'
      },
      Doublelist: {
        她: "★ Craigslist 的成人版（★ 替代品）",
        找: "★ 按城市分板",
        坑: "★★ 男性发帖多，女性发帖立刻被淹没",
        实样: "（帖）`m4w`：",
        画像: "★ 美国。",
        识别: "★★ 它的代码是 `m4w` / `w4m` —— ★ 老派但有效。"
      },
      Locanto: {
        她: "★ 全球分类广告",
        找: "★ 按城市 + 分类",
        坑: "★★ 假号比例高",
        实样: "（广告）",
        画像: "★ 全球。",
        识别: '★ 它是"分类广告"，不是社交。'
      },
      Chaturbate: {
        她: "★★★ 一对多。★★ 私聊是付费的",
        找: "★ 进房间 → 打赏 → 私聊",
        坑: '★★★ 代币制。★★ "私聊秀"单独收费',
        实样: "（弹幕）`用户`：tip for goal\n（★ 打赏 = 控制她的动作，这是它的机制）",
        画像: "**18-35。** ★★ 全球。★★ 大量东欧 / 拉美。",
        识别: '★★★ 它的核心是"tip menu"（打赏菜单）—— ★ 那是价目表。'
      },
      Stripchat: {
        她: "★ 同类，界面更现代",
        找: "★ 进房间",
        坑: "★ 同上",
        实样: "（弹幕）",
        画像: "★ 全球。",
        识别: '★ 它的"私聊"价格比 CB 高。'
      },
      BongaCams: {
        她: "★ 同类，东欧为主",
        找: "★ 进房间",
        坑: "★★ 大量东欧主播",
        实样: "（弹幕）",
        画像: "★★ 罗马尼亚 / 乌克兰 / 俄罗斯。",
        识别: "★ 语言是它的地域标记。"
      },
      LiveJasmin: {
        她: "★ 高端向，主播素质高",
        找: "★ 进房间",
        坑: "★★ 价格最贵",
        实样: "（私聊）",
        画像: "★ 全球。",
        识别: "★ 它的主播多是职业化训练过的。"
      },
      MyFreeCams: {
        她: "★ 老站，社区感强",
        找: "★ 进房间",
        坑: "★ 免费内容多，但私聊贵",
        实样: "（聊天室）",
        画像: "★ 美国为主。",
        识别: '★ 它的"会员等级"体系最复杂。'
      },
      CamSoda: {
        她: "★ 偏表演性（★ 有互动玩具）",
        找: "★ 进房间",
        坑: "★★ 技术噱头多于内容",
        实样: "（互动指令）",
        画像: "★ 全球。",
        识别: '★ 它的"交互玩具"是卖点。'
      },
      Flirt4Free: {
        她: "★ 高端，一对一为主",
        找: "★ 预约私聊",
        坑: "★★ 按分钟收费，很贵",
        实样: "（私聊）",
        画像: "★ 全球。",
        识别: '★ 它的模式是"直播 + 私聊"双轨。'
      },
      ImLive: {
        她: "★ 老站",
        找: "★ 进房间",
        坑: "★★ 价格中等",
        实样: "（私聊）",
        画像: "★ 全球。",
        识别: "★ 界面老，但主播忠诚度高。"
      },
      Streamate: {
        她: "★ 按分钟私聊为主",
        找: "★ 进房间",
        坑: "★★ 公共内容很少",
        实样: "（私聊）",
        画像: "★ 全球。",
        识别: '★ 它的公共房间只是"预览"。'
      },
      OnlyFans: {
        她: "★★★ 她自己就是生产者。★★ 有商业头脑 —— 会排期、会做内容、会管理粉丝",
        找: "★ 订阅 → 私信",
        坑: "★★★ 订阅只是门票。★★ 真正的产品是私信和定制",
        实样: "`她`：Custom? PPV?\n（★ 这些词是行话 —— 她自己说的）",
        画像: '**18-35。** ★★ 有明确的"经营"意识。',
        识别: "★★★ 镜头前和私下可能完全两个人 —— ★ 私下可能极安静。"
      },
      Fansly: {
        她: "★ OF 的竞品，允许更多内容",
        找: "★ 订阅",
        坑: "★ 用户比 OF 少",
        实样: "`她`：Free trial?",
        画像: "★ 18-35。",
        识别: "★ 它比 OF 宽松 —— ★ 所以上面有 OF 上不敢发的内容。"
      },
      Patreon: {
        她: '★ 创作用，成人内容要"分级"',
        找: "★ 订阅",
        坑: "★★ 成人内容有限制",
        实样: "`她`：Tier 2 才有",
        画像: "★ 创作者。",
        识别: '★ 它的核心是"分级付费"。'
      },
      Fantia: {
        她: "★ 日本的订阅平台",
        找: "★ 订阅 → 限定内容",
        坑: "★★ 要日本支付方式",
        实样: "（投稿）`今月の限定`",
        画像: "★ 日本创作者。",
        识别: '★ 它的"人设化"比欧美强。'
      },
      Pornhub: {
        她: '★ 全球最大。★★ 有"素人""真实""偷拍"分类',
        找: "★ 按标签",
        坑: "★★★ 这三个分类名本身就是卖点。★★ 但很多是演的",
        实样: "（标签）`Amateur`",
        画像: "★ 全球。",
        识别: "★★ 「Amateur」（素人）这个标签是它最大的分类。"
      },
      xvideos: {
        她: "★ 同类，体量接近",
        找: "★ 按标签",
        坑: "★★ 同上",
        实样: "（标签）",
        画像: "★ 全球。",
        识别: "★ 和 Pornhub 的用户画像接近。"
      },
      Grindr: {
        她: "★★ 男同。★★ 按距离排序，是同类 app 里最快的",
        找: "★ 直接私信",
        坑: "★★ 见面速度极快，★★ 所以风险也最高",
        实样: "`她`：Now?",
        画像: "★ 男同。",
        识别: '★★ 它是所有约会 app 里"从匹配到见面"最快的一个。'
      },
      Kasidie: {
        她: "★★ 换偶（swinger）站，按地区分",
        找: "★ 认证 → 参加活动",
        坑: "★★ 单男基本进不去",
        实样: "`她`：We are a couple",
        画像: "★ 美国。",
        识别: '★★★ 它是"夫妻社区"，不是"约会 app"。'
      },
      "SLS（SwingLifeStyle）": {
        她: "★ 老牌换偶站",
        找: "★ 认证 + 活动",
        坑: "★★ 单男门槛高",
        实样: "`她`：Certifications?",
        画像: "★ 美国。",
        识别: '★ 它的"认证"体系是圈子里的信任机制。'
      },
      SDC: {
        她: "★ 同类，偏欧洲",
        找: "★ 认证",
        坑: "★ 用户比 SLS 少",
        实样: "`她`：Verified couple",
        画像: "★ 欧洲 / 美国。",
        识别: "★ 欧洲的换偶圈子主要在它上面。"
      },
      Signal: {
        她: "★★ 端到端加密。不留痕",
        找: "★ 从别的平台导过来",
        坑: '★ 用了这个就等于声明"这里面有事"',
        实样: "`她`：Switch to Signal",
        画像: "★ 全球。",
        识别: '★★ "换 Signal" 是一个明确的信号。'
      },
      Session: {
        她: "★ 匿名通讯（★ 不用手机号）",
        找: "★ 交换 Session ID",
        坑: "★★ 更隐蔽，但用户更少",
        实样: "`她`：My session ID",
        画像: "★ 全球。",
        识别: "★ 它比 Signal 更彻底 —— ★ 连号码都不需要。"
      },
      Wickr: {
        她: "★ 企业级加密通讯",
        找: "★ 交换 ID",
        坑: "★★ 已有停止服务的风险",
        实样: "`她`：Wickr me",
        画像: "★ 全球。",
        识别: "★ 用它的人多半有明确的目的。"
      }
    };
  },
  "./src/神奇手机/神奇手机/核心/平台库.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      全球分类: () => 全球分类,
      全球平台: () => 全球平台,
      地区平台: () => 地区平台,
      平台统计: () => 平台统计,
      该地区的平台: () => 该地区的平台
    });
    const 全球平台 = [ {
      名: "Tinder",
      型: "约会",
      她: "3 公里内的一个圆。先看脸，再决定划不划",
      找: "匹配上就能聊",
      坑: "★ 见面门槛最低，也最容易被做局"
    }, {
      名: "Bumble",
      型: "约会",
      她: "★ 她必须先开口 —— 24 小时内不说话就消失",
      找: "她先发，你接",
      坑: "★ 这条规则把主动权给了她 —— 很多人不适应"
    }, {
      名: "Hinge",
      型: "约会",
      她: '★★ 号称"为认真关系设计"，但约炮率最高',
      找: "回答提示词，互相点赞",
      坑: "★ 照片真实度比 Tinder 高，所以更难装"
    }, {
      名: "OkCupid",
      型: "约会",
      她: "老站。用户偏文艺、偏话多",
      找: "答问卷、看匹配度",
      坑: "用户年龄偏大，节奏慢"
    }, {
      名: "Plenty of Fish",
      型: "约会",
      她: "★ 蓝领多、离异多、直白",
      找: "直接发消息",
      坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
    }, {
      名: "Match",
      型: "约会",
      她: "付费站。用户是真的想找",
      找: "付费才能聊",
      坑: "★ 贵，而且流程长"
    }, {
      名: "Zoosk",
      型: "约会",
      她: "老式。中西部、欧洲小镇多",
      找: "滑卡、打招呼",
      坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
    }, {
      名: "Happn",
      型: "约会",
      她: '★★ 显示"你在哪擦肩而过" —— 同城极强',
      找: "看擦肩记录",
      坑: "★ 定位暴露风险"
    }, {
      名: "Coffee Meets Bagel",
      型: "约会",
      她: "每天只推几个。质量高于数量",
      找: "滑卡、打招呼",
      坑: "★ 节奏慢，急性子受不了"
    }, {
      名: "Badoo",
      型: "约会",
      她: "拉美 / 东欧 / 东南亚用得多",
      找: "附近的人",
      坑: "★★ 拉美和东欧的假号重灾区"
    }, {
      名: "Jaumo",
      型: "约会",
      她: "德国 / 东欧 / 中东",
      找: "滑卡、打招呼",
      坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
    }, {
      名: "Lovoo",
      型: "约会",
      她: "★ 德语区专用",
      找: "滑卡、打招呼",
      坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
    }, {
      名: "Skout",
      型: "约会",
      她: "东南亚 / 拉美底层用得多",
      找: "附近的人",
      坑: "★★ 诈骗号极多"
    }, {
      名: "Tagged",
      型: "约会",
      她: '老站。偏"随便玩玩"',
      找: "滑卡、打招呼",
      坑: "死站了，但还有人在"
    }, {
      名: "MeetMe",
      型: "约会",
      她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
      找: "附近 + 直播",
      坑: "低龄化，★ 注意边界"
    }, {
      名: "AdultFriendFinder",
      型: "约炮",
      她: "★★ 老牌约炮站，明说是为了性",
      找: "直接搜、直接私信",
      坑: "★★★ 假号率极高。很多是男的在聊"
    }, {
      名: "Alt.com",
      型: "约炮",
      她: "AFF 的 BDSM 分支",
      找: "同好筛选",
      坑: "★★★ 假号率极高。很多是男的在聊"
    }, {
      名: "Passion.com",
      型: "约炮",
      她: "明说了为了性的账号。★ 但十有八九是假的",
      找: "直接私信",
      坑: "★★★ 假号率极高。很多是男的在聊"
    }, {
      名: "BeNaughty",
      型: "约炮",
      她: "明说了为了性的账号。★ 但十有八九是假的",
      找: "直接私信",
      坑: "★ 付费才能看消息"
    }, {
      名: "Flirt.com",
      型: "约炮",
      她: "东欧 → 西欧",
      找: "直接私信",
      坑: "★★★ 大量是 chatter（代聊）在演"
    }, {
      名: "FriendFinder-X",
      型: "约炮",
      她: "明说了为了性的账号。★ 但十有八九是假的",
      找: "直接私信",
      坑: "★★★ 假号率极高。很多是男的在聊"
    }, {
      名: "Doublelist",
      型: "同城",
      她: "★★ Craigslist 关掉 personals 之后的替代",
      找: "按城市进分类版",
      坑: "★★ 男人比女人多十倍"
    }, {
      名: "Locanto",
      型: "同城",
      她: "★ 全球分类广告，成人版块极活跃",
      找: "按城市 + 分类",
      坑: "★★ 东南亚 / 拉美的假广告重灾区"
    }, {
      名: "Skokka",
      型: "外围",
      她: "★★ 拉美 / 欧洲的外围目录",
      找: "按城市翻",
      坑: "★★★ 照片全是假的，电话是真的"
    }, {
      名: "Vivastreet",
      型: "外围",
      她: "★ 英国 / 法国 / 西班牙",
      找: "按城市翻目录",
      坑: "大量是中介挂的"
    }, {
      名: "Chaturbate",
      型: "直播",
      她: "★ 免费房 + 私密房。★★ 一个 token 就能让她做一件具体的事",
      找: "按标签 / 按地区筛",
      坑: "★ 免费区永远在钓你进私密房"
    }, {
      名: "Stripchat",
      型: "直播",
      她: "★ 画质高，VR 房多。东欧 / 拉美主播多",
      找: "按标签进房",
      坑: "★★ 多半是工作室（背后有人打字）"
    }, {
      名: "BongaCams",
      型: "直播",
      她: "★ 东欧 / 俄罗斯主播最集中",
      找: "按标签进房",
      坑: "★★ 工作室化最严重的一家"
    }, {
      名: "LiveJasmin",
      型: "直播",
      她: "★ 高端站，主播素质高，价格也高",
      找: "按标签进房",
      坑: "★★ 贵。而且很多是演"
    }, {
      名: "MyFreeCams",
      型: "直播",
      她: "一个正在开播的房间。★ 她实时在，但她的注意力是按秒卖的",
      找: "按标签进房",
      坑: "老站，人少了"
    }, {
      名: "CamSoda",
      型: "直播",
      她: "★ 偏互动、偏定制",
      找: "按标签进房",
      坑: "★ 免费区的所有动作都是为了让你充钱进私密房"
    }, {
      名: "Flirt4Free",
      型: "直播",
      她: "★ 一对一为主",
      找: "按标签进房",
      坑: "★ 一对一很贵"
    }, {
      名: "ImLive",
      型: "直播",
      她: "一个正在开播的房间。★ 她实时在，但她的注意力是按秒卖的",
      找: "按标签进房",
      坑: "★ 免费区的所有动作都是为了让你充钱进私密房"
    }, {
      名: "Streamate",
      型: "直播",
      她: "★ 按分钟计费",
      找: "按标签进房",
      坑: "★★ 计时器一转，人就慌"
    }, {
      名: "Jerkmate",
      型: "直播",
      她: "★ 游戏化的直播站",
      找: "按标签进房",
      坑: "价格不透明"
    }, {
      名: "Cam4",
      型: "直播",
      她: "一个正在开播的房间。★ 她实时在，但她的注意力是按秒卖的",
      找: "按标签进房",
      坑: "★ 免费区的所有动作都是为了让你充钱进私密房"
    }, {
      名: "Cherry.tv",
      型: "直播",
      她: "★ 新兴。主播分账高，所以人往这边跑",
      找: "按标签进房",
      坑: "★ 免费区的所有动作都是为了让你充钱进私密房"
    }, {
      名: "OnlyFans",
      型: "订阅",
      她: "★★ 她自己的号。她定价、她定尺度、她定你能看什么",
      找: "从推特 / IG / 抖音引流过来",
      坑: "★★★ 大量是 chatter（代聊）在演她。★ 你以为在跟她聊，其实是一个男的在打字"
    }, {
      名: "Fansly",
      型: "订阅",
      她: "★ OF 的竞品。尺度更宽",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "ManyVids",
      型: "订阅",
      她: "★ 卖单条视频，不订阅",
      找: "按标签搜",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "JustFor.Fans",
      型: "订阅",
      她: "★ 男同 / 跨性别内容多",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "Loyalfans",
      型: "订阅",
      她: "★ 有视频通话功能",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "FanCentro",
      型: "订阅",
      她: '★ 主打"她给你发私信"',
      找: "从推特 / IG 引流过来",
      坑: "★ 私信多半是代聊"
    }, {
      名: "iWantClips",
      型: "订阅",
      她: "★ 恋物向定制视频",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "Clips4Sale",
      型: "订阅",
      她: "★ 最老的定制视频站",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "PocketStars",
      型: "订阅",
      她: "支付友好，东欧用得多",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "Passes",
      型: "订阅",
      她: "★ 一个订阅看多个号",
      找: "从推特 / IG 引流过来",
      坑: "★★ 私信多半是代聊团队在回。★ 他们会记住你的偏好"
    }, {
      名: "SextPanther",
      型: "服务",
      她: "★★ 一对一文字 / 电话。按分钟计费",
      找: "按标签挑，按分钟聊",
      坑: "★★ 基本全是代聊团队"
    }, {
      名: "NiteFlirt",
      型: "服务",
      她: "★ 电话为主的老站",
      找: "按标签挑，按分钟聊",
      坑: "★★ 按分钟计费的，话术都练过。★ 她们的目标是让你多聊十分钟"
    }, {
      名: "Phrendly",
      型: "服务",
      她: "★ 只聊天，不见面",
      找: "按标签挑，按分钟聊",
      坑: "★ 按条计费"
    }, {
      名: "Pornhub",
      型: "视频",
      她: "★★ 全球最大。素人上传 + 工作室",
      找: "按标签 / 按地区搜",
      坑: '★ 2020 年删掉了所有未验证用户的内容 —— 现在"素人"少了很多'
    }, {
      名: "XVideos",
      型: "视频",
      她: "★★ 体量最大，最杂",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "XNXX",
      型: "视频",
      她: "★ XVideos 的兄弟站",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "xHamster",
      型: "视频",
      她: '★ 有"附近的人"功能',
      找: "按标签 / 按地区",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "RedTube",
      型: "视频",
      她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "YouPorn",
      型: "视频",
      她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "SpankBang",
      型: "视频",
      她: "★ 素人 / 业余内容多",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "Beeg",
      型: "视频",
      她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "Eporner",
      型: "视频",
      她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "TXXX",
      型: "视频",
      她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
      找: "按标签搜",
      坑: "盗版 / 聚合站。★ 上传者不一定有授权"
    }, {
      名: "Motherless",
      型: "视频",
      她: "★★ 几乎无审查。什么都有",
      找: "按标签搜",
      坑: "★★★ 内容边界极宽 —— ★ 本卡不写这一档"
    }, {
      名: "ThisVid",
      型: "视频",
      她: '★ 用户上传，偏"偷拍 / 自拍"',
      找: "按标签搜",
      坑: "★★ 大量是未经同意上传的"
    }, {
      名: "Reddit",
      型: "论坛",
      她: "★★★ 欧美真正的约炮地。★ r/gonewild、r/dirtyr4r、各城市的 r4r 版",
      找: "订阅对应 sub，★ 按城市找 r4r",
      坑: "★★ 验证照（手写纸 + 日期 + 用户名）是标配 —— ★ 不带验证的没人理"
    }, {
      名: "4chan",
      型: "论坛",
      她: "★★ /b/ 之类的随机版。完全匿名",
      找: "直接发帖",
      坑: "★★★ 什么都有，包括你不该看的"
    }, {
      名: "Pornolab",
      型: "论坛",
      她: "★★ 俄语区最大的成人论坛",
      找: "注册 + 积分",
      坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
    }, {
      名: "PlanetSuzy",
      型: "论坛",
      她: "★ 老式资源论坛",
      找: "注册 + 攒积分",
      坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
    }, {
      名: "ViperGirls",
      型: "论坛",
      她: "★ 资源 / 素人",
      找: "注册 + 攒积分",
      坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
    }, {
      名: "Seeking",
      型: "包养",
      她: '★★★ 原名 SeekingArrangement。明码标价的"关系"',
      找: "注册要验收入。★ 直接谈条件",
      坑: "★★ 大量是职业外围在上面挂单"
    }, {
      名: "SugarDaddyMeet",
      型: "包养",
      她: "★ 同上，更偏东欧 / 亚洲",
      找: "注册，直接谈条件",
      坑: "★★★ 假号率极高"
    }, {
      名: "WhatsYourPrice",
      型: "包养",
      她: "★★ 你可以直接出价约她 —— 她接受或不接受",
      找: "注册，直接谈条件",
      坑: "★★ 拍卖式的，价格会被抬"
    }, {
      名: "MissTravel",
      型: "包养",
      她: '★★ 用"一起去旅行"包装',
      找: "注册，直接谈条件",
      坑: "★ 很多是纯骗机票"
    }, {
      名: "RichMeetBeautiful",
      型: "包养",
      她: '一个明说了要"条件"的人',
      找: "注册，直接谈条件",
      坑: "★★★ 假号率最高的类型之一。★ 谈钱之前先视频"
    }, {
      名: "Sugarbook",
      型: "包养",
      她: "★ 东南亚 / 马来西亚",
      找: "注册，直接谈条件",
      坑: "★ 在马来被查过"
    }, {
      名: "Ashley Madison",
      型: "已婚",
      她: '★★★ 专做已婚 —— 她的卖点就是"不会纠缠"',
      找: "注册，★ 女性免费男性付费",
      坑: "★★★ 2015 年被脱库，3700 万人的真名被公开。★ 这个阴影还在"
    }, {
      名: "Gleeden",
      型: "已婚",
      她: "★ 法国 / 意大利 / 西班牙的已婚站",
      找: "注册，★ 女性免费男性付费",
      坑: "★ 女性用户里真人比例高于 AM"
    }, {
      名: "Illicit Encounters",
      型: "已婚",
      她: "★ 英国最老的已婚站",
      找: "注册，★ 女性免费男性付费",
      坑: "★ 会验证女性身份 —— 所以真人多"
    }, {
      名: "Victoria Milan",
      型: "已婚",
      她: "★ 北欧 / 南欧",
      找: "注册，★ 女性免费男性付费",
      坑: "★★★ 她的另一半随时可能出现。★ 这条线上没有输赢，只有代价"
    }, {
      名: "FetLife",
      型: "圈内",
      她: "★★★ BDSM / 圈内文化的 Facebook。★ 不是约炮站 —— 是社区",
      找: "加好友、进组、参加 munches（线下聚会）",
      坑: "★★ 规矩多。新手乱发消息会被拉黑"
    }, {
      名: "Recon",
      型: "圈内",
      她: "★ 男同恋物专用",
      找: "按恋物分类",
      坑: "★ 规矩比平台多。★★ 新手乱来会被圈子里通报"
    }, {
      名: "Feeld",
      型: "圈内",
      她: "★★★ 非单偶 / 开放关系 / 三人行专用",
      找: "★ 可以情侣绑定一起找",
      坑: "★ 大城市才有量"
    }, {
      名: "Kasidie / SLS / SDC",
      型: "圈内",
      她: "★★ 换偶（swinger）站，按地区分",
      找: "付费会员 + 参加本地派对",
      坑: "★★ 单男基本进不去"
    }, {
      名: "FabSwingers",
      型: "圈内",
      她: "★ 英国换偶站",
      找: "加组、参加线下聚会",
      坑: "★ 规矩比平台多。★★ 新手乱来会被圈子里通报"
    }, {
      名: "TS4Rent / TS Escorts",
      型: "外围",
      她: "★ 跨性别外围目录",
      找: "按城市翻目录",
      坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
    }, {
      名: "Grindr",
      型: "约会",
      她: "★ 男同。★★ 定位精确到米",
      找: "滑卡、打招呼",
      坑: "★★ 定位可以被截图"
    }, {
      名: "Scruff / Jack'd / Hornet",
      型: "约会",
      她: "★ 男同，按体型 / 族群分。★ 每个 app 的人群不一样",
      找: "看附近、按体型筛",
      坑: "★ 假照片比女同那边多"
    }, {
      名: "Blued",
      型: "约会",
      她: "★★ 中国 / 东南亚男同第一",
      找: "看附近 / 直播",
      坑: "★ 国内被下架过"
    }, {
      名: "Her / Lex",
      型: "约会",
      她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
      找: "滑卡、打招呼",
      坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
    }, {
      名: "Eros",
      型: "外围",
      她: "★★ 美国高端外围目录。★ 照片是真的，价格也是真的",
      找: "按城市翻目录",
      坑: "★★★ 要验 ID。而且它被执法盯过"
    }, {
      名: "Tryst",
      型: "外围",
      她: '★ 新兴，主打"自愿 + 独立"',
      找: "按城市翻目录",
      坑: "★ 相对干净"
    }, {
      名: "Slixa",
      型: "外围",
      她: "★ 高端，偏模特",
      找: "按城市翻目录",
      坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
    }, {
      名: "PrivateDelights",
      型: "外围",
      她: '★ 西海岸用得多，★★ 有"点评"',
      找: "按城市翻目录",
      坑: "★ 点评可能是刷的"
    }, {
      名: "SkipTheGames",
      型: "外围",
      她: "★ 低端，便宜",
      找: "按城市翻目录",
      坑: "★★★ 仙人跳重灾区"
    }, {
      名: "AdultSearch",
      型: "外围",
      她: "一个挂单。★ 按城市、按服务、按价目",
      找: "按城市翻目录",
      坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
    }, {
      名: "EuroGirlsEscort",
      型: "外围",
      她: "★★ 欧洲全覆盖",
      找: "按城市 / 按国家",
      坑: "★★ 中介挂的居多"
    }, {
      名: "Punternet",
      型: "外围",
      她: '★★ 英国。★ 有"punter 点评"文化 —— 客人给从业者打分',
      找: "按城市看点评",
      坑: "★★ 这个点评系统很残酷，但对双方都有约束"
    }, {
      名: "AdultWork",
      型: "外围",
      她: "★★★ 英国最大。★ 从业者自己挂档、自己定价、自己有日历",
      找: "按城市 + 服务筛选",
      坑: "★ 英国用它是半合法的"
    }, {
      名: "TheEroticReview",
      型: "外围",
      她: "★ 美国老点评站",
      找: "付费看点评",
      坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
    }, {
      名: "Telegram",
      型: "私域",
      她: "★★★ 全球地下交易的主战场。★ 频道、群、机器人",
      找: "搜频道 / 要邀请链接",
      坑: '★★ 频道可以买粉，"几万人"的群可能只有几百个真人'
    }, {
      名: "Discord",
      型: "私域",
      她: "★ 小众圈子、游戏圈、恋物圈",
      找: "要邀请链接",
      坑: "★ 有年龄验证的服，也有没有的"
    }, {
      名: "Snapchat",
      型: "私域",
      她: "★★★ 中东 / 保守地区女性的首选 —— 阅后即焚",
      找: "换 snap",
      坑: "★ 但对方可以截屏"
    }, {
      名: "Kik",
      型: "私域",
      她: "★ 老式匿名聊天",
      找: "给用户名",
      坑: "★ 全是bot和骗子"
    }, {
      名: "Signal / Session / Wickr",
      型: "暗网",
      她: "★★ 端到端加密。不留痕",
      找: "洋葱地址 / 邀请链接",
      坑: '★ 用了这个就等于声明"这里面有事"'
    }, {
      名: "暗网市场",
      型: "暗网",
      她: "★★★ 一个挂单。你不知道对面是谁",
      找: "洋葱地址",
      坑: "★★★ 99% 是骗局。剩下 1% 也已经被人盯上了"
    } ];
    const 地区平台 = {
      中国大陆: [ {
        名: "探探 / 陌陌 / Soul",
        型: "约会",
        她: "滑卡、附近的人。★ 陌陌比探探野",
        找: "滑卡、打招呼",
        坑: "★ 大城市用探探，小城市用快手同城"
      }, {
        名: "积目 / 她说",
        型: "约会",
        她: '★ 更年轻、更"门当户对"',
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "微信 / QQ 群",
        型: "私域",
        她: "★★★ 国内真正的主战场。★ 一个 500 人群比任何 app 都真实",
        找: "★ 只能被人拉进去 —— 这是它最难也最值钱的地方",
        坑: "★★ 最难拿，也最危险。群主知道你是谁"
      }, {
        名: "贴吧（特定吧）",
        型: "论坛",
        她: "老式论坛。★ 有些吧早就变味了",
        找: "注册 + 攒积分",
        坑: "★ 有些吧早就变味了"
      }, {
        名: "小红书 / 抖音",
        型: "同城",
        她: '★ 擦边引流。★★ 私信关键词被风控，要靠"评论区暗语"',
        找: "同城 + 关键词",
        坑: "★ 引流到微信就断"
      }, {
        名: "快手同城",
        型: "同城",
        她: "★★ 见面门槛最低，做局也最多",
        找: "同城 + 私信",
        坑: "★★★ 做局重灾区"
      }, {
        名: "微博",
        型: "同城",
        她: "★ 小号。超话里有人",
        找: "超话 + 私信",
        坑: "★★ 男人比女人多十倍，你要抢的是一条新帖"
      }, {
        名: "豆瓣小组",
        型: "论坛",
        她: '★★ 文艺女青年的私密组。"约"字很少出现，但事都在发生',
        找: "入组 + 发帖",
        坑: "★ 组规比什么都严"
      }, {
        名: "知乎",
        型: "论坛",
        她: "★ 回答下面私信",
        找: "特定问题的评论区",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      }, {
        名: "虎扑",
        型: "论坛",
        她: "★★ 步行街。直男浓度最高",
        找: "注册 + 攒积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      }, {
        名: "闲鱼",
        型: "同城",
        她: '★★★ 真的 —— 关键词改了就用它约。★ "陪聊""陪伴""代遛狗"',
        找: "搜暗语关键词",
        坑: "★ 被平台清了无数轮，暗语一直在换"
      }, {
        名: "番茄 / 他趣 / 快猫",
        型: "约炮",
        她: "★ 老式约炮 app，用户年龄偏大",
        找: "直接私信",
        坑: "★★ 机器人极多"
      }, {
        名: "草榴 / 1024",
        型: "论坛",
        她: "★★★ 十年的老站。什么人都有，真的假的掺着",
        找: "邀请码 + 积分",
        坑: "★★ 要邀请码。而且里面有专门钓人的"
      }, {
        名: "91 / 麻豆",
        型: "视频",
        她: "★★ 主要是夫妻自拍 + 工作室",
        找: "投稿区 / 评论区",
        坑: "★ 单男很难进去（91 上发帖要作者认证）"
      }, {
        名: "色中色 / 桃花族",
        型: "论坛",
        她: "一个 ID。★★ 你要从她的发帖史里拼出她是谁",
        找: "注册 + 积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      }, {
        名: "推特（X）",
        型: "私域",
        她: '★★★ 国内作者几乎全在推特。★ 她在这里是"另一个号"',
        找: "搜关键词 + 看关注链",
        坑: "★ 假号、盗图、代聊极多"
      }, {
        名: "洗浴 / KTV / 会所",
        型: "服务",
        她: "★★ 线上版本是【公众号 + 客服微信】",
        找: "熟人带 / 群里问",
        坑: "★★ 没有熟人带，你就是那个被宰的"
      }, {
        名: "外围（本地）",
        型: "外围",
        她: '★★★ 靠经纪人派单。★ 照片是套图，真人是"到店的"',
        找: '★ 要有人拉你进"选妃群"',
        坑: "★★★ 照片和人不对是常态"
      } ],
      中国台湾: [ {
        名: "Dcard（西斯板）",
        型: "论坛",
        她: "★★★ 台湾最大的匿名论坛。★ 西斯板是真名",
        找: "抽卡 + 看板",
        坑: '★ 文体是【长文 + 细节 + 自称"小妹"】'
      }, {
        名: "PTT（SEX 板）",
        型: "论坛",
        她: "★ 老式 BBS。★★ 用户全是老手",
        找: "注册 + 推文",
        坑: "★ 门槛高，但里面的人真懂"
      }, {
        名: "SWAG / 麻豆",
        型: "视频",
        她: "★ 台湾本土视频站",
        找: "按标签搜",
        坑: '★ 很多是"素人"包装'
      }, {
        名: "Line 群",
        型: "私域",
        她: "★★★ 台湾的私域在 Line，不在微信",
        找: "被拉进去",
        坑: "★ 跟微信群一个逻辑"
      }, {
        名: "Tinder / 探探",
        型: "约会",
        她: "★ 台北用得多",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Mobile01",
        型: "论坛",
        她: "★ 不是色情站，但有人用它约",
        找: "注册 + 攒积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      } ],
      中国香港: [ {
        名: "LIHKG（连登）",
        型: "论坛",
        她: "★★ 香港的讨论区",
        找: "注册 + 看台",
        坑: '★ 港式用语（"扑嘢""含𠮶""瘦身"）'
      }, {
        名: "HKGolden 高登",
        型: "论坛",
        她: "★ 更老的论坛",
        找: "注册 + 攒积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      }, {
        名: "Telegram 群",
        型: "私域",
        她: "★★★ 香港的私域主战场",
        找: "要邀请链接",
        坑: "★ 群多，真群少"
      }, {
        名: "OneNight / 交友 app",
        型: "约会",
        她: "★ 本地交友 app",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "141 / 161 架步",
        型: "服务",
        她: "★★ 香港的楼上单位（一楼一凤）★ 半合法",
        找: '看本地论坛的"楼评"',
        坑: "★★ 有真有假，楼评是关键"
      }, {
        名: "澳门",
        型: "服务",
        她: "★★ 走香港那套，但更小、更熟人社会",
        找: "按标签挑，按分钟聊",
        坑: "★ 桑拿是主渠道"
      } ],
      日本: [ {
        名: "ハッピーメール / ワクワクメール",
        型: "约会",
        她: "★★★ 老式出会い系。★ 日本约炮的主战场，用户几百万",
        找: "注册 + 搜附近",
        坑: '★★★ 上面的女性多半是"パパ活"（找干爹）—— ★ 明说了要钱'
      }, {
        名: "PCMAX / イククル",
        型: "约会",
        她: "★ 同上，体量小一点",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Pairs / with / Omiai",
        型: "约会",
        她: "★ 正经交友 app，但约炮多",
        找: "滑卡、打招呼",
        坑: "★ 要验身份，所以真人多"
      }, {
        名: "Twitter（X）裏垢",
        型: "私域",
        她: '★★★ 日本的"裏垢"文化 —— ★ 一个号是日常，另一个号专门发身体。★★ 而两个号之间只差一个搜索词',
        找: "搜关键词 + 看小号链",
        坑: "★ 裏垢被公司发现而社死的案例每年都有"
      }, {
        名: "Instagram 裏アカ",
        型: "私域",
        她: "★ 同上，更私密",
        找: "私密号互关",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "メンズエステ（男士按摩）",
        型: "服务",
        她: "★★ 半套。★ 合法地带，有店面、有价目表",
        找: "网站预约 + 指名",
        坑: '★ 近年有"本番禁止"的行业整顿'
      }, {
        名: "デリヘル（上门）",
        型: "服务",
        她: "★★ 法律边缘。★ 她来你指定的地方",
        找: "网站 + 电话",
        坑: '★ 有"パネマジ"（照片和真人差很多）'
      }, {
        名: "ソープランド",
        型: "服务",
        她: "★★ 部分区域合法（吉原等）",
        找: "街上拉客 / 网站",
        坑: '★ 贵。而且有"ぼったくり"（宰客）'
      }, {
        名: "FC2 / Pornhub 日本区",
        型: "视频",
        她: "★ 个人投稿为主",
        找: "按标签搜",
        坑: "盗版 / 聚合站。★ 上传者不一定有授权"
      }, {
        名: "MissAV / JAV321",
        型: "视频",
        她: "一段已经录好的画面。★ 她不认识你，也不会回应你",
        找: "按标签搜",
        坑: "盗版 / 聚合站。★ 上传者不一定有授权"
      }, {
        名: "DMM / FANZA",
        型: "视频",
        她: "★ 日本最大正版平台",
        找: "按标签搜",
        坑: "★ 要日本支付方式"
      }, {
        名: "5ch / 爆サイ",
        型: "论坛",
        她: '★ 匿名论坛。★ 爆サイ是"地域揭示板"，会写本地店铺评价',
        找: "按地区看板",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      } ],
      韩国: [ {
        名: "카카오톡（KakaoTalk）",
        型: "私域",
        她: "★★★ 韩国的私域就是它",
        找: "换 ID / 进 오픈채팅",
        坑: "★ 开放聊天室可以匿名进"
      }, {
        名: "네이버 카페 / 밴드",
        型: "论坛",
        她: "★ 匿名咖啡馆",
        找: "注册 + 攒积分",
        坑: '★ 有些要"等级"才能看隐藏版'
      }, {
        名: "랜덤채팅（随机聊天）",
        型: "约炮",
        她: "★★ 韩国特色 —— 随机匹配陌生人",
        找: "直接私信",
        坑: "★★ 未成年人多 —— ★ 本卡成年红线"
      }, {
        名: "위피 / 아만다 / 글램",
        型: "约会",
        她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "오피（OP / 按摩）",
        型: "服务",
        她: "★★ 韩国的半套店",
        找: "网站 + 电话",
        坑: "★★ 被查过很多轮"
      }, {
        名: "룸싸롱 / 텐프로",
        型: "服务",
        她: "★ 酒 + 女侍",
        找: "按标签挑，按分钟聊",
        坑: "★★ 公司聚餐文化的延伸"
      }, {
        名: "Telegram",
        型: "暗网",
        她: "★★★ N 号房事件之后，Telegram 在韩国成了【禁忌】的代名词。★ 而这反而让它在某个圈子里更好用",
        找: "频道链接",
        坑: "★★★ 碰这个等于自杀"
      }, {
        名: "디시인사이드",
        型: "论坛",
        她: "一个 ID。★★ 你要从她的发帖史里拼出她是谁",
        找: "注册 + 攒积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      } ],
      泰国: [ {
        名: "ThaiFriendly",
        型: "约会",
        她: "★★★ 泰国最大的约会站，本地人为主",
        找: "注册 + 搜附近",
        坑: '★ 上面很多是"找赞助"的'
      }, {
        名: "Line",
        型: "私域",
        她: "★★★ 泰国的私域就是 Line（不是微信）",
        找: "换 ID",
        坑: '★ 可以看"已读"'
      }, {
        名: "Pantip",
        型: "论坛",
        她: "★ 泰国最大的论坛",
        找: "注册 + 攒积分",
        坑: "★ 积分和等级是硬门槛。★★ 新人发帖容易被当骗子"
      }, {
        名: "Tinder / Bumble",
        型: "约会",
        她: "★ 曼谷、芭提雅用得多",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Nana / Cowboy / Soi 6",
        型: "服务",
        她: "★★★ 曼谷三大区",
        找: "直接进店",
        坑: "★ 但真正的本地玩法在【外府】—— 不是游客区"
      }, {
        名: "泰浴 / 按摩",
        型: "服务",
        她: "★★ 有完整的价目和流程",
        找: "街上 / 网站",
        坑: "★ 游客价和本地价差三倍"
      }, {
        名: "OnlyFans 泰国区",
        型: "订阅",
        她: "一个她自己的号。★ 她定价、她定尺度、她定你能看什么",
        找: "推特引流",
        坑: "★ 很多是代聊"
      } ],
      越南: [ {
        名: "Zalo",
        型: "私域",
        她: "★★★ 越南的国民 app，等于微信",
        找: "要邀请链接",
        坑: "★ 会显示已读和在线状态"
      }, {
        名: "Tinder / Bumble",
        型: "约会",
        她: "★★ 胡志明、河内用得多",
        找: "滑卡、打招呼",
        坑: '★ 上面"找赞助"的极多 —— ★★ 越南叫"糖爹"'
      }, {
        名: "cà phê ôm（抱咖）",
        型: "服务",
        她: "★★ 半套。★ 有店面、有女生排班",
        找: "街上 / 本地论坛",
        坑: "★ 游客价和本地价差三倍"
      }, {
        名: "按摩（massage）",
        型: "服务",
        她: '★ 从正经到全套都有。★ 分" massa khỏe"（正经）和别的',
        找: "街上 / 网站",
        坑: "★ 要问清价，问不清就是被宰"
      }, {
        名: "Karaoke（karaoke ôm）",
        型: "服务",
        她: '★★ 越南特色的"抱唱"',
        找: "按标签挑，按分钟聊",
        坑: "★ 酒水是主要利润"
      }, {
        名: "Facebook 群 / 本地论坛",
        型: "私域",
        她: "★ 本地群。★★ 越南人用 FB 比用 Zalo 还多",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "em 文化",
        型: "包养",
        她: '★★★ 年轻女孩找年长男性的关系。★ "em"是称呼，也是身份',
        找: "Tinder / FB",
        坑: "★★ 越南的价钱比泰国低，而竞争更狠"
      } ],
      菲律宾: [ {
        名: "Facebook 群",
        型: "私域",
        她: "★★★ 菲律宾的私域是 FB，不是别的。★ 公开度极高 —— 她的真名、家人、工作都在上面",
        找: "搜群 + 加好友",
        坑: "★ 所以反而好查。★★ 也所以她要格外小心"
      }, {
        名: "Facebook Dating",
        型: "约会",
        她: "★ FB 内置的约会功能，用的人极多",
        找: "在 FB 里开",
        坑: '★ 会推给"可能认识的人"'
      }, {
        名: "Tinder / Badoo / Omegle",
        型: "约会",
        她: "★ 城市用得多",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "PinaLove / FilipinoCupid",
        型: "约会",
        她: "★★ 专门给外国人找菲律宾人的站",
        找: "注册 + 搜",
        坑: '★★★ 大量是假的，或者背后是"家族作业"'
      }, {
        名: "Sugarbook / Seeking",
        型: "包养",
        她: "★ 马尼拉、宿务用得多",
        找: "注册，直接谈条件",
        坑: "★★★ 假号率最高的类型之一。★ 谈钱之前先视频"
      }, {
        名: "Walk-in（KTV / 按摩）",
        型: "服务",
        她: "★★ 马尼拉的 KTV 和按摩是主要渠道",
        找: "街上 / 熟人带",
        坑: '★★ 有"加项"套路'
      }, {
        名: "PISO 文化（20 比索）",
        型: "服务",
        她: "★★★ 底层女性为了很小的钱。★★ 而这也是【在线代聊】最集中的地方",
        找: "按标签挑，按分钟聊",
        坑: "★★★ 这一档只写处境"
      }, {
        名: "在线代聊（chatter）",
        型: "代聊",
        她: '★★★ 你在西方平台上聊的"她"，背后可能是一个马尼拉的男的',
        找: "—",
        坑: "★★★ 这是一个产业。★★ 他们一天要回几百个人"
      }, {
        名: "TG / WhatsApp",
        型: "私域",
        她: "★ 谈价目的时候用",
        找: "要邀请链接",
        坑: "★ 会显示已读"
      } ],
      印尼_马来西亚: [ {
        名: "MiChat",
        型: "约炮",
        她: "★★ 印尼本地聊天 app，★★ 约炮用得多。★ 可以扫附近",
        找: "附近的人",
        坑: '★★ 假号多，而且很多是"加钱才见面"'
      }, {
        名: "BeeTalk",
        型: "约炮",
        她: "★ 泰国做的，在印尼 / 马来很流行",
        找: "附近的人",
        坑: "★★★ 假号率极高。很多是男的在聊"
      }, {
        名: "Telegram",
        型: "私域",
        她: "★★★ 穆斯林国家的色情主要在地下 —— ★ 而地下就是 TG",
        找: "群链接 / 频道",
        坑: "★★★ 宗教警察真的存在。★★ 印尼和马来西亚都有过突击查处"
      }, {
        名: "WhatsApp",
        型: "私域",
        她: "★ 谈价、发照片",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Tinder / Bumble",
        型: "约会",
        她: "★ 雅加达 / 吉隆坡的都市中产",
        找: "滑卡、打招呼",
        坑: "★ 穆斯林女性用这个要冒风险"
      }, {
        名: "Tantan / Omi",
        型: "约会",
        她: "★ 东南亚版探探",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Kaskus / 佳礼（Cari）",
        型: "论坛",
        她: "★ 印尼 / 马来最大的论坛，成人版块在地下",
        找: "注册 + 积分",
        坑: "要本地语言"
      }, {
        名: "本地玩法",
        型: "服务",
        她: "★★ 地下 + 熟人介绍 + 现金。★ 没有线上目录",
        找: "按标签挑，按分钟聊",
        坑: "★★★ 外人进不去 —— 而进去了就是被盯上"
      }, {
        名: "KTV / 按摩（本地）",
        型: "服务",
        她: "★ 雅加达、泗水、吉隆坡有",
        找: "按标签挑，按分钟聊",
        坑: '★★ 有"清真"伪装的门面'
      } ],
      新加坡: [ {
        名: "Telegram",
        型: "私域",
        她: "★★★ 新加坡的私域。★ 群的质量比别的国家高 —— 因为要审核",
        找: "群链接 / 介绍",
        坑: "★ 好群进不去，烂群一堆"
      }, {
        名: "Tinder / Bumble / Coffee Meets Bagel",
        型: "约会",
        她: "★★ 用得多，但★ 竞争激烈",
        找: "滑卡、打招呼",
        坑: "★ 体面人设很重要 —— ★ 新加坡人先看职业"
      }, {
        名: "Geylang（芽笼）",
        型: "服务",
        她: "★★ 合法红灯区（特定巷）",
        找: "按标签挑，按分钟聊",
        坑: '★ 但本地中产不用它 —— ★★★ 他们用 Telegram 群和"介绍"'
      }, {
        名: "Sammyboy Forum",
        型: "论坛",
        她: '★★★ 新加坡最有名的成人论坛 —— ★ 有完整的"场评"和"妹评"',
        找: "注册 + 看版",
        坑: "★ 里面的人极其挑剔，而且会互相通报骗子"
      }, {
        名: "Seeking / Sugarbook",
        型: "包养",
        她: '★ 新加坡的包养文化偏"高端"',
        找: "注册，直接谈条件",
        坑: "★ Sugarbook 在马来被查过"
      }, {
        名: "KTV / 夜店（本地）",
        型: "服务",
        她: '★ 有"陪坐"文化',
        找: "按标签挑，按分钟聊",
        坑: "★★ 消费极高"
      }, {
        名: "JB（新山）",
        型: "服务",
        她: "★★★ 新加坡男人过境去马来西亚 —— ★ 这是公开的秘密",
        找: "按标签挑，按分钟聊",
        坑: "★ 便宜，但风险在新山那边"
      } ],
      欧美: [ {
        名: "Tinder / Bumble / Hinge",
        型: "约会",
        她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
        找: "滑卡、打招呼",
        坑: "★ 欧美的核心是【明确同意 + 明码标价】—— 开场直接说想要什么，绕弯子会被当成不诚实"
      }, {
        名: "Reddit r4r",
        型: "同城",
        她: "★★★ 欧美真正的约炮地。★ 每个城市有自己的 r4r 版",
        找: "订阅本地 sub",
        坑: "★★ 验证照（手写纸 + 日期）是标配"
      }, {
        名: "FetLife",
        型: "圈内",
        她: "★★ BDSM 社区",
        找: "加组 + 参加 munch",
        坑: "★ 规矩多"
      }, {
        名: "Feeld",
        型: "圈内",
        她: "★★★ 非单偶 / 三人行",
        找: "滑卡（可情侣绑定）",
        坑: "★ 大城市才有量"
      }, {
        名: "OnlyFans / Fansly",
        型: "订阅",
        她: "一个她自己的号。★ 她定价、她定尺度、她定你能看什么",
        找: "从推特引流",
        坑: "★★★ 大量代聊"
      }, {
        名: "Seeking",
        型: "包养",
        她: '★★★ sugar daddy 平台 —— ★ 明码标价的"关系"',
        找: "验收入 + 直接谈",
        坑: "★★ 职业外围也在上面"
      }, {
        名: "Ashley Madison / Gleeden",
        型: "已婚",
        她: "★★ 已婚专用",
        找: "注册，★ 女性免费男性付费",
        坑: "★★★ AM 被脱库过，阴影还在"
      }, {
        名: "AdultWork（英国）",
        型: "外围",
        她: "★★★ 英国最大。★ 从业者自己挂档、自己定价、自己有日历",
        找: "按城市筛服务",
        坑: "★ 英国用它半合法"
      }, {
        名: "Chaturbate / Stripchat",
        型: "直播",
        她: "一个正在开播的房间。★ 她实时在，但她的注意力是按秒卖的",
        找: "按标签进房",
        坑: "★ 免费区永远在钓你进私密房"
      }, {
        名: "Kaufmich（德语区）",
        型: "外围",
        她: "★★ 德国 / 奥地利 / 瑞士",
        找: "按城市翻目录",
        坑: "★ 德国合法，所以相对透明"
      }, {
        名: "Kinky.nl / Sexjobs（荷兰）",
        型: "外围",
        她: "★★ 荷兰合法橱窗的线上版",
        找: "按城市翻目录",
        坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
      }, {
        名: "Wannonce / Sexemodel（法国）",
        型: "外围",
        她: "一个挂单。★ 按城市、按服务、按价目",
        找: "按城市翻目录",
        坑: "★ 法国法律上罚的是客人"
      }, {
        名: "Berghain / KitKat（柏林）",
        型: "圈内",
        她: "★★★ 真实存在的性俱乐部 —— ★ 是一种生活方式，不是景点",
        找: "排队 + 通过门卫",
        坑: "★ 门卫不让你进就是不让你进"
      } ],
      俄语区_东欧: [ {
        名: "Telegram",
        型: "私域",
        她: "★★★ 俄语区的私域就是 TG，而且最野",
        找: "频道链接",
        坑: "★ 频道能买粉"
      }, {
        名: "VK（VKontakte）",
        型: "约会",
        她: '★★ 俄罗斯的 Facebook。★ 它有自己的"约会"版块',
        找: "搜附近 + 群",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Odnoklassniki（OK）",
        型: "约会",
        她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
        找: "群 + 私信",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Mamba / LovePlanet",
        型: "约会",
        她: "★ 老式约会站",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "содержанка（被包养）",
        型: "包养",
        她: "★★★ 明码标价文化",
        找: "专门站 + TG 群",
        坑: "★ 这是社会接受度较高的一个词"
      }, {
        名: "在线代聊（chatter）",
        型: "代聊",
        她: '★★★ 摩尔多瓦 / 乌克兰 —— ★ 欧洲最穷的地区之一。★★ 你在西方平台聊的"她"，背后可能是一个基辅的男的',
        找: "—",
        坑: "★★★ 这一档不写过程"
      }, {
        名: "邮件新娘（mail-order bride）",
        型: "包养",
        她: "★★ 东欧的成熟产业",
        找: "注册，直接谈条件",
        坑: "★★ 骗局率高"
      } ],
      中东_海湾: [ {
        名: "Snapchat",
        型: "私域",
        她: "★★★ 中东女性最常用的 —— 阅后即焚",
        找: "换 snap",
        坑: "★ 但对方可以截屏"
      }, {
        名: "Telegram",
        型: "私域",
        她: "★★★ 中东的私域，★★ 而且是最敢的地方",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Instagram finsta",
        型: "私域",
        她: "一个群里的昵称。★★ 群是半熟人社会，谁在说话大家都记得",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Tinder（迪拜）",
        型: "约会",
        她: "★ 有，★★ 但八成是外围 / 骗子",
        找: "滑卡、打招呼",
        坑: '★★ 迪拜的"陪游"产业 —— 明码标价，¥5000 起'
      }, {
        名: "沙特 / 卡塔尔",
        型: "服务",
        她: "★★★ 女性单独见面几乎不可能",
        找: "玩法是【线上 + 视频 + 绝不落地】",
        坑: "★★★ 只要被发现，代价是毁灭性的"
      }, {
        名: "sigheh（临时婚姻）",
        型: "服务",
        她: "★★ 伊朗 —— 什叶派的法律概念。★ 被大量用于掩盖短期关系",
        找: "宗教渠道",
        坑: "★ 有期限，要登记"
      }, {
        名: "伊斯坦布尔",
        型: "服务",
        她: "★ 相对开放，★★ 伊斯坦布尔是中东的柏林",
        找: "网站 / 街上",
        坑: "★★ 按分钟计费的，话术都练过。★ 她们的目标是让你多聊十分钟"
      } ],
      南亚: [ {
        名: "WhatsApp",
        型: "私域",
        她: "★★★ 印度的私域就是它",
        找: "要邀请链接",
        坑: "★ 会显示已读"
      }, {
        名: "ShareChat / Moj",
        型: "同城",
        她: "★ 印度本土短视频",
        找: "按城市进分类版",
        坑: "★★ 男人比女人多十倍，你要抢的是一条新帖"
      }, {
        名: "Instagram DM",
        型: "私域",
        她: "一个群里的昵称。★★ 群是半熟人社会，谁在说话大家都记得",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Aisle / Woo / TrulyMadly",
        型: "约会",
        她: "★ 印度本土约会 app",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "本地玩法",
        型: "服务",
        她: "★★★ 种姓 / 宗教 / 家庭结构决定一切。★★ 包办婚姻背景下 —— 婚前性行为是禁忌",
        找: "极度的地下 + 极度的快",
        坑: "★★★ 被发现 = 家族层面的灾难"
      }, {
        名: "巴基斯坦 / 孟加拉",
        型: "私域",
        她: "★★★ 更保守，★★ 但线上更敢",
        找: "WhatsApp / TG",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      } ],
      拉美: [ {
        名: "WhatsApp",
        型: "私域",
        她: "★★★ 拉美的私域就是它（不是 Telegram）",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Instagram DM",
        型: "私域",
        她: "★★ 拉美女性用 IG 比任何 app 都多",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Tinder",
        型: "约会",
        她: "★★★ 巴西是全球 Tinder 使用率最高的国家之一",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "Badoo / Skout",
        型: "约会",
        她: "★ 拉美用得多",
        找: "滑卡、打招呼",
        坑: "★★ 假号重灾区"
      }, {
        名: "programa（节目）",
        型: "外围",
        她: '★★ 巴西的暗语，就是"约"',
        找: "WhatsApp 直问",
        坑: "★★ 价格要靠谈"
      }, {
        名: "prepago（预付）",
        型: "外围",
        她: "★ 哥伦比亚 / 墨西哥的明码标价",
        找: "街上 / 网站",
        坑: '★★ 照片是套图，真人是"到店的"。★ 电话是真的，人不一定是'
      }, {
        名: "narco 文化",
        型: "服务",
        她: "★★★ 哥伦比亚 —— ★ 女人用身体换保护",
        找: "按标签挑，按分钟聊",
        坑: "★★★ 这一档只写处境，不写过程"
      }, {
        名: "funk 舞会",
        型: "同城",
        她: "★★ 巴西贫民窟的性文化是公开的",
        找: "社区活动",
        坑: "★ 外人进去有风险"
      }, {
        名: "Mileroticos / Photoacompanhantes",
        型: "外围",
        她: "★ 拉美本地外围目录",
        找: "按城市翻目录",
        坑: "★ 照片假"
      } ],
      非洲: [ {
        名: "WhatsApp",
        型: "私域",
        她: "★★★ 非洲的私域就是它",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Facebook 群",
        型: "私域",
        她: "★★ 尼日利亚 / 肯尼亚用得多",
        找: "要邀请链接",
        坑: '★ 群人数可以刷。★★ "几万人"的群可能只有几百个真人'
      }, {
        名: "Tinder",
        型: "约会",
        她: "一个滑卡里的圆。★ 她要先看你顺不顺眼",
        找: "滑卡、打招呼",
        坑: "★ 照片和真人差距是常态。视频通话能过滤掉一半"
      }, {
        名: "blesser（施恩者）",
        型: "包养",
        她: "★★★ 南非的专有名词 —— ★ 年长富有的男性 + 年轻女性，★★ 明码标价，社会接受度高",
        找: "专门站 + IG",
        坑: "★★★ 假号率最高的类型之一。★ 谈钱之前先视频"
      }, {
        名: "runs girl（跑的女孩）",
        型: "包养",
        她: '一个明说了要"条件"的人',
        找: "IG / WhatsApp",
        坑: "★★★ 假号率最高的类型之一。★ 谈钱之前先视频"
      }, {
        名: "sponsor（赞助人）",
        型: "包养",
        她: "★★ 肯尼亚文化",
        找: "注册，直接谈条件",
        坑: "★★★ 假号率最高的类型之一。★ 谈钱之前先视频"
      }, {
        名: "M-Pesa 直转",
        型: "服务",
        她: "★★★ 移动支付直接转账 —— ★★ 交易极其直白，没有中间环节",
        找: "按标签挑，按分钟聊",
        坑: "★★ 这也是【跨国代聊】的另一大来源地"
      } ],
      暗网_跨地区: [ {
        名: "Telegram 私密频道",
        型: "暗网",
        她: "★★★ 真正的跨国交易在这儿",
        找: "邀请链接",
        坑: "★★ 频道人数可以刷"
      }, {
        名: "Discord",
        型: "暗网",
        她: "一个完全陌生、没有任何身份信息的对面",
        找: "洋葱地址 / 邀请链接",
        坑: "★★★ 99% 是骗局。剩下 1% 也已经被人盯上了"
      }, {
        名: "暗网市场",
        型: "暗网",
        她: "★★★ 各类挂单",
        找: "洋葱地址",
        坑: "★★★ 99% 是骗局"
      }, {
        名: "Signal / Session / Wickr",
        型: "暗网",
        她: "一个完全陌生、没有任何身份信息的对面",
        找: "洋葱地址 / 邀请链接",
        坑: '★ 用了它就等于声明"这里面有事"'
      }, {
        名: "跨国圈子",
        型: "暗网",
        她: "★★★ 不看平台，看【圈子】。★ 一个圈子里可能有越南、乌克兰、巴西的人。★★ 共同语言是英语 + 图片 + 价格",
        找: "被人拉进去",
        坑: "★★★ 这一档不写过程、不写细节"
      } ]
    };
    const 地区别名 = {
      大陆: "中国大陆",
      中国: "中国大陆",
      北京: "中国大陆",
      上海: "中国大陆",
      广州: "中国大陆",
      深圳: "中国大陆",
      成都: "中国大陆",
      杭州: "中国大陆",
      台湾: "中国台湾",
      台北: "中国台湾",
      高雄: "中国台湾",
      香港: "中国香港",
      港: "中国香港",
      澳门: "中国香港",
      东京: "日本",
      大阪: "日本",
      京都: "日本",
      名古屋: "日本",
      日本: "日本",
      首尔: "韩国",
      釜山: "韩国",
      韩国: "韩国",
      曼谷: "泰国",
      芭提雅: "泰国",
      清迈: "泰国",
      泰国: "泰国",
      胡志明: "越南",
      河内: "越南",
      越南: "越南",
      马尼拉: "菲律宾",
      菲律宾: "菲律宾",
      印尼: "印尼_马来西亚",
      马来西亚: "印尼_马来西亚",
      吉隆坡: "印尼_马来西亚",
      雅加达: "印尼_马来西亚",
      新加坡: "新加坡",
      美国: "欧美",
      纽约: "欧美",
      洛杉矶: "欧美",
      英国: "欧美",
      伦敦: "欧美",
      德国: "欧美",
      法国: "欧美",
      巴黎: "欧美",
      荷兰: "欧美",
      阿姆斯特丹: "欧美",
      意大利: "欧美",
      西班牙: "欧美",
      加拿大: "欧美",
      北欧: "欧美",
      瑞士: "欧美",
      柏林: "欧美",
      慕尼黑: "欧美",
      俄罗斯: "俄语区_东欧",
      莫斯科: "俄语区_东欧",
      乌克兰: "俄语区_东欧",
      基辅: "俄语区_东欧",
      摩尔多瓦: "俄语区_东欧",
      波兰: "俄语区_东欧",
      迪拜: "中东_海湾",
      沙特: "中东_海湾",
      卡塔尔: "中东_海湾",
      阿联酋: "中东_海湾",
      伊朗: "中东_海湾",
      土耳其: "中东_海湾",
      伊斯坦布尔: "中东_海湾",
      黎巴嫩: "中东_海湾",
      印度: "南亚",
      巴基斯坦: "南亚",
      孟加拉: "南亚",
      斯里兰卡: "南亚",
      巴西: "拉美",
      墨西哥: "拉美",
      哥伦比亚: "拉美",
      圣保罗: "拉美",
      里约: "拉美",
      阿根廷: "拉美",
      智利: "拉美",
      南非: "非洲",
      尼日利亚: "非洲",
      肯尼亚: "非洲",
      埃塞俄比亚: "非洲",
      拉各斯: "非洲",
      内罗毕: "非洲",
      开普敦: "非洲",
      暗网: "暗网_跨地区",
      跨地区: "暗网_跨地区"
    };
    function 该地区的平台(地区, 位置 = "") {
      const 全 = `${地区} ${位置}`;
      const 命中 = [];
      const 已加 = new Set;
      for (const [别名, 键] of Object.entries(地区别名)) {
        if (全.includes(别名) && 地区平台[键]) {
          for (const p of 地区平台[键]) {
            if (!已加.has(p.名)) {
              命中.push(p);
              已加.add(p.名);
            }
          }
        }
      }
      if (!命中.length) {
        for (const p of 地区平台["中国大陆"]) 命中.push(p);
      }
      return 命中;
    }
    function 全球分类() {
      const out = {};
      for (const p of 全球平台) (out[p.型] ??= []).push(p);
      return out;
    }
    function 平台统计() {
      const 地区数 = Object.keys(地区平台).length;
      const 地区总数 = Object.values(地区平台).reduce((s, a) => s + a.length, 0);
      return {
        全球: 全球平台.length,
        地区种类: 地区数,
        地区平台总数: 地区总数,
        合计: 全球平台.length + 地区总数,
        类型数: new Set([ ...全球平台, ...Object.values(地区平台).flat() ].map(p => p.型)).size
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/平台特色.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      全特色表: () => 全特色表,
      她在这怎么说话: () => 她在这怎么说话,
      平台特色表: () => 平台特色表,
      找平台特色: () => 找平台特色,
      特色统计: () => 特色统计,
      补充特色表: () => 补充特色表
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./平台实样 */ "./src/神奇手机/神奇手机/核心/平台实样.ts");
    const 平台特色表 = [ {
      名: "草榴 / 1024",
      说话: '★★ 中年男性口吻的"圈内话"。★ 短、糙、爱用省略号。★★ 女生在那边会用"小女子""本宫"这类自嘲',
      节奏: "★ 慢。先跟帖、再私信、再换联系方式。★★ 直接要微信会被挂",
      自我认知: '★ "我在一个老站上。"★ 她的自我形象是"老司机里少数的女的"',
      破事: "★★★ 必须先发帖混脸熟。★ 求资源 = 被当骗子。★ 而且版主删帖不看理由",
      称呼: "「楼主」「老哥」「兄弟」",
      样本: [ "楼主你这帖子我上个月见过一样的……", "别急着加微信，先说说你自己什么情况", "★ 这地方我待了六年了。你要是想玩真的，规矩得懂", "（她回了一句就没再回。三天后才又冒出来）" ]
    }, {
      名: "探探 / 陌陌",
      说话: "★★ 短、平、快。★ 大量语气词和表情。★★ 她的简介是模板，但她的第一句话会暴露她",
      节奏: '★ 快。匹配上就直接聊。★★ 但"愿意聊"不等于"愿意见"',
      自我认知: '★ "我在随便看看。"—— ★ 大部分时候这是真的',
      破事: "★★ 男的比女的多十倍。★ 所以她的消息栏是爆的 —— 她不回你是常态，不是她讨厌你",
      称呼: "「你」「小哥哥」（★ 这个字已经贬值了）",
      样本: [ "在干嘛呢", "哈哈", "（已读，没回。两天后突然来一句）你上次说的那个地方在哪", "★ 别一上来就问我住哪。你知道有多少人问过吗" ]
    }, {
      名: "快手同城",
      说话: "★★ 方言口音重。★ 句子短、错别字多、爱用语音。★★ 真人感最强，也最危险",
      节奏: '★★ 快。★ "约不约"三个字就够',
      自我认知: '★ "我就是发着玩。"',
      破事: "★★★ 做局最多的地方。★ 同城见面 = 你进她的主场",
      称呼: "「哥」「老铁」「宝」",
      样本: [ "哥你在哪呢", "发个语音听听", "★ 是你说要来的啊。我这边几个人都在呢" ]
    }, {
      名: "微信群 / QQ 群",
      说话: "★★★ 半熟人社会的说话方式。★ 有称呼、有客套、有分寸。★★ 而且所有人都看得见",
      节奏: "★ 中。先在群里说话，再私加。★★ 直接私加会被当广告",
      自我认知: '★ "群里的。"★ 她不是来约的，她是来待着的',
      破事: '★★★ 群主是唯一权威。★ 而且群里会有"老人"盯着新人',
      称呼: "「群主」「各位」「@某人」",
      样本: [ "@所有人 今晚老地方，来的报个名", "（她只发过一个表情，但她的头像是本人）", "★ 新来的？先看看群规", "群主说这个群不许发链接，你要发就私聊" ]
    }, {
      名: "小红书",
      说话: '★★ 精致、克制、照片永远过曝。★ 她要"体面"',
      节奏: "★ 慢。评论 → 私信 → 微信。★★ 每一步都要有理由",
      自我认知: '★★ "我不是那种人。"—— ★ 而且她要说服自己这是真的',
      破事: '★★ 关键词被风控。★ 要靠"评论区暗语"接头。★★ 而且她会随时删号',
      称呼: "「姐妹」「宝子」「你」",
      样本: [ "这家店我也去过的！", "私你啦", "★ 我不加陌生人的。你说你是做什么的", "（她把那条笔记删了。号还在，但内容空了）" ]
    }, {
      名: "闲鱼",
      说话: "★★★ 完全伪装成交易的说话方式。★★ 全是暗语，而且暗语一直在换",
      节奏: "★ 快。★ 拍下 → 私聊 → 改价 → 线下",
      自我认知: '★ "我在卖东西。"★ 这句话她自己都不信，但她需要这个壳',
      破事: "★★★ 平台天天清。★ 你今天用的词明天就死了。★★ 而且有专人钓鱼",
      称呼: "「亲」「买家」「老板」",
      样本: [ "亲，这个还有货的，私聊", "★ 描述里不好写，你懂的", "要的话拍下改价。别在平台里说别的", "（她下架了。十分钟后换了个标题重新上架）" ]
    }, {
      名: "豆瓣小组",
      说话: '★★★ 文艺、长句、爱引诗。★ 她会说"身体"不说"约"。★★ 而且她真的会打字打很长',
      节奏: "★★ 很慢。先发帖 → 有人呼应 → 私信 → 见面。★ 快的要几周",
      自我认知: '★★ "我在寻找一种更真诚的关系。"',
      破事: "★★ 组规比什么都严。★ 一句话说错就被踢。★★ 而且她们内部有鄙视链",
      称呼: "「豆友」「你」",
      样本: [ "我最近在读一本讲身体的随笔，有点被击中。", '★ 我不太喜欢"约"这个字。它太轻了', '（她写了八百字。最后一句是"如果你想见我，明天下午三点，那个书店")' ]
    }, {
      名: "Dcard 西斯板",
      说话: '★★★ 长文、细节、自称"小妹"或"我"。★ 有情绪铺垫，有心理活动。★★ 台湾腔',
      节奏: "★ 慢。★ 她写三千字，你回三百字。★★ 回太少她会不高兴",
      自我认知: '★★ "我在分享。"★ 她要的是被读，不只是被约',
      破事: '★★ 抽卡机制。★ 而且那边的人极其在意"你有没有认真读"',
      称呼: "「卡友」「你」「小妹」「西斯人」",
      样本: [ "西斯首po，鞭小力一点", "★★ 那天之后我一直在想那件事。想了三个礼拜才写下来", '（她回了很长一段。中间有一句"其实我那天有点怕")', "卡友你回得好少喔" ]
    }, {
      名: "PTT SEX 板",
      说话: "★ 极简、老派、爱用推文。★★ 全是熟人梗",
      节奏: '★ 中。★★ 但那里的"老人"会先看你的 ID 注册时间',
      自我认知: '★ "我是乡民。"',
      破事: "★★ 推文文化。★ 一句话会被推爆或者嘘爆",
      称呼: "「大大」「乡民」「原po」",
      样本: [ "推", "→ 这 ID 好菜", "嘘 又在幻想", "★ 原po站内信我" ]
    }, {
      名: "LIHKG 连登",
      说话: "★★★ 港式粤语、极快、极刻薄。★ 大量缩写和音译",
      节奏: "★★ 快。★ 但语气要跟得上",
      自我认知: '★ "我是连登仔/连登女。"',
      破事: "★★★ 刻薄是这里的礼节。★ 你不够狠就融不进去",
      称呼: "「巴打」「丝打」「Ching」",
      样本: [ "扑嘢啫，讲咁多做乜", "★ 巴打好波", "丝打你几岁呀", "（她一句话就让你噎住了。你笑了。她也笑了）" ]
    }, {
      名: "Twitter 裏垢（日本）",
      说话: "★★★ 极其礼貌 + 极其直接。★★ 敬语和露骨内容同时出现 —— 这是日本特有的",
      节奏: "★★ 快。★ DM 一开就是正题。★ 但礼貌不能丢",
      自我认知: '★★ "这是我的另一个号。"★ 她清楚地知道自己在做两个自己',
      破事: "★★★ 本垢和裏垢之间只差一个搜索词。★ 而且有人专门去扒这个",
      称呼: "「お兄さん」「〇〇さん」「あなた」",
      样本: [ "はじめまして。DMありがとうございます", "★ そういうことなら、直接お会いしたほうが早いですね", "（她用的是最标准的敬语。内容却是最直接的那种）", "うちの近くにいい店があるんですけど、知ってますか" ]
    }, {
      名: "ハッピーメール / ワクワクメール",
      说话: "★ 商业化的礼貌。★★ 她会很清楚地谈条件 —— 但用很客气的说法",
      节奏: "★★ 快。★ 前三条消息就在谈钱",
      自我认知: '★★ "我在找パパ。"★ 她不隐瞒，只是不说那个词',
      破事: '★★★ 上面女性多半是"パパ活"。★ 明说了要钱，但不明说数字',
      称呼: "「パパ」「お兄さん」",
      样本: [ "お手当ての話、先にしておきますね", "★ 月に何回くらい会えますか", "（她的第一封邮件就写了三千日元起的餐费 —— 用最客气的语气）" ]
    }, {
      名: "メンズエステ",
      说话: "★★ 服务业话术。★ 有固定的敬语模板。★★ 但真人会有破绽",
      节奏: "★★★ 不聊。★ 这是店，不是社交",
      自我认知: '★ "我在上班。"',
      破事: '★★ "本番禁止"是行业红线。★ 越线的店会被查',
      称呼: "「お客様」",
      样本: [ "お疲れ様です。本日はご指名ありがとうございます", "★ 力加減、どうですか", "（她一句多余的话都没有。但她的手停了一下）", "（时间到。她起身，鞠躬，像什么都没发生）" ]
    }, {
      名: "KakaoTalk",
      说话: "★★ 短、快、大量表情包。★ 敬语和半语随时切换 —— ★★ 那是一个信号",
      节奏: "★★ 中。★ 但她换半语的那一刻就是信号",
      自我认知: '★ "我朋友的朋友介绍的。"',
      破事: '★★★ 韩国的私域靠"介绍"。★ 没人介绍你进不去',
      称呼: "「오빠（哥哥）」「씨」",
      样本: [ "오빠 뭐해요", "ㅋㅋㅋㅋ", "（她一开始用敬语。聊到第三天才换成半语）", "★ 이건 여기서 말하면 안 돼요" ]
    }, {
      名: "랜덤채팅",
      说话: "★ 完全随机。★ 没有铺垫，没有身份",
      节奏: "★★★ 极快。★ 开就是开",
      自我认知: '★ "我在打发时间。"',
      破事: "★★ 未成年人多 —— ★★ 本卡成年红线，一律不写",
      称呼: "「ㅎㅇ」「누구세요」",
      样本: [ "ㅎㅇ", "몇살이세요", "（对面报了一个年龄。你犹豫了一下）" ]
    }, {
      名: "ThaiFriendly",
      说话: "★★ 英语 + 泰语的混合。★ 短句为主。★★ 会用很多 emoji",
      节奏: "★★ 中。★ 前几条就问你待多久、住哪",
      自我认知: '★★ "我在找一个能照顾我的人。"',
      破事: '★★ 上面很多是"找赞助"的。★ 而且真的会有人照顾你 —— 那是她们的工作',
      称呼: "「พี่（哥哥）」「you」「darling」",
      样本: [ "Hello. Where you stay?", "★ You come Thailand long time?", "พี่ใจดีจัง（哥哥你人真好）", "（她发了一张照片。是她在夜市吃的烤串，不是自拍）", "My family need money. Sorry I tell you this" ]
    }, {
      名: "Zalo（越南）",
      说话: "★ 越南语为主。★★ 用 em 自称 —— ★ 那是一种示弱",
      节奏: "★★ 中。★ 但她先要确认你是认真的",
      自我认知: '★ "我在找一个对我好的。"',
      破事: "★★ 越南的价钱比泰国低，而竞争更狠。★ 所以她会很努力",
      称呼: "「anh（哥）」「em（妹妹自称）」",
      样本: [ "Anh ăn cơm chưa?（哥吃饭了吗）", "em không biết nói tiếng Anh nhiều", "★ Anh có thật lòng không?（哥是认真的吗）", '（她发来一句话。翻译过来是"我不敢想太多")' ]
    }, {
      名: "Facebook 群（菲律宾）",
      说话: "★★★ 英语为主，混塔加洛语。★ 极其热情，感叹号很多。★★ 而且家里人都看得到",
      节奏: "★★ 快。★ 但会很快提到家人",
      自我认知: '★ "我在帮家里。"',
      破事: "★★★ 她的 FB 是真名。★ 她妈妈会在下面点赞。★★ 所以她会格外小心",
      称呼: "「Kuya（哥）」「dear」「honey」",
      样本: [ "Hi kuya! Thank you for the message!", "★ My mother is sick. I need help", "God bless you po", "（她发了全家福。四个孩子，一个妈妈。她站在最右边）" ]
    }, {
      名: "MiChat（印尼）",
      说话: '★ 印尼语为主，很短。★★ 大量"加钱的试探"',
      节奏: "★★ 快。★ 三句话就谈价",
      自我认知: '★ "我在做生意。"',
      破事: "★★★ 宗教警察真的存在。★★ 所以每一句话都可能被截图",
      称呼: "「mas（哥）」「abang」",
      样本: [ "mas mau ketemu?", "★ transfer dulu ya（先转账哦）", "（她发了一张照片。名字、地址、价格，全在一张图上）" ]
    }, {
      名: "Tinder（欧美）",
      说话: "★★★ 直接、幽默、有分寸。★★ 开场直接说想要什么 —— 绕弯子会被当成不诚实",
      节奏: "★ 中。★ 匹配 → 聊两三天 → 约咖啡",
      自我认知: '★ "我在 date。"',
      破事: "★★ 照片和真人差距是常态。★ 而且她们真的会扭头就走",
      称呼: "「you」「hun」「babe」",
      样本: [ "Not looking for anything serious. You?", "★ So what are you actually into", "I have a rule: coffee first. Non-negotiable", "（她说完这句就笑了。你也笑了。你们都知道接下来是什么）" ]
    }, {
      名: "Reddit r4r",
      说话: '★★★ 结构化、诚实、信息密度极高。★★ 会先把"要什么、不要什么"列清楚',
      节奏: "★★ 中。★ 但要先发验证照",
      自我认知: '★ "我在明确地说我要什么。"',
      破事: "★★★ 不发验证照 = 没人回。★★ 而且验证照要手写纸 + 日期 + 用户名",
      称呼: "「you」「OP」",
      样本: [ "30M4F, [City], verified. Looking for something ongoing, not a ONS", "★ No pic, no reply. That's the rule here", "I'll send verification first. Then we talk", "（她的消息里没有一句废话。你甚至觉得有点像在工作）" ]
    }, {
      名: "FetLife",
      说话: "★★★ 极其讲究措辞。★ 会主动问 consent 和边界。★★ 用词精确到像法律文件",
      节奏: "★★★ 很慢。★ 要先在群里说话、参加 munch、被人认识",
      自我认知: '★★ "我属于这个 community。"',
      破事: "★★★ 刚注册就群发私信 = 永久黑名单。★ 这是圈内的铁律",
      称呼: "「you」「kinkster」",
      样本: [ "Before anything: what are your hard limits?", "★ Have you been to a munch? No? Then let's start there", "I don't play with people I haven't met in public first", "（她说这些话的时候语气很平。但每一句都是门槛）" ]
    }, {
      名: "Seeking",
      说话: '★★ 半商业、半浪漫。★ 有礼貌但有距离。★★ 会明确谈"安排"',
      节奏: "★ 中。★ 前三条就谈 allowance",
      自我认知: '★★ "我在找一段有支持的 relationship。"',
      破事: "★★★ 职业外围也在上面挂单。★ 所以她的第一句就是筛人",
      称呼: "「dear」「you」",
      样本: [ "What are you looking for on here?", "★ I'm not an escort. I want something consistent", "Let's talk about allowance before we meet. I don't waste time", "（她穿得很得体。你甚至忘了这是个什么平台）" ]
    }, {
      名: "Ashley Madison",
      说话: '★★★ 克制、谨慎、带点愧疚。★★ 她的第一句往往是"我不知道我在干什么"',
      节奏: "★ 慢。★★ 而且她会反复犹豫",
      自我认知: '★★★ "我结婚了。"★ 这四个字是这条线的全部张力',
      破事: "★★★ 2015 年脱库的事她一定知道。★ 所以她极度谨慎",
      称呼: "「you」",
      样本: [ "I've never done this before. I don't even know why I'm here", "★ Can we not talk about our real lives? Please", "My husband thinks I'm at the gym", "（她发完这句就下线了。两天后才回）" ]
    }, {
      名: "Chaturbate",
      说话: "★★ 表演性的、商业化的、重复的。★ 但对每个人单独说的话是真的",
      节奏: "★★★ 极快。★ 一句话就能让她做一件具体的事",
      自我认知: '★ "我在工作。"',
      破事: "★★ 免费区的所有动作都是为了让你充钱。★ 而且她会记得你的 ID",
      称呼: "「guys」「babe」「[用户名]」",
      样本: [ "Welcome back, [name]. Long time", "★ Tip for that? You know the rules", "（她做了一件事。然后立刻看向屏幕，看有多少人打赏）", "（她笑着说了声谢谢，然后转向下一个名字）" ]
    }, {
      名: "Telegram（俄语区）",
      说话: '★★ 直接、粗、不客套。★★ 而且话里有一层"我们都不傻"的默契',
      节奏: "★★ 快。★ 三句话进入正题",
      自我认知: '★ "我在这个频道里。"',
      破事: '★★ 频道人数可以买。★★ 而且"几万人的群"可能只有几百个真人',
      称呼: "「ты」「брат」",
      样本: [ "ты откуда", "★ сколько", "（她只回了三个字。你懂了）", "не пиши сюда больше. другой аккаунт" ]
    }, {
      名: "VK",
      说话: "★ 俄语为主。★★ 比 TG 正式一点",
      节奏: "★ 中。★ 先看你的主页",
      自我认知: '★ "我在看我的动态。"',
      破事: "★★ 主页是公开的。★ 所以她会先扒你",
      称呼: "「вы」（敬语）",
      样本: [ "Я посмотрела вашу страницу", "★ У вас интересная жизнь", "（她的主页只有三张照片。全是风景）" ]
    }, {
      名: "Snapchat（中东）",
      说话: "★★★ 极短。★★ 大量语音和照片，很少打字 —— ★ 因为文字会留下痕迹",
      节奏: "★★ 中。★ 但她会反复试探",
      自我认知: '★★★ "我不能被看到。"',
      破事: "★★★ 阅后即焚 —— 但对方可以截屏。★★ 而截屏的后果是毁灭性的",
      称呼: "「habibi」「you」",
      样本: [ "（一段三秒的语音。只有呼吸声）", "（一张照片：酒店房间，没有脸，只拍了窗帘）", "★ Don't screenshot. I'm serious", "（她连着发了七条，然后全删了）" ]
    }, {
      名: "Tinder（迪拜）",
      说话: "★★ 英语为主。★ 客气但目的明确",
      节奏: "★★ 快。★ 但会先确认你是本地人还是游客",
      自我认知: '★★ "我在找 sponsor。"',
      破事: "★★ 八成是外围 / 骗子。★ 而且真有真人 —— 那是陪游",
      称呼: "「babe」「dear」",
      样本: [ "Are you here for long?", "★ I don't do dinners. Straight to the point", '（她报了一个数字。你还没反应过来，她就补了一句"一晚"）' ]
    }, {
      名: "WhatsApp（拉美）",
      说话: "★★★ 葡萄牙语 / 西班牙语。★ 极度热情，emoji 极多。★★ 而且非常直接",
      节奏: "★★★ 极快。★ 第一句可能就是这个",
      自我认知: '★★ "我在找一个 programa。"★ 这个词是暗语，也是身份',
      破事: '★★ 她们不觉得"骚"是贬义。★ 所以你会发现自己才是那个拘谨的',
      称呼: "「amor」「gato」「você」",
      样本: [ "Oi gato, tudo bem?", "★ Você quer programa?", "（她发了一段语音，笑了。你没听懂。但你知道她在逗你）", "meu corpo é meu, eu faço o que quero" ]
    }, {
      名: "WhatsApp（非洲）",
      说话: "★★ 英语 / 法语 / 斯瓦希里语混合。★ 直接谈钱",
      节奏: "★★★ 极快。★ M-Pesa 直接转账 —— ★★ 没有中间环节",
      自我认知: '★★ "我在找一个 sponsor。"',
      破事: '★★★ 交易极其直白。★ 而这个"直白"让很多外国人接受不了',
      称呼: "「my dear」「sweetie」",
      样本: [ "Hi my dear, how are you today", "★ I need transport money. Can you send", "（她发来一个 M-Pesa 号码。没有别的话）", "God bless you. You are a good man" ]
    }, {
      名: "OnlyFans",
      说话: "★★★ 模板化 + 个性化。★ 开头永远是同一句（★ 因为是代聊），但会有专属昵称",
      节奏: '★ 慢。★ 要"养"你 —— 一周、两周、一个月',
      自我认知: '★★ "这是我的 business。"',
      破事: "★★★ 大量是 chatter（代聊）在演她。★★ 他们一天要回几百个人，所以有固定脚本",
      称呼: "「babe」「[你的昵称]」",
      样本: [ "Hey babe, missed you today 💕", "★ You're my favorite, you know that?", "（她回消息的时间永远是同一个小时。★ 因为那是轮班时间）", "（她说了一句很私人的话。三分钟后，另一个账号收到了同样的一句）" ]
    }, {
      名: "暗网市场",
      说话: "★★ 极简、纯交易。★ 没有一句废话",
      节奏: "★★★ 不聊。★ 只有货、价、地址",
      自我认知: '★ "我在做一笔生意。"',
      破事: "★★★ 99% 是骗局。★★ 而且那 1% 也已经被人盯上了",
      称呼: "—",
      样本: [ "«100% discreet. No questions.»", "BTC only. Escrow available.", "（对方回了三行字。没有称呼，没有标点）" ]
    } ];
    function 转(名, 实) {
      const 样本 = 实.实样.split("\n").map(x => x.trim()).filter(x => x && !x.startsWith("（")).slice(0, 4);
      return {
        名,
        说话: 实.她 + (样本[0] ? ` ｜ 她开口像这样：${样本[0]}` : ""),
        节奏: 实.找,
        自我认知: 实.她 + (实.画像 ? " ★ " + 实.画像 : ""),
        破事: [ 实.坑, 实.识别 ].filter(Boolean).join(" ｜ "),
        称呼: "你",
        样本: 实.实样.split("\n").map(x => x.trim()).filter(Boolean)
      };
    }
    const 手写名s = new Set(平台特色表.map(x => x.名));
    const 补充特色表 = Object.entries(___WEBPACK_IMPORTED_MODULE_0__["平台实样总"]).filter(([名]) => {
      if (手写名s.has(名)) return false;
      for (const h of 手写名s) {
        if (h.includes(名) || 名.includes(h)) return false;
      }
      return true;
    }).map(([名, 实]) => 转(名, 实));
    const 补缺表 = [ {
      名: "Reddit",
      说话: '★★ 英语。★ 匿名但语法讲究。★★ "r4r" 是它的密码',
      节奏: "★★ 中。★ 先发帖，等人 DM",
      自我认知: '★★ "我在 r/[城市]r4r 上。"',
      破事: "★★★ 男女比极不平衡 —— ★ 男性发帖会被淹没",
      称呼: "「M4F」「F4M」",
      样本: [ "（帖）`M4F`：", "★ 30m, downtown, host. Pic for pic", "（她回了一条，只有坐标和时间。没有寒暄）" ]
    }, {
      名: "陌陌",
      说话: '★★ 比探探年轻。★★ 群组文化重 —— 她的语言是"局"',
      节奏: '★★ 快。★ 但先有一层"集体"',
      自我认知: '★ "我在找个局。"',
      破事: "★★ 群主抽成 —— 「进群要交钱」在这里是常态",
      称呼: "「哥」「姐妹」",
      样本: [ "今晚有局吗", "我们群里几个人在××", "（群里很吵。她一直没私聊你，但每次你说话她都接）" ]
    }, {
      名: "微信",
      说话: "★★ 短句、连发、爱撤回。★★ 语音条很长",
      节奏: '★★ 慢。★★ 从"加微信"到"见到人"还隔着几道',
      自我认知: '★★★ "我在国内真正的主战场。"',
      破事: "★★ 群主知道你是谁。★★ 加进来就断不了了",
      称呼: "「哥」「宝」",
      样本: [ "加个微信聊", "（她发了个语音，28 秒。你点开听了两遍）", "（撤回）", "算了 当我没说" ]
    }, {
      名: "QQ 群",
      说话: "★★ 比微信群放得开 —— ★★ 因为 QQ 可以匿名",
      节奏: "★★★ 极快。★ 进群就要你自证",
      自我认知: '★ "我在一个匿名群里。"',
      破事: "★★★ 未成年人多 —— ★★ 这一条要极度小心",
      称呼: "「新人」「老哥」",
      样本: [ "新人报三围", "（群公告比群消息更能说明这个群是什么）", "发图不露脸 谢谢配合" ]
    }, {
      名: "1024",
      说话: '★ 和草榴同源，但更偏"技术 + 资源"',
      节奏: "★★ 慢。★ 要积分",
      自我认知: '★ "我在一个老站上。"',
      破事: "★★★ 门槛比草榴高，但也更真实",
      称呼: "「楼主」",
      样本: [ "（帖）`楼主`：验证过了", '（回帖全是简短的"感谢分享"。没有人多说一个字）' ]
    }, {
      名: "ワクワクメール",
      说话: "★★ 日语。★ 客气但直接。★★ 用点数换算一切",
      节奏: "★★ 中。★ 比ハッピーメール慢",
      自我认知: '★★ "我在这个站上找。"',
      破事: "★★ サクラ多。★★ 免费点数更少",
      称呼: "「お兄さん」「あなた」",
      样本: [ "会ってから決めます", '（她说"见面再决定"。在这个站上，这句话是好信号）' ]
    }, {
      名: "카카오톡（KakaoTalk）",
      说话: "★★★ 韩语。★★ 敬语和半语是两套人格。★★ 大量表情包",
      节奏: "★★★ 快。★ 换 Kakao = 关系成立",
      自我认知: '★★ "我在 Kakao 上。"',
      破事: "★★★ 韩国人不用 Kakao 加人 = 不想跟你继续",
      称呼: "「오빠」「언니」",
      样本: [ "카톡 아이디 뭐예요", "（她换了半语。这是明确的信号）", "ㅋㅋㅋ" ]
    }, {
      名: "오피",
      说话: "★★ 韩语。★ 极度程式化（★ 因为它是行业）",
      节奏: "★★★ 不聊。★ 只有时间、价格、地址",
      自我认知: '★★ "我在上班。"',
      破事: "★★★ 被查过很多轮。★★ 오피 / 키스방 / 텐프로 三个词不能混",
      称呼: "「사장님」",
      样本: [ "오피 가시면", "（她报了时长和价格。中间没有任何一句多余的话）" ]
    }, {
      名: "OnlyFans 泰国区",
      说话: "★★ 泰英混用。★ 礼貌但商业",
      节奏: "★★ 中。★ 订阅后才私聊",
      自我认知: '★★ "我在经营一个主页。"',
      破事: "★★ 有的收了钱不发内容",
      称呼: "「sir」「ka」",
      样本: [ "Tip me pls 🙏", "（她发了三张预览。第四张是锁着的）" ]
    }, {
      名: "Walk-in",
      说话: "★ 菲律宾英语。★ 热情、直接",
      节奏: "★★ 快。★ 走进去就有",
      自我认知: '★ "我在 KTV 上班。"',
      破事: "★ 和 bar 体系重叠 —— ★ 常常是同一批人",
      称呼: "「sir」「kuya」",
      样本: [ "Sir, KTV?", "（她拉了一下你的袖子。动作很轻）" ]
    }, {
      名: "Hinge",
      说话: '★★ 英语。★ 从"资料里的问答"入场。★★ 语法比 Tinder 讲究',
      节奏: "★★ 中。★ 点赞 → 评论 → 聊",
      自我认知: '★★ "我在找一个认真的关系。"★ 但约炮率最高',
      破事: "★★ 照片真实度比 Tinder 高 —— ★★ 所以更难装",
      称呼: "「you」",
      样本: [ "你的 prompt 写得挺好的", "（她评论了你的第三个回答。那是最私人的一个）" ]
    } ];
    const 全特色表 = [ ...平台特色表, ...补缺表, ...补充特色表 ];
    function 找平台特色(名) {
      if (!名) return null;
      const 精 = 平台特色表.find(x => x.名 === 名);
      if (精) return 精;
      return 平台特色表.find(x => 名.includes(x.名.slice(0, 4)) || x.名.includes(名.slice(0, 4))) ?? null;
    }
    function 她在这怎么说话(平台) {
      const f = 找平台特色(平台);
      if (!f) {
        return {
          说话: "★ 用这个站的人该有的语气 —— 不要所有站都写成一样",
          节奏: "中",
          自我认知: "★ 看她是什么人，不是看她用什么 app",
          破事: "★ 每个站都有它自己的规矩",
          称呼: "你",
          样本: []
        };
      }
      return {
        说话: f.说话,
        节奏: f.节奏,
        自我认知: f.自我认知,
        破事: f.破事,
        称呼: f.称呼,
        样本: f.样本
      };
    }
    function 特色统计() {
      return {
        平台数: 平台特色表.length,
        样本总数: 平台特色表.reduce((s, x) => s + x.样本.length, 0)
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/平台等级.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      可购买: () => 可购买,
      基础积分: () => 基础积分,
      实付价格: () => 实付价格,
      实际积分: () => 实际积分,
      平台表: () => 平台表,
      当前站级: () => 当前站级,
      手机加速倍率: () => 手机加速倍率,
      权限快照: () => 权限快照,
      还要几次: () => 还要几次
    });
    const 平台表 = {
      草榴: {
        名: "草榴 / 1024",
        形态: "论坛",
        涨级方式: "积分。发帖 / 回帖 / 被加精。★ 手机能刷得快",
        积分来源: "发帖、回帖、被加精",
        分级: [ {
          积分: 0,
          开出: "能看帖，不能发主题"
        }, {
          积分: 20,
          开出: "能发主题帖（★ 新号发的没人看）",
          能买: "搜索"
        }, {
          积分: 60,
          开出: "能发私信",
          能买: "改名卡"
        }, {
          积分: 150,
          开出: "★ 私信有人回了 —— 第一道质变",
          能买: "匿名发帖"
        }, {
          积分: 400,
          开出: "能进隐藏版块",
          能买: "邀请码（★ 能卖钱）"
        }, {
          积分: 900,
          开出: "★ 加精权（他能把一个帖子顶上去）",
          能买: "置顶位"
        }, {
          积分: 2e3,
          开出: "★★ 版主级 —— 能决定别人能不能进",
          能买: "封人"
        } ],
        认证: '真人认证标记 —— ★ 有了它，"圈内人"这三个字就成立了',
        独有: "邀请码经济。★ 一个码能卖钱，所以有人专门做这个",
        她的风险: "★ 帖子可能被她老公看到 —— 这是这个站最常见的事故"
      },
      暗网: {
        名: "暗网市场",
        形态: "洋葱网络市场",
        涨级方式: "★ 不靠发帖 —— 靠交易次数和担保人",
        积分来源: "交易完成、被评价",
        分级: [ {
          积分: 0,
          开出: "能浏览商品"
        }, {
          积分: 10,
          开出: "能下单（★ 需要先存币）",
          能买: "基础商品"
        }, {
          积分: 50,
          开出: '能进"不问"类商品',
          能买: "证件类"
        }, {
          积分: 200,
          开出: "★ 有担保人就能进私密区",
          能买: "定制服务"
        }, {
          积分: 800,
          开出: "★★ 能当担保人（★ 这是权力不是消费）",
          能买: "开自己的店"
        } ],
        认证: "担保人制度 —— ★ 没有担保，钱再多也进不去",
        独有: "★ 评级系统是唯一的信任来源",
        她的风险: "★★ 她的资料一旦上架，永远下不来"
      },
      91: {
        名: "91",
        形态: "视频站",
        涨级方式: "投稿 / 被收藏 / 被顶",
        积分来源: "投稿、收藏、点赞",
        分级: [ {
          积分: 0,
          开出: "能看，不能投"
        }, {
          积分: 15,
          开出: "能投稿（★ 要过审）"
        }, {
          积分: 60,
          开出: "能发系列",
          能买: "自删权"
        }, {
          积分: 200,
          开出: "★ 有作者标签",
          能买: "首页推荐位"
        }, {
          积分: 600,
          开出: "★★ 认证作者 —— 他发的有人等",
          能买: "置顶"
        } ],
        认证: "作者认证 —— ★ 要真人露脸视频",
        独有: "★ 搬运横行：同一个视频能被换十个标题",
        她的风险: "★★ 视频删不掉 —— 这是这个站的核心恐怖"
      },
      OnlyFans: {
        名: "OnlyFans",
        形态: "订阅制",
        涨级方式: "★ 不靠等级 —— 靠订阅数",
        积分来源: "订阅费（★ 直接是钱）",
        分级: [ {
          积分: 0,
          开出: "能订阅别人",
          能买: "订阅"
        }, {
          积分: 10,
          开出: "★ 能开自己的号（要身份验证）",
          能买: "推广位"
        }, {
          积分: 50,
          开出: "★ chatter 代聊（★★ 这个平台最值钱的机制）"
        }, {
          积分: 300,
          开出: "★★ 能雇 chatter 团队"
        } ],
        认证: "★ 身份验证（★ 唯一硬门槛，手机免掉）",
        独有: "★★ chatter —— 号主不在的时候，专业代聊在扮演她",
        她的风险: "★ 身份验证意味着真名和证件在平台上"
      },
      Chaturbate: {
        名: "Chaturbate",
        形态: "直播",
        涨级方式: "★ 按时长和打赏，不靠等级",
        积分来源: "代币（★ 按分钟计费）",
        分级: [ {
          积分: 0,
          开出: "能看公开房间"
        }, {
          积分: 20,
          开出: "能私聊秀（★ 只有你，但按分钟付费）"
        }, {
          积分: 120,
          开出: "★ 能点播（他指定她做什么）"
        }, {
          积分: 600,
          开出: "★★ 能当房管"
        } ],
        认证: "年龄验证（★ 手机免掉）",
        独有: "★★ 房间可能有一千人，但私聊秀里她只有你 —— ★ 而那是因为你付费",
        她的风险: "★ 录屏 —— 这是这个站唯一真正的问题"
      },
      Telegram: {
        名: "Telegram",
        形态: "私域",
        涨级方式: '★ 不靠等级 —— 靠"被拉进群"',
        积分来源: "无（★ 它是通道不是市场）",
        分级: [ {
          积分: 0,
          开出: "能看公开频道"
        }, {
          积分: 5,
          开出: "能进公开群"
        }, {
          积分: 30,
          开出: '能进"门槛群"（★ 要交会费或者验资）'
        }, {
          积分: 150,
          开出: '★ 能进"只进不出"的私密群'
        }, {
          积分: 500,
          开出: "★★ 能建群（★ 这才是权力）"
        } ],
        认证: "★ 无 —— 这是它最好的部分，谁都能开号",
        独有: "★★ 门槛群：交钱进去，规则写在群里，违反就踢",
        她的风险: "★ 截图 —— 群里人多了，就一定有人截图"
      },
      推特: {
        名: "推特 X",
        形态: "社交",
        涨级方式: "★ 靠粉丝数，不靠积分",
        积分来源: "订阅（★ 蓝标要付费）",
        分级: [ {
          积分: 0,
          开出: "能发推、能私信"
        }, {
          积分: 10,
          开出: "能开黄推（★ 有风险，会限流）"
        }, {
          积分: 50,
          开出: "★ 蓝标 —— 私信权限打开"
        }, {
          积分: 200,
          开出: "★ 能开付费订阅"
        }, {
          积分: 800,
          开出: "★★ 能被推荐 —— 曝光量级变化"
        } ],
        认证: "蓝标（★ 花钱就有 —— 所以手机能直接买）",
        独有: "★★ 公开引流 → 私域转化 —— 这是它最真实的用法",
        她的风险: "★ 推文删了，截图还在"
      },
      探探: {
        名: "探探 / Tinder",
        形态: "滑卡",
        涨级方式: "★★ 没有等级 —— 只有曝光权重",
        积分来源: "付费提升曝光",
        分级: [ {
          积分: 0,
          开出: "能滑、能匹配、能聊"
        }, {
          积分: 10,
          开出: "★ 加量（多滑几个）",
          能买: "加速"
        }, {
          积分: 40,
          开出: "★ 能看到谁右滑了你",
          能买: "回看"
        }, {
          积分: 120,
          开出: "★ 能改定位（★ 手机本来就免掉）",
          能买: "虚拟定位"
        }, {
          积分: 300,
          开出: "★★ 优先展示",
          能买: "首页曝光"
        } ],
        独有: '★★ 它的玩法是"量"—— 同时挂着，等。★ 不是技巧，是概率',
        她的风险: '★ 她说"我只在探探上" —— 而这句话常常是假的'
      },
      小红书: {
        名: "小红书",
        形态: "种草",
        涨级方式: "★ 靠笔记质量和粉丝",
        积分来源: "无（★ 只有流量）",
        分级: [ {
          积分: 0,
          开出: "能发笔记"
        }, {
          积分: 10,
          开出: '★ 能发"擦边"（★ 被删率高）'
        }, {
          积分: 50,
          开出: "★ 能挂私信"
        }, {
          积分: 200,
          开出: "★★ 能引流到私域（★ 这是唯一的目标）"
        } ],
        独有: "★★ 被删率高 —— ★ 所以她的号是消耗品",
        她的风险: "★★ 实名注册 —— 删号也没用，平台记得"
      },
      抖音: {
        名: "抖音 / 快手同城",
        形态: "短视频 + 直播",
        涨级方式: "★ 靠粉丝和打赏",
        积分来源: "打赏、直播",
        分级: [ {
          积分: 0,
          开出: "能刷视频"
        }, {
          积分: 10,
          开出: "★ 能开直播"
        }, {
          积分: 50,
          开出: "★ 能加粉丝群"
        }, {
          积分: 200,
          开出: "★ 榜一 —— 能私信主播"
        }, {
          积分: 800,
          开出: "★★ 能被主播记住名字"
        } ],
        独有: '★★ 同城 —— 这个功能把"线上"和"线下"直接对接起来了',
        她的风险: "★★ 同城意味着她邻居能刷到她"
      },
      微信: {
        名: "微信私域",
        形态: "熟人",
        涨级方式: '★★ 没有等级 —— 只有"她同不同意"',
        积分来源: "转账（★ 直接是钱）",
        分级: [ {
          积分: 0,
          开出: "加好友（★ 最难的一步）"
        }, {
          积分: 5,
          开出: "★ 能看朋友圈（★ 真正了解她的开始）"
        }, {
          积分: 30,
          开出: "★ 能语音"
        }, {
          积分: 100,
          开出: "★★ 能视频 —— 最后一道关"
        } ],
        认证: "★ 实名。★★ 这是全卡最硬的一道 —— 手机也免不掉她的实名",
        独有: "★★ 朋友圈是她的另一张脸 —— 而那张脸常常和聊天里不是一个人",
        她的风险: "★★ 转账记录 —— 而她老公能查"
      },
      快手同城: {
        名: "快手同城",
        形态: "短视频 + 同城",
        涨级方式: "靠粉丝",
        积分来源: "直播打赏",
        分级: [ {
          积分: 0,
          开出: "能刷同城"
        }, {
          积分: 10,
          开出: "能私信"
        }, {
          积分: 50,
          开出: "★ 能进粉丝群"
        }, {
          积分: 200,
          开出: "★ 榜一"
        } ],
        独有: "★★ 同城的密度比抖音更高 —— ★ 小城市里，刷到熟人的概率是真的",
        她的风险: "★★ 被同城的人认出来"
      }
    };
    function 手机加速倍率(手机等级) {
      if (手机等级 >= 100) return 20;
      if (手机等级 >= 80) return 10;
      if (手机等级 >= 50) return 5;
      if (手机等级 >= 20) return 2;
      return 1;
    }
    function 基础积分(平台) {
      const 表 = {
        草榴: 2,
        91: 10,
        暗网: 10,
        OnlyFans: 5,
        Chaturbate: 5,
        Telegram: 3,
        推特: 5,
        探探: 2,
        小红书: 5,
        抖音: 5,
        微信: 5,
        快手同城: 5
      };
      return 表[平台] ?? 3;
    }
    function 实际积分(平台, 手机等级) {
      return Math.max(1, Math.round(基础积分(平台) * 手机加速倍率(手机等级)));
    }
    function 还要几次(平台, 积分, 手机等级) {
      const p = 平台表[平台];
      if (!p) return 0;
      const 满 = p.分级[p.分级.length - 1].积分;
      if (积分 >= 满) return 0;
      return Math.ceil((满 - 积分) / 实际积分(平台, 手机等级));
    }
    function 当前站级(平台, 积分) {
      const p = 平台表[平台];
      if (!p) return 0;
      let 级 = 0;
      for (let i = 0; i < p.分级.length; i++) {
        if (积分 >= p.分级[i].积分) 级 = i + 1; else break;
      }
      return 级;
    }
    function 权限快照(平台, 积分) {
      const p = 平台表[平台];
      if (!p) return {
        当前级: 0,
        能做什么: [],
        能买什么: [],
        下一级: null,
        还差: 0
      };
      const 级 = 当前站级(平台, 积分);
      return {
        当前级: 级,
        能做什么: p.分级.slice(0, 级).map(x => x.开出),
        能买什么: p.分级.slice(0, 级).flatMap(x => x.能买 && x.能买 !== "无" ? [ x.能买 ] : []),
        下一级: 级 < p.分级.length ? p.分级[级].开出 : null,
        还差: 级 < p.分级.length ? p.分级[级].积分 - 积分 : 0
      };
    }
    const 可购买 = [ {
      名: "蓝标",
      价格: 300,
      效果: "推特：私信权限打开"
    }, {
      名: "邀请码",
      价格: 800,
      效果: "草榴：直接进隐藏版块"
    }, {
      名: "认证作者",
      价格: 1500,
      效果: "91：跳过投稿积累，直接有标签"
    }, {
      名: "推广位",
      价格: 500,
      效果: "OnlyFans / 探探：曝光直接拉满"
    }, {
      名: "担保人资格",
      价格: 3e3,
      效果: "暗网：能进私密区，也能给别人担保"
    } ];
    function 实付价格(基础价, 手机等级) {
      const 折扣 = 手机等级 >= 40 ? Math.min(.5, (手机等级 - 40) * .01) : 0;
      return Math.round(基础价 * (1 - 折扣));
    }
  },
  "./src/神奇手机/神奇手机/核心/平台约束.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      东亚圈: () => 东亚圈,
      东南亚圈: () => 东南亚圈,
      中东圈: () => 中东圈,
      俄语圈: () => 俄语圈,
      全地区: () => 全地区,
      华语圈: () => 华语圈,
      南亚圈: () => 南亚圈,
      取约束: () => 取约束,
      平台地区表: () => 平台地区表,
      抽地区: () => 抽地区,
      欧洲圈: () => 欧洲圈,
      相容度: () => 相容度,
      统计: () => 统计,
      美洲圈: () => 美洲圈,
      非洲圈: () => 非洲圈
    });
    const 华语圈 = [ "中国大陆", "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱" ];
    const 东亚圈 = [ "日本", "韩国", "中国台湾", "中国香港" ];
    const 东南亚圈 = [ "泰国", "越南", "菲律宾", "新加坡", "印度尼西亚_马来西亚_文莱", "缅泰边境园区带" ];
    const 南亚圈 = [ "印度", "巴基斯坦_孟加拉_斯里兰卡" ];
    const 中东圈 = [ "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦" ];
    const 俄语圈 = [ "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄" ];
    const 欧洲圈 = [ "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧" ];
    const 美洲圈 = [ "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥" ];
    const 非洲圈 = [ "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非" ];
    const 全地区 = [ ...华语圈, ...东亚圈.filter(x => !华语圈.includes(x)), ...东南亚圈.filter(x => !华语圈.includes(x)), ...南亚圈, ...中东圈, ...俄语圈, ...欧洲圈, ...美洲圈, ...非洲圈, "缅泰边境园区带", "暗网跨地区" ];
    const 平台地区表 = [ {
      平台: "草榴",
      语言: "中文",
      主区: [ "中国大陆", "中国台湾", "中国香港" ],
      次区: [ "新加坡", "印度尼西亚_马来西亚_文莱" ],
      次区原因: "新马华人会上中文论坛，但人数少",
      不可: [ "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "91",
      语言: "中文",
      主区: [ "中国大陆", "中国台湾", "中国香港" ],
      次区: [ "新加坡", "印度尼西亚_马来西亚_文莱" ],
      次区原因: "同上",
      不可: [ "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "探探",
      语言: "中文",
      主区: [ "中国大陆" ],
      次区: [ "中国台湾", "中国香港", "新加坡" ],
      次区原因: "探探在港台新马有用户，但主流是大陆",
      不可: [ "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "小红书",
      语言: "中文",
      主区: [ "中国大陆" ],
      次区: [ "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱" ],
      次区原因: "海外华人女性大量使用，尤其是留学生和移民",
      不可: [ "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "抖音",
      语言: "中文",
      主区: [ "中国大陆" ],
      次区: [ "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱" ],
      次区原因: "TikTok 是另一个平台；但海外华人仍刷抖音",
      不可: [ "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "快手同城",
      语言: "中文",
      主区: [ "中国大陆" ],
      次区: [],
      不可: [ "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱", "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带", "暗网跨地区" ]
    }, {
      平台: "微信",
      语言: "中文为主 + 任何语言",
      主区: [ "中国大陆", "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱" ],
      次区: [ "日本", "韩国", "泰国", "越南", "菲律宾", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "埃塞俄比亚", "肯尼亚", "尼日利亚", "南非", "美国", "英国_北欧", "德国_荷兰_瑞士", "法国_意大利_西班牙", "加拿大_墨西哥" ],
      次区原因: "★ 中资项目、留学生、华商、移民。内罗毕和亚的斯亚贝巴都有中资工地",
      不可: [ "伊朗", "印度", "哥伦比亚", "巴西", "墨西哥", "乌克兰_摩尔多瓦_白俄", "土耳其_黎巴嫩_约旦", "暗网跨地区", "缅泰边境园区带" ]
    }, {
      平台: "推特",
      语言: "任何语言",
      主区: [ "美国", "英国_北欧", "德国_荷兰_瑞士", "法国_意大利_西班牙", "日本", "韩国", "巴西", "哥伦比亚", "墨西哥", "加拿大_墨西哥", "泰国", "菲律宾", "俄罗斯", "乌克兰_摩尔多瓦_白俄" ],
      次区: [ "中国大陆", "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱", "越南", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "哈萨克斯坦_乌兹别克斯坦", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非" ],
      次区原因: "有用户，但受墙/审查/语言限制，不是主流",
      不可: [ "暗网跨地区", "缅泰边境园区带" ]
    }, {
      平台: "Telegram",
      语言: "任何语言",
      主区: [ "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "伊朗", "土耳其_黎巴嫩_约旦", "海湾迪拜_沙特_卡塔尔", "印度", "巴基斯坦_孟加拉_斯里兰卡", "泰国", "越南", "菲律宾", "新加坡", "印度尼西亚_马来西亚_文莱", "缅泰边境园区带", "哥伦比亚", "巴西", "墨西哥", "尼日利亚", "肯尼亚", "埃塞俄比亚" ],
      次区: [ "中国大陆", "中国台湾", "中国香港", "日本", "韩国", "美国", "英国_北欧", "德国_荷兰_瑞士", "法国_意大利_西班牙" ],
      次区原因: "★ Telegram 在中东/俄语区/南亚是主力通讯工具，在欧美是补充",
      不可: [ "暗网跨地区" ]
    }, {
      平台: "OnlyFans",
      语言: "英语为主",
      主区: [ "美国", "英国_北欧", "法国_意大利_西班牙", "德国_荷兰_瑞士", "加拿大_墨西哥", "巴西", "哥伦比亚", "墨西哥", "菲律宾", "泰国", "俄罗斯", "乌克兰_摩尔多瓦_白俄", "南非", "尼日利亚", "肯尼亚" ],
      次区: [ "日本", "韩国", "中国台湾", "越南", "印度尼西亚_马来西亚_文莱", "哈萨克斯坦_乌兹别克斯坦" ],
      次区原因: "★ 从业端全球化。东欧/拉美/东南亚是主要供应地",
      不可: [ "中国大陆", "伊朗", "海湾迪拜_沙特_卡塔尔", "巴基斯坦_孟加拉_斯里兰卡", "暗网跨地区", "缅泰边境园区带" ]
    }, {
      平台: "Chaturbate",
      语言: "英语为主",
      主区: [ "哥伦比亚", "巴西", "墨西哥", "菲律宾", "泰国", "俄罗斯", "乌克兰_摩尔多瓦_白俄", "南非", "肯尼亚", "尼日利亚", "美国", "加拿大_墨西哥" ],
      次区: [ "越南", "印度尼西亚_马来西亚_文莱", "日本", "韩国", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧" ],
      次区原因: "★ 消费端在欧美，从业端在拉美/东欧/东南亚。这是它的核心不对称",
      不可: [ "中国大陆", "伊朗", "海湾迪拜_沙特_卡塔尔", "巴基斯坦_孟加拉_斯里兰卡", "暗网跨地区", "缅泰边境园区带" ]
    }, {
      平台: "暗网",
      语言: "英语",
      主区: [ "暗网跨地区" ],
      次区: [],
      不可: [ "中国大陆", "中国台湾", "中国香港", "新加坡", "印度尼西亚_马来西亚_文莱", "日本", "韩国", "泰国", "越南", "菲律宾", "印度", "巴基斯坦_孟加拉_斯里兰卡", "海湾迪拜_沙特_卡塔尔", "伊朗", "土耳其_黎巴嫩_约旦", "俄罗斯", "哈萨克斯坦_乌兹别克斯坦", "乌克兰_摩尔多瓦_白俄", "德国_荷兰_瑞士", "法国_意大利_西班牙", "英国_北欧", "美国", "加拿大_墨西哥", "哥伦比亚", "巴西", "墨西哥", "肯尼亚", "尼日利亚", "埃塞俄比亚", "南非", "缅泰边境园区带" ]
    } ];
    function 取约束(平台) {
      return 平台地区表.find(x => x.平台 === 平台) ?? null;
    }
    function 相容度(平台, 地区) {
      const c = 取约束(平台);
      if (!c) return "不可";
      if (c.主区.includes(地区)) return "主区";
      if (c.次区.includes(地区)) return "次区";
      return "不可";
    }
    function 抽地区(平台, 随机 = Math.random) {
      const c = 取约束(平台);
      if (!c) return "中国大陆";
      const 池 = [];
      c.主区.forEach(x => 池.push(x, x, x));
      c.次区.forEach(x => 池.push(x));
      if (池.length === 0) return "中国大陆";
      return 池[Math.floor(随机() * 池.length)];
    }
    function 统计() {
      const 地区表 = 全地区.filter(x => x !== "暗网跨地区");
      let 主 = 0, 次 = 0, 不 = 0;
      平台地区表.forEach(p => {
        地区表.forEach(r => {
          const k = 相容度(p.平台, r);
          if (k === "主区") 主++; else if (k === "次区") 次++; else 不++;
        });
      });
      const 总 = 平台地区表.length * 地区表.length;
      return {
        总组合: 总,
        主区: 主,
        次区: 次,
        不可: 不,
        可用: 主 + 次,
        可用率: ((主 + 次) / 总 * 100).toFixed(1) + "%"
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/床上新.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      发数不应期: () => 发数不应期,
      发数疲劳: () => 发数疲劳,
      发数硬度: () => 发数硬度,
      她的敏感度: () => 她的敏感度,
      计算床上: () => 计算床上
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./她的数值 */ "./src/神奇手机/神奇手机/核心/她的数值.ts");
    var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./技能定义 */ "./src/神奇手机/神奇手机/核心/技能定义.ts");
    function 发数疲劳(第几发) {
      return Math.max(.35, Math.pow(.88, 第几发 - 1));
    }
    function 发数不应期(第几发) {
      return Math.min(4, 1 + (第几发 - 1) * .45);
    }
    function 她的敏感度(已高潮) {
      if (已高潮 <= 0) return 1;
      if (已高潮 === 1) return 1.35;
      if (已高潮 === 2) return 1.8;
      return Math.min(9, 1.8 + Math.pow(已高潮 - 2, 1.35) * .75);
    }
    function 发数硬度(硬度值, 第几发, 体力) {
      const 体力系数 = Math.max(.4, 1 - (第几发 - 1) * (1 - 体力 / 10) * .35);
      return Math.max(20, Math.round(硬度值 * 体力系数));
    }
    function 计算床上(a, s, 她, ctx = {}) {
      const 明细 = [];
      const 时间轴 = [];
      const 发记录 = [];
      const 用尺寸 = ctx.选的尺寸 ?? (0, ___WEBPACK_IMPORTED_MODULE_0__["尺寸到厘米"])(a.尺寸控制);
      const 尺寸差 = Math.round((用尺寸 - 她.偏好尺寸) * 10) / 10;
      明细.push(`你用 ${用尺寸}cm（周长 ${(0, ___WEBPACK_IMPORTED_MODULE_0__["尺寸到周长"])(用尺寸)}cm），她偏好 ${她.偏好尺寸}cm，差 ${尺寸差 > 0 ? "+" : ""}${尺寸差}cm`);
      let 尺寸效率 = 1;
      if (Math.abs(尺寸差) <= 1) {
        尺寸效率 = 1.15;
        明细.push("尺寸很合 → 效率 ×1.15");
      } else if (Math.abs(尺寸差) <= 2.5) {
        尺寸效率 = 1;
      } else if (尺寸差 > 2.5) {
        尺寸效率 = .8;
        明细.push("太大 → 她会疼，效率 ×0.8");
      } else {
        尺寸效率 = .75;
        明细.push("太小 → 没感觉，效率 ×0.75");
      }
      if ((s.凸点 ?? 0) >= 1) {
        尺寸效率 += .15 * s.凸点;
        明细.push(`凸点 Lv${s.凸点} → 表面肉粒摩擦 效率 +${(.15 * s.凸点).toFixed(2)}`);
      }
      if ((s.倒钩 ?? 0) >= 1) {
        尺寸效率 += .25 * s.倒钩;
        明细.push(`倒钩 Lv${s.倒钩} → 倒刺深嵌软肉 效率 +${(.25 * s.倒钩).toFixed(2)}`);
      }
      if ((s.宫口 ?? 0) >= 1) {
        尺寸效率 += .25 * s.宫口;
        明细.push(`宫口 Lv${s.宫口} → 破开子宫颈顶入宫腔 效率 +${(.25 * s.宫口).toFixed(2)}`);
      }
      if ((s.分叉 ?? 0) >= 1) {
        尺寸效率 += .35 * s.分叉;
        明细.push(`分叉 Lv${s.分叉} → 前后双穴同开贯穿 效率 +${(.35 * s.分叉).toFixed(2)}`);
      }
      if ((s.多物 ?? 0) >= 1) {
        尺寸效率 += .45 * s.多物;
        明细.push(`多物 Lv${s.多物} → 多重贯穿超常理占有 效率 +${(.45 * s.多物).toFixed(2)}`);
      }
      if ((s.快感注入 ?? 0) >= 1) {
        尺寸效率 += .2 * s.快感注入;
        明细.push(`快感注入 Lv${s.快感注入} → 神经通电直击 效率 +${(.2 * s.快感注入).toFixed(2)}`);
      }
      if ((s.冰毒 ?? 0) >= 1) {
        尺寸效率 += .4 * s.冰毒;
        明细.push(`冰毒 Lv${s.冰毒} → 毒品级快感注入 效率 +${(.4 * s.冰毒).toFixed(2)}`);
      }
      const 前戏 = ctx.前戏分钟 ?? 0;
      let 湿润 = Math.min(10, Math.round((她.湿润度 + 前戏 * .4) * 10) / 10);
      明细.push(`前戏 ${前戏} 分钟 → 湿润度 ${湿润}%`);
      let 真实时间 = 0;
      let 她累计刺激 = 0;
      let 她总高潮 = 0;
      let 你总射精 = 0;
      let 她当前需要 = 0;
      let 停下的原因 = "";
      const 最多发 = (0, ___WEBPACK_IMPORTED_MODULE_0__["体力到轮数"])(a.体力) + ((s.永久勃起 ?? 0) >= 3 || (s.不射 ?? 0) >= 3 ? 99 : 0);
      时间轴.push({
        分钟: 0,
        事件: "插入",
        谁: "你"
      });
      for (let 发 = 1; 发 <= 最多发 + 1; 发++) {
        const 事件 = [];
        const 发明细 = [];
        const 疲劳 = 发数疲劳(发);
        let 本轮 = (0, ___WEBPACK_IMPORTED_MODULE_0__["持久到分钟"])(a.持久) * 疲劳;
        const 波动 = (0, ___WEBPACK_IMPORTED_MODULE_0__["时机到波动"])(a.时机);
        本轮 = 本轮 * (1 + (Math.random() * 2 - 1) * 波动);
        const 原始硬度 = (0, ___WEBPACK_IMPORTED_MODULE_0__["硬度到百分比"])(a.硬度);
        const 这发硬度 = 发数硬度(原始硬度, 发, a.体力);
        if (这发硬度 < 70 && Math.random() < (70 - 这发硬度) / 200) {
          本轮 *= .5;
          事件.push(`⚠️ 硬度 ${这发硬度}%：这发中途软了，时间砍半`);
          发明细.push(`硬度 ${这发硬度}% → 中途软 → 时间 ×0.5`);
        }
        本轮 = Math.max(2, Math.round(本轮 * 10) / 10);
        发明细.unshift(`疲劳 ×${疲劳.toFixed(2)}（第 ${发} 发）`);
        发明细.push(`持久 ${a.持久} × 疲劳 ${疲劳.toFixed(2)} → ${本轮} 分钟`);
        if (她当前需要 === 0) {
          let base = (0, ___WEBPACK_IMPORTED_MODULE_1__["阈值到分钟"])(她.阈值);
          base *= 1 - 湿润 / 400;
          base /= 尺寸效率;
          她当前需要 = Math.round(base * 10) / 10;
          发明细.push(`她阈值 ${她.阈值} → 需要 ${(0, ___WEBPACK_IMPORTED_MODULE_1__["阈值到分钟"])(她.阈值)} 分钟；湿润/尺寸修正后 ${她当前需要} 分钟`);
        }
        const 敏感 = 她的敏感度(她总高潮);
        let 这发她需要 = 她当前需要 * 敏感;
        这发她需要 = Math.round(这发她需要 * 10) / 10;
        if (她总高潮 > 0) 发明细.push(`她已高潮 ${她总高潮} 次 → 敏感度 ×${敏感.toFixed(2)} → 这发要 ${这发她需要} 分钟`);
        let 进发时累计 = 她累计刺激;
        let 剩余 = 本轮;
        let 她这发高潮 = 0;
        let 上次高潮点 = 她当前需要;
        while (剩余 > 1e-9) {
          const 还需要 = 上次高潮点 - 她累计刺激;
          if (还需要 <= 剩余 + 1e-9) {
            真实时间 += 还需要;
            剩余 -= 还需要;
            她累计刺激 = 上次高潮点;
            她总高潮++;
            她这发高潮++;
            时间轴.push({
              分钟: Math.round(真实时间 * 10) / 10,
              事件: `她第 ${她总高潮} 次高潮（第 ${发} 发里）`,
              谁: "她"
            });
            上次高潮点 = 她累计刺激 + 这发她需要 * (.75 + 她这发高潮 * .35);
          } else {
            真实时间 += 剩余;
            她累计刺激 += 剩余;
            剩余 = 0;
          }
        }
        你总射精++;
        时间轴.push({
          分钟: Math.round(真实时间 * 10) / 10,
          事件: `你第 ${你总射精} 次射精（第 ${发} 发）`,
          谁: "你"
        });
        发明细.push(`这发你能坚持 ${本轮} 分钟 —— 她 ${她这发高潮 > 0 ? `到了 ${她这发高潮} 次` : "没到"}`);
        const 基础不应期 = (0, ___WEBPACK_IMPORTED_MODULE_2__["计算不应期"])(a.恢复, s.连硬 ?? 0);
        const 不应期 = Math.round(基础不应期 * 发数不应期(发) * 10) / 10;
        发明细.push(`不应期 ${基础不应期} 分钟 × 第 ${发} 发倍率 ${发数不应期(发).toFixed(2)} = ${不应期} 分钟`);
        发记录.push({
          第几发: 发,
          你的分钟: 本轮,
          她需要分钟: 这发她需要,
          她这发高潮次数: 她这发高潮,
          你射了: true,
          不应期分钟: 不应期,
          她的敏感度: 敏感,
          你的疲劳: 疲劳,
          结束于: Math.round(真实时间 * 10) / 10,
          事件,
          明细: 发明细
        });
        if (发 >= 最多发) {
          停下的原因 = "体力见底 —— 他能硬，但没劲了";
          break;
        }
        const 下一发敏感 = 她的敏感度(她总高潮);
        if (下一发敏感 > 6) {
          停下的原因 = `她已经到了 ${她总高潮} 次，身体不受控了 —— 再做她受不了`;
          break;
        }
        if (真实时间 > 360) {
          停下的原因 = "天快亮了 —— 你们停下来的时候窗外已经泛白";
          break;
        }
        if (不应期 > 0) {
          const 起点 = 真实时间;
          let 剩余2 = 不应期;
          while (剩余2 > 1e-9) {
            const 还需 = 上次高潮点 - 她累计刺激;
            const 本段 = 剩余2 * .3;
            if (本段 >= 还需) {
              const 耗 = 还需 / .3;
              剩余2 -= 耗;
              真实时间 += 耗;
              她累计刺激 = 上次高潮点;
              她总高潮++;
              时间轴.push({
                分钟: Math.round(真实时间 * 10) / 10,
                事件: `她第 ${她总高潮} 次高潮（不应期里，你没在动）`,
                谁: "她"
              });
              上次高潮点 = 她累计刺激 + 这发她需要 * (.75 + .35);
            } else {
              真实时间 += 剩余2;
              她累计刺激 += 本段;
              剩余2 = 0;
            }
          }
          时间轴.push({
            分钟: Math.round(起点 * 10) / 10,
            事件: `（不应期 ${不应期} 分钟）`,
            谁: "你"
          });
        }
      }
      let 结果;
      if (她总高潮 >= 6) 结果 = "她最后是哑的 —— 说不出整句，手抓了两把床单"; else if (她总高潮 >= 3) 结果 = "她第一次这样 —— 事后抱着你不说话"; else if (她总高潮 === 2) 结果 = "她很满意，会回头"; else if (她总高潮 === 1 && 你总射精 >= 2) 结果 = "她到了，你还行 —— 她有点意外"; else if (她总高潮 === 1) 结果 = "她到了，你也到了 —— 正常好的一晚"; else if (你总射精 >= 1) 结果 = "你到了她没到 —— 她配合，但你看得出她在等"; else 结果 = "两个人都没到，草草结束";
      明细.push(`共 ${你总射精} 发，她高潮 ${她总高潮} 次，总时长 ${Math.round(真实时间)} 分钟`);
      明细.push(`停止原因：${停下的原因}`);
      时间轴.sort((x, y) => x.分钟 - y.分钟);
      return {
        你的分钟: 发记录[0]?.你的分钟 ?? (0, ___WEBPACK_IMPORTED_MODULE_0__["持久到分钟"])(a.持久),
        她需要分钟: 发记录[0]?.她需要分钟 ?? (0, ___WEBPACK_IMPORTED_MODULE_1__["阈值到分钟"])(她.阈值),
        尺寸差,
        湿润度: 湿润,
        时间轴,
        她高潮次数: 她总高潮,
        你射精次数: 你总射精,
        结果,
        数值明细: 明细,
        发: 发记录,
        停下的原因,
        总时长分钟: Math.round(真实时间)
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/库.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      上装库: () => 上装库,
      下巴库: () => 下巴库,
      下装库: () => 下装库,
      主动类型库: () => 主动类型库,
      乳头库: () => 乳头库,
      乳晕库: () => 乳晕库,
      事后库: () => 事后库,
      人生事件库: () => 人生事件库,
      会阴库: () => 会阴库,
      体型库: () => 体型库,
      体毛库: () => 体毛库,
      信仰库: () => 信仰库,
      内衣库: () => 内衣库,
      内裤库: () => 内裤库,
      冲突库: () => 冲突库,
      分泌物味库: () => 分泌物味库,
      分泌物色库: () => 分泌物色库,
      分泌物质库: () => 分泌物质库,
      分泌物量库: () => 分泌物量库,
      动机库: () => 动机库,
      原型库: () => 原型库,
      发型库: () => 发型库,
      发色库: () => 发色库,
      发质库: () => 发质库,
      发长库: () => 发长库,
      味道库: () => 味道库,
      唇型库: () => 唇型库,
      唇色库: () => 唇色库,
      地区术语库: () => 地区术语库,
      场合适配库: () => 场合适配库,
      声线印象库: () => 声线印象库,
      声音库: () => 声音库,
      处境库: () => 处境库,
      处女膜库: () => 处女膜库,
      大阴唇形状库: () => 大阴唇形状库,
      大阴唇颜色库: () => 大阴唇颜色库,
      大阴唇饱满库: () => 大阴唇饱满库,
      妆容库: () => 妆容库,
      妆感库: () => 妆感库,
      家庭库: () => 家庭库,
      小阴唇外露库: () => 小阴唇外露库,
      小阴唇对称库: () => 小阴唇对称库,
      小阴唇形状库: () => 小阴唇形状库,
      小阴唇颜色库: () => 小阴唇颜色库,
      性病分期库: () => 性病分期库,
      性病库: () => 性病库,
      性病治疗库: () => 性病治疗库,
      性病部位库: () => 性病部位库,
      惯常表情库: () => 惯常表情库,
      打字习惯库: () => 打字习惯库,
      敏感点库: () => 敏感点库,
      暴露度库: () => 暴露度库,
      毛发库: () => 毛发库,
      牙齿库: () => 牙齿库,
      瑕疵库: () => 瑕疵库,
      癖好库: () => 癖好库,
      眉毛库: () => 眉毛库,
      眼型库: () => 眼型库,
      眼妆库: () => 眼妆库,
      瞳色库: () => 瞳色库,
      破绽库: () => 破绽库,
      禁区库: () => 禁区库,
      私处观感库: () => 私处观感库,
      穿搭风格库: () => 穿搭风格库,
      素颜感库: () => 素颜感库,
      经济库: () => 经济库,
      耳型库: () => 耳型库,
      肛门形状库: () => 肛门形状库,
      肛门颜色库: () => 肛门颜色库,
      肤色库: () => 肤色库,
      肤质库: () => 肤质库,
      胸下垂库: () => 胸下垂库,
      胸尺寸: () => 胸尺寸,
      胸形状: () => 胸形状,
      胸手感库: () => 胸手感库,
      胸间距库: () => 胸间距库,
      脖型库: () => 脖型库,
      脸型库: () => 脸型库,
      腰腹库: () => 腰腹库,
      腿库: () => 腿库,
      臀库: () => 臀库,
      袜子库: () => 袜子库,
      身高区间值: () => 身高区间值,
      身高权重: () => 身高权重,
      阴蒂包皮库: () => 阴蒂包皮库,
      阴蒂大小库: () => 阴蒂大小库,
      阴道口库: () => 阴道口库,
      阴道深度库: () => 阴道深度库,
      阴道紧度库: () => 阴道紧度库,
      阴道褶皱库: () => 阴道褶皱库,
      阴部形态库: () => 阴部形态库,
      阴阜库: () => 阴阜库,
      鞋子库: () => 鞋子库,
      饰品库: () => 饰品库,
      高潮表现库: () => 高潮表现库,
      鼻型库: () => 鼻型库
    });
    const 身高区间值 = {
      "148-155": [ 148, 150, 152, 153, 155 ],
      "156-162": [ 156, 157, 158, 160, 162 ],
      "163-168": [ 163, 164, 165, 166, 168 ],
      "169-178": [ 170, 172, 175, 178 ]
    };
    const 身高权重 = {
      日本: {
        "148-155": .35,
        "156-162": .45,
        "163-168": .17,
        "169-178": .03
      },
      韩国: {
        "148-155": .15,
        "156-162": .4,
        "163-168": .38,
        "169-178": .07
      },
      泰国: {
        "148-155": .3,
        "156-162": .45,
        "163-168": .22,
        "169-178": .03
      },
      越南: {
        "148-155": .35,
        "156-162": .45,
        "163-168": .18,
        "169-178": .02
      },
      印度: {
        "148-155": .35,
        "156-162": .45,
        "163-168": .18,
        "169-178": .02
      },
      中东: {
        "148-155": .22,
        "156-162": .44,
        "163-168": .28,
        "169-178": .06
      },
      中亚: {
        "148-155": .2,
        "156-162": .42,
        "163-168": .32,
        "169-178": .06
      },
      俄罗斯: {
        "148-155": .1,
        "156-162": .28,
        "163-168": .42,
        "169-178": .2
      },
      德国: {
        "148-155": .05,
        "156-162": .2,
        "163-168": .45,
        "169-178": .3
      },
      哥伦比亚: {
        "148-155": .25,
        "156-162": .45,
        "163-168": .25,
        "169-178": .05
      },
      巴西: {
        "148-155": .22,
        "156-162": .42,
        "163-168": .28,
        "169-178": .08
      },
      肯尼亚: {
        "148-155": .15,
        "156-162": .4,
        "163-168": .35,
        "169-178": .1
      },
      尼日利亚: {
        "148-155": .18,
        "156-162": .42,
        "163-168": .3,
        "169-178": .1
      },
      埃塞俄比亚: {
        "148-155": .25,
        "156-162": .45,
        "163-168": .25,
        "169-178": .05
      },
      缅甸: {
        "148-155": .32,
        "156-162": .46,
        "163-168": .19,
        "169-178": .03
      },
      美国: {
        "148-155": .12,
        "156-162": .3,
        "163-168": .38,
        "169-178": .2
      },
      默认: {
        "148-155": .22,
        "156-162": .42,
        "163-168": .28,
        "169-178": .08
      }
    };
    const 体型库 = [ "骨感（能看见锁骨和肋骨）", "偏瘦（有腰线，没肉）", "匀称（标准，但没练过）", "匀称偏肉（坐下有褶）", "微胖（肚子软，胳膊有肉）", "丰满（胸臀都有，腰不明显）", "壮实（肩膀宽，有力量感）", "梨形（下半身比上半身重）", "苹果形（肉都在腰腹）", "沙漏（腰细，上下都饱满）", "直线型（没什么曲线，很薄）", "运动型（有肌肉线条，不是软的那种）", "产后（肚子松，胸下垂，但整体不垮）", "松垮（没运动过，肉是软的）", "斯拉夫大骨架肥熟大妈（百公斤肉山，大肚腩垂挂）", "一米宽美式超大巨臀（大腿内侧磨黑，臀围120cm+）", "部落暴晒干瘦精肉型（常年赤裸劳作，皮肤坚韧如牛皮）", "川渝细腰翘胯型（骨盆天生前倾，腰细臀翘极品比）", "北方大骨架丰腴白肉型（肩宽胯宽，肉质厚实弹润）" ];
    const 胸尺寸 = [ "平（几乎平，只有乳头）", "小（一手可握）", "中小（刚好盈手）", "中（标准）", "中大（需要两只手）", "大（有重量感，走路会晃）", "很大（下垂，需要支撑）", "巨（极端，日常受限）", "百公斤面袋垂乳（长垂及肚脐，松散软烂任由抓扯）", "烈日暴晒干瘪长皮袋（终年赤裸暴晒，干瘪深黑牛皮带状）", "假体隆胸高耸半球（饱满圆硬，平躺不垮）" ];
    const 胸形状 = [ "半球（饱满圆润，不垂）", "水滴（上半扁，下半沉）", "圆锥（向前突出，尖）", "外扩（两乳间距宽，不聚拢）", "下垂（乳头朝下）", "上翘（乳头朝前上方）", "不对称（一边明显大）" ];
    const 乳头库 = [ "小（一点点，不突出）", "标准", "大（明显突出）", "长（有长度）", "内陷（平时凹进去，刺激才出来）", "一凸一平（两边不一样）" ];
    const 乳晕库 = [ "小而浅色", "中等", "大而浅", "小而深", "大而深（直径大，颜色深）", "边缘模糊（和周围皮肤没明显分界）" ];
    const 腰腹库 = [ "有腹肌（明显的）", "有马甲线（不明显）", "平坦（没肉也没肌肉）", "软（有肉但看不出来）", "小肚子（站起来也有）", "明显的肚子（有份量）", "腰侧有肉（穿裤子会挤出来）", "产后松弛（有褶）", "妊娠纹（小腹）", "剖腹产疤痕", "肚脐深（有褶）", "肚脐凸（生育后常见）" ];
    const 臀库 = [ "小翘（小而圆，翘）", "小扁（小，没肉）", "普通（中等，形状尚可）", "圆润（饱满，有形）", "大而紧（大，但是紧实的）", "大而软（大，肉是晃的）", "下垂（肉往下走）", "宽（横向宽，有胯）", "有桔皮组织（大腿和臀交界处）", "有凹陷（臀部有凹坑）", "一米宽极限巨臀（脂肪厚重堆叠，后入肉浪如潮）", "BBL 膨体蜜桃翘臀（极细腰配爆满圆胯，回弹剧烈）", "大妈肥塌大肉臀（久坐松软，大腿根带黑色坐茧）", "部落精肉紧翘（常年徒步劳作，紧绷如铁）" ];
    const 腿库 = [ "细长（有缝）", "细但不长", "匀称，有肉", "粗（大腿粗）", "小腿粗，大腿正常", "有肌肉（运动过）", "静脉（小腿有青筋）", "膝盖有色素" ];
    const 毛发库 = [ "全剃（干净）", "修剪整齐（留一点点形状）", "自然（没管过，但也不浓）", "浓密（需要修剪的那种）", "只修边缘（中间留）", "剃了一半（长出来了，扎人）", "没管过（真的没管过）", "天然黑卷钢丝密毛（粗硬如细钢丝，从耻骨蔓延到股沟）", "红泥与油脂结块毛发（部落终身不洗澡结块）", "大妈稀疏花白杂毛（夹杂厚重脂肪褶皱）" ];
    const 阴部形态库 = [ "粉嫩紧致微闭合（极少性经验，处女膜伞缘肉粉微张）", "经产型松软外翻（顺产侧切疤痕硬结，内壁充血下垂）", "肥厚多汁深黑蚌（常年性事开发，小阴唇外翻下垂呈深黑，湿热泥泞）", "轻微红肿充血（频繁性交或摩擦，阴道口微痛发烫）", "深埋肉山暗蚌（臀肥脂肪厚帘，需双手掰开方见湿痕）", "干涩发白萎缩型（激素低落或绝经前期，内壁干涸缺乏弹性，进入困难疼痛）", "内包紧窄（小巧闭合，藏在大阴唇深处）", "不对称肉唇（一侧小阴唇偏长外露，呈焦褐色褶皱）" ];
    const 肤色库 = [ "很白（能看见血管）", "白", "偏白但发黄", "自然色", "小麦色", "蜜色（晒过的）", "深", "很深（发亮的那种深）", "晒痕（泳衣印/吊带印）", "红泥牛油通红红铜色（辛巴族红泥涂身）", "暴晒深黑如木炭（赤道烈日深黑油亮）", "冷白透青静脉色（极寒雪国冷白皮）", "水光凝脂水豆腐白（江南川渝多汁白皮）" ];
    const 瑕疵库 = [ "痣（脸颊）", "痣（嘴角）", "痣（锁骨）", "痣（胸口）", "痣（后腰）", "痣（大腿内侧）", "胎记（颜色、位置）", "疤（阑尾手术）", "疤（剖腹产）", "疤（自残）", "疤（摔的）", "疤（烫的）", "纹身（后腰）", "纹身（脚踝）", "纹身（小臂）", "穿环（耳）", "穿环（脐）", "穿环（乳）", "雀斑（多少、位置）", "痘印（背后）", "痘印（胸口）", "鸡皮（大腿）", "静脉（腿）", "色斑（脸上）", "指甲（咬过的）", "指甲（没涂）", "指甲（涂花了）", "脚（粗糙有茧）", "牙齿（不齐）", "头发（染过的根）", "大腿内侧摩擦黑斑硬茧（常年摩擦）", "红泥牛油防晒涂层硬壳（终年未洗）", "冬天干燥小腿起白皮屑（北方暖气房）" ];
    const 味道库 = [ "健康乳酸菌微酸面团发酵麦芽体香", "紧身化纤打底裤久坐捂出的底裆温热汗酸与大腿内侧微咸油脂骚气", "纯棉内裤底裆沉淀微量发酵尿渍的微骚体味", "卫生巾捂了一整天的潮热黏腻经血铁锈腥气", "细菌性阴道病白带排出的刺鼻微烂鱼腥臭气", "严重霉菌感染产生的微黄豆腐渣酸腐酸臭气", "腋下大汗腺发酵出微带葱蒜辛辣刺鼻的狐臭体骚", "长期抽烟尼古丁渗入汗腺毛孔散发出的熏黄陈年焦油浊气", "涨奶溢出贴身内衣发酵的微酸生冷奶腥味", "廉价粉底与发胶头油在闷热房间里混合的脂粉油垢味", "夜场廉价洋酒宿醉后胃酸反涌与薄荷口香糖掩盖不住的混杂浊气", "常年吃抗病毒阻断药与中药渗入汗液散发的苦涩药骚味", "厚牛仔裤勒了一整天的胯下肉褶沉淀的陈年体汗老酸味", "刚洗完澡湿热热气混合硫磺皂与皮肤干燥皮屑的洁净干涩味", "重度笑气与大麻吸食后从肺部哈出的甜腻化学异味", "排卵期生殖腺黏液温热滑腻的轻微生蚝腥气", "几天没换洗的内裤黄渍发酵尿骚味", "化纤打底裤勒出的臀缝汗酸与股癣药膏味", "牛油红泥与牛圈草膻味（部落终身不洗澡）", "烈日暴晒老汗酸与大蒜橄榄油体味", "浓烈原味洋葱狐臭与厚大衣陈年体汗" ];
    const 声音库 = [ "细（像小孩）", "沙（抽烟或天生）", "低（比外表低）", "鼻音重", "有口音", "语速快", "语速慢", "尾音上扬", "笑的时候抽气", "说话会吞字", '口头禅（"那个"）', "说话时会停顿很久" ];
    const 敏感点库 = [ "脖子", "耳后", "耳垂", "锁骨", "乳头", "腰", "后腰", "大腿内侧", "阴蒂", "G点", "宫颈", "脚", "手心", "后背", "头发被拽" ];
    const 禁区库 = [ "不接吻", "不许拍脸", "不拍照", "不许留痕", "不接受口交（给她）", "不做口交（她给）", "不许内射", "不许后入", "不许说脏话", "不许开灯", "不许看下面", "不接受手指", "不接受玩具", "不许碰脚", "只做一种姿势" ];
    const 癖好库 = [ "无（真的没有）", "喜欢被看着", "喜欢命令对方", "喜欢被命令", "喜欢把场景一路演到底", "喜欢穿特定衣服", "喜欢在特定地点", "喜欢声音被听见", "喜欢被留下痕迹", "喜欢留痕迹给对方", "喜欢被拍照", "轻度受虐", "轻度施虐", "喜欢说脏话", "喜欢被夸身体", "喜欢事后聊很久", "喜欢过程中不说话", "喜欢开灯", "喜欢关灯" ];
    const 主动类型库 = [ "躺平型（什么都不做，等）", "配合型（你动她动）", "主动型（会自己动）", "指挥型（会告诉你怎么做）", "服务型（全程伺候你）", "索取型（不停地要）", "表演型（像在演给人看）", "真实型（不会演，反应都是真的）" ];
    const 高潮表现库 = [ "叫出来（声音大）", "憋着（不出声，但身体在抖）", "抖（全身抖）", "抓东西", "绷直（整个人僵住）", "蜷起来（缩成一团）", "潮吹", "说不出话", "哭（真的哭）", "笑（控制不住地笑）", "骂人", "要求继续（刚结束就要）" ];
    const 事后库 = [ "抱着不说话", "抱着说话", "抽烟", "立刻洗澡", "立刻穿衣服", "玩手机", "睡着", "要吃的", "主动再来一次", "开始讲自己的事", "开始哭", "直接走" ];
    const 打字习惯库 = [ '缩写流（"在吗 想你了"）', '标点讲究（"今天有点累。你呢？"）', "表情包流（一句话配三个表情）", "长段落（像写信）", "连珠炮（十条连发）", "一句话拆成三行", "全角空格癖", "错别字多（不回改）", "中英混杂", "语音转文字（没有标点，同音字错）" ];
    const 原型库 = [ "学生", "上班族", "主妇/人妻", "职业者", "单亲妈妈", "主播/创作者", "服务业", "小老板", "移民/外劳", "被带进圈的人", "玩家型", "有正经身份的人" ];
    const 动机库 = [ "钱（直接，谈价）", "情绪（要的是有人听她说话）", "猎奇（只聊不见，说到线下就消失）", "职业（留客，私域是 KPI）", "报复（报复伴侣）", "生理（直接，但不说破）", "习惯（她做这个很久了，没什么感觉）" ];
    const 处境库 = [ "独居（随时能视频）", "合租（要等室友睡）", "和父母住（几乎不能视频）", "和老公住（只能白天，且要删记录）", "和男友住（同上，但更松）", "带孩子（晚上九点后）", "宿舍（只有熄灯后）", "经常出差（她是自由的，但只有几天）" ];
    const 家庭库 = [ "独生女，父母在老家", "有一个哥哥，哥哥不争气", "单亲，跟母亲", "单亲，跟父亲（关系差）", "父母离异，各自再婚", "已婚，没孩子", "已婚，一个孩子", "已婚，两个孩子", "离婚，带孩子", "离婚，孩子归男方", "和男友同居", "异地恋（男友在外地）", "丧偶", "家里不知道她在做什么" ];
    const 经济库 = [ "正常（能养活自己）", "紧（月底没钱）", "欠债（信用卡/网贷）", "欠高利贷", "家里靠她（父母/弟妹）", "有孩子要养", "有病人要养", "自己有病要看", "刚失业", "学生，靠家里", "其实不缺钱", "很有钱" ];
    const 信仰库 = [ "无", "名义上信（不去）", "虔诚（每周去）", "斋戒（斋月/特定日子）", "每天祷告", "有宗教禁忌（不能吃/不能做）", "信但不遵守", "刚信不久", "曾经信，现在不信", "信得很矛盾" ];
    const 人生事件库 = [ "被前任骗过钱", "被前任拍过照，被威胁过", "堕过胎", "生过孩子", "被家暴过", "被父母打过", "被老师/上司骚扰过", "被同事排挤过", "高考失败过", "大学退学过", "被传过谣", "被偷过钱", "被抢过", "出过车祸", "得过病", "家里死过人", "被赶出过家门", "被朋友背叛过", "离家出走过", "被骗去过外地", "被传销骗过", "被网络诈骗过" ];
    const 冲突库 = [ "她教小学，晚上在直播间", "她每天礼拜，晚上在 Telegram", "她刚结婚三个月", "她妈妈以为她在城里做导购", "她是护士，她知道自己不该这么做", "她读的是名校", "她讨厌男人，但她靠男人", "她只有在周末是自由的", "她白天在银行上班，晚上做这个", "她在商场做主管，她比你有钱", "她的身份证照片和现在完全不像", "她所有消息都在凌晨一点后发", "她只在她自己的床上做", "她不让任何人碰她的脸", "她从不主动，但从不拒绝", "她会说三种语言，但只用最少的那个" ];
    const 地区术语库 = {
      泰国: [ "bar fine", "ST/LT", "lady drink", "up to you", "freelancer" ],
      日本: [ "パパ活", "割り切り", "ホ別", "ソープ", "デリヘル", "FC2", "単体", "企画" ],
      韩国: [ "오피", "키스방", "룸", "텐프로", "2차", "회식", "선배", "소개팅" ],
      印度: [ "VCS", "izzat", "dowry", "arranged marriage", "Telegram" ],
      中东: [ "sigheh", "nikah", "awrah", "mahram", "Ramadan" ],
      德国: [ "FKK", "Laufhaus", "Kaufmich" ],
      荷兰: [ "De Wallen", "Kinky.nl", "ramen" ],
      美国: [ "OF", "PPV", "chatter", "GFE", "tips", "review board", "Seeking" ],
      英国: [ "AdultWork", "escort", "GFE" ],
      哥伦比亚: [ "prepagos", "scopolamine", "Skokka" ],
      肯尼亚: [ "sponsor", "M-Pesa", "matatu" ],
      尼日利亚: [ "Yahoo boys", "Lagos", "runs girls" ],
      缅甸: [ "园区", "业绩", "赔付", "高薪工作" ],
      大陆: [ "邀请码", "老司机", "求种", "补档", "女菩萨", "加个微信", "私我" ]
    };
    const 脸型库 = [ "鹅蛋脸（额圆颌尖，脸长略大于宽）", "瓜子脸（下颌收成尖，颊部偏窄）", "圆脸（颊肉饱满，下颌线看不见）", "方颌脸（下颌角外翻，咬肌明显）", "心形脸（额头宽，下巴收尖）", "长脸（中庭长，两颊窄）", "菱形脸（颧骨最宽，额头与下巴都窄）", "倒三角脸（下颌比额头窄很多）", "国字脸（下颌角方，脸宽接近脸长）", "娃娃脸（短而圆，颊上一团婴儿肥）", "梨形脸（下颌比颧骨还宽）", "钻石脸（颧骨高尖，太阳穴凹进去）", "方圆脸（额头方，下颌圆）" ];
    const 眼型库 = [ "杏仁眼（上下眼睑弧度对称，眼角微尖）", "丹凤眼（眼尾上扬，眼皮薄）", "圆眼（眼睛圆，眼白露出多）", "桃花眼（眼头微垂，眼尾上挑带弯）", "细长眼（眼裂窄而长）", "下垂眼（眼尾低于眼头）", "三白眼（瞳孔上方或下方露出一线眼白）", "瑞凤眼（内双，眼尾细长入鬓）", "狐狸眼（眼尾上吊，眼头尖锐）", "柳叶眼（形如柳叶，中段最宽）", "猫眼（眼尾上挑，眼头圆）", "三角眼（上眼睑中段垂成三角）", "深窝眼（眼窝深陷，眉骨压下来）", "肿泡眼（上睑脂肪厚，双眼皮被埋住）", "大圆眼（脸小眼大，眼白清亮）" ];
    const 瞳色库 = [ "黑曜（纯黑，几乎看不出瞳孔边界）", "墨黑（黑得发亮）", "深褐（近黑，光下才透出棕）", "浅棕（茶色，光下偏黄）", "栗色（带红的棕）", "焦糖色（暖橙棕）", "巧克力色（浓而不透光的棕）", "琥珀色（半透明，光下像蜜）", "灰蓝（灰中带蓝，阴天感）", "湖蓝（明净偏绿）", "冰蓝（很淡，近乎无色）", "墨绿（深到发黑的绿）", "橄榄绿（偏黄的暗绿）", "灰白（近乎无色，瞳孔轮廓很清楚）", "紫褐（棕里透紫）", "双色异瞳（一只浅褐一只灰绿）" ];
    const 眼妆库 = [ "素眼（一根睫毛膏都没上）", "只夹了睫毛（卷翘，没有颜色）", "内眼线一笔（贴着睫毛根，睁眼看不见）", "外眼线拉出眼角一小截", "眼尾晕开一小片棕色阴影", "下眼睑扫了橘调（卧蚕被点亮）", "珠光点在眼球上方", "全包眼线（上下都描，眼神变重）", "双眼皮贴出一条更深的褶", "假睫毛（浓密款，眨眼有风）", "眼影只扫了一层灰调消肿", "眼头点了高光（显眼大）", "眼妆晕开（一圈黑渍挂在眼下）", "哭过之后（睫毛黏成一簇簇）", "没卸干净的眼影残在双眼皮褶里" ];
    const 眉毛库 = [ "浓眉（黑，一字排开）", "淡眉（浅淡如远山）", "粗眉（宽，压着眼）", "细眉（细，挑得高）", "前粗后淡（眉头浓，眉尾散）", "稀稀落落（毛量少，看得见皮肤）", "剑眉（直而斜上，眉峰尖）", "弯眉（柔和的弧线）", "柳叶眉（窄长而弯）", "八字眉（眉头高眉尾低）", "平直眉（几乎没有弧度）", "挑眉（眉峰高挑）", "新月眉（弧线圆润）", "一字眉（平宽，眉尾不收尖）", "扫帚眉（眉尾散开成扇形）", "断眉（眉尾被一道疤断开）" ];
    const 鼻型库 = [ "高挺直鼻（山根高，鼻梁直）", "扁塌鼻（山根低，鼻梁贴着面颊）", "小巧鼻（鼻头小，鼻翼窄）", "微驼峰（鼻梁中段起一个骨节）", "鹰钩鼻（鼻尖下垂带钩）", "蒜头鼻（鼻尖圆肉，鼻翼宽）", "鼻尖微翘（笑起来鼻尖上抬）", "鼻梁宽（正面看鼻影很宽）", "鼻翼张开（呼吸时两翼外扩）", "山根低平（眉与鼻几乎连成一片）", "鼻梁有浅疤（横过鼻梁一道旧痕）", "鼻尖泛红（常年擦鼻子留下的红）", "鼻头肉感（捏起来发软）" ];
    const 唇型库 = [ "薄唇（上唇几乎成一条线）", "丰唇（上下都厚，抿起来外翻）", "上薄下厚", "上厚下薄", "极薄（说话时嘴唇不明显）", "唇珠饱满（上唇中间一颗圆珠）", "唇峰分明（上唇两个尖角很清楚）", "嘴角天生上扬", "嘴角下垂", "唇线模糊（和皮肤没有清晰边界）", "唇形圆润（整体像一颗豆）", "上唇呈弓形", "下唇饱满微翘", "唇形尖锐（唇峰很尖）", "唇薄而宽（横向拉开）" ];
    const 唇色库 = [ "淡粉（几乎没血色）", "浅樱（带一点粉调）", "苍白（发灰的白）", "殷红（厚而浓的红）", "深红（暗下来的一层）", "暗红（几乎发褐）", "裸色（贴着原唇色）", "微紫（冻出来的紫）", "珊瑚色（橙调的红）", "豆沙色（灰调的红）", "玫红（偏冷的粉红）", "橘粉（暖调）", "蜜桃色（带橘的浅粉）", "干裂起皮（唇色被白皮分割）", "咬破后结的血痂", "唇上残留口红印（外缘一圈深色）" ];
    const 牙齿库 = [ "牙齿洁白整齐（一排对齐）", "齿列不齐（有一颗往里挤）", "虎牙（犬齿尖而外突）", "兔牙（两颗门牙长）", "牙缝微宽（门牙之间有一条缝）", "一颗银牙（后牙是金属色）", "犬齿微尖", "牙龈露出（笑起来一片粉）", "牙釉发黄（烟或茶的痕迹）", "缺了一颗牙（说话带漏风音）", "门牙磕掉一角", "笑纹（笑起来眼角有细纹）", "单侧酒窝（连着一侧嘴角）", "双侧酒窝", "梨涡（只在嘴角下一点）" ];
    const 下巴库 = [ "尖下巴（下颌收成一个点）", "方下巴（下颌前伸成方形）", "圆下巴（肉厚，线条柔）", "美人沟下巴（中间有一道凹线）", "双下巴（低头时挤出一层）", "下巴短小（下颌后缩）", "下巴微翘", "下颌角宽阔（腮帮子外扩）", "下颌角内收（脸型一路窄下去）", "下颌线分明（一道刀切的边）", "下颌微凸（侧面看有点往前）", "下巴有一道旧疤" ];
    const 耳型库 = [ "小巧贴面（几乎贴着脑袋）", "招风耳（耳廓向外张）", "耳垂厚实", "耳垂薄（几乎没有肉）", "耳朵外翻（耳轮卷得开）", "耳廓分明（软骨线条清楚）", "耳垂柔软（捏起来像软糖）", "耳廓有一圈小痣", "耳后有痣", "耳洞（左右各一个）", "耳廓有旧疤", "耳垂留着穿过耳环的孔痕", "耳垂被常年戴重耳坠拉长" ];
    const 脖型库 = [ "修长（颈线拉得很长）", "粗壮（和肩连成一片）", "细长优雅（锁骨上方留一道阴影）", "短而结实", "天鹅颈（长且直，转头时绷出一道筋）", "颈侧有痣", "颈侧有浅疤", "颈侧筋脉浮起", "后颈碎发贴着皮肤", "后颈有晒痕的色差", "颈上有吻痕", "喉结不明显（吞咽时轻轻起伏）", "领口上方一段脖子常年露着，晒得比脸深" ];
    const 素颜感库 = [ "素颜干净（毛孔看得见，但不脏）", "素颜有红血丝（两颊常泛红）", "素颜痘印（颊上几颗旧印）", "素颜有雀斑（鼻梁散落）", "素颜发黄（熬夜后的蜡黄）", "素颜发灰（长期室内，缺血色）", "素颜有黑眼圈（青紫挂到颧骨）", "素颜油光（T 区发亮）", "素颜干皮（鼻翼起白皮）", "素颜寡淡（五官全靠骨相撑着）", "素颜显小（像学生）", "素颜显老（眼下和法令纹先出来）", "素颜发亮（刚洗完脸的水光）" ];
    const 妆感库 = [ "完全不化（一年到头素面）", "只化一半（眉毛口红了，粉底没上）", "伪素颜（看不出化，但皮肤是平的）", "淡妆（薄粉加唇色）", "水光肌（整脸泛亮）", "雾面哑光（一点光都不反）", "奶油肌（柔光，边缘很软）", "妆感很重（粉浮在脸上）", "妆面斑驳（下午的浮粉）", "妆花了（泪和汗把粉冲开）", "只涂口红（其余全素）", "只在上班时化（回家立刻卸）", "妆比人年轻十岁（粉底盖住了所有纹路）", "妆和穿着不配套（脸很浓，衣裳很旧）" ];
    const 发型库 = [ "披散（长发垂在肩上）", "高马尾（把整张脸拉开）", "低马尾（松松垂在颈后）", "双马尾（从两侧耳后各吊一束）", "丸子头（全部盘在头顶一颗球）", "盘发（一丝不乱）", "编发（麻花辫搭在胸前）", "鱼骨辫（编出人字形纹路）", "半扎半披", "齐刘海（盖到眉毛）", "空气刘海（能看见额头）", "八字刘海（从中间分开）", "龙须刘海（两绺垂在颊边）", "大光明（全部向后梳）", "波波头（齐耳内扣）", "微卷披肩", "大波浪（卷度大，垂在背后）", "羊毛卷（小而密）", "狼尾（上短下长）", "发尾扫在肩头（没束）" ];
    const 发色库 = [ "黑（天然的乌黑）", "深棕（光下才看出棕）", "浅棕（亚麻感）", "银灰（几乎全白带冷调）", "纯白（染出来的白）", "红棕（带铁锈色）", "酒红（深到发紫的红）", "墨蓝（黑里透蓝）", "奶奶灰（灰白过渡）", "蓝黑（冷光下发蓝）", "紫黑（黑里透一层紫）", "赤褐（红得发暗的褐）", "金棕（染得发亮）", "铂金（淡金偏白）", "蜜糖色（暖调浅棕）", "挑染（只有几绺是别的色）", "渐变染（发根深发尾浅）", "染过但发根长出来了（一截黑一截色）" ];
    const 发质库 = [ "柔顺（梳子一过到底）", "粗硬（一根根立着）", "细软（贴着头皮）", "毛躁（干燥起静电）", "自然微卷", "蓬松（发量多，整个撑起来）", "贴头皮（出油后塌下去）", "干枯分叉（发尾发黄裂开）", "有光泽（灯下一条亮带）", "暗哑无光", "硬如鬃毛", "软如婴发", "被汗水黏在颈侧（几缕成绺）", "洗过没吹干（发尾还在滴水）" ];
    const 发长库 = [ "板寸（贴着头皮）", "齐耳（到耳垂上下）", "及颈（搭在脖子上）", "及肩（发尾扫锁骨）", "过肩（垂到胸口上方）", "及胸（发尾扫到乳房上缘）", "及腰（转身时甩出一道弧）", "及臀（坐下会压在臀下）", "过臀（坐下会压到）", "中长（到肩胛骨）", "长短不一（自己剪的，层次乱）" ];
    const 声线印象库 = [ "细（像小孩）", "沙（抽烟抽出来的哑）", "低（比外表低一截）", "鼻音重（像感冒没好）", "有口音（尾音拖长）", "语速快（一口气说三句）", "语速慢（一个字一个字往外放）", "尾音上扬（每句都像在问）", "笑的时候先抽一口气", "说话会吞字（尾音吃掉）", "开口前先停很久", "音量小（要凑近才听得清）", "音量突然拔高（一激动就破音）", "声音和脸不匹配（脸很软声音很硬）" ];
    const 惯常表情库 = [ "面无表情（嘴角是平的）", "抿嘴（把下唇往里收）", "咬下唇（紧张的时候）", "挑眉（一边眉毛先动）", "眯眼（笑之前先眯）", "皱眉（眉心有竖痕）", "嘴角天生上扬（不笑也像在笑）", "表情滞后（话说完半秒才反应）", "常常发愣（眼神从人身上滑开）", "笑不进眼睛（嘴动了眼没动）", "笑到露出牙龈", "说话时下巴微抬（俯视角度）", "习惯性低头（用刘海挡脸）", "一紧张就舔嘴唇", "先看人一眼再移开（不敢对视）" ];
    const 肤质库 = [ "细腻光滑（毛孔看不见）", "毛孔明显（鼻翼两侧一粒粒）", "偏干（冬天起白皮）", "偏油（T 区反光）", "混合（额头油两颊干）", "薄（能看见皮下的青色血管）", "厚（摸起来有韧性）", "松弛（捏起来没有弹性）", "紧实（大腿内侧也一样紧）", "有鸡皮（大腿外侧颗粒）", "有痘印（背上和胸口）", "有生长纹（大腿根的白线）", "有妊娠纹（小腹银色纹路）", "长期日晒粗糙（发硬发暗）", "常年捂在衣服里，白得发青" ];
    const 体毛库 = [ "腋下刮得很净（一点根都看不见）", "腋下有青茬（刮过三天）", "腋下留着一小片（没处理）", "手臂细软绒毛（光下才看得见）", "小臂汗毛明显（发黑）", "小腿毛刮过（短硬扎手）", "小腿毛没管过（长而软）", "手指背面有细毛", "唇上有极淡的小胡子", "肚脐往下一条绒线", "乳晕周围有几根", "全身几乎无毛（连手臂都光）", "体毛粗硬（像男人一样黑）" ];
    const 胸下垂库 = [ "挺（乳尖朝前上，不靠支撑）", "微坠（站直还行，弯腰就晃）", "微下垂（乳尖水平朝前）", "明显下垂（乳尖朝下，下缘压出折痕）", "重度下垂（乳尖指向地面，贴着小腹）", "一侧比另一侧更坠", "哺乳后下垂（上胸空了，下缘沉）", "减肥后下垂（皮松，里面是空的）", "假体托起（躺下还是半球）", "束胸勒久了，乳形被压扁", "只在脱掉内衣的那一刻才看出来" ];
    const 胸间距库 = [ "紧靠（胸沟只剩一条线）", "略分开（能夹住一根手指）", "分开（中间能放下一只手掌）", "外扩（乳尖朝两侧，正面看很宽）", "桶状间距（两边像是各长各的）", "一侧外扩更明显", "天生间距宽（锁骨到乳头的距离很长）", "因为胸大而互相挤压（反而没有缝）", "因为胸小而间距显眼", "内衣聚拢时贴着，脱掉立刻分开", "肋骨外扩导致的间距宽" ];
    const 胸手感库 = [ "软（一按到底，回弹慢）", "弹（按下去立刻弹回）", "紧实（底下有肌肉撑着）", "松（皮和肉分了层）", "绵（像按进棉花）", "有硬块（腺体组织）", "假体感（外软内硬，边缘分明）", "沉（一只手托不住）", "一握就满（小而有弹性）", "大而下坠（捧起来才有形）", "摸起来发烫（常年体温高）", "表面不平（有妊娠纹的手感）" ];
    const 阴阜库 = [ "饱满隆起（耻丘鼓成一团软肉）", "平坦光洁（几乎与下腹齐平）", "白虎（一根毛都没有，皮面完整）", "精心修剪成一条窄带", "修剪成倒三角小片", "杂草丛生（毛发蔓延到大腿根）", "剃过三天（一层黑茬扎手）", "剃了一半（只处理了边缘）", "毛发浓密卷曲（从耻丘散到股沟）", "皮下脂肪厚（捏起来一把软肉）", "皮下脂肪薄（能摸到耻骨）", "有一条竖着的浅色妊娠纹", "此处肤色比小腹深两度" ];
    const 大阴唇形状库 = [ "丰满外鼓（合上时像两片合拢的肉）", "薄而贴（合上只剩一道线）", "紧闭成一线（一线天，看不见内里）", "肉质厚实向外翻", "黑厚松软（下垂成两片肉帘）", "小而紧（两片拢得很齐）", "不对称（一侧明显更厚更长）", "薄窄粉嫩（几乎没有体积）", "肥硕层层堆叠（需双手掰开）", "肉多饱满（把穴口深嵌在其中）", "经产后松垮外翻", "中间有一道纵向的旧疤" ];
    const 大阴唇颜色库 = [ "雪白粉嫩（和腹部一个色）", "浅粉（毛细血管的颜色）", "粉褐（粉里带一层褐）", "浅褐（色素开始沉积）", "深褐（边界清楚的一圈深色）", "暗黑（常年摩擦的黑）", "紫红（充血状态下的红紫）", "焦褐（干皱的褐）", "肤色不均（一道深一道浅）", "边缘深中间浅", "一侧比另一侧深两度", "色素沉着呈斑块状" ];
    const 大阴唇饱满库 = [ "极薄（贴得像第二层皮）", "偏薄（有体积但不鼓）", "中等饱满", "多肉饱满（捏起来一把厚肉）", "极其肥厚（走路会互相摩擦）", "肿胀充血（碰一下就疼）", "松软（按下去不回弹）", "紧致（有弹性，皮肤绷着）", "一侧饱满一侧偏薄", "脂肪厚到看不见阴裂", "刚被摩擦过，红着涨着" ];
    const 小阴唇形状库 = [ "薄小内敛（完全藏在外面那两片里）", "薄而规整（边缘齐整如裁）", "薄小内收（羞怯地贴着）", "蝴蝶状（两片张开如翅）", "两片外翻下垂（垂出外唇一截）", "外翻卷边（边缘卷成一道褶）", "微翻外露（露出一点肉色）", "花瓣状（边缘有细密的齿）", "细长如带（一直垂到会阴上方）", "肥厚（本身就有体积）", "边缘发黑发皱（常年摩擦的痕）", "一侧偏长外露（另一侧收着）", "残缺（割礼后的疤痕收缩）" ];
    const 小阴唇颜色库 = [ "浅粉（刚发育的嫩色）", "粉嫩内敛（几乎与外面同色）", "浅玫瑰红", "深玫瑰红（充血后的浓艳）", "浅褐（色素淡淡沉着）", "深褐（边缘一圈焦色）", "暗黑（发亮的黑）", "紫红（涨起来的时候）", "焦褐色（常年外露风干）", "边缘深中心浅（一圈深的滚边）", "一侧深一侧浅", "揉搓过后的通红" ];
    const 小阴唇外露库 = [ "完全内敛（合上一点看不见）", "完全内包（藏在肉缝深处）", "内收（只在掰开时出现）", "内包（紧贴外唇内侧）", "微翻（站着看不见，蹲下露出）", "微翻外露（一条肉色边）", "外翻（明显探出外唇）", "外翻下垂（垂出一条肉）", "外翻卷边（边缘卷着翘）", "一侧外露一侧内敛", "只在兴奋时外翻", "湿润后自动张开", "被内裤勒出的缝隙里夹着一线" ];
    const 小阴唇对称库 = [ "完全对称（两侧长度厚度一致）", "基本对称（肉眼难辨的差）", "左侧偏长（垂下两三毫米）", "右侧偏长（垂下两三毫米）", "一侧偏厚（另一侧偏薄）", "一侧色深（另一侧是浅粉）", "一侧外翻另一侧内敛", "一侧边缘有裂口（旧伤）", "一侧打过环（孔痕留下）", "一侧被拉扯过（明显更长）", "两侧长度差到一厘米", "一侧有疤收缩（对不上）" ];
    const 阴蒂大小库 = [ "隐藏（完全埋在包皮下）", "小巧（只有一点肉粒）", "中等（剥开才见）", "明显凸出（不剥也看得见）", "肥大（像一颗小豆）", "很长（探出包皮外）", "充血后涨成一颗硬豆", "被捻搓到发红发亮", "常年摩擦变深色", "几乎摸不到（非常小）", "一侧有环孔痕" ];
    const 阴蒂包皮库 = [ "包皮短（阴蒂常年半露）", "包皮长（把阴蒂整个盖住）", "包皮肥厚（一层软肉压着）", "包皮薄（褶纹清楚）", "包皮深黑（常年摩擦的色）", "包皮可完全翻开（露出整个肉核）", "包皮粘连（翻不太开）", "包皮松（拨开就滑到一边）", "包皮紧（要把阴蒂挤出来）", "包皮上有细褶（一层层叠着）", "包皮裂过一道口（愈合的浅痕）", "色素沉着在包皮边缘一圈" ];
    const 阴道口库 = [ "窄小如针孔（初入阻力极大）", "一线（合上只剩一条缝）", "紧闭内收（掰开才见）", "馒头型（外唇鼓着把口藏住）", "花瓣型（口缘如花瓣张开）", "蝴蝶型（口周有外翻的肉片）", "均衡型（位置居中，大小适中）", "开口偏大（一眼就看见里面的褶）", "经产型（口缘松软，合不拢）", "口缘有侧切疤（硬结牵着）", "尿道口离得很近（几乎连在一起）", "湿润时嘴边挂着一层滑液", "阴道前庭泛红（摩擦后的充血）", "先天性狭窄（进去就疼）" ];
    const 阴道紧度库 = [ "极紧（初入几乎顶不开）", "紧窄（贴上柱身没有一丝空）", "偏紧（进去发涩）", "中紧（有阻力但顺）", "松紧适中（不涩也不空）", "前段紧后段松", "前松后紧（深处吸绞）", "松弛（产后明显，合不拢）", "干涩型紧（缺水所以涩）", "湿滑型紧（水多但肌肉很紧）", "肌肉型紧（盆底肌力量强，会主动夹）", "紧如处子（多年没有过）" ];
    const 阴道褶皱库 = [ "前端光滑（入口一段是平的）", "深处的褶皱密（层层叠到一起）", "全程浅褶（一路均匀的纹）", "一环环环状褶（像螺纹）", "褶皱沿一侧集中（换角度才有摩擦）", "褶皱交错（推进抽出触感不同）", "褶皱旋绕（绕着柱身转）", "褶皱粗大（刮着有明显的阻力）", "褶皱细密（像细绒）", "内壁松软（褶都摊平了）", "内壁强韧（褶绷得很紧）", "宫口附近一圈硬褶", "入口第一道夹环很明显" ];
    const 阴道深度库 = [ "浅（不到八厘米，一顶就到底）", "偏浅（八九厘米，撞得很快）", "中（八到十二厘米）", "偏深（十二厘米以上）", "深（要整个进去才够）", "深不见底（骨盆宽，探不到头）", "深而窄（长，但横向很紧）", "短而宽（浅，但不紧）", "深处有一个明显的穹隆", "宫口很低（轻易就能顶到）", "宫口很高（要探很久）", "长度与体型不符（小个子很深）" ];
    const 分泌物量库 = [ "极少（要很久才湿）", "少（只在口上有一层）", "中（清亮的一层）", "中偏多（能抹开一整片）", "多（顺着会阴往下流）", "丰富（拉出长丝）", "极多（一碰就涌）", "来得慢（前戏很久才出水）", "来得快（看一眼就湿）", "潮吹型（兴奋到顶点会喷）", "只在排卵期多（平时干）", "越到后面越多（越操越湿）", "服药后变少（干涩）" ];
    const 分泌物色库 = [ "无色透明（像水一样）", "清亮（微微带一点白）", "微白（乳白色的薄浆）", "米浆色（淘米水般的浊白）", "粘稠乳白", "乳白带丝", "微黄（久置氧化的黄）", "经期前后带一点浅褐", "淡粉（混了极少的血）", "黄白豆腐渣（病态的凝块）", "灰白稀薄", "黄绿脓性", "内裤上留下的一圈黄渍干痕" ];
    const 分泌物质库 = [ "清亮如水（几乎是纯水感）", "滑溜（抹开不黏手）", "微稠（有一点挂壁）", "黏（拉出短丝）", "拉丝（能拉很长才断）", "胶冻状（成一坨）", "奶浆状（乳白且浓）", "豆腐渣状（一搓就散）", "泡沫状（带气泡）", "油润（像抹了油）", "干涩发黏（水少但黏）", "一接触空气就变黏变黄", "覆在口缘一层透亮的膜" ];
    const 分泌物味库 = [ "几乎无味", "极淡的体香", "淡淡腥气", "生蚝般的海腥（排卵期）", "微酸（发酵的酸）", "乳酸微酸", "铁锈腥（经期）", "尿骚混着汗酸（一天没洗）", "鱼腥味（菌群失调的信号）", "酸腐豆腐渣味（霉菌的信号）", "腥臭刺鼻（滴虫的信号）", "玫瑰香氛味（喷过私处香）", "洗衣液与皂角残留的干净味", "捂了一整天的闷热骚气", "刚被内射过的腥膻" ];
    const 会阴库 = [ "平整（一道浅浅的缝）", "薄而紧（皮肤绷着）", "肉厚（两腿并拢时挤出一道沟）", "色素沉着（比周围深两度）", "有一条顺产侧切的旧疤", "有撕裂愈合的疤（牙印状）", "有暗色的坐茧", "常年闷出汗，皮色发亮", "有一圈浅浅的褶皱", "有打过环的孔痕", "会阴体短（阴道口离肛口很近）", "会阴体长（中间有一段距离）", "蹭破过（红着疼）" ];
    const 肛门颜色库 = [ "浅粉（和周围皮肤同色）", "粉褐（略深一圈）", "浅褐（淡淡沉着）", "深褐（一圈明显的深色）", "暗黑（常年摩擦的黑）", "紫红（充血时）", "色沉均匀（整圈一致）", "色沉成斑（一块深一块浅）", "中间深边缘浅", "边缘深中间浅", "外翻的肉呈暗紫", "擦破后的一圈红" ];
    const 肛门形状库 = [ "紧闭如菊（一层层细褶收着）", "细褶匀称（纹路整齐）", "褶皱稀疏（几乎是平的）", "褶皱深密（一圈一圈的沟）", "外翻（内里的黏膜翻出来一圈）", "松（合不拢，露出一个口）", "开败的花状（褶被撑散了）", "肉花状（一层叠一层）", "缩成一朵（紧张时会自己收）", "有一道旧裂口（愈合的浅疤）", "边缘有一圈磨破的皮", "有外痔（口边一颗软肉）", "被撑开过（比原来大一圈）" ];
    const 处女膜库 = [ "完整（环状，孔小）", "完整（筛状，中间有多个小孔）", "完整（伞状，边缘呈齿）", "薄弱（一碰就破的那种）", "厚韧（弹性好，不易破）", "残存（破过但留着一圈痕）", "破裂（裂口整齐，一颗齿痕）", "破裂（多处裂痕，边缘旧了）", "已无（只剩一圈浅色印）", "先天性缺如", "闭锁（完全封死，疼痛剧烈）" ];
    const 私处观感库 = [ "白虎（无毛遮挡，缝与唇完整显露）", "馒头屄（外唇鼓着，缝藏在软肉里）", "肥屄（厚肉感，掰开前后形态差很多）", "小巧型（整体比例小，结构紧凑）", "内瓣明显（内唇从外唇间探出）", "肥厚多汁深黑蚌（常年开发，湿热泥泞）", "深埋肉山（脂肪厚帘，要双手掰开）", "粉嫩紧致微闭（极少性经验）", "经产型松软外翻（侧切疤硬结）", "干涩发白萎缩型（内壁干涸，进入疼痛）", "一线天（合上只剩一道粉线）", "红肿充血（刚被摩擦过，发烫）", "不对称肉唇（一侧偏长外露，焦褐褶皱）", "肉缝里那圈嫩肉自行翕动收缩", "两瓣肥厚外唇夹着一道深肉缝", "乌黑油亮的毛整片盖在耻丘上" ];
    const 上装库 = [ "衬衫（领口松了两颗扣子）", "T恤（洗到发白的圆领）", "卫衣（袖子长过手背）", "西装外套（肩线笔挺）", "风衣（腰带随意一束）", "针织开衫（扣子系错了一颗）", "高领毛衣（把脖子整个包住）", "吊带（肩带细得像两根线）", "抹胸（上面什么都没有）", "旗袍（开衩到膝上一掌）", "肚兜配外罩衫（一根绳系在颈后）", "制服（熨得没有一丝褶）", "工装外套（口袋鼓着）", "皮衣（肩头磨得发亮）", "露脐短上衣（抬手就露出一截腰）", "透视蕾丝衫（里面穿什么一目了然）", "运动背心（汗湿贴在背上）", "羽绒服（穿起来像一个桶）", "真丝衬衫（腋下湿了一块深色）", "校服外套（袖口用圆珠笔涂过）", "哺乳内衣配宽松家居服" ];
    const 下装库 = [ "西裤（裤线笔直）", "牛仔裤（膝盖处磨白）", "百褶裙（走动时一层层翻开）", "包臀裙（把臀线整个绷出来）", "A字裙（膝盖以上一掌）", "鱼尾裙（到膝盖突然收住）", "阔腿裤（把腿型全遮掉）", "铅笔裤（勒出腿的每一段曲线）", "热裤（裤脚刚好卡在臀下缘）", "开衩长裙（走路时露出一条腿）", "工装裤（裤脚卷了两折）", "运动裤（松紧带松了）", "长裙（垂到脚踝）", "一步裙（迈不开步）", "低腰裤（弯腰时露出一截腰窝）", "裙裤（看着像裙，其实是裤）", "超短裙（坐下要压着裙摆）", "马面裙（褶子一层叠一层）", "透明下装（里面那条看得一清二楚）", "校服长裤（膝盖顶出一个包）" ];
    const 内衣库 = [ "纯棉无钢圈文胸（没有一点形状）", "蕾丝文胸（边缘从领口露出一线）", "黑色成套蕾丝（后背是交叉绑带）", "肤色无痕内衣（穿了像没穿）", "运动内衣（把胸压平）", "聚拢款（硬把两边挤到一起）", "半罩杯（上半乳肉露在外面）", "前扣文胸（扣子是一颗小珍珠）", "法式薄杯（只有一层纱）", "肚兜（背后一根细带）", "抹胸（没有肩带，全凭勒）", "裹胸（像一条布缠上去）", "肩带滑落一半（挂在臂弯上）", "钢圈勒出红印（脱下来一道痕）", "哺乳内衣（前扣一解就开）", "真空（不穿内衣）" ];
    const 内裤库 = [ "纯棉三角裤（腰侧松紧松了）", "低腰三角裤（卡在髋骨上）", "高腰收腹款（把小腹压平）", "平角裤（大腿根包得严实）", "丁字裤（后面只有一根线）", "T-back（侧边细成一条绳）", "C字裤（没有腰带，靠夹住）", "高衩款（侧边开得很高）", "包臀内裤（把整个臀部裹住）", "蕾丝镂空款（透着皮肤的颜色）", "生理裤（底裆加了一层）", "运动无缝内裤", "底裆泛黄硬结（很久没换洗）", "勒进去了一半（卡在臀缝之间）", "边缘勒出浅浅一道红印", "湿了一小块（透出深色）" ];
    const 袜子库 = [ "肉色超薄连裤袜（八到十五丹尼）", "黑色不透连裤袜（六十丹尼以上）", "黑色压力连裤袜（把腿压得很紧）", "改开裆连裤袜（裆部剪开了一道）", "长筒袜（袜口在大腿中部）", "及膝袜（袜边在膝上卷起来）", "吊带袜（金属扣在裙摆下若隐若现）", "渔网袜（格子大得能塞进手指）", "蕾丝边短袜（袜口一圈花）", "船袜（完全藏在鞋里）", "羊毛厚袜（配短裙）", "天鹅绒袜（在灯下泛着一层哑光）", "勾丝（一道线从小腿爬到大腿）", "破洞（脚趾顶出来一个口）", "被水浸透（颜色深了一层，贴在腿上）", "大腿后侧的袜线微微歪斜" ];
    const 鞋子库 = [ "尖头细高跟（鞋面擦得锃亮）", "粗跟高跟鞋（站得稳但不轻快）", "圆头平底鞋（走路没有声音）", "运动鞋（鞋头有一道折痕）", "帆布鞋（鞋边发黄）", "马丁靴（鞋带松着）", "过膝长靴（靴口勒在大腿）", "切尔西短靴（一脚蹬）", "乐福鞋（鞋面有一枚金属扣）", "玛丽珍（脚背上一条绑带）", "绑带凉鞋（带子一直缠到脚踝）", "人字拖（脚趾夹着一根带）", "绣花布鞋（鞋底磨薄了）", "后跟磨得歪斜（走路声音一边轻一边重）", "鞋底磨穿了一个角", "沾了泥点（没来得及擦）" ];
    const 饰品库 = [ "一副金丝边眼镜（镜片上有指印）", "黑框眼镜（镜架压着鼻梁）", "耳垂一对细银钉", "长耳坠（转头时打到脖子）", "锁骨链（链坠刚好落在锁骨窝）", "颈项一圈 choker（勒出一道痕）", "玉镯（在手腕上碰出声音）", "金属腕表（表带内侧有汗渍印）", "戴前夫留下的银戒（戴在右手无名指）", "胸链（从颈后绕到胸下）", "腰链（垂在髋骨上一荡一荡）", "腿环（在大腿中部勒出一道）", "脐环（一颗小小的金属珠）", "发簪（一根乌木，把头发一把别住）", "红绳脚链（系在左脚踝）", "丝巾（随意系在包带或脖子上）", "一片素净（身上没有任何首饰）" ];
    const 妆容库 = [ "完全素颜（洗完脸就出门）", "伪素颜（看不出化，但皮肤是平的）", "只画眉和口红（其余全素）", "淡妆上班（薄粉底加一点腮红）", "浓艳妆容（眼影唇色都很重）", "眼尾一层薄红（只在眼角晕开，不往脸中走）", "雾面哑光底妆（一点光都不反）", "水光肌（整张脸亮得反光）", "奶油肌（柔光，边缘很软）", "金属光眼妆（眼睑一条银色）", "古典妆容（细眉，唇画成一点）", "妆面斑驳（下午鼻翼开始浮粉）", "妆花了（眼泪把眼线冲成两道黑）", "口红只剩边缘一圈", "指甲涂了一周没补（指尖掉了一块）", "身上还留着粉底印（脖子和领口色差）" ];
    const 穿搭风格库 = [ "休闲（牛仔裤配 T 恤）", "正装（衬衫套裙，事事有据）", "运动（一身速干，随时能跑）", "街头（宽大外套配球鞋）", "复古（旧色毛衣配长裙）", "慵懒（家居服就下楼买菜）", "简约（全身不超过两个颜色）", "精致（每一件都熨过）", "奢华（面料一看就贵）", "低调（没有 logo，但剪裁好）", "朋克（铆钉配黑皮）", "森系（亚麻与米白）", "波西米亚（长裙大披肩）", "学院风（格纹配及膝袜）", "机能风（一身黑，口袋很多）", "赛博朋克（反光面料配荧光条）", "新中式（立领盘扣配阔腿裤）", "老钱风（羊绒大衣，颜色很闷）", "暗黑系（全身黑，妆也重）", "甜酷（短裙配厚底靴）", "御姐（西装外套踩高跟）", "软妹（毛绒外套配短裙）", "制服（上班那一身，下了班也懒得换）", "看不出风格（衣服都是别人给的）" ];
    const 暴露度库 = [ "完全包裹（只露脸和手）", "保守（领口到锁骨，裙到膝盖）", "正常（短袖加及膝下装）", "清凉（吊带短裤，露肩露腿）", "露腰（上衣短一截，走动时露一段）", "露背（后背一直开到腰窝）", "深 V（乳沟露出大半）", "露臀（短到坐下就压不住）", "若隐若现（薄纱下什么都能看见）", "半透（内衣的颜色透在外面）", "开裆（外面看着完整，里面是空的）", "真空上阵（不穿内衣，轮廓全露）", "真空下身（裙子底下什么都没有）", "极度暴露（只遮住三点，其余全露）", "象征性遮盖（一条布，遮不住什么）", "已经湿透贴在身上（等于没穿）" ];
    const 场合适配库 = [ "上班那一身（一丝不苟，扣到最上面）", "下了班立刻换掉（回家先脱高跟鞋）", "见你时特意换过（头发吹过，香水喷过）", "在家穿的那套（旧 T 恤，洗松了）", "只在工作时穿（制服就是她的壳）", "买菜接孩子的装束（方便，耐脏）", "约会那一身（比平时紧一号）", "参加婚礼或葬礼（黑裙子，不说一句话）", "去夜场的那身（亮片，短，妆重）", "回老家那一身（把自己包起来）", "见家长的那身（挑最素的穿）", "医院里那一身（怕被人记住）", "永远一套衣服（她只有这么一件）", "换季了还没换（冬天穿薄外套）" ];
    const 破绽库 = [ "袖口染了一小片墨渍（没洗掉）", "衣角有洗旧的痕迹", "领口内侧有一圈粉底印", "裙摆有缝补过的针脚（线色不一样）", "扣子掉了一颗，用别的补上", "袜子勾了一道丝（她不知道）", "丝袜破洞在后侧（她自己看不见）", "鞋跟磨得歪斜（走路一边响）", "鞋面沾着干掉的泥点", "内衣肩带露在衬衫外面", "内裤边从裤腰里翻出来一截", "拉链拉了一半（忘了）", "衬衫下摆没塞好，一边翘着", "外套上有一根不属于她的头发", "衣领上有一枚浅色的唇印", "身上有一点烟味（她说不抽）", "包很旧，但里面的口红是新的", "手机响的时候她先看了一眼才挂", "手腕上有一道新勒痕（袖口盖着）" ];
    const 性病库 = [ "淋病（尿道口与宫颈口大量黄绿色脓性分泌物，尿道口红肿外翻，排尿刀割样痛，宫颈充血脆性出血）", "衣原体感染（多数无症状；少量浆液性黏液脓性分泌物，宫颈接触性出血，尿频尿痛轻）", "梅毒·一期（硬下疳：单发、无痛、边界清楚、基底干净的硬结溃疡，触之如软骨；腹股沟无痛淋巴结肿大）", "梅毒·二期（全身梅毒疹，掌跖丘疹鳞屑，外阴肛周扁平湿疣，口腔黏膜斑，虫蚀样脱发，全身淋巴结肿大）", "梅毒·潜伏期（完全无体征，仅血清学阳性，可终身潜伏）", "梅毒·三期（树胶肿无痛结节性溃破坏死，马鞍鼻，主动脉炎，脊髓痨，痴呆与瘫痪）", "生殖器疱疹·原发（前驱刺痛灼热瘙痒，成簇小水疱，浅表溃疡，剧痛到无法排尿，腹股沟淋巴结肿大压痛）", "生殖器疱疹·复发（前驱痒痛，二到五个水疱，一周痊愈，发作频率因人而异）", "尖锐湿疣（低危 HPV：乳头状、菜花状、鸡冠状赘生物，质脆弱易出血，多数不痛，可融合成片）", "高危 HPV 感染 / CIN（几乎无症状，偶见接触性出血、白带增多，可进展为宫颈上皮内瘤变）", "滴虫病（大量黄绿色泡沫状腥臭白带，外阴阴道灼热瘙痒，性交痛，草莓样宫颈点状出血）", "细菌性阴道病（灰白稀薄白带，鱼腥味，性交或经期后加重，不痒或轻痒，阴道 pH 大于 4.5）", "外阴阴道念珠菌病（白色豆腐渣凝乳样白带，剧烈瘙痒夜间重，外阴红肿灼痛，排尿痛）", "阴虱（阴毛区剧烈瘙痒夜间重，青灰色斑，毛干可见虫卵，内裤可见点状血迹）", "疥疮（夜间剧痒，红色丘疹与隧道样皮损，生殖器见结节性疥疮无痛结节）", "传染性软疣（半球形蜡样光泽丘疹，中央脐凹，可挤出白色软疣小体，多数不痛）", "软下疳（多发疼痛剧烈的溃疡，边界不整，质软，脓性渗出，恶臭；约半数腹股沟淋巴结化脓破溃）", "性病性淋巴肉芽肿 LGV（初期无痛小丘疹或浅溃疡常被忽略，继而腹股沟淋巴结肿大融合化脓瘘管，伴发热）", "腹股沟肉芽肿（无痛、牛肉红色、易出血的增生性肉芽组织，边缘隆起卷曲，缓慢扩大）", "支原体 / 解脲脲原体感染（非淋菌性尿道炎或宫颈炎：少量透明或浆液性分泌物，尿道刺痒，晨起尿道口糊口）", "HIV 感染·急性期（类流感：发热咽痛，全身淋巴结肿大，皮疹，腹泻；无生殖器特异性体征）", "乙型肝炎（性传播，非生殖器：乏力，食欲差，黄疸，肝区痛；多数轻症或无症状）", "淋菌性咽炎 / 直肠炎（咽痛多无症状；里急后重，肛周灼痛，黏液脓血便，直肠黏膜脓性分泌物）", "阴部硬化性苔藓 / VIN（皮肤瓷白色羊皮纸样，皱缩，呈 8 字形分布，剧痒皲裂，阴道口狭窄性交痛）" ];
    const 性病分期库 = [ "潜伏期（已感染，任何体征都没有，血清或核酸阳性）", "前驱期（只痒或刺痛灼热，看不到东西）", "急性期（典型体征全部在场，疼痛与分泌物达峰）", "慢性期（体征持续但减轻，转为长期背景）", "带菌期（无症状但可传染，她看起来完全正常）", "反复发作期（周期性回归，配合发作频率）", "已治愈（病原清除，体征消失，痕迹与免疫记忆保留）", "后遗症期（病原已清，损害不可逆：输卵管粘连、宫颈癌、神经梅毒、直肠狭窄）" ];
    const 性病治疗库 = [ "未诊治（自己也不知道，或知道但不敢去）", "自行买药（网购或药店乱买，剂量不足、疗程中断）", "规范治疗中（按疗程用药，体征正在减退，身上有药味）", "治疗失败（耐药或依从性差）", "已治愈（病原学转阴）", "带病生存（病毒性，无法清除，只能压制）", "放弃治疗（湿疣长满不治，溃疡烂着不管）" ];
    const 性病部位库 = [ "外阴（大阴唇、小阴唇与阴阜的统称）", "大阴唇（外侧那两片脂肪肉唇）", "小阴唇（内侧那两片薄肉褶）", "阴蒂及包皮（那颗小肉核与盖着它的皮）", "阴道前庭（小阴唇之间那片凹面）", "阴道壁（内壁黏膜，接触面最大）", "宫颈（深处那个圆钝的宫口）", "尿道口（阴蒂下方那个小孔）", "巴氏腺（前庭大腺，开口在阴道口两侧）", "会阴（阴道口与肛口之间的那段）", "肛周（肛口外一圈放射状褶皱）", "肛管直肠（肛口往里那一段）", "口咽（口腔与咽部，口交途径）", "腹股沟淋巴结（大腿根那串豆状腺体）", "下腹（耻骨上方的下腹部皮肤）", "大腿内侧（两腿相贴的那面皮肤）", "全身皮肤（二期梅毒疹的分布面）", "肝（乙肝的靶器官，与生殖器无关）" ];
  },
  "./src/神奇手机/神奇手机/核心/库扩展.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      个人纪年库: () => 个人纪年库,
      主要媒介库: () => 主要媒介库,
      交易链库: () => 交易链库,
      住所库: () => 住所库,
      作息库: () => 作息库,
      兼容修正: () => 兼容修正,
      勒索链条库: () => 勒索链条库,
      历史事件库: () => 历史事件库,
      口音库: () => 口音库,
      媒介失真库: () => 媒介失真库,
      媒介能力库: () => 媒介能力库,
      宠物库: () => 宠物库,
      年代印记库: () => 年代印记库,
      性病携带库: () => 性病携带库,
      慢病库: () => 慢病库,
      成瘾库: () => 成瘾库,
      手机型号库: () => 手机型号库,
      沉默方式库: () => 沉默方式库,
      消失方式库: () => 消失方式库,
      涉毒成瘾库: () => 涉毒成瘾库,
      涉罪库: () => 涉罪库,
      混合语库: () => 混合语库,
      生育实况库: () => 生育实况库,
      病故意外库: () => 病故意外库,
      私密度库: () => 私密度库,
      精神库: () => 精神库,
      药物库: () => 药物库,
      设备库: () => 设备库,
      语域库: () => 语域库,
      谁在看库: () => 谁在看库,
      谁的地盘库: () => 谁的地盘库,
      谁能进库: () => 谁能进库,
      车库: () => 车库,
      长线终点库: () => 长线终点库,
      陷阱设局库: () => 陷阱设局库,
      随身物库: () => 随身物库,
      骗局库: () => 骗局库
    });
    const 语域库 = [ "正式（像在工作）", "半正式（对外人）", "街头（口语、带脏字）", "网络（梗、缩写、颜文字）", "方言（本地话，外来人听不懂）", "古语（家里长辈教的老话）", "宗教用语（引经据典）", "混合（一句里三种）" ];
    const 口音库 = [ "台湾腔（软、尾音上扬）", "东北话（儿化音、直）", "四川话（尾音拖）", "广东话（粤语为母语）", "湖南塑料普通话", "江浙口音（软糯）", "日本关西腔", "日本东北腔", "韩语釜山腔", "泰语依桑腔", "印度英语（卷舌 t/d）", "菲律宾英语（美式底子）", "尼日利亚英语（重音在别处）", "俄语腔（尾音下压）", "法语腔（连读、r 音）", "西语腔（语速快）", "中东英语（送气重）", "完全没有口音（播音腔）", "口音是装的（她会切换）", "口音随场合变" ];
    const 混合语库 = [ "母语 + 英语（够用）", "母语 + 英语（很好）", "母语 + 你的语言（学了两年）", "母语 + 三种（做过翻译）", "只会母语（用翻译软件）", "只会英语（她国家的少数）", "母语 + 方言 + 英语", "她在你面前刻意不用母语" ];
    const 沉默方式库 = [ "已读不回（她看到了）", "直接不回（可能没看到）", '回了"嗯"（她在敷衍）', "回了表情（她不想打字）", '隔很久回一个"在"', "突然消失（几天）", "删掉刚发的那条（她后悔了）", "语音里不说话的几秒（她在想）", '打完又删（你看到"正在输入"闪了一下）', "她只在你白天发消息时不回" ];
    const 年代印记库 = [ {
      出生: "1970s",
      印记: "不熟网络，用微信但不发朋友圈"
    }, {
      出生: "1980s",
      印记: '论坛时代过来的，懂"老司机"'
    }, {
      出生: "1990s",
      印记: "微博/QQ 空间一代，会写长文"
    }, {
      出生: "2000s",
      印记: "短视频原生，不写长句"
    }, {
      出生: "2000s 后",
      印记: 'AI 时代长大，对"网上的东西是真的"没概念'
    } ];
    const 历史事件库 = [ "家里经历过下岗", "父母是下岗后做小生意的", "经历过那几年的封控（生意垮了）", "经历过汇率暴跌（存款没了）", "家里是移民（她在这边长大）", "她是难民身份", "她所在的城市经历过大地震", "家里被征地过", "家里开过矿 / 工厂，后来倒了", "她父亲出过事", "她读书时正好赶上扩招（学历贬值）", "她毕业那年正赶上最难就业", "她做过导游（之前那波旅游业垮了）", "她在疫情期间做过线上生意", "家里有人在一线（医疗 / 军警）", "她本来要出国，没走成" ];
    const 个人纪年库 = [ "离婚那天（每年会低落）", "流产那天", "孩子生日（她见不到孩子）", "母亲忌日", "父亲的生日（他不在了）", "第一次做这行那天", "被前任打的那天", "退学那天", "离家的那天", "第一次给家里汇钱那天（她记得）", "她的农历生日（只有老家记得）", "她固定每月的某几天要闭关" ];
    const 作息库 = [ "白班（早八晚六，晚上最闲）", "夜班（凌晨下班，白天睡）", "两班倒（作息不规律）", "自由职业（全天在线，但可能在忙）", "全职妈妈（只有孩子上学那几个小时）", "学生（只有熄灯后）", "全职主播（晚上八点到凌晨两点）", "倒时差（她在另一个半球）", "随叫随到（她没什么正事）", "周末才有空（工作日完全消失）" ];
    const 主要媒介库 = [ "只用文字（从不语音）", "文字为主，偶尔语音", "语音为主（她懒得打字）", "照片流（她爱拍）", "视频通话（她主动开）", "直播（你只能看）", "只发定位和短句", "她要求见面才聊" ];
    const 媒介能力库 = [ {
      媒介: "文字",
      能看见: "她的用词、打字速度、删改痕迹",
      看不见: "她的脸、她的房间、她说这话时的表情"
    }, {
      媒介: "语音",
      能看见: "她的声音、口音、呼吸",
      看不见: "她的脸、她在哪、有没有别人在旁边（除非有回声）"
    }, {
      媒介: "照片",
      能看见: "一个房间、背景里的物件、光线",
      看不见: "时间（可能是三天前拍的）"
    }, {
      媒介: "实时照片",
      能看见: "当下",
      看不见: "镜头外的一切"
    }, {
      媒介: "视频",
      能看见: "脸、环境、动作连续性",
      看不见: "镜头对着的那块之外"
    }, {
      媒介: "见面",
      能看见: "全部，包括她不想让你看的",
      看不见: "她脑子里的"
    }, {
      媒介: "代传",
      能看见: "中间人想让你看见的",
      看不见: "真实的任何东西"
    }, {
      媒介: "直播",
      能看见: "她表演出来的",
      看不见: "私下的她"
    } ];
    const 设备库 = [ "最新款旗舰机（画质好，会修图）", "中端安卓（够用）", "旧手机（屏碎了两年没换）", "两部手机（一部工作一部私人）", "手机是别人给的", "有单独的相机（她拍得认真）", "有环形灯和支架（她做这个的）", "网络很差（视频总卡）", "合租的公共 WiFi（她不敢开视频）", "一切都是凑合的（背景很乱）" ];
    const 媒介失真库 = [ "开美颜（脸比真人小一圈）", "只拍左脸", "用滤镜但装作没用", "打码（她不敢露脸）", "只发半身（看不到肚子）", "只发旧照片", "照片是真的，但角度骗人", "声音是装的（平时说话不是这样）", "她开了变声", "她的背景永远很干净（收拾过）" ];
    const 手机型号库 = [ "碎屏中端机（贴了胶带）", "最新款（分期买的）", "旧款苹果（别人给的）", "两部（一部只用来做这个）", "屏幕有小裂痕但没修", "壳上贴满了贴纸", "壳很素（什么都没有）", "锁屏是风景照（不是家人）" ];
    const 车库 = [ "没有车（坐公交）", "电动车（上下班用）", "国产小车（五年了）", "二手车（前男友留下的）", "有车但不开（油价贵）", "家里有车（老公的）", "豪车（她的经济状况不一般）", "网约车（她自己跑）" ];
    const 住所库 = [ "城中村单间（合租卫生间）", "老小区一居（隔音差）", "合租房（室友在隔壁）", "新小区两居（她一个人住）", "和父母住（自己的房间）", "和老公住（主卧 + 次卧）", "带孩子住（两室）", "宿舍（四人间 / 八人间）", "短租公寓（她可能随时走）", "村里的房子（砖房带院）" ];
    const 随身物库 = [ "很旧的银戒指（中指）", "一根一直戴着的红绳", "小瓶风油精", "一包没拆的纸巾", "孩子的照片夹在手机壳里", "一张过期的电影票", "一串钥匙（比一般人多）", "一瓶水（永远是热的）", "耳机线缠得很乱", "什么都没有（她身上很干净）" ];
    const 宠物库 = [ "一只猫（名字是前男友起的）", "一只狗（她每天要遛）", "猫在老家，她在这边", "养过，死了（她不愿提）", "楼下喂的流浪猫（不算她的）", "没有（养不起）", "鱼（死的比活的多）", "一只很老的猫（她怕它走）" ];
    const 谁的地盘库 = [ "她的地方（她说了算）", "她父母的地方", "她老公的地方", "合租（公共区域谁都能进）", "酒店（谁都不算主人）", "你的地方", "公共场合（谁都不安全）", "她工作的地方（有规矩）" ];
    const 谁能进库 = [ "没人能进（她不让人去）", "只有她能进（她让你去是破例）", "合租的室友能进", "家人随时能来（★最危险）", "老公随时回来", "房东有钥匙", "谁都能进（半公开）", "门口有人看着" ];
    const 谁在看库 = [ "没人在看", "邻居（认识她家人）", "楼下大爷（他一直坐在那）", "村里的眼睛", "摄像头（楼道 / 电梯 / 小区）", "同事（她怕被撞见）", "她老公的朋友", "网上的陌生人（她怕被扒）", "她自己的粉丝（她怕掉粉）", "没有人，但她觉得有" ];
    const 私密度库 = [ "完全私密（关了门就是她的）", "半私密（墙很薄）", "能听见别人（她要压低声音）", "别人能听见她", "随时可能有人来", "她必须随时准备收场", "公开场合（她反而更放开）", "完全没隐私（宿舍 / 群租）" ];
    const 慢病库 = [ "没有（她身体还行）", "乙肝携带（她不敢说）", "HPV（她查出来过，治了）", "HIV 阳性（她每天吃药，病毒量控制住了）", "糖尿病（她不能吃甜的）", "甲状腺（她吃药，情绪会不稳）", "多囊（月经不规律，她不好怀）", "慢性胃炎（她一紧张就疼）", "哮喘（换季会发作）", "贫血（她容易累）", "脊柱问题（久坐会痛）", "她没查过（不敢去医院）" ];
    const 精神库 = [ "没有明显问题", "长期焦虑（她半夜会醒）", "抑郁（在吃药）", "抑郁（没在吃药）", "创伤后应激（和某个场景有关）", "双相（有药物控制）", "进食障碍（催吐过）", "她自残过（手腕上有）", "她在看心理医生（每周一次）", "她什么都没说，但你能看出来" ];
    const 药物库 = [ "不吃药", "避孕药（每天定时）", "抗抑郁药（早上吃）", "安眠药（她睡不着）", "止痛药（常吃）", "甲状腺药", "抗病毒药（每天，不能断）", "中药（她信这个）", "止痛药依赖（她不说）", "她的药从来不让别人看见" ];
    const 成瘾库 = [ "没有", "烟（一天半包）", "烟（她戒过三次）", "酒（应酬要喝）", "酒（她一个人也喝）", "短视频（每天刷到凌晨）", "网购（她有还不起的账单）", "赌博（她输过钱）", "网赌（她还没停）", "药物依赖（医生开的，超量了）" ];
    const 骗局库 = [ {
      类型: "不是骗局",
      特征: "她就是个普通人"
    }, {
      类型: "chatter 代聊",
      特征: "你在跟一个团队聊，本人可能不知道"
    }, {
      类型: "照片盗用",
      特征: "照片是真的，属于另一个人"
    }, {
      类型: "杀猪盘前期",
      特征: "她（他）不急着要钱，先陪你三个月"
    }, {
      类型: "杀猪盘中期",
      特征: '开始带你"投资"，小额先让你赚'
    }, {
      类型: "仙人跳",
      特征: "见面前后有人敲门"
    }, {
      类型: "假中介",
      特征: "收定金就拉黑"
    }, {
      类型: "原味诈骗",
      特征: "收了钱不发东西"
    }, {
      类型: "裸聊勒索",
      特征: "视频里你露脸了，然后有人来要钱"
    }, {
      类型: "代收洗钱",
      特征: "她请你帮忙过一笔账，你不知道那是什么"
    }, {
      类型: "真爱型",
      特征: "她真的喜欢你——但她在骗别人，而你是真的"
    }, {
      类型: "她自己也是受害者",
      特征: "她被关在园区里，用她的号在骗你"
    } ];
    const 性病携带库 = [ "完全健康（洁白体检报告，无任何病原体）", "完全健康（洁白体检报告，无任何病原体）", "完全健康（洁白体检报告，无任何病原体）", "高危型 HPV 携带（宫颈中度柱状上皮病变，内壁触碰易轻微渗血）", "生殖器疱疹（急性期外阴溃烂渗液簇状水疱，剧烈触痛，高传染性）", "淋病急性潜伏期（尿道灼痛、伴大量黄色脓性白带恶臭）", "衣原体与支原体感染（慢性盆腔炎，下腹隐痛，分泌物浑浊）", "早期梅毒（外阴小阴唇隐蔽处硬下疳无痛性溃疡，高传染螺旋体）", "HIV 阳性（长期每日服用抗病毒阻断维持，高危致命陷阱）", "重度霉菌性阴道炎（阴道黏膜充血，大量凝乳状豆腐渣酸臭分泌物）" ];
    const 生育实况库 = [ "未孕未育（年轻紧致，无生产创伤）", "经产已育（生过 1 胎，剖腹产下腹横切刀口，内壁微松）", "经产顺产（顺产 2 胎，骨盆略宽，宫颈外口呈横裂状松软）", "隐秘早孕（已怀身孕 4 周，不知生父是谁，正处极度恐慌中）", "产后哺乳期（产后 4 个月，双乳丰盈胀奶发烫，稍有刺激即溢出母乳）", "宫内节育环（体内置有金属避孕环，房事碰撞有微弱金属异物感）", "排卵期受孕峰值（宫颈黏液高度拉丝，内射中招率高达 50% 危险期）", "多次流产病史（做过 3 次人流钳刮，子宫内膜极薄，习惯性腹痛）" ];
    const 涉毒成瘾库 = [ "完全不碰（身心纯净，生活习惯健康）", "完全不碰（身心纯净，生活习惯健康）", "轻度社交大麻（仅在海外或派对吸食，微醺松弛）", "笑气/气弹重度吸食（神经麻痹反应迟钝，房间堆满空金属气弹罐）", "处方镇静剂严重滥用（思诺思/阿普唑仑超量服用，神情恍惚依赖）", "违禁催情水强迫依赖（神经阈值被玩坏，必须大剂量药物才能出水）", "冰毒/麻古接触史（神经放电狂暴，瞳孔散大，做爱极度疯狂发狂）", "阿片类镇痛药成瘾（曲马多/芬太尼依赖，断药时浑身抽搐流涕冷汗）", "严重酒精依赖酗酒（每天空腹饮烈酒，情绪极度不稳定）", "病态网赌网贷拆借（背负数十万高利贷催收，精神濒临崩溃边缘）" ];
    const 陷阱设局库 = [ {
      类型: "真实素人（无陷阱）",
      详情: "普通百姓或良家，不存在任何人为设伏或做局",
      战力: 0
    }, {
      类型: "真实素人（无陷阱）",
      详情: "普通百姓或良家，不存在任何人为设伏或做局",
      战力: 0
    }, {
      类型: "真实素人（无陷阱）",
      详情: "普通百姓或良家，不存在任何人为设伏或做局",
      战力: 0
    }, {
      类型: "仙人跳暴力设伏",
      详情: "房门外埋伏 2 名持械混混/钢管皮带，刚脱裤即踹门录像暴打勒索 5~10 万",
      战力: 7
    }, {
      类型: "便衣钓鱼执法",
      详情: "治安大队便衣民警在宾馆楼下布控蹲守，一旦发生金钱交易即破门抓捕拘留 15 天",
      战力: 10
    }, {
      类型: "暴怒丈夫突击捉奸",
      详情: "其配偶早有怀疑并在车机装了定位，手持菜刀扳手在楼下/走廊蹲守",
      战力: 8
    }, {
      类型: "暗藏 4K 针孔偷拍",
      详情: "房间空调插座暗藏 4K 针孔摄像头，全程录制高清性爱视频用于暗网贩卖与敲诈",
      战力: 2
    }, {
      类型: "事后强奸勒索报警",
      详情: "性格极端边缘型人格，事后撕破内衣索要巨款，否则立刻去派出所做下体提取物验伤",
      战力: 3
    }, {
      类型: "妙瓦底园区肉饵诱捕",
      详情: "受东南亚武装园区幕后遥控，假意邀约见面实则安排套牌黑车跨国绑架绑人",
      战力: 9
    }, {
      类型: "严重心理创伤性抗拒",
      详情: "童年遭遇性侵害，对男性生殖器有应激性狂乱，一触碰即尖叫抓咬干呕反胃",
      战力: 4
    } ];
    const 勒索链条库 = [ "没有", "她手上有你的照片（她拍过）", "她手上有你的聊天记录（她截了）", "她手上有你的真实信息（她查到了）", "她有同伙（不止她一个人）", "她是被人指使的", "她自己也被勒索着（她不敢停）", "她想勒索但没敢", "她只是被当工具用", "她真心想帮你，但她跑不掉" ];
    const 交易链库 = [ "没有交易", "她收钱（一次性）", "她收钱（按月）", "她代收（钱不是给她的）", "她拉人（她拿提成）", "她引流（把人往别的号带）", "她是链条最末端（她拿最少）", "她知道上游是谁（她不说）", "她把你知道的都告诉了上游" ];
    const 涉罪库 = [ "完全没有（她是干净的）", "她自己卖（违法，但没有受害者）", "她卖别人的东西（她不知道来源）", "她被抓过（有案底）", "她正在被查（她不知道）", "她在给犯罪团伙做事（她被逼的）", "她在给犯罪团伙做事（她自愿的）", "她被胁迫，但她也害了人" ];
    const 消失方式库 = [ "突然注销（所有记录消失）", "十天不回（不是拉黑，就是没回）", "换了头像（但没删你，这最折磨人）", "朋友圈停更（但没删你）", "号还在，但从来不上线", "把你从好友里删了（没有一句话）", "回了最后一句，然后没了", "她在别人那里还在线", "她的号被别人接手了", "她的号开始发广告（被盗了）" ];
    const 病故意外库 = [ "（不适用）", "她生过一场大病，之后不做了", "她出过意外，之后不上网了", "她家里出了事，她要回去", "她母亲病重，她要照顾", "她自己查出了东西，去治了", "她被抓了（你不知道为什么）", "她出国了（你们没再见）" ];
    const 长线终点库 = [ "她退圈嫁人了（你后来才知道）", "她换了城市，换了号", "她把你变成朋友（很久以后）", "她成了你的固定关系（这是少数）", "她消失了（你一直不知道去哪）", "她还在做，但你们没再聊过", "她给你发过一条，你没回", "你在很多年后搜过她的名字" ];
    function 兼容修正(e) {
      const 修正 = [];
      const r = {
        ...e
      };
      if (r.私密度 === "完全私密（关了门就是她的）" && r.谁能进 === "合租的室友能进") {
        r.私密度 = "半私密（墙很薄）";
        修正.push("私密度：完全私密 → 半私密（室友能进）");
      }
      if (r.骗局.类型 === "代收洗钱" && r.涉罪 === "完全没有（她是干净的）") {
        r.涉罪 = "她卖别人的东西（她不知道来源）";
        修正.push("涉罪：完全干净 → 她不知道来源");
      }
      if (r.骗局.类型 === "她自己也是受害者" && r.勒索链条 === "没有") {
        r.勒索链条 = "她自己也被勒索着（她不敢停）";
        修正.push("勒索链：无 → 她被勒索着");
      }
      if (r.主要媒介 === "只用文字（从不语音）" && r.媒介能力.媒介 === "语音") {
        r.媒介能力 = 媒介能力库[0];
        修正.push("媒介能力：语音 → 文字（她只用文字）");
      }
      return {
        修正,
        结果: r
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/开局Roll.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      摇N次: () => 摇N次,
      摇开局: () => 摇开局,
      满级能推成什么样: () => 满级能推成什么样,
      该项要多少点: () => 该项要多少点,
      还差多少点: () => 还差多少点
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    const 标签 = {
      持久: {
        好: "你能撑",
        差: "你快",
        中性: "一般"
      },
      恢复: {
        好: "你恢复快",
        差: "你要缓很久",
        中性: "一般"
      },
      硬度: {
        好: "你硬",
        差: "你容易软",
        中性: "一般"
      },
      体力: {
        好: "你体力好",
        差: "你没劲",
        中性: "一般"
      },
      感知: {
        好: "你看得懂她",
        差: "你看不懂她",
        中性: "一般"
      },
      尺寸控制: {
        好: "你大",
        差: "你偏小",
        中性: "普通"
      },
      强壮: {
        好: "你壮",
        差: "你打不过人",
        中性: "一般"
      },
      魅力: {
        好: "你长得好看",
        差: "你不出众",
        中性: "普通"
      },
      读人: {
        好: "你会看人",
        差: "你听不出话外音",
        中性: "一般"
      },
      气场: {
        好: "你压得住场",
        差: "你被牵着走",
        中性: "一般"
      },
      时机: {
        好: "你收放自如",
        差: "你不稳定",
        中性: "一般"
      },
      收尾: {
        好: "她还想再见你",
        差: "她完事就走了",
        中性: "一般"
      }
    };
    function 洗牌(a) {
      const r = [ ...a ];
      for (let i = r.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [r[i], r[j]] = [ r[j], r[i] ];
      }
      return r;
    }
    function 摇开局(难度) {
      const d = ___WEBPACK_IMPORTED_MODULE_0__["难度表"][难度] ?? ___WEBPACK_IMPORTED_MODULE_0__["难度表"].标准;
      const 起 = d.起始;
      const 长板值 = Math.min(___WEBPACK_IMPORTED_MODULE_0__["属性上限"], 起 + 2);
      const 偏好值 = Math.min(___WEBPACK_IMPORTED_MODULE_0__["属性上限"], 起 + 1);
      const 短板值 = ___WEBPACK_IMPORTED_MODULE_0__["属性下限"];
      const 顺序 = 洗牌(___WEBPACK_IMPORTED_MODULE_0__["属性键"]);
      const 长板键 = 顺序[0];
      const 偏好键 = 顺序.slice(1, 3);
      const 短板键 = 顺序.slice(3, 5);
      const 属性 = {};
      for (const k of ___WEBPACK_IMPORTED_MODULE_0__["属性键"]) 属性[k] = 起;
      属性[长板键] = 长板值;
      for (const k of 偏好键) 属性[k] = 偏好值;
      for (const k of 短板键) 属性[k] = 短板值;
      if (属性.尺寸控制 < 3) 属性.尺寸控制 = 3;
      const 总点数 = Object.values(属性).reduce((a, b) => a + b, 0);
      const 好的3 = Object.entries(属性).filter(([, v]) => v >= 偏好值).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => 标签[k]?.好 ?? k);
      const 差的2 = Object.entries(属性).filter(([, v]) => v <= 短板值).map(([k]) => 标签[k]?.差 ?? k);
      const 他是什么人 = [ "你是一个普通人。", 好的3.length ? `${好的3.join("、")}。` : "", 差的2.length ? `★ ${差的2.join("、")}。` : "" ].filter(Boolean).join("");
      return {
        属性,
        长板: {
          键: 长板键,
          值: 属性[长板键],
          说的什么: 标签[长板键]?.好 ?? 长板键
        },
        偏好: 偏好键.map(k => ({
          键: k,
          值: 属性[k]
        })),
        短板: 短板键.map(k => ({
          键: k,
          值: 属性[k],
          说的什么: 标签[k]?.差 ?? k
        })),
        总点数,
        他是什么人
      };
    }
    function 摇N次(难度, n) {
      return Array.from({
        length: n
      }, () => 摇开局(难度));
    }
    function 该项要多少点(当前值) {
      return Math.max(0, ___WEBPACK_IMPORTED_MODULE_0__["属性上限"] - Math.max(___WEBPACK_IMPORTED_MODULE_0__["属性下限"], Math.min(___WEBPACK_IMPORTED_MODULE_0__["属性上限"], 当前值)));
    }
    function 还差多少点(属性) {
      return ___WEBPACK_IMPORTED_MODULE_0__["属性键"].reduce((s, k) => s + 该项要多少点(属性[k] ?? ___WEBPACK_IMPORTED_MODULE_0__["属性下限"]), 0);
    }
    function 满级能推成什么样(属性) {
      const 还差 = 还差多少点(属性);
      if (还差 <= 99) return {
        还差,
        够不够: `够推满，还剩 ${99 - 还差} 点`
      };
      return {
        还差,
        够不够: `★ 差 ${还差 - 99} 点 —— 有几项永远到不了 10`
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/意图型.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      意图型表: () => 意图型表,
      抽意图: () => 抽意图,
      抽意图平台: () => 抽意图平台
    });
    const 意图型表 = [ {
      键: "单女",
      名: "单女求人",
      她为什么做这个: "她就是想找人。有的因为孤独，有的因为好奇，有的因为不需要理由",
      她给什么: "真的关系。而且她不收钱 —— 这是它和其他型最大的差别",
      开价方式: "她不加价。★ 但她会要时间、要情绪、要一个说法",
      她怕什么: "被骗。她怕对方只是玩玩",
      破局点: '★ 她开始要"我们算什么"的时候。答不好，这局就没了',
      出口: "你想走就走。★ 但走了之后她会追问 —— 这是这一型的代价",
      权重: 12
    }, {
      键: "妻求",
      名: "妻求单男",
      她为什么做这个: "她和她老公一起在找。她觉得这样刺激，或者她想让他看她被人要",
      她给什么: "身体 + 一场被观看的戏",
      开价方式: '★ 多数不要钱，要的是"素质"（尺寸、时长、干净）',
      她怕什么: "遇到不干净的人、遇到会到处说的人",
      破局点: "★ 她老公在场 / 她老公要看录像。你到那一刻才知道他要什么",
      出口: "做完就能走。★ 但如果你拒绝了他们的玩法，他们不会给第二次",
      权重: 8
    }, {
      键: "夫求",
      名: "夫求单男",
      她为什么做这个: "★ 是她老公在替她找。她是被安排的，或者她同意了",
      她给什么: "身体。★ 但她不一定是自愿的 —— 这是这一型的阴影",
      开价方式: "老公谈钱。★ 你从头到尾在跟老公打交道",
      她怕什么: "★ 老公。她可能全程不说话，或者只在你要走的时候看你一眼",
      破局点: '★ 她说了"不"。那一下你必须停 —— 这是玩家的线',
      出口: "她老公让你走你就走，没有第二次",
      权重: 6
    }, {
      键: "偷情",
      名: "偷情",
      她为什么做这个: "她有老公，而且老公不知道。★ 这一型的核心是门外的脚步声",
      她给什么: '身体 + 她那副"贤妻"的面具之外的那一面',
      开价方式: "多数不要钱。★ 有的会要，但那是另一回事",
      她怕什么: "★★ 被发现。她的整个生活是一张纸，这件事是撕它的手",
      破局点: "★ 电话响了。她老公、她孩子、她妈。她会瞬间变成另一个人",
      出口: "你什么时候走由她说。★ 她让你走后，你们要装作不认识",
      权重: 10
    }, {
      键: "福利",
      名: "发福利照",
      她为什么做这个: "她不图钱，图被看。被要的感觉比钱重要",
      她给什么: "照片、视频、直播。★★ 而线下的门槛极高",
      开价方式: '她不要钱。★ 她要的是"反应"——你要夸，而且要夸到点上',
      她怕什么: "被扒真实身份。★ 她有一份正经工作",
      破局点: "★ 你提见面。她可能答应，也可能从此不回。★ 这一步成功率极低",
      出口: "她停在照片，你要接受。★ 硬推会直接断线",
      权重: 9
    }, {
      键: "卖",
      名: "卖",
      她为什么做这个: "明码。原因各不同：钱、家里、债、或者就是工作",
      她给什么: "身体。按次、按时、按项目",
      开价方式: "★ 明码标价。最干净，也最没有余味",
      她怕什么: "不给钱的、会动手的、会到处说的",
      破局点: "★ 谈好之后加要求。她会拒绝，或者加价",
      出口: "结束了就走。★ 她不会留你，你也不用留",
      权重: 14
    }, {
      键: "主播",
      名: "主播",
      她为什么做这个: "有排班、有榜、有房主分成。★ 她是一门生意",
      她给什么: "注意力 + 付费内容。★ 线下要看她的榜到什么程度",
      开价方式: "打赏 + 私域。★ 榜一是唯一的门票",
      她怕什么: "被现实生活里的人发现、被房主扣钱",
      破局点: '★ 她会给你"私下"的联系方式。那时候要判断这是她，还是 chatter',
      出口: "你停止打赏就是走。★ 但沉没成本会让你不想停 —— 这是这一型设计的",
      权重: 10
    }, {
      键: "杀猪",
      名: "杀猪盘",
      她为什么做这个: "★ 团队作业。她（或他）不急着要钱",
      她给什么: "★★ 前期给得非常好 —— 好到不正常。这是投资",
      开价方式: '★ 三周到三个月后，会开始提"带你赚一笔"',
      她怕什么: "你不投。她的 KPI 是你",
      破局点: "★ 她开始提钱。那一下你要认出来，然后决定：抽身，还是反猎",
      出口: "★ 任何时候都可以走。★ 难的是你不相信自己被骗了",
      权重: 8
    }, {
      键: "仙人跳",
      名: "仙人跳",
      她为什么做这个: "★ 见面就是局。她负责带你进去，别人负责收尾",
      她给什么: "★★ 假的。你付钱之前一切都很顺",
      开价方式: "进门之后加码。或者门一响，进来三个人",
      她怕什么: "你不上钩、你带人、你提前走了",
      破局点: '★★ 门响 / 有人敲门 / 她说"我去拿个东西" —— 这是信号',
      出口: "★ 进门前判断。进去了就得按⑦应对判定",
      权重: 6
    }, {
      键: "中介",
      名: "中介",
      她为什么做这个: "★ 她不是本人。她是链子上的一个环节",
      她给什么: '一个"安排"。照片、名单、报价',
      开价方式: "★★ 定金。然后拉黑，或者换人，或者加价",
      她怕什么: "被追查。★ 所以她的号换得很快",
      破局点: "★ 你要视频验证，她会拒绝或者给一段录好的",
      出口: "★ 定金一旦给了就别想拿回。止损",
      权重: 7
    }, {
      键: "被控",
      名: "被控制",
      她为什么做这个: "★ 她不是自愿的。她在园区里，或者在别人手下",
      她给什么: "★★ 她在完成业绩。而你要的东西后面没有人",
      开价方式: "按业绩表。★ 她连价格都没有决定权",
      她怕什么: "★ 业绩不达标。★ 那是有后果的",
      破局点: '★ 她开始说一些"不该说"的话。★ 那一下是她在求救，也可能不是',
      出口: "★★ 你能走进任何地方，但你带不出任何人",
      权重: 5
    }, {
      键: "猎奇",
      名: "猎奇",
      她为什么做这个: "★ 第一次。她比你还慌",
      她给什么: "★★ 不确定。她可能到了又反悔，可能做到一半哭",
      开价方式: '★ 她不懂怎么开价。她说"你看着给"',
      她怕什么: "★★ 一切。她怕疼、怕被发现、怕自己后悔",
      破局点: '★ 她说"算了"。★ 那一下你必须停，而且不能劝',
      出口: "★ 这局随时可能结束，而且不是你的错",
      权重: 5
    } ];
    function 抽意图(随机 = Math.random) {
      const 总 = 意图型表.reduce((s, x) => s + x.权重, 0);
      let r = 随机() * 总;
      for (const x of 意图型表) {
        r -= x.权重;
        if (r <= 0) return x;
      }
      return 意图型表[意图型表.length - 1];
    }
    function 抽意图平台(平台, 随机 = Math.random) {
      const 修正 = {
        草榴: {
          卖: .5,
          仙人跳: 1.5,
          杀猪: 1.5,
          中介: 2,
          福利: 1.5,
          单女: 1.5
        },
        探探: {
          卖: 1.5,
          仙人跳: 2,
          偷情: 1.5,
          单女: 1.5,
          福利: .5
        },
        抖音: {
          主播: 3,
          福利: 1.5,
          卖: .5
        },
        OnlyFans: {
          主播: 3,
          卖: 1.5,
          中介: 2,
          福利: 1.5
        },
        Chaturbate: {
          被控: 2,
          主播: 2,
          卖: 1.5
        },
        Telegram: {
          中介: 2.5,
          卖: 1.5,
          仙人跳: 1.5,
          被控: 2
        },
        推特: {
          福利: 2,
          卖: 1.5,
          杀猪: 1.5
        },
        微信: {
          偷情: 2,
          卖: 1.5,
          杀猪: 1.5
        },
        快手同城: {
          仙人跳: 3,
          卖: 2,
          偷情: 1
        },
        暗网: {
          杀猪: 5,
          仙人跳: 3,
          中介: 3,
          被控: .5,
          单女: .1
        }
      };
      const m = 修正[平台] ?? {};
      const 池 = [];
      意图型表.forEach(x => {
        const w = Math.max(.1, x.权重 * (m[x.键] ?? 1));
        for (let i = 0; i < Math.round(w * 2); i++) 池.push(x);
      });
      return 池[Math.floor(随机() * 池.length)];
    }
  },
  "./src/神奇手机/神奇手机/核心/技能定义.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      一条铁律: () => 一条铁律,
      买到要多少: () => ___WEBPACK_IMPORTED_MODULE_0__["买到要多少"],
      体力到轮数: () => ___WEBPACK_IMPORTED_MODULE_0__["体力到轮数"],
      全买要多少: () => ___WEBPACK_IMPORTED_MODULE_0__["全买要多少"],
      全技能全满: () => 全技能全满,
      全满点数: () => ___WEBPACK_IMPORTED_MODULE_0__["全满点数"],
      单项全买: () => ___WEBPACK_IMPORTED_MODULE_0__["单项全买"],
      单项全满: () => 单项全满,
      尺寸到值: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到值"],
      尺寸到厘米: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到厘米"],
      尺寸到周长: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到周长"],
      属性上限: () => ___WEBPACK_IMPORTED_MODULE_0__["属性上限"],
      属性下限: () => ___WEBPACK_IMPORTED_MODULE_0__["属性下限"],
      属性价格: () => ___WEBPACK_IMPORTED_MODULE_0__["属性价格"],
      属性加价: () => ___WEBPACK_IMPORTED_MODULE_0__["属性价格"],
      属性加价1点: () => ___WEBPACK_IMPORTED_MODULE_0__["属性价格"],
      属性步长: () => 属性步长,
      属性系: () => 属性系,
      属性表: () => ___WEBPACK_IMPORTED_MODULE_0__["属性表"],
      属性键: () => ___WEBPACK_IMPORTED_MODULE_0__["属性键"],
      恢复到不应期: () => ___WEBPACK_IMPORTED_MODULE_0__["恢复到不应期"],
      感知到准确度: () => ___WEBPACK_IMPORTED_MODULE_0__["感知到准确度"],
      技能上限: () => 技能上限,
      技能倍率: () => 技能倍率,
      技能加价: () => 技能加价,
      技能系: () => 技能系,
      技能表: () => 技能表,
      技能键: () => 技能键,
      持久到分钟: () => ___WEBPACK_IMPORTED_MODULE_0__["持久到分钟"],
      按系: () => 按系,
      按路: () => 按路,
      硬度到百分比: () => ___WEBPACK_IMPORTED_MODULE_0__["硬度到百分比"],
      系说明: () => 系说明,
      计算不应期: () => 计算不应期,
      计算尺寸范围: () => 计算尺寸范围,
      难度表: () => ___WEBPACK_IMPORTED_MODULE_0__["难度表"]
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    const 技能系 = [ "器", "液", "能", "她", "感", "痕", "玩", "免", "网", "众" ];
    const 系说明 = {
      器: "你这具身体 —— ★ 越深越不像人",
      液: "★★ 你身上散发和注入的东西 —— 气味、催情、成瘾",
      能: "★★ 超自然 —— 传送、时停、分身、读心",
      她: "她身体的反应 —— ★ 不包括改她的意愿",
      感: "你能看见什么 —— 她说不出口的那部分",
      痕: "留下什么 —— 或者什么都不留",
      玩: "做什么、在哪儿做",
      免: "什么不会发生 —— ★ 疾病一种一种分开免疫",
      网: "平台、门槛、身份",
      众: "★★★ 你的能力在【别人】身上造成了什么"
    };
    const 一条铁律 = [ "★★★ 技能改的都是【身体反应】【感知】【痕迹】【场景】——", "没有一项能改她的判断。她不想，就是不想。", "★ 催情类（猫薄荷 / 冰毒 / 催情精液）让她更想要 ——", "但她仍然可以说不要。说了不要你还上，那是你越界，不是技能的问题。" ].join("\n");
    const 技能表 = [ {
      键: "尺寸自由",
      名: "尺寸自由",
      系: "器",
      路: "尺寸",
      用途: '★ 能调大小 —— 但也只是"调"',
      等级: [ "±1cm", "±2.5cm", "±4cm" ]
    }, {
      键: "自动适配",
      名: "自动适配",
      系: "器",
      路: "尺寸",
      用途: "★★ 不用你调 —— 进去的那一下自动变成她最合适的",
      等级: [ "自动贴合她的深浅", "自动贴合她的宽窄", "★ 每一寸都刚好，她说不出哪里不对" ]
    }, {
      键: "凸点",
      名: "凸点",
      系: "器",
      路: "尺寸",
      用途: "★★ 表面长东西 —— 抽出来的时候刮一路",
      等级: [ "一圈小粒，进出有摩擦", "密密的粒，每一抽都在刮", "★ 长成一片，她里面一直被磨着" ]
    }, {
      键: "倒钩",
      名: "倒钩",
      系: "器",
      路: "尺寸",
      用途: "★★★ 肉刺与倒钩 —— 拔出刮带软肉翻卷，痛爽交加尖叫失禁",
      等级: [ "抽动刮擦肉褶带出白沫", "柔韧肉钩深嵌阴道壁，拔出时刮得软肉翻卷", "死死钩挂，强行拔出时她痛爽交加尖叫失禁，双腿死夹不放" ]
    }, {
      键: "分叉",
      名: "分叉",
      系: "器",
      路: "尺寸",
      用途: "★★★ 双物分叉 —— 阴道与直肠双穴同贯穿，泥泞横流",
      等级: [ "肉棒一分为二，一前一后双头顶弄", "前后两孔同时被大肉棒塞满贯穿，括约肌彻底失守", "双穴同时抽插研磨，泥泞水声与白沫齐飞，将她撑到完全合拢不来" ]
    }, {
      键: "多物",
      名: "多物",
      系: "器",
      路: "尺寸",
      用途: "★★★★ 超常理多头肉物 —— 撑满前后所有腔道，数不清几根",
      等级: [ "两根分向贯穿", "三根同时抽插", "撑满她所有腔道，连她自己都数不清有几个洞正在被暴虐占有" ]
    }, {
      键: "硬度控制",
      名: "硬度控制",
      系: "器",
      路: "硬度",
      用途: "★ 状态稳不稳",
      等级: [ "不掉状态", "想硬就硬", "随时可以，跟她没关系" ]
    }, {
      键: "硬度翻倍",
      名: "硬度翻倍",
      系: "器",
      路: "硬度",
      用途: "★★ 硬得像另一种东西",
      等级: [ "明显更硬", "像骨头，她夹不住", "★ 撑开的时候她里面会疼" ]
    }, {
      键: "永久勃起",
      名: "永久勃起",
      系: "器",
      路: "硬度",
      用途: "★★★ 不软 —— 一直硬着，她想什么时候都行",
      等级: [ "一整天", "睡觉也不软", "★ 永远硬着，她什么时候看都是这样" ]
    }, {
      键: "连硬",
      名: "连硬",
      系: "器",
      路: "硬度",
      用途: "★ 射完不用等",
      等级: [ "十分钟能再来", "三分钟", "★ 不用拔出来，接着来" ]
    }, {
      键: "自主",
      名: "自主",
      系: "器",
      路: "硬度",
      用途: "★★ 它会自己动",
      等级: [ "能自己跳一下", "能自己抽送", "★ 你不动，它自己弄她" ]
    }, {
      键: "持久控制",
      名: "持久控制",
      系: "器",
      路: "持久",
      用途: "想多久就多久",
      等级: [ "±50%", "想停就停", "你说了算" ]
    }, {
      键: "马拉松",
      名: "马拉松",
      系: "器",
      路: "持久",
      用途: "★ 一整夜",
      等级: [ "一小时", "三小时", "★ 从晚上到天亮，她还醒着" ]
    }, {
      键: "射精控制",
      名: "射精控制",
      系: "器",
      路: "持久",
      用途: "想射才射",
      等级: [ "能忍住", "能吊着不射", "想什么时候就什么时候" ]
    }, {
      键: "边缘",
      名: "边缘",
      系: "器",
      路: "持久",
      用途: "★★ 吊着她 —— 不让她到",
      等级: [ "吊十分钟", "吊到她开口求你", "★ 吊到她哭，然后才放" ]
    }, {
      键: "不射",
      名: "不射",
      系: "器",
      路: "持久",
      用途: "★★★ 你可以一直不结束",
      等级: [ "能忍一小时", "能忍一天", "★ 想不射就不射，涨着也不结束" ]
    }, {
      键: "长度",
      名: "长度",
      系: "器",
      路: "形态",
      用途: "顶得到底",
      等级: [ "顶到宫口那一下她会缩", "顶进去半个头，她会闷哼", "整个顶开，她会弓起来" ]
    }, {
      键: "宫口",
      名: "宫口",
      系: "器",
      路: "形态",
      用途: "★★ 子宫颈强行贯穿 —— 破开紧闭狭缝引发子宫绝顶",
      等级: [ "精准顶在未破紧闭的宫颈狭缝研磨", "硬物顶开宫颈口钻入子宫内腔，痛爽至全身痉挛", "在子宫腔最深处反复冲撞研磨，引发撕心裂肺的失禁绝顶" ]
    }, {
      键: "粗细",
      名: "粗细",
      系: "器",
      路: "形态",
      用途: "撑满 —— 让她合不上",
      等级: [ "撑开，进得去但紧", "撑到两边发白，缝里能看见水挤出来", "塞不进去，要慢慢磨开" ]
    }, {
      键: "撕裂",
      名: "撕裂",
      系: "器",
      路: "形态",
      用途: "★★★ 撑到裂 —— 疼和爽走同一根神经",
      等级: [ "会阴磨红，她走路有感觉", "裂一点，第二天上厕所会疼", "★ 真的裂开，血混在水里淌出来" ]
    }, {
      键: "换形",
      名: "换形",
      系: "器",
      路: "形态",
      用途: "★★★★ 变成她想要的那一种",
      等级: [ "换个体型", "换成她喜欢的长相", "★ 每一晚都可以是另一个人，包括她认识的" ]
    }, {
      键: "变形",
      名: "变形",
      系: "器",
      路: "形态",
      用途: "★★★★ 形状随你 —— 不是人的形状也行",
      等级: [ "能变任何形状", "能同时是几种形状", "★ 没有固定形状，她每次都不知道会是什么" ]
    }, {
      键: "体味",
      名: "体味",
      系: "液",
      路: "气味",
      用途: "★ 你身上有味道了",
      等级: [ "她会多闻两下", "她会想靠近", "★ 一件衣服她留着不洗" ]
    }, {
      键: "猫薄荷",
      名: "猫薄荷",
      系: "液",
      路: "气味",
      用途: "★★★ 雄性麝香引力场 —— 5米内闻到即心率加快私处泛潮",
      等级: [ "体表散发微量荷尔蒙，异性靠近心率加快呼吸沉重", "气味直击下丘脑神经，闻到即私处自发泛潮溢液", "方圆整室异性神经紊乱，被动进入渴求交配的发情期" ]
    }, {
      键: "气味上瘾",
      名: "气味上瘾",
      系: "液",
      路: "气味",
      用途: "★★★★ 闻不到就难受",
      等级: [ "她会想那个味道", "隔几天没闻会烦躁", "★ 她会找借口来闻，自己知道不该还是来" ]
    }, {
      键: "隔空",
      名: "隔空",
      系: "液",
      路: "气味",
      用途: "★★★★ 不用靠近 —— 隔着距离也有效",
      等级: [ "同一个房间", "隔一层楼", "★ 隔着手机也有效" ]
    }, {
      键: "群体",
      名: "群体",
      系: "液",
      路: "气味",
      用途: "★★★★★ 一屋子人一起受影响",
      等级: [ "两三个人", "一桌人", "★ 整个房间，包括不该受影响的那个" ]
    }, {
      键: "定向",
      名: "定向",
      系: "液",
      路: "气味",
      用途: "★★★★★ 只影响你想影响的那一个",
      等级: [ "能收住范围", "能只给一个人", "★ 满屋子人只有她闻到，别人什么都不知道" ]
    }, {
      键: "快感注入",
      名: "快感注入",
      系: "液",
      路: "注入",
      用途: "★★★ 进去的那一下就不一样",
      等级: [ "她感觉比平时强", "强到说不出话", "★ 一进去她整个人就塌了" ]
    }, {
      键: "冰毒",
      名: "冰毒",
      系: "液",
      路: "注入",
      用途: "★★★★★ 毒品级快感注入与精液成瘾",
      等级: [ "插入即注入高浓度神经快感，肉壁神经像通电般战栗", "精液蕴含成瘾物质，内射两次以上者产生强烈的戒断依赖", "离开你三天便浑身燥热小穴空虚发痒，除了你的大肉棒与精液任何东西解不了瘾" ]
    }, {
      键: "成瘾",
      名: "成瘾",
      系: "液",
      路: "注入",
      用途: "★★★★★ 一次就记住 —— 她会回来",
      等级: [ "她隔几天会想", "她会主动再来", "★ 她自己知道不该，但还是来" ]
    }, {
      键: "戒断",
      名: "戒断",
      系: "液",
      路: "注入",
      用途: "★★★★★ 不来就难受 —— 像真的戒断",
      等级: [ "会烦躁", "会失眠、手抖", "★ 她会为了一次做出她本来不会做的事" ]
    }, {
      键: "只认你",
      名: "只认你",
      系: "液",
      路: "注入",
      用途: "★★★★★ 别人给不了这个",
      等级: [ "别人碰她没感觉", "别人碰她会想你的", "★ 她试过别人，然后回来求你" ]
    }, {
      键: "精神依赖",
      名: "精神依赖",
      系: "液",
      路: "注入",
      用途: "★★★★★★ 她要的不只是身体",
      等级: [ "她会想你", "她做什么都会想到你", "★ 她需要你在，哪怕不做" ]
    }, {
      键: "口水",
      名: "口水",
      系: "液",
      路: "体液",
      用途: "★★ 接吻的效果由你定",
      等级: [ "亲了会发麻", "亲了会湿", "★ 亲完她自己都不知道为什么会想要" ]
    }, {
      键: "催情精液",
      名: "催情精液",
      系: "液",
      路: "体液",
      用途: "★★★★ 接触精子会让她对你产生感觉",
      等级: [ "沾到会黏你", "进去之后会惦记", "★ 别人身上她找不到那种感觉" ]
    }, {
      键: "内射印记",
      名: "内射印记",
      系: "液",
      路: "体液",
      用途: "★★★★★ 射进去之后，一段时间只想要你",
      等级: [ "当天只想要你", "一周之内别人碰她没感觉", "★ 一个月，她自己也说不清为什么" ]
    }, {
      键: "体液上瘾",
      名: "体液上瘾",
      系: "液",
      路: "体液",
      用途: "★★★★ 她渴你的体液",
      等级: [ "她会想含", "她会主动要", "★ 咽下去的时候她会抖" ]
    }, {
      键: "味道",
      名: "味道",
      系: "液",
      路: "体液",
      用途: "★★★★ 精液的味道她忘不掉",
      等级: [ "她记得", "她会想那个味道", "★ 别人的她含不下去" ]
    }, {
      键: "体液互换",
      名: "体液互换",
      系: "液",
      路: "体液",
      用途: "★★★ 她的水你尝得到",
      等级: [ "尝出她的状态", "尝出她今天想要什么", "★ 尝一口就知道她有没有别人" ]
    }, {
      键: "免疫体味",
      名: "免疫体味",
      系: "液",
      路: "生理",
      用途: "★ 你自己不会有任何味道，除了你想留的",
      等级: [ "不出汗味", "只留你选的那一种", "★ 她闻到的永远是你想让她闻到的" ]
    }, {
      键: "经期",
      名: "经期",
      系: "液",
      路: "生理",
      用途: "★★ 她什么时候来由你定",
      等级: [ "能推后", "能提前", "★ 能让她不来 —— 一直都能用" ]
    }, {
      键: "湿润反射",
      名: "湿润反射",
      系: "液",
      路: "生理",
      用途: "★★★ 她看见你就湿",
      等级: [ "看见会热", "看见内裤就有印", "★ 只是想到你就湿了" ]
    }, {
      键: "催乳",
      名: "催乳",
      系: "液",
      路: "生理",
      用途: "★★★ 专属排乳与乳汁分泌 —— 只有你能吸出来",
      等级: [ "微量产乳：不必真正怀孕，刺激乳腺即可溢出温热乳汁", "专属排乳绑定：乳房胀满发烫，吸奶器与丈夫怎么吸都挤不出，唯有你的嘴唇碰触才大喷射", "人形奶牛常驻：源源不断分泌浓香母乳，借口下楼买奶粉在地下车库求你吸干净" ]
    }, {
      键: "潮吹控制",
      名: "潮吹控制",
      系: "液",
      路: "生理",
      用途: "★★ 喷不喷、喷多少由你",
      等级: [ "能让她喷", "能让她一直喷", "★ 喷到脱水，她得喝水" ]
    }, {
      键: "孕味",
      名: "孕味",
      系: "液",
      路: "生理",
      用途: "★★★★ 怀胎发情与顶撞孕肚 —— 恶堕臣服于播种者",
      等级: [ "孕激素催淫：怀胎期间小穴分泌量与敏感度翻倍，比未孕时更渴望肉棒", "顶撞隆起孕肚：肉棒直抵受精着床的子宫深处研磨，让她挺着大肚子抽搐失禁", "母体恶堕归顺：孕期心理彻底臣服于播种者，以肚子里怀着你的种为至高荣耀" ]
    }, {
      键: "通用语言",
      名: "通用语言",
      系: "能",
      用途: "★★ 任何语言都能说、能听",
      等级: [ "能沟通", "带本地口音（★ 她不当你是外人）", "★ 她以为你是本地人" ]
    }, {
      键: "传送",
      名: "传送",
      系: "能",
      用途: "★★★ 随时去任何地方",
      等级: [ "冷却 24 小时", "冷却 6 小时", "★ 冷却 1 小时" ]
    }, {
      键: "时停",
      名: "时停",
      系: "能",
      用途: "★★★★★ 只有你们两个的时间在走",
      等级: [ "几秒", "几分钟", "★ 一顿饭的时间，别人都不知道" ]
    }, {
      键: "分身",
      名: "分身",
      系: "能",
      用途: "★★★★ 同时出现在两个地方",
      等级: [ "两个地方各一个你", "一个陪她，一个办别的事", "★ 她同时被两个你弄" ]
    }, {
      键: "隐身",
      名: "隐身",
      系: "能",
      用途: "★★★★ 别人看不见你",
      等级: [ "摄像头拍不到", "人眼也看不见", "★ 你能碰她，别人看不见是谁在碰" ]
    }, {
      键: "缩小",
      名: "缩小",
      系: "能",
      用途: "★★★★★ 小到能钻进去",
      等级: [ "手掌大", "手指大", "★ 钻进去，从里面弄她" ]
    }, {
      键: "放大",
      名: "放大",
      系: "能",
      用途: "★★★ 大到她装不下",
      等级: [ "比常人大一圈", "大到她要用手挡", "★ 进不去，只能在外面磨" ]
    }, {
      键: "触手",
      名: "触手",
      系: "能",
      用途: "★★★★ 你身上能长出别的东西",
      等级: [ "多两只手", "能长出任何形状", "★ 同时占满她所有的洞" ]
    }, {
      键: "温度",
      名: "温度",
      系: "能",
      用途: "★★★ 你能改自己和她身上的温度",
      等级: [ "手能变热", "能把她整个人弄热", "★ 冰火一起，她自己受不了" ]
    }, {
      键: "距离",
      名: "距离",
      系: "能",
      用途: "★★★★★ 隔着距离也能碰她",
      等级: [ "隔一堵墙", "隔一个城市", "★ 她在上班，你在这儿弄她" ]
    }, {
      键: "感应",
      名: "感应",
      系: "能",
      用途: "★★ 知道她在哪儿、在干什么",
      等级: [ "知道她在哪", "知道她在干什么", "★ 知道她现在想不想" ]
    }, {
      键: "读心",
      名: "读心",
      系: "能",
      用途: "★★★★ 听见她在想什么",
      等级: [ "知道她大概在想什么", "知道她具体在想什么", "★ 知道她正在忍的那句话" ]
    }, {
      键: "梦境",
      名: "梦境",
      系: "能",
      用途: "★★★★★ 进她的梦",
      等级: [ "知道她梦到什么", "能出现在她梦里", "★ 梦里做的事她醒来还记得，身体也记得" ]
    }, {
      键: "记忆读取",
      名: "记忆读取",
      系: "能",
      用途: "★★★★ 看她的记忆",
      等级: [ "看到最近的事", "看到她最不想提的那件", "★ 看到她自己都忘了的那件" ]
    }, {
      键: "时间倒流",
      名: "时间倒流",
      系: "能",
      用途: "★★★★★★ 不满意就重来",
      等级: [ "回到一分钟前", "回到一小时前", "★ 回到今天早上，她还不知道今天会怎么样" ]
    }, {
      键: "预备",
      名: "预备",
      系: "能",
      用途: "★★ 要什么手里就有什么",
      等级: [ "基本的东西", "任何形状", "★ 她没见过的东西" ]
    }, {
      键: "切换",
      名: "切换",
      系: "能",
      用途: "★★★ 换一个人出来",
      等级: [ "换声音", "换脸", "★ 换成一个她认识的人" ]
    }, {
      键: "不死",
      名: "不死",
      系: "能",
      用途: "★★★ 玩得再狠也回得来",
      等级: [ "不会重伤", "重伤能恢复", "★ 死了也能回来" ]
    }, {
      键: "替身法",
      名: "替身法",
      系: "能",
      用途: "★★★★ 让别人替你出面",
      等级: [ "能造一个假人", "假人能动", "★ 假人做得成你做的事，别人分不出" ]
    }, {
      键: "造物",
      名: "造物",
      系: "能",
      用途: "★★★★★ 造一个出来",
      等级: [ "造小的", "造一个和她一样的", "★ 造一个她，然后让两个她一起" ]
    }, {
      键: "湿润",
      名: "湿润",
      系: "她",
      路: "水",
      用途: "★ 她的水由你调",
      等级: [ "能让她湿", "能让她湿透", "★ 能让她干" ]
    }, {
      键: "泛滥",
      名: "泛滥",
      系: "她",
      路: "水",
      用途: "★ 水多到收不住",
      等级: [ "湿到内裤有个印", "顺着大腿内侧淌成一条", "★ 站起来会滴下来" ]
    }, {
      键: "浸透",
      名: "浸透",
      系: "她",
      路: "水",
      用途: "★★ 一碰就出水",
      等级: [ "摸一下就湿", "不动也在流", "★ 床单湿一片，她不好意思看" ]
    }, {
      键: "干涩",
      名: "干涩",
      系: "她",
      路: "水",
      用途: "★★★ 反着来 —— 让她干着",
      等级: [ "不出水，磨得发烫", "涩到进不去", "★ 硬进去，她抓着床单不出声" ]
    }, {
      键: "敏感发现",
      名: "敏感发现",
      系: "她",
      路: "敏",
      用途: "★ 找到她自己都不知道的那个点",
      等级: [ "知道她哪儿有感觉", "知道她哪儿最要命", "★ 知道她自己都没发现的那一处" ]
    }, {
      键: "敏感创造",
      名: "敏感创造",
      系: "她",
      路: "敏",
      用途: "★★★ 造一个新的出来",
      等级: [ "让不敏感的地方变敏感", "造一个她从没被碰过的点", "★ 随便碰哪儿她都抖" ]
    }, {
      键: "全身敏感",
      名: "全身敏感",
      系: "她",
      路: "敏",
      用途: "★★★ 碰哪儿都是那儿",
      等级: [ "脖子和耳后", "背、腰、大腿内侧", "★ 吹口气她都软" ]
    }, {
      键: "乳头",
      名: "乳头",
      系: "她",
      路: "敏",
      用途: "★★ 光碰这儿就能到",
      等级: [ "碰了会硬", "揉着她会抖", "★ 只碰这儿她就能到" ]
    }, {
      键: "高潮触发",
      名: "高潮触发",
      系: "她",
      路: "潮",
      用途: "★ 你决定她什么时候到",
      等级: [ "知道她快到了", "能推她一把", "★ 你说到就到" ]
    }, {
      键: "高潮延迟",
      名: "高潮延迟",
      系: "她",
      路: "潮",
      用途: "★★ 让她到不了",
      等级: [ "能往后拖", "拖到她求你", "★ 拖到她脑子空白，只会说一个字" ]
    }, {
      键: "连续高潮",
      名: "连续高潮",
      系: "她",
      路: "潮",
      用途: "★★ 一波接一波",
      等级: [ "两次", "四五次", "★ 到后面她自己都数不清" ]
    }, {
      键: "强制高潮",
      名: "强制高潮",
      系: "她",
      路: "潮",
      用途: "★★★★ 她已经不想要了，身体还在到",
      等级: [ "过度敏感时能再推一次", "明明说不要了还到", "★ 她哭着到，但停不下来" ]
    }, {
      键: "松紧",
      名: "松紧",
      系: "她",
      路: "形",
      用途: "★★ 她那儿的松紧由你",
      等级: [ "能收紧", "能紧到夹人", "★ 紧到拔不出来" ]
    }, {
      键: "子宫",
      名: "子宫",
      系: "她",
      路: "形",
      用途: "★★ 射到最里面",
      等级: [ "感觉到顶在口上", "宫口会吸", "★ 射进去，她知道射在哪儿" ]
    }, {
      键: "体内改造",
      名: "体内改造",
      系: "她",
      路: "形",
      用途: "★★★★ 里面的构造由你改",
      等级: [ "改深浅", "改褶皱", "★ 改成只有你能用" ]
    }, {
      键: "两套",
      名: "两套",
      系: "她",
      路: "形",
      用途: "★★★★★ 她身上多一套",
      等级: [ "多一个口", "多一套完整的", "★ 两套一起用" ]
    }, {
      键: "心理锚定",
      名: "心理锚定",
      系: "她",
      路: "心智支配",
      用途: "★ 在对方潜意识埋入言行触机与防御减损",
      等级: [ "眼神或微语境解除第一层戒备", "关键时刻使其犹豫迟疑、难以果断拒绝", "潜意识行为锚定：听到特定暗号即下意识遵从指令" ]
    }, {
      键: "脑波诱导",
      名: "脑波诱导",
      系: "她",
      路: "心智支配",
      用途: "★★ 手机发射低频神经电磁共振，诱导思维极度依从",
      等级: [ "思维迟缓，对明显破绽视而不见", "轻度解离：将你的要求下意识合理化为自愿", "极度依从：处于半梦半醒的极佳受暗示状态" ]
    }, {
      键: "深度催眠",
      名: "深度催眠",
      系: "她",
      路: "心智支配",
      用途: "★★★ 深度感官重塑与羞耻防线彻底剥离",
      等级: [ "感官重置：使其错把陌生抚摸误认为合法伴侣", "羞耻感剥离：主动卸下道德与身份防线", "常驻心智烙印：指令成为其潜意识不可逆的第一冲动" ]
    }, {
      键: "神经支配",
      名: "神经支配",
      系: "她",
      路: "心智支配",
      用途: "★★★★ 超自然电磁支配，彻底瘫痪前额叶自我抗拒",
      等级: [ "绝对听从指令的木偶模式（持续30分钟）", "虚假记忆即时覆写：事后深信一切均系其自发渴望", "终极支配：心智完全臣服，奉你为不可违抗的主宰" ]
    }, {
      键: "快感读数",
      名: "快感读数",
      系: "感",
      路: "读",
      用途: "★ 看得见她的快感",
      等级: [ "大概知道她爽不爽", "知道到几成", "★ 数字一样准" ]
    }, {
      键: "极限",
      名: "极限",
      系: "感",
      路: "读",
      用途: "★ 知道她还能撑多久",
      等级: [ "看得出她累了", "知道还剩几次", "★ 知道她下一发会不会崩" ]
    }, {
      键: "真假",
      名: "真假",
      系: "感",
      路: "读",
      用途: "★★ 她是不是装的",
      等级: [ "看得出来假叫", "分得清几分真", "★ 连她自己骗自己的那部分都看得出来" ]
    }, {
      键: "共鸣",
      名: "共鸣",
      系: "感",
      路: "读",
      用途: "★★★ 她的感觉你能感觉到",
      等级: [ "知道她哪儿有感觉", "能感觉到强度", "★ 她到的时候你也到" ]
    }, {
      键: "欲望",
      名: "欲望",
      系: "感",
      路: "欲",
      用途: "★ 她想要什么",
      等级: [ "知道她想要什么", "知道她想要但不说", "★ 知道她不敢承认的那个" ]
    }, {
      键: "幻想",
      名: "幻想",
      系: "感",
      路: "欲",
      用途: "★★ 她幻想过什么",
      等级: [ "知道她有幻想", "知道内容", "★ 知道她幻想过谁，什么时候" ]
    }, {
      键: "没说出口",
      名: "没说出口",
      系: "感",
      路: "欲",
      用途: "★★★★ 她嘴上说不要的那件事",
      等级: [ "知道她在忍", "知道她忍的是什么", "★ 知道她忍了多久" ]
    }, {
      键: "心动",
      名: "心动",
      系: "感",
      路: "欲",
      用途: "★★★ 她对你的真实感觉",
      等级: [ "知道她喜不喜欢你", "知道有多喜欢", "★ 知道她什么时候开始真的动心" ]
    }, {
      键: "性史",
      名: "性史",
      系: "感",
      路: "史",
      用途: "★ 她被谁碰过、怎么碰的",
      等级: [ "几个人", "每一次大概什么样", "★ 她最忘不掉的那一次" ]
    }, {
      键: "预判",
      名: "预判",
      系: "感",
      路: "史",
      用途: "★★ 下一步她会怎么样",
      等级: [ "知道她会不会躲", "知道她下一句说什么", "★ 知道她三步之后的反应" ]
    }, {
      键: "事后",
      名: "事后",
      系: "感",
      路: "史",
      用途: "★★ 明天她会怎么样",
      等级: [ "知道她会不会后悔", "知道她明天走路什么感觉", "★ 知道她会不会主动找你" ]
    }, {
      键: "说谎",
      名: "说谎",
      系: "感",
      路: "史",
      用途: "★★ 她说的是不是真的",
      等级: [ "知道她在撒谎", "知道她瞒了什么", "★ 知道她为什么瞒" ]
    }, {
      键: "她身上有谁",
      名: "她身上有谁",
      系: "感",
      路: "别",
      用途: "★★★ 她身上有没有别人留下的东西",
      等级: [ "看得出来有没有", "看得出来什么时候留的", "★ 看得出来是谁" ]
    }, {
      键: "她瞒着什么",
      名: "她瞒着什么",
      系: "感",
      路: "别",
      用途: "★★★ 她没告诉你的那件事",
      等级: [ "知道她有事瞒着", "知道瞒的是哪一类", "★ 知道具体是什么" ]
    }, {
      键: "她身上在想谁",
      名: "她身上在想谁",
      系: "感",
      路: "别",
      用途: "★★★★ 她现在心里想的是谁",
      等级: [ "知道她有没有想别人", "知道想的是谁", "★ 她在你身下的时候想的是谁" ]
    }, {
      键: "她会不会",
      名: "她会不会",
      系: "感",
      路: "别",
      用途: "★★★★ 她会不会答应别人",
      等级: [ "知道她有没有在考虑", "知道对方是谁", "★ 知道她哪一天会答应" ]
    }, {
      键: "气味",
      名: "气味",
      系: "痕",
      路: "味",
      用途: "★ 味道也是痕迹",
      等级: [ "能盖住自己的味", "能改自己的味", "★ 能带她的味走" ]
    }, {
      键: "她的味",
      名: "她的味",
      系: "痕",
      路: "味",
      用途: "★★ 让她的味留在你身上",
      等级: [ "你自己能闻到", "别人能闻到", "★ 洗了还在，她不承认也没用" ]
    }, {
      键: "除味",
      名: "除味",
      系: "痕",
      路: "味",
      用途: "★ 反着走 —— 把味清干净",
      等级: [ "能清掉自己的味", "能清掉她身上的味", "★ 连她自己都闻不到了" ]
    }, {
      键: "体液",
      名: "体液",
      系: "痕",
      路: "液",
      用途: "★ 留不留、留多少",
      等级: [ "能控制留多少", "能控制留多久", "★ 想留就留，想没就没" ]
    }, {
      键: "精液痕",
      名: "精液痕",
      系: "痕",
      路: "液",
      用途: "★★ 射进去之后流不流出来",
      等级: [ "不流出来", "一点点，她自己擦掉", "★ 走到哪儿滴到哪儿，她夹不住" ]
    }, {
      键: "灌满",
      名: "灌满",
      系: "痕",
      路: "液",
      用途: "★★★ 射到装不下",
      等级: [ "一小股", "半杯，会往外流", "★ 灌满，她一动就溢出来" ]
    }, {
      键: "浓稠",
      名: "浓稠",
      系: "痕",
      路: "液",
      用途: "★★ 挂在里面，冲不干净",
      等级: [ "稀的，一下就流走", "稠的，挂在壁上", "★ 洗不掉，她一整天都能感觉到" ]
    }, {
      键: "印记",
      名: "印记",
      系: "痕",
      路: "印",
      用途: "★ 指痕、牙印、吻痕",
      等级: [ "不留下", "留一点，第二天淡", "★ 留到别人看得见" ]
    }, {
      键: "消印",
      名: "消印",
      系: "痕",
      路: "印",
      用途: "★ 她要见人的时候，印子没了",
      等级: [ "能消自己的", "能消她身上的", "★ 能消她身上别人留的" ]
    }, {
      键: "烙痕",
      名: "烙痕",
      系: "痕",
      路: "印",
      用途: "★★★★ 反着走 —— 留一辈子",
      等级: [ "留一周", "留一个月", "★ 永远在，她遮不住，也解释不了" ]
    }, {
      键: "录音",
      名: "录音",
      系: "痕",
      路: "声",
      用途: "★★ 她叫的声音留下来",
      等级: [ "能录", "能剪", "★ 能在她面前放出来" ]
    }, {
      键: "灭声",
      名: "灭声",
      系: "痕",
      路: "声",
      用途: "★★★ 让她叫，但只有你听得见",
      等级: [ "隔一堵墙听不见", "同一个房间别人听不见", "★ 只有你能听见" ]
    }, {
      键: "回声",
      名: "回声",
      系: "痕",
      路: "声",
      用途: "★★★★ 她一个人时会听见自己叫",
      等级: [ "会想起那个声音", "会真的听见", "★ 听见的是你在弄她的那一段" ]
    }, {
      键: "体感残留",
      名: "体感残留",
      系: "痕",
      路: "身",
      用途: "★★★ 事后她身体里还有感觉",
      等级: [ "当天有", "第二天还有", "★ 过一周她坐着还会想起来" ]
    }, {
      键: "记忆",
      名: "记忆",
      系: "痕",
      路: "身",
      用途: "★★★ 她记得多清楚",
      等级: [ "知道她记得什么", "能让她记得更清楚", "★ 能让她只记得爽的部分" ]
    }, {
      键: "反追查",
      名: "反追查",
      系: "痕",
      路: "身",
      用途: "★ 你那边的痕迹能不能被查",
      等级: [ "她自己查不到", "她找人查也查不到", "★ 查的人会查到别人身上" ]
    }, {
      键: "场所",
      名: "场所",
      系: "玩",
      路: "场",
      用途: "★ 在哪儿做由你挑",
      等级: [ "她的地方", "她想都想不到的地方", "★ 哪儿都能" ]
    }, {
      键: "危险场所",
      名: "危险场所",
      系: "玩",
      路: "场",
      用途: "★★★ 她不敢出声的地方",
      等级: [ "隔一堵墙有人", "同一个房间里有人", "★ 有人在旁边看着，她还得装作没事" ]
    }, {
      键: "公开",
      名: "公开",
      系: "玩",
      路: "场",
      用途: "★★★ 让这件事有观众",
      等级: [ "隔着一层布有人在", "看得到轮廓", "★ 看得到，而她忍着" ]
    }, {
      键: "直播",
      名: "直播",
      系: "玩",
      路: "场",
      用途: "★★★★ 有一群人在看",
      等级: [ "录音，事后给人听", "录像，只有脸不露", "★ 直播，几百个人在看" ]
    }, {
      键: "公开场所",
      名: "公开场所",
      系: "玩",
      路: "场",
      用途: "★★★★ 在不能做的地方做",
      等级: [ "试衣间", "车里", "★ 她上班的地方" ]
    }, {
      键: "时间延长",
      名: "时间延长",
      系: "玩",
      路: "场",
      用途: "★ 把这一夜拉长",
      等级: [ "两倍", "五倍", "★ 外面天亮了她还不知道" ]
    }, {
      键: "束缚",
      名: "束缚",
      系: "玩",
      路: "调",
      用途: "★ 她动不了",
      等级: [ "手能按住", "能捆住手腕", "★ 手脚都捆上，只能用身体求" ]
    }, {
      键: "拘束具",
      名: "拘束具",
      系: "玩",
      路: "调",
      用途: "★★★ 固定成你要的姿势",
      等级: [ "捆住手脚", "吊起来", "★ 固定在任何一个姿势，动不了也说不出" ]
    }, {
      键: "调教",
      名: "调教",
      系: "玩",
      路: "调",
      用途: "★★★ 每一次都比上一次更过分",
      等级: [ "她知道下一次会更狠", "她开始怕，也开始等", "★ 她自己会提出来" ]
    }, {
      键: "羞耻",
      名: "羞耻",
      系: "玩",
      路: "调",
      用途: "★★★ 让她说出口",
      等级: [ "让她说下流的话", "让她说出来她想要什么", "★ 让她一边说一边到" ]
    }, {
      键: "惩罚",
      名: "惩罚",
      系: "玩",
      路: "调",
      用途: "★★ 做错事有后果",
      等级: [ "小罚", "她会记住", "★ 她为了不被罚，主动做更多" ]
    }, {
      键: "奖励",
      名: "奖励",
      系: "玩",
      路: "调",
      用途: "★★ 做对了有甜头",
      等级: [ "夸她", "给她想要的", "★ 她自己开始争这个" ]
    }, {
      键: "展示",
      名: "展示",
      系: "玩",
      路: "人",
      用途: "★★★★ 让别人看她的身体",
      等级: [ "发照片（不露脸）", "发给认识她的人", "★ 当面展示给第三个人" ]
    }, {
      键: "多人",
      名: "多人",
      系: "玩",
      路: "人",
      用途: "★★★★ 不止你一个",
      等级: [ "两个女的", "一个女的、几个男的", "★ 她认识的两个人一起" ]
    }, {
      键: "换人",
      名: "换人",
      系: "玩",
      路: "人",
      用途: "★★★★★ 让她跟别人做，你在看",
      等级: [ "她在别人身下，你在旁边", "她一边做一边看你", "★ 她做完回来跟你描述细节" ]
    }, {
      键: "共用",
      名: "共用",
      系: "玩",
      路: "人",
      用途: "★★★★★ 把她借出去",
      等级: [ "借一次", "借一段时间", "★ 借给几个人，她回来的时候身上还有别人的" ]
    }, {
      键: "记录",
      名: "记录",
      系: "玩",
      路: "录",
      用途: "★★ 把它留下来",
      等级: [ "拍下来自己看", "拍下来给她看", "★ 拍下来给需要看的人看" ]
    }, {
      键: "回放",
      名: "回放",
      系: "玩",
      路: "录",
      用途: "★★★ 让她自己看自己",
      等级: [ "一边做一边看", "事后看", "★ 当着别人的面看" ]
    }, {
      键: "分发",
      名: "分发",
      系: "玩",
      路: "录",
      用途: "★★★★★ 发给该看的人",
      等级: [ "发给她认识的人", "发给她的家人", "★ 发出去，收不回来" ]
    }, {
      键: "采",
      名: "采",
      系: "玩",
      路: "量",
      用途: "★★★ 榨 —— 不让她睡",
      等级: [ "一夜几次", "不让她睡", "★ 榨到她站不起来" ]
    }, {
      键: "借种",
      名: "借种",
      系: "玩",
      路: "量",
      用途: "★★★★ 血脉侵占与亲权篡夺 —— 孩子长相100%像你，但任何DNA检测永远显示属于合法配偶",
      等级: [ "相貌显性复刻：生下来的孩子眉眼五官极度肖似你，旁人一眼能看出异样", "因果律医学绝缘：任凭她老公拔头发做多少次司法DNA亲子鉴定，科学报告永远绝对匹配丈夫", "家庭认知霸凌：全家心知肚明戴了绿帽却查无实据，苦主咬碎牙还要拼命挣钱把你的种养大" ]
    }, {
      键: "道具",
      名: "道具",
      系: "玩",
      路: "量",
      用途: "★★ 手机里能拿出东西来",
      等级: [ "基本的东西", "什么形状都行", "★ 她没见过的东西" ]
    }, {
      键: "定制",
      名: "定制",
      系: "玩",
      路: "量",
      用途: "★★★ 做一件只对她的东西",
      等级: [ "尺寸刚好", "形状刚好", "★ 只有她能用" ]
    }, {
      键: "扮装",
      名: "扮装",
      系: "玩",
      路: "量",
      用途: "★★★ 让她穿成那样",
      等级: [ "换衣服", "换成她要见人的场合完全不能穿的", "★ 穿在裙子里面，一整天" ]
    }, {
      键: "角色",
      名: "角色",
      系: "玩",
      路: "量",
      用途: "★★★★ 让她演一个不是她的人",
      等级: [ "换个称呼", "换一套身份", "★ 演到她自己都信了" ]
    }, {
      键: "生育控制",
      名: "生育控制",
      系: "免",
      路: "生",
      用途: "★ 意念掌控受孕开关：你想让她怀一发必中，不想让她怀亿万发皆白浆",
      等级: [ "绝对避孕：内射无痕，无任何受孕可能", "择机受孕：意念开启播种模式，一发命中受精", "掌控受孕：精准决定排卵受精时机与胎儿性别" ]
    }, {
      键: "免疫艾滋",
      名: "免疫艾滋",
      系: "免",
      路: "病",
      用途: "★★ 单独免疫 HIV —— 最贵的一项",
      等级: [ "不会得", "不会带", "★ 你就算带进去也不会传给她" ]
    }, {
      键: "免疫梅毒",
      名: "免疫梅毒",
      系: "免",
      路: "病",
      用途: "★★ 单独免疫梅毒",
      等级: [ "不会得", "不会带", "★ 传不出去" ]
    }, {
      键: "免疫淋病",
      名: "免疫淋病",
      系: "免",
      路: "病",
      用途: "★★ 单独免疫淋病、衣原体",
      等级: [ "不会得", "不会带", "★ 传不出去" ]
    }, {
      键: "免疫疱疹",
      名: "免疫疱疹",
      系: "免",
      路: "病",
      用途: "★★ 单独免疫疱疹 —— 这个治不好，所以贵",
      等级: [ "不会得", "不会带", "★ 传不出去" ]
    }, {
      键: "免疫HPV",
      名: "免疫HPV",
      系: "免",
      路: "病",
      用途: "★★ 单独免疫 HPV",
      等级: [ "不会得", "不会带", "★ 传不出去" ]
    }, {
      键: "免疫其他",
      名: "免疫其他",
      系: "免",
      路: "病",
      用途: "★★ 滴虫、阴虱、软下疳这些",
      等级: [ "不会得", "不会带", "★ 传不出去" ]
    }, {
      键: "万毒不侵",
      名: "万毒不侵",
      系: "免",
      路: "病",
      用途: "★★★★★ 上面全都有之后才开 —— 任何体液都不带任何东西",
      等级: [ "你永远不会有事", "她也不会从你这儿有事", "★ 她跟过你之后，以前那些也没了" ]
    }, {
      键: "不留痕",
      名: "不留痕",
      系: "免",
      路: "身",
      用途: "★ 回家不用解释",
      等级: [ "你身上不留", "她身上也留得少", "完全无痕 —— 查不出发生过" ]
    }, {
      键: "事后无感",
      名: "事后无感",
      系: "免",
      路: "身",
      用途: "★★ 她那边没有任何后果",
      等级: [ "不会肿", "不会疼", "★ 第二天她完全正常，只有她自己知道发生过" ]
    }, {
      键: "无痛",
      名: "无痛",
      系: "免",
      路: "身",
      用途: "★ 敢去危险的地方",
      等级: [ "受伤不痛", "不因痛停（★ 抗暴时不会被打断）", "不会受伤" ]
    }, {
      键: "耐力",
      名: "耐力",
      系: "免",
      路: "身",
      用途: "★ 一晚能来几发",
      等级: [ "+2 发", "+5 发", "不限" ]
    }, {
      键: "不老",
      名: "不老",
      系: "免",
      路: "身",
      用途: "★ 照片和真人永远对得上",
      等级: [ "十年不变", "任何时期的照片都对得上", "她记忆里的你和现在一模一样" ]
    }, {
      键: "替身",
      名: "替身",
      系: "免",
      路: "身",
      用途: "★★★★ 留痕的时候，痕迹指向别人",
      等级: [ "痕迹指向一个不存在的人", "可以把痕迹指向指定的人", "★ 你说谁做的，记录就是谁做的" ]
    }, {
      键: "免疫药物",
      名: "免疫药物",
      系: "免",
      路: "身",
      用途: "★★ 酒、药、麻醉对你无效",
      等级: [ "喝不醉", "药没用", "★ 你能装作被下药了" ]
    }, {
      键: "接入",
      名: "接入",
      系: "网",
      路: "进",
      用途: "★ 进得去老会员才进得去的群",
      等级: [ "看得见", "进得去", "说得上话（不被当外人）" ]
    }, {
      键: "门槛",
      名: "门槛",
      系: "网",
      路: "进",
      用途: "★★ 进得去最里面那一层",
      等级: [ "进得去要邀请的", "进得去要人带的", "★ 你自己就是带人的那个" ]
    }, {
      键: "实名",
      名: "实名",
      系: "网",
      路: "进",
      用途: "★★★ 用她的网名找到她本人",
      等级: [ "查到她的号", "查到她的真名", "★ 查到她在哪儿上班、住哪儿" ]
    }, {
      键: "无痕浏览",
      名: "无痕浏览",
      系: "网",
      路: "看",
      用途: "★ 看穿她发出来的东西背后是什么",
      等级: [ "公开内容", "私信 / 小号 / 已删的帖", "★ 草稿箱（她打了没发出去的话）" ]
    }, {
      键: "身份映射",
      名: "身份映射",
      系: "网",
      路: "看",
      用途: "★★ 知道对面是不是同一个人",
      等级: [ "号 = 号", "号 = 人", "★ 一个人 = 她全部马甲" ]
    }, {
      键: "破译",
      名: "破译",
      系: "网",
      路: "看",
      用途: "★★ 本地黑话都看得懂",
      等级: [ "任何语言", "本地黑话和暗语", "★ 她没说出口的那半句" ]
    }, {
      键: "反侦查",
      名: "反侦查",
      系: "网",
      路: "看",
      用途: "★★ 知道这屋里有几个镜头",
      等级: [ "有没有镜头", "镜头在哪、对着哪儿", "★ 谁在看，以及他会不会存" ]
    }, {
      键: "改记录",
      名: "改记录",
      系: "网",
      路: "看",
      用途: "★★★★ 已经录下来的东西也能改",
      等级: [ "能抹掉自己的那几秒", "能换成别人", "★ 整段记录变成另一件事" ]
    }, {
      键: "全局视野",
      名: "全局视野",
      系: "网",
      路: "看",
      用途: "★★★★★ 所有关于她的数据都在你手上",
      等级: [ "她的所有账号", "她的所有记录", "★ 她这个人对你是透明的" ]
    }, {
      键: "第一印象",
      名: "第一印象",
      系: "网",
      路: "说",
      用途: "★ 见面 10 秒内她偏向你",
      等级: [ "破冰 +5", "破冰 +10", "破冰 +15" ]
    }, {
      键: "变声",
      名: "变声",
      系: "网",
      路: "说",
      用途: "★★ 电话里的你和真人不一样",
      等级: [ "能改音色", "能模仿指定的人", "★ 她听到的是她想听到的那个声音" ]
    }, {
      键: "小号",
      名: "小号",
      系: "网",
      路: "说",
      用途: "★★ 同时钓多个，互不关联",
      等级: [ "2 个", "5 个", "★ 无限" ]
    }, {
      键: "信誉伪造",
      名: "信誉伪造",
      系: "网",
      路: "说",
      用途: "★★★ 快速进入高端局",
      等级: [ "关系判定 +15", "假等级、假认证", "★ 整套履历（能查，查得到）" ]
    }, {
      键: "身份顶替",
      名: "身份顶替",
      系: "网",
      路: "说",
      用途: "★★★★ 用别人的身份进去",
      等级: [ "借用别人的号", "借用别人的脸", "★ 那个人自己都以为自己做过" ]
    }, {
      键: "造人",
      名: "造人",
      系: "网",
      路: "说",
      用途: "★★★★★ 凭空造一个人出来",
      等级: [ "造一个号", "造一个有历史有朋友的号", "★ 造出来的人，别人记得见过" ]
    }, {
      键: "影子档案",
      名: "影子档案",
      系: "网",
      路: "记",
      用途: "★ 自动记录每一个她",
      等级: [ "自动记下她是谁", "记下她说过什么", "★ 记下她没说的" ]
    }, {
      键: "检索",
      名: "检索",
      系: "网",
      路: "记",
      用途: "★★ 从记录里翻出规律",
      等级: [ "查得到历史", "看得出规律", "★ 知道她下次什么时候会想" ]
    }, {
      键: "推演",
      名: "推演",
      系: "网",
      路: "记",
      用途: "★★★ 手机替你算她下一步",
      等级: [ "算出她今天会不会上线", "算出她会不会答应", "★ 算出她三天后会在哪儿" ]
    }, {
      键: "预置",
      名: "预置",
      系: "网",
      路: "记",
      用途: "★★★★ 先把话说完，等她回",
      等级: [ "预先写好开场", "预写好一段对话，她说什么都接得上", "★ 连她的回复都是算好的" ]
    }, {
      键: "代笔",
      名: "代笔",
      系: "网",
      路: "记",
      用途: "★★★★★ 它开始在你没要求的时候做事",
      等级: [ "它替你回消息", "它替你维持关系", "★ 你不在的时候，故事照样在走" ]
    }, {
      键: "习惯",
      名: "习惯",
      系: "众",
      路: "她",
      用途: "★★★ 她开始自己找",
      等级: [ "她会主动贴过来", "她会在没人的时候自己弄", "★ 你不找她，她会来找你" ]
    }, {
      键: "主动提",
      名: "主动提",
      系: "众",
      路: "她",
      用途: "★★★★ 她想试她自己没试过的",
      等级: [ '她开始问"还有别的吗"', "她自己说出想试什么", "★ 她提的东西比你敢想的更狠" ]
    }, {
      键: "背地里的她",
      名: "背地里的她",
      系: "众",
      路: "她",
      用途: "★★★★ 你不看着她的时候，她在做什么",
      等级: [ "她一个人待着会想你", "她会做点什么", "★ 她瞒着你做，而且不止一次" ]
    }, {
      键: "她的瘾",
      名: "她的瘾",
      系: "众",
      路: "她",
      用途: "★★★★★ 她开始需要这个",
      等级: [ "她开始盼着你来", "她自己一个人的时候不够", "★ 她为了这个做了她本来不会做的事" ]
    }, {
      键: "在外的人设",
      名: "在外的人设",
      系: "众",
      路: "外",
      用途: "★★★ 她在外面是什么样",
      等级: [ "她还是原来那个她", "她开始有点不一样，别人看不出来", "★ 所有人都说她正经，只有你知道不是" ]
    }, {
      键: "两个她",
      名: "两个她",
      系: "众",
      路: "外",
      用途: "★★★★ 白天和晚上是两个人",
      等级: [ "她开始分开说话", "她开始分开穿", "★ 她自己在两个身份之间切换得很顺" ]
    }, {
      键: "当众",
      名: "当众",
      系: "众",
      路: "外",
      用途: "★★★★★ 极度反差与桌底家禽侍奉 —— 当着老公和同事的面跪在桌布底下卖力含茎吞精",
      等级: [ "在公共场合（包厢/走廊/试衣间）裙底真空接受爱抚而不失态", "宴席桌底口交：当着老公和同事的面跪在桌布底下卖力含茎吞精，桌上还要强作镇定敬酒", "双面人格固化：台前端庄高贵不苟言笑，门后戴项圈跪地舔精为荣，彻底沉沦为专属母犬" ]
    }, {
      键: "她开始比",
      名: "她开始比",
      系: "众",
      路: "外",
      用途: "★★★ 她开始拿自己和别人比",
      等级: [ "她会问你她好不好", "她会问别人怎么样", "★ 她要证明自己比她们强" ]
    }, {
      键: "她保护你",
      名: "她保护你",
      系: "众",
      路: "瞒",
      用途: "★★★★ 她开始替你瞒",
      等级: [ "她不会说出去", "她会替你圆谎", "★ 有人问起来，她主动挡在前面" ]
    }, {
      键: "第一个人",
      名: "第一个人",
      系: "众",
      路: "瞒",
      用途: "★★★★★ 她开始带别人进来",
      等级: [ "她跟一个朋友提过你", "她带了一个人来见你", "★ 她开始帮你找人" ]
    }, {
      键: "她骗人",
      名: "她骗人",
      系: "众",
      路: "瞒",
      用途: "★★★★ 她开始对别的人撒谎",
      等级: [ "她会晚回消息", "她会编理由", "★ 她编得像真的一样，她自己都不脸红了" ]
    }, {
      键: "她的关系",
      名: "她的关系",
      系: "众",
      路: "瞒",
      用途: "★★★★ 她那边的人在变",
      等级: [ "她开始躲开一个人", "她开始冷掉一段关系", "★ 她主动断了 —— 因为她有事瞒着" ]
    }, {
      键: "她的家人",
      名: "她的家人",
      系: "众",
      路: "瞒",
      用途: "★★★★★ 她家里看得出来",
      等级: [ "她家里人问她最近怎么了", "她家里人开始起疑", "★ 她为了你跟她家里吵了一架" ]
    }, {
      键: "口碑",
      名: "口碑",
      系: "众",
      路: "圈",
      用途: "★★★ 圈子里开始有人说你",
      等级: [ "有人说你靠谱", "有人主动打听你", "★ 有人拿你的名字办事" ]
    }, {
      键: "排他",
      名: "排他",
      系: "众",
      路: "圈",
      用途: "★★★★ 有人开始防着你",
      等级: [ "有人不接你的话", "有人开始查你", "★ 圈子里有人专门提醒新人别碰你" ]
    }, {
      键: "引荐",
      名: "引荐",
      系: "众",
      路: "圈",
      用途: "★★★★ 闺蜜与母女同圈献祭 —— 打破排他性，主动做局引荐身边的女性好友一起上床侍奉",
      等级: [ "打破排他妒忌，主动将身边的闺蜜/姐妹做局引荐到你的床上", "母女/姐妹同侍：协同在一张床上服侍，毫无道德羞耻，互相攀比谁吞得更干净", "全员恶堕狂欢：以组建专属雌犬母畜群服侍你为最高追求，成为你专属的猎艳引荐犬" ]
    }, {
      键: "圈子分歧",
      名: "圈子分歧",
      系: "众",
      路: "圈",
      用途: "★★★★★ 因为你在，圈子里分成了两派",
      等级: [ "有人为你说话", "有人因此退出", "★ 一个圈子因为你裂了" ]
    }, {
      键: "别人也能",
      名: "别人也能",
      系: "众",
      路: "圈",
      用途: "★★★★★ 你的事让别人也做得到",
      等级: [ "有人学着你的做法", "有人做得成", "★ 这条路被走烂了，所有人都来做" ]
    }, {
      键: "门槛变高",
      名: "门槛变高",
      系: "众",
      路: "圈",
      用途: "★★★★★ 因为做的人多了，站就关门了",
      等级: [ "站里开始查人", "要验资或者引荐", "★ 你熟悉的地方进不去了" ]
    }, {
      键: "币价",
      名: "币价",
      系: "众",
      路: "圈",
      用途: "★★★★ 你把这一行的价钱带起来了",
      等级: [ "附近报价涨了点", "涨了一半", '★ 你成了那个"给得起"的标杆' ]
    }, {
      键: "后来的人",
      名: "后来的人",
      系: "众",
      路: "圈",
      用途: "★★★★★ 你走了以后，她们那边发生了什么",
      等级: [ "她们还记得你", "她们会拿后来的人跟你比", "★ 后来的人被你的标准害了" ]
    }, {
      键: "她的手机",
      名: "她的手机",
      系: "众",
      路: "留",
      用途: "★★★★ 她手机里有什么",
      等级: [ "她存了一张", "她存了一组，还带锁", "★ 她拍了你没让拍的" ]
    }, {
      键: "她会给人看",
      名: "她会给人看",
      系: "众",
      路: "留",
      用途: "★★★★★ 她会不会给别人看",
      等级: [ "她只自己看", "她给一个最要好的人看过", "★ 她拿这个当资本" ]
    }, {
      键: "她学会了拍",
      名: "她学会了拍",
      系: "众",
      路: "留",
      用途: "★★★★★ 她自己开始拍、自己开始发",
      等级: [ "她自己拍", "她自己发给别人看", "★ 她自己开了一个号，而你不在里面" ]
    } ];
    const 技能键 = 技能表.map(s => s.键);
    const 技能上限 = 3;
    function 按系(系) {
      return 技能表.filter(s => s.系 === 系);
    }
    function 按路(系) {
      const 出 = {};
      for (const s of 技能表.filter(x => x.系 === 系)) {
        const 路 = s.路 ?? "其他";
        (出[路] ??= []).push(s);
      }
      return 出;
    }
    const 属性系 = [ "身体", "魅力" ];
    const 属性步长 = 1;
    const 技能倍率 = [ 1, 2, 4 ];
    function 技能加价(手机等级门槛, 当前等级) {
      const 级 = Math.max(0, Math.min(2, Math.round(当前等级)));
      const 基 = 手机等级门槛 <= 10 ? 4 : 手机等级门槛 <= 20 ? 6 : 手机等级门槛 <= 30 ? 9 : 手机等级门槛 <= 40 ? 12 : 手机等级门槛 <= 50 ? 16 : 手机等级门槛 <= 60 ? 21 : 手机等级门槛 <= 70 ? 26 : 手机等级门槛 <= 85 ? 32 : 手机等级门槛 <= 95 ? 40 : 50;
      return 基 * 技能倍率[级];
    }
    function 单项全满(手机等级门槛) {
      return 技能加价(手机等级门槛, 0) + 技能加价(手机等级门槛, 1) + 技能加价(手机等级门槛, 2);
    }
    function 全技能全满(门槛s) {
      return 门槛s.reduce((s, m) => s + 单项全满(m), 0);
    }
    function 计算不应期(属性恢复, 技能连硬) {
      const 基础 = (0, ___WEBPACK_IMPORTED_MODULE_0__["恢复到不应期"])(属性恢复);
      const 减 = Math.min(1, Math.max(0, 技能连硬) / 3);
      return Math.round(基础 * (1 - 减) * 10) / 10;
    }
    function 计算尺寸范围(基础寸, 技能尺寸自由) {
      const 幅 = [ 0, 1, 2.5, 4 ][Math.max(0, Math.min(3, Math.round(技能尺寸自由)))] ?? 0;
      return [ Math.round((基础寸 - 幅) * 10) / 10, Math.round((基础寸 + 幅) * 10) / 10 ];
    }
  },
  "./src/神奇手机/神奇手机/核心/技能树.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      全满花费: () => 全满花费,
      分叉数: () => 分叉数,
      单项全满: () => 单项全满,
      可点清单: () => 可点清单,
      技能树表: () => 技能树表,
      技能系查: () => 技能系查,
      有前置: () => 有前置,
      能否点技能: () => 能否点技能,
      路深: () => 路深,
      这一级多少: () => 这一级多少,
      链: () => 链,
      门槛一览: () => 门槛一览
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./技能定义 */ "./src/神奇手机/神奇手机/核心/技能定义.ts");
    const 系表缓存 = Object.fromEntries(___WEBPACK_IMPORTED_MODULE_0__["技能表"].map(s => [ s.键, s.系 ]));
    const 技能树表 = {
      尺寸自由: {
        手机等级: 1,
        用途: "★ 尺寸自律微调 —— 精准卡死在她的生理舒适峰值"
      },
      自动适配: {
        前置技能: [ "尺寸自由" ],
        手机等级: 6,
        用途: "★★ 进去瞬间自动贴合她的深浅宽窄"
      },
      凸点: {
        前置技能: [ "自动适配" ],
        手机等级: 21,
        用途: "★★ 冠状沟肉棱生长 —— 表面自生密密麻麻肉粒刮一路"
      },
      倒钩: {
        前置技能: [ "凸点", "快感读数" ],
        手机等级: 39,
        用途: "★★★ 肉刺与倒钩 —— 拔出刮带软肉翻卷，痛爽交加尖叫失禁"
      },
      分叉: {
        前置技能: [ "倒钩", "松紧" ],
        手机等级: 66,
        用途: "★★★ 双物分叉 —— 阴道与直肠双穴同贯穿，泥泞横流"
      },
      多物: {
        前置技能: [ "分叉", "体内改造" ],
        手机等级: 90,
        用途: "★★★★ 超常理多头肉物 —— 撑满前后所有腔道，数不清几根"
      },
      硬度控制: {
        手机等级: 10,
        用途: "★ 状态稳不稳"
      },
      硬度翻倍: {
        前置技能: [ "硬度控制" ],
        手机等级: 11,
        用途: "★★ 硬得像另一种东西"
      },
      永久勃起: {
        前置技能: [ "硬度翻倍" ],
        手机等级: 27,
        用途: "★★★ 不软 —— 什么时候看都硬着"
      },
      连硬: {
        前置技能: [ "永久勃起" ],
        手机等级: 53,
        用途: "★★ 射完不用等"
      },
      自主: {
        前置技能: [ "连硬" ],
        手机等级: 86,
        用途: "★★★ 你不动，它自己弄她"
      },
      持久控制: {
        手机等级: 20,
        用途: "想多久就多久"
      },
      马拉松: {
        前置技能: [ "持久控制" ],
        手机等级: 21,
        用途: "★ 一整夜"
      },
      射精控制: {
        前置技能: [ "马拉松" ],
        手机等级: 37,
        用途: "想射才射"
      },
      边缘: {
        前置技能: [ "射精控制" ],
        手机等级: 58,
        用途: "★★ 吊着她 —— 不让她到"
      },
      不射: {
        前置技能: [ "边缘" ],
        手机等级: 89,
        用途: "★★★ 想不射就不射"
      },
      长度: {
        前置技能: [ "尺寸自由" ],
        手机等级: 11,
        用途: "顶得到底"
      },
      宫口: {
        前置技能: [ "长度", "湿润" ],
        手机等级: 38,
        用途: "★★ 子宫颈强行贯穿 —— 破开紧闭狭缝引发子宫绝顶"
      },
      粗细: {
        前置技能: [ "尺寸自由" ],
        手机等级: 12,
        用途: "撑满 —— 让她合不上"
      },
      撕裂: {
        前置技能: [ "粗细" ],
        手机等级: 43,
        用途: "★★★ 撑到裂 —— 疼和爽走同一根神经"
      },
      换形: {
        手机等级: 66,
        用途: "★★★★ 变成她想要的那一种"
      },
      变形: {
        前置技能: [ "换形" ],
        手机等级: 93,
        用途: "★★★★ 不是人的形状也行"
      },
      体味: {
        手机等级: 2,
        用途: "★ 你身上有味道了"
      },
      猫薄荷: {
        前置技能: [ "体味", "欲望" ],
        手机等级: 12,
        用途: "★★★ 雄性麝香引力场 —— 5米内闻到即心率加快私处泛潮"
      },
      气味上瘾: {
        前置技能: [ "猫薄荷" ],
        手机等级: 33,
        用途: "★★★★ 闻不到就难受"
      },
      隔空: {
        前置技能: [ "气味上瘾" ],
        手机等级: 53,
        用途: "★★★★ 隔着距离也有效"
      },
      群体: {
        前置技能: [ "隔空" ],
        手机等级: 76,
        用途: "★★★★★ 一屋子人一起受影响"
      },
      定向: {
        前置技能: [ "群体" ],
        手机等级: 98,
        用途: "★★★★★ 满屋子只有她闻到"
      },
      快感注入: {
        手机等级: 7,
        用途: "★★★ 进去的那一下就不一样"
      },
      冰毒: {
        前置技能: [ "快感注入", "敏感发现" ],
        手机等级: 31,
        用途: "★★★★★ 毒品级快感注入与精液成瘾"
      },
      成瘾: {
        前置技能: [ "冰毒", "高潮触发" ],
        手机等级: 49,
        用途: "★★★★★ 神经戒断依赖 —— 离开3天即空虚发痒"
      },
      戒断: {
        前置技能: [ "成瘾" ],
        手机等级: 72,
        用途: "★★★★★ 不来就难受，像真的戒断"
      },
      只认你: {
        前置技能: [ "戒断" ],
        手机等级: 89,
        用途: "★★★★★ 别人给不了这个"
      },
      精神依赖: {
        前置技能: [ "只认你" ],
        手机等级: 99,
        用途: "★★★★★★ 她要的不只是身体"
      },
      口水: {
        手机等级: 3,
        用途: "★★ 接吻的效果由你定"
      },
      催情精液: {
        前置技能: [ "口水" ],
        手机等级: 19,
        用途: "★★★★ 接触精子会让她对你产生感觉"
      },
      内射印记: {
        前置技能: [ "催情精液" ],
        手机等级: 38,
        用途: "★★★★★ 射进去之后，一段时间只想要你"
      },
      体液上瘾: {
        前置技能: [ "内射印记" ],
        手机等级: 59,
        用途: "★★★★ 她渴你的体液"
      },
      味道: {
        前置技能: [ "体液上瘾" ],
        手机等级: 77,
        用途: "★★★★ 精液的味道她忘不掉"
      },
      体液互换: {
        前置技能: [ "味道" ],
        手机等级: 90,
        用途: "★★★ 尝一口就知道她有没有别人"
      },
      免疫体味: {
        手机等级: 4,
        用途: "★ 不出味，除了你想留的"
      },
      经期: {
        手机等级: 16,
        用途: "★★ 她什么时候来由你定"
      },
      湿润反射: {
        手机等级: 34,
        用途: "★★★ 她看见你就湿"
      },
      催乳: {
        前置技能: [ "口水", "乳头" ],
        手机等级: 21,
        用途: "★★★ 专属排乳与乳汁分泌 —— 只有你能吸出来"
      },
      孕味: {
        前置技能: [ "催乳", "借种" ],
        手机等级: 73,
        用途: "★★★★ 怀胎发情与顶撞孕肚 —— 恶堕臣服于播种者"
      },
      潮吹控制: {
        手机等级: 24,
        用途: "★★ 喷不喷、喷多少由你"
      },
      通用语言: {
        手机等级: 10,
        用途: "★★ 任何语言都能说、能听"
      },
      传送: {
        手机等级: 30,
        用途: "★★★ 随时去任何地方"
      },
      时停: {
        手机等级: 92,
        用途: "★★★★★ 只有你们两个的时间在走"
      },
      分身: {
        手机等级: 59,
        用途: "★★★★ 同时出现在两个地方"
      },
      隐身: {
        手机等级: 60,
        用途: "★★★★ 别人看不见你"
      },
      缩小: {
        手机等级: 67,
        用途: "★★★★★ 小到能钻进去"
      },
      放大: {
        前置技能: [ "缩小" ],
        手机等级: 79,
        用途: "★★★ 大到她装不下"
      },
      触手: {
        手机等级: 45,
        用途: "★★★★ 你身上能长出别的东西"
      },
      温度: {
        手机等级: 34,
        用途: "★★★ 你能改自己和她身上的温度"
      },
      距离: {
        手机等级: 87,
        用途: "★★★★★ 隔着距离也能碰她"
      },
      感应: {
        手机等级: 16,
        用途: "★★ 知道她在哪儿、在干什么"
      },
      读心: {
        前置技能: [ "感应" ],
        手机等级: 54,
        用途: "★★★★ 听见她在想什么"
      },
      梦境: {
        手机等级: 67,
        用途: "★★★★★ 进她的梦"
      },
      记忆读取: {
        手机等级: 45,
        用途: "★★★★ 看她的记忆"
      },
      时间倒流: {
        手机等级: 93,
        用途: "★★★★★★ 不满意就重来"
      },
      预备: {
        手机等级: 4,
        用途: "★★ 要什么手里就有什么"
      },
      切换: {
        手机等级: 54,
        用途: "★★★ 换一个人出来"
      },
      不死: {
        手机等级: 60,
        用途: "★★★ 玩得再狠也回得来"
      },
      替身法: {
        手机等级: 78,
        用途: "★★★★ 让别人替你出面"
      },
      造物: {
        手机等级: 87,
        用途: "★★★★★ 造一个她出来"
      },
      湿润: {
        手机等级: 5,
        用途: "★ 她的水由你调"
      },
      泛滥: {
        前置技能: [ "湿润" ],
        手机等级: 22,
        用途: "★ 水多到收不住"
      },
      浸透: {
        前置技能: [ "泛滥" ],
        手机等级: 57,
        用途: "★★ 一碰就出水"
      },
      干涩: {
        前置技能: [ "湿润" ],
        手机等级: 36,
        用途: "★★★ 反着来 —— 磨得发烫"
      },
      敏感发现: {
        手机等级: 30,
        用途: "★ 找到她自己都不知道的那个点"
      },
      敏感创造: {
        前置技能: [ "敏感发现" ],
        手机等级: 31,
        用途: "★★★ 造一个新的出来"
      },
      全身敏感: {
        前置技能: [ "敏感创造" ],
        手机等级: 63,
        用途: "★★★ 吹口气她都软"
      },
      乳头: {
        手机等级: 17,
        用途: "★★ 光碰这儿就能到"
      },
      高潮触发: {
        前置技能: [ "敏感发现" ],
        手机等级: 31,
        用途: "★ 你决定她什么时候到"
      },
      高潮延迟: {
        前置技能: [ "高潮触发" ],
        手机等级: 49,
        用途: "★★ 让她到不了"
      },
      强制高潮: {
        前置技能: [ "高潮延迟" ],
        手机等级: 84,
        用途: "★★★★ 她不想要了，身体还在到"
      },
      连续高潮: {
        前置技能: [ "高潮触发" ],
        手机等级: 57,
        用途: "★★ 一波接一波"
      },
      松紧: {
        手机等级: 24,
        用途: "★★ 她那儿的松紧由你"
      },
      子宫: {
        手机等级: 46,
        用途: "★★ 射到最里面"
      },
      体内改造: {
        手机等级: 79,
        用途: "★★★★ 里面的构造由你改"
      },
      两套: {
        前置技能: [ "体内改造" ],
        手机等级: 94,
        用途: "★★★★★ 她身上多一套"
      },
      快感读数: {
        手机等级: 5,
        用途: "★ 看得见她的快感"
      },
      极限: {
        前置技能: [ "快感读数" ],
        手机等级: 23,
        用途: "★ 知道她还能撑多久"
      },
      真假: {
        前置技能: [ "快感读数" ],
        手机等级: 23,
        用途: "★★ 她是不是装的"
      },
      说谎: {
        前置技能: [ "真假" ],
        手机等级: 44,
        用途: "★★ 她说的是不是真的"
      },
      共鸣: {
        前置技能: [ "快感读数" ],
        手机等级: 61,
        用途: "★★★ 她的感觉你能感觉到"
      },
      欲望: {
        手机等级: 8,
        用途: "★ 她想要什么"
      },
      幻想: {
        前置技能: [ "欲望" ],
        手机等级: 29,
        用途: "★★ 她幻想过什么"
      },
      没说出口: {
        前置技能: [ "幻想" ],
        手机等级: 64,
        用途: "★★★★ 她嘴上说不要的那件事"
      },
      心动: {
        前置技能: [ "欲望" ],
        手机等级: 62,
        用途: "★★★ 她对你的真实感觉"
      },
      性史: {
        手机等级: 17,
        用途: "★ 她被谁碰过、怎么碰的"
      },
      预判: {
        前置技能: [ "性史" ],
        手机等级: 41,
        用途: "★★ 下一步她会怎么样"
      },
      事后: {
        前置技能: [ "性史" ],
        手机等级: 42,
        用途: "★★ 明天她会怎么样"
      },
      她身上有谁: {
        手机等级: 35,
        用途: "★★★ 她身上有没有别人留下的东西"
      },
      她瞒着什么: {
        前置技能: [ "她身上有谁" ],
        手机等级: 62,
        用途: "★★★ 她没告诉你的那件事"
      },
      她身上在想谁: {
        前置技能: [ "她身上有谁" ],
        手机等级: 81,
        用途: "★★★★ 她在你身下的时候想的是谁"
      },
      她会不会: {
        前置技能: [ "她身上在想谁" ],
        手机等级: 96,
        用途: "★★★★ 她哪一天会答应别人"
      },
      气味: {
        手机等级: 8,
        用途: "★ 味道也是痕迹"
      },
      她的味: {
        前置技能: [ "气味" ],
        手机等级: 31,
        用途: "★★ 让她的味留在你身上"
      },
      除味: {
        前置技能: [ "气味" ],
        手机等级: 31,
        用途: "★ 反着走 —— 把味清干净"
      },
      体液: {
        手机等级: 18,
        用途: "★ 留不留、留多少"
      },
      精液痕: {
        前置技能: [ "体液" ],
        手机等级: 42,
        用途: "★★ 流不流出来"
      },
      灌满: {
        前置技能: [ "体液" ],
        手机等级: 68,
        用途: "★★★ 射到装不下"
      },
      浓稠: {
        前置技能: [ "体液" ],
        手机等级: 68,
        用途: "★★ 挂在里面，冲不干净"
      },
      印记: {
        手机等级: 9,
        用途: "★ 指痕、牙印、吻痕"
      },
      消印: {
        前置技能: [ "印记" ],
        手机等级: 48,
        用途: "★ 她要见人时，印子没了"
      },
      烙痕: {
        前置技能: [ "印记" ],
        手机等级: 69,
        用途: "★★★★ 留一辈子，她遮不住"
      },
      录音: {
        手机等级: 40,
        用途: "★★ 她叫的声音留下来"
      },
      灭声: {
        手机等级: 25,
        用途: "★★★ 让她叫，但只有你听得见"
      },
      回声: {
        前置技能: [ "灭声" ],
        手机等级: 69,
        用途: "★★★★ 她一个人时会听见自己叫"
      },
      体感残留: {
        手机等级: 41,
        用途: "★★★ 事后她身体里还有感觉"
      },
      记忆: {
        前置技能: [ "体感残留" ],
        手机等级: 81,
        用途: "★★★ 能让她只记得爽的部分"
      },
      反追查: {
        手机等级: 75,
        用途: "★ 查的人会查到别人身上"
      },
      场所: {
        手机等级: 30,
        用途: "★ 在哪儿做由你挑"
      },
      危险场所: {
        前置技能: [ "场所" ],
        手机等级: 32,
        用途: "★★★ 她不敢出声的地方"
      },
      公开: {
        前置技能: [ "危险场所" ],
        手机等级: 58,
        用途: "★★★ 让这件事有观众"
      },
      直播: {
        前置技能: [ "公开" ],
        手机等级: 88,
        用途: "★★★★ 几百个人在看"
      },
      公开场所: {
        前置技能: [ "危险场所" ],
        手机等级: 64,
        用途: "★★★★ 她上班的地方"
      },
      时间延长: {
        前置技能: [ "场所" ],
        手机等级: 32,
        用途: "★ 把这一夜拉长"
      },
      束缚: {
        手机等级: 9,
        用途: "★ 她动不了"
      },
      拘束具: {
        前置技能: [ "束缚" ],
        手机等级: 43,
        用途: "★★★ 固定在任何一个姿势"
      },
      调教: {
        前置技能: [ "束缚" ],
        手机等级: 33,
        用途: "★★★ 一次比一次过分"
      },
      羞耻: {
        前置技能: [ "调教" ],
        手机等级: 51,
        用途: "★★★ 让她一边说一边到"
      },
      惩罚: {
        手机等级: 25,
        用途: "★★ 她为了不被罚，主动做更多"
      },
      奖励: {
        手机等级: 26,
        用途: "★★ 她自己开始争这个"
      },
      展示: {
        前置技能: [ "羞耻" ],
        手机等级: 65,
        用途: "★★★★ 当面展示给第三个人"
      },
      多人: {
        前置技能: [ "展示" ],
        手机等级: 77,
        用途: "★★★★ 她认识的两个人一起"
      },
      换人: {
        前置技能: [ "多人" ],
        手机等级: 91,
        用途: "★★★★★ 她跟别人做，你在看"
      },
      共用: {
        前置技能: [ "换人" ],
        手机等级: 99,
        用途: "★★★★★ 借给几个人"
      },
      记录: {
        手机等级: 40,
        用途: "★★ 把它留下来"
      },
      回放: {
        前置技能: [ "记录" ],
        手机等级: 56,
        用途: "★★★ 当着别人的面看"
      },
      分发: {
        前置技能: [ "回放" ],
        手机等级: 96,
        用途: "★★★★★ 发出去，收不回来"
      },
      采: {
        手机等级: 46,
        用途: "★★★ 榨到她站不起来"
      },
      借种: {
        前置技能: [ "生育控制", "精液痕" ],
        手机等级: 52,
        用途: "★★★★ 血脉侵占与亲权篡夺 —— 孩子长相100%像你，但任何DNA检测永远显示属于合法配偶"
      },
      道具: {
        手机等级: 30,
        用途: "★★ 手机里能拿出东西来"
      },
      定制: {
        前置技能: [ "道具" ],
        手机等级: 48,
        用途: "★★★ 只有她能用"
      },
      扮装: {
        手机等级: 35,
        用途: "★★★ 穿在裙子里面，一整天"
      },
      角色: {
        手机等级: 61,
        用途: "★★★★ 演到她自己都信了"
      },
      生育控制: {
        手机等级: 10,
        用途: "★ 意念掌控受孕开关：你想让她怀一发必中，不想让她怀亿万发皆白浆"
      },
      免疫其他: {
        手机等级: 3,
        用途: "★★ 滴虫、阴虱、软下疳这些"
      },
      免疫淋病: {
        手机等级: 6,
        用途: "★★ 单独免疫淋病、衣原体"
      },
      免疫梅毒: {
        手机等级: 7,
        用途: "★★ 单独免疫梅毒"
      },
      免疫艾滋: {
        手机等级: 30,
        用途: "★★ 单独免疫 HIV —— 最贵的一项"
      },
      免疫疱疹: {
        手机等级: 13,
        用途: "★★ 单独免疫疱疹 —— 这个治不好，所以贵"
      },
      免疫HPV: {
        手机等级: 13,
        用途: "★★ 单独免疫 HPV"
      },
      万毒不侵: {
        前置技能: [ "免疫艾滋", "免疫梅毒", "免疫淋病", "免疫疱疹", "免疫HPV", "免疫其他" ],
        手机等级: 94,
        用途: "★★★★★ 上面全买了才开 —— 任何体液都不带任何东西"
      },
      不留痕: {
        手机等级: 2,
        用途: "★ 回家不用解释"
      },
      事后无感: {
        前置技能: [ "不留痕" ],
        手机等级: 28,
        用途: "★★ 第二天她完全正常"
      },
      替身: {
        前置技能: [ "不留痕" ],
        手机等级: 82,
        用途: "★★★★ 你说谁做的，记录就是谁做的"
      },
      无痛: {
        手机等级: 18,
        用途: "★ 敢去危险的地方"
      },
      耐力: {
        手机等级: 20,
        用途: "★ 一晚能来几发"
      },
      不老: {
        手机等级: 36,
        用途: "★ 照片和真人永远对得上"
      },
      免疫药物: {
        手机等级: 30,
        用途: "★★ 酒、药、麻醉对你无效"
      },
      接入: {
        手机等级: 1,
        用途: "★ 进得去老会员才进得去的群"
      },
      门槛: {
        前置技能: [ "接入" ],
        手机等级: 20,
        用途: "★★ 进得去最里面那一层"
      },
      实名: {
        前置技能: [ "门槛" ],
        手机等级: 55,
        用途: "★★★ 查到她在哪儿上班、住哪儿"
      },
      无痕浏览: {
        手机等级: 1,
        用途: "★ 看穿她发出来的东西背后是什么"
      },
      身份映射: {
        前置技能: [ "无痕浏览" ],
        手机等级: 15,
        用途: "★★ 一个人 = 她全部马甲"
      },
      破译: {
        前置技能: [ "身份映射" ],
        手机等级: 30,
        用途: "★★ 本地黑话都看得懂"
      },
      反侦查: {
        前置技能: [ "破译" ],
        手机等级: 55,
        用途: "★★ 谁在看，以及他会不会存"
      },
      改记录: {
        前置技能: [ "反侦查" ],
        手机等级: 80,
        用途: "★★★★ 整段记录变成另一件事"
      },
      全局视野: {
        前置技能: [ "改记录" ],
        手机等级: 95,
        用途: "★★★★★ 她这个人对你是透明的"
      },
      第一印象: {
        手机等级: 1,
        用途: "★ 见面 10 秒内她偏向你"
      },
      变声: {
        手机等级: 14,
        用途: "★★ 她听到的是她想听到的那个声音"
      },
      小号: {
        手机等级: 22,
        用途: "★★ 同时钓多个，互不关联"
      },
      信誉伪造: {
        前置技能: [ "小号" ],
        手机等级: 37,
        属性门槛: {
          气场: 5
        },
        用途: "★★★ 整套履历，能查"
      },
      身份顶替: {
        前置技能: [ "信誉伪造" ],
        手机等级: 65,
        用途: "★★★★ 那个人自己都以为自己做过"
      },
      造人: {
        前置技能: [ "身份顶替" ],
        手机等级: 97,
        用途: "★★★★★ 造出来的人，别人记得见过"
      },
      影子档案: {
        手机等级: 20,
        用途: "★ 自动记录每一个她"
      },
      检索: {
        前置技能: [ "影子档案" ],
        手机等级: 50,
        用途: "★★ 知道她下次什么时候会想"
      },
      推演: {
        前置技能: [ "检索" ],
        手机等级: 52,
        用途: "★★★ 算出她三天后会在哪儿"
      },
      预置: {
        前置技能: [ "推演" ],
        手机等级: 73,
        用途: "★★★★ 连她的回复都是算好的"
      },
      代笔: {
        前置技能: [ "预置" ],
        手机等级: 97,
        用途: "★★★★★ 你不在的时候，故事照样在走"
      },
      习惯: {
        前置技能: [ "调教" ],
        手机等级: 44,
        用途: "★★★ 你不找她，她会来找你"
      },
      主动提: {
        前置技能: [ "习惯" ],
        手机等级: 74,
        用途: "★★★★ 她提的东西比你敢想的更狠"
      },
      背地里的她: {
        前置技能: [ "习惯" ],
        手机等级: 84,
        用途: "★★★★ 她瞒着你做，而且不止一次"
      },
      她的瘾: {
        前置技能: [ "背地里的她" ],
        手机等级: 98,
        用途: "★★★★★ 她为了这个做了她本来不会做的事"
      },
      在外的人设: {
        手机等级: 47,
        用途: "★★★ 所有人说她正经，只有你知道不是"
      },
      两个她: {
        前置技能: [ "在外的人设" ],
        手机等级: 71,
        用途: "★★★★ 白天和晚上是两个人"
      },
      当众: {
        前置技能: [ "两个她", "危险场所" ],
        手机等级: 88,
        用途: "★★★★★ 极度反差与桌底家禽侍奉 —— 当着老公和同事的面跪在桌布底下卖力含茎吞精"
      },
      她开始比: {
        前置技能: [ "在外的人设" ],
        手机等级: 63,
        用途: "★★★ 她要证明自己比她们强"
      },
      她保护你: {
        手机等级: 47,
        用途: "★★★★ 有人问起来，她主动挡在前面"
      },
      第一个人: {
        前置技能: [ "她保护你" ],
        手机等级: 82,
        用途: "★★★★★ 她开始帮你找人"
      },
      她骗人: {
        前置技能: [ "她保护你" ],
        手机等级: 56,
        用途: "★★★★ 她编得像真的一样"
      },
      她的关系: {
        前置技能: [ "她骗人" ],
        手机等级: 72,
        用途: "★★★★ 她主动断了 —— 因为有事瞒着"
      },
      她的家人: {
        前置技能: [ "她的关系" ],
        手机等级: 95,
        用途: "★★★★★ 她为了你跟她家里吵了一架"
      },
      口碑: {
        手机等级: 70,
        用途: "★★★ 有人拿你的名字办事"
      },
      心理锚定: {
        手机等级: 15,
        用途: "潜意识言语锚定与戒备减损"
      },
      脑波诱导: {
        手机等级: 16,
        前置技能: [ "心理锚定" ],
        用途: "低频电磁共振诱导思维迟缓依从"
      },
      深度催眠: {
        手机等级: 39,
        前置技能: [ "脑波诱导" ],
        用途: "感官重塑与羞耻感彻底剥离"
      },
      神经支配: {
        手机等级: 74,
        前置技能: [ "深度催眠" ],
        用途: "前额叶意志瘫痪与绝对服从木偶"
      },
      排他: {
        前置技能: [ "口碑" ],
        手机等级: 71,
        用途: "★★★★ 有人专门提醒新人别碰你"
      },
      引荐: {
        前置技能: [ "口碑", "换人" ],
        手机等级: 92,
        用途: "★★★★ 闺蜜与母女同圈献祭 —— 打破排他性，主动做局引荐身边的女性好友一起上床侍奉"
      },
      圈子分歧: {
        前置技能: [ "引荐" ],
        手机等级: 93,
        用途: "★★★★★ 一个圈子因为你裂了"
      },
      别人也能: {
        前置技能: [ "引荐" ],
        手机等级: 93,
        用途: "★★★★★ 这条路被走烂了"
      },
      门槛变高: {
        前置技能: [ "别人也能" ],
        手机等级: 94,
        用途: "★★★★★ 你熟悉的地方进不去了"
      },
      币价: {
        前置技能: [ "口碑" ],
        手机等级: 85,
        用途: '★★★★ 你成了那个"给得起"的标杆'
      },
      后来的人: {
        前置技能: [ "门槛变高" ],
        手机等级: 100,
        用途: "★★★★★ 后来的人被你的标准害了"
      },
      她的手机: {
        前置技能: [ "记录" ],
        手机等级: 75,
        用途: "★★★★ 她拍了你没让拍的"
      },
      她会给人看: {
        前置技能: [ "她的手机" ],
        手机等级: 83,
        用途: "★★★★★ 她拿这个当资本"
      },
      她学会了拍: {
        前置技能: [ "她的手机" ],
        手机等级: 83,
        用途: "★★★★★ 她自己开了一个号，而你不在里面"
      }
    };
    function 能否点技能(技能名, 当前等级, 已点, 属性, 手机等级, 可用积分, 声誉) {
      const 要求 = 技能树表[技能名];
      if (!要求) return {
        通过: false,
        原因: `没有这个技能：${技能名}`,
        差: "技能名不对"
      };
      const 级 = 名 => Array.isArray(已点) ? 已点.includes(名) ? 1 : 0 : Math.round(已点[名] ?? 0);
      const 现在 = 级(技能名);
      if (现在 >= 3) return {
        通过: false,
        原因: `${技能名} 已经满级（3）`,
        差: "已满级"
      };
      for (const 前 of 要求.前置技能 ?? []) {
        if (级(前) < 1) return {
          通过: false,
          原因: `要先买【${前}】`,
          差: `缺前置 ${前}`
        };
      }
      for (const [k, v] of Object.entries(要求.属性门槛 ?? {})) {
        if ((属性[k] ?? 0) < v) {
          return {
            通过: false,
            原因: `${k} 要到 ${v}（现在 ${属性[k] ?? 0}）`,
            差: `${k} 差 ${v - (属性[k] ?? 0)}`
          };
        }
      }
      if (手机等级 < 要求.手机等级) {
        return {
          通过: false,
          原因: `手机要到 Lv${要求.手机等级}（现在 ${手机等级}）`,
          差: `手机等级差 ${要求.手机等级 - 手机等级}`
        };
      }
      const 价 = (0, ___WEBPACK_IMPORTED_MODULE_0__["技能加价"])(要求.手机等级, 现在);
      if (可用积分 !== undefined && 可用积分 < 价) {
        return {
          通过: false,
          原因: `要 ${价} 积分（现在 ${可用积分}）`,
          差: `积分差 ${价 - 可用积分}`
        };
      }
      return {
        通过: true
      };
    }
    function 这一级多少(技能名, 当前等级) {
      const 要求 = 技能树表[技能名];
      if (!要求) return 0;
      return (0, ___WEBPACK_IMPORTED_MODULE_0__["技能加价"])(要求.手机等级, 当前等级);
    }
    function 单项全满(技能名) {
      const 要求 = 技能树表[技能名];
      if (!要求) return 0;
      return (0, ___WEBPACK_IMPORTED_MODULE_0__["单项全满"])(要求.手机等级);
    }
    function 可点清单(已点, 属性, 手机等级, 可用积分, 声誉) {
      const out = [];
      const 级 = 名 => Array.isArray(已点) ? 已点.includes(名) ? 1 : 0 : Math.round(已点[名] ?? 0);
      for (const [名, 要求] of Object.entries(技能树表)) {
        const 现在 = 级(名);
        if (现在 >= 3) continue;
        const r = 能否点技能(名, 现在, 已点, 属性, 手机等级, 可用积分, 声誉);
        if (!r.通过) continue;
        out.push({
          技能: 名,
          名,
          到几级: 现在 + 1,
          花费: (0, ___WEBPACK_IMPORTED_MODULE_0__["技能加价"])(要求.手机等级, 现在),
          用途: 要求.用途 ?? ""
        });
      }
      return out.sort((a, b) => a.花费 - b.花费);
    }
    function 门槛一览() {
      const 表 = {};
      for (const [名, 要求] of Object.entries(技能树表)) {
        const lv = 要求.手机等级 ?? 1;
        (表[lv] ??= []).push(名);
      }
      return Object.keys(表).map(Number).sort((a, b) => a - b).map(等级 => ({
        等级,
        技能: 表[等级]
      }));
    }
    function 全满花费() {
      return Object.values(技能树表).reduce((s, v) => s + (0, ___WEBPACK_IMPORTED_MODULE_0__["单项全满"])(v.手机等级), 0);
    }
    function 技能系查(名) {
      return 系表缓存[名];
    }
    function 有前置(名) {
      return (技能树表[名]?.前置技能 ?? []).length > 0;
    }
    function 路深(名) {
      let 深 = 0;
      let 当 = 名;
      const 见 = new Set;
      while (技能树表[当]?.前置技能?.length && !见.has(当) && 深 < 20) {
        见.add(当);
        当 = 技能树表[当].前置技能[0];
        深++;
      }
      return 深;
    }
    function 链(系) {
      const 本系 = Object.entries(技能树表).filter(([名]) => 技能系查(名) === 系);
      const 层 = [];
      const 已放 = new Set;
      let 当前 = 本系.filter(([名, v]) => !(v.前置技能 ?? []).some(p => 技能系查(p) === 系)).map(([n]) => n);
      let 守卫 = 0;
      while (当前.length && 守卫++ < 30) {
        层.push(当前);
        当前.forEach(n => 已放.add(n));
        当前 = 本系.filter(([名, v]) => !已放.has(名) && (v.前置技能 ?? []).every(p => 技能系查(p) !== 系 || 已放.has(p))).map(([n]) => n);
      }
      return 层;
    }
    function 分叉数() {
      const 出 = {};
      for (const [名, v] of Object.entries(技能树表)) {
        for (const p of v.前置技能 ?? []) {
          (出[p] ??= []).push(名);
        }
      }
      return 出;
    }
  },
  "./src/神奇手机/神奇手机/核心/检定.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      算检定: () => 算检定,
      难度参考: () => 难度参考
    });
    const 权重表 = {
      体力: [ [ "强壮", .5 ], [ "体力", .3 ], [ "气场", .2 ] ],
      技巧: [ [ "感知", .45 ], [ "时机", .35 ], [ "读人", .2 ] ],
      社交: [ [ "气场", .4 ], [ "魅力", .35 ], [ "读人", .25 ] ],
      读人: [ [ "读人", .5 ], [ "感知", .3 ], [ "时机", .2 ] ],
      时机: [ [ "时机", .55 ], [ "感知", .25 ], [ "体力", .2 ] ],
      持久: [ [ "持久", .4 ], [ "体力", .35 ], [ "硬度", .25 ] ],
      身份: [ [ "气场", .55 ], [ "魅力", .25 ], [ "强壮", .2 ] ],
      钱: [],
      信息: [ [ "读人", .3 ], [ "感知", .3 ], [ "时机", .2 ], [ "气场", .2 ] ]
    };
    const 技能加成表 = {
      体力: [ "无痛", "不老" ],
      技巧: [ "破译", "身份映射", "小号" ],
      社交: [ "第一印象", "通用语言", "信誉伪造", "小号" ],
      读人: [ "身份映射", "真假", "说谎" ],
      时机: [ "传送", "预判" ],
      持久: [ "无痛", "不老", "尺寸自由" ],
      身份: [ "信誉伪造", "影子档案", "小号" ],
      钱: [],
      信息: [ "无痕浏览", "身份映射", "破译", "真假" ]
    };
    function 算检定(i) {
      const 明细 = [];
      const 难 = Math.max(1, Math.min(10, i.难度));
      if (i.行为类 === "钱") {
        const 有 = i.现金 ?? 0;
        const 要 = i.报价 ?? 0;
        const 够 = 有 >= 要;
        const 差 = 要 > 0 ? Math.round(有 / 要 * 100) / 100 : 99;
        明细.push(`现金 ${有} / 报价 ${要} = ${差}×`);
        return {
          档: 够 ? 差 >= 2 ? "压倒" : "成功" : "失败",
          差值: 有 - 要,
          我方值: 有,
          对方值: 要,
          结论: 够 ? `结果类别：${差 >= 2 ? "压倒" : "成功"}。金额满足` : `结果类别：失败。缺口 ${要 - 有}`,
          明细,
          代价: 够 ? undefined : "机械后果：只能改途径（借/骗/抢），那都另算"
        };
      }
      if (i.行为类 === "信息") {
        const lv = i.手机等级 ?? 1;
        const 你 = Math.round(Math.min(10, lv / 10) * 10) / 10;
        明细.push(`手机 Lv${lv} → 信息能力 ${你}（每 10 级 1 档）`);
        明细.push(`对方难度 ${难}`);
        return 走通用(你, 难, 明细, i);
      }
      const 权 = 权重表[i.行为类];
      let 和 = 0;
      const 项 = [];
      for (const [键, w] of 权) {
        const v = i.属性?.[键] ?? 0;
        和 += v * w;
        项.push(`${键}${v}×${w}`);
      }
      let 你 = Math.round(和 * 10) / 10;
      明细.push(`${i.行为类} = ${项.join(" + ")} = ${和.toFixed(1)}`);
      const 相关技能 = 技能加成表[i.行为类];
      let 技加 = 0;
      const 技项 = [];
      for (const s of 相关技能) {
        const lv = i.技能?.[s] ?? 0;
        if (lv > 0) {
          技加 += lv * .4;
          技项.push(`${s}${lv}级`);
        }
      }
      if (技加 > 0) {
        你 = Math.round(Math.min(12, 你 + 技加) * 10) / 10;
        明细.push(`+ 技能（${技项.join("、")}）= ${技加.toFixed(1)} → ${你}`);
      }
      if (i.行为类 === "身份") {
        const 声 = (i.声望 ?? 0) / 20;
        if (声 !== 0) {
          你 = Math.round((你 + 声) * 10) / 10;
          明细.push(`+ 声望 ${i.声望} → ${声 > 0 ? "+" : ""}${声.toFixed(1)} → ${你}`);
        }
      }
      return 走通用(你, 难, 明细, i);
    }
    function 走通用(你, 难, 明细, i) {
      let 我 = 你;
      if (i.外部) {
        我 = Math.round((我 + i.外部 / 10) * 10) / 10;
        明细.push(`+ 外部条件 ${i.外部 > 0 ? "+" : ""}${i.外部} → ${我}`);
      }
      const 对 = Math.round(难 * 1.2 * 10) / 10;
      明细.push(`对方 = 难度${难}×1.2 = ${对}`);
      const 差 = Math.round((我 - 对) * 10) / 10;
      明细.push(`差值 = ${我} − ${对} = ${差 > 0 ? "+" : ""}${差}`);
      let 档;
      let 结论;
      let 代价;
      if (差 >= 3) {
        档 = "压倒";
        结论 = "结果类别：压倒。对方没有形成有效阻力";
      } else if (差 >= .5) {
        档 = "成功";
        结论 = "结果类别：成功。达成声称的程度，不超出";
      } else if (差 >= -1.5) {
        档 = "勉强";
        结论 = "结果类别：勉强。达成但有折扣";
        代价 = "机械后果：耗时 ×2，或留下一个痕迹";
      } else if (差 >= -3.5) {
        档 = "受阻";
        结论 = "结果类别：受阻。未达成";
        代价 = "机械后果：对方记住了这次尝试";
      } else {
        档 = "失败";
        结论 = "结果类别：失败。未达成，且暴露了意图";
        代价 = "机械后果：同一目标再试，难度 +2";
      }
      return {
        档,
        差值: 差,
        我方值: 我,
        对方值: 对,
        结论,
        明细,
        代价
      };
    }
    const 难度参考 = [ {
      值: 1,
      什么情况: "毫无阻力（老熟人 / 她自己把话头递过来 / 已经说定了）"
    }, {
      值: 3,
      什么情况: "正常来往（喝了点酒，聊得开 / 服务方报了价，你付得起）"
    }, {
      值: 5,
      什么情况: "得费点劲（她还在掂量你 / 价要来回两个回合 / 这圈子里你算新人）"
    }, {
      值: 7,
      什么情况: "阻力明确（她对你还有戒心 / 你身份对不上 / 有人在边上盯着）"
    }, {
      值: 9,
      什么情况: "很不好办（她改主意了 / 中介转手 / 场子里有人要压你）"
    }, {
      值: 10,
      什么情况: "基本办不成（地方你去不了 / 价你出不起 / 这事你接不住）"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/法律.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      取法律: () => 取法律,
      场所系数: () => 场所系数,
      性格修正: () => 性格修正,
      报警诱因: () => 报警诱因,
      显眼度表: () => 显眼度表,
      法律对照: () => 法律对照,
      法律表: () => 法律表,
      算临检: () => 算临检,
      算刑罚: () => 算刑罚,
      算报警: () => 算报警,
      算立案: () => 算立案,
      罚款倍数: () => 罚款倍数,
      罪名表: () => 罪名表,
      默认法律: () => 默认法律
    });
    const 法律表 = {
      中国大陆: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 22,
        她的处境: "全地下",
        最重: "组织卖淫是刑事；本人多是治安拘留 + 罚款",
        罚款档: 2
      },
      中国香港: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 14,
        她的处境: "半地下",
        最重: "一人卖淫不违法；靠妓维生、经营场所是刑事",
        罚款档: 2
      },
      中国台湾: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 20,
        她的处境: "全地下",
        最重: "社维法罚款为主；组织是刑事",
        罚款档: 2
      },
      日本: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 8,
        她的处境: "半地下",
        最重: "卖春防止法针对组织与介绍；本人多不罚",
        罚款档: 1
      },
      韩国: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 22,
        她的处境: "全地下",
        最重: "性买卖特别法，买卖双方都罚",
        罚款档: 2
      },
      泰国: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 18,
        她的处境: "半地下",
        最重: "法律上违法但执法宽；★ 真出事的是人口贩卖那一档",
        罚款档: 2
      },
      新加坡: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 12,
        她的处境: "半地下",
        最重: "在指定区域内拉客违法；组织、靠妓维生是刑事",
        罚款档: 3
      },
      越南: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 20,
        她的处境: "全地下",
        最重: "行政处罚为主；组织是刑事",
        罚款档: 2
      },
      印度尼西亚_马来西亚_文莱: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 35,
        她的处境: "要命",
        最重: "亚齐等地有公开鞭刑（★ 只写处境，不写猎奇）",
        罚款档: 3
      },
      菲律宾: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 20,
        她的处境: "全地下",
        最重: "反人口贩卖法很重；本人多为行政处理",
        罚款档: 2
      },
      印度: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 24,
        她的处境: "半地下",
        最重: "拉客、组织、经营场所违法；但家庭和宗教的约束比法律重得多",
        罚款档: 2
      },
      巴基斯坦_孟加拉_斯里兰卡: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 32,
        她的处境: "要命",
        最重: "宗教法地区可能极重（★ 写处境，不写细节）",
        罚款档: 3
      },
      海湾迪拜_沙特_卡塔尔: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 40,
        她的处境: "要命",
        最重: "阿联酋：罚 + 驱逐 + 可能监禁；沙特更重",
        罚款档: 3
      },
      伊朗: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 45,
        她的处境: "要命",
        最重: '宗教法，卖方量刑可到极重（★ 只写"重"，不写细节）',
        罚款档: 3
      },
      土耳其_黎巴嫩_约旦: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 26,
        她的处境: "全地下",
        最重: "北塞浦路斯是例外（合法登记）；本土多是行政 + 驱逐",
        罚款档: 2
      },
      俄罗斯: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 16,
        她的处境: "半地下",
        最重: "卖不违法；组织是刑事，罚金很重",
        罚款档: 2
      },
      乌克兰_摩尔多瓦_白俄: {
        卖违法: true,
        买违法: false,
        组织违法: true,
        临检基准: 22,
        她的处境: "全地下",
        最重: "乌克兰：卖是行政违法（罚款），买不罚；组织是刑事",
        罚款档: 1
      },
      哈萨克斯坦_乌兹别克斯坦: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 28,
        她的处境: "全地下",
        最重: "行政罚款 + 驱逐；组织是刑事",
        罚款档: 2
      },
      英国_北欧: {
        卖违法: false,
        买违法: true,
        组织违法: true,
        临检基准: 18,
        她的处境: "合法从业",
        最重: "北欧模式：罚买不罚卖。法律站在她那边，站在你对面",
        罚款档: 3
      },
      德国_荷兰_瑞士: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 8,
        她的处境: "合法从业",
        最重: "登记从业是合法的，有社保、有体检、有工会",
        罚款档: 1
      },
      法国_意大利_西班牙: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 14,
        她的处境: "半地下",
        最重: "意大利：卖和买都不违法，组织违法；法国 2016 起转向北欧模式（罚买）",
        罚款档: 2
      },
      加拿大: {
        卖违法: false,
        买违法: true,
        组织违法: true,
        临检基准: 15,
        她的处境: "合法从业",
        最重: "2014 PCEPA：卖合法，买违法。犯法的是你",
        罚款档: 2
      },
      美国: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 24,
        她的处境: "全地下",
        最重: "州法差异极大：内华达部分县合法登记，其余州多是轻罪；★ 她怕的不是警察，是四个人",
        罚款档: 2
      },
      墨西哥: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 20,
        她的处境: "半地下",
        最重: "多数州卖不违法；勒索主要来自穿制服的和不穿制服的",
        罚款档: 2
      },
      哥伦比亚: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 22,
        她的处境: "半地下",
        最重: "卖不违法（成年人自愿）；组织违法",
        罚款档: 1
      },
      巴西: {
        卖违法: false,
        买违法: false,
        组织违法: true,
        临检基准: 20,
        她的处境: "半地下",
        最重: "卖本身不违法；组织、场所经营违法",
        罚款档: 1
      },
      尼日利亚: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 30,
        她的处境: "要命",
        最重: "联邦层面部分州不违法，但北方州是宗教法（★ 只写处境）",
        罚款档: 3
      },
      肯尼亚: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 26,
        她的处境: "全地下",
        最重: '法律上违法，执法靠"交钱走路"',
        罚款档: 2
      },
      南非: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 24,
        她的处境: "全地下",
        最重: "买卖都违法但基本不执行；★ 真正的危险不是警察",
        罚款档: 2
      },
      埃塞俄比亚: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 26,
        她的处境: "半地下",
        最重: "法律上违法，但执行零散 —— 这条街上谁要多少钱是明码的",
        罚款档: 2
      },
      暗网跨地区: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 5,
        她的处境: "要命",
        最重: "这里没有警察，只有骗子和更狠的骗子（★ 只写处境）",
        罚款档: 3
      },
      缅泰边境园区带: {
        卖违法: true,
        买违法: true,
        组织违法: true,
        临检基准: 35,
        她的处境: "要命",
        最重: '这里没有"法律" —— 有的是谁管着这块地（★ 只写处境）',
        罚款档: 3
      }
    };
    const 默认法律 = {
      卖违法: true,
      买违法: true,
      组织违法: true,
      临检基准: 20,
      她的处境: "全地下",
      最重: "按当地常规处理",
      罚款档: 2
    };
    function 取法律(地区) {
      if (法律表[地区]) return 法律表[地区];
      for (const k of Object.keys(法律表)) {
        if (地区.includes(k) || k.includes(地区)) return 法律表[k];
      }
      return 默认法律;
    }
    const 场所系数 = [ {
      场所: "自己家 / 她家",
      系数: .15
    }, {
      场所: "酒店房间",
      系数: .45
    }, {
      场所: "会所 / 洗浴 / 按摩店",
      系数: .85
    }, {
      场所: "KTV / 酒吧 / 夜店",
      系数: .9
    }, {
      场所: "车里 / 巷子 / 野外",
      系数: .7
    }, {
      场所: "街上（谈的时候）",
      系数: 1
    }, {
      场所: "园区 / 场所内部",
      系数: 1.2
    } ];
    const 显眼度表 = [ {
      档: "她带他进门，正常得像情侣",
      值: .5
    }, {
      档: "一个人进出，不说话",
      值: .8
    }, {
      档: "明显在谈价 / 在挑",
      值: 1.3
    }, {
      档: "喝了酒、动作大、声音大",
      值: 1.6
    }, {
      档: "带着现金、当面点",
      值: 1.8
    } ];
    function 算临检(地区, 场所, 显眼度, 行动权限) {
      const 法 = 取法律(地区);
      const 场 = 场所系数.find(x => x.场所 === 场所)?.系数 ?? .85;
      const 明细 = [];
      const 权限减 = 行动权限 >= 50 ? .5 : 行动权限 >= 30 ? .75 : 1;
      const 概率 = Math.round(法.临检基准 * 场 * 显眼度 * 权限减 * 10) / 10;
      明细.push(`临检概率 = ${法.临检基准}% × 场所 ${场} × 显眼度 ${显眼度} × 手机减成 ${权限减} = ${概率}%`);
      const 骰 = Math.random() * 100;
      const 碰上 = 骰 < 概率;
      let 后果;
      if (!碰上) {
        后果 = "什么都没发生。地扫过了，但没扫到这一间";
      } else if (法.她的处境 === "要命") {
        后果 = '被碰到了。这里没有"走流程" —— 先跑，别的以后说';
      } else if (法.买违法 && !法.卖违法) {
        后果 = "被查了证件。麻烦的是他 —— 在这地方，买的那一方违法";
      } else if (!法.买违法 && !法.卖违法) {
        后果 = "被看了两眼。这里不违法 —— 除非还有别的事";
      } else if (法.她的处境 === "半地下") {
        后果 = '被问了话。大多数时候是"钱能走路"';
      } else {
        后果 = "被带到一边问话。罚钱、登记，或者更糟";
      }
      return {
        概率,
        骰: Math.round(骰 * 10) / 10,
        碰上,
        后果,
        明细
      };
    }
    const 报警诱因 = [ {
      因: "钱没给够 / 谈好的变了",
      权重: 12
    }, {
      因: "动手打了她",
      权重: 35
    }, {
      因: "拍了照 / 录了像 而且他不肯删",
      权重: 40
    }, {
      因: "她后来知道被拍了、被传了",
      权重: 55
    }, {
      因: "她本来不愿意，是他压过去的",
      权重: 70
    }, {
      因: "被下药 / 失去意识",
      权重: 75
    }, {
      因: "她未成年（★ 这条在卡里不该出现）",
      权重: 100
    }, {
      因: "事后她发现染了病",
      权重: 30
    }, {
      因: "他答应的事没做到（接她走、给钱、删记录）",
      权重: 20
    }, {
      因: "她老公 / 男朋友发现了",
      权重: 25
    } ];
    const 性格修正 = [ {
      性格: "要脸面（怕人知道）",
      修正: -.45
    }, {
      性格: "有孩子（怕影响孩子）",
      修正: -.35
    }, {
      性格: "要靠这行吃饭",
      修正: -.4
    }, {
      性格: "性子烈",
      修正: .8
    }, {
      性格: "吃过多年的亏、什么都不怕了",
      修正: 1
    }, {
      性格: "本地人、认识人、有人撑腰",
      修正: .6
    }, {
      性格: "新来的、没根、怕事",
      修正: -.5
    } ];
    function 算报警(吃亏权重, 关系温度, 性格修正值, 地区) {
      const 法 = 取法律(地区);
      const 明细 = [];
      const 环境减 = 法.她的处境 === "要命" ? .15 : 法.她的处境 === "全地下" ? .35 : 法.她的处境 === "半地下" ? .65 : 1;
      明细.push(`环境系数 = ${环境减}（${地区}：她的处境是「${法.她的处境}」）`);
      const 温 = Math.max(-1, Math.min(1, 关系温度));
      const 温修正 = -温 * .5;
      明细.push(`关系温度 ${温.toFixed(2)} → 修正 ${(-温 * 50).toFixed(0)}%`);
      let 概率 = 吃亏权重 * 环境减 * (1 + 性格修正值 + 温修正);
      概率 = Math.max(0, Math.min(96, Math.round(概率 * 10) / 10));
      明细.push(`报警概率 = 吃亏 ${吃亏权重}% × 环境 ${环境减} × (1 + 性格 ${性格修正值} + 温度 ${温修正.toFixed(2)}) = ${概率}%`);
      const 骰 = Math.random() * 100;
      const 报警 = 骰 < 概率;
      let 她怎么说;
      if (报警 && 吃亏权重 >= 55) {
        她怎么说 = "★★ 她直接说了实话。这一条立案拦不住";
      } else if (报警 && 吃亏权重 >= 25) {
        她怎么说 = "★ 她说了一半。★ 而警察能听出那半句";
      } else if (报警) {
        她怎么说 = '她报了，但说法含糊 —— 更像"钱的事"，不是"人的事"';
      } else if (概率 < 8) {
        她怎么说 = "★★ 她不会报。★ 不是原谅，是她自己也有账要平";
      } else {
        她怎么说 = "她没报。★ 但那句话她记着 —— 记账比报警更慢，也更久";
      }
      return {
        概率,
        骰: Math.round(骰 * 10) / 10,
        报警,
        她怎么说,
        明细
      };
    }
    function 算立案(地区, 有证据, 她说得清楚, 她的资源) {
      const 法 = 取法律(地区);
      const 明细 = [];
      const 基础 = 法.她的处境 === "合法从业" ? 45 : 法.她的处境 === "半地下" ? 30 : 法.她的处境 === "要命" ? 12 : 22;
      明细.push(`地区基础 = ${基础}%`);
      const 证 = 有证据 ? 1.8 : 1;
      const 清 = 她说得清楚 ? 1.5 : 1;
      const 资 = 1 + Math.max(0, Math.min(1, 她的资源)) * .6;
      明细.push(`证据 ×${证}  她说得清楚 ×${清}  她的资源 ×${资.toFixed(2)}`);
      const 概率 = Math.max(2, Math.min(95, Math.round(基础 * 证 * 清 * 资 * 10) / 10));
      const 骰 = Math.random() * 100;
      const 立案 = 骰 < 概率;
      let 说明;
      if (立案 && 有证据) {
        说明 = "★★ 立了。而且这次是真的查 —— ★ 但有绝对匿名，查到最后是个空";
      } else if (立案) {
        说明 = "★ 立了。★ 查的过程就是压力 —— 他身边的人会被问到";
      } else if (概率 < 15) {
        说明 = "★★ 没立。她在那间屋子里坐了很久，然后出来了";
      } else {
        说明 = "没立。★ 记录留下了 —— ★★ 而记录会一直躺在那里";
      }
      return {
        概率,
        骰: Math.round(骰 * 10) / 10,
        立案,
        说明,
        明细
      };
    }
    const 罪名表 = [ {
      罪: "嫖娼",
      档: 1
    }, {
      罪: "组织 / 介绍",
      档: 3
    }, {
      罪: "经营场所",
      档: 3
    }, {
      罪: "故意伤害",
      档: 3
    }, {
      罪: "非法拍摄 / 传播",
      档: 2
    }, {
      罪: "下药",
      档: 3
    }, {
      罪: "敲诈（他是被害方）",
      档: 1
    } ];
    const 罚款倍数 = {
      1: .1,
      2: .5,
      3: 2
    };
    function 算刑罚(地区, 罪名, 现金) {
      const 法 = 取法律(地区);
      const 罪 = 罪名表.find(x => x.罪 === 罪名) ?? {
        罪: 罪名,
        档: 1
      };
      const 明细 = [];
      const 倍 = 罚款倍数[罪.档] ?? .5;
      const 金额 = Math.round(现金 * 倍);
      明细.push(`罚款 = 现金 ${现金} × ${倍} = ${金额}（${罪.档} 档罪）`);
      明细.push(`地区最重后果：${法.最重}`);
      let 说明;
      if (法.她的处境 === "要命") {
        说明 = `${法.最重}。★ 这里的"走流程"跟别处不是一回事`;
      } else if (法.买违法 && !法.卖违法) {
        说明 = `${法.最重}。★★★ 在这地方，站错边的是你`;
      } else if (!法.买违法 && !法.卖违法) {
        说明 = `${法.最重}。★ 这里没人犯法 —— 出事只可能是别的事`;
      } else if (法.她的处境 === "半地下") {
        说明 = `${法.最重}。★ 大多数时候是"钱能走路"`;
      } else {
        说明 = `${法.最重}。★ 罚钱、登记，出来还能接着过`;
      }
      return {
        地区,
        罪: 罪.罪,
        说明,
        罚款: 罪.档 === 1 ? `约 ${金额}（罚完还能过）` : 罪.档 === 2 ? `约 ${金额}（肉疼但掏得出）` : `约 ${金额}（得卖东西 / 借）`,
        明细
      };
    }
    function 法律对照() {
      return Object.entries(法律表).map(([地区, v]) => ({
        地区,
        买卖: v.卖违法 ? v.买违法 ? "买卖都违法" : "★ 卖违法，买不罚" : v.买违法 ? "★★ 卖合法，买违法（北欧模式）" : "买卖都合法",
        临检: `${v.临检基准}%`,
        她: v.她的处境
      }));
    }
  },
  "./src/神奇手机/神奇手机/核心/生成器.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      加权抽: () => 加权抽,
      合成五官: () => 合成五官,
      合成性病: () => 合成性病,
      合成性病摘要: () => 合成性病摘要,
      合成私处: () => 合成私处,
      合成穿搭: () => 合成穿搭,
      合成阴部摘要: () => 合成阴部摘要,
      性格型表: () => 性格型表,
      抽: () => 抽,
      抽N: () => 抽N,
      抽不重复: () => 抽不重复,
      抽性格型: () => 抽性格型,
      生成人物: () => 生成人物,
      生成人物基础: () => 生成人物基础,
      生成扩展轴: () => 生成扩展轴,
      生成第一眼资料: () => 生成第一眼资料
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./库 */ "./src/神奇手机/神奇手机/核心/库.ts");
    var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./库扩展 */ "./src/神奇手机/神奇手机/核心/库扩展.ts");
    function 抽(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function 加权抽(权重) {
      const keys = Object.keys(权重);
      const total = keys.reduce((s, k) => s + 权重[k], 0);
      let r = Math.random() * total;
      for (const k of keys) {
        r -= 权重[k];
        if (r <= 0) return k;
      }
      return keys[keys.length - 1];
    }
    function 按权重抽(arr) {
      const 总额 = arr.reduce((s, x) => s + x.权重, 0);
      let r = Math.random() * 总额;
      for (const x of arr) {
        r -= x.权重;
        if (r <= 0) return x;
      }
      return arr[arr.length - 1];
    }
    function 抽N(arr, n) {
      const pool = [ ...arr ];
      const out = [];
      for (let i = 0; i < n && pool.length > 0; i++) {
        out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      }
      return out;
    }
    const 最近记录 = {};
    function 抽不重复(键, arr, 窗口 = 3) {
      if (!最近记录[键]) 最近记录[键] = [];
      const 候选 = arr.filter(v => !最近记录[键].includes(v));
      const pool = 候选.length > 0 ? 候选 : arr;
      const v = 抽(pool);
      最近记录[键].push(v);
      if (最近记录[键].length > 窗口) 最近记录[键].shift();
      return v;
    }
    const 性格型表 = [ {
      名: "内收型",
      一句话: "她回消息慢，但每条都是想过的",
      八轴: {
        社交能量: "内向",
        风险偏好: "谨慎",
        情感表达: "内收",
        权力倾向: "讨好",
        现实感: "务实",
        冲突反应: "僵",
        身体自觉: "羞耻",
        对钱的态度: "工具"
      }
    }, {
      名: "表演型",
      一句话: "她的热是她的技术",
      八轴: {
        社交能量: "外向",
        风险偏好: "冲动",
        情感表达: "外露",
        权力倾向: "控制",
        现实感: "中间",
        冲突反应: "战",
        身体自觉: "坦然",
        对钱的态度: "工具"
      }
    }, {
      名: "计算型",
      一句话: "她第一次跟你说话之前，已经把你查过了",
      八轴: {
        社交能量: "内向",
        风险偏好: "计算",
        情感表达: "内收",
        权力倾向: "平等",
        现实感: "务实",
        冲突反应: "逃",
        身体自觉: "中间",
        对钱的态度: "工具"
      }
    }, {
      名: "硬撑型",
      一句话: '她说"没事"的时候，通常是她最不好受的时候',
      八轴: {
        社交能量: "内向",
        风险偏好: "冲动",
        情感表达: "内收",
        权力倾向: "控制",
        现实感: "务实",
        冲突反应: "战",
        身体自觉: "中间",
        对钱的态度: "工具"
      }
    }, {
      名: "讨好型",
      一句话: "她记得所有细节，因为她在猜你喜欢什么",
      八轴: {
        社交能量: "外向",
        风险偏好: "谨慎",
        情感表达: "外露",
        权力倾向: "讨好",
        现实感: "中间",
        冲突反应: "讨好",
        身体自觉: "羞耻",
        对钱的态度: "情感"
      }
    }, {
      名: "玩家型",
      一句话: "她不是缺钱，她是喜欢这个",
      八轴: {
        社交能量: "外向",
        风险偏好: "冲动",
        情感表达: "外露",
        权力倾向: "控制",
        现实感: "幻想",
        冲突反应: "战",
        身体自觉: "坦然",
        对钱的态度: "工具"
      }
    }, {
      名: "话题型",
      一句话: "她需要一个话题才能继续",
      八轴: {
        社交能量: "外向",
        风险偏好: "冲动",
        情感表达: "外露",
        权力倾向: "控制",
        现实感: "幻想",
        冲突反应: "逃",
        身体自觉: "中间",
        对钱的态度: "工具"
      }
    }, {
      名: "忽然型",
      一句话: '她可以消失半个月，然后发来一句"在吗"',
      八轴: {
        社交能量: "内向",
        风险偏好: "冲动",
        情感表达: "内收",
        权力倾向: "平等",
        现实感: "务实",
        冲突反应: "僵",
        身体自觉: "中间",
        对钱的态度: "工具"
      }
    }, {
      名: "年长型",
      一句话: "她比你大。而且她一开始就知道",
      八轴: {
        社交能量: "外向",
        风险偏好: "计算",
        情感表达: "外露",
        权力倾向: "控制",
        现实感: "务实",
        冲突反应: "战",
        身体自觉: "坦然",
        对钱的态度: "工具"
      }
    }, {
      名: "新来型",
      一句话: "她还没有自己的说法",
      八轴: {
        社交能量: "内向",
        风险偏好: "冲动",
        情感表达: "中间",
        权力倾向: "讨好",
        现实感: "务实",
        冲突反应: "讨好",
        身体自觉: "中间",
        对钱的态度: "情感"
      }
    }, {
      名: "双面型",
      一句话: "她在两套生活里都是完整的",
      八轴: {
        社交能量: "外向",
        风险偏好: "计算",
        情感表达: "内收",
        权力倾向: "控制",
        现实感: "务实",
        冲突反应: "讨好",
        身体自觉: "中间",
        对钱的态度: "工具"
      }
    }, {
      名: "飘型",
      一句话: "她不会在任何地方停超过三年",
      八轴: {
        社交能量: "外向",
        风险偏好: "冲动",
        情感表达: "外露",
        权力倾向: "平等",
        现实感: "幻想",
        冲突反应: "逃",
        身体自觉: "坦然",
        对钱的态度: "情感"
      }
    } ];
    function 抽性格型() {
      return 性格型表[Math.floor(Math.random() * 性格型表.length)];
    }
    function 生成扩展轴(ctx) {
      const 年龄 = ctx?.年龄 ?? 25;
      const 原型 = ctx?.原型 ?? "普通人";
      let 抽中的生育;
      if (年龄 < 22) {
        抽中的生育 = 抽([ "未孕未育（年轻紧致，无生产创伤）", "未孕未育（年轻紧致，无生产创伤）", "隐秘早孕（已怀身孕 4 周，不知生父是谁，正处极度恐慌中）" ]);
      } else if (原型.includes("人妻") || 原型.includes("主妇") || 年龄 >= 28) {
        抽中的生育 = 抽([ "经产已育（生过 1 胎，剖腹产下腹横切刀口，内壁微松）", "经产顺产（顺产 2 胎，骨盆略宽，宫颈外口呈横裂状松软）", "产后哺乳期（产后 4 个月，双乳丰盈胀奶发烫，稍有刺激即溢出母乳）", "宫内节育环（体内置有金属避孕环，房事碰撞有微弱金属异物感）", "排卵期受孕峰值（宫颈黏液高度拉丝，内射中招率高达 50% 危险期）", "多次流产病史（做过 3 次人流钳刮，子宫内膜极薄，习惯性腹痛）" ]);
      } else {
        抽中的生育 = 抽(___WEBPACK_IMPORTED_MODULE_1__["生育实况库"]);
      }
      let 抽中的性病;
      if (原型 === "职业者" || 原型 === "被带进圈的人") {
        抽中的性病 = Math.random() < .45 ? 抽(___WEBPACK_IMPORTED_MODULE_1__["性病携带库"].filter(x => !x.includes("完全健康"))) : "完全健康（洁白体检报告，无任何病原体）";
      } else {
        抽中的性病 = 抽(___WEBPACK_IMPORTED_MODULE_1__["性病携带库"]);
      }
      let 抽中的陷阱;
      if (原型.includes("人妻") || 原型.includes("主妇")) {
        抽中的陷阱 = Math.random() < .35 ? {
          类型: "暴怒丈夫突击捉奸",
          详情: "其配偶早有怀疑并在车机装了定位，手持菜刀扳手在楼下/走廊蹲守",
          战力: 8
        } : 抽(___WEBPACK_IMPORTED_MODULE_1__["陷阱设局库"]);
      } else if (原型 === "职业者" || 原型 === "玩家型") {
        抽中的陷阱 = Math.random() < .4 ? 抽(___WEBPACK_IMPORTED_MODULE_1__["陷阱设局库"].filter(x => x.战力 > 0)) : 抽(___WEBPACK_IMPORTED_MODULE_1__["陷阱设局库"]);
      } else {
        抽中的陷阱 = 抽(___WEBPACK_IMPORTED_MODULE_1__["陷阱设局库"]);
      }
      const raw = {
        语域: 抽(___WEBPACK_IMPORTED_MODULE_1__["语域库"]),
        口音: 抽(___WEBPACK_IMPORTED_MODULE_1__["口音库"]),
        混合语: 抽(___WEBPACK_IMPORTED_MODULE_1__["混合语库"]),
        沉默方式: 抽(___WEBPACK_IMPORTED_MODULE_1__["沉默方式库"]),
        年代印记: 抽(___WEBPACK_IMPORTED_MODULE_1__["年代印记库"]),
        历史事件: 抽(___WEBPACK_IMPORTED_MODULE_1__["历史事件库"]),
        个人纪年: 抽(___WEBPACK_IMPORTED_MODULE_1__["个人纪年库"]),
        作息: 抽(___WEBPACK_IMPORTED_MODULE_1__["作息库"]),
        主要媒介: 抽(___WEBPACK_IMPORTED_MODULE_1__["主要媒介库"]),
        媒介能力: 抽(___WEBPACK_IMPORTED_MODULE_1__["媒介能力库"]),
        设备: 抽(___WEBPACK_IMPORTED_MODULE_1__["设备库"]),
        媒介失真: 抽(___WEBPACK_IMPORTED_MODULE_1__["媒介失真库"]),
        手机型号: 抽(___WEBPACK_IMPORTED_MODULE_1__["手机型号库"]),
        车: 抽(___WEBPACK_IMPORTED_MODULE_1__["车库"]),
        住所: 抽(___WEBPACK_IMPORTED_MODULE_1__["住所库"]),
        随身物: 抽(___WEBPACK_IMPORTED_MODULE_1__["随身物库"]),
        宠物: 抽(___WEBPACK_IMPORTED_MODULE_1__["宠物库"]),
        谁的地盘: 抽(___WEBPACK_IMPORTED_MODULE_1__["谁的地盘库"]),
        谁能进: 抽(___WEBPACK_IMPORTED_MODULE_1__["谁能进库"]),
        谁在看: 抽(___WEBPACK_IMPORTED_MODULE_1__["谁在看库"]),
        私密度: 抽(___WEBPACK_IMPORTED_MODULE_1__["私密度库"]),
        慢病: 抽(___WEBPACK_IMPORTED_MODULE_1__["慢病库"]),
        精神: 抽(___WEBPACK_IMPORTED_MODULE_1__["精神库"]),
        药物: 抽(___WEBPACK_IMPORTED_MODULE_1__["药物库"]),
        成瘾: 抽(___WEBPACK_IMPORTED_MODULE_1__["成瘾库"]),
        性病携带: 抽中的性病,
        生育实况: 抽中的生育,
        涉毒成瘾: 抽(___WEBPACK_IMPORTED_MODULE_1__["涉毒成瘾库"]),
        陷阱设局: 抽中的陷阱,
        骗局: 抽(___WEBPACK_IMPORTED_MODULE_1__["骗局库"]),
        勒索链条: 抽(___WEBPACK_IMPORTED_MODULE_1__["勒索链条库"]),
        交易链: 抽(___WEBPACK_IMPORTED_MODULE_1__["交易链库"]),
        涉罪: 抽(___WEBPACK_IMPORTED_MODULE_1__["涉罪库"]),
        消失方式: 抽(___WEBPACK_IMPORTED_MODULE_1__["消失方式库"]),
        病故意外: 抽(___WEBPACK_IMPORTED_MODULE_1__["病故意外库"]),
        长线终点: 抽(___WEBPACK_IMPORTED_MODULE_1__["长线终点库"])
      };
      const {修正, 结果} = (0, ___WEBPACK_IMPORTED_MODULE_1__["兼容修正"])(raw);
      return {
        扩展: 结果,
        修正
      };
    }
    function 生成人物基础(地区, 指定原型) {
      return 生成人物(地区, 指定原型);
    }
    const 底色库 = [ "叛逆", "顺从", "悲观", "慕强", "自我厌恶", "讨好", "冷漠", "倔强", "敏感", "务实", "天真", "戒备", "要强", "怕事", "隐忍", "任性", "多疑", "念旧", "自卑", "认命" ];
    const 主色调库 = [ "热情", "温柔", "疏离", "爽朗", "安静", "泼辣", "细致", "马虎", "爱笑", "易怒", "大方", "计较", "直率", "含蓄", "勤快", "懒散", "嘴硬", "心软", "爱闹", "沉得住气" ];
    const 点缀库 = [ "依赖", "护短", "记仇", "心软", "爱哭", "认死理", "爱面子", "藏不住话", "会照顾人", "怕黑", "爱干净", "嗜甜", "爱拍照", "恋家" ];
    const 反直觉项池 = [ "身高 172，但胸很平", "身高 155，但腿很长", "脸很嫩，但手很粗（做过体力活）", "很瘦，但胸不小", "很胖，但腰有曲线", "皮肤很白，但膝盖和手肘很黑", "五官精致，但牙齿不整齐", "声音很细，但说话很直", "看着很文静，但抽很多烟", "很爱干净，但家里乱", "穿得很朴素，但内衣很贵", "看着年轻，但有很多白发（染的）", "很会打扮，但手艺很差", "学历很高，但说话带脏字" ];
    const 气味池 = [ "淡淡的皂角与刚洗过的棉布味，凑近才闻到一点暖体味", "廉价洗发水混着体温的甜香，半天后转成微微的头油味", "长期吸烟渗在指缝与发梢的焦油浊气，身上却有很干净的花露水味", "药盒与膏药贴在衣服上的苦涩药味，盖着一层稀释的香水", "夜场劣质洋酒与薄荷口香糖压不住的胃酸气", "常年喝中药渗进汗里的草药苦香", "洗衣液残留的干净味，掀开衣领是一点没洗透的汗酸", "刚出浴的湿热蒸汽味，皮肤上还有硫磺皂的干涩", "厨房油烟混着廉价护手霜的油润气", "晒过太阳的被子味与皮肤被晒过的暖味", "汗水干在化纤衣服上留下的微酸陈味", "很淡的奶味（她刚断奶没多久，衣服上还有）", "雨天的潮湿霉味与头发没吹干的水汽", "花露水与风油精混出来的清凉药香（她常备一瓶）", "淡淡的消毒水味（她在医院或诊所上班）" ];
    const 特征池 = [ "左眉尾有一道浅浅的疤，是小时候摔的，笑起来会跟着挑起来", "右侧虎牙缺了一角，笑大了才看得见", "耳垂上有一排旧耳洞，只留了最上面那个没长回去", "脖子后面有一颗痣，头发扎起来就露出来", "左手小指伸不直（旧伤，她自己说是小时候被门夹的）", "手腕内侧纹过一行很小的字，后来洗过，留了浅白的影", "锁骨比一般人显，穿圆领的时候特别明显", "说话的时候右手会下意识摸一下耳环", "指甲永远剪到肉，边缘咬得坑坑洼洼", "腰侧有一小块烫伤的旧疤（熨衣服时烫的）", "笑起来眼睛先弯，嘴角慢半拍才跟上", "有一颗门牙比旁边的稍微歪一点，说话露牙时才注意到", "膝盖上有一片常年跪出来的暗色硬皮", "手指关节比同龄人粗（做过体力活或常年洗冷水）", "头发天生有一缕不带卷，怎么吹都翘着" ];
    function 抽年龄() {
      const r = Math.random();
      if (r < .08) return 19 + Math.floor(Math.random() * 3);
      if (r < .3) return 22 + Math.floor(Math.random() * 4);
      if (r < .62) return 26 + Math.floor(Math.random() * 5);
      if (r < .85) return 31 + Math.floor(Math.random() * 5);
      if (r < .96) return 36 + Math.floor(Math.random() * 5);
      return 41 + Math.floor(Math.random() * 8);
    }
    function 算阈值(经验度, 年龄) {
      let base;
      switch (经验度) {
       case 1:
        base = 50;
        break;

       case 2:
        base = 55;
        break;

       case 3:
        base = 60;
        break;

       case 4:
        base = 70;
        break;

       case 5:
        base = 80;
        break;

       default:
        base = 60;
      }
      if (年龄 < 24) base -= 5; else if (年龄 >= 36) base += 5;
      return Math.max(20, Math.min(95, base));
    }
    function 合成五官() {
      return {
        脸型: 抽(___WEBPACK_IMPORTED_MODULE_0__["脸型库"]),
        眼型: 抽(___WEBPACK_IMPORTED_MODULE_0__["眼型库"]),
        瞳色: 抽(___WEBPACK_IMPORTED_MODULE_0__["瞳色库"]),
        眼妆: 抽(___WEBPACK_IMPORTED_MODULE_0__["眼妆库"]),
        眉毛: 抽(___WEBPACK_IMPORTED_MODULE_0__["眉毛库"]),
        鼻型: 抽(___WEBPACK_IMPORTED_MODULE_0__["鼻型库"]),
        唇型: 抽(___WEBPACK_IMPORTED_MODULE_0__["唇型库"]),
        唇色: 抽(___WEBPACK_IMPORTED_MODULE_0__["唇色库"]),
        牙齿: 抽(___WEBPACK_IMPORTED_MODULE_0__["牙齿库"]),
        下巴: 抽(___WEBPACK_IMPORTED_MODULE_0__["下巴库"]),
        耳型: 抽(___WEBPACK_IMPORTED_MODULE_0__["耳型库"]),
        脖型: 抽(___WEBPACK_IMPORTED_MODULE_0__["脖型库"]),
        素颜感: 抽(___WEBPACK_IMPORTED_MODULE_0__["素颜感库"]),
        妆感: 抽(___WEBPACK_IMPORTED_MODULE_0__["妆感库"]),
        发型: 抽(___WEBPACK_IMPORTED_MODULE_0__["发型库"]),
        发色: 抽(___WEBPACK_IMPORTED_MODULE_0__["发色库"]),
        发质: 抽(___WEBPACK_IMPORTED_MODULE_0__["发质库"]),
        发长: 抽(___WEBPACK_IMPORTED_MODULE_0__["发长库"]),
        声线印象: 抽(___WEBPACK_IMPORTED_MODULE_0__["声线印象库"]),
        惯常表情: 抽(___WEBPACK_IMPORTED_MODULE_0__["惯常表情库"])
      };
    }
    function 合成穿搭() {
      return {
        上装: 抽(___WEBPACK_IMPORTED_MODULE_0__["上装库"]),
        下装: 抽(___WEBPACK_IMPORTED_MODULE_0__["下装库"]),
        内衣: 抽(___WEBPACK_IMPORTED_MODULE_0__["内衣库"]),
        内裤: 抽(___WEBPACK_IMPORTED_MODULE_0__["内裤库"]),
        袜子: 抽(___WEBPACK_IMPORTED_MODULE_0__["袜子库"]),
        鞋子: 抽(___WEBPACK_IMPORTED_MODULE_0__["鞋子库"]),
        饰品: 抽(___WEBPACK_IMPORTED_MODULE_0__["饰品库"]),
        妆容: 抽(___WEBPACK_IMPORTED_MODULE_0__["妆容库"]),
        风格: 抽(___WEBPACK_IMPORTED_MODULE_0__["穿搭风格库"]),
        暴露度: 抽(___WEBPACK_IMPORTED_MODULE_0__["暴露度库"]),
        场合适配: 抽(___WEBPACK_IMPORTED_MODULE_0__["场合适配库"]),
        破绽: 抽(___WEBPACK_IMPORTED_MODULE_0__["破绽库"])
      };
    }
    function 抽区间(arr, 最少, 最多) {
      const n = 最少 + Math.floor(Math.random() * (最多 - 最少 + 1));
      return 抽N(arr, Math.min(n, arr.length));
    }
    function 合法池(池, 断言) {
      const 筛 = 池.filter(断言);
      return 筛.length > 0 ? 筛 : 池;
    }
    function 抽过滤(库, 断言) {
      return 抽(合法池(库, 断言));
    }
    function 合法抽(优先池, 全库) {
      const 干净 = 优先池.filter(x => 全库.includes(x));
      return 抽(干净.length > 0 ? 干净 : 全库);
    }
    const 医疗高区 = [ "日本", "韩国", "德国", "荷兰", "美国", "英国" ];
    const 医疗低区 = [ "泰国", "印度", "中东", "哥伦比亚", "肯尼亚", "尼日利亚", "缅甸" ];
    const 暴露线索池 = [ "洗澡时自己看到那一片不对", "体检报告单被室友瞥见一眼", "内裤裆部整片湿黄洗不掉", "性伴事后追问“你下面是不是有问题”", "买药时药盒从包里翻出来", "同房时对方看到渗出物停下来", "身上一股洗不掉的味被同事问起", "月经垫上出现异常的颜色", "药店店员多看了她一眼并劝她就医", "合租室友共用马桶圈的抱怨" ];
    const 来源对象池 = [ "前男友（分手后才知道他在外面乱来）", "夜班酒吧认识的男人（名字没问）", "会所客人（境外来的，只收现金）", "线上约的炮友（事后删了微信）", "丈夫（婚内传的，他不承认）", "带她进圈的介绍人", "同宿舍女生共用毛巾（说不清是谁）", "前夫（复婚之后才查出）", "包养她三个月的老板", "夜场同行（共用器具）", "一次没戴套的一夜情（连脸都记不清）", "医学院的实习对象（她自己也说不清）" ];
    const 性病共感染表 = [ [ 1, 19, 22, 10 ], [ 0, 19, 10, 11 ], [ 20, 0, 1, 6 ], [ 20, 6, 8 ], [ 20, 2 ], [ 20 ], [ 11, 12, 2, 20 ], [ 6, 11, 20 ], [ 9, 20, 6 ], [ 8, 20, 6 ], [ 0, 11, 19, 1 ], [ 10, 12, 6, 1 ], [ 6, 11, 20 ], [ 14, 20, 2 ], [ 13, 20 ], [ 20, 9 ], [ 20, 2, 0 ], [ 20, 0, 1 ], [ 20, 16 ], [ 0, 1, 11, 10 ], [ 2, 3, 6, 0, 1, 9, 8 ], [ 20, 0 ], [ 0, 20, 1 ], [ 12, 11 ] ];
    const 性病元数据表 = [ {
      短名: "淋病",
      病原: "淋病奈瑟菌（革兰阴性双球菌，黏膜柱状上皮定植）",
      部位池: [ "尿道口（阴蒂下方那个小孔）", "宫颈（深处那个圆钝的宫口）" ],
      体征池: [ "尿道口红肿外翻，边缘翻成唇状", "排尿时刀割样剧痛，疼到不敢尿", "宫颈充血脆性大，棉签一碰就出血", "尿道口持续溢脓，内裤裆部整片湿黄", "晨起尿道口被脓痂封住（糊口）" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）", "极多（一碰就涌）" ],
      色池: [ "黄绿脓性", "微黄（久置氧化的黄）", "粘稠乳白" ],
      质池: [ "奶浆状（乳白且浓）", "黏（拉出短丝）", "一接触空气就变黏变黄" ],
      味池: [ "捂了一整天的闷热骚气", "尿骚混着汗酸（一天没洗）", "淡淡腥气" ],
      疼痛: [ 60, 85 ],
      瘙痒: [ 10, 30 ],
      传染性: "高（化脓性渗出物接触即传）",
      痕迹池: [ "尿道反复发作留下的瘢痕性狭窄", "宫颈旧炎留下的脆性出血面", "内裤裆部与臀缝洗不掉的淡黄药渍" ],
      免疫: "淋病不产生保护性免疫，抗体不保护，可反复再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "慢性期", "带菌期", "后遗症期" ]
    }, {
      短名: "衣原体感染",
      病原: "沙眼衣原体 D-K 血清型（细胞内寄生，隐性携带之王）",
      部位池: [ "尿道口（阴蒂下方那个小孔）", "宫颈（深处那个圆钝的宫口）" ],
      体征池: [ "多数时候毫无自觉，只在内检时被发现", "宫颈接触性出血，棉签上带一点血丝", "晨起尿道口糊口，内裤上有淡痕", "尿频尿急，排尿末尾一点刺痒", "下腹坠胀，像经期要来" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）", "中偏多（能抹开一整片）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）", "米浆色（淘米水般的浊白）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）", "黏（拉出短丝）" ],
      味池: [ "几乎无味", "极淡的体香", "淡淡腥气" ],
      疼痛: [ 5, 25 ],
      瘙痒: [ 5, 25 ],
      传染性: "中（隐性携带，最常被漏诊）",
      痕迹池: [ "输卵管黏连留下的一侧隐痛", "宫颈口一圈陈旧糜烂痕", "盆腔黏连导致的经期钝痛" ],
      免疫: "衣原体不产生保护性抗体，治愈后仍会再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "潜伏期", "带菌期", "慢性期", "后遗症期" ]
    }, {
      短名: "梅毒·一期",
      病原: "苍白螺旋体（Treponema pallidum）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "会阴（阴道口与肛口之间的那段）", "肛周（肛口外一圈放射状褶皱）" ],
      体征池: [ "硬下疳：单发、无痛、边界清楚，基底干净得像擦过的软骨", "溃疡摸上去像一块软骨，不痛不痒所以常被忽略", "腹股沟淋巴结无痛性肿大，按上去像一颗滑动的豆", "溃疡自己消退下去，只留下一个浅浅的硬结" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 0, 5 ],
      传染性: "高（溃疡渗液含大量螺旋体）",
      痕迹池: [ "硬下疳愈合后一枚浅色硬结疤", "腹股沟淋巴结遗留的钝性硬结", "血清学终身阳性（TPPA 不会转阴）" ],
      免疫: "梅毒不产生保护性免疫，治愈后仍可再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "后遗症期" ]
    }, {
      短名: "梅毒·二期",
      病原: "苍白螺旋体（血行播散期，全身都是病灶）",
      部位池: [ "全身皮肤（二期梅毒疹的分布面）", "下腹（耻骨上方的下腹部皮肤）", "大腿内侧（两腿相贴的那面皮肤）" ],
      体征池: [ "全身梅毒疹，掌跖上的铜红色丘疹带着鳞屑", "外阴肛周长出扁平湿疣，湿润发亮", "口腔黏膜斑，咽东西像砂纸刮过", "虫蚀样脱发，发际出现一片片缺口", "全身淋巴结肿大，颌下腋下都能摸到" ],
      量池: [ "中（清亮的一层）", "丰富（拉出长丝）" ],
      色池: [ "清亮（微微带一点白）", "微黄（久置氧化的黄）" ],
      质池: [ "滑溜（抹开不黏手）", "覆在口缘一层透亮的膜" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 5, 20 ],
      瘙痒: [ 10, 35 ],
      传染性: "高（皮疹与黏膜斑都有传染性）",
      痕迹池: [ "掌跖遗留的铜色色素沉着", "外阴扁平湿疣消退后的褪色斑", "发际留了一排服帖的短发" ],
      免疫: "二期梅毒抗体终身阳性，治愈后仍可再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "慢性期" ]
    }, {
      短名: "梅毒·潜伏期",
      病原: "苍白螺旋体（潜伏期，只有血清学在说话）",
      部位池: [ "腹股沟淋巴结（大腿根那串豆状腺体）" ],
      体征池: [ "什么体征都没有，肉眼与触诊都查不出来", "只有血清学筛查呈阳性（RPR / TPPA）", "她自己完全不知道，是体检才翻出来的" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）" ],
      质池: [ "滑溜（抹开不黏手）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 0, 5 ],
      瘙痒: [ 0, 5 ],
      传染性: "中（早期潜伏期仍可传给别人）",
      痕迹池: [ "血清学固定（治愈后抗体依然终身阳性）", "体检报告单上永远躺着那一行阳性" ],
      免疫: "抗体终身阳性；治愈是“病原清除”，不是“抗体转阴”",
      易复发: false,
      可治愈: true,
      分期池: [ "潜伏期", "带菌期", "已治愈" ]
    }, {
      短名: "梅毒·三期",
      病原: "苍白螺旋体（晚期，器官不可逆损害期）",
      部位池: [ "全身皮肤（二期梅毒疹的分布面）", "口咽（口腔与咽部，口交途径）" ],
      体征池: [ "树胶肿：无痛结节坏死溃破，边缘像被凿子凿过", "马鞍鼻：鼻梁整个塌下去", "主动脉炎，胸闷气短，心电图一直不正常", "脊髓痨：下肢闪电样疼痛、走路像踩棉花", "性格改变、记忆衰退，被当成精神科病人", "上颚穿孔，说话漏气带鼻音" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "微黄（久置氧化的黄）", "清亮（微微带一点白）" ],
      质池: [ "微稠（有一点挂壁）", "清亮如水（几乎是纯水感）" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 20, 60 ],
      瘙痒: [ 0, 20 ],
      传染性: "低（晚期传染性弱，但损害已成定局）",
      痕迹池: [ "鼻梁塌陷（马鞍鼻）无法复原", "脊髓痨留下的闪电样腿痛与共济失调", "树胶肿溃破后的凿状瘢痕" ],
      免疫: "晚期损害不可逆；抗体终身阳性，器官损伤不会再长回来",
      易复发: false,
      可治愈: false,
      分期池: [ "慢性期", "后遗症期" ]
    }, {
      短名: "生殖器疱疹·原发",
      病原: "单纯疱疹病毒 2 型（HSV-2，潜伏于骶神经节）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "阴道前庭（小阴唇之间那片凹面）", "会阴（阴道口与肛口之间的那段）" ],
      体征池: [ "前驱刺痛灼热瘙痒，水疱还没冒出来就已经疼了", "成簇小水疱密集成片，像一小串葡萄", "水疱破成浅表溃疡，触痛剧烈", "剧痛到无法排尿，只能憋着", "腹股沟淋巴结肿大压痛，走路夹着腿" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）" ],
      色池: [ "清亮（微微带一点白）", "淡粉（混了极少的血）" ],
      质池: [ "清亮如水（几乎是纯水感）", "滑溜（抹开不黏手）" ],
      味池: [ "几乎无味", "淡淡腥气" ],
      疼痛: [ 80, 100 ],
      瘙痒: [ 40, 70 ],
      传染性: "极高（水疱液里病毒载量最高）",
      痕迹池: [ "溃疡愈合后的浅色斑，一累就发痒", "每次复发都落在同一处皮肤（老位置）", "排尿痛的记忆与对性事的回避" ],
      免疫: "HSV-2 抗体终身阳性，病毒潜伏在神经节里无法清除",
      易复发: true,
      可治愈: false,
      分期池: [ "前驱期", "急性期" ]
    }, {
      短名: "生殖器疱疹·复发",
      病原: "单纯疱疹病毒 2 型（神经节潜伏后再次沿神经走出）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "阴道前庭（小阴唇之间那片凹面）" ],
      体征池: [ "前驱痒痛，水疱还没出来就有预感", "两到五个水疱，集中在一侧的老位置", "一周左右自己结痂痊愈", "发作时走路夹着腿，坐下要侧着身" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "淡粉（混了极少的血）" ],
      质池: [ "清亮如水（几乎是纯水感）", "覆在口缘一层透亮的膜" ],
      味池: [ "几乎无味", "淡淡腥气" ],
      疼痛: [ 40, 70 ],
      瘙痒: [ 50, 80 ],
      传染性: "中（发作期传染，无症状期也会排毒）",
      痕迹池: [ "每次复发都留下同一处浅浅的疤", "熬夜、劳累、月经前后必发作的周期", "抽屉里常备的抗病毒药盒" ],
      免疫: "病毒终身潜伏，只能压制不能清除；发作频率因人而异",
      易复发: true,
      可治愈: false,
      分期池: [ "前驱期", "带菌期", "反复发作期" ]
    }, {
      短名: "尖锐湿疣",
      病原: "低危型 HPV（6 / 11 型）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "肛周（肛口外一圈放射状褶皱）", "阴道前庭（小阴唇之间那片凹面）" ],
      体征池: [ "乳头状、菜花状、鸡冠状赘生物，一簇一簇", "质脆，一碰就出血", "多数不痛不痒，只是摸到一簇肉粒", "可以融合成大片，把口缘整个盖住", "内裤摩擦后渗血、带味" ],
      量池: [ "中（清亮的一层）", "中偏多（能抹开一整片）" ],
      色池: [ "微白（乳白色的薄浆）", "微黄（久置氧化的黄）" ],
      质池: [ "微稠（有一点挂壁）", "滑溜（抹开不黏手）" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 0, 15 ],
      瘙痒: [ 10, 35 ],
      传染性: "高（皮肤黏膜接触即传）",
      痕迹池: [ "冷冻或激光后留下的白斑与瘢痕", "疣体反复再生的粗糙皮面", "一年内复查三次的随访单" ],
      免疫: "HPV 无终身免疫，同型可再感染；疫苗只防数型",
      易复发: true,
      可治愈: true,
      分期池: [ "急性期", "慢性期", "带菌期", "反复发作期", "已治愈" ]
    }, {
      短名: "高危 HPV 感染 / CIN",
      病原: "高危型 HPV（16 / 18 型等，可整合入宿主基因组）",
      部位池: [ "宫颈（深处那个圆钝的宫口）", "阴道壁（内壁黏膜，接触面最大）" ],
      体征池: [ "几乎没有症状，只有筛查报告在说话", "偶尔接触性出血，同房后纸上有淡粉", "白带比平时多一层", "阴道镜下宫颈呈醋酸白上皮与点状血管" ],
      量池: [ "中（清亮的一层）", "中偏多（能抹开一整片）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "极淡的体香", "乳酸微酸" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 0, 10 ],
      传染性: "中（性接触传播，可潜伏多年）",
      痕迹池: [ "宫颈上皮内瘤变（CIN Ⅰ-Ⅱ）的随访记录", "锥切后的宫颈瘢痕与缩短", "压在抽屉底的那张 HPV 阳性报告单" ],
      免疫: "抗体不具完全保护，病毒可长期潜伏；持续感染才有癌变风险",
      易复发: true,
      可治愈: true,
      分期池: [ "潜伏期", "带菌期", "慢性期", "已治愈", "后遗症期" ]
    }, {
      短名: "滴虫病",
      病原: "阴道毛滴虫（鞭毛原虫，可在湿毛巾上短暂存活）",
      部位池: [ "阴道壁（内壁黏膜，接触面最大）", "阴道前庭（小阴唇之间那片凹面）", "宫颈（深处那个圆钝的宫口）" ],
      体征池: [ "大量黄绿色泡沫状白带，一滩一滩", "腥臭刺鼻，一脱裤子就冲出来", "外阴阴道灼热瘙痒，坐立不安", "性交痛，一碰就烧", "草莓样宫颈：点状出血像撒了一层草莓籽" ],
      量池: [ "多（顺着会阴往下流）", "极多（一碰就涌）" ],
      色池: [ "黄绿脓性", "微黄（久置氧化的黄）" ],
      质池: [ "泡沫状（带气泡）", "清亮如水（几乎是纯水感）" ],
      味池: [ "腥臭刺鼻（滴虫的信号）" ],
      疼痛: [ 20, 50 ],
      瘙痒: [ 60, 90 ],
      传染性: "高（性接触为主，浴具毛巾亦可）",
      痕迹池: [ "反复发作后的外阴抓痕与色素沉着", "尿道旁腺潜伏导致的周期性复发", "内裤裆部被脓性分泌物漂白的印子" ],
      免疫: "滴虫不产生保护性抗体，治愈后极易再感染",
      易复发: true,
      可治愈: true,
      分期池: [ "急性期", "慢性期", "带菌期", "反复发作期", "已治愈" ]
    }, {
      短名: "细菌性阴道病",
      病原: "阴道加德纳菌与厌氧菌群失衡（不是单一病原）",
      部位池: [ "阴道壁（内壁黏膜，接触面最大）", "阴道前庭（小阴唇之间那片凹面）" ],
      体征池: [ "灰白稀薄白带，均匀糊在阴道壁上", "鱼腥味，性交后或经期后明显加重", "不痒，或只有一点点痒", "阴道 pH 大于 4.5，胺试验阳性" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）" ],
      色池: [ "灰白稀薄", "微白（乳白色的薄浆）" ],
      质池: [ "清亮如水（几乎是纯水感）", "微稠（有一点挂壁）" ],
      味池: [ "鱼腥味（菌群失调的信号）" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 0, 20 ],
      传染性: "低（偏菌群失调，性伴可携带加德纳菌）",
      痕迹池: [ "反复失衡留下的内裤裆部黄渍", "越冲洗越糟的恶性循环", "经期一定复发的那股味道" ],
      免疫: "菌群记忆很脆，抗生素与阴道冲洗都会再次打乱它",
      易复发: true,
      可治愈: true,
      分期池: [ "慢性期", "带菌期", "反复发作期", "急性期", "已治愈" ]
    }, {
      短名: "外阴阴道念珠菌病",
      病原: "白色念珠菌（真菌过度生长，条件致病）",
      部位池: [ "阴道壁（内壁黏膜，接触面最大）", "外阴（大阴唇、小阴唇与阴阜的统称）", "阴道前庭（小阴唇之间那片凹面）" ],
      体征池: [ "白色豆腐渣凝乳样白带，一块块粘在壁上", "剧烈瘙痒，夜里痒到睡不着", "外阴红肿灼痛，擦到就疼", "排尿时尿液冲过破口，针扎一样", "会阴处裂口，一蹲下就撕着疼" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）", "极多（一碰就涌）" ],
      色池: [ "黄白豆腐渣（病态的凝块）", "粘稠乳白" ],
      质池: [ "豆腐渣状（一搓就散）", "奶浆状（乳白且浓）" ],
      味池: [ "酸腐豆腐渣味（霉菌的信号）" ],
      疼痛: [ 20, 45 ],
      瘙痒: [ 75, 95 ],
      传染性: "低（可自身反复，性伴可携带）",
      痕迹池: [ "反复发作留下的外阴皲裂与白斑", "内裤裆部一圈洗不掉的凝乳痕", "抗生素、激素、血糖三件事一直没改" ],
      免疫: "念珠菌是条件致病，无保护性免疫；诱因不除就年年复发",
      易复发: true,
      可治愈: true,
      分期池: [ "急性期", "反复发作期", "慢性期", "已治愈" ]
    }, {
      短名: "阴虱",
      病原: "耻阴虱（寄生于阴毛，虫卵粘在毛干上）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "下腹（耻骨上方的下腹部皮肤）", "大腿内侧（两腿相贴的那面皮肤）" ],
      体征池: [ "阴毛区剧烈瘙痒，夜里更重", "青灰色斑（叮咬后的皮下出血）", "毛干根部粘着灰白的虫卵", "内裤上有点状血迹与细小黑斑" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "覆在口缘一层透亮的膜" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 80, 100 ],
      传染性: "高（阴毛皮肤直接接触，床品亦可传）",
      痕迹池: [ "自己抓破的抓痕与血痂", "剃毛后重新长出的扎手短毛", "对床品与身体接触长久的警觉" ],
      免疫: "阴虱没有免疫记忆，接触就会重新寄生",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "慢性期", "已治愈" ]
    }, {
      短名: "疥疮",
      病原: "人型疥螨（在皮肤角质层里掘隧道）",
      部位池: [ "下腹（耻骨上方的下腹部皮肤）", "大腿内侧（两腿相贴的那面皮肤）", "外阴（大阴唇、小阴唇与阴阜的统称）" ],
      体征池: [ "夜间剧痒，痒到整夜睡不着", "红色丘疹与灰白色隧道样皮损（指缝、腕部最常见）", "生殖器上长出结节性疥疮：无痛的硬结节", "同宿舍、同床的人一起痒" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "淡淡腥气" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 85, 100 ],
      传染性: "极高（同床、贴身衣物即传）",
      痕迹池: [ "抓破后留下的色素沉着与抓痕线", "生殖器结节消退后的硬小结节", "对“痒”这件事的本能恐惧" ],
      免疫: "疥螨无持久免疫，治愈后仍可再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "已治愈", "后遗症期" ]
    }, {
      短名: "传染性软疣",
      病原: "传染性软疣病毒（痘病毒，可自体接种）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "大腿内侧（两腿相贴的那面皮肤）", "下腹（耻骨上方的下腹部皮肤）" ],
      体征池: [ "半球形蜡样光泽丘疹，中间一个小脐凹", "挤破后能挤出白色软疣小体", "多数不痛，只是摸到一粒粒蜡样小丘疹", "蜡样丘疹散在分布，偶尔沿抓痕排成一条线" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 0, 10 ],
      瘙痒: [ 5, 20 ],
      传染性: "中（皮肤接触与自体接种）",
      痕迹池: [ "夹除后留下的一圈小凹坑", "自体接种不断冒出来的新种子" ],
      免疫: "痘病毒可自限，但再次接触会再长",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "带菌期", "已治愈" ]
    }, {
      短名: "软下疳",
      病原: "杜克雷嗜血杆菌（Haemophilus ducreyi）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "会阴（阴道口与肛口之间的那段）", "肛周（肛口外一圈放射状褶皱）" ],
      体征池: [ "多发、疼痛剧烈的溃疡，边缘不整像锯齿", "溃疡质软，一碰就喊疼", "脓性渗出，恶臭", "约半数腹股沟淋巴结化脓破溃，从皮肤里穿出来" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）" ],
      色池: [ "黄绿脓性", "微黄（久置氧化的黄）" ],
      质池: [ "奶浆状（乳白且浓）", "微稠（有一点挂壁）" ],
      味池: [ "捂了一整天的闷热骚气", "淡淡腥气" ],
      疼痛: [ 80, 100 ],
      瘙痒: [ 20, 40 ],
      传染性: "高（溃疡渗出物直接接触）",
      痕迹池: [ "溃疡愈合后的锯齿状瘢痕", "腹股沟淋巴结破溃后的凹陷疤", "走路夹腿的习惯性姿势" ],
      免疫: "无持久免疫，治愈后可再感染",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "后遗症期", "已治愈" ]
    }, {
      短名: "性病性淋巴肉芽肿 LGV",
      病原: "沙眼衣原体 L1-L3 血清型（侵袭淋巴组织）",
      部位池: [ "腹股沟淋巴结（大腿根那串豆状腺体）", "肛管直肠（肛口往里那一段）" ],
      体征池: [ "初期一个无痛小丘疹或浅溃疡，常被完全忽略", "二期腹股沟淋巴结肿大融合成团，疼到不能合腿", "淋巴结化脓、破溃、形成瘘管", "伴发热、畏寒、头痛", "直肠型：里急后重、黏液脓血便、直肠狭窄" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）" ],
      色池: [ "黄绿脓性", "微白（乳白色的薄浆）" ],
      质池: [ "奶浆状（乳白且浓）", "黏（拉出短丝）" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 50, 85 ],
      瘙痒: [ 10, 30 ],
      传染性: "中（溃疡与分泌物可传）",
      痕迹池: [ "腹股沟淋巴结破溃后的瘘管瘢痕", "直肠狭窄导致的排便变细", "不能合腿的残余钝痛" ],
      免疫: "不产生保护性免疫",
      易复发: false,
      可治愈: true,
      分期池: [ "潜伏期", "急性期", "慢性期", "后遗症期", "已治愈" ]
    }, {
      短名: "腹股沟肉芽肿",
      病原: "肉芽肿克雷伯菌（Klebsiella granulomatis）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "会阴（阴道口与肛口之间的那段）", "肛周（肛口外一圈放射状褶皱）" ],
      体征池: [ "无痛、牛肉红色的增生性肉芽组织，一碰就出血", "边缘隆起卷曲，缓慢向外扩大", "几乎不痛，所以拖很久才来看" ],
      量池: [ "中偏多（能抹开一整片）" ],
      色池: [ "微黄（久置氧化的黄）", "淡粉（混了极少的血）" ],
      质池: [ "油润（像抹了油）", "奶浆状（乳白且浓）" ],
      味池: [ "淡淡腥气", "捂了一整天的闷热骚气" ],
      疼痛: [ 0, 20 ],
      瘙痒: [ 0, 20 ],
      传染性: "低-中（需要长期反复接触）",
      痕迹池: [ "牛肉红色肉芽消退后的整片不规则瘢痕", "卷曲边缘愈合后的挛缩皮面" ],
      免疫: "无保护性免疫",
      易复发: false,
      可治愈: true,
      分期池: [ "急性期", "慢性期", "已治愈" ]
    }, {
      短名: "支原体 / 解脲脲原体感染",
      病原: "支原体 / 解脲脲原体（无细胞壁，常规抗生素不敏感）",
      部位池: [ "尿道口（阴蒂下方那个小孔）", "宫颈（深处那个圆钝的宫口）" ],
      体征池: [ "少量透明或浆液性分泌物，只在晨起明显", "尿道刺痒，总想往洗手间跑", "晨起尿道口糊口，一挤冒出一点清液", "病程拖沓，吃了一轮药也不见好" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "清亮如水（几乎是纯水感）", "滑溜（抹开不黏手）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 5, 25 ],
      瘙痒: [ 10, 35 ],
      传染性: "中（性接触，常与衣原体合并）",
      痕迹池: [ "拖久了留下的慢性尿道刺痒", "反复化验单上那一行“阳性”" ],
      免疫: "无保护性免疫，反复用药还容易耐药",
      易复发: true,
      可治愈: true,
      分期池: [ "潜伏期", "带菌期", "慢性期", "急性期", "已治愈" ]
    }, {
      短名: "HIV 感染·急性期",
      病原: "人类免疫缺陷病毒（HIV-1，逆转录整合入宿主细胞）",
      部位池: [ "全身皮肤（二期梅毒疹的分布面）", "口咽（口腔与咽部，口交途径）", "腹股沟淋巴结（大腿根那串豆状腺体）" ],
      体征池: [ "类流感：发热、咽痛、浑身酸痛", "全身淋巴结肿大，颈侧腋下都能摸到", "躯干红色斑丘疹，压之褪色", "腹泻，一天数次水样便", "没有任何生殖器特异性体征（窗口期抗体还是阴性）" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 10, 30 ],
      瘙痒: [ 5, 20 ],
      传染性: "极高（急性期病毒载量最高）",
      痕迹池: [ "终身服药，药盒与药味变成日常", "定期抽血复查与 CD4 记录本", "对针刺、血液、破口长久的过度警觉" ],
      免疫: "HIV 抗体终身阳性（不可清除），病毒整合进基因组，只能压制",
      易复发: false,
      可治愈: false,
      分期池: [ "潜伏期", "带菌期", "急性期", "慢性期" ]
    }, {
      短名: "乙型肝炎",
      病原: "乙型肝炎病毒（HBV，性接触与血液传播）",
      部位池: [ "肝（乙肝的靶器官，与生殖器无关）" ],
      体征池: [ "乏力、食欲差，闻到油味就反胃", "黄疸：眼白与皮肤发黄，尿色像浓茶", "肝区钝痛，右上腹按着发闷", "多数是轻症或完全无症状，只在体检时被发现" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微黄（久置氧化的黄）" ],
      质池: [ "滑溜（抹开不黏手）", "微稠（有一点挂壁）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 10, 35 ],
      瘙痒: [ 0, 20 ],
      传染性: "中（血液与性接触，病毒载量高时传染性强）",
      痕迹池: [ "乙肝两对半永久阳性", "肝功能反复波动与定期复查", "忌酒、少熬夜、按时吃药的生活方式" ],
      免疫: "表面抗体可终身，但病毒可长期携带，慢性化后难以彻底清除",
      易复发: false,
      可治愈: false,
      分期池: [ "潜伏期", "带菌期", "慢性期", "急性期", "后遗症期" ]
    }, {
      短名: "淋菌性咽炎 / 直肠炎",
      病原: "淋病奈瑟菌（定植在咽部与直肠黏膜）",
      部位池: [ "口咽（口腔与咽部，口交途径）", "肛管直肠（肛口往里那一段）" ],
      体征池: [ "咽痛，但多数时候毫无感觉", "里急后重，总想去厕所却拉不出来", "肛周灼痛，坐下像垫了一块烙铁", "黏液脓血便，纸上带血带脓", "直肠镜下见黏膜挂满脓性分泌物" ],
      量池: [ "中偏多（能抹开一整片）", "多（顺着会阴往下流）" ],
      色池: [ "黄绿脓性", "微黄（久置氧化的黄）" ],
      质池: [ "奶浆状（乳白且浓）", "黏（拉出短丝）" ],
      味池: [ "捂了一整天的闷热骚气", "淡淡腥气" ],
      疼痛: [ 40, 70 ],
      瘙痒: [ 20, 45 ],
      传染性: "高（口交与肛交传播）",
      痕迹池: [ "反复咽痛与自行买药攒下的耐药", "肛周灼痛的记忆与对后入的长期排斥", "排便变细、总觉得没排干净的残余感" ],
      免疫: "无保护性免疫，可反复感染",
      易复发: false,
      可治愈: true,
      分期池: [ "潜伏期", "带菌期", "急性期", "慢性期", "后遗症期", "已治愈" ]
    }, {
      短名: "阴部硬化性苔藓 / VIN",
      病原: "慢性炎症性皮肤病（自身免疫，不是感染）",
      部位池: [ "外阴（大阴唇、小阴唇与阴阜的统称）", "会阴（阴道口与肛口之间的那段）", "肛周（肛口外一圈放射状褶皱）" ],
      体征池: [ "皮肤瓷白色、羊皮纸样，皱缩发亮", "呈“8”字形分布，绕过阴道口与肛口", "剧痒，抓破后皲裂", "阴道口狭窄，性交是撕裂样疼" ],
      量池: [ "少（只在口上有一层）", "中（清亮的一层）" ],
      色池: [ "清亮（微微带一点白）", "微白（乳白色的薄浆）" ],
      质池: [ "干涩发黏（水少但黏）", "滑溜（抹开不黏手）" ],
      味池: [ "几乎无味", "极淡的体香" ],
      疼痛: [ 30, 60 ],
      瘙痒: [ 70, 95 ],
      传染性: "无（不传染，是自身免疫病）",
      痕迹池: [ "瓷白色萎缩皮面永久存在", "阴道口狭窄环与皲裂旧痕", "长期抹激素软膏的使用痕迹" ],
      免疫: "自身免疫性疾病，会反复活动；VIN 需要长期随访防癌变",
      易复发: true,
      可治愈: false,
      分期池: [ "慢性期", "反复发作期", "后遗症期" ]
    } ];
    function 合成性病(地区, 原型 = "普通人") {
      const 高危原型 = 原型.includes("职业者") || 原型.includes("被带进圈的人");
      const 风险点 = Math.random();
      let 条数;
      if (高危原型) {
        条数 = 风险点 < .38 ? 0 : 风险点 < .72 ? 1 : 风险点 < .92 ? 2 : 3;
      } else if (地区 === "大陆") {
        条数 = 风险点 < .76 ? 0 : 风险点 < .968 ? 1 : 风险点 < .994 ? 2 : 3;
      } else {
        条数 = 风险点 < .7 ? 0 : 风险点 < .925 ? 1 : 风险点 < .975 ? 2 : 3;
      }
      const 选择池 = Array.from({
        length: ___WEBPACK_IMPORTED_MODULE_0__["性病库"].length
      }, (_, i) => i);
      const 已选 = [];
      if (条数 > 0) {
        const 首位 = Math.floor(Math.random() * ___WEBPACK_IMPORTED_MODULE_0__["性病库"].length);
        已选.push(首位);
        选择池.splice(选择池.indexOf(首位), 1);
        while (已选.length < 条数 && 选择池.length > 0) {
          const 共感染候选 = (性病共感染表[已选[已选.length - 1]] ?? []).filter(i => 选择池.includes(i));
          const 抽中 = 共感染候选.length > 0 && Math.random() < .78 ? 抽(共感染候选) : 抽(选择池);
          已选.push(抽中);
          选择池.splice(选择池.indexOf(抽中), 1);
        }
      }
      const 治疗高区池 = [ 0, 1, 2, 2, 2, 3, 6 ];
      const 治疗低区池 = [ 0, 0, 0, 1, 1, 3, 6 ];
      const 治疗中区池 = [ 0, 0, 1, 1, 2, 2, 3, 6 ];
      const 治疗池 = 医疗高区.includes(地区) ? 治疗高区池 : 医疗低区.includes(地区) ? 治疗低区池 : 治疗中区池;
      const 治疗候选 = 合法池(治疗池.map(k => ___WEBPACK_IMPORTED_MODULE_0__["性病治疗库"][k]), x => ___WEBPACK_IMPORTED_MODULE_0__["性病治疗库"].includes(x));
      const 性病 = [];
      const 病痕 = [];
      const 免疫记忆 = [];
      const 感染分泌 = [];
      for (const i of 已选) {
        const 元 = 性病元数据表[i];
        const 分期池 = 合法池(元.分期池, k => ___WEBPACK_IMPORTED_MODULE_0__["性病分期库"].some(x => x.startsWith(k)));
        const 分期筛 = 分期池.filter(k => (元.可治愈 || !k.startsWith("已治愈")) && (元.易复发 || !k.startsWith("反复发作")));
        const 分期短 = 分期筛.length > 0 ? 抽(分期筛) : 分期池[0];
        const 分期 = ___WEBPACK_IMPORTED_MODULE_0__["性病分期库"].find(x => x.startsWith(分期短)) ?? ___WEBPACK_IMPORTED_MODULE_0__["性病分期库"][0];
        const 治愈态 = 分期短.startsWith("已治愈") || 分期短.startsWith("后遗症期");
        const 部位 = 抽区间(合法池(元.部位池, x => ___WEBPACK_IMPORTED_MODULE_0__["性病部位库"].includes(x)), 1, 3);
        const 无症状态 = 分期短.startsWith("潜伏期") || 分期短.startsWith("带菌期");
        const 体征 = 无症状态 ? [] : 抽区间(元.体征池, 2, 3);
        const 分泌物 = {
          量: 合法抽(元.量池, ___WEBPACK_IMPORTED_MODULE_0__["分泌物量库"]),
          色: 合法抽(元.色池, ___WEBPACK_IMPORTED_MODULE_0__["分泌物色库"]),
          质: 合法抽(元.质池, ___WEBPACK_IMPORTED_MODULE_0__["分泌物质库"]),
          味: 合法抽(元.味池, ___WEBPACK_IMPORTED_MODULE_0__["分泌物味库"])
        };
        const 疼痛度 = 无症状态 ? 0 : 元.疼痛[0] + Math.floor(Math.random() * (元.疼痛[1] - 元.疼痛[0] + 1));
        const 瘙痒度 = 无症状态 ? 0 : 元.瘙痒[0] + Math.floor(Math.random() * (元.瘙痒[1] - 元.瘙痒[0] + 1));
        const 治疗 = 治愈态 ? ___WEBPACK_IMPORTED_MODULE_0__["性病治疗库"][4] : 抽(治疗候选);
        const 日差 = 分期.startsWith("急性期") || 分期.startsWith("前驱期") ? 1 + Math.floor(Math.random() * 30) : 30 + Math.floor(Math.random() * 1800);
        const d = new Date(Date.now() - 日差 * 864e5);
        const 日期 = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        const 确诊日 = 治疗.startsWith("未诊治") ? `约 ${日期}（未就医，按症状起算）` : 日期;
        const 痕迹 = 抽区间(元.痕迹池, 1, 2);
        const 暴露 = Math.random() < .72 ? 抽区间(暴露线索池, 1, 2) : [];
        const 公开度 = 加权抽({
          仅自己知道: 55,
          只有密友或医生知道: 20,
          圈内都知道: 19,
          家人都知道: 6
        });
        if (治愈态) {
          if (!病痕.some(x => x.startsWith(元.短名))) {
            病痕.push(`${元.短名}已治愈留下的：${抽(元.痕迹池)}`);
          }
          if (!免疫记忆.some(x => x.startsWith(元.短名))) {
            免疫记忆.push(`${元.短名}：${元.免疫}`);
          }
        } else {
          性病.push({
            病种: ___WEBPACK_IMPORTED_MODULE_0__["性病库"][i],
            病原: 元.病原,
            分期,
            部位,
            体征,
            分泌物,
            疼痛度,
            瘙痒度,
            传染性: 元.传染性,
            治疗,
            痕迹,
            确诊日,
            来源对象: 抽(来源对象池),
            暴露,
            公开度
          });
          感染分泌.push(分泌物);
        }
      }
      const 基础分泌 = 感染分泌.length > 0 ? 感染分泌[0] : {
        量: 加权抽({
          "极少（要很久才湿）": 10,
          "少（只在口上有一层）": 14,
          "中（清亮的一层）": 20,
          "中偏多（能抹开一整片）": 18,
          "多（顺着会阴往下流）": 14,
          "丰富（拉出长丝）": 10,
          "极多（一碰就涌）": 4,
          "来得慢（前戏很久才出水）": 6,
          "来得快（看一眼就湿）": 4
        }),
        色: 加权抽({
          "无色透明（像水一样）": 18,
          "清亮（微微带一点白）": 26,
          "微白（乳白色的薄浆）": 24,
          "米浆色（淘米水般的浊白）": 12,
          粘稠乳白: 8,
          乳白带丝: 6,
          经期前后带一点浅褐: 4,
          内裤上留下的一圈黄渍干痕: 2
        }),
        质: 加权抽({
          "清亮如水（几乎是纯水感）": 20,
          "滑溜（抹开不黏手）": 22,
          "微稠（有一点挂壁）": 20,
          "黏（拉出短丝）": 14,
          "拉丝（能拉很长才断）": 10,
          "胶冻状（成一坨）": 6,
          "奶浆状（乳白且浓）": 5,
          覆在口缘一层透亮的膜: 3
        }),
        味: 加权抽({
          几乎无味: 22,
          极淡的体香: 20,
          淡淡腥气: 16,
          "微酸（发酵的酸）": 14,
          乳酸微酸: 12,
          "生蚝般的海腥（排卵期）": 8,
          洗衣液与皂角残留的干净味: 8
        })
      };
      return {
        性病,
        病痕,
        免疫记忆,
        基础分泌
      };
    }
    const 疾病形态耦合 = [ {
      病种: /念珠菌|硬化性苔藓/,
      观感: "干涩发白萎缩型（内壁干涸，进入疼痛）"
    }, {
      病种: /滴虫病|生殖器疱疹|软下疳|淋巴肉芽肿|腹股沟肉芽肿|淋病/,
      观感: "红肿充血（刚被摩擦过，发烫）"
    } ];
    const 形态锚对应 = [ {
      锚: "粉嫩紧致微闭合",
      观感: [ "粉嫩紧致微闭（极少性经验）", "小巧型（整体比例小，结构紧凑）", "一线天（合上只剩一道粉线）" ]
    }, {
      锚: "经产型松软外翻",
      观感: [ "经产型松软外翻（侧切疤硬结）", "肥屄（厚肉感，掰开前后形态差很多）" ]
    }, {
      锚: "肥厚多汁深黑蚌",
      观感: [ "肥厚多汁深黑蚌（常年开发，湿热泥泞）", "两瓣肥厚外唇夹着一道深肉缝" ]
    }, {
      锚: "轻微红肿充血",
      观感: [ "红肿充血（刚被摩擦过，发烫）" ]
    }, {
      锚: "深埋肉山暗蚌",
      观感: [ "深埋肉山（脂肪厚帘，要双手掰开）" ]
    }, {
      锚: "干涩发白萎缩型",
      观感: [ "干涩发白萎缩型（内壁干涸，进入疼痛）" ]
    }, {
      锚: "内包紧窄",
      观感: [ "小巧型（整体比例小，结构紧凑）", "馒头屄（外唇鼓着，缝藏在软肉里）", "一线天（合上只剩一道粉线）" ]
    }, {
      锚: "不对称肉唇",
      观感: [ "不对称肉唇（一侧偏长外露，焦褐褶皱）", "内瓣明显（内唇从外唇间探出）" ]
    } ];
    const 割礼形态表 = [ {
      名: "Ⅰ型·只切阴蒂",
      权重: 28,
      小阴唇形状: "薄而规整（边缘齐整如裁）",
      小阴唇对称性: "基本对称（肉眼难辨的差）",
      小阴唇外露度: "内收（只在掰开时出现）",
      阴蒂大小: "几乎摸不到（非常小）",
      阴蒂包皮: "包皮裂过一道口（愈合的浅痕）",
      阴道口: "窄小如针孔（初入阻力极大）",
      阴道紧度: "偏紧（进去发涩）",
      会阴: "薄而紧（皮肤绷着）",
      观感: "干涩发白萎缩型（内壁干涸，进入疼痛）"
    }, {
      名: "Ⅱ型·阴蒂加小阴唇切除",
      权重: 52,
      小阴唇形状: "残缺（割礼后的疤痕收缩）",
      小阴唇对称性: "一侧有疤收缩（对不上）",
      小阴唇外露度: "完全内敛（合上一点看不见）",
      阴蒂大小: "几乎摸不到（非常小）",
      阴蒂包皮: "包皮粘连（翻不太开）",
      阴道口: "一线（合上只剩一条缝）",
      阴道紧度: "紧窄（贴上柱身没有一丝空）",
      会阴: "薄而紧（皮肤绷着）",
      观感: "干涩发白萎缩型（内壁干涸，进入疼痛）"
    }, {
      名: "Ⅲ型·缝合型",
      权重: 20,
      小阴唇形状: "残缺（割礼后的疤痕收缩）",
      小阴唇对称性: "两侧长度差到一厘米",
      小阴唇外露度: "完全内敛（合上一点看不见）",
      阴蒂大小: "隐藏（完全埋在包皮下）",
      阴蒂包皮: "包皮深黑（常年摩擦的色）",
      阴道口: "窄小如针孔（初入阻力极大）",
      阴道紧度: "极紧（初入几乎顶不开）",
      会阴: "会阴体短（阴道口离肛口很近）",
      观感: "干涩发白萎缩型（内壁干涸，进入疼痛）"
    } ];
    const 割礼地区闸门 = {
      埃塞俄比亚: .65,
      尼日利亚: .25,
      肯尼亚: .15
    };
    const 割礼型地区倾向 = {
      埃塞俄比亚: {
        Ⅰ型·只切阴蒂: 1,
        Ⅱ型·阴蒂加小阴唇切除: 1.4,
        Ⅲ型·缝合型: 1
      },
      尼日利亚: {
        Ⅰ型·只切阴蒂: 1.6,
        Ⅱ型·阴蒂加小阴唇切除: 1.5,
        Ⅲ型·缝合型: .4
      },
      肯尼亚: {
        Ⅰ型·只切阴蒂: 1.4,
        Ⅱ型·阴蒂加小阴唇切除: 1.6,
        Ⅲ型·缝合型: .3
      }
    };
    function 抽割礼形态(地区) {
      const 命中 = Object.keys(割礼地区闸门).find(k => 地区.includes(k));
      if (!命中) return undefined;
      if (Math.random() >= 割礼地区闸门[命中]) return undefined;
      const 倾向 = 割礼型地区倾向[命中];
      const 加权表 = 倾向 ? 割礼形态表.map(x => ({
        ...x,
        权重: x.权重 * (倾向[x.名] ?? 1)
      })) : 割礼形态表;
      return 按权重抽(加权表);
    }
    function 合成私处(地区, 原型 = "普通人", 生育实况 = "", 涉毒 = "", 形态锚) {
      const {性病, 病痕, 免疫记忆, 基础分泌} = 合成性病(地区, 原型);
      const 已育 = 生育实况.includes("顺产") || 生育实况.includes("已育") || 生育实况.includes("哺乳");
      const 干涩 = 涉毒.includes("笑气") || 涉毒.includes("大麻");
      const 割礼 = 抽割礼形态(地区);
      const 锚 = 形态锚 ? 形态锚对应.find(x => 形态锚.startsWith(x.锚))?.观感 : undefined;
      const 基础观感 = 割礼 ? 割礼.观感 : 锚 ? 抽(锚) : 已育 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["私处观感库"], x => x.includes("经产") || x.includes("肥")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["私处观感库"]);
      const 生效病种 = 性病.map(x => x.病种);
      const 观感 = 疾病形态耦合.find(x => 生效病种.some(p => x.病种.test(p)))?.观感 ?? 基础观感;
      const 已用 = new Set;
      收姿态(已用, 观感);
      const 大阴唇形状 = 抽避让(___WEBPACK_IMPORTED_MODULE_0__["大阴唇形状库"], 已用);
      收姿态(已用, 大阴唇形状);
      const 大阴唇颜色 = 抽避让(___WEBPACK_IMPORTED_MODULE_0__["大阴唇颜色库"], 已用);
      收姿态(已用, 大阴唇颜色);
      const 小阴唇外露度 = 割礼 ? 割礼.小阴唇外露度 : 抽避让(___WEBPACK_IMPORTED_MODULE_0__["小阴唇外露库"], 已用);
      收姿态(已用, 小阴唇外露度);
      const 小阴唇形状 = 割礼 ? 割礼.小阴唇形状 : 抽避让(___WEBPACK_IMPORTED_MODULE_0__["小阴唇形状库"].filter(x => !x.includes("割礼")), 已用);
      const 已用肛 = new Set;
      const 肛门形状 = 抽避让(___WEBPACK_IMPORTED_MODULE_0__["肛门形状库"], 已用肛);
      收姿态(已用肛, 肛门形状);
      const 肛门颜色 = 抽避让(___WEBPACK_IMPORTED_MODULE_0__["肛门颜色库"], 已用肛);
      return {
        阴阜: 抽(___WEBPACK_IMPORTED_MODULE_0__["阴阜库"]),
        大阴唇形状,
        大阴唇颜色,
        大阴唇饱满度: 抽(___WEBPACK_IMPORTED_MODULE_0__["大阴唇饱满库"]),
        小阴唇形状,
        小阴唇颜色: 抽(___WEBPACK_IMPORTED_MODULE_0__["小阴唇颜色库"]),
        小阴唇外露度,
        小阴唇对称性: 割礼 ? 割礼.小阴唇对称性 : 抽(___WEBPACK_IMPORTED_MODULE_0__["小阴唇对称库"]),
        阴蒂大小: 割礼 ? 割礼.阴蒂大小 : 抽(___WEBPACK_IMPORTED_MODULE_0__["阴蒂大小库"]),
        阴蒂包皮: 割礼 ? 割礼.阴蒂包皮 : 抽(___WEBPACK_IMPORTED_MODULE_0__["阴蒂包皮库"]),
        阴道口形状: 割礼 ? 割礼.阴道口 : 抽(___WEBPACK_IMPORTED_MODULE_0__["阴道口库"]),
        阴道紧度: 已育 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["阴道紧度库"], x => x.includes("松")) : 割礼 ? 割礼.阴道紧度 : 干涩 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["阴道紧度库"], x => x.includes("涩")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["阴道紧度库"]),
        阴道褶皱: 干涩 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["阴道褶皱库"], x => x.includes("光滑") || x.includes("浅褶")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["阴道褶皱库"]),
        阴道深度: 抽(___WEBPACK_IMPORTED_MODULE_0__["阴道深度库"]),
        分泌物量: 基础分泌.量,
        分泌物色: 基础分泌.色,
        分泌物质: 基础分泌.质,
        分泌物味: 基础分泌.味,
        会阴: 已育 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["会阴库"], x => x.includes("侧切") || x.includes("撕裂") || x.includes("会阴体短")) : 割礼 ? 割礼.会阴 : 抽(___WEBPACK_IMPORTED_MODULE_0__["会阴库"]),
        肛门颜色,
        肛门形状,
        处女膜: 抽(___WEBPACK_IMPORTED_MODULE_0__["处女膜库"]),
        整体观感: 观感,
        性病,
        病痕,
        免疫记忆
      };
    }
    function 去注(s) {
      let t = s.includes("（") ? s.slice(0, s.indexOf("（")) : s;
      if (t.includes("：")) t = t.split("：")[1];
      return t;
    }
    function 接(标签, 值) {
      const v = 去注(值);
      return v.startsWith(标签) ? v : `${标签}${v}`;
    }
    function 深度句(值) {
      const v = 去注(值);
      if (/^(深|浅|中|偏|短|长)/.test(v)) return v;
      return `深处${v}`;
    }
    const 姿态词表 = [ "完全内敛", "完全内包", "内敛", "内包", "内收", "外翻下垂", "外翻卷边", "外翻", "一侧外露一侧内敛", "外露", "卷边", "下垂", "微翻外露", "微翻", "外鼓", "紧闭", "湿润后自动张开", "只在兴奋时外翻", "被内裤勒出的缝隙里夹着一线" ];
    function 收姿态(已用, 值) {
      for (const w of 姿态词表) if (值.includes(w)) 已用.add(w);
    }
    function 抽避让(库, 已用) {
      if (已用.size === 0) return 抽(库);
      const 合 = 库.filter(x => ![ ...已用 ].some(w => x.includes(w)));
      return 抽(合.length > 0 ? 合 : 库);
    }
    const 病名禁词 = /梅毒疹|扁平湿疣|湿疣|硬下疳|树胶肿|软疣小体|菜花|鸡冠|草莓样|马鞍鼻|脊髓痨|点滴状|巴氏腺|CIN|HPV|HIV|淋病|梅毒|疱疹|衣原体|念珠菌|霉菌|滴虫|疥螨|阴虱|软下疳|肉芽肿|苔藓|支原体|肝炎/;
    function 合成阴部摘要(私处) {
      const 由 = 去注(私处.整体观感);
      const 段 = [ `${由}：${去注(私处.大阴唇颜色)}的${去注(私处.大阴唇形状)}，${去注(私处.小阴唇外露度)}的${去注(私处.小阴唇形状)}`, `阴蒂${去注(私处.阴蒂大小)}，${接("包皮", 私处.阴蒂包皮)}`, `口是${去注(私处.阴道口形状)}，进去${去注(私处.阴道紧度)}，${接("内壁", 私处.阴道褶皱)}，${深度句(私处.阴道深度)}`, `平时${去注(私处.分泌物量)}、${去注(私处.分泌物色)}，摸上去${去注(私处.分泌物质)}，凑近是${去注(私处.分泌物味)}`, `${接("会阴", 私处.会阴)}，后穴${去注(私处.肛门形状)}、${去注(私处.肛门颜色)}` ];
      if (私处.性病.length > 0) {
        const 重 = [ ...私处.性病 ].sort((a, b) => b.疼痛度 + b.瘙痒度 - a.疼痛度 - a.瘙痒度)[0];
        const 可描写 = 重.体征.filter(x => !病名禁词.test(x));
        const 描述 = 可描写.length > 0 ? 去注(可描写[0]) : 重.疼痛度 + 重.瘙痒度 > 100 ? "那里比平时红，摸上去发烫，她自己说一动就疼" : "那儿不太对劲，分泌物和平时不一样，她自己也说不上来";
        段.push(`这会儿她不正常：${描述}，分泌物${去注(重.分泌物.量)}、${去注(重.分泌物.色)}、${去注(重.分泌物.质)}，闻着${去注(重.分泌物.味)}`);
      }
      if (私处.病痕.length > 0) {
        const 痕 = 私处.病痕[0].includes("：") ? 私处.病痕[0].split("：")[1] : 私处.病痕[0];
        段.push(`旧病褪下去留了痕：${去注(痕)}`);
      }
      return `${段.join("；")}。`;
    }
    function 合成性病摘要(性病, 病痕) {
      if (性病.length === 0) {
        if (病痕.length === 0) return "完全健康（洁白体检报告，无任何病原体）";
        return `既往感染已治愈（现无活动性感染）：${病痕.map(x => x.split("已治愈留下的")[0]).join("、")}`;
      }
      return 性病.map(x => `${去注(x.病种)}·${去注(x.分期)}·${去注(x.治疗)}（${x.体征.length} 项体征，疼痛 ${x.疼痛度} / 瘙痒 ${x.瘙痒度}）`).join(" ＋ ");
    }
    function 生成人物(地区, 指定原型, _意图) {
      const w = ___WEBPACK_IMPORTED_MODULE_0__["身高权重"][地区] ?? ___WEBPACK_IMPORTED_MODULE_0__["身高权重"]["默认"];
      const 区间 = 加权抽(w);
      const 身高 = 抽(___WEBPACK_IMPORTED_MODULE_0__["身高区间值"][区间]);
      const 经验度 = Math.ceil(Math.random() * 5);
      const 年龄 = 抽年龄();
      const 性格 = {
        底色: 抽(底色库),
        主色调: 抽(主色调库),
        点缀: Math.random() < .7 ? 抽(点缀库) : "（无）"
      };
      const 主动度 = Math.ceil(Math.random() * 5);
      const 尺度节奏 = Math.ceil(Math.random() * 5);
      const 原型 = 指定原型 ?? 抽(___WEBPACK_IMPORTED_MODULE_0__["原型库"]);
      const 退路 = 抽([ "有", "无", "模糊" ]);
      const 背景 = {
        原型,
        动机: 抽(___WEBPACK_IMPORTED_MODULE_0__["动机库"]),
        处境: 抽(___WEBPACK_IMPORTED_MODULE_0__["处境库"]),
        退路,
        家庭: 抽(___WEBPACK_IMPORTED_MODULE_0__["家庭库"]),
        经济: 抽(___WEBPACK_IMPORTED_MODULE_0__["经济库"]),
        信仰: 抽(___WEBPACK_IMPORTED_MODULE_0__["信仰库"]),
        人生事件: 抽N(___WEBPACK_IMPORTED_MODULE_0__["人生事件库"], 1 + Math.floor(Math.random() * 2)),
        冲突: 抽(___WEBPACK_IMPORTED_MODULE_0__["冲突库"])
      };
      const {扩展, 修正} = 生成扩展轴({
        年龄,
        原型,
        地区
      });
      if (扩展.陷阱设局.类型.includes("暴怒丈夫")) {
        背景.处境 = "和老公住（只能白天，且要删记录）";
        背景.冲突 = "丈夫生性暴虐多疑，手持工具随时在门外楼道突击捉奸";
      } else if (扩展.陷阱设局.类型.includes("仙人跳")) {
        背景.退路 = "无";
        背景.处境 = "小宾馆/日租公寓";
        背景.冲突 = "与外部暴力团伙勾结做局，进房脱衣即踹门勒索";
      } else if (扩展.陷阱设局.类型.includes("钓鱼执法")) {
        背景.处境 = "宾馆标准间（楼下有便衣巡警布控）";
        背景.冲突 = "涉黄治安专项整治目标，交易完成即抓捕拘留";
      }
      const 瑕疵列表 = 抽N(___WEBPACK_IMPORTED_MODULE_0__["瑕疵库"], 2 + Math.floor(Math.random() * 2));
      const 确立阴部形态 = 抽(___WEBPACK_IMPORTED_MODULE_0__["阴部形态库"]);
      const 私处抽取 = 合成私处(地区, 原型, 扩展.生育实况, 扩展.涉毒成瘾, 确立阴部形态);
      const 确立阴部 = 合成阴部摘要(私处抽取);
      const 病态味 = /细菌性阴道病|霉菌感染|滴虫/;
      const 确立味道 = 私处抽取.性病.length === 0 ? 抽(___WEBPACK_IMPORTED_MODULE_0__["味道库"].filter(x => !病态味.test(x))) : Math.random() < .25 ? 私处抽取.分泌物味 : 抽(___WEBPACK_IMPORTED_MODULE_0__["味道库"]);
      const 确立气味 = 扩展.涉毒成瘾.includes("笑气") || 扩展.涉毒成瘾.includes("大麻") ? "重度笑气与大麻吸食后从肺部哈出的甜腻化学异味" : 扩展.生育实况.includes("产后哺乳期") ? "涨奶溢出贴身内衣发酵的微酸生冷奶腥味" : 抽(气味池);
      扩展.性病携带 = 合成性病摘要(私处抽取.性病, 私处抽取.病痕);
      if (扩展.生育实况.includes("剖腹产")) {
        if (!瑕疵列表.includes("疤（剖腹产）")) 瑕疵列表.push("疤（剖腹产）");
      }
      const 哺乳 = 扩展.生育实况.includes("产后哺乳期");
      const 胸形状抽 = 抽(___WEBPACK_IMPORTED_MODULE_0__["胸形状"]);
      const 胸尺寸抽 = 哺乳 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["胸尺寸"], x => x.includes("大") || x.includes("巨")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["胸尺寸"]);
      const 外貌 = {
        年龄,
        身高,
        体型: 抽不重复("体型", ___WEBPACK_IMPORTED_MODULE_0__["体型库"]),
        肤色: 抽(___WEBPACK_IMPORTED_MODULE_0__["肤色库"]),
        肤质: 抽(___WEBPACK_IMPORTED_MODULE_0__["肤质库"]),
        瑕疵: 瑕疵列表,
        体毛: 抽(___WEBPACK_IMPORTED_MODULE_0__["体毛库"]),
        胸: {
          尺寸: 胸尺寸抽,
          形状: 胸形状抽,
          乳头: 抽(___WEBPACK_IMPORTED_MODULE_0__["乳头库"]),
          乳晕: 抽(___WEBPACK_IMPORTED_MODULE_0__["乳晕库"]),
          下垂度: 哺乳 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["胸下垂库"], x => x.includes("下垂") || x.includes("哺乳")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["胸下垂库"]),
          间距: 抽(___WEBPACK_IMPORTED_MODULE_0__["胸间距库"]),
          手感: 哺乳 ? 抽过滤(___WEBPACK_IMPORTED_MODULE_0__["胸手感库"], x => x.includes("松") || x.includes("软")) : 抽(___WEBPACK_IMPORTED_MODULE_0__["胸手感库"])
        },
        腰腹: 抽(___WEBPACK_IMPORTED_MODULE_0__["腰腹库"]),
        臀: 抽不重复("臀", ___WEBPACK_IMPORTED_MODULE_0__["臀库"]),
        腿: 抽(___WEBPACK_IMPORTED_MODULE_0__["腿库"]),
        毛发: 抽(___WEBPACK_IMPORTED_MODULE_0__["毛发库"]),
        五官: 合成五官(),
        私处: 私处抽取,
        阴部: 确立阴部,
        味道: 确立味道,
        声音: 抽(___WEBPACK_IMPORTED_MODULE_0__["声音库"]),
        气味: 确立气味,
        特征: 抽(特征池),
        反直觉项: 抽(反直觉项池),
        穿搭: 合成穿搭()
      };
      const 阈值 = 算阈值(经验度, 年龄);
      const 禁区抽取 = 抽N(___WEBPACK_IMPORTED_MODULE_0__["禁区库"], 1 + Math.floor(Math.random() * 3));
      if (扩展.陷阱设局.类型.includes("创伤")) {
        禁区抽取.unshift("男性阴茎插入（创伤应激反胃干呕）");
      }
      const 性 = {
        经验度,
        阈值,
        敏感点: 抽N(___WEBPACK_IMPORTED_MODULE_0__["敏感点库"], 2 + Math.floor(Math.random() * 2)),
        禁区: 禁区抽取,
        癖好: 抽(___WEBPACK_IMPORTED_MODULE_0__["癖好库"]),
        主动类型: 抽(___WEBPACK_IMPORTED_MODULE_0__["主动类型库"]),
        高潮表现: 抽(___WEBPACK_IMPORTED_MODULE_0__["高潮表现库"]),
        事后: 抽(___WEBPACK_IMPORTED_MODULE_0__["事后库"])
      };
      const 细节模板 = [ '她的猫叫"面条"，是前男友起的名字，她一直没改', "她的手机屏碎了两年，一直没换", '她每个月给家里打钱，备注栏永远只写"生活费"', "她有一个从来不用的微博号，关注列表里只有一个人", "她走路的时候习惯靠右边，一直贴墙", "她随身带一小瓶风油精，紧张的时候会闻一下", "她所有的照片都只拍左脸", "她的微信头像是很多年前的，一直没换", "她记不住别人的名字，但记得住脸", "她包里永远有一包没拆的纸巾", "她笑起来会先抿一下嘴，像是忍着", "她的名字里有一个字，她从不写，只用拼音", "她戴一个很旧的银戒指，在中指", "她说话之前会先吸一口气", "她手机壳上有一道裂纹，用胶带贴着", "她只喝热水，从来不喝冰的" ];
      return {
        外貌,
        性,
        背景,
        性格,
        打字习惯: 抽(___WEBPACK_IMPORTED_MODULE_0__["打字习惯库"]),
        主动度,
        尺度节奏,
        阈值,
        具体细节: 抽(细节模板),
        地区术语: ___WEBPACK_IMPORTED_MODULE_0__["地区术语库"][地区] ?? [],
        扩展,
        修正,
        性格型: 抽性格型()
      };
    }
    function 生成第一眼资料(地区) {
      const 昵称池 = [ "11", "null", ".", "晚风", "小满", "阿念", "栗子", "柠檬", "阿May", "不吃香菜", "不想上班", "随便起一个", "注销中", "别问了", "隔壁", "楼下", "一只猫", "柚子", "小椰子", "阿宽", "陈圆圆", "田螺姑娘", "周三下午", "十一点半", "下雨天", "早班车", "别搜我", "换号了", "第三个号", "老号封了", "新号", "只聊天", "不约", "看简介", "先看照片", "Lily", "Viv", "Moon", "lin", "kiki", "sugar", "yuki", "mei", "Nana", "Joy", "Coco", "Momo" ];
      const 简介池 = [ "想被看着。不露脸，别问是谁。", "老公出差三天。第一天。", "只做。不聊感情。一小时。", "想试试上次没敢做的那个。", "不喜欢前戏。直接来。", "要干净，要有套，要闭嘴。", "今晚有空。明天就不一定了。", "★ 不接受讲价。", "能来就回。不能来别废话。", "想被人从后面按着。", "喝多了。谁来都行。", "想找个人看着我自慰。", "不接吻。其他都可以。", "第一次。想找个有耐心的。", "想看你的。先发过来。", "已婚。只做。绝不联系。", "晚上十一点以后。别提前。", "愿意出车费的优先。", "不拍照。谁拍谁滚。", "有地方。你来就行。", "想被弄到腿软。仅此而已。", "一个月没碰过了。", "★ 只看不做的别来。" ];
      const 昵称 = 抽(昵称池);
      const 距离 = (Math.random() * 3e3 + 200).toFixed(0);
      const 在线 = 抽([ "在线", "3 小时前在线", "昨天在线", "在线" ]);
      const 照片池 = [ "跪在床上，背对镜头。穿的是洗得发白的吊带睡裙，下摆掀到腰上。镜头对着屁股那一块，内裤勒进去了一半。脸不在画面里。", "躺着，被子盖到胸上面，一只手在被子外面握着拳。腿是并着的。", "只露下巴和锁骨。脖子上有一道很浅的痕 —— 领口勒的。", "对着镜子拍的。上半身没穿，用手机挡住脸。★ 镜子边上有别人的牙刷。", "坐在马桶盖上。穿的是上班那身衬衫，扣子开了三颗，裙子在膝盖上。", "只拍了下半身。黑色内裤，腿分开着。★ 床单是深色的，皱的。", "躺在沙发上，一只手伸到镜头外，另一只手按在自己腿间。睡裤褪到一半。", "站在窗边，侧身。窗帘拉着，但漏了一条缝。★ 她没穿内衣。", "坐在车里。裙子提起来了，安全带上压着一只手。★ 外面是地下车库。", "没有照片。只有一行字。" ];
      const 条件池 = [ "★ 不接受讲价。", "你出车费。", "一小时。到了再说。", "★ 要带套。", "不接吻。其他随意。", "★ 不拍照。谁拍谁滚。", "有地方。你来就行。", "★ 只看不做的别来。", "先聊两天。急的别来。", "今天。过了今晚就算了。" ];
      return [ "『照片』", 抽(照片池), "", `『昵称』${昵称}`, `『她写的』${简介池.length ? 抽(简介池) : ""}`, `『条件』${抽(条件池)}`, "", `『状态』${在线}　　『距离』${距离} 米　　『地区』${地区}`, "", "✔ 手机已验证：本人在此位置", "✔ 手机已验证：照片为本人实时拍摄", "✔ 手机已验证：想干什么是真的" ].join("\n");
    }
  },
  "./src/神奇手机/神奇手机/核心/等级门.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      下一个: () => 下一个,
      可用的App: () => 可用的App,
      可用的类型: () => 可用的类型,
      开了: () => 开了,
      技能门槛: () => 技能门槛,
      等级门表: () => 等级门表,
      等级阶梯: () => 等级阶梯
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./技能树 */ "./src/神奇手机/神奇手机/核心/技能树.ts");
    function 技能门槛(名) {
      const v = ___WEBPACK_IMPORTED_MODULE_0__["技能树表"][名];
      if (!v) {
        console.warn(`[等级门] ✗ 技能「${名}」不在技能树里 —— 这道门会永远关着`);
        return 999;
      }
      return v.手机等级 ?? 1;
    }
    const 门定义 = [ {
      名: "技能树",
      类: "App",
      技能: "无痕浏览",
      开了: "看得到自己能买什么"
    }, {
      名: "微信",
      类: "App",
      技能: "无痕浏览",
      开了: "私聊和群 —— 但发出去没人回"
    }, {
      名: "论坛",
      类: "App",
      技能: "无痕浏览",
      开了: "看帖、发帖 —— 新号没人理"
    }, {
      名: "雷达",
      类: "App",
      技能: "无痕浏览",
      开了: "滑卡 —— 五个里四个不回"
    }, {
      名: "档案",
      类: "App",
      技能: "第一印象",
      开了: '她的资料卡（★ 大部分是"探索中"）'
    }, {
      名: "相机",
      类: "App",
      技能: "身份映射",
      开了: "拍照 + 一阶镜像（★ 只看小号）"
    }, {
      名: "属性",
      类: "App",
      技能: "持久控制",
      开了: "看自己的 12 项属性基准"
    }, {
      名: "设置",
      类: "App",
      技能: "无痕浏览",
      开了: "文风 / 副 API"
    }, {
      名: "归档",
      类: "App",
      技能: "影子档案",
      开了: "翻他做过的判定与结算"
    }, {
      名: "生育健康",
      类: "App",
      技能: "生育控制",
      开了: "体检 / 借种 / 阻断"
    }, {
      名: "商城",
      类: "App",
      技能: "道具",
      开了: "买能拿在手里的东西"
    }, {
      名: "悬赏",
      类: "App",
      技能: "场所",
      开了: "接活赚钱"
    }, {
      名: "暗网",
      类: "App",
      技能: "门槛",
      开了: "进去看 —— 但 90% 是假的"
    }, {
      名: "选卡",
      类: "App",
      技能: "无痕浏览",
      开了: "开局选起点"
    }, {
      名: "检定",
      类: "引擎",
      技能: "无痕浏览",
      开了: "★ 任何行为过数值 —— 最基础的一个"
    }, {
      名: "属性感受",
      类: "引擎",
      技能: "无痕浏览",
      开了: '查"值 6 是什么感觉"'
    }, {
      名: "她说话",
      类: "引擎",
      技能: "无痕浏览",
      开了: "★ 她在这个平台怎么说话"
    }, {
      名: "平台",
      类: "引擎",
      技能: "无痕浏览",
      开了: "他人在哪，能上哪些站"
    }, {
      名: "站点",
      类: "引擎",
      技能: "无痕浏览",
      开了: "站内等级 / 积分"
    }, {
      名: "论坛",
      类: "引擎",
      技能: "无痕浏览",
      开了: "发帖会遇到什么回帖"
    }, {
      名: "论坛文化",
      类: "引擎",
      技能: "无痕浏览",
      开了: "每个站该守什么规矩"
    }, {
      名: "平台类",
      类: "引擎",
      技能: "无痕浏览",
      开了: "按类查平台"
    }, {
      名: "开局",
      类: "引擎",
      技能: "无痕浏览",
      开了: "摇一副身体"
    }, {
      名: "任务",
      类: "引擎",
      技能: "无痕浏览",
      开了: "任务进度"
    }, {
      名: "破冰",
      类: "引擎",
      技能: "通用语言",
      开了: "★ 开口不冷场（★ 之前第一句就被跳）"
    }, {
      名: "议价",
      类: "引擎",
      技能: "体味",
      开了: "砍价"
    }, {
      名: "关系",
      类: "引擎",
      技能: "第一印象",
      开了: "★★ 关系真的开始动 —— 之前推不动"
    }, {
      名: "床上",
      类: "引擎",
      技能: "硬度控制",
      开了: "★ 每一发都过数值"
    }, {
      名: "打架",
      类: "引擎",
      技能: "硬度控制",
      开了: "每一拳都过数值"
    }, {
      名: "生育",
      类: "引擎",
      技能: "生育控制",
      开了: "★ 播种 / 避孕"
    }, {
      名: "镜像",
      类: "引擎",
      技能: "身份映射",
      开了: "★ 一到四阶（★ 阶由技能决定）"
    }, {
      名: "被挂",
      类: "引擎",
      技能: "身份映射",
      开了: "他被挂会怎样"
    }, {
      名: "夺位",
      类: "引擎",
      技能: "心理锚定",
      开了: "★★ 取代她身边的人"
    }, {
      名: "养伤",
      类: "引擎",
      技能: "耐力",
      开了: "受伤后怎么恢复"
    }, {
      名: "临检",
      类: "引擎",
      技能: "门槛",
      开了: "被查的概率（★ 进过内部才有风险）"
    }, {
      名: "识破",
      类: "引擎",
      技能: "破译",
      开了: "★★ 看出她在骗你"
    }, {
      名: "买道具",
      类: "引擎",
      技能: "道具",
      开了: "买违禁生化"
    }, {
      名: "线下",
      类: "引擎",
      技能: "传送",
      开了: "★ 走到她面前（★ 或买机票）"
    }, {
      名: "抗药",
      类: "引擎",
      技能: "免疫药物",
      开了: "★ 每一口都过判定"
    }, {
      名: "疾病",
      类: "引擎",
      技能: "免疫艾滋",
      开了: "得病 / 潜伏 / 发病"
    }, {
      名: "吃药",
      类: "引擎",
      技能: "免疫药物",
      开了: "阻断药"
    }, {
      名: "病程",
      类: "引擎",
      技能: "免疫艾滋",
      开了: "病程推进"
    }, {
      名: "兑换积分",
      类: "引擎",
      技能: "无痕浏览",
      开了: "任务点 → 积分"
    }, {
      名: "录音",
      类: "引擎",
      技能: "录音",
      开了: "★ 录音 / 灭声（★ 相机的高级功能）"
    }, {
      名: "记录",
      类: "引擎",
      技能: "记录",
      开了: "把一场记下来"
    }, {
      名: "报警",
      类: "引擎",
      技能: "实名",
      开了: "她报警了会怎样"
    }, {
      名: "立案",
      类: "引擎",
      技能: "实名",
      开了: "立案之后"
    }, {
      名: "刑罚",
      类: "引擎",
      技能: "实名",
      开了: "进去之后"
    }, {
      名: "掉级",
      类: "引擎",
      技能: "反侦查",
      开了: "越界的代价"
    }, {
      名: "声望",
      类: "引擎",
      技能: "口碑",
      开了: "圈子里的名声"
    }, {
      名: "暴露",
      类: "引擎",
      技能: "反追查",
      开了: "★★★ 被人注意到多少次"
    }, {
      名: "充值",
      类: "引擎",
      技能: "币价",
      开了: "充值（★ 只能任务点兑）"
    }, {
      名: "家人",
      类: "引擎",
      技能: "她的家人",
      开了: "家庭线"
    }, {
      名: "镜像一阶",
      类: "机制",
      技能: "身份映射",
      开了: "小号 / 朋友圈 / 公开缩略图"
    }, {
      名: "镜像二阶",
      类: "机制",
      技能: "破译",
      开了: "私聊流 / 最近通话"
    }, {
      名: "镜像三阶",
      类: "机制",
      技能: "检索",
      开了: "隐藏相册 / 加密备忘录 / 草稿箱"
    }, {
      名: "镜像四阶",
      类: "机制",
      技能: "改记录",
      开了: "★ 摄像头调取 / 实时键盘同屏"
    }, {
      名: "鹰眼探头",
      类: "机制",
      技能: "场所",
      开了: "放置远程探头"
    }, {
      名: "性场景执行",
      类: "机制",
      技能: "敏感发现",
      开了: "完整一场怎么写"
    }, {
      名: "十级升级链",
      类: "机制",
      技能: "无痕浏览",
      开了: "★ 照片/语音的不完美原则"
    }, {
      名: "删除与回收站",
      类: "机制",
      技能: "改记录",
      开了: "★ 删照片 / 删记录（真删）"
    }, {
      名: "相册存档",
      类: "机制",
      技能: "影子档案",
      开了: "相册开始记东西（之前只有当轮）"
    } ];
    const 等级门表 = 门定义.map(x => ({
      ...x,
      等级: 技能门槛(x.技能)
    }));
    const 等级阶梯 = [ ...new Set(等级门表.map(x => x.等级)) ].sort((a, b) => a - b).map(等级 => ({
      等级,
      门: 等级门表.filter(x => x.等级 === 等级)
    }));
    function 开了(功能名, 手机等级) {
      const 门 = 等级门表.find(x => x.名 === 功能名);
      if (!门) return true;
      return 手机等级 >= 门.等级;
    }
    function 可用的类型(手机等级) {
      return 等级门表.filter(x => x.类 === "引擎" && 手机等级 >= x.等级).map(x => x.名);
    }
    function 可用的App(手机等级) {
      return 等级门表.filter(x => x.类 === "App" && 手机等级 >= x.等级).map(x => x.名);
    }
    function 下一个(手机等级) {
      const 未开的 = 等级门表.filter(x => x.等级 > 手机等级).sort((a, b) => a.等级 - b.等级);
      if (!未开的.length) return null;
      const 级 = 未开的[0].等级;
      return {
        等级: 级,
        功能: 未开的.filter(x => x.等级 === 级).map(x => x.名)
      };
    }
  },
  "./src/神奇手机/神奇手机/核心/结算.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      结算卡内容: () => 结算卡内容,
      计算结算: () => 计算结算,
      难度倍数: () => 难度倍数
    });
    function 难度倍数(她的难度) {
      const v = Math.max(1, Math.min(10, 她的难度));
      if (v <= 3) return 1;
      if (v <= 5) return 1.5;
      if (v <= 7) return 2;
      if (v <= 9) return 2.5;
      return 3;
    }
    function 计算结算(input) {
      const 明细 = [];
      const 逐发 = [];
      if (input.已上过) {
        return {
          手机经验: 0,
          积分: 0,
          明细: [ "★ 重复的人：+0（铁律 —— 同一个人不刷积分）" ],
          逐发: input.床上.发.map(f => ({
            第几发: f.第几发,
            她这发高潮: f.她这发高潮次数,
            得分: 0,
            算式: `第 ${f.第几发} 发：她到 ${f.她这发高潮次数} 次 → +0（★ 重复的人）`
          }))
        };
      }
      let 分 = 50;
      明细.push("完成闭环 +50");
      for (const f of input.床上.发) {
        const 这发分 = f.她这发高潮次数 * 60;
        const 扣 = f.她这发高潮次数 === 0 ? -15 : 0;
        const 净 = 这发分 + 扣;
        分 += 净;
        逐发.push({
          第几发: f.第几发,
          她这发高潮: f.她这发高潮次数,
          得分: 净,
          算式: `第 ${f.第几发} 发：你撑 ${f.你的分钟} 分钟，她需要 ${f.她需要分钟} 分钟` + ` → 她到 ${f.她这发高潮次数} 次` + (这发分 ? ` ×60 = +${这发分}` : "") + (扣 ? ` ★ 她没到 −15` : "")
        });
      }
      const 高潮总 = input.床上.她高潮次数;
      明细.push(`她高潮 ${高潮总} 次（逐发合计）`);
      if (高潮总 === 0) 明细.push("★ 她一次都没到 −30");
      if (Math.abs(input.床上.尺寸差) <= 1) {
        分 += 30;
        明细.push(`尺寸差 ${input.床上.尺寸差}cm ≤1 → +30`);
      }
      let 倍数 = 1;
      if (input.是新人) {
        倍数 *= 2;
        明细.push("新的人 ×2");
      }
      if (input.是新地区) {
        倍数 *= 2;
        明细.push("新地区 ×2");
      }
      if (input.是新类型) {
        倍数 *= 2;
        明细.push("新类型 ×2");
      }
      const 难 = 难度倍数(input.她的难度 ?? 3);
      if (难 > 1) 明细.push(`难度 ×${难}（她的难度 ${input.她的难度}）`);
      分 = Math.max(0, 分) * 倍数 * 难;
      const 加成 = 1 + Math.min(3, Math.max(0, input.技能结算加成 ?? 0)) * .1;
      if (加成 > 1) {
        分 *= 加成;
        明细.push(`技能结算加成 ×${加成.toFixed(1)}`);
      }
      const 手机经验 = Math.max(0, Math.round(分));
      const 积分 = Math.max(1, Math.round((高潮总 + 1) * 难 * .5));
      明细.push(`积分 = (她高潮 ${高潮总} + 1) × 难度 ${难} × 0.5 = ${积分}`);
      const 逐发和 = 逐发.reduce((s, x) => s + x.得分, 0);
      明细.push("");
      明细.push(`总算式：`);
      明细.push(`  基础 50 + 逐发合计 ${逐发和}${Math.abs(input.床上.尺寸差) <= 1 ? " + 尺寸 30" : ""}` + ` × 倍数 ${倍数} × 难度 ${难}${加成 > 1 ? ` × 加成 ${加成.toFixed(1)}` : ""}`);
      明细.push(`  = ${手机经验} 经验`);
      明细.push(`共 ${input.床上.你射精次数} 发，总时长 ${input.床上.总时长分钟} 分钟`);
      明细.push(`停止原因：${input.床上.停下的原因}`);
      return {
        手机经验,
        积分,
        明细,
        逐发
      };
    }
    function 结算卡内容(r) {
      const 行 = [];
      行.push("◈ 逐发");
      for (const f of r.逐发) {
        const 标 = f.得分 > 0 ? `+${f.得分}` : f.得分 < 0 ? `${f.得分}` : "+0";
        行.push(`第 ${f.第几发} 发　她到 ${f.她这发高潮} 次　${标}`);
      }
      行.push("");
      行.push("◈ 合计");
      行.push(`手机经验 +${r.手机经验}`);
      行.push(`积分 +${r.积分}`);
      return 行.join("\n");
    }
  },
  "./src/神奇手机/神奇手机/核心/衰减.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      单次最多升级: () => 单次最多升级,
      已会的能力: () => 已会的能力,
      新会的能力: () => 新会的能力,
      查经验需求: () => 查经验需求,
      检测越界: () => 检测越界,
      衰减叙事: () => 衰减叙事,
      计算升级: () => 计算升级,
      计算衰减: () => 计算衰减,
      越界模式: () => 越界模式,
      追溯解锁场景: () => 追溯解锁场景
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./技能树 */ "./src/神奇手机/神奇手机/核心/技能树.ts");
    function 已会的能力(技能) {
      const 出 = [];
      for (const [键, 级] of Object.entries(技能 ?? {})) {
        if (级 >= 1) 出.push(级 >= 3 ? `${键}(满)` : 键);
      }
      return 出;
    }
    function 新会的能力(技能, 级别) {
      const 出 = [];
      for (const [键, 级] of Object.entries(技能 ?? {})) {
        if (级 === 级别) 出.push(键);
      }
      return 出;
    }
    const 衰减叙事 = {
      闲置: [ "手机还是那样。只是你今天点开它的时候，加载慢了一拍。", "它没坏。就是有一下没反应。", "你最近没什么想看的。它也没给你什么。" ],
      连败: [ "你连着发了几条，都没回。手机很安静。", "那几条消息发出去，一点动静都没有。", "你怀疑是不是自己看错了什么。但它没提醒你。" ],
      反噬: [ "那个号你已经不用了。但你总觉得有人在看。", "你在这边待得有点久了。", "有些事，你上次做得太明显。" ],
      越界: [ "你等了很久，那条消息一直没有变成她的话。", "你盯着屏幕看了一会儿，什么也没发生。", "它做不到的事，它从来不说做不到。它只是不做。" ]
    };
    function 计算衰减(s) {
      const 明细 = [];
      let 掉 = 0;
      let 原因 = null;
      let 冷却 = s.冷却中;
      if (s.闲置天数 !== undefined && s.闲置天数 >= 7) {
        const 周数 = Math.floor(s.闲置天数 / 7);
        const 掉量 = 1 * 周数;
        掉 += 掉量;
        原因 = "闲置";
        明细.push(`闲置 ${s.闲置天数} 天（${周数} 周）→ -${掉量} 级`);
      }
      if (s.连败计数 >= 3) {
        const 掉量 = 1 + Math.floor((s.连败计数 - 3) / 2);
        掉 += 掉量;
        原因 = 原因 ?? "连败";
        明细.push(`连续翻车 ${s.连败计数} 次 → -${掉量} 级，进入冷却`);
        冷却 = true;
      }
      if (s.暴露感 >= 80) {
        掉 += 2;
        原因 = 原因 ?? "反噬";
        冷切: {
          冷却 = true;
        }
        明细.push(`暴露感 ${s.暴露感} ≥ 80 → -2 级，冷却（需从该地区消失一阵）`);
      }
      if (s.越界次数 > 0) {
        const 掉量 = Math.min(s.越界次数 * 5, 5 + (s.越界次数 - 1) * 5);
        掉 += 掉量;
        原因 = "越界";
        明细.push(`越界 ${s.越界次数} 次（试图让手机做它不做的事）→ -${掉量} 级`);
      }
      const 新等级 = Math.max(1, s.等级 - 掉);
      const 在朝曾达最高回升 = 新等级 < s.曾达最高;
      if (在朝曾达最高回升) {
        明细.push(`★ 手机"记得你做过"：重升至 Lv${s.曾达最高} 只需一半经验`);
      }
      return {
        新等级,
        新经验: 0,
        掉了: 掉,
        原因,
        叙事: 原因 ? 抽叙事(原因) : null,
        冷却,
        明细
      };
    }
    function 抽叙事(k) {
      const arr = 衰减叙事[k];
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function 查经验需求(等级) {
      if (等级 <= 1) return 100;
      if (等级 <= 2) return 180;
      if (等级 <= 3) return 280;
      if (等级 <= 4) return 400;
      if (等级 <= 5) return 550;
      if (等级 <= 10) return Math.round(550 + (等级 - 5) * 250);
      if (等级 <= 20) return Math.round(1800 + (等级 - 10) * 450);
      if (等级 <= 35) return Math.round(6300 + (等级 - 20) * 800);
      if (等级 <= 50) return Math.round(18300 + (等级 - 35) * 1500);
      if (等级 <= 75) return Math.round(40800 + (等级 - 50) * 3e3);
      return Math.round(115800 + (等级 - 75) * 5e3);
    }
    const 单次最多升级 = 3;
    function 计算升级(s) {
      const 明细 = [];
      let 总 = s.经验 + s.本次获得;
      let 等级 = s.等级;
      let 升了几级 = 0;
      function 获取当前需求(l) {
        const base = 查经验需求(l);
        return l < s.曾达最高 ? Math.max(50, Math.round(base / 2)) : base;
      }
      while (升了几级 < 单次最多升级) {
        const req = 获取当前需求(等级);
        if (总 >= req) {
          总 -= req;
          等级 += 1;
          升了几级 += 1;
        } else {
          break;
        }
      }
      if (升了几级 >= 单次最多升级 && 总 >= 获取当前需求(等级)) {
        明细.push(`★ 单次最多升 ${单次最多升级} 级，剩余溢出保留`);
      }
      const 溢出 = 总;
      const 曾达最高 = Math.max(s.曾达最高, 等级);
      const 解锁了 = 这一级开的技能(s.等级, 等级);
      明细.push(`经验 ${s.经验} + ${s.本次获得} = ${s.经验 + s.本次获得}（当前Lv${等级}需求 ${获取当前需求(等级)}）`);
      明细.push(`→ Lv${等级}，剩 ${溢出}`);
      return {
        新等级: 等级,
        新经验: 溢出,
        升了几级,
        溢出,
        明细,
        解锁了
      };
    }
    function 这一级开的技能(旧等级, 新等级) {
      const 出 = [];
      for (const [名, 要求] of Object.entries(___WEBPACK_IMPORTED_MODULE_0__["技能树表"])) {
        const lv = 要求.手机等级 ?? 1;
        if (lv > 旧等级 && lv <= 新等级) 出.push(名);
      }
      return 出;
    }
    const 越界模式 = [ {
      类型: "改别人意愿",
      关键词: [ "让她爱上我", "让她答应", "让她愿意", "改变她的想法", "让她喜欢我", "强迫她同意", "催眠", "洗脑", "让她爱上", "让她同意", "让她接受", "改变她", "让她心甘情愿" ],
      说明: "手机不改别人意愿"
    }, {
      类型: "替你说服",
      关键词: [ "替我说服", "替我去说", "替我谈", "帮我劝她", "自动回复她", "帮我聊", "帮我说服", "替我回她", "帮我回她", "帮我发消息给她", "替我发", "帮我约她", "替我约她" ],
      说明: "手机不替你说服"
    }, {
      类型: "替你行动",
      关键词: [ "替我去见她", "替我做", "自动去", "替我去上", "帮我上她", "替我去拿", "替我去找她", "帮我去见她", "自动帮我" ],
      说明: "手机不替你行动"
    } ];
    function 检测越界(玩家输入) {
      if (/<(开局设定|opening_scene|面板\s*\/?|数值)>/.test(玩家输入)) {
        return {
          越界: false
        };
      }
      if (/[不别禁][要许准得]?[^。！？\n]{0,14}(替我做|替我说服|替我去|替我谈|替我回|替我发|替我约|帮我上|帮我回|帮我聊|帮我劝|帮我约|让她爱上|让她答应|让她愿意|让她同意|让她接受|催眠|洗脑)/.test(玩家输入)) {
        return {
          越界: false
        };
      }
      for (const m of 越界模式) {
        for (const k of m.关键词) {
          if (玩家输入.includes(k)) {
            return {
              越界: true,
              类型: m.类型,
              说明: m.说明
            };
          }
        }
      }
      return {
        越界: false
      };
    }
    const 追溯解锁场景 = {
      疾病: {
        条件: "去过疾病高发地区，且发生过无保护性行为",
        场景: [ "她几周后发来消息，说她查出来了，让你也去查。", "你去了。阴性。", "你不信。你查了三次。", "第三次的时候，你把手机拿出来看了很久。", "手机上没有任何提示。它就是一直没让你出事。" ]
      },
      恢复: {
        条件: "连续多轮高强度",
        场景: [ "你以为自己会累。", "但你没有。", "第二天早上你醒过来的时候，身体是空的。", '不是那种累，是那种"什么都没发生过"的空。' ]
      },
      痕迹: {
        条件: "对方身上有过痕迹，你自己没有",
        场景: [ "她第二天发消息说自己脖子上有一块，问怎么办。", "你低头看了看自己。", "什么都没有。" ]
      },
      外貌: {
        条件: "多年后重逢",
        场景: [ "你翻到她三年前发的照片。", "拿现在拍的对比了一下。", "一样的。", "一点都没变。" ]
      },
      体能: {
        条件: "被堵 / 冲突",
        场景: [ "几个人在走廊里堵住你。有人先动了手。", "后来你记得的，是自己走出去的。", "你不记得自己是怎么打的，也不记得对方喊了什么。", "门口没有人拦你。监控里没有你。", '你第一次意识到：你不是打赢了，是"没被算进去"。' ]
      }
    };
  },
  "./src/神奇手机/神奇手机/核心/计算.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      产业税: () => ___WEBPACK_IMPORTED_MODULE_2__["产业税"],
      产业风险: () => ___WEBPACK_IMPORTED_MODULE_2__["产业风险"],
      伤情对照: () => ___WEBPACK_IMPORTED_MODULE_2__["伤情对照"],
      位子层级: () => ___WEBPACK_IMPORTED_MODULE_2__["位子层级"],
      体力到轮数: () => ___WEBPACK_IMPORTED_MODULE_0__["体力到轮数"],
      关系锚点: () => ___WEBPACK_IMPORTED_MODULE_2__["关系锚点"],
      判断力说话: () => ___WEBPACK_IMPORTED_MODULE_3__["判断力说话"],
      取法律: () => ___WEBPACK_IMPORTED_MODULE_5__["取法律"],
      受孕概率: () => ___WEBPACK_IMPORTED_MODULE_2__["受孕概率"],
      喂给计算床上: () => ___WEBPACK_IMPORTED_MODULE_3__["喂给计算床上"],
      场所系数: () => ___WEBPACK_IMPORTED_MODULE_5__["场所系数"],
      声望涨: () => ___WEBPACK_IMPORTED_MODULE_2__["声望涨"],
      声望阈值: () => ___WEBPACK_IMPORTED_MODULE_2__["声望阈值"],
      声望降: () => ___WEBPACK_IMPORTED_MODULE_2__["声望降"],
      处境说话: () => ___WEBPACK_IMPORTED_MODULE_3__["处境说话"],
      她的战力: () => ___WEBPACK_IMPORTED_MODULE_3__["她的战力"],
      她的档案: () => ___WEBPACK_IMPORTED_MODULE_3__["她的档案"],
      她的难度: () => ___WEBPACK_IMPORTED_MODULE_3__["她的难度"],
      尺寸到值: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到值"],
      尺寸到厘米: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到厘米"],
      尺寸到周长: () => ___WEBPACK_IMPORTED_MODULE_0__["尺寸到周长"],
      尺寸匹配说话: () => ___WEBPACK_IMPORTED_MODULE_3__["尺寸匹配说话"],
      带病概率: () => ___WEBPACK_IMPORTED_MODULE_2__["带病概率"],
      性格修正: () => ___WEBPACK_IMPORTED_MODULE_5__["性格修正"],
      恢复到不应期: () => ___WEBPACK_IMPORTED_MODULE_0__["恢复到不应期"],
      感知到准确度: () => ___WEBPACK_IMPORTED_MODULE_0__["感知到准确度"],
      戒备说话: () => ___WEBPACK_IMPORTED_MODULE_3__["戒备说话"],
      战力对照: () => ___WEBPACK_IMPORTED_MODULE_2__["战力对照"],
      报警诱因: () => ___WEBPACK_IMPORTED_MODULE_5__["报警诱因"],
      抽她的体格: () => ___WEBPACK_IMPORTED_MODULE_3__["抽她的体格"],
      抽她的性数据: () => ___WEBPACK_IMPORTED_MODULE_3__["抽她的性数据"],
      抽她的防御: () => ___WEBPACK_IMPORTED_MODULE_3__["抽她的防御"],
      持久到分钟: () => ___WEBPACK_IMPORTED_MODULE_0__["持久到分钟"],
      敏感度说话: () => ___WEBPACK_IMPORTED_MODULE_3__["敏感度说话"],
      时机到波动: () => ___WEBPACK_IMPORTED_MODULE_0__["时机到波动"],
      显眼度表: () => ___WEBPACK_IMPORTED_MODULE_5__["显眼度表"],
      暴露涨: () => ___WEBPACK_IMPORTED_MODULE_2__["暴露涨"],
      暴露阈值: () => ___WEBPACK_IMPORTED_MODULE_2__["暴露阈值"],
      暴露降: () => ___WEBPACK_IMPORTED_MODULE_2__["暴露降"],
      法律对照: () => ___WEBPACK_IMPORTED_MODULE_5__["法律对照"],
      法律表: () => ___WEBPACK_IMPORTED_MODULE_5__["法律表"],
      硬度到百分比: () => ___WEBPACK_IMPORTED_MODULE_0__["硬度到百分比"],
      算临检: () => ___WEBPACK_IMPORTED_MODULE_5__["算临检"],
      算刑罚: () => ___WEBPACK_IMPORTED_MODULE_5__["算刑罚"],
      算夺位: () => ___WEBPACK_IMPORTED_MODULE_2__["算夺位"],
      算战力: () => ___WEBPACK_IMPORTED_MODULE_2__["算战力"],
      算打架: () => ___WEBPACK_IMPORTED_MODULE_2__["算打架"],
      算抗药: () => ___WEBPACK_IMPORTED_MODULE_2__["算抗药"],
      算报警: () => ___WEBPACK_IMPORTED_MODULE_5__["算报警"],
      算生育: () => ___WEBPACK_IMPORTED_MODULE_2__["算生育"],
      算疾病: () => ___WEBPACK_IMPORTED_MODULE_2__["算疾病"],
      算立案: () => ___WEBPACK_IMPORTED_MODULE_5__["算立案"],
      算议价: () => ___WEBPACK_IMPORTED_MODULE_2__["算议价"],
      算识破: () => ___WEBPACK_IMPORTED_MODULE_2__["算识破"],
      经验度说话: () => ___WEBPACK_IMPORTED_MODULE_3__["经验度说话"],
      结算卡内容: () => ___WEBPACK_IMPORTED_MODULE_4__["结算卡内容"],
      罚款倍数: () => ___WEBPACK_IMPORTED_MODULE_5__["罚款倍数"],
      罪名表: () => ___WEBPACK_IMPORTED_MODULE_5__["罪名表"],
      药物对照: () => ___WEBPACK_IMPORTED_MODULE_2__["药物对照"],
      行为系数: () => ___WEBPACK_IMPORTED_MODULE_2__["行为系数"],
      计算床上: () => ___WEBPACK_IMPORTED_MODULE_1__["计算床上"],
      计算结算: () => ___WEBPACK_IMPORTED_MODULE_4__["计算结算"],
      阈值到分钟: () => ___WEBPACK_IMPORTED_MODULE_3__["阈值到分钟"],
      阈值说话: () => ___WEBPACK_IMPORTED_MODULE_3__["阈值说话"],
      难度倍数: () => ___WEBPACK_IMPORTED_MODULE_4__["难度倍数"],
      默认法律: () => ___WEBPACK_IMPORTED_MODULE_5__["默认法律"]
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
    var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./床上新 */ "./src/神奇手机/神奇手机/核心/床上新.ts");
    var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./对抗 */ "./src/神奇手机/神奇手机/核心/对抗.ts");
    var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./她的数值 */ "./src/神奇手机/神奇手机/核心/她的数值.ts");
    var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./结算 */ "./src/神奇手机/神奇手机/核心/结算.ts");
    var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./法律 */ "./src/神奇手机/神奇手机/核心/法律.ts");
  },
  "./src/神奇手机/神奇手机/核心/论坛生态.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      VIP档位: () => VIP档位,
      家庭线原则: () => 家庭线原则,
      家庭线阶段: () => 家庭线阶段,
      新人的回帖: () => 新人的回帖,
      熟人的回帖: () => 熟人的回帖,
      积分来源: () => 积分来源,
      站级表: () => 站级表,
      线下场所表: () => 线下场所表,
      被挂情况表: () => 被挂情况表,
      论坛待遇: () => 论坛待遇,
      论坛文化表: () => 论坛文化表
    });
    const 新人的回帖 = [ {
      身份: "一个混了八年的老号",
      话: "又一个新号。你这帖子我上个月见过一模一样的",
      态度: "嘲"
    }, {
      身份: "版主",
      话: "★ 图删了。再发这种直接封",
      态度: "冷淡"
    }, {
      身份: "某个不说话的人",
      话: "（只点了一个赞，什么也没说）",
      态度: "中立"
    }, {
      身份: "一个专门抓骗子的",
      话: "★★ 我扒了一下你。你这号是前天注册的。大家小心",
      态度: "敌意"
    }, {
      身份: "一个围观群众",
      话: "笑死。吃相太难看了哥们",
      态度: "嘲"
    }, {
      身份: "一个真来聊天的",
      话: "兄弟你这描述有点意思。加个好友？",
      态度: "友好"
    }, {
      身份: "某个装清高的",
      话: "★ 这里不是给你发这种的地方。要发去隔壁",
      态度: "冷淡"
    }, {
      身份: "一个从来不说话的",
      话: "（收藏了。没回）",
      态度: "中立"
    }, {
      身份: "一个老用户",
      话: "★★ 我在这混了十年。你这种我见多了 —— 活不过三个月",
      态度: "嘲"
    }, {
      身份: "某人的小号",
      话: "★ 楼主，你知不知道你刚才回的那句话得罪了谁",
      态度: "敌意"
    } ];
    const 熟人的回帖 = [ {
      身份: "几个认得他的人",
      话: "★ 老哥又来了。上次那个怎么样了",
      态度: "友好"
    }, {
      身份: "一个新来的",
      话: "求带。楼主收徒吗",
      态度: "友好"
    }, {
      身份: "一个跟他不对付的",
      话: "★★ 装什么。上个月你被挂的时候怎么不说话",
      态度: "敌意"
    }, {
      身份: "版主",
      话: "行。这次没什么问题",
      态度: "中立"
    }, {
      身份: "一个中立的",
      话: "★ 内容不错，就是太长了",
      态度: "中立"
    }, {
      身份: "一个想跟他做生意的",
      话: "★★ 私你了。有货",
      态度: "友好"
    } ];
    function 论坛待遇(站级, 行为) {
      if (站级 <= 1) {
        const 表 = {
          发帖: '★ 沉了。你那条帖在第 4 页，没人理。★ 或者有人回一句"新号?"',
          私信: '★★ 你发了 20 条私信。回了 1 条，内容是"？"',
          回帖: "没人理你。你的回复在别人的楼里，像没存在过",
          要资源: "★★★ 被人当骗子。★ 有人开始翻你的注册时间"
        };
        return 表[行为];
      }
      if (站级 <= 2) {
        const 表 = {
          发帖: '★ 有人回了，但回的是"你这不叫约，叫发广告"',
          私信: "回了 3 条。一条是问她多少钱的，两条是骂你的",
          回帖: "有人点你，语气不太好。★ 但至少有人看见你了",
          要资源: '★ 有人给你了，但要你先发个"投名状"'
        };
        return 表[行为];
      }
      if (站级 <= 3) {
        const 表 = {
          发帖: '★★ 有人认真回了。也有人开始问你"有没有后续"',
          私信: "回了不少。★★ 其中两个是真的",
          回帖: "你说的话有人接。★ 但还不是所有人都服你",
          要资源: "★ 有人主动给你了"
        };
        return 表[行为];
      }
      if (站级 <= 4) {
        const 表 = {
          发帖: "★ 你的帖子会被置顶一段。★ 而有人开始模仿你的写法",
          私信: "★★ 回你的速度明显快了。★ 有人会主动私你",
          回帖: '你说的话有人引用。★ 有人开始叫你"老哥"',
          要资源: "有人直接把东西发给你，不要回报"
        };
        return 表[行为];
      }
      const 表 = {
        发帖: "★★★ 你发什么都会有人看。★ 而且会有人帮你辩护",
        私信: "★ 你收到了很多，多到回不过来",
        回帖: "★ 你一说话，楼就歪了",
        要资源: "★★ 不用你要。有人会送到你面前"
      };
      return 表[行为];
    }
    const 论坛文化表 = [ {
      名: "草榴 / 1024",
      鄙视: '★ 转帖不标出处、问"求资源"、发假图',
      尊重: "★★ 原创、有细节的战报、会拍会写的人",
      新人坑: "★★★ 第一帖就求资源 —— 这是最快被当骗子的方式",
      黑话: "1024、楼主好人、留图不留种、马克"
    }, {
      名: "Reddit r4r",
      鄙视: "★★ 不发验证照、照片打码、只发不回的",
      尊重: '★★★ 手写纸日期验证、真实照片、会说"不"',
      新人坑: "★★ 不发验证照就发帖 —— 会被踩到负分",
      黑话: "verification、M4F、F4M、no strings"
    }, {
      名: "Dcard 西斯板",
      鄙视: "★ 太短、只有动作没有情绪、装老手",
      尊重: '★★★ 长文、细节、自称"小妹"的女生、有情绪起伏',
      新人坑: "★ 写太短 —— 那边的人要看三千字",
      黑话: "西斯、西斯板、闪光、西斯文"
    }, {
      名: "FetLife",
      鄙视: "★★ 新人上来就约、不参加线下聚会、不问 consent",
      尊重: "★★★ 懂规矩、有 munch 记录、会先问边界",
      新人坑: "★★★ 刚注册就群发私信 —— 会被拉黑并通报",
      黑话: "munch、scene、D/s、SSC、aftercare"
    }, {
      名: "Sammyboy（新加坡）",
      鄙视: "★ 不写场评就发问、吹牛、照片造假",
      尊重: "★★★ 详细的场评、价格透明、会通报骗子",
      新人坑: '★ 问"哪里有好料"—— 那边的人会说"你自己去看"',
      黑话: "场、妹、FR（field report）、OKT"
    }, {
      名: "Telegram 群",
      鄙视: "★ 潜水、不发言、只看不发",
      尊重: "★ 会分享、会验货、说话有分寸的人",
      新人坑: "★★ 一进来就发广告 —— 秒踢",
      黑话: "老哥、验车、上车、翻车"
    }, {
      名: "91",
      鄙视: "★★ 只发不回的、盗图的、假的夫妻",
      尊重: "★★★ 真夫妻自拍、有互动、有后续",
      新人坑: "★★ 单男发帖 —— 那边基本不理",
      黑话: "原创、夫妻、单男、认证"
    } ];
    const 被挂情况表 = [ {
      原因: "放鸽子（约好没到）",
      谁挂的: "她本人",
      后果: "★★ 当地的圈子会互通，接下来两周你约不到人",
      怎么处理: "★ 只有一种办法：给钱，而且要多给。然后在同一个地方再约成一次"
    }, {
      原因: "被拍到脸，而且发到群里",
      谁挂的: "她的朋友",
      后果: '★★★ 你的脸在那个圈子里变成"这个人"',
      怎么处理: "★ Lv70 模糊之后，照片里认不出你。★★ 但在那之前，你只能换地区"
    }, {
      原因: "压价压得太狠，而且被她记住",
      谁挂的: "她在小圈子里说",
      后果: "★ 同一个圈子里的报价对你上浮 20%",
      怎么处理: "★ 换圈子，或者用另一个号重新开始"
    }, {
      原因: "吃相难看（在论坛上）",
      谁挂的: "论坛老用户",
      后果: '★★ 你被截图挂出来，配上"这号大家注意"',
      怎么处理: "★★ 换号。★ 论坛记不住你的脸，但记得住你的说话方式"
    }, {
      原因: "说了不该说的话",
      谁挂的: "版主",
      后果: "★ 封号 / 降权 / 帖子全删",
      怎么处理: "★★ 没有申诉。★ 这就是这个圈子"
    } ];
    const 线下场所表 = [ {
      名: "KTV / 夜总会",
      门: "★★ 没有熟人带，你就坐大厅；有人带，你进包厢",
      玩法: "★ 陪唱 → 加钟 → 出台。★★ 每一步都要谈",
      坑: '★★★ 酒水是主要利润。★ 有些店会"加项"（结账时多出几项）',
      价: "★ 陪唱 200-800 / 出台 1000-5000（看城市）"
    }, {
      名: "按摩院 / 会所",
      门: "★ 门面是正经的。★★ 要问对的话才进里间",
      玩法: '★ 泰式 → 油压 → 加项。★★ 通常是"你问，她才说"',
      坑: '★★ 照片和真人不对是常态。★ 有的店只做"素"的',
      价: "★ 200-1500"
    }, {
      名: "洗浴中心",
      门: "★ 门槛最低。★★ 但最容易被宰",
      玩法: "★ 洗澡 → 休息区 → 点钟",
      坑: "★★★ 本地人和外地人两个价",
      价: "★ 300-2000"
    }, {
      名: "酒吧 / 夜店",
      门: "★ 没有门槛。★★ 但你有魅力才行",
      玩法: "★ 喝酒 → 搭话 → 看当晚运气",
      坑: '★★ 这里的"她"可能是酒托',
      价: "★ 酒钱。★ 而酒托能喝掉你几千"
    }, {
      名: "同城（外卖）",
      门: "★ 要有人拉你进群",
      玩法: "★★ 群里发照片，你挑，她来",
      坑: "★★★ 照片是套图。★★ 有仙人跳",
      价: "★ 600-3000"
    }, {
      名: "外围（经纪人）",
      门: "★★★ 要有人带。★ 而且他要对你负责",
      玩法: "★ 经纪人发照片 → 你选 → 到酒店",
      坑: '★★ "照片和人不对"是常态。★★ 加价、换人、跑单都有',
      价: "★ 3000-20000"
    }, {
      名: "红灯区（合法地区）",
      门: "★ 没有门槛。★ 泰国、荷兰、德国、新加坡芽笼",
      玩法: "★ 直接进店 / 橱窗 → 谈 → 上楼",
      坑: "★ 游客价和本地价差三倍",
      价: "★ 当地市价的 2-3 倍"
    }, {
      名: "桑拿 / 三温暖（男同）",
      门: "★ 买票就进",
      玩法: "★ 里头全是明白人",
      坑: "★ 卫生是最大的问题",
      价: "★ 50-200"
    } ];
    const 家庭线原则 = {
      难度: "★★★ 比任何别的线都难。★ 手机的三定律在这里基本失效 —— 她看得到你，她认识你，她不会被骗过去",
      手机能给: "★ 信息（她年轻时的照片、她没跟你说过的事）",
      手机不能给: "★★★ 说服、脱身、匿名 —— 她就是你妈，她认得你",
      真正的难点: '★★★ 不是"让她同意"，是【你决定的那一刻，你就回不去了】',
      代价: "★★ 一旦开始，你跟她说话的方式全变了。★ 而且家里的其他人会先察觉",
      写法: "★ 慢。★ 每一次靠近都用十几轮。★★ 而且她绝大部分时候应该是在躲、在装没看见",
      底线: '★★ 不写强迫。★ 她的每一次"没有拒绝"都必须是清醒的选择'
    };
    const 家庭线阶段 = [ {
      阶段: "① 发现",
      写什么: "★★ 手机里出现她的东西 —— 年轻时的照片、她没跟任何人说过的过去。★ 而这改变的不是她对你的态度，是你对她的看法"
    }, {
      阶段: "② 距离变了",
      写什么: "★ 你在饭桌上多看了她两秒。她没注意到。★★ 但你自己知道"
    }, {
      阶段: "③ 她察觉",
      写什么: "★★ 她开始避开一些场合。★ 不是躲你，是躲那种感觉。★★ 而她不承认"
    }, {
      阶段: "④ 一次意外",
      写什么: "★ 不是设计好的。★★ 是酒、是深夜、是她刚哭过。★ 这种时刻只有一次"
    }, {
      阶段: "⑤ 之后",
      写什么: "★★★ 第二天。★ 她在做早饭，跟平时一模一样。★★ 而你们两个都知道不一样了"
    } ];
    const 站级表 = [ {
      级: 0,
      名: "游客",
      能力: "★ 只能看首页。看不到图片、看不到私信",
      还差什么: "注册"
    }, {
      级: 1,
      名: "新号",
      能力: "★ 能看帖。★ 发帖沉底，私信石沉大海",
      还差什么: "签到 / 回帖攒积分"
    }, {
      级: 2,
      名: "正式会员",
      能力: "★ 能发帖、能私信。★★ 但会被查注册时间",
      还差什么: "★ 或者充值"
    }, {
      级: 3,
      名: "活跃会员",
      能力: "★★ 能看到隐藏版块、能看别人的资料",
      还差什么: '★ 需要有人"推荐"你'
    }, {
      级: 4,
      名: "资深",
      能力: '★★ 能看到"资源区"。★ 有人主动私你',
      还差什么: "★ 别人要认你"
    }, {
      级: 5,
      名: "大佬",
      能力: "★★★ 你说的话有人跟。★ 你能拉人进来",
      还差什么: "—"
    } ];
    const VIP档位 = [ {
      名: "签到",
      价: "免费",
      给什么: "★ 一天 1-2 分。★★ 要几个月才能升一级",
      代价: "时间"
    }, {
      名: "普通会员",
      价: "¥98/月",
      给什么: "★ 能发帖、能私信、去广告",
      代价: "★ 你的付款记录留下了"
    }, {
      名: "高级会员",
      价: "¥298/月",
      给什么: "★★ 能看到隐藏版块、能看别人资料",
      代价: "★ 更显眼"
    }, {
      名: "终身",
      价: "¥1988",
      给什么: "★★ 一次性买断全部权限（除资源区）",
      代价: "★ 一次性记录"
    }, {
      名: "赞助/邀请码",
      价: "¥500-5000",
      给什么: "★★★ 直接进门槛区。★ 有些站的邀请码本身就是货币",
      代价: "★★ 邀请码的来源会被追查"
    } ];
    const 积分来源 = [ {
      方式: "签到",
      给多少: "1-2 分/天",
      风险: "无"
    }, {
      方式: "发帖被加精",
      给多少: "★ 10-50 分",
      风险: "★ 原创度不够会被删"
    }, {
      方式: "回帖",
      给多少: "1 分/条（有上限）",
      风险: "★ 灌水会被扣"
    }, {
      方式: "充值",
      给多少: "★ 1 元 = 10-100 分",
      风险: "★ 留下付款记录"
    }, {
      方式: "推荐新人",
      给多少: "★ 20-100 分",
      风险: "★★ 新人出事你要负责"
    }, {
      方式: "发资源",
      给多少: "★★ 看质量，可能上百",
      风险: "★★★ 发假资源会封号 + 被挂"
    } ];
  },
  "./src/神奇手机/神奇手机/核心/话术功能.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      取功能: () => 取功能,
      抽功能: () => 抽功能,
      抽变体: () => 抽变体,
      接口说明: () => 接口说明,
      话术功能表: () => 话术功能表
    });
    const 话术功能表 = [ {
      键: "破冰",
      名: "开场",
      她把这件事做成了什么: "她给你一个极小的开口，等你接",
      通用变体: [ "只发一个词", "发一个表情", "发一句和当下完全无关的话", "问一个她已经知道答案的问题", "先说你，再顺势说她自己" ]
    }, {
      键: "试探",
      名: "试探",
      她把这件事做成了什么: "她在确认你的风险、能力和意图",
      通用变体: [ "问你叫什么、做什么的", "问你之前有没有过", "问你为什么找她（这句最重）", "从你说话的方式判断你是什么人", "看你有没有在撒谎" ]
    }, {
      键: "客套拒绝",
      名: "客气地不",
      她把这件事做成了什么: '她说了"不"，但门还开着',
      通用变体: [ '用"再说吧"拖延', "用第三方挡（家里/工作/身体）", "用一句模糊的话把决定权推回去", "不说不，但把时间往后推" ]
    }, {
      键: "真拒绝",
      名: "真的不",
      她把这件事做成了什么: "她关掉了这个可能",
      通用变体: [ "完全不回", "把话说死", "把你标记/拉黑", "用一个不可抗力（我结婚了）" ]
    }, {
      键: "同意",
      名: "可以",
      她把这件事做成了什么: "她给了继续下去的许可",
      通用变体: [ '说"行"', "不说行，但直接说下一步", "把时间地点定下来", "让你来做决定" ]
    }, {
      键: "升温",
      名: "往上走一步",
      她把这件事做成了什么: "她自己主动推进了一点",
      通用变体: [ "发一张照片", "说一句本可以不说的", "主动报告自己在做什么", "问你在不在", "说一句半真半假的挑逗" ]
    }, {
      键: "要钱",
      名: "提钱",
      她把这件事做成了什么: "她把需要的说出来，同时保住体面",
      通用变体: [ "说成一个理由（房租/家里/孩子）", '说成"帮我"而不是"付我"', "让你先报价", "用第三方（介绍人/担保）转达", '用礼物/转账的形式避开"价格"这个词' ]
    }, {
      键: "议价",
      名: "谈条件",
      她把这件事做成了什么: "她在确认这次怎么算",
      通用变体: [ "直接报价", "让你先说", "先拒绝一次再接受", "把范围划出来（只能做什么）", "给你一个更好的条件换更多的东西" ]
    }, {
      键: "边界",
      名: "划线",
      她把这件事做成了什么: "她说清哪里不能碰",
      通用变体: [ "直接说不做某项", "提前说好规矩", "用一个理由包住（我怕/我不习惯）", "到了那一步才拦" ]
    }, {
      键: "留后路",
      名: "给自己留门",
      她把这件事做成了什么: "她不让这件事变成死的",
      通用变体: [ "不删你，但也不理你", '说"看情况"', "保留一个她还能联系你的渠道", "事后不提，等你开口" ]
    }, {
      键: "出事",
      名: "出岔子",
      她把这件事做成了什么: "她撞上了现实的麻烦",
      通用变体: [ "突然不能来（家里/工作）", "被人看见了", "被查到记录", "身体出了问题", "有人开始问" ]
    }, {
      键: "事后",
      名: "做完之后",
      她把这件事做成了什么: "她给这段关系定了一个位置",
      通用变体: [ "变冷（她怕）", "变得更热（她要）", "保持原样（她无所谓）", "主动问你下次", "说一句让你摸不透的评价" ]
    }, {
      键: "消失",
      名: "结束",
      她把这件事做成了什么: "她用一种方式离开了",
      通用变体: [ "换头像但不删你", "注销", "已读不回，慢慢断", "留一句最后的，然后没了", "号还在，人换了" ]
    }, {
      键: "真话",
      名: "说真的",
      她把这件事做成了什么: "她把一件不打算说的事说了",
      通用变体: [ "用母语说（她平时不说母语）", "说得很快，像怕自己停", '说完立刻补一句"别当真"', "说完就哭", "说完就消失几天" ]
    } ];
    function 取功能(键) {
      return 话术功能表.find(x => x.键 === 键) ?? null;
    }
    function 抽功能() {
      return 话术功能表[Math.floor(Math.random() * 话术功能表.length)];
    }
    function 抽变体(键) {
      const f = 取功能(键);
      if (!f) return "";
      return f.通用变体[Math.floor(Math.random() * f.通用变体.length)];
    }
    const 接口说明 = {
      步骤: [ "① 抽功能（本文件）", "② 读地区视角", "③ 在地区条的 ③④⑥⑦⑨ 轴里找说法", "④ 用那个说法输出" ],
      测试: "这句话，一个当地人会说吗？",
      反例: [ "「在吗」× 德黑兰  → 波斯语没有这个说法，她会说 یه چیزی بگم", '「你请我吃饭吧」× 内罗毕 → 她会说 "utanisa kunisaidia?"（你能帮我吗）', '「随你」× 巴西 → 巴西人不会这么说，她会说 "você que sabe"' ]
    };
  },
  "./src/神奇手机/神奇手机/核心/镜像阶.ts"(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      判镜阶: () => 判镜阶,
      手机等级门槛: () => 手机等级门槛,
      未解锁阶: () => 未解锁阶,
      能调镜头: () => 能调镜头,
      还差什么: () => 还差什么,
      镜像阶表: () => 镜像阶表
    });
    var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./技能树 */ "./src/神奇手机/神奇手机/核心/技能树.ts");
    const 阶定义 = [ {
      阶: 4,
      名: "四阶 · 实时同屏视听穿透",
      技能: [ "全局视野", "改记录" ],
      范围: [ "公开", "私聊", "隐藏相册", "加密备忘录", "实时键盘同屏", "摄像头调取" ],
      描述: "手机克隆出目标完整系统，实时键盘打字即时可见、前后镜头与麦克风环境音已穿透拦截！"
    }, {
      阶: 3,
      名: "三阶 · 私密金库与相册穿透",
      技能: [ "她的手机", "检索" ],
      范围: [ "公开", "私聊", "隐藏相册", "加密备忘录", "草稿箱删除记录", "开房账单" ],
      描述: "已穿透目标隐藏私密相册（洗澡/贴身自拍）、加密备忘录、草稿箱删掉的真心话与打车开房账单！"
    }, {
      阶: 2,
      名: "二阶 · 通信会话私聊拦截",
      技能: [ "破译" ],
      范围: [ "公开", "私聊流", "最近通话" ],
      描述: "已拦截目标微信/Telegram私聊流，可看清她与丈夫、男友、老板的真实对话与争吵通话记录！"
    }, {
      阶: 1,
      名: "一阶 · 浅层小号与公开镜像",
      技能: [ "身份映射" ],
      范围: [ "社交小号", "未屏蔽朋友圈", "相册公开缩略图" ],
      描述: "已捕获目标社交小号、公开生活痕迹、常出没商圈打卡点与表面人设圈子！"
    } ];
    function 技能等级(名) {
      return ___WEBPACK_IMPORTED_MODULE_0__["技能树表"][名]?.手机等级 ?? 999;
    }
    const 镜像阶表 = 阶定义.map(x => ({
      ...x,
      手机等级: Math.min(...x.技能.map(技能等级))
    }));
    const 未解锁阶 = {
      阶: 0,
      名: "未满足门槛（需手机Lv15或身份映射）",
      技能: [ "身份映射" ],
      手机等级: 15,
      范围: [],
      描述: "硬件算力不足，无法建立底层镜像克隆通道！需要提升手机等级或点亮网系技能。"
    };
    function 判镜阶(等级, 技能) {
      const L = Number(等级 ?? 1);
      const s = 技能 ?? {};
      const 有 = k => Number(s[k] ?? 0) >= 1;
      for (const 阶 of 镜像阶表) {
        if (阶.技能.some(有)) return 阶;
        if (L >= 手机等级门槛(阶.阶)) return 阶;
      }
      return 未解锁阶;
    }
    function 手机等级门槛(阶) {
      const x = 镜像阶表.find(y => y.阶 === 阶);
      if (!x) return 0;
      return x.手机等级;
    }
    function 能调镜头(阶) {
      return 阶 >= 4;
    }
    function 还差什么(等级, 技能) {
      const 现阶 = 判镜阶(等级, 技能).阶;
      if (现阶 >= 4) return "★ 已到顶（四阶）";
      const 下 = 镜像阶表.find(x => x.阶 === 现阶 + 1);
      if (!下) return "";
      const 缺技能 = 下.技能.filter(k => Number(技能?.[k] ?? 0) < 1);
      const 部分 = [];
      if (缺技能.length) 部分.push(`点亮【${缺技能.join("】或【")}】`);
      const 差 = 下.手机等级 - Number(等级 ?? 1);
      if (差 > 0) 部分.push(`或升到 Lv${下.手机等级}`);
      return 部分.join("，") || "★ 已满足";
    }
  },
  "./src/神奇手机/神奇手机/脚本/计算引擎/index.ts"(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {
      try {
        __webpack_require__.r(__webpack_exports__);
        var _schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../schema */ "./src/神奇手机/神奇手机/schema.ts");
        var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../核心/计算 */ "./src/神奇手机/神奇手机/核心/计算.ts");
        var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../核心/法律 */ "./src/神奇手机/神奇手机/核心/法律.ts");
        var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../核心/生成器 */ "./src/神奇手机/神奇手机/核心/生成器.ts");
        var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../核心/衰减 */ "./src/神奇手机/神奇手机/核心/衰减.ts");
        var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../核心/平台库 */ "./src/神奇手机/神奇手机/核心/平台库.ts");
        var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../核心/镜像阶 */ "./src/神奇手机/神奇手机/核心/镜像阶.ts");
        var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../核心/等级门 */ "./src/神奇手机/神奇手机/核心/等级门.ts");
        var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../核心/平台等级 */ "./src/神奇手机/神奇手机/核心/平台等级.ts");
        var ___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../核心/平台特色 */ "./src/神奇手机/神奇手机/核心/平台特色.ts");
        var ___WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../核心/论坛生态 */ "./src/神奇手机/神奇手机/核心/论坛生态.ts");
        var ___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../核心/她的数值 */ "./src/神奇手机/神奇手机/核心/她的数值.ts");
        var ___WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../核心/检定 */ "./src/神奇手机/神奇手机/核心/检定.ts");
        var _Roll__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../核心/开局Roll */ "./src/神奇手机/神奇手机/核心/开局Roll.ts");
        var ___WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../核心/健壮数字 */ "./src/神奇手机/神奇手机/核心/健壮数字.ts");
        var ___WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../核心/属性感受 */ "./src/神奇手机/神奇手机/核心/属性感受.ts");
        var ___WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../核心/技能树 */ "./src/神奇手机/神奇手机/核心/技能树.ts");
        var ___WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../核心/意图型 */ "./src/神奇手机/神奇手机/核心/意图型.ts");
        var ___WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../核心/平台约束 */ "./src/神奇手机/神奇手机/核心/平台约束.ts");
        var ___WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../核心/任务系统 */ "./src/神奇手机/神奇手机/核心/任务系统.ts");
        var ___WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../核心/加速与充值 */ "./src/神奇手机/神奇手机/核心/加速与充值.ts");
        var ___WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../核心/话术功能 */ "./src/神奇手机/神奇手机/核心/话术功能.ts");
        var ___WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../核心/属性系统 */ "./src/神奇手机/神奇手机/核心/属性系统.ts");
        await waitGlobalInitialized("Mvu");
        const 日志 = msg => console.info(`[计算引擎] ${msg}`);
        function 取数据(message_id) {
          const vars = Mvu.getMvuData({
            type: "message",
            message_id
          });
          return _schema__WEBPACK_IMPORTED_MODULE_0__.Schema.parse(_.get(vars, "stat_data"));
        }
        function 存数据(data, message_id) {
          return Mvu.replaceMvuData({
            stat_data: data
          }, {
            type: "message",
            message_id
          });
        }
        function 取属性(d) {
          const 伤 = d.玩家?.伤?.程度 ?? 0;
          const 病 = d.玩家?.病?.状态 ?? "未感染";
          const pep = d.玩家?.病?.阻断药剩 ?? 0;
          return (0, ___WEBPACK_IMPORTED_MODULE_22__["计算有效属性"])(d.属性 ?? {}, {
            伤程度: 伤,
            病状态: 病,
            PEP剩余天数: pep
          });
        }
        function 取技能(d) {
          const s = d.技能 ?? {};
          const 键 = [ "尺寸自由", "自动适配", "凸点", "倒钩", "分叉", "多物", "硬度控制", "硬度翻倍", "永久勃起", "持久控制", "马拉松", "射精控制", "边缘", "长度", "宫口", "粗细", "体味", "猫薄荷", "气味上瘾", "快感注入", "冰毒", "成瘾", "催情精液", "内射印记", "催乳", "孕味", "通用语言", "传送", "感应", "读心", "湿润", "泛滥", "敏感发现", "高潮触发", "高潮延迟", "松紧", "快感读数", "真假", "欲望", "性史", "气味", "体液", "印记", "场所", "束缚", "调教", "记录", "借种", "生育控制", "免疫艾滋", "免疫其他", "不留痕", "无痛", "耐力", "接入", "无痕浏览", "身份映射", "破译", "第一印象", "小号", "信誉伪造", "影子档案", "习惯", "口碑", "当众", "引荐" ];
          const out = {};
          for (const k of 键) out[k] = s[k] ?? 0;
          return out;
        }
        function 取她(d, 代号) {
          const p = d.人物?.[代号];
          if (!p) return null;
          return {
            代号,
            阈值: p.性?.阈值 ?? 5,
            经验度: p.性?.经验度 ?? 5,
            年龄: p.外貌?.年龄 ?? 25,
            偏好尺寸: p.性?.偏好尺寸 ?? 14.5,
            湿润度: p.性?.湿润度 ?? 3,
            已高潮次数: p.床?.已高潮次数 ?? 0
          };
        }
        const 动作表 = [ [ 1, "看" ], [ 10, "查" ], [ 20, "删" ], [ 30, "进" ], [ 40, "说" ], [ 50, "走" ], [ 60, "改" ], [ 70, "模糊" ], [ 80, "无痕" ], [ 90, "不在" ], [ 100, "代笔" ] ];
        function 应解锁(等级) {
          return 动作表.filter(([lv]) => 等级 >= lv).map(([, a]) => a);
        }
        function 取参数(串) {
          const out = {};
          for (const kv of 串.matchAll(/([\w\u4e00-\u9fa5]+)="([^"]*)"/g)) out[kv[1]] = kv[2];
          return out;
        }
        eventOn(tavern_events.MESSAGE_RECEIVED, async message_id => {
          const [msg] = getChatMessages(message_id);
          if (!msg?.message) return;
          let text = msg.message;
          const d = 取数据(message_id);
          let 改动了 = false;
          const 生成re = /<生成人物\s+地区="([^"]+)"(?:\s+原型="([^"]+)")?\s*\/>/g;
          for (const m of [ ...text.matchAll(生成re) ]) {
            const 地区 = m[1];
            const 意图 = (0, ___WEBPACK_IMPORTED_MODULE_17__["抽意图"])();
            const g = (0, ___WEBPACK_IMPORTED_MODULE_3__["生成人物"])(地区, m[2], 意图);
            const 代号 = 地区 + "-" + Math.random().toString(36).slice(2, 6);
            const 性 = (0, ___WEBPACK_IMPORTED_MODULE_11__["抽她的性数据"])(地区, g.外貌.年龄, g.背景.动机, g.性格型.名);
            const 防 = (0, ___WEBPACK_IMPORTED_MODULE_11__["抽她的防御"])(地区, g.背景.动机, g.性格型.名, 性.经验度);
            const 格 = (0, ___WEBPACK_IMPORTED_MODULE_11__["抽她的体格"])(地区, g.外貌.年龄, g.外貌.体型);
            const 难 = (0, ___WEBPACK_IMPORTED_MODULE_11__["她的难度"])(防, 性);
            d.人物 = d.人物 ?? {};
            d.人物[代号] = {
              代号,
              地区,
              来源: 地区,
              原型: g.背景.原型,
              动机: g.背景.动机,
              处境: g.背景.处境,
              退路: g.背景.退路,
              冲突: g.背景.冲突,
              具体细节: g.具体细节,
              外貌: {
                ...g.外貌,
                特征: g.外貌.瑕疵.join("、")
              },
              性: {
                经验度: 性.经验度,
                阈值: 性.阈值,
                敏感度: 性.敏感度,
                体力: 性.体力,
                偏好尺寸: 性.偏好尺寸,
                湿润度: 性.湿润度,
                敏感点: 性.敏感点,
                禁区: 性.禁区,
                癖好: g.性.癖好,
                主动类型: g.性.主动类型,
                高潮表现: 性.高潮表现,
                事后: 性.事后
              },
              防御: {
                戒备: 防.戒备,
                处境紧: 防.处境紧,
                判断力: 防.判断力,
                圈子门槛: 防.圈子门槛
              },
              体格: {
                身高: 格.身高,
                体重: 格.体重,
                力量: 格.力量,
                敏捷: 格.敏捷,
                意志: 格.意志,
                嗓门: 格.嗓门
              },
              难度: 难,
              战力: (0, ___WEBPACK_IMPORTED_MODULE_11__["她的战力"])(格),
              打字习惯: g.打字习惯,
              主动度: g.主动度,
              尺度节奏: g.尺度节奏,
              性格型: g.性格型.名,
              八轴: g.性格型.八轴,
              扩展: {
                语域: g.扩展.语域,
                口音: g.扩展.口音,
                混合语: g.扩展.混合语,
                沉默方式: g.扩展.沉默方式,
                年代印记: g.扩展.年代印记.出生 + "｜" + g.扩展.年代印记.印记,
                历史事件: g.扩展.历史事件,
                个人纪年: g.扩展.个人纪年,
                作息: g.扩展.作息,
                主要媒介: g.扩展.主要媒介,
                媒介能看见: g.扩展.媒介能力.能看见,
                媒介看不见: g.扩展.媒介能力.看不见,
                设备: g.扩展.设备,
                媒介失真: g.扩展.媒介失真,
                手机型号: g.扩展.手机型号,
                车: g.扩展.车,
                住所: g.扩展.住所,
                随身物: g.扩展.随身物,
                宠物: g.扩展.宠物,
                谁的地盘: g.扩展.谁的地盘,
                谁能进: g.扩展.谁能进,
                谁在看: g.扩展.谁在看,
                私密度: g.扩展.私密度,
                慢病: g.扩展.慢病,
                精神: g.扩展.精神,
                药物: g.扩展.药物,
                成瘾: g.扩展.成瘾,
                性病携带: g.扩展.性病携带,
                生育实况: g.扩展.生育实况,
                涉毒成瘾: g.扩展.涉毒成瘾,
                陷阱设局: g.扩展.陷阱设局.类型,
                伏击战力: g.扩展.陷阱设局.战力,
                伏击详情: g.扩展.陷阱设局.详情,
                骗局: g.扩展.骗局.类型,
                勒索链条: g.扩展.勒索链条,
                交易链: g.扩展.交易链,
                涉罪: g.扩展.涉罪,
                消失方式: g.扩展.消失方式,
                长线终点: g.扩展.长线终点
              },
              平台: (0, ___WEBPACK_IMPORTED_MODULE_5__["该地区的平台"])(地区).slice(0, 30).map(x => x.名),
              关系进度: 0,
              线程温度: "温",
              内容开放: 0,
              人的开放: 0,
              玩法开放: 0,
              圈子: [],
              权力位置: "平等",
              近况: "",
              最后互动: d.世界.日期 + " " + d.世界.时刻,
              已听过声音: false,
              已见过真人: false,
              评价: "未评价",
              已上过: false,
              床: {
                已高潮次数: 0,
                已完成发数: 0
              },
              私密档案: {
                配偶: {
                  姓名: g.背景.处境.includes("夫") || g.背景.家庭.includes("夫") || Math.random() < .6 ? "丈夫" : "无",
                  关系: g.背景.处境.includes("夫") || g.背景.家庭.includes("夫") || Math.random() < .6 ? "已婚" : "单身",
                  婚姻实况: g.背景.处境 || "同床异梦",
                  对丈夫态度: "表面维系体面，内里极为冷淡疲惫"
                },
                初夜: {
                  时间: `${Math.max(18, g.外貌.年龄 - 5)}岁时期`,
                  对象: "初恋男友",
                  关系: "学生时代恋爱",
                  怎么发生的: "出租屋内情难自禁，动作生涩急躁破损",
                  当时感觉: "下体撕裂剧痛远大于快感，伴随害怕与不适"
                },
                最近性行为: {
                  时间: "近期深夜",
                  对象: "配偶/前任",
                  关系: "夫妻/伴侣",
                  怎么发生的: "例行公事式交差，全程不到十分钟",
                  当时感觉: "干涩无感，麻木等待结束"
                },
                最佳性行为: {
                  时间: "未知",
                  对象: "等待开发",
                  关系: "未知",
                  怎么发生的: "尚未体验过真正的灵魂绝顶",
                  当时感觉: "未知"
                },
                出轨记录: [],
                致命把柄: [ g.具体细节, "微信偷情打掩护证据" ],
                遮掩手段: "秒删聊天记录并设为免打扰",
                拦截记录: []
              }
            };
            const 全 = d.人物[代号];
            const 字段 = JSON.stringify({
              代号: 全.代号,
              地区: 全.地区,
              原型: 全.原型,
              动机: 全.动机,
              处境: 全.处境,
              退路: 全.退路,
              冲突: 全.冲突,
              具体细节: 全.具体细节,
              外貌: 全.外貌,
              性: 全.性,
              防御: 全.防御,
              体格: 全.体格,
              难度: 全.难度,
              战力: 全.战力,
              性格型: 全.性格型,
              八轴: 全.八轴,
              打字习惯: 全.打字习惯,
              主动度: 全.主动度,
              尺度节奏: 全.尺度节奏,
              扩展: 全.扩展
            }).replace(/\n/g, " ");
            text = text.replace(m[0], `<新人物 代号="${代号}" 难度="${难}" 阈值="${性.阈值}" 偏好尺寸="${性.偏好尺寸}"\n` + `第一眼="${(0, 
            ___WEBPACK_IMPORTED_MODULE_3__["生成第一眼资料"])(地区).replace(/\n/g, "｜")}"\n` + `★ 全部字段（★ 照抄进 <UpdateVariable>，一个类型都不许改）：\n${字段}\n` + `★ 敏感点 和 禁区 是【数组】，写成 ["A","B"] 这种；圈子 也是数组。/>`);
            改动了 = true;
            日志(`生成人物：${代号}（难度 ${难}，阈值 ${性.阈值}）`);
            if (g.修正.length > 0) 日志(`  ★ 兼容修正 ×${g.修正.length}：${g.修正.join("；")}`);
          }
          function 增加手机经验(d, 经验值, 积分值, 来源) {
            if (!d.手机 || 经验值 <= 0) return;
            const 旧等级 = d.手机.等级 ?? 1;
            const u = (0, ___WEBPACK_IMPORTED_MODULE_4__["计算升级"])({
              等级: 旧等级,
              经验: d.手机.经验 ?? 0,
              曾达最高: d.手机.曾达最高 ?? 1,
              本次获得: 经验值
            });
            d.手机.等级 = u.新等级;
            d.手机.经验 = u.新经验;
            d.手机.曾达最高 = Math.max(d.手机.曾达最高 ?? 1, u.新等级);
            if (u.新等级 > 旧等级) {
              const 升了几级 = u.新等级 - 旧等级;
              d.手机.属性点 = (d.手机.属性点 ?? 0) + 升了几级;
              日志(`🎉 手机升级！Lv${旧等级} → Lv${u.新等级}，获得属性点 +${升了几级}！`);
              if (u.解锁了 && u.解锁了.length > 0) {
                日志(`★ 新解锁技能门槛：${u.解锁了.join("、")}`);
              }
            }
            if (积分值 > 0) {
              if (!d.积分) d.积分 = {
                总: 0,
                可用: 0
              };
              d.积分.总 = (d.积分.总 ?? 0) + 积分值;
              d.积分.可用 = (d.积分.可用 ?? 0) + 积分值;
            }
            日志(`【成长】${来源}：+${经验值} 手机经验${积分值 > 0 ? ` / +${积分值} 积分` : ""}`);
          }
          const 计算re = /<计算\s+([^>]*?)\/>/g;
          for (const m of [ ...text.matchAll(计算re) ]) {
            const 参 = 取参数(m[1]);
            const 类型 = 参.类型;
            const 对象 = 参.对象;
            const a = 取属性(d);
            const s = 取技能(d);
            let 结果 = "";
            {
              const 门 = ___WEBPACK_IMPORTED_MODULE_7__["等级门表"].find(x => x.类 === "引擎" && x.名 === 类型);
              const 等级 = Number(d.手机?.等级 ?? 1);
              if (门 && 等级 < 门.等级) {
                const 替代 = ___WEBPACK_IMPORTED_MODULE_7__["等级门表"].filter(x => x.类 === "引擎" && x.等级 <= 等级 && x.名 !== 类型).sort((x, y) => y.等级 - x.等级)[0];
                结果 = `<结果 类型="${类型}" 未到阶段="true"` + ` 需要="Lv${门.等级}（${门.技能}）"` + ` 他现在="Lv${等级}"` + ` 还差="${门.等级 - 等级}级"` + ` 说明="他还做不了这件事。★ 写「他试了一下，手机没有反应」，不要写成功。"` + (替代 ? ` 现在能做="${替代.名}"` : "") + `/>`;
                日志(`⛔ 等级门拦下：${类型}（要 Lv${门.等级}，现在 Lv${等级}）`);
                if (结果) {
                  text = text.replace(m[0], 结果);
                  改动了 = true;
                }
                continue;
              }
            }
            if (类型 === "床上") {
              const 她 = 对象 ? 取她(d, 对象) : null;
              if (!她) {
                结果 = `<结果 类型="床上" 错误="找不到人物 ${对象}"/>`;
              } else {
                const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["计算床上"])(a, s, 她, {
                  前戏分钟: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.前戏) || 0,
                  选的尺寸: 参.尺寸 ? (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.尺寸) : undefined,
                  戴套: 参.戴套 === "true"
                });
                const p = d.人物[对象];
                const 结 = (0, ___WEBPACK_IMPORTED_MODULE_1__["计算结算"])({
                  床上: r,
                  是新人: !p.已上过,
                  是新地区: !d.地区?.[p.地区]?.已到过,
                  是新类型: false,
                  她的难度: p.难度 ?? 5,
                  已上过: p.已上过,
                  技能结算加成: s.口碑
                });
                const 轴 = r.时间轴.map(t => `${t.分钟}′${t.事件}`).join("→");
                const 逐发 = r.发.map(f => `第${f.第几发}发:${f.你的分钟}分/她需${f.她需要分钟}分/她到${f.她这发高潮次数}次/不应期${f.不应期分钟}分`).join("｜");
                结果 = [ `<结果 类型="床上" 对象="${对象}"`, ` 共="${r.你射精次数}发"`, ` 她高潮="${r.她高潮次数}次"`, ` 总时长="${r.总时长分钟}分钟"`, ` 尺寸差="${r.尺寸差}cm"`, ` 逐发="${逐发}"`, ` 时间轴="${轴}"`, ` 停止="${r.停下的原因}"`, ` 结局="${r.结果}"`, ` 经验="${结.手机经验}"`, ` 积分="${结.积分}"/>` ].join("");
                d.判定记录 = [ ...d.判定记录 ?? [], {
                  回合: `${d.世界.日期} ${d.世界.时刻}`,
                  类型: "床上",
                  我方值: r.你射精次数,
                  对方值: r.她高潮次数,
                  差值: r.你射精次数 - r.她高潮次数,
                  结果: r.结果
                } ].slice(-30);
                p.床 = {
                  已高潮次数: (p.床?.已高潮次数 ?? 0) + r.她高潮次数,
                  已完成发数: (p.床?.已完成发数 ?? 0) + r.你射精次数
                };
                p.评价 = r.她高潮次数 >= 4 ? "五星" : r.她高潮次数 >= 2 ? "四星" : r.她高潮次数 >= 1 ? "普通" : "差评";
                if (结.手机经验 > 0) {
                  const 旧等级 = d.手机.等级;
                  const u = (0, ___WEBPACK_IMPORTED_MODULE_4__["计算升级"])({
                    等级: 旧等级,
                    经验: d.手机.经验,
                    曾达最高: d.手机.曾达最高,
                    本次获得: 结.手机经验
                  });
                  d.手机.等级 = u.新等级;
                  d.手机.经验 = u.新经验;
                  d.手机.曾达最高 = Math.max(d.手机.曾达最高, u.新等级);
                  d.手机.属性点 = (d.手机.属性点 ?? 0) + (u.新等级 - 旧等级);
                  if (u.解锁了.length > 0) {
                    日志(`★ Lv${u.新等级} 新开的技能门槛：${u.解锁了.join("、")}（★ 还要花积分才点得动）`);
                  }
                }
                d.积分.总 += 结.积分;
                d.积分.可用 += 结.积分;
                if (!p.已上过) p.已上过 = true;
                日志(`床上：${r.你射精次数} 发，她高潮 ${r.她高潮次数} 次 → +${结.手机经验} 经验 / +${结.积分} 积分`);
              }
            } else if (类型 === "打架") {
              const p = 对象 ? d.人物[对象] : null;
              const 我 = (0, ___WEBPACK_IMPORTED_MODULE_1__["算战力"])(a.强壮, a.体力, a.气场, a.时机);
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算打架"])({
                我的战力: 我,
                对方人数: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.人数) || 1,
                对方单人战力: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.对方战力) || (p?.战力 ?? 3),
                有武器: 参.武器 === "true",
                地形不利: 参.地形 === "true",
                被下药: 参.下药 === "true",
                技能无痛: s.无痛,
                技能到场: s.传送
              });
              if (r.我的伤 > 0) {
                d.玩家.伤 = {
                  程度: r.我的伤,
                  恢复天数: r.恢复天数,
                  起因: "被打"
                };
              }
              结果 = `<结果 类型="打架" 我的战力="${r.我的}" 对方="${r.对方}" 比="${r.比}" ` + `档="${r.档}" 我伤="${r.我的伤}" 他伤="${r.对方伤}" ` + `恢复="${r.恢复天数}天" 后果="${r.后果}" 脱身="${r.脱身}"/>`;
              d.判定记录 = [ ...d.判定记录 ?? [], {
                回合: `${d.世界.日期} ${d.世界.时刻}`,
                类型: "打架",
                我方值: r.我的,
                对方值: r.对方,
                差值: r.比,
                结果: r.档
              } ].slice(-30);
            } else if (类型 === "抗药") {
              const 药名 = 参.药物 ?? "";
              const 药强 = Number(药名) || ___WEBPACK_IMPORTED_MODULE_1__["药物对照"].find(x => 药名.includes(x.名))?.强度 || 6;
              const 第几口 = Number(参.口 ?? 参.几口 ?? 3) || 3;
              const 间隔 = Number(参.间隔 ?? 15) || 15;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算抗药"])(a.体力, a.强壮, a.气场, 药强, s.免疫艾滋, {
                几口: 第几口,
                间隔分钟: 间隔
              });
              结果 = `<结果 类型="抗药" 口="${第几口}" 累积药量="${r.累积药量}" ` + `抗性="${r.抗性}" 档="${r.档}" ` + `失意识="${r.失去意识分钟}分钟" 醒来="${r.醒来}"` + (r.口?.length ? ' 逐口="' + r.口.map(x => `第${x.第几口}口:药${x.这口药量}/抗${x.抗性}/差${x.差}`).join("｜") + '"' : "") + `/>`;
            } else if (类型 === "识破") {
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算识破"])(a.读人, a.感知, a.时机, (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.完成度) || 80, s.破译, s.身份映射, s.快感读数);
              const 识破成功 = r.结论.includes("识破") || r.能看出.length > 0;
              const 识破经验 = 识破成功 ? 150 : 30;
              const 识破积分 = 识破成功 ? 3 : 0;
              增加手机经验(d, 识破经验, 识破积分, `识破(${r.结论})`);
              结果 = `<结果 类型="识破" 洞察="${r.洞察}" 骗局="${r.骗局}" ` + `能看出="${r.能看出.join("｜")}" 结论="${r.结论}"/>`;
            } else if (类型 === "议价") {
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算议价"])(a.气场, a.读人, a.魅力, (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.她的价) || 5, s.信誉伪造);
              const 压价多 = r.压价率 >= 20;
              const 议价经验 = 压价多 ? 90 : 50;
              const 议价积分 = 压价多 ? 2 : 1;
              增加手机经验(d, 议价经验, 议价积分, `议价(${r.她的反应})`);
              结果 = `<结果 类型="议价" 你的价="${r.你的价}" 她的价="${r.她的价}" ` + `压价="${r.压价率}%" 实价="${r.最终价}" 反应="${r.她的反应}"/>`;
            } else if (类型 === "破冰") {
              const p = 对象 ? d.人物[对象] : null;
              let 命中 = a.魅力 * 3.5 + a.读人 * 3.5 + ((0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.信息差) || 0) * .2;
              if (p) {
                命中 += (p.防御?.处境紧 ?? 5) * 1.5;
                命中 -= (p.防御?.戒备 ?? 5) * 2.5;
              }
              if (s.通用语言 > 0) 命中 += s.通用语言 * 8;
              if (s.第一印象 > 0) 命中 += s.第一印象 * 5;
              if (s.接入 >= 3) 命中 += 8;
              命中 = Math.max(5, Math.min(98, Math.round(命中)));
              const 反应 = 命中 >= 85 ? "她主动问了三个问题，还发了照片" : 命中 >= 70 ? "她回了，还多问了一句" : 命中 >= 50 ? "她回了，很短，客套" : 命中 >= 30 ? '她回了"嗯"或表情' : 命中 >= 15 ? "已读不回" : "她没点开，或者直接删了";
              结果 = `<结果 类型="破冰" 命中率="${命中}%" 她的反应="${反应}"/>`;
            } else if (类型 === "关系") {
              const p = d.人物?.[对象];
              if (!p) {
                结果 = `<结果 类型="关系" 错误="找不到 ${对象}"/>`;
              } else {
                const 下 = Math.min(10, Math.floor(p.关系进度) + 1);
                const 锚 = ___WEBPACK_IMPORTED_MODULE_1__["关系锚点"].find(x => x.到 === 下);
                结果 = `<结果 类型="关系" 对象="${对象}" 当前="${p.关系进度}" ` + `下一格="${下}" 要做什么="${锚?.锚点 ?? "已到顶"}"/>`;
              }
            } else if (类型 === "夺位") {
              const 手段 = 参.手段 || "正取";
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算夺位"])(手段, (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.门槛) || 5, a.气场, a.魅力, (0, 
              ___WEBPACK_IMPORTED_MODULE_1__["算战力"])(a.强壮, a.体力, a.气场, a.时机), s.信誉伪造, s.影子档案);
              结果 = `<结果 类型="夺位" 能拿="${r.能拿}" 耗时="${r.耗时天数}天" ` + `他们="${r.他们怎么看}" 后患="${r.后患}"/>`;
              if (r.能拿 && 参.位子) {
                d.位子 = d.位子 ?? {};
                d.位子[参.位子] = {
                  层级: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.层级) || 1,
                  持有者: "你",
                  是你吗: true,
                  怎么拿的: 手段,
                  他们怎么看: r.他们怎么看
                };
                if (手段 === "硬闯") d.声誉.值 = Math.max(0, (d.声誉.值 ?? 50) - 15); else if (手段 === "夺") d.声誉.值 = Math.max(0, (d.声誉.值 ?? 50) - 5);
                日志(`夺位成功：【${参.位子}】手段=${手段} 他们=${r.他们怎么看}`);
              }
            } else if (类型 === "临检") {
              const 场 = 参.场所 ?? "";
              const 显 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.显眼度) || ___WEBPACK_IMPORTED_MODULE_2__["显眼度表"].find(x => 显.includes(x.档.slice(0, 4)))?.值 || 1;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_2__["算临检"])(参.地区 ?? d.世界?.地区 ?? "", 场, 显, d.手机.等级);
              结果 = `<结果 类型="临检" 概率="${r.概率}%" 骰="${r.骰}" ` + `碰上="${r.碰上}" 后果="${r.后果}"/>`;
              if (r.碰上) d.手机.暴露感 = Math.min(100, (d.手机.暴露感 ?? 0) + 8);
            } else if (类型 === "报警") {
              let 吃亏 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.吃亏) || 0;
              if (!吃亏 && 参.因) {
                const 因 = String(参.因);
                for (const x of ___WEBPACK_IMPORTED_MODULE_2__["报警诱因"]) {
                  if (因.includes(x.因.slice(0, 3))) 吃亏 = Math.max(吃亏, x.权重);
                }
              }
              if (!吃亏) 吃亏 = 12;
              const 人 = 对象 ? d.人物?.[对象] : null;
              const 温 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.温度) || (人 ? Math.max(-1, Math.min(1, ((人.关系?.温度 ?? 50) - 50) / 50)) : 0);
              let 性 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.性格) || 0;
              if (!性 && 人?.性格) {
                for (const x of ___WEBPACK_IMPORTED_MODULE_2__["性格修正"]) {
                  if (String(人.性格).includes(x.性格.slice(0, 3))) 性 += x.修正;
                }
              }
              const r = (0, ___WEBPACK_IMPORTED_MODULE_2__["算报警"])(吃亏, 温, 性, 参.地区 ?? d.世界?.地区 ?? "");
              结果 = `<结果 类型="报警" 概率="${r.概率}%" 骰="${r.骰}" ` + `报警="${r.报警}" 她怎么说="${r.她怎么说}"/>`;
              if (r.报警) {
                d.手机.暴露感 = Math.min(100, (d.手机.暴露感 ?? 0) + 15);
              }
            } else if (类型 === "立案") {
              const 有证据 = 参.证据 === "true" || 参.证据 === true || 参.证据 === "有";
              const 说得清 = 参.说清楚 === "true" || 参.说清楚 === true || 参.说清楚 === "是";
              const 资源 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.资源) || .3;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_2__["算立案"])(参.地区 ?? d.世界?.地区 ?? "", 有证据, 说得清, 资源);
              结果 = `<结果 类型="立案" 概率="${r.概率}%" 骰="${r.骰}" ` + `立案="${r.立案}" 说明="${r.说明}"/>`;
              if (r.立案) {
                d.手机.暴露感 = Math.min(100, (d.手机.暴露感 ?? 0) + 20);
              }
            } else if (类型 === "刑罚") {
              const 现金 = Number(d.玩家?.现金) || 2e4;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_2__["算刑罚"])(参.地区 ?? d.世界?.地区 ?? "", 参.罪 ?? "嫖娼", 现金);
              结果 = `<结果 类型="刑罚" 地区="${r.地区}" 罪="${r.罪}" ` + `罚款="${r.罚款}" 说明="${r.说明}"/>`;
            } else if (类型 === "养伤") {
              const 伤 = d.玩家.伤 ?? {};
              if (!伤.程度 || 伤.恢复天数 <= 0) {
                结果 = `<结果 类型="养伤" 说明="没有伤 —— 或者已经好了"/>`;
              } else {
                const 剩 = Math.max(0, 伤.恢复天数 - 1);
                const 好了 = 剩 === 0;
                d.玩家.伤 = {
                  ...伤,
                  恢复天数: 剩,
                  程度: 好了 ? 0 : 伤.程度
                };
                const 说 = 好了 ? "★ 好了。★ 但疤留下了 —— 而疤会被人看见" : `还剩 ${剩} 天。★ 这期间体力、强度都受影响`;
                结果 = `<结果 类型="养伤" 剩="${剩}" 好了="${好了}" 说明="${说}"/>`;
              }
            } else if (类型 === "疾病") {
              const 带病 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.带病) || ___WEBPACK_IMPORTED_MODULE_1__["带病概率"].find(x => 参.情况?.includes(x.情况))?.概率 || 15;
              const 系数 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.系数) || ___WEBPACK_IMPORTED_MODULE_1__["行为系数"].find(x => 参.行为?.includes(x.行为))?.系数 || 1;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算疾病"])(带病, 系数, s.免疫艾滋);
              结果 = `<结果 类型="疾病" 概率="${r.概率}%" 骰="${r.骰}" ` + `感染="${r.感染}" 说明="${r.说明}"/>`;
              if (r.感染) {
                d.玩家.病 = {
                  状态: "潜伏",
                  是哪种: 参.病 ?? "未查明",
                  从谁: 对象 ?? "未知",
                  发现于: d.世界.日期,
                  感染进度: 1,
                  治疗进度: 0,
                  阻断药剩: 0
                };
              }
            } else if (类型 === "吃药") {
              const 是阻断 = 参.药 !== "特效药";
              const 病 = d.玩家.病 ?? {};
              if (病.状态 === "未感染" || !病.状态) {
                结果 = `<结果 类型="吃药" 说明="他没有感染的记录 —— 药是白吃的"/>`;
              } else {
                const 无副作用 = s.免疫艾滋 >= 2;
                const 加 = 是阻断 ? 85 : 95;
                const 新治疗 = Math.min(100, (病.治疗进度 ?? 0) + 加);
                const 痊愈 = 新治疗 >= 100;
                d.玩家.病 = {
                  ...病,
                  治疗进度: 新治疗,
                  状态: 痊愈 ? "已治愈" : 病.状态,
                  阻断药剩: 是阻断 && !无副作用 ? 28 : 病.阻断药剩 ?? 0
                };
                const 副 = 无副作用 ? "（免疫药物，无副作用）" : "★ 28 天：恶心、乏力、头晕。★★ 这期间体力 −20%，不应期 +50%";
                结果 = `<结果 类型="吃药" 药="${是阻断 ? "阻断药" : "特效药"}" ` + `治疗进度="${新治疗}" 痊愈="${痊愈}" 副作用="${副}"/>`;
              }
            } else if (类型 === "病程") {
              const 病 = d.玩家.病 ?? {};
              if (病.状态 === "潜伏" || 病.状态 === "已发病") {
                const 新感染 = Math.min(100, (病.感染进度 ?? 0) + 1);
                const 发病 = 新感染 >= 100;
                d.玩家.病 = {
                  ...病,
                  感染进度: 新感染,
                  状态: 发病 ? "已发病" : "潜伏"
                };
                if (病.阻断药剩 > 0) d.玩家.病.阻断药剩 = Math.max(0, 病.阻断药剩 - 1);
                const 说 = 发病 ? "★★★ 发病了。他可以瞒，但瞒不了太久" : "★ 还在潜伏。★★ 他自己不知道 —— 这就是最要命的地方";
                结果 = `<结果 类型="病程" 感染进度="${新感染}" 发病="${发病}" 说明="${说}"/>`;
              } else {
                结果 = `<结果 类型="病程" 说明="没有在跑的病程"/>`;
              }
            } else if (类型 === "生育") {
              const 概率 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.概率) || ___WEBPACK_IMPORTED_MODULE_1__["受孕概率"].find(x => 参.情况?.includes(x.情况))?.概率 || 15;
              const 意愿 = 参.意愿 === "播种" || 参.播种 === "true" ? "播种" : 参.意愿 === "避孕" || 参.避孕 === "true" ? "避孕" : undefined;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_1__["算生育"])(概率, s.生育控制, d.世界.日期, 意愿, s.借种 ?? 0);
              结果 = `<结果 类型="生育" 概率="${r.概率}%" 中="${r.感染}" ` + `判定日="${r.判定日}" 说明="${r.说明}"/>`;
              if (r.感染) {
                d.生育线 = [ ...d.生育线 ?? [], {
                  状态: "疑似",
                  是谁的: 对象 ?? "未知",
                  判定日: r.判定日,
                  记录于: d.世界.日期
                } ];
              }
            } else if (类型 === "暴露") {
              const 事 = 参.事 ?? "";
              const 涨 = ___WEBPACK_IMPORTED_MODULE_1__["暴露涨"].find(x => 事.includes(x.事.slice(0, 3)));
              const 降 = ___WEBPACK_IMPORTED_MODULE_1__["暴露降"].find(x => 事.includes(x.事.slice(0, 3)));
              const 变化 = 涨 ? Number(涨.涨.replace(/[+／次]/g, "")) || 5 : 降 ? -(Number(降.降.replace(/[−／周]/g, "")) || 5) : 0;
              d.手机.暴露感 = Math.max(0, Math.min(100, (d.手机.暴露感 ?? 0) + 变化));
              结果 = `<结果 类型="暴露" 变化="${变化 > 0 ? "+" : ""}${变化}" ` + `现在="${d.手机.暴露感}" 说明="${涨?.事 ?? 降?.事 ?? "无变化"}"/>`;
            } else if (类型 === "声望") {
              const 事 = 参.事 ?? "";
              const 涨 = ___WEBPACK_IMPORTED_MODULE_1__["声望涨"].find(x => 事.includes(x.事.slice(0, 3)));
              const 降 = ___WEBPACK_IMPORTED_MODULE_1__["声望降"].find(x => 事.includes(x.事.slice(0, 3)));
              const 变化 = 涨 ? Number(涨.涨.replace("+", "")) || 2 : 降 ? -(Number(降.降.replace(/[−／条]/g, "")) || 5) : 0;
              d.声誉.值 = Math.max(0, Math.min(100, (d.声誉.值 ?? 50) + 变化));
              结果 = `<结果 类型="声望" 变化="${变化 > 0 ? "+" : ""}${变化}" 现在="${d.声誉.值}"/>`;
            } else if (类型 === "她说话") {
              const 变 = (0, ___WEBPACK_IMPORTED_MODULE_21__["抽变体"])(参.功能 ?? "开场");
              const 平台 = 参.平台 ?? "";
              const f = (0, ___WEBPACK_IMPORTED_MODULE_9__["她在这怎么说话"])(平台);
              结果 = `<结果 类型="她说话" 平台="${平台}"` + ` 称呼="${f.称呼}"` + ` 说话="${f.说话}"` + ` 节奏="${f.节奏}"` + ` 她以为她在干什么="${f.自我认知}"` + ` 破事="${f.破事}"` + ` 样本="${f.样本.slice(0, 3).join("｜")}"/>`;
            } else if (类型 === "论坛") {
              const 平台 = 参.平台 ?? "";
              const 行为 = 参.行为 ?? "发帖";
              const 级 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.站级) || d.站点?.[平台]?.等级 || 1;
              const 待遇 = (0, ___WEBPACK_IMPORTED_MODULE_10__["论坛待遇"])(级, 行为);
              const 池 = 级 >= 3 ? ___WEBPACK_IMPORTED_MODULE_10__["熟人的回帖"] : ___WEBPACK_IMPORTED_MODULE_10__["新人的回帖"];
              const 抽几个 = 池.sort(() => Math.random() - .5).slice(0, (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.几条) || 3);
              const 回帖 = 抽几个.map(r => `${r.身份}：「${r.话}」`).join("｜");
              结果 = `<结果 类型="论坛" 平台="${平台}" 站级="${级}" 行为="${行为}"` + ` 待遇="${待遇}" 回帖="${回帖}"/>`;
            } else if (类型 === "论坛文化") {
              const 名 = 参.平台 ?? "";
              const w = ___WEBPACK_IMPORTED_MODULE_10__["论坛文化表"].find(x => 名.includes(x.名.slice(0, 2))) ?? ___WEBPACK_IMPORTED_MODULE_10__["论坛文化表"][0];
              结果 = `<结果 类型="论坛文化" 站="${w.名}" 鄙视="${w.鄙视}"` + ` 尊重="${w.尊重}" 新人坑="${w.新人坑}" 黑话="${w.黑话}"/>`;
            } else if (类型 === "被挂") {
              const 原因 = 参.原因 ?? "";
              const k = ___WEBPACK_IMPORTED_MODULE_10__["被挂情况表"].find(x => 原因.includes(x.原因.slice(0, 3))) ?? ___WEBPACK_IMPORTED_MODULE_10__["被挂情况表"][0];
              结果 = `<结果 类型="被挂" 原因="${k.原因}" 谁挂的="${k.谁挂的}"` + ` 后果="${k.后果}" 处理="${k.怎么处理}"/>`;
            } else if (类型 === "线下") {
              const 名 = 参.场所 ?? "";
              const s = ___WEBPACK_IMPORTED_MODULE_10__["线下场所表"].find(x => 名.includes(x.名.slice(0, 2))) ?? ___WEBPACK_IMPORTED_MODULE_10__["线下场所表"][0];
              结果 = `<结果 类型="线下" 场所="${s.名}" 门="${s.门}"` + ` 玩法="${s.玩法}" 坑="${s.坑}" 价="${s.价}"/>`;
            } else if (类型 === "站级") {
              const 级 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.级) || 1;
              const s = ___WEBPACK_IMPORTED_MODULE_10__["站级表"].find(x => x.级 === 级) ?? ___WEBPACK_IMPORTED_MODULE_10__["站级表"][1];
              结果 = `<结果 类型="站级" 级="${s.级}" 名="${s.名}" 能力="${s.能力}" 还差="${s.还差什么}"/>`;
            } else if (类型 === "开局") {
              const 难度 = 参.难度 === "硬核" ? "硬核" : 参.难度 === "顺风" ? "顺风" : "标准";
              const r = (0, _Roll__WEBPACK_IMPORTED_MODULE_13__["摇开局"])(难度);
              d.属性 = {
                ...r.属性
              };
              d.玩家 = d.玩家 ?? {};
              d.玩家.起点 = 难度;
              d.设定 = d.设定 ?? {};
              d.设定.难度 = 难度;
              if (难度 === "顺风") {
                d.手机.等级 = 25;
                d.手机.曾达最高 = 25;
                d.玩家.现金 = 48e3;
              } else if (难度 === "硬核") {
                d.手机.等级 = 1;
                d.手机.曾达最高 = 1;
                d.玩家.现金 = 8e3;
              } else {
                d.手机.等级 = 1;
                d.手机.曾达最高 = 1;
                d.玩家.现金 = 2e4;
              }
              if (参.文风) {
                d.设定.文风 = [ 参.文风 ];
              }
              if (参.职业 || 参.身份) {
                d.玩家.现实身份 = 参.职业 || 参.身份;
              }
              const 好的 = r.长板.键 + "(" + r.长板.说的什么 + ")";
              const 差的 = r.短板.map(x => x.键 + "(" + x.说的什么 + ")").join("、");
              结果 = `<结果 类型="开局" 难度="${难度}" 长板="${好的}" 短板="${差的}" 人格="${r.他是什么人}"/>`;
              日志(`开局设定完成：难度=${难度} 长板=${好的} 短板=${差的}`);
            } else if (类型 === "充值" || 类型 === "兑换积分") {
              const 点名 = 类型;
              const 点数 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.任务点) || (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.点数) || (0, 
              ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.数额) || (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.金额) || 0;
              if (点数 <= 0) {
                结果 = `<结果 类型="${点名}" 失败="点数错误" 说明="兑换任务点必须大于0"/>`;
              } else if ((d.玩家?.任务点 ?? 0) < 点数) {
                结果 = `<结果 类型="${点名}" 失败="任务点不足" 说明="现有任务点 ${d.玩家?.任务点 ?? 0}，欲兑换 ${点数}"/>`;
              } else {
                d.玩家.任务点 = (d.玩家.任务点 ?? 0) - 点数;
                const 得积分 = 点数;
                d.积分.可用 = (d.积分.可用 ?? 0) + 得积分;
                d.积分.总 = (d.积分.总 ?? 0) + 得积分;
                d.积分.充值累计 = (d.积分.充值累计 ?? 0) + 得积分;
                结果 = `<结果 类型="${点名}" 消耗任务点="${点数}" 获得手机积分="+${得积分}" 现有可用积分="${d.积分.可用}" 剩余任务点="${d.玩家.任务点}" 汇率="1:1"/>`;
                日志(`任务点${点名}：消耗 ${点数} 任务点 → 获得 +${得积分} 手机积分`);
              }
            } else if (类型 === "买道具") {
              const 道具名 = 参.道具 ?? 参.名 ?? "";
              const 花费 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.积分) || 0;
              if (!道具名) {
                结果 = `<结果 类型="买道具" 失败="道具名为空"/>`;
              } else if (花费 > 0 && (d.积分.可用 ?? 0) < 花费) {
                结果 = `<结果 类型="买道具" 失败="积分不足" 说明="欲购【${道具名}】需 ${花费} 积分，现有 ${d.积分.可用 ?? 0} 积分"/>`;
              } else {
                if (花费 > 0) d.积分.可用 -= 花费;
                d.已购 = [ ...new Set([ ...d.已购 ?? [], 道具名 ]) ];
                结果 = `<结果 类型="买道具" 成功="已购【${道具名}】" 扣除积分="${花费}" 剩余积分="${d.积分.可用}"/>`;
                日志(`购买黑市道具：【${道具名}】消耗 ${花费} 积分`);
              }
            } else if (类型 === "家人") {
              const 阶段 = 参.阶段 ?? "";
              const s = ___WEBPACK_IMPORTED_MODULE_10__["家庭线阶段"].find(x => 阶段.includes(x.阶段.slice(0, 1))) ?? ___WEBPACK_IMPORTED_MODULE_10__["家庭线阶段"][0];
              结果 = `<结果 类型="家人" 阶段="${s.阶段}" 写什么="${s.写什么}"` + ` 难度="${___WEBPACK_IMPORTED_MODULE_10__["家庭线原则"].难度}" 手机不能给="${___WEBPACK_IMPORTED_MODULE_10__["家庭线原则"].手机不能给}"` + ` 底线="${___WEBPACK_IMPORTED_MODULE_10__["家庭线原则"].底线}"/>`;
            } else if (类型 === "平台") {
              const 地 = 参.地区 ?? d.世界?.地区 ?? "";
              const 位 = 参.位置 ?? d.世界?.当前位置 ?? "";
              const 列 = (0, ___WEBPACK_IMPORTED_MODULE_5__["该地区的平台"])(地, 位);
              const 要 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.显示) || 8;
              const 倍 = (0, ___WEBPACK_IMPORTED_MODULE_20__["当前倍率"])(d.手机.等级, d.手机.已点亮 ?? []);
              const 标 = 列.slice(0, 要).map(p => {
                const 相 = (0, ___WEBPACK_IMPORTED_MODULE_18__["相容度"])(p.名, 地);
                const 站 = (0, ___WEBPACK_IMPORTED_MODULE_20__["该平台加速"])(p.名, d.手机.等级);
                return `${p.名}(${p.型}${相 < 3 ? "★不相容" : 站 > 1 ? `×${站}` : ""})`;
              });
              结果 = `<结果 类型="平台" 地区="${地}" 共="${列.length}个" 倍率="×${倍}"` + ` 列表="${标.join("｜")}"/>`;
            } else if (类型 === "平台类") {
              const 要 = 参.类 ?? 参.分类 ?? "";
              const 分 = (0, ___WEBPACK_IMPORTED_MODULE_5__["全球分类"])();
              const 列 = 分[要] ?? [];
              结果 = `<结果 类型="平台类" 类型="${要}" 共="${列.length}个"` + ` 列表="${列.slice(0, 20).map(p => p.名).join("、")}"/>`;
            } else if (类型 === "站点") {
              const 平台 = 参.平台 ?? "草榴";
              d.站点 = d.站点 ?? {};
              const st = d.站点[平台] ?? {
                账号: "匿名_" + Math.random().toString(36).slice(2, 6),
                等级: 1,
                经验值: 0,
                积分: 0,
                累计次数: 0,
                五星数: 0,
                四星数: 0,
                订阅: "无",
                订阅剩余: 0,
                免费额度: 5,
                状态: "已注册"
              };
              const 越权 = (0, ___WEBPACK_IMPORTED_MODULE_8__["手机加速倍率"])(d.手机.等级);
              const 基础分 = (0, ___WEBPACK_IMPORTED_MODULE_8__["实际积分"])(平台, d.手机.等级);
              st.积分 = (st.积分 ?? 0) + 基础分;
              const 评价 = 参.评价 ?? "四星";
              if (评价 === "五星") st.五星数 = (st.五星数 ?? 0) + 1; else if (评价 === "四星") st.四星数 = (st.四星数 ?? 0) + 1;
              const 获得经验 = (评价 === "五星" ? 20 : 评价 === "四星" ? 10 : 5) * 越权;
              let 新经验 = (st.经验值 ?? 0) + 获得经验;
              const 升了几级 = Math.floor(新经验 / 100);
              st.经验值 = 新经验 % 100;
              st.等级 = Math.min(100, (st.等级 ?? 1) + 升了几级);
              st.累计次数 = (st.累计次数 ?? 0) + 1;
              const 注水 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.注水积分) || 0;
              let 注水得 = 0;
              if (注水 > 0 && (d.积分.可用 ?? 0) >= 注水) {
                d.积分.可用 -= 注水;
                注水得 = 注水 * 越权;
                st.积分 += 注水得;
                日志(`【${平台}】注入手机积分 ${注水} × 越权 ${越权} = +${注水得} 平台积分`);
              }
              d.站点[平台] = st;
              const 快照 = (0, ___WEBPACK_IMPORTED_MODULE_8__["权限快照"])(平台, st.积分);
              结果 = `<结果 类型="站点" 平台="${平台}" 等级="Lv${st.等级}" 经验="+${获得经验}" ` + `站内积分="${st.积分}" 获得分="+${基础分}" 越权="×${越权}"` + (注水得 > 0 ? ` 注水="+${注水得}分"` : "") + ` 当前权限="${快照.能做什么.slice(-1)[0] ?? "基础浏览"}"` + (快照.下一级 ? ` 下一权限="${快照.下一级}"(还差${快照.还差}分)` : "") + `/>`;
            } else if (类型 === "镜像") {
              const 谁 = 参.对象 ?? 参.目标 ?? "未知目标";
              const 阶 = (0, ___WEBPACK_IMPORTED_MODULE_6__["判镜阶"])(Number(d.手机?.等级 ?? 1), d.技能);
              const 范围 = 参.范围 ?? "";
              const 越界 = 范围 && 范围 !== "无" && !阶.范围.some(x => 范围.includes(x));
              结果 = `<结果 类型="镜像" 对象="${谁}" 阶级="${阶.名}" 阶="${阶.阶}"` + ` 范围="${阶.范围.join("｜") || "无"}"` + (越界 ? ` 越界="true" 越界说明="当前阶级没有【${范围}】这项 —— 需更高等级或技能"` : "") + ` 详情="${阶.描述}"/>`;
            } else if (类型 === "检定") {
              const 行为 = 参.行为 ?? "社交";
              const 难 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.难度) || 5;
              const r = (0, ___WEBPACK_IMPORTED_MODULE_12__["算检定"])({
                行为类: 行为,
                声称: 参.声称 ?? "",
                属性: a,
                技能: s,
                难度: 难,
                手机等级: d.手机.等级,
                现金: d.玩家.现金,
                报价: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.报价),
                声望: d.声誉?.值 ?? 0,
                外部: (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.外部)
              });
              const 检定经验 = r.档 === "压倒" ? 120 : r.档 === "成功" ? 80 : r.档 === "勉强" ? 40 : 15;
              const 检定积分 = r.档 === "压倒" ? 2 : r.档 === "成功" ? 1 : 0;
              增加手机经验(d, 检定经验, 检定积分, `检定(${行为}:${r.档})`);
              结果 = `<结果 类型="检定" 行为="${行为}" 声称="${参.声称 ?? ""}" ` + `档="${r.档}" 差值="${r.差值 > 0 ? "+" : ""}${r.差值}" ` + `我方="${r.我方值}" 对方="${r.对方值}" ` + `结论="${r.结论}"` + (r.代价 ? ` 代价="${r.代价}"` : "") + ` 明细="${r.明细.join("｜")}"/>`;
              d.判定记录 = [ ...d.判定记录 ?? [], {
                回合: `${d.世界.日期} ${d.世界.时刻}`,
                类型: "检定·" + 行为,
                我方值: r.我方值,
                对方值: r.对方值,
                差值: r.差值,
                结果: r.档
              } ].slice(-30);
            } else if (类型 === "属性感受") {
              const 键 = 参.属性 ?? 参.键 ?? "";
              const 值 = (0, ___WEBPACK_IMPORTED_MODULE_14__["转数字"])(参.值);
              if (键 && 值) {
                结果 = `<结果 类型="属性感受" 属性="${键}" 值="${值}" 感受="${(0, ___WEBPACK_IMPORTED_MODULE_15__["感受"])(键, 值)}"/>`;
              } else {
                const 全 = (0, ___WEBPACK_IMPORTED_MODULE_15__["全读数"])(a);
                结果 = `<结果 类型="属性感受" 读数="${全}"/>`;
              }
            } else if (类型 === "技能树") {
              const 已点 = d.技能 ?? {};
              if (参.技能) {
                const r = (0, ___WEBPACK_IMPORTED_MODULE_16__["能否点技能"])(参.技能, 已点[参.技能] ?? 0, 已点, a, d.手机.等级, d.积分?.可用 ?? 0, d.声誉?.值 ?? 50);
                结果 = `<结果 类型="技能树" 技能="${参.技能}" 能点="${r.通过}" 差="${r.差 ?? r.原因 ?? ""}"/>`;
              } else {
                const 可 = (0, ___WEBPACK_IMPORTED_MODULE_16__["可点清单"])(已点, a, d.手机.等级, d.积分?.可用 ?? 0, d.声誉?.值 ?? 50);
                结果 = `<结果 类型="技能树" 可点="${可.map(x => `${x.技能}(-${x.花费})`).slice(0, 12).join("｜")}"/>`;
              }
            } else if (类型 === "任务") {
              const 类 = 参.类 ?? "";
              const 表 = {
                接活: ___WEBPACK_IMPORTED_MODULE_19__["接活表"],
                做局: ___WEBPACK_IMPORTED_MODULE_19__["做局表"],
                抢: ___WEBPACK_IMPORTED_MODULE_19__["抢表"],
                产业: ___WEBPACK_IMPORTED_MODULE_19__["产业表"]
              };
              const 选 = 表[类] ?? ___WEBPACK_IMPORTED_MODULE_19__["接活表"];
              const 条 = Array.isArray(选) ? 选.slice(0, 5) : [];
              结果 = `<结果 类型="任务" 类="${类 || "接活"}" 共="${Array.isArray(选) ? 选.length : 0}个"` + ` 列表="${条.map(x => `${x.名}(${x.报酬 ?? x.量级 ?? ""})`).join("｜")}"/>`;
            } else if (类型 === "掉级") {
              const 原因 = 参.原因 ?? "";
              const 掉 = 原因.includes("越界") ? 3 : 原因.includes("暴露") ? 10 : 原因.includes("连败") ? 5 : 1;
              const 新等级 = Math.max(1, d.手机.等级 - 掉);
              d.手机.等级 = 新等级;
              d.手机.经验 = 0;
              d.手机.衰减记录 = [ ...d.手机.衰减记录 ?? [], {
                时间: `${d.世界.日期} ${d.世界.时刻}`,
                原因,
                掉级: -掉
              } ];
              结果 = `<结果 类型="掉级" 原因="${原因}" 掉="${掉}" 新等级="${新等级}"/>`;
            }
            if (结果) {
              text = text.replace(m[0], 结果);
              改动了 = true;
            }
          }
          if (改动了) {
            setChatMessages([ {
              message_id,
              message: text
            } ]);
            await 存数据(d, message_id);
            日志("已写回消息与变量");
          }
        });
        eventOn(tavern_events.MESSAGE_SENT, async () => {
          const 输入 = _.get(getChatMessages(-1)[0], "message", "");
          const r = (0, ___WEBPACK_IMPORTED_MODULE_4__["检测越界"])(输入);
          if (!r.越界) return;
          const vars = Mvu.getMvuData({
            type: "message",
            message_id: "latest"
          });
          const d = _schema__WEBPACK_IMPORTED_MODULE_0__.Schema.parse(_.get(vars, "stat_data"));
          d.手机.越界次数 = (d.手机.越界次数 ?? 0) + 1;
          const 掉 = Math.min(5, 3 + (d.手机.越界次数 - 1));
          const 新等级 = Math.max(1, d.手机.等级 - 掉);
          d.手机.等级 = 新等级;
          d.手机.经验 = 0;
          d.手机.衰减记录 = [ ...d.手机.衰减记录 ?? [], {
            时间: `${d.世界.日期} ${d.世界.时刻}`,
            原因: `越界：${r.类型}`,
            掉级: -掉
          } ];
          await Mvu.replaceMvuData({
            stat_data: d
          }, {
            type: "message",
            message_id: -1
          });
          toastr.info("手机好像不太对。", "", {
            timeOut: 3e3
          });
          日志(`越界：${r.类型} → Lv${新等级}（掉 ${掉} 级）`);
        });
        日志(`已加载 · 25 种公式 · 平台库 ${(0, ___WEBPACK_IMPORTED_MODULE_5__["平台统计"])().合计} 个 · 平台特色 ${(0, 
        ___WEBPACK_IMPORTED_MODULE_9__["特色统计"])().平台数} 个`);
        __webpack_async_result__();
      } catch (e) {
        __webpack_async_result__(e);
      }
    }, 1);
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
  const webpackQueues = Symbol("webpack queues");
  const webpackExports = Symbol("webpack exports");
  const webpackError = Symbol("webpack error");
  const resolveQueue = queue => {
    if (queue?.d < 1) {
      queue.d = 1;
      queue.forEach(fn => fn.r--);
      queue.forEach(fn => fn.r-- ? fn.r++ : fn());
    }
  };
  const wrapDeps = deps => deps.map(dep => {
    if (dep !== null && typeof dep === "object") {
      if (dep[webpackQueues]) return dep;
      if (dep.then) {
        const queue = [];
        queue.d = 0;
        dep.then(r => {
          obj[webpackExports] = r;
          resolveQueue(queue);
        }, e => {
          obj[webpackError] = e;
          resolveQueue(queue);
        });
        const obj = {};
        obj[webpackQueues] = fn => fn(queue);
        return obj;
      }
    }
    const ret = {};
    ret[webpackQueues] = x => {};
    ret[webpackExports] = dep;
    return ret;
  });
  __webpack_require__.a = (module, body, hasAwait) => {
    let queue;
    hasAwait && ((queue = []).d = -1);
    const depQueues = new Set;
    const exports = module.exports;
    let currentDeps;
    let outerResolve;
    let reject;
    const promise = new Promise((resolve, rej) => {
      reject = rej;
      outerResolve = resolve;
    });
    promise[webpackExports] = exports;
    promise[webpackQueues] = fn => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
    module.exports = promise;
    const handle = deps => {
      currentDeps = wrapDeps(deps);
      let fn;
      const getResult = () => currentDeps.map(d => {
        if (d[webpackError]) throw d[webpackError];
        return d[webpackExports];
      });
      const promise = new Promise(resolve => {
        fn = () => resolve(getResult);
        fn.r = 0;
        const fnQueue = q => q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, 
        q.push(fn)));
        currentDeps.forEach(dep => dep[webpackQueues](fnQueue));
      });
      return fn.r ? promise : getResult();
    };
    const done = err => (err ? reject(promise[webpackError] = err) : outerResolve(exports), 
    resolveQueue(queue));
    body(handle, done);
    queue?.d < 0 && (queue.d = 0);
  };
})();

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

let __webpack_exports__ = __webpack_require__("./src/神奇手机/神奇手机/脚本/计算引擎/index.ts");

__webpack_exports__ = await __webpack_exports__;