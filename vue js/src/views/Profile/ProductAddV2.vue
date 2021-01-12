<template>
  <div class="product-add py-5 position-relative">
    <div class="loader-overflow" v-if="loading">
      <b-spinner class="loader-overflow-spinner" type="grow"></b-spinner>
    </div>
    <h1 class="profile-title">
      {{ title }}
    </h1>
    <Stepper :titles="steps" @move="changeStep" :steps="steps" ref="stepper">
      <template v-for="(step, index) in steps" :slot="'step-' + (index + 1)">
        <div v-for="(fields, group) in groupedSchema" :key="group">
          <div v-if="group == step && group != 'variants'" :key="group">
            <input-factory
              v-for="(field, index) in fields"
              :key="field.id"
              :config="field"
              :value="instance[field.id]"
              @input="inputValue(field.id, $event)"
            />
          </div>
        </div>
        <div v-if="step == 'variants'" :key="'variants-step' + (index + 1)">
          <variants />
        </div>
        <div class="d-flex py-2 px-4" :key="'controls' + (index + 1)">
          <b-button
            variant="outline-primary "
            class="mr-auto my-1 d-flex justify-content-center align-items-center text-nowrap"
            :squared="false"
            @click="prevStep"
            v-if="index != 0"
          >
            <font-awesome-icon icon="chevron-left" class="mr-2" />
            {{ trans('marketplace.product_add_back_btn', null, 'Back') }}
          </b-button>
          <b-button
            @click="save(step)"
            :squared="false"
            variant="primary"
            :disabled="disabledNextBtn"
            class="my-1 ml-auto d-flex justify-content-center align-items-center text-nowrap"
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
      </template>
    </Stepper>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import Stepper from '@/components/Stepper.vue';
import InputFactory from '../../components/InputsV2/InputFactory.vue';
import Variants from '../../components/ProductAdd/Variants';
export default {
  components: {
    Stepper,
    InputFactory,
    Variants,
  },

  data() {
    return {
      currentStep: 1,
    };
  },
  methods: {
    ...mapActions('productAdd', {
      getProductSchema: 'getProductSchema',
      getProduct: 'getProductEdit',
    }),
    ...mapActions('productAdd/instance', {
      store: 'store',
      clear: 'clear',
    }),
    ...mapActions('popup', {
      putMessage: 'put',
    }),
    changeStep(step) {
      this.currentStep = step;
    },
    inputValue(id, val) {
      let instance = { ...this.instance };
      instance[id] = val;
      this.instance = instance;
    },
    nextStep() {
      this.$refs.stepper.nextStep();
    },
    prevStep() {
      this.$refs.stepper.prevStep();
    },

    save(group) {
      if (group == 'category') {
        this.getProductSchema({
          category: this.instance['category'],
        });
      }
      if (this.currentStep == this.steps.length) {
        this.submit();
        return;
      }
      this.nextStep();
    },
    validate(fields) {
      let result = true;

      fields.forEach((item) => {
        if (item.required && !this.instance[item.id]) {
          result = false;
        }
      });

      return result;
    },
    submit() {
      this.store();
    },
  },
  computed: {
    ...mapFields('productAdd/instance', {
      instance: 'instance',
    }),
    ...mapMultiRowFields('productAdd/instance', {
      variants: 'variants',
    }),
    ...mapState('productAdd/instance', {
      schema: 'schema',
    }),
    ...mapState('productAdd', {
      loading: 'attempting',
    }),
    ...mapGetters('productAdd', {
      groupedSchema: 'groupedSchema',
      steps: 'steps',
    }),
    uuid() {
      return this.$route.params.uuid;
    },
    currentGroup() {
      let step = this.currentStep - 1;
      return this.steps[step];
    },
    disabledNextBtn() {
      let fields = this.groupedSchema[this.currentGroup];
      return !this.validate(fields);
    },
    title() {
      if (this.uuid) {
        return 'Edit product';
      } else {
        return 'Add New product';
      }
    },
  },
  created() {
    if (this.uuid) {
      this.inputValue('uuid', this.uuid);
      this.getProduct(this.uuid);
    } else {
      this.getProductSchema();
    }
  },
  beforeDestroy() {
    this.clear();
  },
};
</script>

<style lang="scss" scoped></style>
