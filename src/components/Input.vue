<template>
  <div>
      <div class="input" :label="label">
         <input class="input__input" type="text" ref="inputValue" required @input="updateValue()"/>
        <span class="input__label">{{ label }}</span>
      </div>
      <div class="error" v-show="error">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      type: String,
      required: false
    },
    error: {
      type: String,
      required: false
    },
   
  }, 
  methods: {
    updateValue() {
          this.$emit('input-changed', this.$refs.inputValue.value )
          }, 
  }
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  &__input {
    font-size: 14px;
    width: 100%;
    height: 10px;
    line-height: 14px;
    padding-top: 10px;
    padding-bottom: 3px;
    border: none;
    border-bottom: 1px dotted #b5b5b5;

    &:focus ~ .input__label,
    &:not(:focus):valid ~ .input__label {
      top: 6px;
      bottom: 10px;
      left: 0;
      font-size: 12px;
      line-height: 12px;
      opacity: 1;
      color: #009688;
    }
    &:not(:focus):valid,
    &:focus {
      outline: none;
      border-color: #009688;
    }
  }
  &__label {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 50%;
    color: #b5b5b5;
    transform: translateY(-50%);
    transition: 0.2s ease all;
  }
}
</style>