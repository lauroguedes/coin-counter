<script setup lang="ts">
import { ref, watch } from 'vue';
import gsap from 'gsap';
import CoinValueDisplay from './CoinValueDisplay.vue';

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
  <div class="card bg-base-100 shadow">
    <div class="card-body p-4">
      <div class="flex items-center justify-between">
        <h3 class="card-title text-base">Total Value</h3>
        <button 
          v-if="totalValue > 0"
          class="btn btn-sm btn-ghost"
          @click="emit('reset')"
        >
          Reset All
        </button>
      </div>
      <div class="mt-2">
        <div class="text-2xl font-mono font-semibold">
          {{ formatCurrency(totalValue) }}
        </div>
        <div class="text-sm font-mono opacity-70">
          {{ Math.round(totalDisplayValue) }} cents
        </div>
      </div>
    </div>
  </div>
</template> 