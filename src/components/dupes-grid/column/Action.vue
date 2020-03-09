<template>
  <td
    :class="css"
  >
    <v-menu
      close-on-content-click
      offset-y
    >
      <template v-slot:activator="{on}">
        <v-btn
          icon
          color="primary"
          dark
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-subheader>Row Actions</v-subheader>
        <v-divider />
        <v-list-item
          v-if="item[ignoreField]"
          key="dont_ignore_this_record"
          @click="ignoreRecord(false)"
        >
          <v-list-item-icon>
            <v-icon
              color="blue"
            >
              mdi-eye-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Don't ignore this record</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="!item[ignoreField]"
          key="ignore_this_record"
          @click="ignoreRecord(true)"
        >
          <v-list-item-icon>
            <v-icon
              color="red"
            >
              mdi-eye-off-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Ignore this record</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </td>
</template>

<script>

  export default {
    name: 'VdgGridColumnAction',
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
      ignoreRecord (isIgnored) {
        let self = this
        this.$emit('ignore-record', self.item, isIgnored)
      },
    },
  }
</script>
