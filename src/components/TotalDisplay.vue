<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import gsap from 'gsap';

const props = defineProps<{
  totalValue: number;
  formatCurrency: (value: number) => string;
  banknotesTotal?: number;
  coinsTotal?: number;
}>();

const emit = defineEmits<{
  reset: [];
}>();

const totalDisplayValue = ref(props.totalValue);
const isCopied = ref(false);
const formattedTotal = computed(() => props.formatCurrency(props.totalValue));

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

const copyToClipboard = () => {
  navigator.clipboard.writeText(formattedTotal.value)
    .then(() => {
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
};
</script>

<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body p-4">
      <div class="flex items-center justify-between">
        <h3 class="card-title text-base">Total Value</h3>
        <button 
          v-if="totalValue > 0"
          class="btn btn-sm btn-ghost btn-circle"
          title="Reset All"
          @click="emit('reset')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div class="mt-4 relative">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-mono font-semibold">
            {{ formatCurrency(totalValue) }}
          </div>
          <button 
              v-if="totalValue > 0"
              class="btn btn-sm btn-ghost btn-circle"
              title="Copy to clipboard"
              @click="copyToClipboard"
            >
              <svg v-if="!isCopied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
        </div>
        <div class="text-xs font-mono opacity-70 mb-3">
          {{ Math.round(totalDisplayValue) }} cents
        </div>
        
        <div class="divider text-xs opacity-70">BREAKDOWN</div>
        
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="font-semibold">Banknotes:</div>
          <div class="text-right font-mono">{{ props.banknotesTotal !== undefined ? formatCurrency(props.banknotesTotal) : '0.00' }}</div>
          <div class="font-semibold">Coins:</div>
          <div class="text-right font-mono">{{ props.coinsTotal !== undefined ? formatCurrency(props.coinsTotal) : '0.00' }}</div>
        </div>
      </div>
    </div>
  </div>
</template> 