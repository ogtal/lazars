<template>
  <div class="flex justify-center p-8">
    <div class="w-1/2">
      <h1 class="text-4xl font-bold mb-4">Forms</h1>
      <div class="grid gap-4">
        <div
          v-for="form in data?.response"
          :key="form.id"
          class="bg-white p-4 rounded-md shadow-md"
        >
          <router-link :to="`forms/${form.id}`">
            <h2 class="text-xl">{{ form.id }}</h2>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/forms", {
  method: "GET",
});
</script>

<style></style>
