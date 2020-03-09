<style>
  .reorderable {
    cursor: pointer;
  }

  .theme--light.v-data-table thead tr th {
    background-color: #efefef;
    color: black;
  }

  .theme--light.v-data-table thead tr th:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
  .theme--light.v-data-table thead tr th:last-child {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }

  .theme--light.v-data-table tbody tr td:not(.v-data-table__mobile-row) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }

  .theme--light.v-data-table tbody tr td:not(.v-data-table__mobile-row):last-child {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }
</style>
<template>
  <v-data-table
    :key="headerNo"
    v-reorderable="reorderAble ? {onEnd:sortTheHeadersAndUpdateTheKey} : {disabled: true}"

    :headers="realColumn"
    :items="isValidData ? realData : []"
    item-key="id"

    :show-select="multiSelect"
    :group-by="groupField"
    :search="filterKey"
    multi-sort
    :hide-default-footer="!pagination"
    :disable-pagination="!pagination"
  >
    <template
      v-slot:top
    >
      <vdg-grid-header
        :title="title"
        :total-group-count="totalGroupCount"
        :ignored-count="ignoredCount"
        :filter-able="filterAble"
        :enable-undo="enableUndo"
        :enable-sm-dup="enableSmDup"
        :sm-dup-action="smDupAction"
        :show-hide-ignored="ignoredCount>0"
        @filter-updated="updateFilter"
        @show-ignored-rows="showIgnoredRows"
      />
    </template>

    <template
      v-slot:group="props"
    >
      <tr
        v-for="item in props.items"
        :key="item.id"
      >
        <td v-if="multiSelect">
          <v-checkbox
            color="primary"
            label=""
          />
        </td>

        <template
          v-for="(col, index) in realColumn"
        >
          <vdg-grid-column-action
            v-if="actionColumn && col.type === 'action'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + 'action'"
            :ignore-field="ignoreField"
            :item="item"
            @ignore-record="ignoreRecord"
          />

          <vdg-grid-column-status
            v-else-if="statusColumn && col.type === 'status'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + 'status'"
            :ignore-field="ignoreField"
            :item="item"
          />

          <vdg-grid-column-group-number
            v-else-if="col.type === 'groupnumber'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + 'groupnumber'"
            :group-number="item.no"
          />
          <vdg-grid-column-check-group
            v-else-if="col.type === 'checkgroup'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.value].toString()"
            :field="col.value"
            :value="item[col.value]"
            :item="item"
            :group-items="props.items"
            @check-group-updated="updateCheckGroup"
          />
          <vdg-grid-column-link
            v-else-if="col.type === 'link'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.value].toString()"
            :value="item[col.value]"
            :link-url="item.linkUrl"
            :is-conflicted="col.is_conflicted"
            :conflicted-css="conflictedCellCss"
          />
          <vdg-grid-column-checked-currency
            v-else-if="col.type === 'checkedcurrency'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.checkValue].toString()"
            :currency="currency"
            :field="col.value"
            :value="item[col.value]"
            :check-field="col.checkValue"
            :check-value="item[col.checkValue]"
            :item="item"
            :group-items="props.items"
            :is-conflicted="col.is_conflicted"
            :conflicted-css="conflictedCellCss"
            @check-currency-updated="updateCheckCurrency"
          />
          <vdg-grid-column-text
            v-else-if="col.type === 'text'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.value].toString()"
            :value="item[col.value]"
            :is-conflicted="col.is_conflicted"
            :conflicted-css="conflictedCellCss"
          />
          <vdg-grid-column-checked-text
            v-else-if="col.type === 'checkedtext'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.checkValue].toString()"
            :field="col.value"
            :value="item[col.value]"
            :check-field="col.checkValue"
            :check-value="item[col.checkValue]"
            :item="item"
            :group-items="props.items"
            :is-conflicted="col.is_conflicted"
            :conflicted-css="conflictedCellCss"
            @check-text-updated="updateCheckText"
          />
          <vdg-grid-column-date-time
            v-else-if="col.type === 'datetime'"
            :key="item.id.toString() + '-*-' + index.toString() + '-*-' + item[col.value].toString()"
            :value="item[col.value]"
            :is-conflicted="col.is_conflicted"
            :conflicted-css="conflictedCellCss"
          />
        </template>
      </tr>

      <tr
        class="green lighten-3"
      >
        <template
          v-for="(col, index) in realColumn"
        >
          <vdg-grid-grouped-column-group-number
            v-if="col.type === 'groupnumber'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :col-span="finalColSpan"
            title="Final"
          />
          <vdg-grid-grouped-column-check-group
            v-else-if="col.type === 'checkgroup'"
            :key="props.group.toString() + '-*-' + index.toString()"
          />
          <vdg-grid-grouped-column-link
            v-else-if="col.type === 'link'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :group-items="props.items"
            :field="col.value"
            :check-field="col.checkValue"
            :group-field="groupField"
            :editable="col.editable"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :final-data="finalData"
            @link-edited="editLink"
          />
          <vdg-grid-grouped-column-checked-currency
            v-else-if="col.type === 'checkedcurrency'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :group-items="props.items"
            :field="col.value"
            :check-field="col.checkValue"
            :group-field="groupField"
            :currency="currency"
            :editable="col.editable"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :final-data="finalData"
            @checked-currency-edited="editCheckedCurrency"
          />
          <vdg-grid-grouped-column-text
            v-else-if="col.type === 'text'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :group-items="props.items"
            :field="col.value"
            :check-field="col.checkValue"
            :group-field="groupField"
            :editable="col.editable"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :final-data="finalData"
            @text-edited="editText"
          />
          <vdg-grid-grouped-column-checked-text
            v-else-if="col.type === 'checkedtext'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :group-items="props.items"
            :field="col.value"
            :check-field="col.checkValue"
            :group-field="groupField"
            :editable="col.editable"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :final-data="finalData"
            @checked-text-edited="editCheckedText"
          />
          <vdg-grid-grouped-column-date-time
            v-else-if="col.type === 'datetime'"
            :key="props.group.toString() + '-*-' + index.toString()"
            :group-items="props.items"
            :field="col.value"
            :check-field="col.checkValue"
            :group-field="groupField"
            :editable="col.editable"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :final-data="finalData"
            @datetime-edited="editText"
          />
        </template>
      </tr>

      <tr>
        <td
          :colspan="finalColSpan + columns.length"
        />
      </tr>
    </template>

    <template
      v-slot:no-data
    >
      {{ noDataText }}
    </template>
  </v-data-table>
</template>

<script>
  import Sortable from 'sortablejs'

  import VdgGridHeader from './dupes-grid/Header'

  import VdgGridColumnGroupNumber from './dupes-grid/column/GroupNumber'
  import VdgGridColumnCheckGroup from './dupes-grid/column/CheckGroup'
  import VdgGridColumnLink from './dupes-grid/column/Link'
  import VdgGridColumnCheckedCurrency from './dupes-grid/column/CheckedCurrency'
  import VdgGridColumnText from './dupes-grid/column/Text'
  import VdgGridColumnCheckedText from './dupes-grid/column/CheckedText'
  import VdgGridColumnDateTime from './dupes-grid/column/DateTime'

  import VdgGridGroupedColumnGroupNumber from './dupes-grid/grouped-column/GroupNumber'
  import VdgGridGroupedColumnCheckGroup from './dupes-grid/grouped-column/CheckGroup'
  import VdgGridGroupedColumnLink from './dupes-grid/grouped-column/Link'
  import VdgGridGroupedColumnCheckedCurrency from './dupes-grid/grouped-column/CheckedCurrency'
  import VdgGridGroupedColumnText from './dupes-grid/grouped-column/Text'
  import VdgGridGroupedColumnCheckedText from './dupes-grid/grouped-column/CheckedText'
  import VdgGridGroupedColumnDateTime from './dupes-grid/grouped-column/DateTime'
  import VdgGridColumnAction from './dupes-grid/column/Action'
  import VdgGridColumnStatus from './dupes-grid/column/Status'

  function watchClass (targetNode, classToWatch) {
    let lastClassState = targetNode.classList.contains(classToWatch)
    const observer = new MutationObserver((mutationsList) => {
      for (let i = 0; i < mutationsList.length; i++) {
        const mutation = mutationsList[i]
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const currentClassState = mutation.target.classList.contains(classToWatch)
          if (lastClassState !== currentClassState) {
            lastClassState = currentClassState
            if (!currentClassState) {
              mutation.target.classList.add('reorderable')
            }
          }
        }
      }
    })
    observer.observe(targetNode, { attributes: true })
  }

  export default {
    name: 'VdgGrid',
    components: {
      VdgGridHeader,

      VdgGridColumnAction,
      VdgGridColumnStatus,
      VdgGridColumnGroupNumber,
      VdgGridColumnCheckGroup,
      VdgGridColumnLink,
      VdgGridColumnCheckedCurrency,
      VdgGridColumnText,
      VdgGridColumnCheckedText,
      VdgGridColumnDateTime,

      VdgGridGroupedColumnGroupNumber,
      VdgGridGroupedColumnCheckGroup,
      VdgGridGroupedColumnLink,
      VdgGridGroupedColumnCheckedCurrency,
      VdgGridGroupedColumnText,
      VdgGridGroupedColumnCheckedText,
      VdgGridGroupedColumnDateTime,
    },
    directives: {
      'reorderable': {
        inserted: (el, binding) => {
          el.querySelectorAll('th').forEach((draggableEl) => {
            watchClass(draggableEl, 'reorderable')
            draggableEl.classList.add('reorderable')
          })
          Sortable.create(el.querySelector('tr'), binding.value ? { ...binding.value, handle: '.reorderable' } : {})
        },
      },
    },
    props: {
      title: {
        type: String,
        required: true,
        default: () => '',
      },
      groupField: {
        type: String,
        required: true,
        default: () => '',
      },
      ignoreField: {
        type: String,
        required: true,
        default: () => '',
      },
      columns: {
        type: Array,
        required: true,
        default: () => [],
      },
      data: {
        type: Array,
        required: true,
        default: () => [],
      },
      multiSelect: {
        type: Boolean,
        required: true,
        default: () => false,
      },
      filterAble: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      pagination: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      reorderAble: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      enableUndo: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      enableSmDup: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      smDupAction: {
        type: String,
        required: true,
        default: () => 'send',
      },
      currency: {
        type: String,
        required: true,
        default: () => '$',
      },
      uniqueColumn: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      actionColumn: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      statusColumn: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      conflictedHeaderCss: {
        type: String,
        required: true,
        default: () => 'red lighten-2',
      },
      conflictedCellCss: {
        type: String,
        required: true,
        default: () => 'red lighten-3',
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
    },
    data () {
      return {
        isValidData: true,
        realColumn: [],
        realData: [],

        finalData: [],

        filterKey: '',
        headerNo: 1,

        isIgnored: true,
        totalGroupCount: 0,
        ignoredCount: 0,

        noDataText: 'No data available.',
      }
    },
    computed: {
      finalColSpan () {
        let self = this
        let colSpan = 1

        if (self.multiSelect) {
          colSpan++
        }

        if (self.actionColumn) {
          colSpan++
        }

        if (self.statusColumn) {
          colSpan++
        }

        return colSpan
      },
    },
    created () {
      let self = this

      if (self.data.length < 1) {
        self.noDataText = 'No data available.'
        self.isValidData = false
      }

      if (!(self.groupField in self.data[0])) {
        self.noDataText = 'Group Field [' + self.groupField + "] doesn't exist in data."
        self.isValidData = false
      }

      if (!(self.ignoreField in self.data[0])) {
        self.noDataText = 'Ignore Field [' + self.ignoreField + "] doesn't exist in data."
        self.isValidData = false
      }

      if (self.uniqueColumn) {
        let arrFields = []
        for (let i = 0; i < self.realColumn.length; i++) {
          if (self.realColumn[i].value) {
            arrFields.push(self.realColumn[i].value)
          }
        }

        let sortedFields = arrFields.slice().sort()
        let dupFields = []
        for (let i = 0; i < sortedFields.length - 1; i++) {
          if (sortedFields[i + 1] === sortedFields[i]) {
            dupFields.push(sortedFields[i])
          }
        }

        if (dupFields.length > 0) {
          self.isValidData = false
          self.noDataText = 'Fields are duplicated : [ '

          for (let i = 0; i < dupFields.length; i++) {
            self.noDataText += dupFields.join()
          }

          self.noDataText += ' ]'
        }
      }

      self.fetchColumn()
      self.fetchData()
      self.fetchColumnConflict()
    },
    methods: {
      fetchColumn () {
        let self = this

        if (self.actionColumn) {
          self.realColumn.push({
            type: 'action',
            text: 'Actions',
            value: 'action',
            align: 'center',
            sortable: false,
            filterable: false,
            divider: true,
          })
        }

        if (self.statusColumn) {
          self.realColumn.push({
            type: 'status',
            text: 'Status',
            value: 'status',
            align: 'center',
            sortable: false,
            filterable: false,
            divider: true,
          })
        }

        for (let i = 0; i < self.columns.length; i++) {
          self.realColumn.push(self.columns[i])
        }
      },

      fetchData () {
        let self = this

        if (!self.isValidData) {
          return
        }

        let tempData = self.data.sort((a, b) => (a[self.groupField] > b[self.groupField]) ? 1 : ((b[self.groupField] > a[self.groupField]) ? -1 : 0))
        let groupData = []
        let ignoredCount = 0

        tempData.forEach(function (item) {
          let i = groupData.findIndex(x => x.group === item[self.groupField])
          if (i <= -1) {
            groupData.push({ no: 0, group: item[self.groupField], count: 0 })
          }
        })

        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i][self.ignoreField]) {
            ignoredCount++
          }

          let index = groupData.findIndex(x => x.group === tempData[i][self.groupField])
          if (index > -1) {
            groupData[index].count++
          }
        }

        for (let i = 0; i < groupData.length; i++) {
          groupData[i].no = i + 1
        }

        let lastGroupIndex = -1
        let groupLength = 0

        if (self.isIgnored) {
          tempData = tempData.filter(function (obj) { return obj[self.ignoreField] === false })
        }

        for (let i = 0; i < tempData.length; i++) {
          let groupIndex = groupData.findIndex(x => x.group === tempData[i][self.groupField])

          if (lastGroupIndex !== groupIndex) {
            lastGroupIndex = groupIndex
            groupLength = 1
            tempData[i]['no'] = groupData[groupIndex].no + '.' + groupLength
          } else {
            groupLength++
            tempData[i]['no'] = groupData[groupIndex].no + '.' + groupLength
          }
        }

        self.totalGroupCount = groupData.length
        self.ignoredCount = ignoredCount
        self.realData = tempData
      },

      fetchColumnConflict () {
        let self = this
        let conflictColumn = []

        for (let i = 0; i < self.realColumn.length; i++) {
          let col = self.realColumn[i]
          if (col.type !== 'action' && col.type !== 'status' && col.conflictable) {
            conflictColumn.push({ index: i, field: col.value, is_conflicted: false })
          }
        }

        for (let i = 0; i < conflictColumn.length; i++) {
          let unique = [...new Set(self.realData.map(a => a[conflictColumn[i].field]))]

          if (unique.length > 0 && self.realData.length !== unique.length) {
            conflictColumn[i].is_conflicted = true
          }
        }

        for (let i = 0; i < conflictColumn.length; i++) {
          self.realColumn[conflictColumn[i].index]['is_conflicted'] = conflictColumn[i].is_conflicted

          if (conflictColumn[i].is_conflicted) {
            self.realColumn[conflictColumn[i].index]['class'] = self.conflictedHeaderCss
          }
        }
      },

      showIgnoredRows (status) {
        let self = this
        self.isIgnored = status
        self.fetchData()
      },

      sortTheHeadersAndUpdateTheKey (evt) {
        const headersTmp = this.realColumn
        const oldIndex = evt.oldIndex
        const newIndex = evt.newIndex
        if (newIndex >= headersTmp.length) {
          let k = newIndex - headersTmp.length + 1
          while (k--) {
            headersTmp.push(undefined)
          }
        }
        headersTmp.splice(newIndex, 0, headersTmp.splice(oldIndex, 1)[0])
        this.table = headersTmp
        this.headerNo += 1
      },

      updateFilter (filter) {
        this.filterKey = filter
      },

      updateCheckGroup (name, item, groupItems) {
        let self = this
        let index = -1
        for (let i = 0; i < groupItems.length; i++) {
          index = self.realData.indexOf(groupItems[i])
          self.realData[index][name] = false
        }

        index = self.realData.indexOf(item)
        self.realData[index][name] = true

        self.$emit('update-check-group', name, item, groupItems)
      },

      updateCheckCurrency (checkField, item, groupItems) {
        let self = this
        let index = -1

        for (let i = 0; i < groupItems.length; i++) {
          index = self.realData.indexOf(groupItems[i])
          self.realData[index][checkField] = false
        }

        index = self.realData.indexOf(item)
        self.realData[index][checkField] = true

        self.$emit('update-check-currency', checkField, item, groupItems)
      },

      updateCheckText (checkField, item, groupItems) {
        let self = this
        let index = -1

        for (let i = 0; i < groupItems.length; i++) {
          index = self.realData.indexOf(groupItems[i])
          self.realData[index][checkField] = false
        }

        index = self.realData.indexOf(item)
        self.realData[index][checkField] = true

        self.$emit('update-check-text', checkField, item, groupItems)
      },

      editCheckedCurrency (group, field, oldValue, newValue) {
        let self = this
        let index = -1

        index = self.finalData.findIndex(x => x.group === group && x.field === field)
        if (index > -1) {
          self.finalData[index].old_value = oldValue
          self.finalData[index].new_value = newValue
        } else {
          self.finalData.push({ group: group, field: field, old_value: oldValue, new_value: newValue })
        }

        self.$emit('edit-check-currency', group, field, oldValue, newValue)
      },

      editCheckedText (group, field, oldValue, newValue) {
        let self = this
        let index = -1

        index = self.finalData.findIndex(x => x.group === group && x.field === field)
        if (index > -1) {
          self.finalData[index].old_value = oldValue
          self.finalData[index].new_value = newValue
        } else {
          self.finalData.push({ group: group, field: field, old_value: oldValue, new_value: newValue })
        }

        self.$emit('edit-check-text', group, field, oldValue, newValue)
      },

      editText (group, field, oldValue, newValue) {
        let self = this
        let index = -1

        index = self.finalData.findIndex(x => x.group === group && x.field === field)
        if (index > -1) {
          self.finalData[index].old_value = oldValue
          self.finalData[index].new_value = newValue
        } else {
          self.finalData.push({ group: group, field: field, old_value: oldValue, new_value: newValue })
        }

        self.$emit('edit-text', group, field, oldValue, newValue)
      },

      editLink (group, field, oldValue, newValue) {
        let self = this
        let index = -1

        index = self.finalData.findIndex(x => x.group === group && x.field === field)
        if (index > -1) {
          self.finalData[index].old_value = oldValue
          self.finalData[index].new_value = newValue
        } else {
          self.finalData.push({ group: group, field: field, old_value: oldValue, new_value: newValue })
        }

        self.$emit('edit-link', group, field, oldValue, newValue)
      },

      ignoreRecord (item, isIgnored) {
        let self = this
        let index = -1
        index = self.data.indexOf(item)
        self.data[index][self.ignoreField] = isIgnored
        self.fetchData()

        self.$emit('ignore-record', item, isIgnored)
      },
    },
  }
</script>
