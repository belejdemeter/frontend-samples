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
    <b-form-select
      :value-field="'value'"
      :text-field="'title'"
      :value="value"
      @input="inputValue"
      :size="size"
      :options="translatedOptions"
      class="input-green-shadow"
    ></b-form-select>
  </div>
</template>

<script>
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';

export default {
  extends: AbstractInput,
  name: 'Select',
  props: ['size'],
  data() {
    return {};
  },
  computed: {
    translatedName() {
      const slug = this.id.replace(/-/g, '_');
      return this.trans(`attr.${slug}`, null, this.name);
    },
    translatedOptions() {
      let options = this.options.slice();
      const id = this.id.replace(/-/g, '_');
      return options.map(item => {
        const slug = item.value.replace(/-/g, '_');
        const curreTitle = item.title;
        item.title = this.trans(`attr.${id}_${slug}`, null, curreTitle);
        return item;
      });
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

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  opacity: 1;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
