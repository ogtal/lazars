<template>
  <div class="flex justify-center p-8">
    <Card class="w-1/2">
      <template #title> Forms </template>
      <template #content>
        <Menu
          v-if="data"
          :model="data.response"
          :pt="{
            root: { class: 'border-none' },
          }"
          :ptOptions="{ mergeProps: true }"
        >
          <template #item="{ item, props }">
            <router-link
              v-slot="{ href, navigate }"
              :to="`/forms/${item.id}`"
              custom
            >
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span>{{ item.id }}</span>
              </a>
            </router-link>
          </template>
        </Menu>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/getFormsList");
</script>

<style></style>
