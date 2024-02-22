<template>
  <div class="card flex flex-col items-center pt-12 px-4">
    <div class="text-4xl">New form</div>
    <InputText
      v-model="formId"
      class="border-2 mt-4"
      placeholder="Type your form name here..."
    />
    <Textarea
      v-model="form"
      cols="100"
      rows="20"
      :autoResize="true"
      class="border-2 mt-4"
    />
    <Button label="Submit" class="mt-4 w-1/2" @click="createForm" />
  </div>
</template>

<script setup>
const router = useRouter();

const formId = ref("");
const form = ref("");

async function createForm() {
  const { data, error } = await useFetch("/api/createForm", {
    method: "post",
    body: {
      id: formId.value,
      form: form.value,
    },
  });

  if (error.value) {
    alert("Error creating form");
  }

  router.push({ path: "/" });
}
</script>
