<template>
  <td
    :class="css"
  >
    {{ groupNumber }}
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnGroupNumber',
    components: {
    },
    props: {
      groupNumber: {
        type: String,
        required: true,
        default: () => 0,
      },
    },
    data () {
      return {
      }
    },
    computed: {
      css () {
        let css = 'text-no-wrap text-center'
        return css
      },
    },
    methods: {
    },
  }
</script>
