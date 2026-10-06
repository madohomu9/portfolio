/* ==========================================================
   projects.js - 项目数据（来源：profile.md 项目经历）
   ----------------------------------------------------------
   新增项目：在数组末尾添加一个对象即可，无需改动其他代码。
   字段说明：
     id          唯一标识（用于 alt 文本等）
     title       项目名称
     category    项目类别
     date        完成时间
     tech        技术栈数组
     summary     项目简介
     layout      展示版式：'stacked' 整宽大图 | 'split' 图文分栏
     imagePrompt 项目图片描述（用于生成封面图）
     image       可选：若提供了图片地址，则优先使用（替换本地截图）
   ========================================================== */
var projects = [
  {
    id: 'grade-manager',
    title: '学生成绩管理系统',
    category: '控制台应用',
    date: '2026.06',
    tech: ['Java', 'MySQL', 'JDBC'],
    summary: '基于控制台开发的简易学生成绩管理系统。实现学生信息、课程信息、成绩的录入、查询、修改、删除功能；使用MySQL存储数据，通过JDBC完成数据库连接与交互；做了简单输入校验，防止非法数据录入，适合后端基础练习项目。',
    layout: 'split',
    image: 'assets/images/grade-manager.jpg',
    imagePrompt: 'simple console application interface for a student grade management system, dark terminal window with Chinese text menus and student record tables, monospace font, clean minimal developer screenshot'
  },
  {
    id: 'personal-blog',
    title: '个人博客网页',
    category: '前端网页',
    date: '2026.07',
    tech: ['HTML', 'CSS', 'JavaScript'],
    summary: '静态个人博客展示网页。包含首页、文章列表、关于我页面；使用CSS完成页面布局与样式美化，JavaScript实现简单交互：导航栏切换、回到顶部按钮；适配电脑端浏览，用来练习前端基础布局能力。',
    layout: 'stacked',
    image: 'assets/images/personal-blog.jpg',
    imagePrompt: 'static personal blog webpage screenshot, homepage with article list and sidebar, clean typography, white background with warm orange accent details, modern minimal web design'
  },
  {
    id: 'course-qa',
    title: '学习通',
    category: 'AI 应用',
    date: '2026.07',
    tech: ['Python', 'FastAPI', 'RAG', '向量检索', '大语言模型 API', 'Streamlit'],
    summary: '“课语通”是一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。',
    layout: 'split',
    image: 'assets/images/course-qa.jpg',
    imagePrompt: 'AI course Q&A assistant web application interface, chat window showing question answer with cited sources and quiz section, knowledge base sidebar, modern light UI with blue accent, dashboard mockup'
  },
  {
    id: 'book-scraper',
    title: 'Python图书信息爬虫小工具',
    category: '数据采集',
    date: '2026.08',
    tech: ['Python', 'requests', 'BeautifulSoup'],
    summary: '一款简易网页爬虫程序，对公开图书网页进行数据爬取，抓取书名、作者、价格等信息；将爬取到的数据保存到本地csv表格；加入延时访问策略，防止访问频率过高，练习Python网络数据处理能力。',
    layout: 'stacked',
    image: 'assets/images/book-scraper.jpg',
    imagePrompt: 'command line Python web scraping tool running in a terminal, code editor with Python script and csv table preview on the side, dark theme developer tools aesthetic, clean screenshot'
  }
];
