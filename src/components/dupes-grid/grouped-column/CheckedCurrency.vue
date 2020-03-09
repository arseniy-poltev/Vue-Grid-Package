<template>
  <td
    :class="css"
  >
    <v-tooltip
      color="rgba(0,0,0,0)"
      bottom
      :disabled="!isHighlighted"
    >
      <template v-slot:activator="{ on }">
        <div
          v-if="editable"
          style="line-height: 48px"
          v-on="on"
        >
          <v-edit-dialog
            @save="save"
          >
            {{ isEdited ? newValueText : totalCurrency }}
            <template v-slot:input>
              <v-text-field
                v-model="newValue"
                label=""
                single-line
                :prefix="currency"
              />
            </template>
          </v-edit-dialog>
        </div>
        <template
          v-if="!editable"
        >
          {{ totalCurrency }}
        </template>
      </template>
      <v-card
        color="primary"
        outlined
      >
        <v-list
          dense
        >
          <v-list-item>
            <v-list-item-avatar>
              Before:
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ beforeValue }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar
              class="indigo--text"
            >
              After:
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="indigo--text"
              >
                {{ afterValue }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-tooltip>
  </td>
</template>

<script>

  let fmtNumber = require('format-number')

  export default {
    name: 'VdgGridGroupedColumnCheckedCurrency',
    components: {
    },
    props: {
      groupItems: {
        type: Array,
        required: true,
        default: () => [],
      },
      field: {
        type: String,
        required: true,
        default: () => '',
      },
      checkField: {
        type: String,
        required: true,
        default: () => '',
      },
      groupField: {
        type: String,
        required: true,
        default: () => '',
      },
      currency: {
        type: String,
        required: true,
        default: () => '$',
      },
      editable: {
        type: Boolean,
        required: true,
        default: () => false,
      },
      editableCss: {
        type: String,
        required: true,
        default: () => 'green lighten-1',
      },
      highlightCss: {
        type: String,
        required: true,
        default: () => 'light-blue lighten-1 white--text',
      },
      finalData: {
        type: Array,
        required: true,
        default: () => [],
      },
    },
    data () {
      return {
        isEdited: false,
        oldValue: 0,
        newValue: 0,
        newValueText: '',
      }
    },
    computed: {
      totalCurrency () {
        let self = this
        let total = 0
        for (let i = 0; i < self.groupItems.length; i++) {
          if (self.groupItems[i][self.checkField] === true) {
            total += self.groupItems[i][self.field]
          }
        }
        self.oldValue = total
        self.newValue = total
        return fmtNumber({ prefix: self.currency, suffix: '' })(total)
      },

      isHighlighted () {
        let self = this
        let isHighlighted = false
        let index = -1
        index = self.finalData.findIndex(x => x.group === self.groupItems[0][self.groupField] && x.field === self.field)

        if (index > -1) {
          isHighlighted = true
        } else {
          isHighlighted = false
        }

        return isHighlighted
      },

      css () {
        let self = this
        let css = 'text-no-wrap'

        let index = -1
        index = self.finalData.findIndex(x => x.group === self.groupItems[0][self.groupField] && x.field === self.field)

        if (index > -1) {
          css += ' ' + self.highlightCss
        } else {
          if (self.editable) {
            css += ' ' + self.editableCss
          }
        }

        return css
      },

      beforeValue () {
        let self = this
        let index = -1
        index = self.finalData.findIndex(x => x.group === self.groupItems[0][self.groupField] && x.field === self.field)

        return index > -1 ? fmtNumber({ prefix: self.currency, suffix: '' })(self.finalData[index].old_value) : ''
      },

      afterValue () {
        let self = this
        let index = -1
        index = self.finalData.findIndex(x => x.group === self.groupItems[0][self.groupField] && x.field === self.field)

        return index > -1 ? fmtNumber({ prefix: self.currency, suffix: '' })(self.finalData[index].new_value) : ''
      },
    },
    methods: {
      save () {
        let self = this
        self.isEdited = true
        self.newValueText = fmtNumber({ prefix: self.currency, suffix: '' })(self.newValue)
        this.$emit('checked-currency-edited', self.groupItems[0][self.groupField], self.field, self.oldValue, self.newValue)
      },
    },
  }
</script>
