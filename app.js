const roles = [
  {
    id: "general",
    name: "普通学生",
    short: "复习与找书",
    insight: "关注复习效率、设施便利和馆藏定位。",
    defaults: { goal: "review", quiet: 3, power: true, longStay: false, english: false, facility: true },
  },
  {
    id: "freshman",
    name: "大一新生",
    short: "规则与引导",
    insight: "需要降低第一次使用图书馆的门槛。",
    defaults: { goal: "guide", quiet: 3, power: true, longStay: false, english: false, facility: true },
  },
  {
    id: "exam",
    name: "考研学生",
    short: "长期稳定复习",
    insight: "核心需求是稳定、安静、带电源的长期复习空间。",
    defaults: { goal: "exam", quiet: 5, power: true, longStay: true, english: false, facility: true },
  },
  {
    id: "international",
    name: "留学生",
    short: "英文资源导航",
    insight: "需要双语导览、英文检索和外文文献入口。",
    defaults: { goal: "paper", quiet: 4, power: true, longStay: false, english: true, facility: false },
  },
  {
    id: "teacher",
    name: "教师",
    short: "新书与期刊追踪",
    insight: "关注研究方向、课程参考书和学术资源持续更新。",
    defaults: { goal: "teaching", quiet: 4, power: false, longStay: false, english: true, facility: false },
  },
];

const spaces = [
  {
    id: "S01",
    name: "二楼靠窗电源复习区",
    type: "long",
    tags: ["power", "quiet", "longStay", "exam"],
    floor: "二楼",
    crowd: 78,
    quiet: 4,
    reason: "适合需要电脑、平板和长时间复习的用户，但高峰期应限制空占。",
  },
  {
    id: "S02",
    name: "三楼东侧低噪音角落",
    type: "quiet",
    tags: ["quiet", "longStay", "exam", "review"],
    floor: "三楼",
    crowd: 46,
    quiet: 5,
    reason: "人流较少，适合焦虑感较强或需要独处的学习任务。",
  },
  {
    id: "S03",
    name: "一楼快速学习与热水便利区",
    type: "facility",
    tags: ["facility", "review", "freshman"],
    floor: "一楼",
    crowd: 62,
    quiet: 2,
    reason: "靠近入口、热水和厕所，适合短时复习，不适合高度安静需求。",
  },
  {
    id: "S04",
    name: "外文藏书邻近座位",
    type: "international",
    tags: ["english", "quiet", "power", "paper"],
    floor: "地下一层",
    crowd: 38,
    quiet: 4,
    reason: "靠近外文藏书区，减少留学生和英文文献用户找书路径成本。",
  },
  {
    id: "S05",
    name: "教师文献阅览工位",
    type: "teacher",
    tags: ["teacher", "quiet", "teaching", "english"],
    floor: "四楼",
    crowd: 35,
    quiet: 5,
    reason: "用于教师短时查阅期刊和课程参考书，减少被打扰概率。",
  },
  {
    id: "S06",
    name: "午间弹性周转座位",
    type: "dynamic",
    tags: ["review", "freshman", "facility"],
    floor: "一楼",
    crowd: 54,
    quiet: 3,
    reason: "适合午间离馆后返馆的短时学习，保留动态调度以保障公平。",
  },
];

const resources = [
  {
    id: "R01",
    name: "C语言基础与专业课书架路线",
    type: "book",
    popularity: "popular",
    tags: ["review", "freshman", "general"],
    reason: "把检索编号转化为楼层、区域和书架主题，回应找书困难。",
  },
  {
    id: "R02",
    name: "考研专业课真题与外文参考书包",
    type: "exam",
    popularity: "niche",
    tags: ["exam", "longStay"],
    reason: "聚合分散资料，减少考研学生一页页检索的成本。",
  },
  {
    id: "R03",
    name: "外文期刊数据库英文入口",
    type: "english",
    popularity: "niche",
    tags: ["english", "paper", "international", "teacher"],
    reason: "为英文文献用户提供入口说明和关键词检索提示。",
  },
  {
    id: "R04",
    name: "研究方向新书追踪",
    type: "new",
    popularity: "new",
    tags: ["teacher", "teaching", "english"],
    reason: "按研究方向和课程方向主动提醒新书、期刊和参考教材。",
  },
  {
    id: "R05",
    name: "新生图书馆使用导航",
    type: "guide",
    popularity: "popular",
    tags: ["freshman", "guide", "facility"],
    reason: "解释楼层、规则、检索和设施位置，降低新用户门槛。",
  },
  {
    id: "R06",
    name: "冷门学术专著曝光清单",
    type: "niche",
    popularity: "niche",
    tags: ["teacher", "exam", "english"],
    reason: "避免推荐只集中在热门通俗资源，保留小众学术内容曝光。",
  },
];

let selectedRole = "general";

const $ = (id) => document.getElementById(id);

function renderRoles() {
  $("roleGrid").innerHTML = roles
    .map(
      (role) => `
        <button class="role-card ${role.id === selectedRole ? "active" : ""}" data-role="${role.id}">
          <strong>${role.name}</strong>
          <span>${role.short}</span>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".role-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectedRole = button.dataset.role;
      applyRoleDefaults();
      renderRoles();
      renderRecommendations();
    });
  });
}

function applyRoleDefaults() {
  const role = roles.find((item) => item.id === selectedRole);
  const defaults = role.defaults;
  $("profileTitle").textContent = `${role.name}模式`;
  $("profileInsight").textContent = role.insight;
  $("goal").value = defaults.goal;
  $("quiet").value = defaults.quiet;
  $("power").checked = defaults.power;
  $("longStay").checked = defaults.longStay;
  $("english").checked = defaults.english;
  $("facility").checked = defaults.facility;
}

function context() {
  return {
    role: selectedRole,
    timeSlot: $("timeSlot").value,
    goal: $("goal").value,
    quiet: Number($("quiet").value),
    power: $("power").checked,
    longStay: $("longStay").checked,
    english: $("english").checked,
    facility: $("facility").checked,
  };
}

function scoreSpace(space, ctx) {
  let score = 20;
  const reasons = [];
  if (space.tags.includes(ctx.role)) {
    score += 24;
    reasons.push("匹配用户身份");
  }
  if (space.tags.includes(ctx.goal)) {
    score += 20;
    reasons.push("匹配学习目标");
  }
  if (ctx.power && space.tags.includes("power")) {
    score += 18;
    reasons.push("满足电源需求");
  }
  // v1.1: 考研学生长期学习权重提高，回应用户反馈F-001
  const longStayBonus = ctx.role === "exam" ? 24 : 18;
  if (ctx.longStay && space.tags.includes("longStay")) {
    score += longStayBonus;
    reasons.push("适合长时间学习");
  }
  // v1.1: 留学生模式下外文空间权重提高，回应用户反馈F-004
  const englishBonus = ctx.role === "international" ? 24 : 18;
  if (ctx.english && space.tags.includes("english")) {
    score += englishBonus;
    reasons.push("靠近或支持外文资源");
  }
  if (ctx.facility && space.tags.includes("facility")) {
    score += 14;
    reasons.push("靠近便利设施");
  }
  score += Math.max(0, 12 - Math.abs(ctx.quiet - space.quiet) * 4);
  // v1.1: 低拥挤空间加分提高，考研/教师模式下更高，回应用户反馈F-007
  const crowdBonus = (ctx.role === "exam" || ctx.role === "teacher") ? 14 : 8;
  if (space.crowd < 50) {
    score += crowdBonus;
    reasons.push("拥挤度较低");
  }
  if (ctx.timeSlot === "noon" && space.type === "dynamic") {
    score += 12;
    reasons.push("适合午间流转");
  }
  if (ctx.timeSlot === "evening" && space.quiet >= 4) {
    score += 8;
    reasons.push("晚间更适合低噪音区域");
  }
  return { ...space, score: Math.min(score, 100), reasons };
}

function scoreResource(resource, ctx) {
  let score = 18;
  const reasons = [];
  if (resource.tags.includes(ctx.role)) {
    score += 25;
    reasons.push("匹配用户身份");
  }
  if (resource.tags.includes(ctx.goal)) {
    score += 22;
    reasons.push("匹配学习目标");
  }
  // v1.1: 留学生模式下英文资源权重显著提高，回应用户反馈F-004
  const englishBonus = ctx.role === "international" ? 28 : ctx.role === "teacher" ? 24 : 20;
  if (ctx.english && resource.tags.includes("english")) {
    score += englishBonus;
    reasons.push("满足英文资源需求");
  }
  if (ctx.longStay && resource.tags.includes("longStay")) {
    score += 10;
    reasons.push("支持长期复习");
  }
  if (ctx.facility && resource.tags.includes("facility")) {
    score += 8;
    reasons.push("包含设施或规则指引");
  }
  // v1.1: 小众资源基础权重显著提高，回应用户反馈F-002, F-005, F-008
  // 考研学生和教师模式下冷门资源加分更多
  const nicheBonus = (ctx.role === "exam" || ctx.role === "teacher") ? 14 : 10;
  if (resource.popularity === "niche") {
    score += nicheBonus;
    reasons.push("小众资源保留曝光");
  }
  // v1.1: 新资源加分提高，教师模式下更高，回应用户反馈F-005
  const newBonus = ctx.role === "teacher" ? 18 : ctx.role === "exam" ? 14 : 10;
  if (resource.popularity === "new") {
    score += newBonus;
    reasons.push("新资源主动追踪");
  }
  // v1.1: 热门资源不再享有隐式加分（无额外加分即为相对惩罚）
  return { ...resource, score: Math.min(score, 100), reasons };
}

function diversify(items, kind, ctx) {
  const sorted = [...items].sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 4);

  if (kind === "resource") {
    // v1.1: 确保至少2个小众或新资源（原为1个），回应用户反馈F-008
    const initialNiche = top.filter(
      (item) => item.popularity === "niche" || item.popularity === "new"
    ).length;
    let nicheReplaced = 0;
    const targetNiche = Math.max(0, 2 - initialNiche);
    for (let i = top.length - 1; i >= 0 && nicheReplaced < targetNiche; i--) {
      if (top[i].popularity === "popular") {
        const replacement = sorted.find(
          (item) =>
            (item.popularity === "niche" || item.popularity === "new") &&
            !top.includes(item)
        );
        if (replacement) {
          top[i] = replacement;
          nicheReplaced++;
        } else {
          break;
        }
      }
    }

    // v1.1: 留学生模式下确保至少2个英文资源，回应用户反馈F-004
    if (ctx.role === "international") {
      const initialEng = top.filter((item) => item.tags.includes("english")).length;
      let engReplaced = 0;
      const targetEng = Math.max(0, 2 - initialEng);
      for (let i = top.length - 1; i >= 0 && engReplaced < targetEng; i--) {
        if (!top[i].tags.includes("english")) {
          const replacement = sorted.find(
            (item) => item.tags.includes("english") && !top.includes(item)
          );
          if (replacement) {
            top[i] = replacement;
            engReplaced++;
          } else {
            break;
          }
        }
      }
    }

    // v1.1: 教师模式下确保至少2个新书或英文学术资源
    if (ctx.role === "teacher") {
      const initialAcad = top.filter(
        (item) => item.popularity === "new" || item.tags.includes("english")
      ).length;
      let acadReplaced = 0;
      const targetAcad = Math.max(0, 2 - initialAcad);
      for (let i = top.length - 1; i >= 0 && acadReplaced < targetAcad; i--) {
        if (!(top[i].popularity === "new" || top[i].tags.includes("english"))) {
          const replacement = sorted.find(
            (item) =>
              (item.popularity === "new" || item.tags.includes("english")) &&
              !top.includes(item)
          );
          if (replacement) {
            top[i] = replacement;
            acadReplaced++;
          } else {
            break;
          }
        }
      }
    }

    // v1.1: 考研学生模式下确保至少2个考试资料或冷门专业资源
    if (ctx.role === "exam") {
      const initialExam = top.filter(
        (item) =>
          item.tags.includes("exam") ||
          item.popularity === "niche" ||
          item.popularity === "new"
      ).length;
      let examReplaced = 0;
      const targetExam = Math.max(0, 2 - initialExam);
      for (let i = top.length - 1; i >= 0 && examReplaced < targetExam; i--) {
        if (
          !(
            top[i].tags.includes("exam") ||
            top[i].popularity === "niche" ||
            top[i].popularity === "new"
          )
        ) {
          const replacement = sorted.find(
            (item) =>
              (item.tags.includes("exam") ||
                item.popularity === "niche" ||
                item.popularity === "new") &&
              !top.includes(item)
          );
          if (replacement) {
            top[i] = replacement;
            examReplaced++;
          } else {
            break;
          }
        }
      }
    }
  }

  if (kind === "space") {
    // v1.1: 确保至少2个低拥挤空间（原为1个），回应用户反馈F-007
    const initialLow = top.filter((item) => item.crowd < 50).length;
    let lowReplaced = 0;
    const targetLow = Math.max(0, 2 - initialLow);
    for (let i = top.length - 1; i >= 0 && lowReplaced < targetLow; i--) {
      if (top[i].crowd >= 50) {
        const replacement = sorted.find(
          (item) => item.crowd < 50 && !top.includes(item)
        );
        if (replacement) {
          top[i] = replacement;
          lowReplaced++;
        } else {
          break;
        }
      }
    }

    // v1.1: 留学生模式下确保至少1个外文相关空间
    if (ctx.role === "international") {
      const hasEngSpace = top.some((item) => item.tags.includes("english"));
      if (!hasEngSpace) {
        const replacement = sorted.find(
          (item) => item.tags.includes("english") && !top.includes(item)
        );
        if (replacement) top[top.length - 1] = replacement;
      }
    }
  }

  return top.sort((a, b) => b.score - a.score);
}

function renderCard(item, kind) {
  const extra =
    kind === "space"
      ? `<span class="tag">楼层：${item.floor}</span><span class="tag ${item.crowd < 50 ? "good" : "warn"}">拥挤度 ${item.crowd}%</span><span class="tag">安静 ${item.quiet}/5</span>`
      : `<span class="tag">${item.type}</span><span class="tag ${item.popularity === "popular" ? "warn" : "good"}">${labelPopularity(item.popularity)}</span>`;

  const reasons = item.reasons.length ? item.reasons.join("、") : "基础匹配";
  return `
    <article class="recommend-card">
      <h3>${item.name}</h3>
      <div class="meta-row">${extra}<span class="tag good">得分 ${item.score}</span></div>
      <p><strong>推荐理由：</strong>${reasons}。${item.reason}</p>
      <div class="score-line"><div style="width:${item.score}%"></div></div>
    </article>
  `;
}

function labelPopularity(value) {
  return {
    popular: "热门",
    niche: "小众",
    new: "新资源",
  }[value] || value;
}

function renderAudit(selectedSpaces, selectedResources) {
  const lowCrowd = selectedSpaces.filter((item) => item.crowd < 50).length;
  const power = selectedSpaces.filter((item) => item.tags.includes("power")).length;
  const niche = selectedResources.filter((item) => item.popularity === "niche").length;
  const newRes = selectedResources.filter((item) => item.popularity === "new").length;
  const english = selectedResources.filter((item) => item.tags.includes("english")).length;
  const metrics = [
    ["低拥挤空间", `${lowCrowd}/${selectedSpaces.length}`, "避免只按空位数量推荐"],
    ["电源支持", `${power}/${selectedSpaces.length}`, "回应高电源依赖需求"],
    ["小众资源", `${niche}/${selectedResources.length}`, "抑制热门偏见（v1.1 最低2项）"],
    ["新资源", `${newRes}/${selectedResources.length}`, "主动追踪新上架资源"],
    ["英文资源", `${english}/${selectedResources.length}`, "覆盖留学生和学术用户"],
  ];
  $("auditGrid").innerHTML = metrics
    .map(
      ([title, value, desc]) => `
        <div class="audit-item">
          <span>${title}</span>
          <strong>${value}</strong>
          <p>${desc}</p>
        </div>
      `
    )
    .join("");
}

function renderRecommendations() {
  const ctx = context();
  const selectedSpaces = diversify(spaces.map((item) => scoreSpace(item, ctx)), "space", ctx);
  const selectedResources = diversify(resources.map((item) => scoreResource(item, ctx)), "resource", ctx);

  $("spaceResults").innerHTML = selectedSpaces.map((item) => renderCard(item, "space")).join("");
  $("resourceResults").innerHTML = selectedResources.map((item) => renderCard(item, "resource")).join("");
  $("spaceCount").textContent = `${selectedSpaces.length} 项`;
  $("resourceCount").textContent = `${selectedResources.length} 项`;
  renderAudit(selectedSpaces, selectedResources);
}

function renderFeedback() {
  const feedback = JSON.parse(localStorage.getItem("libraryFeedback") || "[]");
  if (!feedback.length) {
    $("feedbackList").innerHTML = `<div class="empty">尚未记录试用反馈</div>`;
    return;
  }
  $("feedbackList").innerHTML = feedback
    .map(
      (item) => `
        <div class="feedback-item">
          <strong>${item.user}</strong>
          <p>正面：${item.positive}</p>
          <p>改进：${item.negative}</p>
        </div>
      `
    )
    .join("");
}

function bindEvents() {
  $("recommendBtn").addEventListener("click", renderRecommendations);
  ["timeSlot", "goal", "quiet", "power", "longStay", "english", "facility"].forEach((id) => {
    $(id).addEventListener("change", renderRecommendations);
  });

  $("feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = {
      user: $("feedbackUser").value.trim() || "匿名试用者",
      positive: $("feedbackPositive").value.trim() || "未填写",
      negative: $("feedbackNegative").value.trim() || "未填写",
    };
    const feedback = JSON.parse(localStorage.getItem("libraryFeedback") || "[]");
    feedback.unshift(entry);
    localStorage.setItem("libraryFeedback", JSON.stringify(feedback.slice(0, 8)));
    $("feedbackForm").reset();
    renderFeedback();
  });
}

renderRoles();
applyRoleDefaults();
bindEvents();
renderRecommendations();
renderFeedback();
