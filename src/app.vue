<template>
  <v-app>
    <v-container
      fluid
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-dupes-grid
            :title="title"
            :group-field="groupField"
            :ignore-field="ignoreField"
            :columns="columns"
            :data="data"
            :multi-select="multiSelect"
            :filter-able="filterAble"
            :pagination="pagination"
            :reorder-able="reorderAble"
            :enable-undo="enableUndo"
            :enable-sm-dup="enableSmDup"
            :sm-dup-action="smDupAction"
            :currency="currency"
            :unique-column="uniqueColumn"
            :action-column="actionColumn"
            :status-column="statusColumn"
            :conflicted-header-css="conflictedHeaderCss"
            :conflicted-cell-css="conflictedCellCss"
            :editable-css="editableCss"
            :highlight-css="highlightCss"
            :on-update-check-group="onUpdateCheckGroup"
            :on-update-check-currency="onUpdateCheckCurrency"
            :on-update-check-text="onUpdateCheckText"
            :on-edit-check-currency="onEditCheckCurrency"
            :on-edit-check-text="onEditCheckText"
            :on-edit-text="onEditText"
            :on-edit-link="onEditLink"
            :on-ignore-record="onIgnoreRecord"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import columns from './data/columns'
  import data from './data/data'

  export default {
    name: 'App',
    components: {
    },
    data () {
      return {
        title: 'Account',
        groupField: 'group_id',
        ignoreField: 'is_ignored',
        columns: columns,
        data: data,
        multiSelect: false,
        filterAble: true,
        pagination: true,
        reorderAble: true,
        enableUndo: true,
        enableSmDup: true,
        smDupAction: 'merge',
        currency: '$',
        uniqueColumn: true,
        actionColumn: true,
        statusColumn: true,
        conflictedHeaderCss: 'red lighten-2',
        conflictedCellCss: 'red lighten-3',
        editableCss: 'green lighten-1',
        highlightCss: 'light-blue lighten-1 white--text',
      }
    },
    computed: {
    },
    created () {
    },
    mounted () {
    },
    methods: {
      onUpdateCheckGroup (field, item, groupItems) {

      },
      onUpdateCheckCurrency (checkField, item, groupItems) {

      },
      onUpdateCheckText (checkField, item, groupItems) {

      },
      onEditCheckCurrency (group, field, oldValue, newValue) {

      },
      onEditCheckText (group, field, oldValue, newValue) {

      },
      onEditText (group, field, oldValue, newValue) {

      },
      onEditLink (group, field, oldValue, newValue) {

      },
      onIgnoreRecord (item, isIgnored) {

      },
    },
  }
</script>
