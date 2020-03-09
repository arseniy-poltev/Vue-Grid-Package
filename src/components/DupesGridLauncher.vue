<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <vdg-grid
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
          @update-check-group="onUpdateCheckGroup"
          @update-check-currency="onUpdateCheckCurrency"
          @update-check-text="onUpdateCheckText"
          @edit-check-currency="onEditCheckCurrency"
          @edit-check-text="onEditCheckText"
          @edit-text="onEditText"
          @edit-link="onEditLink"
          @ignore-record="onIgnoreRecord"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import VdgGrid from './DupesGrid'

  export default {
    components: {
      VdgGrid,
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
      onUpdateCheckGroup: {
        type: Function,
        required: false,
        default: () => function (field, item, groupItems) {},
      },
      onUpdateCheckCurrency: {
        type: Function,
        required: false,
        default: () => function (checkField, item, groupItems) {},
      },
      onUpdateCheckText: {
        type: Function,
        required: false,
        default: () => function (checkField, item, groupItems) {},
      },
      onEditCheckCurrency: {
        type: Function,
        required: false,
        default: () => function (group, field, oldValue, newValue) {},
      },
      onEditCheckText: {
        type: Function,
        required: false,
        default: () => function (group, field, oldValue, newValue) {},
      },
      onEditText: {
        type: Function,
        required: false,
        default: () => function (group, field, oldValue, newValue) {},
      },
      onEditLink: {
        type: Function,
        required: false,
        default: () => function (group, field, oldValue, newValue) {},
      },
      onIgnoreRecord: {
        type: Function,
        required: false,
        default: () => function (item, isIgnored) {},
      },
    },
    computed: {
    },
    methods: {
    },
  }
</script>
