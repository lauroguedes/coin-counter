<script setup lang="ts">
import { ref, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
  totalValue: number;
  formatCurrency: (value: number) => string;
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
  <div class="stats shadow">
    <div class="stat">
      <div class="stat-title">Total Value</div>
      <div class="stat-value text-primary font-mono">{{ formatCurrency(totalValue) }}</div>
      <div class="stat-desc">
        <span class="font-mono text-lg">{{ Math.round(totalDisplayValue) }} cents</span>
      </div>
    </div>
  </div>
</template> 