<template>
  <div v-if="error" class="text-red-500">{{ error }}</div>

  <div class="flex flex-col h-screen">
    <ChatBox
      :messages="messages.filter((m) => m.role !== 'system')"
      class="h-1/2 bg-gray-50 px-12 py-6"
    />
    <div class="mx-auto my-auto">
      <ChatInput
        v-model="answer"
        @submit="
          ask(answer);
          answer = '';
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const answer = ref("");
const { messages, ask, loading, finished, error } = useChat(
  route.params.id as string
);

onMounted(() => {
  ask();
});

const { start, finish } = useLoadingIndicator({});

watch(loading, (value) => {
  if (value) {
    start();
  } else {
    finish();
  }
});
</script>
