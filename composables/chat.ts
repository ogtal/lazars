export const useChat = (formText: string) => {
  const loading = ref(false);
  const finished = ref(false);
  const error = ref("");

  const messages = ref<Message[]>([
    {
      role: "system",
      content: basePrompt() + "\n" + formText,
    },
  ]);

  const ask = async (text?: string) => {
    if (loading.value) return;

    if (text) {
      messages.value.push({
        role: "user",
        content: text,
      });
    }

    loading.value = true;
    const reply = await $fetch("/api/openai", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    }).catch((e) => {
      error.value = e.message;
      console.error(e);
    });
    loading.value = false;

    if (!reply) return;

    if (reply == "INTERVIEW CONCLUDED") {
      finished.value = true;
      return;
    }

    messages.value.push({
      role: "assistant",
      content: reply,
    });
  };

  return {
    messages,
    ask,
    loading,
    finished,
    error,
  };
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}
