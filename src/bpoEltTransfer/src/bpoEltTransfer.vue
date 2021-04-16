<template>
  <div class="bpo-table-transfer">
    <div class="bpo-table-transfer-panel">
      <p class="transfer-panel-header">
        <span>{{ titleTexts && titleTexts[0] }}</span>
        <span>{{ leftSelection.length }}/{{ slicedData.length }}</span>
      </p>
      <div class="bpo-table-transfer-left-header">
        <slot name="left-header"/>
      </div>
      <el-table
        ref="leftTable"
        size="small"
        :max-height="maxHeight"
        :height="minHeight"
        :data="slicedData"
        :row-key="rowKey"
        @selection-change="handleLeftSelectionChange"
        border
        stripe>
        <el-table-column
          width="40px"
          type="selection"
        />
        <slot name="left-table-columns"/>
      </el-table>
      <slot name="left-footer"/>
    </div>
    <div class="bpo-table-transfer-button-tray">
      <el-button
        type="primary"
        :class="buttonClasses"
        :disabled="disabledLeftButton"
        @click="addToRight">
        <span v-if="buttonTexts[0] !== undefined" class="button-text">{{ buttonTexts[0] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button
        type="primary"
        :class="buttonClasses"
        :disabled="rightSelection.length === 0"
        @click="addToLeft">
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[1] !== undefined" class="button-text">{{ buttonTexts[1] }}</span>
      </el-button>
    </div>
    <div class="bpo-table-transfer-panel">
      <p class="transfer-panel-header">
        <span>{{ titleTexts && titleTexts[1] }}</span>
        <span>{{ rightSelection.length }}/{{ valueCopy.length }}</span>
      </p>
      <slot name="right-header"/>
      <el-table
        ref="rightTable"
        size="small"
        :max-height="maxHeight"
        :height="minHeight"
        :data="valueCopy"
        :row-key="rowKey"
        @selection-change="handleRightSelectionChange"
        border
        stripe>
        <el-table-column width="40px" type="selection"/>
        <slot name="right-table-columns"/>
      </el-table>
      <slot name="right-footer">
        <el-pagination
          style="float: right;margin: 5px;"
          :total="valueCopy.length"
          layout="total">
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BpoEltTransfer',
  props: {
    value: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    // 标题文本
    //TODO: i18n
    titleTexts: {
      type: Array,
      default() {
        return ['待选项', '已选项']
      }
    },
    // 按钮文本
    buttonTexts: {
      type: Array,
      default() {
        return []
      }
    },
    // 表格最小高度
    minHeight: {
      type: String,
      default: '300px'
    },
    // 表格最大高度
    maxHeight: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      valueCopy: [...this.value],
      totalSize: 0,
      leftSelection: [],
      rightSelection: []
    }
  },
  computed: {
    hasButtonTexts() {
      return this.buttonTexts.length === 2
    },
    buttonClasses() {
      return ['transfer-button', {'is-with-texts': this.hasButtonTexts}]
    },
    disabledLeftButton() {
      return !this.leftSelection.some(leftRow => !this.value.some(rightRow => leftRow[this.rowKey] === rightRow[this.rowKey]))
    },
    slicedData() {
      return this.data.filter(item => !this.valueCopy.some(o => o[this.rowKey] === item[this.rowKey]))
    }
  },
  methods: {
    handleLeftSelectionChange(selection) {
      this.leftSelection = selection
    },
    handleRightSelectionChange(selection) {
      this.rightSelection = selection
    },
    addToRight() {
      this.valueCopy.push(...this.leftSelection)
      this.$emit('input', this.valueCopy)
    },
    addToLeft() {
      //差集
      this.valueCopy = _.xorWith(this.rightSelection, this.valueCopy)
      this.$emit('input', this.valueCopy)
    }
  }
}
</script>

<style scoped>
.bpo-table-transfer {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon-arrow-right, .el-icon-arrow-left {
  font-size: 40px;
  cursor: pointer;
}

.bpo-table-transfer-panel {
  border: 1px solid #EBEEF5;
  border-radius: 4px;
  overflow: hidden;
  background: #FFF;
  display: inline-block;
  width: calc((100% - 100px) / 2);
  max-height: 100%;
  box-sizing: border-box;
  position: relative
}

.bpo-table-transfer-panel .transfer-panel-header {
  height: 40px;
  line-height: 40px;
  background: #F5F7FA;
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #EBEEF5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #000;
}

.transfer-panel-header span:last-child {
  position: absolute;
  right: 15px;
}

.bpo-table-transfer-button-tray {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
}

.transfer-button {
  display: block;
  margin: 0 auto;
  padding: 10px;
  border-radius: 4px;
  color: #FFF;
  background-color: #409EFF;
  font-size: 0;
}

.transfer-button .button-text {
  margin-left: 2px;
  margin-right: 5px;
}

.transfer-button.is-with-texts {
  border-radius: 4px;
}

.transfer-button.is-disabled, .transfer-button.is-disabled:hover {
  border: 1px solid #DCDFE6;
  background-color: #F5F7FA;
  color: #C0C4CC;
}

.transfer-button:first-child {
  margin-bottom: 10px;
}

.transfer-button:nth-child(2) {
  margin: 0 auto;
}

.transfer-button i, .transfer-button span {
  font-size: 14px;
}

.bpo-table-transfer-left-header {
  padding: 10px;
}
</style>
