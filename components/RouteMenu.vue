<template>
  <Menu
    :model="items"
    :pt="{
      root: { class: 'border-none' },
    }"
    :ptOptions="{ mergeProps: true }"
  >
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script setup>
const items = ref([
  {
    label: "Answer form",
    icon: "pi pi-pencil",
    route: "/forms",
  },
  {
    label: "New form",
    icon: "pi pi-file-o",
    route: "/new",
  },
  {
    label: "Results",
    icon: "pi pi-chart-line",
    route: "/results",
  },
]);
</script>
