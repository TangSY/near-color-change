<template>
  <div class="body">
    <sketch-picker v-model="colors" />
    <el-form>
      <el-form-item label="待匹配的颜色值">
        <el-input v-model="colors.hex"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="calColor">计算匹配颜色</el-button>
    <div class="text">
      与配色表中最相近的颜色为：{{ colorVar.color }}
      <div
        class="color-mini-block"
        :style="{ background: colorVar.color }"
      ></div>
      ，对应的less变量为：{{ colorVar.less }}
    </div>
    <el-descriptions title="配色表" :column="1" border>
      <el-descriptions-item
        v-for="(k, v) in colorTable"
        :key="k"
        :label="k"
        content-class-name="color-content"
      >
        <div class="color-label">{{ v }}</div>
        <div class="color-block" :style="{ background: v }"></div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { Sketch } from "vue-color";
import { colorVarObj, calNearColor } from "../utils/replace";

export default {
  components: {
    "sketch-picker": Sketch,
  },
  data() {
    return {
      colorTable: colorVarObj,
      colors: { hex: "#000" },
      colorVar: {},
    };
  },
  mounted() {},
  methods: {
    calColor() {
      const [v, r] = calNearColor(this.colors.hex);
      console.log(v, r);
      this.colorVar = { color: r, less: v };
    },
  },
};
</script>
<style lang="stylus">
.body {
  .el-form {
    margin-top: 25px;
  }

  .text {
    margin: 15px 0;
  }

  .color-content {
    display: flex;
    align-items: center;
  }

  .color-label {
    display: inline-block;
    width: 100px;
  }

  .color-block {
    display: inline-block;
    width: 220px;
    height: 30px;
  }

  .color-mini-block {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
}
</style>