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
                :data="category.books"
                style="width: 100%">
                <el-table-column
                  label="书名" align="left"
                  width="200px">
                  <template slot-scope="scope">
                    <el-button type="text" @click="goDetail(scope.row.book_name)">
                      <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="出版社" align="left" width="200px">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.publisher }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="购买" align="center" width="200px">
                  <template slot-scope="scope">
                    <el-button
                      size="mini" icon="el-icon-plus"
                      @click="handleAddCart(scope.row.id)">
                      加入购物车
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
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
