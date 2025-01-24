<template>
  <button class="button-arrow">
    <img class="button-arrow__image" src="https://static.thenounproject.com/png/801787-200.png" alt="стрелка">
  </button>
</template>

<style scoped lang="scss">
.button-arrow {
  width: 50px;
  height: 50px;
  border: 2px solid black;
  padding: 10px;
  cursor: pointer;
  background: $button;
  &:hover {
    background: $buttonHover;
  }
  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
