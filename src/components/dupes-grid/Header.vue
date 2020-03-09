<template>
  <v-container
    fluid
  >
    <v-row>
      <v-toolbar
        flat
        dense
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <span
          class="ml-5 subtitle-2 indigo--text"
        >
          {{ totalGroupCount }} Data Sets Found
          <span
            v-if="ignoredCount>0"
            class="subtitle-2 indigo--text"
          >
            ({{ ignoredCount }} Ignored)
          </span>
        </span>
        <v-spacer />
        <v-btn
          small
          text
          color="primary"
          class="text-none text-no-wrap"
        >
          <v-icon left>
            mdi-dots-vertical
          </v-icon> Show/Hide Columns
        </v-btn>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-toolbar
        flat
        dense
      >
        <v-btn
          v-if="enableSmDup"
          small
          outlined
          color="primary"
          class="text-none text-no-wrap mr-3"
        >
          <template
            v-if="smDupAction === 'send'"
          >
            <v-icon left>
              mdi-send
            </v-icon> Send Duplicate
          </template>
          <template
            v-else-if="smDupAction === 'merge'"
          >
            <v-icon left>
              mdi-database-plus
            </v-icon> Merge Duplicate
          </template>
        </v-btn>
        <v-btn
          v-if="enableUndo"
          small
          outlined
          color="primary"
          class="text-none text-no-wrap"
        >
          <v-icon left>
            mdi-replay
          </v-icon> Undo
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="showHideIgnored"
          :color="showIgnoredRows ? 'blue' : 'red'"
          text
          small
          class="text-none text-no-wrap mr-5"
          @click="showIgnoredRows = !showIgnoredRows"
        >
          {{ showIgnoredRows ? 'Show Ignored Rows' : 'Hide Ignored Rows' }}
        </v-btn>
        <v-text-field
          v-if="filterAble"
          v-model="filterWord"
          append-icon="search"
          label="Search"
          single-line
          dense
          hide-details
        />
      </v-toolbar>
    </v-row>
    <v-row>
      <v-divider />
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'VdgGridHeader',
    components: {
    },
    props: {
      title: {
        type: String,
        required: true,
        default: () => '',
      },
      totalGroupCount: {
        type: Number,
        required: true,
        default: () => 0,
      },
      ignoredCount: {
        type: Number,
        required: true,
        default: () => 0,
      },
      filterAble: {
        type: Boolean,
        required: true,
        default: () => true,
      },
      showHideIgnored: {
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
    },
    data () {
      return {
        filterWord: '',
        showIgnoredRows: true,
      }
    },
    computed: {
    },
    watch: {
      filterWord () {
        this.$emit('filter-updated', this.filterWord)
      },
      showIgnoredRows () {
        this.$emit('show-ignored-rows', this.showIgnoredRows)
      },
    },
    methods: {
    },
  }
</script>
