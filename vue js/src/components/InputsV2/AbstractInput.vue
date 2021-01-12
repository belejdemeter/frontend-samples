<script>
export default {
  props: [
    'id',
    'value',
    'options',
    'name',
    'required',
    'title',
    'css_classes',
    'tip',
    'default',
    'label',
    'properties',
    'colSizes',
    'type',
    'group',
    'is_cart_attribute'
  ],

  data: function() {
    return {
      error: null
    };
  },

  methods: {
    update: function(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>