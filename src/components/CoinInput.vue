<script setup lang="ts">
import { type Coin } from '../composables/useCurrency';
import { computed } from 'vue';
import CoinValueDisplay from './CoinValueDisplay.vue';

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

const formattedValue = computed(() => {
  return props.formatCurrency(props.coin.value * props.coin.count);
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
      <CoinValueDisplay
        v-if="coin.count > 0"
        :value="formattedValue"
        :showReset="true"
        @reset="emit('reset', coin)"
      />
      <div v-else class="w-20"></div>
    </div>
  </div>
</template> 