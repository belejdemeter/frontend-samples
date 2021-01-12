<template>
  <div class="variants">
    <div class="variants-content">
      <font-awesome-icon class="ml-auto" icon="times" @click="$emit('close')" />

      <div>
        <Stepper
          :titles="steps"
          @move="changeStep"
          :steps="steps"
          :noScroll="true"
          ref="stepper-variants"
        >
          <template
            v-for="(step, index) in steps"
            :slot="'step-' + (index + 1)"
          >
            <div v-for="(fields, group) in schema" :key="group">
              <div v-if="group == step" :key="group">
                <input-factory
                  v-for="(field, index) in fields"
                  :key="field.id"
                  :config="field"
                  :value="value[field.id]"
                  @input="inputValue(field.id, $event)"
                />
                <div class="d-flex py-2 px-4">
                  <b-button
                    variant="outline-primary "
                    class="mr-auto my-1"
                    :squared="false"
                    @click="prevStep"
                    v-if="index != 0"
                  >
                    <font-awesome-icon icon="chevron-left" class="mr-2" />
                    {{
                      trans('marketplace.product_add_back_btn', null, 'Back')
                    }}
                  </b-button>
                  <b-button
                    @click="save(group)"
                    :squared="false"
                    variant="primary"
                    :disabled="disabledNextBtn"
                    class="my-1 ml-auto"
                  >
                    {{
                      trans(
                        'marketplace.product_add_save_continue',
                        null,
                        'Save and Continue'
                      )
                    }}
                    <font-awesome-icon icon="chevron-right" class="ml-2" />
                  </b-button>
                </div>
              </div>
            </div>
          </template>
        </Stepper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import Stepper from '@/components/Stepper.vue';
import InputFactory from '../../components/InputsV2/InputFactory.vue';
import Variants from '../../components/ProductAdd/Variants';
import _ from 'lodash';
export default {
  props: ['steps', 'value', 'schema'],
  components: {
    Stepper,
    InputFactory,
    Variants
  },

  data() {
    return {
      currentStep: 1
    };
  },
  methods: {
    changeStep(step) {
      this.currentStep = step;
    },
    inputValue(id, val) {
      let value = _.cloneDeep(this.value);
      value[id] = val;
      this.$emit('input', value);
    },
    nextStep() {
      this.$refs['stepper-variants'].nextStep();
    },
    prevStep() {
      this.$refs['stepper-variants'].prevStep();
    },
    save() {
      if (this.currentStep == this.steps.length) {
        this.$emit('close');
      }
      this.nextStep();
    },
    validate(fields) {
      let result = true;

      fields.forEach(item => {
        if (item.required && !this.value[item.id]) {
          result = false;
        }
      });

      return result;
    }
  },
  computed: {
    currentGroup() {
      let step = this.currentStep - 1;
      return this.steps[step];
    },
    disabledNextBtn() {
      let fields = this.schema[this.currentGroup];
      return !this.validate(fields);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.variants {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 50;

  &-content {
    background: #fff;
    overflow: auto;
    width: 80%;
    padding: 20px;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
}
</style>
