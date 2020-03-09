<template>
  <td
    :class="css"
  >
    <v-btn
      color="primary"
      :href="linkUrl"
      target="_blank"
      text
      class="text-none text-no-wrap"
    >
      {{ value }}
    </v-btn>
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnLink',
    components: {
    },
    props: {
      linkUrl: {
        type: String,
        required: true,
        default: () => '',
      },
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
        let css = 'text-none text-no-wrap'

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
