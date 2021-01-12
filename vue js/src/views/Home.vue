<template>
  <div style="background: #fff;">
    <section v-if="loading" class="page-placeholder"></section>
    <widget-factory :config="test"></widget-factory>
    <!-- <WidgetTree :tree="widgetTree" /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import WidgetTree from '@/components/Widgets/WidgetTree.vue';
import WidgetFactory from '../components/Widgets/WidgetFactory.vue';
export default {
  name: 'home',
  components: {
    WidgetTree,
    WidgetFactory
  },
  data() {
    return {};
  },
  created: function() {},
  computed: {
    ...mapState('widgets', {
      widgets: 'widgets',
      loading: 'loading'
    }),
    ...mapGetters('widgets', {
      widgetTree: 'tree'
    }),
    test() {
      return {
        id: 'c4414978-799b-46d8-8289-f18e97583626',
        parent: 'f1a8f508-c810-4a94-8b15-f4f00b738059',
        page_uuid: '0305295b-05a6-41b5-b0d8-4199233adc6f',
        created_at: null,
        updated_at: null,
        size: {
          lg: '12',
          sm: '12'
        },
        type: 'col',
        widget: 'image_slider',
        properties: {
          link: {
            url: null,
            text: null
          },
          title: {
            text: null,
            font_size: null
          },
          images: [
            {
              lg: {
                ar: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_lg_ar.png',
                en: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_lg_en.png',
                ku: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_lg_ku.png'
              },
              sm: {
                ar: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_sm_ar.png',
                en: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_sm_en.png',
                ku: 'cms/f88202ad-b769-4de5-b96f-42ea89cc2c92_sm_ku.png'
              },
              link: {
                url: null
              },
              uuid: 'f88202ad-b769-4de5-b96f-42ea89cc2c92'
            },
            {
              lg: {
                ar: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_lg_ar.png',
                en: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_lg_en.png',
                ku: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_lg_ku.png'
              },
              sm: {
                ar: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_sm_ar.png',
                en: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_sm_en.png',
                ku: 'cms/e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8_sm_ku.png'
              },
              link: {
                url: null
              },
              uuid: 'e4cce32c-5d8f-4d14-b7e5-a2847dca3ff8'
            },
            {
              lg: {
                ar: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_lg_ar.png',
                en: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_lg_en.png',
                ku: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_lg_ku.png'
              },
              sm: {
                ar: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_sm_ar.png',
                en: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_sm_en.png',
                ku: 'cms/e2246b44-50cb-4815-aa90-d87b121f7316_sm_ku.png'
              },
              link: {
                url: null
              },
              uuid: 'e2246b44-50cb-4815-aa90-d87b121f7316'
            },
            {
              lg: {
                ar: 'cms/d6a4fff4-1135-4cc4-b9c4-a5fd1162571b_lg_ar.png',
                en: 'cms/d6a4fff4-1135-4cc4-b9c4-a5fd1162571b_lg_en.png',
                ku: 'cms/3f9424d1-7421-48b6-9574-663d05b46e18_lg_ku.png'
              },
              sm: {
                ar: 'cms/d6a4fff4-1135-4cc4-b9c4-a5fd1162571b_sm_ar.png',
                en: 'cms/3f9424d1-7421-48b6-9574-663d05b46e18_sm_en.png',
                ku: 'cms/3f9424d1-7421-48b6-9574-663d05b46e18_sm_ku.png'
              },
              link: {
                url: null
              },
              uuid: 'd6a4fff4-1135-4cc4-b9c4-a5fd1162571b'
            },
            {
              lg: {
                ar: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_lg_ar.png',
                en: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_lg_en.png',
                ku: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_lg_ku.png'
              },
              sm: {
                ar: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_sm_ar.png',
                en: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_sm_en.png',
                ku: 'cms/34b2e9c6-850a-48d8-96dd-86dc6eb674d2_sm_ku.png'
              },
              link: {
                url: null
              },
              uuid: '34b2e9c6-850a-48d8-96dd-86dc6eb674d2'
            }
          ],
          margin: false,
          description: {
            text: null,
            font_size: null
          },
          slides_per_view: {
            lg: '1',
            sm: '1'
          }
        }
      };
    }
  },
  methods: {}
};
</script>
<style lang="scss"></style>
