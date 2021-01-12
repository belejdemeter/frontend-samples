<template>
  <component
    @input="input"
    :is="component"
    v-bind="config"
    :value="value"
    :colSizes="calculateSizes"
    :group="config.group"
  ></component>
</template>

<script>
import TextField from '@/components/InputsV2/InputUI/TextField.vue';
import Select from '@/components/InputsV2/InputUI/Select.vue';
import Checkbox from '@/components/InputsV2/InputUI/Checkbox.vue';
import Radio from '@/components/InputsV2/InputUI/Radio.vue';
import Category from '@/components/InputsV2/InputUI/Category.vue';
import Images from '@/components/InputsV2/InputUI/Images.vue';

export default {
  props: ['config', 'value'],
  name: 'Input-Factory',
  components: {
    TextField,
    Select,
    Checkbox,
    Radio,
    Category,
    Images
  },
  data() {
    return {};
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  },
  computed: {
    component() {
      if (this.config.id == 'category') {
        return 'category';
      }
      if (this.config.id == 'images') {
        return 'images';
      }

      if (
        this.config.presentation === 'text' ||
        this.config.presentation === 'number'
      ) {
        return 'Text-Field';
      }
      if (this.config.presentation === 'select') {
        return 'Select';
      }
      if (this.config.presentation === 'checkbox') {
        return 'Checkbox';
      }
      if (this.config.presentation === 'radio') {
        return 'Radio';
      }
    },
    calculateSizes() {
      if (!this.config.properties) return 'col';
      let size = this.config.properties.size;
      let result = [];
      if (size.sm) {
        result.push('col-' + size.sm);
      }
      if (size.md) {
        result.push('col-md-' + size.sm);
      }
      if (size.lg) {
        result.push('col-lg-' + size.lg);
      }

      return result.join(' ');
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
