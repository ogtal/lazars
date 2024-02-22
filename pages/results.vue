<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = await useFetch("/api/getForm", {
  query: { formId: "replace_with_new_document_id" },
});
</script>

<style></style>
