<script setup lang="ts">
import { type Coin } from '../composables/useCurrency';
import { computed } from 'vue';

const props = defineProps<{
  coin: Coin;
  formatCurrency: (value: number) => string;
  currencyCode: string;
}>();

const emit = defineEmits<{
  increment: [coin: Coin];
  decrement: [coin: Coin];
  reset: [coin: Coin];
}>();

const coinColor = computed(() => {
  // Color scheme based on currency type
  const currencyColorMap: Record<string, string> = {
    'EUR': 'bg-blue-500 hover:bg-blue-600', // Euro - Blue (EU flag color)
    'USD': 'bg-red-500 hover:bg-red-600', // US Dollar - Red
    'GBP': 'bg-purple-500 hover:bg-purple-600', // British Pound - Purple (royal color)
    'BRL': 'bg-green-600 hover:bg-green-700', // Brazilian Real - Green (from flag)
  };

  return currencyColorMap[props.currencyCode] || 'bg-primary hover:bg-primary-focus';
});
</script>

<template>
  <div class="flex items-center p-2 border rounded-lg hover:shadow-md transition-shadow duration-200">
    <div 
      :class="[
        'w-16 h-16 flex items-center justify-center text-white rounded-full mr-4 transition-colors duration-200',
        coinColor
      ]"
    >
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