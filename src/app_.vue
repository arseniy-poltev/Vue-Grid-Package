<template>
  <v-app>
    <v-container
      fluid
    >
      <v-data-table
        :key="anIncreasingNumber"
        v-sortable-table="{onEnd:sortTheHeadersAndUpdateTheKey}"
        :headers="headers"
        :items="desserts"
        sort-by="calories"
      />
    </v-container>
  </v-app>
</template>

<script>
  import Sortable from 'sortablejs'

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
              mutation.target.classList.add('sortHandle')
            }
          }
        }
      }
    })
    observer.observe(targetNode, { attributes: true })
  }

  export default {
    name: 'App',
    components: {
    },
    directives: {
      'sortable-table': {
        inserted: (el, binding) => {
          el.querySelectorAll('th').forEach((draggableEl) => {
            // Need a class watcher because sorting v-data-table rows asc/desc removes the sortHandle class
            watchClass(draggableEl, 'sortHandle')
            draggableEl.classList.add('sortHandle')
          })
          Sortable.create(el.querySelector('tr'), binding.value ? { ...binding.value, handle: '.sortHandle' } : {})
        },
      },
    },
    data: () => ({
      anIncreasingNumber: 1,
      headers: [
        { text: 'Dessert (100g serving)', value: 'name' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          { name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
          { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
          { name: 'Eclair', calories: 262, fat: 16.0, carbs: 23, protein: 6.0 },
        ]
      },

      sortTheHeadersAndUpdateTheKey (evt) {
        const headersTmp = this.headers
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
        this.anIncreasingNumber += 1
      },
    },
  }
</script>
