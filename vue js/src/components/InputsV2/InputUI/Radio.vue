<template>
  <div :class="colSizes">
    <h2 class="select-title" v-if="id != 'condition'">
      {{ translatedName }}
      <span class="text-danger" v-show="required">*</span>
    </h2>

    <b-form-radio-group
      :options="options"
      @input="inputValue"
      value-field="value"
      text-field="title"
      :checked="value"
      stacked
    ></b-form-radio-group>
    <!-- <b-form-radio
      v-for="opt in options"
      :id="opt.uuid"
      @change="inputValue(opt.value)"
      :checked="opt.value == value"
      :name="opt.title"
      :key="opt.uuid"
      :value="opt.value"
      >{{ translated(opt.value, opt.title) }}</b-form-radio
    > -->
  </div>
</template>

<script>
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';

export default {
  name: 'Radio',

  extends: AbstractInput,
  data() {
    return {};
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
    },
    inputValue(val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
