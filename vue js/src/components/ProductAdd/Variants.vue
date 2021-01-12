<template>
  <div>
    <b-button
      class="mr-auto"
      @click="addVariant"
      variant="primary"
      :squared="false"
      >{{
        trans('marketplace.product_add_variant_btn', null, 'Add Variant')
      }}</b-button
    >
    <div class="d-flex flex-column bg-white border my-2">
      <div
        class="d-flex align-items-center border-bottom"
        v-for="(variant, index) in variantsTable"
        :key="index"
      >
        <div class="mx-2" v-for="(val, index) in variant.values" :key="index">
          <div>
            <b>{{ val.name }}</b>
          </div>
          <div>{{ val.valueText }}</div>
        </div>
        <div class="ml-auto">
          <b-button
            variant="outline-primary"
            class="mr-1"
            :squared="false"
            @click="showVariantsModal(variant.uuid)"
            >{{
              trans('marketplace.product_add_edit_btn', null, 'Edit')
            }}</b-button
          >
          <b-button
            variant="danger"
            :squared="false"
            @click="deleteVariant(variant.uuid)"
            >{{
              trans('marketplace.product_add_delete_btn', null, 'Delete')
            }}</b-button
          >
        </div>
      </div>
    </div>

    <variants-modal-v-2
      v-for="(variant, index) in variants"
      :key="variant.uuid"
      :schema="variantsSchema"
      :steps="variantSteps"
      :value="variant"
      @input="inputVariant(variant.uuid, $event)"
      v-if="variantUuid == variant.uuid"
      @close="closeVariantModal"
    />
  </div>
</template>

<script>
import VariantsModalV2 from './VariantsModalV2.vue';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex';
import { version } from 'moment';
export default {
  components: { VariantsModalV2 },
  data() {
    return {
      isModalVariants: false,
      variantUuid: null
    };
  },
  computed: {
    ...mapFields('productAdd/instance', {
      variants: 'variants'
    }),
    ...mapGetters('productAdd', {
      variantsSchema: 'variantsSchema',
      variantSteps: 'variantSteps',
      variantsTable: 'variantsTable'
    })
  },
  methods: {
    showVariantsModal(uuid) {
      this.variantUuid = uuid;
    },
    closeVariantModal() {
      this.variantUuid = null;
    },
    addVariant() {
      let uuid = uuidv4();
      let variants = _.cloneDeep(this.variants);

      variants.push({
        uuid
      });
      this.variants = variants;

      this.variantUuid = uuid;
    },
    deleteVariant(uuid) {
      let variants = _.cloneDeep(this.variants);

      variants = variants.filter(item => item.uuid != uuid);
      this.variants = variants;

      this.variantUuid = uuid;
    },
    inputVariant(uuid, instance) {
      let variants = _.cloneDeep(this.variants);
      variants = variants.map(item => {
        if (item.uuid == uuid) {
          return { ...item, ...instance };
        } else {
          return item;
        }
      });

      this.variants = variants;
    }
  }
};
</script>

<style lang="scss" scoped></style>
