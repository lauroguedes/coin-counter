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
  <div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div class="card-body p-4">
      <!-- Main Controls Row -->
      <div class="flex items-center gap-4">
        <!-- Coin Circle -->
        <div 
          :class="[
            'w-12 h-12 flex items-center justify-center text-white rounded-full transition-colors duration-200 shrink-0',
            coinColor
          ]"
        >
          <span class="text-lg font-bold">{{ coin.label }}</span>
        </div>

        <!-- Controls -->
        <div class="join flex-1">
          <button 
            class="btn join-item" 
            @click="emit('decrement', coin)"
          >
            -
          </button>
          <input 
            type="number" 
            v-model="coin.count" 
            min="0" 
            inputmode="numeric"
            pattern="[0-9]*"
            class="input input-bordered join-item w-20 text-center text-lg"
          />
          <button 
            class="btn join-item" 
            @click="emit('increment', coin)"
          >
            +
          </button>
        </div>
      </div>

      <!-- Value Display Row -->
      <div class="flex justify-end mt-2">
        <CoinValueDisplay
          v-if="coin.count > 0"
          :value="formattedValue"
          :showReset="true"
          @reset="emit('reset', coin)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent zoom on focus for iOS */
input[type="number"] {
  font-size: 16px;
}

/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style> 