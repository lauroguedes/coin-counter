<script setup lang="ts">
import { ref, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
  totalValue: number;
  formatCurrency: (value: number) => string;
}>();

const emit = defineEmits<{
  reset: [];
}>();

const totalDisplayValue = ref(props.totalValue);

// Watch for changes in the total value and animate accordingly
watch(() => props.totalValue, (newValue, oldValue) => {
  // Animate from old value to new value, one by one
  const duration = Math.min(1, Math.abs(newValue - oldValue) * 0.05);
  
  gsap.to(totalDisplayValue, {
    value: newValue,
    duration: duration,
    ease: "none",
    onUpdate: () => {
      // Round to ensure we see whole numbers incrementing
      totalDisplayValue.value = Math.round(totalDisplayValue.value);
    }
  });
});
</script>

<template>
  <div class="stats shadow bg-base-200">
    <div class="stat px-4 py-2">
      <div class="flex items-center justify-between gap-2">
        <div>
          <div class="stat-title text-sm opacity-80">Total Value</div>
          <div class="stat-value text-primary font-mono text-2xl">{{ formatCurrency(totalValue) }}</div>
          <div class="stat-desc font-mono">{{ Math.round(totalDisplayValue) }} cents</div>
        </div>
        <button 
          class="btn btn-circle btn-sm btn-ghost" 
          @click="emit('reset')"
          title="Reset All"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template> 