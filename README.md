.
├── README.md
├── babel.config.js
├── commitlint.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── base.less
│   │   │   └── index.less
│   │   ├── img
│   │   │   ├── login-bg.svg
│   │   │   └── logo.svg
│   │   └── logo.png
│   ├── base-ui
│   │   ├── Breadcrumb
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── Breadcrumb.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── Card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── Card.vue
│   │   ├── Echart
│   │   │   ├── data
│   │   │   │   └── china.json
│   │   │   ├── hooks
│   │   │   │   └── useEchart.ts
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── Echart.vue
│   │   │   └── types.ts
│   │   ├── Form
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── Form.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   └── Table
│   │       ├── index.ts
│   │       ├── src
│   │       │   └── Table.vue
│   │       └── types
│   │           └── index.ts
│   ├── components
│   │   ├── NavHeader
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── NavHeader.vue
│   │   │       └── UserInfo.vue
│   │   ├── NavMenu
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── NavMenu.vue
│   │   ├── PageContent
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── PageContent.vue
│   │   │       └── types.ts
│   │   ├── PageEcharts.vue
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   ├── BarEchart.vue
│   │   │   │   ├── LineEchart.vue
│   │   │   │   ├── MapEchart.vue
│   │   │   │   ├── PieEchart.vue
│   │   │   │   └── RoseEchart.vue
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   └── utils
│   │   │       ├── ConvertData.ts
│   │   │       └── CoordinateData.ts
│   │   ├── PageModal
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── PageModal.vue
│   │   └── PageSearch
│   │       ├── index.ts
│   │       └── src
│   │           └── PageSearch.vue
│   ├── global
│   │   ├── index.ts
│   │   ├── register-element.ts
│   │   └── register-properties.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── menuHooks
│   │   │   ├── types.ts
│   │   │   └── useRouter.ts
│   │   ├── usePageModal.ts
│   │   ├── usePageSearch.ts
│   │   └── usePermission.ts
│   ├── main.ts
│   ├── router
│   │   ├── Main
│   │   │   ├── Analysis
│   │   │   │   ├── Dashboard
│   │   │   │   │   └── Dashboard.ts
│   │   │   │   └── Overview
│   │   │   │       └── Overview.ts
│   │   │   ├── Product
│   │   │   │   ├── Category
│   │   │   │   │   └── Category.ts
│   │   │   │   └── Goods
│   │   │   │       └── Goods.ts
│   │   │   ├── Story
│   │   │   │   ├── Chat
│   │   │   │   │   └── Chat.ts
│   │   │   │   └── List
│   │   │   │       └── List.ts
│   │   │   └── System
│   │   │       ├── Department
│   │   │       │   └── Department.ts
│   │   │       ├── Menu
│   │   │       │   └── Menu.ts
│   │   │       ├── Role
│   │   │       │   └── Role.ts
│   │   │       └── User
│   │   │           └── User.ts
│   │   └── index.ts
│   ├── service
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── main
│   │   │   ├── analysis
│   │   │   │   ├── dashboard.ts
│   │   │   │   └── types.ts
│   │   │   └── system
│   │   │       ├── system.ts
│   │   │       └── types.ts
│   │   ├── request
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── types.ts
│   ├── store
│   │   ├── Login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── Main
│   │   │   ├── Analysis
│   │   │   │   ├── dashboard.ts
│   │   │   │   └── types.ts
│   │   │   └── System
│   │   │       ├── system.ts
│   │   │       └── types.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── types
│   │   ├── global.d.ts
│   │   ├── module.d.ts
│   │   ├── store.d.ts
│   │   └── vue.d.ts
│   ├── utils
│   │   ├── cache.ts
│   │   └── moment.ts
│   └── views
│       ├── Login
│       │   ├── Login.vue
│       │   ├── config
│       │   │   └── account-config.ts
│       │   └── cpns
│       │       ├── LoginAccount.vue
│       │       ├── LoginPanel.vue
│       │       └── LoginPhone.vue
│       ├── Main
│       │   ├── Analysis
│       │   │   ├── Dashboard
│       │   │   │   └── Dashboard.vue
│       │   │   └── Overview
│       │   │       └── Overview.vue
│       │   ├── Main.vue
│       │   ├── Product
│       │   │   ├── Category
│       │   │   │   └── Category.vue
│       │   │   └── Goods
│       │   │       ├── Goods.vue
│       │   │       └── config
│       │   │           ├── content.config.ts
│       │   │           └── search.config.ts
│       │   ├── Story
│       │   │   ├── Chat
│       │   │   │   └── Chat.vue
│       │   │   └── List
│       │   │       └── List.vue
│       │   └── System
│       │       ├── Department
│       │       │   └── Department.vue
│       │       ├── Menu
│       │       │   ├── Menu.vue
│       │       │   └── config
│       │       │       ├── content.config.ts
│       │       │       └── search.config.ts
│       │       ├── Role
│       │       │   ├── Role.vue
│       │       │   └── config
│       │       │       ├── content.config.ts
│       │       │       ├── modal.config.ts
│       │       │       └── search.config.ts
│       │       └── User
│       │           ├── User.vue
│       │           └── config
│       │               ├── content.config.ts
│       │               ├── model.config.ts
│       │               └── search.config.ts
│       └── NotFound
│           └── NotFound.vue
├── tsconfig.json
└── vue.config.js
