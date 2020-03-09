<template>
  <td
    :class="css"
  >
    <v-icon
      v-if="!item[ignoreField]"
      color="blue"
    >
      mdi-eye-outline
    </v-icon>
    <v-icon
      v-if="item[ignoreField]"
      color="red"
    >
      mdi-eye-off-outline
    </v-icon>
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnStatus',
    components: {
    },
    props: {
      ignoreField: {
        type: String,
        required: true,
        default: () => '',
      },
      item: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
    data () {
      return {
      }
    },
    computed: {
      css () {
        let css = 'text-center'
        return css
      },
    },
    methods: {
    },
  }
</script>
