<template>
  <td
    :class="css"
  >
    <v-checkbox
      v-model="textCheck"
      :readonly="textCheck"
      color="primary"
      dense
      hide-details
      :label="value"
      class="mt-0"
    />
  </td>
</template>

<script>
  export default {
    name: 'VdgGridColumnCheckedText',
    components: {
    },
    props: {
      checkField: {
        type: String,
        required: true,
        default: () => '',
      },
      checkValue: {
        type: Boolean,
        required: true,
        default: () => false,
      },
      field: {
        type: String,
        required: true,
        default: () => '',
      },
      value: {
        type: String,
        required: true,
        default: () => '',
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
      isConflicted: {
        type: Boolean,
        required: true,
        default: () => false,
      },
      conflictedCss: {
        type: String,
        required: true,
        default: () => 'red lighten-3',
      },
    },
    data () {
      return {
        textCheck: true,
      }
    },
    computed: {
      css () {
        let self = this
        let css = 'text-none text-no-wrap'

        if (self.isConflicted) {
          css += ' ' + self.conflictedCss
        }

        return css
      },
    },
    created () {
      this.textCheck = this.checkValue
    },
    updated: function () {
      this.$nextTick(function () {
        this.$emit('check-text-updated', this.checkField, this.item, this.groupItems)
      })
    },
    methods: {
    },
  }
</script>
