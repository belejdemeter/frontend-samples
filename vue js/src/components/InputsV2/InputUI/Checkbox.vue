<template>
  <div :class="colSizes">
    <b-form-checkbox :id="name" v-model="checked" :name="name">
      {{ translatedName }}
    </b-form-checkbox>
  </div>
</template>

<script>
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';

export default {
  name: 'Checkbox',

  extends: AbstractInput,
  data() {
    return {
      checked: this.default_values
    };
  },
  computed: {
    translatedName() {
      const slug = this.id.replace(/-/g, '_');
      return this.trans(`attr.${slug}`, null, this.name);
    }
  },
  methods: {
    translated(val, title) {
      const id = this.id.replace(/-/g, '_');
      const value = val.replace(/-/g, '_');
      return this.trans(`attr.${id}_${value}`, null, title);
    }
  },
  watch: {
    checked() {
      this.$emit('input', this.checked);
    }
  }
};
</script>

<style lang="scss" scoped></style>
