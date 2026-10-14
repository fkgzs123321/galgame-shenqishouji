/*!***************************************!*\
  !*** ./src/神奇手机/神奇手机/脚本/悬浮球/index.ts ***!
  \***************************************/
const 面板地址 = "https://testingcf.jsdelivr.net/gh/fkgzs123321/galgame-shenqishouji@cdb8b3e138d5ec394bcfa8579b10b02512a7d8c6/index.html";

const 球ID = "dsh-orb";

const 窗ID = "dsh-orb-win";

const 样式ID = "dsh-orb-style";

const 存位键 = "dsh.orb.pos";

function 宿主文档() {
  try {
    const p = window.parent;
    if (p && p !== window && p.document && p.document.body) return p.document;
  } catch {}
  return document;
}

function 读等级() {
  try {
    const v = getVariables({
      type: "message",
      message_id: -1
    });
    const lv = v?.stat_data?.手机?.等级;
    return typeof lv === "number" ? String(lv) : "·";
  } catch {
    return "·";
  }
}

function 读摘要() {
  try {
    const v = getVariables({
      type: "message",
      message_id: -1
    });
    const s = v?.stat_data;
    if (!s) return "";
    const 钱 = Number(s.玩家?.现金 ?? 0);
    const 分 = Number(s.积分?.可用 ?? 0);
    return `Lv${s.手机?.等级 ?? "·"}　¥${钱.toLocaleString()}　积分 ${分}`;
  } catch {
    return "";
  }
}

function 加载成iframe(f, url, 回调) {
  f.removeAttribute("src");
  fetch(url, {
    cache: "no-cache"
  }).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  }).then(html => {
    const 处理后 = html.replace(/<script\s+type=["']module["']/gi, "<script defer");
    try {
      const d = f.contentDocument || f.contentWindow && f.contentWindow.document;
      if (d) {
        d.open();
        d.write(处理后);
        d.close();
      } else {
        f.srcdoc = 处理后;
      }
    } catch {
      f.srcdoc = 处理后;
    }
    f.onload = () => {
      try {
        回调?.();
      } catch {}
      try {
        const d = f.contentDocument;
        if (!d) return;
        const 量 = () => {
          const h = Math.max(d.body?.scrollHeight ?? 0, d.documentElement?.scrollHeight ?? 0);
          if (h > 0 && !f.style.height) f.style.height = h + "px";
        };
        量();
        if (window.ResizeObserver && d.documentElement) {
          new window.ResizeObserver(量).observe(d.documentElement);
        }
        setTimeout(量, 300);
        setTimeout(量, 1200);
      } catch {}
    };
  }).catch(e => {
    f.srcdoc = `<body style="margin:0;padding:16px;background:#090810;color:#ff8fa3;` + `font:12px/1.7 -apple-system,BlinkMacSystemFont,PingFang SC,sans-serif">` + `<div style="padding:12px;border:1px solid #7f1d1d;border-radius:10px;background:rgba(239,68,68,0.1)">` + `<strong>⚠️ 小手机界面加载受阻</strong><br>` + `错误详情：${String(e && e.message || e)}<br>` + `<span style="color:#71717a;font-size:10px;word-break:break-all">${url}</span><br><br>` + `<button onclick="location.reload()" style="background:#8b5cf6;color:#fff;border:none;padding:5px 12px;border-radius:6px;cursor:pointer">重新尝试连接</button>` + `</div></body>`;
  });
}

const 样式 = `\n#${球ID} {\n  position: fixed; z-index: 999998; width: 52px; height: 52px;\n  border-radius: 50%; display: flex; flex-direction: column;\n  align-items: center; justify-content: center;\n  background: radial-gradient(circle at 32% 28%, #4a3a6a, #1a1626 70%);\n  border: 1px solid #6c5a9a; box-shadow: 0 4px 18px rgba(0,0,0,.55);\n  cursor: grab; user-select: none; touch-action: none;\n  opacity: .38; transition: opacity .18s, transform .18s, box-shadow .18s;\n  font-family: ui-monospace, Consolas, monospace;\n}\n#${球ID}:hover { opacity: 1; transform: scale(1.08); box-shadow: 0 6px 22px rgba(120,90,200,.6); }\n#${球ID}.on { opacity: 1; border-color: #b08cff; box-shadow: 0 0 16px rgba(160,120,255,.7); }\n#${球ID}.drag { cursor: grabbing; opacity: 1; transform: scale(1.12); }\n#${球ID} .dsh-orb-ico { font-size: 20px; line-height: 1; }\n#${球ID} .dsh-orb-lv { font-size: 9px; line-height: 1; margin-top: 2px; color: #d8c8ff; letter-spacing: -.3px; }\n\n#${窗ID} {\n  position: fixed; z-index: 999999; width: 396px; height: 82vh;\n  max-height: 800px; min-width: 320px; min-height: 520px;\n  display: flex; flex-direction: column;\n  background: #090812; border: 2px solid #3d3559; border-radius: 28px;\n  box-shadow: 0 20px 60px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.08); overflow: hidden;\n  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;\n}\n#${窗ID} .dsh-ow-bar {\n  display: flex; align-items: center; gap: 7px; padding: 6px 12px;\n  background: linear-gradient(180deg, #1c172e, #110e1c);\n  border-bottom: 1px solid rgba(255,255,255,.08); cursor: move; flex: 0 0 auto;\n}\n#${窗ID} .dsh-ow-t { flex: 1; font-size: 11px; font-weight: 600; color: #c8b8f0; letter-spacing: .5px; }\n#${窗ID} .dsh-ow-b {\n  width: 20px; height: 20px; border-radius: 6px; border: 1px solid #3a3355;\n  background: #1a1626; color: #9a8ac8; font-size: 11px; line-height: 1;\n  cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0;\n}\n#${窗ID} .dsh-ow-b:hover { background: #2a2340; color: #e0d0ff; border-color: #6a5a9a; }\n#${窗ID} iframe { flex: 1; width: 100%; border: 0; background: #090810; }\n`;

function 注入样式(d) {
  if (d.getElementById(样式ID)) return;
  const s = d.createElement("style");
  s.id = 样式ID;
  s.textContent = 样式;
  d.head?.appendChild(s);
}

function 读位(d) {
  try {
    let raw = null;
    try {
      raw = (d.defaultView ?? window).localStorage.getItem(存位键);
    } catch {}
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (typeof v?.x === "number" && typeof v?.y === "number") return v;
  } catch {}
  return null;
}

function 存位(d, p) {
  try {
    try {
      (d.defaultView ?? window).localStorage.setItem(存位键, JSON.stringify(p));
    } catch {}
  } catch {}
}

function 夹取(p, d, 尺寸 = 52) {
  const w = d.defaultView?.innerWidth ?? 1200;
  const h = d.defaultView?.innerHeight ?? 800;
  return {
    x: Math.max(4, Math.min(w - 尺寸 - 4, p.x)),
    y: Math.max(4, Math.min(h - 尺寸 - 4, p.y))
  };
}

function 开窗(d, 锚) {
  if (d.getElementById(窗ID)) return;
  const w = d.defaultView?.innerWidth ?? 1200;
  const h = d.defaultView?.innerHeight ?? 800;
  const 宽 = 396;
  const 高 = Math.min(800, Math.max(540, h * .82));
  let x = 锚.x + 62;
  if (x + 宽 > w - 8) x = 锚.x - 宽 - 10;
  if (x < 8) x = Math.max(8, (w - 宽) / 2);
  const el = d.createElement("div");
  el.id = 窗ID;
  el.style.left = `${x}px`;
  el.style.top = `${Math.max(8, Math.min(h - 高 - 8, 锚.y - 20))}px`;
  el.style.height = `${高}px`;
  el.innerHTML = `\n    <div class="dsh-ow-bar">\n      <span class="dsh-ow-t">📱 神奇手机</span>\n      <button class="dsh-ow-b" data-a="reload" title="重新载入面板">⟳</button>\n      <button class="dsh-ow-b" data-a="close" title="关闭">✕</button>\n    </div>\n    <iframe allow="clipboard-read; clipboard-write"></iframe>\n  `;
  d.body.appendChild(el);
  {
    const f = el.querySelector("iframe");
    if (f) 加载成iframe(f, `${面板地址}?mid=latest`);
  }
  el.querySelector('[data-a="close"]')?.addEventListener("click", () => {
    el.remove();
    d.getElementById(球ID)?.classList.remove("on");
  });
  el.querySelector('[data-a="reload"]')?.addEventListener("click", () => {
    const f = el.querySelector("iframe");
    if (f) 加载成iframe(f, `${面板地址}?t=${Date.now()}`);
  });
  const 栏 = el.querySelector(".dsh-ow-bar");
  栏?.addEventListener("pointerdown", e => {
    if (e.target.tagName === "BUTTON") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - r.left;
    const dy = e.clientY - r.top;
    栏.setPointerCapture(e.pointerId);
    const 移 = ev => {
      const ww = d.defaultView?.innerWidth ?? 1200;
      const wh = d.defaultView?.innerHeight ?? 800;
      el.style.left = `${Math.max(0, Math.min(ww - r.width, ev.clientX - dx))}px`;
      el.style.top = `${Math.max(0, Math.min(wh - 40, ev.clientY - dy))}px`;
    };
    const 停 = () => {
      栏.removeEventListener("pointermove", 移);
      栏.removeEventListener("pointerup", 停);
      栏.removeEventListener("pointercancel", 停);
    };
    栏.addEventListener("pointermove", 移);
    栏.addEventListener("pointerup", 停);
    栏.addEventListener("pointercancel", 停);
  });
}

function 关窗(d) {
  d.getElementById(窗ID)?.remove();
}

function 暴露宿主API() {
  const 取 = 名 => {
    try {
      const g = globalThis;
      return typeof g[名] === "function" ? g[名] : undefined;
    } catch {
      return undefined;
    }
  };
  const 桥 = {
    __来源: "悬浮球桥",
    getVariables: 取("getVariables"),
    replaceVariables: 取("replaceVariables"),
    updateVariablesWith: 取("updateVariablesWith"),
    getLastMessageId: 取("getLastMessageId"),
    getCurrentMessageId: 取("getCurrentMessageId"),
    getChatMessages: 取("getChatMessages"),
    setChatMessages: 取("setChatMessages"),
    triggerSlash: 取("triggerSlash"),
    eventOn: 取("eventOn"),
    eventOff: 取("eventOff"),
    tavern_events: (() => {
      try {
        return globalThis.tavern_events;
      } catch {
        return undefined;
      }
    })(),
    SillyTavern: (() => {
      try {
        return globalThis.SillyTavern;
      } catch {
        return undefined;
      }
    })(),
    toastr: (() => {
      try {
        return globalThis.toastr;
      } catch {
        return undefined;
      }
    })(),
    klona: (() => {
      try {
        return globalThis.klona;
      } catch {
        return undefined;
      }
    })()
  };
  const 目标s = [];
  try {
    目标s.push(window);
  } catch {}
  try {
    const d = 宿主文档();
    const w = d.defaultView;
    if (w && w !== window) 目标s.push(w);
  } catch {}
  try {
    const p = window.parent;
    if (p && p !== window && !目标s.includes(p)) 目标s.push(p);
  } catch {}
  for (const w of 目标s) {
    try {
      w.__dshHostAPI = 桥;
    } catch {}
  }
  try {
    console.info(`[神奇手机] 宿主 API 桥已挂到 ${目标s.length} 个 window 上（getVariables=${桥.getVariables ? "有" : "无"}）`);
  } catch {}
}

function 建球() {
  const d = 宿主文档();
  if (d.getElementById(球ID)) return;
  暴露宿主API();
  注入样式(d);
  const 球 = d.createElement("div");
  球.id = 球ID;
  球.title = "手机 · 点开面板";
  const w0 = d.defaultView?.innerWidth ?? 1200;
  const h0 = d.defaultView?.innerHeight ?? 800;
  const 初 = 读位(d) ?? {
    x: w0 - 72,
    y: h0 - 140
  };
  const p0 = 夹取(初, d);
  球.style.left = `${p0.x}px`;
  球.style.top = `${p0.y}px`;
  球.innerHTML = '<span class="dsh-orb-ico">📱</span><span class="dsh-orb-lv"></span>';
  d.body.appendChild(球);
  const 写等级 = () => {
    const e = 球.querySelector(".dsh-orb-lv");
    if (e) e.textContent = 读等级();
    球.title = `手机 · 点开面板${读摘要() ? "\n" + 读摘要() : ""}`;
  };
  写等级();
  const 定时 = (d.defaultView ?? window).setInterval?.(写等级, 5e3);
  let 按下 = false;
  let 动了 = false;
  let 起 = {
    x: 0,
    y: 0
  };
  let 起位 = {
    x: p0.x,
    y: p0.y
  };
  球.addEventListener("pointerdown", e => {
    按下 = true;
    动了 = false;
    起 = {
      x: e.clientX,
      y: e.clientY
    };
    起位 = {
      x: parseFloat(球.style.left) || p0.x,
      y: parseFloat(球.style.top) || p0.y
    };
    球.classList.add("drag");
    球.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  球.addEventListener("pointermove", e => {
    if (!按下) return;
    const dx = e.clientX - 起.x;
    const dy = e.clientY - 起.y;
    if (!动了 && Math.hypot(dx, dy) < 5) return;
    动了 = true;
    球.style.left = `${起位.x + dx}px`;
    球.style.top = `${起位.y + dy}px`;
  });
  const 松 = e => {
    if (!按下) return;
    按下 = false;
    球.classList.remove("drag");
    try {
      球.releasePointerCapture(e.pointerId);
    } catch {}
    if (!动了) {
      const 开着 = !!d.getElementById(窗ID);
      if (开着) {
        关窗(d);
        球.classList.remove("on");
      } else {
        const p = 夹取({
          x: parseFloat(球.style.left) || p0.x,
          y: parseFloat(球.style.top) || p0.y
        }, d);
        开窗(d, p);
        球.classList.add("on");
      }
      return;
    }
    const ww = d.defaultView?.innerWidth ?? 1200;
    const wh = d.defaultView?.innerHeight ?? 800;
    let x = parseFloat(球.style.left) || 0;
    let y = parseFloat(球.style.top) || 0;
    const 左 = x + 26 < ww / 2;
    x = 左 ? 8 : ww - 60;
    y = Math.max(8, Math.min(wh - 60, y));
    球.style.transition = "left .16s ease, top .16s ease";
    球.style.left = `${x}px`;
    球.style.top = `${y}px`;
    (d.defaultView ?? window).setTimeout?.(() => {
      球.style.transition = "";
    }, 200);
    存位(d, {
      x,
      y
    });
  };
  球.addEventListener("pointerup", 松);
  球.addEventListener("pointercancel", 松);
  const onResize = () => {
    const p = 夹取({
      x: parseFloat(球.style.left) || 0,
      y: parseFloat(球.style.top) || 0
    }, d);
    球.style.left = `${p.x}px`;
    球.style.top = `${p.y}px`;
    存位(d, p);
  };
  d.defaultView?.addEventListener("resize", onResize);
  return () => {
    (d.defaultView ?? window).clearInterval?.(定时);
    d.defaultView?.removeEventListener("resize", onResize);
    d.getElementById(窗ID)?.remove();
    d.getElementById(球ID)?.remove();
    d.querySelectorAll(`.${层ID}`).forEach(e => e.remove());
  };
}

const 开悬浮球 = true;

let 销毁;

$(() => {
  errorCatched(() => {
    const 试 = (n = 0) => {
      const d = 宿主文档();
      if (d.body) {
        if (开悬浮球) {
          销毁 = 建球();
          console.info("[神奇手机] 悬浮球小手机已就绪 (独立悬浮窗，不干扰楼层状态栏)");
        }
      } else if (n < 40) {
        setTimeout(() => 试(n + 1), 250);
      }
    };
    试();
  })();
});

$(window).on("pagehide", () => {
  try {
    销毁?.();
  } catch {}
});