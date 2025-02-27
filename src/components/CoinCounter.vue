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
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <Transition name="fade-slow" mode="out-in">
        <div :key="selectedCurrency.code" class="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 class="text-2xl font-bold text-center md:text-left">
            <span class="mr-2 text-2xl">{{ selectedCurrency.flag }}</span>
            {{ selectedCurrency.name }} Coin Counter
          </h2>
          <CurrencySelector
            :currencies="currencies"
            :selectedCurrency="selectedCurrency"
            :onCurrencyChange="changeCurrency"
          />
        </div>
      </Transition>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Coins Grid -->
        <div class="lg:col-span-2">
          <TransitionGroup 
            name="fade-list" 
            tag="div" 
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <CoinInput
              v-for="(coin, index) in coins"
              :key="coin.label"
              :coin="coin"
              :currencyCode="selectedCurrency.code"
              :formatCurrency="formatCurrency"
              :style="{ transitionDelay: `${index * 50}ms` }"
              @increment="increment"
              @decrement="decrement"
              @reset="resetCoin"
            />
          </TransitionGroup>
        </div>

        <!-- Total Display -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <Transition name="fade-scale" mode="out-in">
              <TotalDisplay
                :key="selectedCurrency.code"
                :totalValue="totalValue"
                :formatCurrency="formatCurrency"
                @reset="resetCounts"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Slow fade for header */
.fade-slow-enter-active,
.fade-slow-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slow-enter-from,
.fade-slow-leave-to {
  opacity: 0;
}

/* Staggered fade and slide for coin inputs */
.fade-list-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}

.fade-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.fade-list-move {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Scale and fade for total display */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>