<template>
  <div>
    <div>
      <i>
        <b>{{
          trans(
            'marketplace.product_add_img_min',
            null,
            'Minimum 3 different images'
          )
        }}</b>
      </i>
    </div>
    <div
      class="product-add-upload mb-2"
      @drop.prevent="addFile"
      @dragover.prevent
      @click="openFileDialog"
    >
      <font-awesome-icon icon="upload" />
      <span>{{
        trans(
          'marketplace.product_add_img_tip',
          null,
          'Click Or Drag Images Here'
        )
      }}</span>
    </div>
    <input
      type="file"
      ref="fileUploader"
      accept="image/x-png, image/gif, image/jpeg, image/bmp"
      class="d-none"
      @change="addFile"
      multiple
    />
    <draggable
      @start="drag = true"
      @end="drag = false"
      @update="changePos"
      class="product-add-preview mb-2"
    >
      <div
        v-for="(photo, index) in value"
        :key="photo.uuid"
        class="product-add-photo"
        :style="{ backgroundImage: 'url(' + photo.img + ')' }"
      >
        <font-awesome-icon @click="removeImage(index)" icon="times" />
        <div v-show="photo.isLoading" class="product-add-loader">
          <b-spinner
            class="m-auto"
            variant="primary"
            label="Spinning"
          ></b-spinner>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions } from 'vuex';
import _ from 'lodash';
import AbstractInput from '@/components/InputsV2/AbstractInput.vue';

export default {
  extends: AbstractInput,

  components: {
    draggable
  },
  props: ['value'],
  data() {
    return {
      drag: false
    };
  },
  methods: {
    ...mapActions('productAdd', {
      uploadImage: 'uploadImage'
    }),
    changePos(e) {
      let oldIndex = e.oldIndex;
      let newIndex = e.newIndex;
      let value = this.value ? [...this.value] : [];
      value = this.swap(value, oldIndex, newIndex);
      this.$emit('input', value);
    },
    openFileDialog() {
      this.$refs.fileUploader.click();
    },
    addFile(e) {
      let droppedFiles;
      if (e.dataTransfer) {
        droppedFiles = e.dataTransfer.files;
      } else {
        droppedFiles = e.target.files;
      }

      if (!droppedFiles) return;
      [...droppedFiles].forEach(f => {
        let reader = new FileReader();

        reader.readAsDataURL(f);
        reader.onloadend = () => {
          let value = this.value ? [...this.value] : [];
          let pushedIndex = value.length + 10;
          value.push({
            img: reader.result,
            uuid: pushedIndex,
            isLoading: true
          });
          this.$emit('input', value);
          this.uploadImage(f).then(response => {
            let value = _.cloneDeep(this.value);
            let index = value.findIndex(item => item.uuid == pushedIndex);

            value[index].isLoading = false;
            value[index].uuid = response.data.uuid;
            this.$emit('input', value);
          });
        };
      });
    },
    removeImage(index) {
      let value = _.cloneDeep(this.value);
      value.splice(index, 1);
      this.$emit('input', value);
    },
    swap(arr, x, y) {
      let b = arr[y];
      arr[y] = arr[x];
      arr[x] = b;
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped></style>
