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
  <div class="stats shadow bg-base-200">
    <div class="stat px-4 py-3">
      <div class="flex flex-col gap-1">
        <div class="stat-title text-sm opacity-80">Total Value</div>
        <CoinValueDisplay
          :value="formatCurrency(totalValue)"
          :showReset="totalValue > 0"
          @reset="emit('reset')"
        />
        <div class="stat-desc font-mono text-sm">
          {{ Math.round(totalDisplayValue) }} cents
        </div>
      </div>
    </div>
  </div>
</template> 