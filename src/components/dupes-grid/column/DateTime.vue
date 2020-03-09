<template>
  <td
    :class="css"
  >
    {{ value | formatDT }}
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnDateTime',
    components: {
    },
    props: {
      value: {
        type: String,
        required: true,
        default: () => '',
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
      }
    },
    computed: {
      css () {
        let self = this
        let css = 'text-no-wrap text-center'

        if (self.isConflicted) {
          css += ' ' + self.conflictedCss
        }

        return css
      },
    },
    methods: {
    },
  }
</script>
