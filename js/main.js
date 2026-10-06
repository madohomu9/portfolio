/* ==========================================================
   main.js - 页面渲染与交互
   1. 根据 projects 数据渲染项目列表
   2. 滚动时高亮当前导航
   3. 入场淡入动画（尊重 prefers-reduced-motion）
   4. 页脚年份
   5. 深浅主题切换（localStorage 记忆）
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 工具函数 ---------- */
  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  /* ---------- 1. 渲染项目列表 ---------- */
  function renderProjects() {
    var list = document.getElementById('projectsList');
    if (!list || !Array.isArray(projects) || projects.length === 0) return;

    var splitCount = 0;

    projects.forEach(function (project, index) {
      var article = createEl('article', 'project reveal');

      // 版式与分栏方向
      var isSplit = project.layout === 'split';
      if (isSplit) {
        splitCount++;
        var reverse = splitCount % 2 === 0; // 偶数个分栏项目时图在左侧
        article.classList.add('project--split');
        if (reverse) article.classList.add('reverse');
      }

      // 序号（01 起）
      var num = String(index + 1).padStart(2, '0');

      // 头部：序号 + 标题 + 元信息
      var head = createEl('div', 'project-head');
      head.appendChild(createEl('span', 'project-index', num));

      var headText = createEl('div', 'project-head-text');

      // 项目名称 + 类别标签
      var titleRow = createEl('div', 'project-title-row');
      titleRow.appendChild(createEl('h3', 'project-title', project.title));
      titleRow.appendChild(createEl('span', 'project-tag', project.category));
      headText.appendChild(titleRow);

      var meta = createEl('div', 'project-meta');
      meta.appendChild(createEl('span', 'meta-date', project.date));
      headText.appendChild(meta);
      head.appendChild(headText);

      // 图片
      var media = createEl('div', 'project-media');
      var img = document.createElement('img');
      img.alt = project.title + ' 封面';
      img.loading = 'lazy';
      if (project.image) {
        img.src = project.image;
      } else {
        var url = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image';
        img.src = url + '?prompt=' + encodeURIComponent(project.imagePrompt) + '&image_size=landscape_16_9';
      }
      media.appendChild(img);

      // 正文：简介 + 技术栈
      var body = createEl('div', 'project-body');
      var textWrap = createEl('div', 'project-text');
      textWrap.appendChild(createEl('p', 'project-summary', project.summary));

      var tags = createEl('ul', 'tags');
      project.tech.forEach(function (tech) {
        tags.appendChild(createEl('li', null, tech));
      });
      textWrap.appendChild(tags);
      body.appendChild(textWrap);

      article.appendChild(head);
      article.appendChild(media);
      article.appendChild(body);
      list.appendChild(article);
    });
  }

  /* ---------- 2. 导航高亮 ---------- */
  function initNavHighlight() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var sections = links
      .map(function (link) {
        return document.getElementById(link.getAttribute('data-target'));
      })
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          links.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('data-target') === id);
          });
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- 3. 入场淡入 ---------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (items.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('in');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- 4. 页脚年份 ---------- */
  function initYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 5. 深浅主题切换 ---------- */
  function initTheme() {
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    var STORAGE_KEY = 'theme';

    function applyTheme(theme) {
      var isDark = theme === 'dark';
      root.setAttribute('data-theme', theme);
      if (toggle) {
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? '切换到浅色主题' : '切换到深色主题');
      }
    }

    // 读取上次选择（localStorage 可能被禁用，容错处理）
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* 忽略存储不可用 */ }

    applyTheme(saved === 'dark' ? 'dark' : 'light');

    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch (e) { /* 忽略存储不可用 */ }
      });
    }
  }

  /* ---------- 启动 ---------- */
  // 主题需在渲染前同步应用，避免首屏闪烁
  initTheme();

  document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    initNavHighlight();
    initReveal();
    initYear();
  });
})();
