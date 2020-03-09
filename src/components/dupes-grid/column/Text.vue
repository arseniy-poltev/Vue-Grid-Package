<template>
  <td
    :class="css"
  >
    {{ value }}
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnText',
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
        let css = 'text-no-wrap'

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
