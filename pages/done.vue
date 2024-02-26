<template>
  <!-- A nicely formatted page that tells the user they have completed the interiew -->
  <div class="flex justify-center p-8">
    <div class="w-1/2">
      <h1 class="text-4xl font-bold mb-4">Interview Complete</h1>
      <div class="grid gap-4">
        <div class="bg-white p-4 rounded-md shadow-md">
          <h2 class="text-xl">Thank you for completing the interview</h2>
        </div>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        <router-link to="/">Return to Home</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
