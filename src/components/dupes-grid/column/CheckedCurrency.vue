<template>
  <td
    :class="css"
  >
    <v-checkbox
      v-model="currencyCheck"
      :readonly="currencyCheck"
      color="primary"
      dense
      hide-details
      :label="formattedCurrency"
      class="mt-0"
    />
  </td>
</template>

<script>
  let fmtNumber = require('format-number')

  export default {
    name: 'VdgGridColumnCheckedCurrency',
    components: {
    },
    props: {
      currency: {
        type: String,
        required: true,
        default: () => '$',
      },
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
        type: Number,
        required: true,
        default: () => 0,
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
        currencyCheck: true,
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

      formattedCurrency () {
        let self = this
        return fmtNumber({ prefix: self.currency, suffix: '' })(this.value)
      },
    },
    watch: {
    },
    created () {
      this.currencyCheck = this.checkValue
    },
    mounted: function () {
    },
    updated: function () {
      this.$nextTick(function () {
        this.$emit('check-currency-updated', this.checkField, this.item, this.groupItems)
      })
    },
    methods: {
    },
  }
</script>
