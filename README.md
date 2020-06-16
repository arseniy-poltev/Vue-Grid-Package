# vuetify-dupes-grid
Vuetify Dupes Grid components for Vuetify.js

## Installation

```shell
npm install --save vuetify-dupes-grid

or

yarn add vuetify-dupes-grid
```

## Demo

```
shell:
npm install
npm run dev

url:
http://localhost:8080
```

## Usage

Once installed, it can be used in a template as simply as:

```js
import Vue from 'vue'
import VuetifyDupesGrid from 'vuetify-dupes-grid'

Vue.use(VuetifyDupesGrid)
```

## Usage from Github

```
1. Copy the components folder in your project.
components
+-- dupes-grid directory
+-- DupesGrid.vue
+-- DupesGridLauncher.vue

2. Add this code at "plugins\components.js" of your project.
import DupesGridLauncher from './../components/DupesGridLauncher'
const componentName = 'v-dupes-grid'
const install = Vue => {
  Vue.component(componentName, DupesGridLauncher)
}
export default install

3. Add this code at "plugins\vuetify.js" of your project.
import DupesGridLauncher from './components'
Vue.use(DupesGridLauncher)

4. Use the component at your project.

- Column
    [
        {
            type: 'groupnumber',
            text: 'Number',
            align: 'center',
            sortable: false,
            filterable: false,
            divider: true,
        },
        {
            type: 'checkgroup',
            text: 'Master',
            value: 'master',
            align: 'center',
            sortable: false,
            filterable: false,
            divider: true,
        },
        {
            type: 'link',
            text: 'Account Name',
            value: 'account_name',
            checkValue: 'master',
            align: 'center',
            sortable: true,
            filterable: true,
            divider: true,
        },
        {
            type: 'checkedcurrency',
            text: 'Account Revenue',
            value: 'account_revenue',
            checkValue: 'is_account_revenue',
            align: 'center',
            sortable: true,
            filterable: true,
            editable: true,
            conflictable: true,
            divider: true,
        },
        {
            type: 'text',
            text: 'Billing State/Province',
            value: 'billing_state_province',
            checkValue: 'master',
            align: 'center',
            sortable: true,
            filterable: true,
            editable: true,
            divider: true,
        },
        {
            type: 'checkedtext',
            text: 'Owner Name',
            value: 'owner_name',
            checkValue: 'is_owner_name',
            align: 'center',
            sortable: true,
            filterable: true,
            editable: true,
            conflictable: true,
            divider: true,
        },
    ]
    
- Data
    [
        {
            id: 1,
            group_id: 1,
            master: false,
            account_name: 'ACS',
            linkUrl: 'https://www.salesforce.com/u/acs',
            account_revenue: 100000,
            is_account_revenue: true,
            billing_state_province: 'NY',
            owner_name: 'Charles F. Chandler',
            is_owner_name: true,
            billing_street1: 'H-257, Block-D',
            billing_street2: 'One Old Country Rd',
            account_phone: '(785)241-6200',
            created: '2019-11-14T19:11:14Z',
            is_ignored: false,
        },
        {
            id: 2,
            group_id: 1,
            master: true,
            account_name: 'A.C.S.',
            linkUrl: 'https://www.salesforce.com/u/acs',
            account_revenue: 0,
            is_account_revenue: false,
            billing_state_province: 'WT',
            owner_name: 'Customer A.',
            is_owner_name: false,
            billing_street1: 'One Old Country Rd',
            billing_street2: 'H-257, Block-D',
            account_phone: '(875)421-0062',
            created: '2019-11-15T19:12:14Z',
            is_ignored: false,
        },
    ]
- HTML
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

- Script
export default {
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
        onIgnoreRecord (item, isIgnored){
        
        },
    },
}

5. Node Package Dependency
    "autolinker": "^3.11.1",
    "date-fns": "^2.6.0",
    "escape-goat": "^2.1.1",
    "eslint-config-vuetify": "^0.4.0",
    "format-number": "^3.0.0",
    "moment": "^2.24.0",
    "msgdown": "^1.0.2",
    "sortablejs": "^1.10.1",
    "timetoreadable": "^1.2.2",
    "vue": "^2.6.10",
    "vue-timeago": "^5.1.2",
    "vuetify": "^2.1.10"
```

## Column
```
{
    type: 'checkedcurrency',
    text: 'Account Revenue',
    value: 'account_revenue',
    checkValue: 'is_account_revenue',
    align: 'center',
    sortable: true,
    filterable: true,
    editable: true,
    conflictable: true,
    divider: true,
},
```
| Name        	    | Type      | Description                           |
| ----------------- | --------- | ------------------------------------- |
| type              | String	| Column Type.  groupnumber, checkgroup, link, checkedcurrency, text, checkedtext, datetime are possible |
| text              | String    | Text to display at the header.        |
| value             | String    | Field value to be mapped.             |
| checkValue        | String    | Field value for the checkbox.         |
| align             | String    | Cell alignment. left, center, right are possible  |
| sortable          | Boolean   | Sortable column.                      |
| filterable        | Boolean   | Filterable column.                    |
| editable          | Boolean   | Editable column.                      |
| conflictable      | Boolean   | Conflictable column.                  |

## Data Example
```
{
    id: 1,
    group_id: 1,
    master: false,
    account_name: 'ACS',
    linkUrl: 'https://www.salesforce.com/u/acs',
    account_revenue: 100000,
    is_account_revenue: true,
    billing_state_province: 'NY',
    owner_name: 'Charles F. Chandler',
    is_owner_name: true,
    billing_street1: 'H-257, Block-D',
    billing_street2: 'One Old Country Rd',
    account_phone: '(785)241-6200',
    created: '2019-11-14T19:11:14Z',
    is_ignored: false,
}
```

## Properties

| Name        	            | Type              | Default Value                     | Description                          |
| --------------------------| ----------------- | --------------------------------- | ------------------------------------ |
| title                 	| String	        |                                   | Header title.                        |
| group-field               | String            |                                   | Field name to be group by.           |
| ignore-field		        | String            |                                   | Field name to be ignored.            |
| columns                 	| Array             | []                                | Header columns.                      |
| data                     	| Array          	| []                                | Data to display.                     |
| multi-select              | Boolean           | false                             | Select single or multiple rows.      |
| filter-able               | Boolean           | true                              | Filterable.                          |
| pagination                | Boolean           | true                              | Paginateable.                        |
| reorder-able              | Boolean           | true                              | Column reorderable or not.           |
| currency                  | String            | $                                 | Currency symbol.                     |
| unique-column             | Boolean           | true                              | Column field unique.                 |
| action-column             | Boolean           | true                              | Show/hide action column.             |
| status-column             | Boolean           | true                              | Show/hide status column.             |
| conflicted-header-css     | String            | red lighten-2                     | Conflicted header columns css.       |
| conflicted-cell-css       | String            | red lighten-3                     | Conflicted cell css.                 |
| editable-css              | String            | green lighten-1                   | Editable cell css.                   |
| highlight-css             | String            | light-blue lighten-1 white--text  | Highlight cell css.                  |

## Event Functions

| Name                      | Arguments                         | Description                                               |
| --------------------------| --------------------------------- | --------------------------------------------------------- |
| on-update-check-group     | field, item, groupItems           | Fires when user update checkedgroup cell.                 |
| on-update-check-currency  | checkField, item, groupItems      | Fires when user update checkedcurrency cell.              |
| on-update-check-text      | checkField, item, groupItems      | Fires when user update checkedtext cell.                  |
| on-edit-check-currency    | group, field, oldValue, newValue  | Fires when user edit checkedcurrency cell at final record.|
| on-edit-check-text        | group, field, oldValue, newValue  | Fires when user edit checkedtext cell at final record.    |
| on-edit-text              | group, field, oldValue, newValue  | Fires when user edit text cell at final record.           |
| on-edit-link              | group, field, oldValue, newValue  | Fires when user edit link cell at final record.           |
| on-ignore-record          | item, isIgnored                   | Fires when user ignore or disignore a record.             |
