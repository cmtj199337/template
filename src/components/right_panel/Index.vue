<template>
  <div
    class="handle-button"
    :style="{'top': buttonTop+'px','background-color': theme}"
    @click="show= true"
  >
    <i class="el-icon-setting" />
  </div>
  <el-drawer
    title="设置"
    v-model="show"
    size="300px"
    destroy-on-close
  >
    <slot />
  </el-drawer>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    buttonTop: {
      type: Number,
      default: 250
    }
  },
  setup () {
    const show = ref(false)
    const store = useStore()
    const theme = computed(() => {
      return store.state.settings.theme
    })
    return {
      show,
      theme
    }
  }
})
</script>

<style lang="scss" scoped>

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
