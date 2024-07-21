<el-row class="tac">
<el-col :span="12">
  <el-aside width="200px">
    <!-- newBook -->
    <el-container style="margin-bottom: 20px;">
      <el-main style="background-color: yellow">
        <div v-for="category in categories" :key="category">
          <el-tabs type="border-card" >
            <el-tab-pane :label="category.name">
              <el-table
                :data="cartData" show-summary
                style="width: 100%;padding-left: 0"
                size="mini">
                <!-- 序号 -->
                <el-table-column
                  label="序号"
                  width="50" align="left">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <!-- 序号 -->
                <!-- 书名 -->
                <el-table-column
                  label="书名"
                  width="210">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
                  </template>
                </el-table-column>
                <!-- 书名 -->
                <!-- 价格 -->
                <el-table-column
                  label="单价(￥)" align="center"
                  width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
                <!-- 价格 -->
                <!-- 总价 -->
                <el-table-column
                  label="总价(￥)" align="center" prop="totalAmount"
                  width="80">
                  <template slot-scope="scope">
                    {{ getSum(scope.row) }}
                  </template>
                </el-table-column>
                <!-- 总价 -->
                <!-- 数量 -->
                <el-table-column
                  align="center" label="数量"
                  width="140">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount" size="mini"
                                     :min="1" :max="10" @click="handleChange">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!-- 数量 -->
                <el-table-column align="left">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button
                        size="mini"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.$index, scope.row)"></el-button>
                      <el-button size="mini" @click="goCheckOut">结算</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-row :justify="'center'" type="flex">
          <el-col :span="14">
            <el-card>
              <el-button-group>
                <el-button size="mini" type="primary" plain @click="goCheckOut">结算</el-button>
                <el-button
                  size="mini" type="danger" plain
                  @click="handleFlush">清空购物车</el-button>
              </el-button-group>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- newBook -->
    <!-- sellBook -->
    <el-container style="margin-bottom: 20px;">
      <el-main id="aside-main" style="border-radius: 5px">
        <client-sell></client-sell>
      </el-main>
    </el-container>
    <!-- sellBook -->
  </el-aside>
  <h5>默认颜色</h5>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</el-col>
<el-col :span="12">
  <h5>自定义颜色</h5>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</el-col>
</el-row>
<script>
import ClientNew from './client_components/client-newbook.vue'
import ClientSell from './client_components/client-sell.vue'

export default {
  components: {ClientSell, ClientNew},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
