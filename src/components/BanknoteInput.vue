<script setup lang="ts">
import { type Banknote } from '../composables/useCurrency';
import { computed } from 'vue';
import CoinValueDisplay from './CoinValueDisplay.vue';

const props = defineProps<{
  banknote: Banknote;
  formatCurrency: (value: number) => string;
  currencyCode: string;
}>();

const emit = defineEmits<{
  increment: [banknote: Banknote];
  decrement: [banknote: Banknote];
  reset: [banknote: Banknote];
}>();

const banknoteColor = computed(() => {
  // Color scheme based on currency type - use a different palette for banknotes
  const currencyColorMap: Record<string, string> = {
    'EUR': 'bg-indigo-600 hover:bg-indigo-700', // Euro - Indigo
    'USD': 'bg-rose-600 hover:bg-rose-700', // US Dollar - Rose
    'GBP': 'bg-violet-600 hover:bg-violet-700', // British Pound - Violet
    'BRL': 'bg-emerald-600 hover:bg-emerald-700', // Brazilian Real - Emerald
  };

  return currencyColorMap[props.currencyCode] || 'bg-primary hover:bg-primary-focus';
});

const formattedValue = computed(() => {
  return props.formatCurrency(props.banknote.value * props.banknote.count);
});
</script>

<template>
  <div class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div class="card-body p-4">
      <!-- Main Controls Row -->
      <div class="flex items-center gap-4">
        <!-- Banknote Rectangle -->
        <div 
          :class="[
            'w-20 h-12 flex items-center justify-center text-white rounded-md transition-colors duration-200 shrink-0',
            banknoteColor
          ]"
        >
          <span class="text-lg font-bold">{{ banknote.label }}</span>
        </div>

        <!-- Controls -->
        <div class="join flex-1">
          <button 
            class="btn join-item" 
            @click="emit('decrement', banknote)"
          >
            -
          </button>
          <input 
            type="number" 
            v-model="banknote.count" 
            min="0" 
            inputmode="numeric"
            pattern="[0-9]*"
            class="input input-bordered join-item w-16 text-center"
          />
          <button 
            class="btn join-item" 
            @click="emit('increment', banknote)"
          >
            +
          </button>
        </div>
      </div>

      <!-- Value Display Row -->
      <div class="flex justify-start mt-2">
        <CoinValueDisplay
          v-if="banknote.count > 0"
          :value="formattedValue"
          :showReset="true"
          @reset="emit('reset', banknote)"
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