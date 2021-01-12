<template>
  <div>
    <div class="mb-3">
      <span
        class="product-add-categories"
        v-for="(category, index) in selectedCat"
        :key="category.id"
      >
        {{ translatedText(category.slug, category.text) }}
        <font-awesome-icon
          class="ml-2"
          icon="times"
          @click="removeCategory(index)"
        />
      </span>
    </div>

    <b-button
      v-for="(category, index) in currentCategory"
      @click="inputCategory(category)"
      variant="primary"
      size="sm"
      class="mr-2 mb-2"
      :key="index"
      v-show="!categoryNext"
      >{{ translatedText(category.value, category.title) }}</b-button
    >
  </div>
</template>

<script>
import { arrayToTree } from 'performant-array-to-tree';
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';

export default {
  extends: AbstractInput,

  props: ['options', 'default'],
  data() {
    return {
      categoriesTree: [],
      selectedCat: [],
      categoryNext: false,
      currentCategory: {}
    };
  },
  methods: {
    translatedText(val, title) {
      const slug = val.replace(/-/g, '_');
      return this.trans(`category.${slug}`, null, title);
    },

    inputCategory(category) {
      this.selectedCat.push({
        id: category.uuid,
        text: category.title,
        slug: category.value,
        children: category.children
      });
      this.selectCategory(category.children);
    },

    removeCategory(index) {
      this.categoryNext = false;
      this.selectedCat.splice(index);
      if (this.selectedCat.length != 0) {
        this.selectCategory(
          this.selectedCat[this.selectedCat.length - 1].children
        );
      } else {
        this.$emit('select', null);

        this.initCategories();
      }
    },
    selectCategory(category) {
      this.currentCategory = category;
      this.$emit('input', this.selectedCat[this.selectedCat.length - 1].slug);
    },
    initCategories() {
      this.optionsTree = arrayToTree(this.options, {
        id: 'uuid',
        parentId: 'parent_uuid',
        dataField: null
      });
      this.currentCategory = this.optionsTree;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.value) {
        let tree = [];
        let id = this.options.find(item => item.value == this.value).uuid;
        while (id) {
          this.options.find(item => {
            if (item.uuid == id) {
              tree.push(item);
              id = item.parent_uuid;
            }
          });
          // tree.reverse();
        }
        this.initCategories();
        tree = tree.reverse();

        tree.forEach(treeItem => {
          this.inputCategory(
            this.currentCategory.find(curr => curr.uuid == treeItem.uuid)
          );
        });
      } else {
        this.initCategories();
      }
      // this.initCategories();
    }, 0);
  }
};
</script>

<style lang="scss" scoped></style>
