<template>
  <div class="overflow-y-scroll relative" ref="el">
    <div
      v-for="message in props.messages"
      :class="[
        'p-4',
        'my-1',
        'rounded-lg',
        'w-96',
        message.role === 'user' ? 'ml-auto' : 'mr-auto',
        message.role === 'user' ? 'bg-green-200' : 'bg-blue-200',
      ]"
    >
      <p class="text-2xl">{{ message.content }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
});

const el = ref(null);

onUpdated(() => {
  scrollToBottom();
});

function scrollToBottom() {
  el.value.scrollTop = el.value.scrollHeight;
}
</script>
