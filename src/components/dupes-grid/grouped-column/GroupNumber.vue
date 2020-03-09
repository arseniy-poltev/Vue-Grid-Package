<template>
  <td
    :colspan="colSpan"
  >
    {{ title }}
    <v-icon>mdi-menu-down</v-icon>
  </td>
</template>

<script>

  export default {
    name: 'VdgGridGroupedColumnGroupNumber',
    components: {
    },
    props: {
      colSpan: {
        type: Number,
        required: true,
        default: () => 1,
      },
      title: {
        type: String,
        required: true,
        default: () => 'Final',
      },
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
  }
</script>
