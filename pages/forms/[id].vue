<template>
  <ProgressBar
    :mode="loading ? 'indeterminate' : 'determinate'"
    style="height: 6px"
  ></ProgressBar>
  <div v-if="firstLoad">
    <div class="card flex flex-col pt-12 px-4 w-2/3">
      <div class="text-4xl">{{ lastQuestion }}</div>
      <Textarea
        v-model="answer"
        rows="5"
        :autoResize="true"
        class="border-2 mt-4"
        placeholder="Type your answer here..."
        :disabled="loading"
      />
      <Button
        label="Continue"
        icon="pi pi-check"
        class="mt-4 w-36"
        @click="askNewQuestion"
        @keydown.enter="askNewQuestion"
      />

      <!-- Toggl show conversation -->
      <div class="flex mt-4">
        <InputSwitch v-model="showConversation" />
        <div class="ml-2">Show conversation</div>
      </div>

      <!-- Show conversation -->
      <div v-if="showConversation" class="mt-4">
        <div v-for="m in message.filter((m) => m.role != 'system')">
          <div v-if="m.role === 'user'" class="flex flex-row">
            <div class="flex flex-col">
              <div class="text-sm text-gray-500">{{ m.role }}</div>
              <div class="text-sm">{{ m.content }}</div>
            </div>
          </div>
          <div v-else class="flex flex-row">
            <div class="flex flex-col">
              <div class="text-sm text-gray-500">{{ m.role }}</div>
              <div class="text-sm">{{ m.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const answer = ref("");
const loading = ref(false);
const firstLoad = ref(false);
const message = ref([]);
const showConversation = ref(false);

const lastQuestion = computed(() => {
  return (
    message.value.filter((m) => m.role === "assistant").pop()?.content ?? ""
  );
});

async function askNewQuestion() {
  message.value.push({ role: "user", content: answer.value });
  answer.value = "";
  askQuestion();
}

async function askQuestion() {
  console.log("message", message.value);
  loading.value = true;
  const { data, error } = await useFetch("/api/openai", {
    method: "POST",
    body: {
      messages: message.value,
    },
  });
  loading.value = false;

  if (data.value.error) {
    console.log("error", data.value.error);
  } else {
    if (data.value.response === "INTERVIEW CONCLUDED") {
      concludeInterview();
    } else {
      message.value.push({ role: "assistant", content: data.value.response });
    }
  }
}

function concludeInterview() {
  router.push({ path: "/" });
}

onMounted(async () => {
  const { data, error } = await useFetch("/api/getForm", {
    query: { formId: route.params.id },
  });

  message.value.push({
    role: "system",
    content: basePrompt() + "\n" + data.value.response.form,
  });

  askQuestion();

  firstLoad.value = true;
});
</script>
