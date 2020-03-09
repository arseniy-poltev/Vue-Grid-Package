export default [
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
  {
    type: 'text',
    text: 'Billing Street1',
    value: 'billing_street1',
    checkValue: 'master',
    align: 'center',
    sortable: true,
    filterable: true,
    editable: true,
    divider: true,
  },
  {
    type: 'text',
    text: 'Billing Street2',
    value: 'billing_street2',
    checkValue: 'master',
    align: 'center',
    sortable: true,
    filterable: true,
    divider: true,
  },
  {
    type: 'text',
    text: 'Account Phone',
    value: 'account_phone',
    checkValue: 'master',
    align: 'center',
    sortable: true,
    filterable: true,
    divider: true,
  },
  {
    type: 'datetime',
    text: 'Created',
    value: 'created',
    checkValue: 'master',
    align: 'center',
    sortable: true,
    filterable: true,
    divider: true,
  },
]
