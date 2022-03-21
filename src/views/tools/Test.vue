<template>
  <div class="app-container">
    <button-item button-type="success">按钮1</button-item>
    <button-item button-type="primary">按钮2</button-item>
    <button-item button-type="waring">按钮3</button-item>
    <button-item button-type="info">按钮4</button-item>
  </div>
</template>

<script>
import ButtonItem from '@/views/tools/ButtonItem'
export default {
  name: 'Test',
  components: {
    ButtonItem
  }
}
</script>
