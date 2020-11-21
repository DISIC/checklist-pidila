<template>
  <fieldset class="filter-type fieldset-discrete">
    <legend>Filtrer par {{title}}</legend>
    <p class="filter-all">
      <input
        v-model="allIsChecked"
        class="filter_input checkbox"
        value="Tous"
        :id="formattedId('all')"
        type="checkbox"/>
      <label :for="formattedId('all')">Tous</label>
    </p>
    <ul class="list-unstyled">
      <li v-for="tag in data.tags" class="filter">
        <input
          v-model="checkedTags"
          class="filter_input checkbox"
          :value="tag"
          :id="formattedId(tag)"
          type="checkbox"/>
        <label :for="formattedId(tag)">{{tag}}</label>
      </li>
    </ul>
    <p class="filter-link">
      <anchor-link :anchor="'criteria-list'" :css-class="'sr-only sr-only-focusable'" :message="'Accéder à la liste des critères'"/>
    </p>
  </fieldset>
</template>

<script>
  import AnchorLink from '../AnchorLink/index'

  export default {
    components: {AnchorLink},
    name: 'FilterCategory',
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            title: 'Filter is missing',
            tags: []
          }
        }
      }
    },
    methods: {
      formattedId: function (tag) {
        return this.data.title + '_' + tag.replace(/ /g, '_')
      }
    },
    computed: {
      title: function () {
        return this.data.title.toLowerCase()
      },
      checkedTags: {
        get: function () {
          return this.$store.getters.tagsFromFilterTitle(this.data.title)
        },
        set: function (value) {
          const payload = {
            title: this.data.title,
            tags: value
          }
          this.$store.commit('UPDATE_FILTER_TAGS', payload)
        }
      },
      allIsChecked: {
        get: function () {
          return this.checkedTags.length === 0
        },
        set: function () {
          this.checkedTags = []
        }
      }
    }
  }
</script>
