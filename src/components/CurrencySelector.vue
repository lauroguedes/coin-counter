<script setup lang="ts">
import { type CurrencyConfig } from '../composables/useCurrency';

defineProps<{
  currencies: CurrencyConfig[];
  selectedCurrency: CurrencyConfig;
  onCurrencyChange: (currency: CurrencyConfig) => void;
}>();
</script>

<template>
  <div class="join">
    <button
      v-for="currency in currencies"
      :key="currency.code"
      class="btn btn-default join-item transition-colors duration-300 ease-in-out"
      :class="{ 'btn-active': selectedCurrency.code === currency.code }"
      @click="onCurrencyChange(currency)"
    >
      <span class="mr-2 text-lg">{{ currency.flag }}</span>
      {{ currency.name }}
    </button>
  </div>
</template> 