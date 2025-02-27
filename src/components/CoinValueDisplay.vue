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
    <div v-if="showReset" class="tooltip tooltip-left" data-tip="Reset">
      <button 
        class="btn btn-circle btn-xs btn-ghost" 
        @click="emit('reset')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
    <div class="badge badge-lg gap-2 text-lg p-4 bg-base-200 border-0">
      <span class="font-mono">{{ value }}</span>
    </div>
  </div>
</template> 