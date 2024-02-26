<template>
  <div class="flex flex-col items-center">
    <!-- <IconsMic class="w-12 h-12 text-gray-500 mb-12" /> -->
    <input
      ref="input"
      v-model="model"
      class="text-6xl bg-transparent outline-none text-center"
      placeholder="Type here..."
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["submit"]);

const model = defineModel();
const input = ref(null);

useFocus(input, { initialValue: true });
const { enter } = useMagicKeys();

watch(enter, (v) => {
  if (v) {
    emit("submit");
  }
});
</script>
