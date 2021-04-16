  <template>
  <bpo-elt-transfer
          :title-texts="['選択する','選択済み']"
          min-height="300"
          max-height="600"
          row-key="userId"
          :data="pageInfo.list"
          v-model="selectedUsers"
        >
          <template #left-header>
            <el-row :gutter="20">
              <el-col :span="8"><span>氏名：</span></el-col>
              <el-col :span="8"><span>メール：</span></el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-input v-model="searchForm.userName" size="mini" clearable/>
              </el-col>
              <el-col :span="8">
                <el-input v-model="searchForm.email" size="mini" clearable/>
              </el-col>
              <el-col :span="5">
                <el-button style="width: 100px" type="primary" size="mini" @click="handleSearch()"><span>检索</span>
                </el-button>
              </el-col>
            </el-row>
          </template>
          <template #left-table-columns>
            <el-table-column
              label="ユーザーID"
              align="left"
              prop="userId"
              header-align="center"
              show-overflow-tooltip
              :min-width="100"
            />
            <el-table-column
              :resizable="false"
              align="left"
              header-align="center"
              label="氏名"
              prop="userName"
              show-overflow-tooltip
              min-width="100">
            </el-table-column>
            <el-table-column
              label="メール"
              align="left"
              prop="email"
              header-align="center"
              show-overflow-tooltip
              :min-width="100"
            />
          </template>
          <template #left-footer>
            <el-pagination style="float: right;margin: 5px;"
                           @current-change="handleCurrentChange"
                           :current-page="pageInfo.pageNum"
                           :page-size="pageInfo.pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="pageInfo.total">
            </el-pagination>
          </template>
          <template #right-table-columns>
            <el-table-column
              label="ユーザーID"
              align="left"
              prop="userId"
              header-align="center"
              show-overflow-tooltip
              :min-width="100"
            />
            <el-table-column
              :resizable="false"
              align="left"
              header-align="center"
              label="氏名"
              prop="userName"
              show-overflow-tooltip
              min-width="100">
            </el-table-column>
            <el-table-column
              label="メール"
              align="left"
              prop="email"
              header-align="center"
              show-overflow-tooltip
              :min-width="100"
            />
          </template>
        </bpo-elt-transfer>
        </template>

        <script>

export default {
  name: 'TransferExample',
  data() {
    return {
      searchForm: {
        userName: '',
        email: ''
      },
      selectedUsers: [],
      pageInfo: {
        list: [
    {
        "userId": "00R43K",
        "userName": "test4",
        "email": "test4@test.com"
    },
    {
        "userId": "1B5BQY",
        "userName": "test2",
        "email": "test2@test.com"
    },
    {
        "userId": "4K091Y",
        "userName": "test3",
        "email": "test3@test.com"
    },
    {
        "userId": "admin",
        "userName": "Admin",
        "email": "admin@jfff.co.jp"
    },
    {
        "userId": "demo01",
        "userName": "Demo01",
        "email": "43434343434@qq.com"
    },
    {
        "userId": "SO1351",
        "userName": "qwqwq",
        "email": "1212@1.c"
    }
],
        pageNum: this.$PAGE_NUM,
        pageSize: this.$PAGE_SIZE,
        total: 0
      }
    }
  },
  methods: {
    handleSearch(searchCondition) {
      this.axios.post('/api/available-user', {
        pageNum: this.$PAGE_NUM,
        pageSize: this.$PAGE_SIZE,
        organizationCode: this.userMapping.organizationCode,
        ...this.searchForm,
        ...searchCondition
      })
        .then(({data}) => {
          this.pageInfo = data.retResult
        })
    },
    handleCurrentChange(val) {
      this.handleSearch({
        pageNum: val,
        pageSize: this.pageInfo.pageSize
      })
    }
  }
}
</script>