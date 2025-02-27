<script setup lang="ts">
defineProps<{
  value: string;
  showReset: boolean;
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="badge badge-lg bg-base-200 border-0 text-base-content/80">
      <span class="font-mono text-base">{{ value }}</span>
    </div>
    <button 
      v-if="showReset"
      class="btn btn-sm btn-ghost btn-square text-base-content/60 hover:text-error"
      @click="emit('reset')"
      title="Reset count"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.badge {
  transition: all 0.2s ease-in-out;
}

.badge:hover {
  transform: scale(1.05);
}

.btn-ghost:hover svg {
  transform: scale(1.1);
}

.btn-ghost svg {
  transition: transform 0.2s ease-in-out;
}

.tooltip:before {
  font-size: 0.75rem;
}

@media (max-width: 640px) {
  .tooltip:before {
    display: none;
  }
}
</style> 