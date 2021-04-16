# bpo-elt-transfer
基于elt-transfer的自用定制, 拆了部分封装，和无用方法，提升了扩展性。
更改了props 和表格的列定义方式，使其更贴合原生el-transfer 和el-table 的使用。提高了客制化能力，并且使用方式更符合直觉。

## 安装
`npm install bpo-elt-transfer`

## 使用
在main.js文件中引入插件并注册
``` js
import bpoEltTransfer from 'bpo-elt-transfer'
Vue.use(bpoEltTransfer)
```

## Attributes
| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| value / v-model | 绑定值 | array | — |
| data | 候选池（左表）的数据源 | array | [] |
| button-texts | 自定义标题文案 | array | ['待选项', '已选项'] |
| title-texts | 自定义按钮文案 | array | ['',''] |
| min-height | 表格最小高度 | string | 300px |
| max-height | 表格最大高度 | string | 500px |
| row-key | 表格行数据的Key | string | id |

## Slot
| 名称 | 说明 |
| :--- | :--- |
| left-header | 自定义左表header |
| left-footer | 自定义左表footer |
| left-table-columns | 左表的列，参照原生el-table-colum 使用|
| left-header | 自定义右表header |
| left-footer | 自定义右表footer, 默认内容为一个右格行数统计 |
| left-table-columns | 右表的列，参照原生el-table-colum 使用|

## NPM
npm地址: [https://www.npmjs.com/package/bpo-elt-transfer](https://www.npmjs.com/package/bpo-elt-transfer)

