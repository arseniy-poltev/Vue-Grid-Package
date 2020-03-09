<template>
  <td
    :class="css"
  >
    <v-checkbox
      v-model="checkValue"
      :readonly="checkValue"
      color="primary"
      dense
      hide-details
      class="mt-0 ml-3"
    />
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnCheckGroup',
    components: {
    },
    props: {
      field: {
        type: String,
        required: true,
        default: () => '',
      },
      value: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      item: {
        type: Object,
        required: true,
        default: () => {},
      },
      groupItems: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    data () {
      return {
        checkValue: true,
      }
    },
    computed: {
      css () {
        let css = 'text-center'
        return css
      },
    },
    watch: {
    },
    created () {
      this.checkValue = this.value
    },
    updated: function () {
      this.$nextTick(function () {
        this.$emit('check-group-updated', this.field, this.item, this.groupItems)
      })
    },
    methods: {
    },
  }
</script>
