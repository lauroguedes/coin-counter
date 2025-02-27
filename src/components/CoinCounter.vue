<script setup lang="ts">
import { useCurrency, type Coin } from '../composables/useCurrency';
import CurrencySelector from './CurrencySelector.vue';
import CoinInput from './CoinInput.vue';
import TotalDisplay from './TotalDisplay.vue';

const {
  selectedCurrency,
  coins,
  totalValue,
  currencies,
  formatCurrency,
  resetCounts,
  changeCurrency
} = useCurrency();

const increment = (coin: Coin) => {
  coin.count++;
};

const decrement = (coin: Coin) => {
  if (coin.count > 0) {
    coin.count--;
  }
};

const resetCoin = (coin: Coin) => {
  coin.count = 0;
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="card-title text-2xl font-bold text-center">{{ selectedCurrency.name }} Coin Counter</h2>
          <CurrencySelector
            :currencies="currencies"
            :selectedCurrency="selectedCurrency"
            :onCurrencyChange="changeCurrency"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CoinInput
            v-for="coin in coins"
            :key="coin.label"
            :coin="coin"
            :formatCurrency="formatCurrency"
            @increment="increment"
            @decrement="decrement"
            @reset="resetCoin"
          />
        </div>
        
        <div class="divider"></div>
        
        <div class="flex flex-col items-center justify-center">
          <TotalDisplay
            :totalValue="totalValue"
            :formatCurrency="formatCurrency"
          />
          
          <button class="btn btn-outline mt-4" @click="resetCounts">Reset All</button>
        </div>
      </div>
    </div>
  </div>
</template>