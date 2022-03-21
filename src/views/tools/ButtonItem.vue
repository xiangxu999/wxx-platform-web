<script>
export default {
  name: 'ButtonItem',
  functional: true,
  props: {
    buttonType: {
      type: String,
      default: 'primary'
    }
  },
  render(createElement, context) {
    const vnodes = []
    vnodes.push(<el-button type={ context.props.buttonType}>{context.children}</el-button>)
    return vnodes
  }
}
</script>
