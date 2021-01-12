<template>
  <div :class="colSizes">
    <h2 class="select-title">
      {{ translatedName }}

      <div
        v-if="is_cart_attribute"
        class="tooltip"
        v-b-tooltip.hover
        title="This is variants option, can be skipped in this section"
      >
        <font-awesome-icon :icon="['fa', 'shapes']" class="ml-2 fsm" />
        <!-- <span class="tooltiptext">This is variants option, can be skipped in this section</span> -->
      </div>
      <span class="text-danger" v-show="required">*</span>
    </h2>
    <b-form-input
      class="input-green-shadow"
      @input="inputValue"
      :value="value"
      :type="type"
    ></b-form-input>
  </div>
</template>

<script>
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';
import _ from 'lodash';
export default {
  name: 'Text-Field',
  extends: AbstractInput,

  data() {
    return {};
  },
  methods: {},
  computed: {
    translatedName() {
      const slug = this.id.replace(/-/g, '_');
      return this.trans(`attr.${slug}`, null, this.name);
      // return `attr.${slug}`;
    }
  },
  methods: {
    inputValue(val) {
      this.$emit('input', val);
    }
  },

  created() {
    if (this.default) {
      this.inputValue(this.default);
    }
  }
};
</script>

<style lang="scss" scoped></style>
