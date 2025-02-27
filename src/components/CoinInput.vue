<script setup lang="ts">
import { type Coin } from '../composables/useCurrency';

const props = defineProps<{
  coin: Coin;
  formatCurrency: (value: number) => string;
}>();

const emit = defineEmits<{
  increment: [coin: Coin];
  decrement: [coin: Coin];
  reset: [coin: Coin];
}>();
</script>

<template>
  <div class="flex items-center p-2 border rounded-lg">
    <div class="w-16 h-16 flex items-center justify-center bg-primary text-primary-content rounded-full mr-4">
      <span class="text-xl font-bold">{{ coin.label }}</span>
    </div>
    <div class="flex-1 flex items-center justify-between">
      <div class="join">
        <button class="btn join-item" @click="emit('decrement', coin)">-</button>
        <input 
          type="number" 
          v-model="coin.count" 
          min="0" 
          class="input input-bordered join-item w-20 text-center"
        />
        <button class="btn join-item" @click="emit('increment', coin)">+</button>
      </div>
      <div class="flex items-center gap-2">
        <button 
          v-if="coin.count > 0" 
          class="btn btn-circle btn-xs btn-error" 
          @click="emit('reset', coin)" 
          title="Reset this coin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div v-if="coin.count > 0" class="badge badge-lg badge-success gap-2 text-lg p-4 overflow-hidden">
          <span class="font-mono">{{ formatCurrency(coin.value * coin.count) }}</span>
        </div>
        <div v-else class="w-20"></div>
      </div>
    </div>
  </div>
</template> 