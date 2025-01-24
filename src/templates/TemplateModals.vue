<script setup lang="ts">
const emits = defineEmits(['close', 'yes', 'no']);
</script>

<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal__main">
        <slot name="header">
          <button class="modal__close" @click="emits('close')">
            <img
              class="modal__cross"
              src="https://static.thenounproject.com/png/644039-200.png"
              alt="cross"
            />
          </button>
        </slot>
        <slot />
        <slot name="navigation">
          <div class="modal__navigation">
            <button class="modal__button modal__button_close" @click="emits('no')">No</button>
            <button class="modal__button modal__button_continue" @click="emits('yes')">Yes</button>
          </div>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    text-transform: uppercase;
  }

  &__main {
    width: 700px;
    min-height: 200px;
    background: white;
    border-radius: 5px;
    border: 3px solid black;
    position: relative;
    padding: 20px 30px;
  }

  &__button,
  &__close {
    background: $red;
    border: 2px solid black;
    border-radius: 10%;
    text-transform: uppercase;
  }

  &__button {
    padding: 5px 15px;
    cursor: pointer;

    &_continue {
      background: $button;
    }
  }

  &__navigation {
    display: flex;
    justify-content: space-between;
  }

  &__close {
    cursor: pointer;
    width: 35px;
    height: 35px;
    padding: 5px;
    position: absolute;
    top: -10px;
    right: -10px;
  }

  &__cross {
    width: 100%;
    height: 100%;
  }
}
</style>
