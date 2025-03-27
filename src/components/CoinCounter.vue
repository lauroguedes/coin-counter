<script setup lang="ts">
import { useCurrency, type Coin, type Banknote } from '../composables/useCurrency';
import CurrencySelector from './CurrencySelector.vue';
import CoinInput from './CoinInput.vue';
import BanknoteInput from './BanknoteInput.vue';
import TotalDisplay from './TotalDisplay.vue';
import AppLogo from './AppLogo.vue';
import AppFooter from './AppFooter.vue';
import ThemeSwitch from './ThemeSwitch.vue';

import { ref } from 'vue';

const activeTab = ref('banknotes');

const {
  selectedCurrency,
  coins,
  banknotes,
  coinsTotal,
  banknotesTotal,
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

const incrementBanknote = (banknote: Banknote) => {
  banknote.count++;
};

const decrementBanknote = (banknote: Banknote) => {
  if (banknote.count > 0) {
    banknote.count--;
  }
};

const resetBanknote = (banknote: Banknote) => {
  banknote.count = 0;
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto p-4 flex-1">
      <div class="flex flex-col gap-6">
        <AppLogo />

        <!-- Header -->
        <div :key="selectedCurrency.code" class="flex bg-base-100 p-4 rounded-lg flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold text-center md:text-left">
              <span class="mr-2 text-2xl">{{ selectedCurrency.flag }}</span>
              {{ selectedCurrency.name }} Money Counter
            </h2>
            <ThemeSwitch />
          </div>
          <CurrencySelector
            :currencies="currencies"
            :selectedCurrency="selectedCurrency"
            :onCurrencyChange="changeCurrency"
          />
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Money Grid -->
          <div class="lg:col-span-3">
            <div class="tabs tabs-boxed mb-4">
              <a 
                class="tab transition-all duration-300 ease-in-out" 
                :class="{ 'tab-active': activeTab === 'banknotes' }" 
                @click="activeTab = 'banknotes'"
              >
                Banknotes
              </a>
              <a 
                class="tab transition-all duration-300 ease-in-out" 
                :class="{ 'tab-active': activeTab === 'coins' }" 
                @click="activeTab = 'coins'"
              >
                Coins
              </a>
            </div>

            <!-- Tab Panels with Transitions -->
            <div class="relative pb-4" style="min-height: 500px; overflow-x: hidden;">
                <!-- Tab Content with proper transitions -->
                <Transition name="slide-fade" mode="out-in">
                    <div v-if="activeTab === 'banknotes'" :key="'banknotes'" class="w-full">
                        <div class="mb-4">
                          <h3 class="text-xl font-semibold">Banknotes</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <BanknoteInput
                            v-for="(banknote, index) in banknotes"
                            :key="banknote.label"
                            :banknote="banknote"
                            :currencyCode="selectedCurrency.code"
                            :formatCurrency="formatCurrency"
                            :style="{ animationDelay: `${index * 30}ms` }"
                            class="animate-fadeIn"
                            @increment="incrementBanknote"
                            @decrement="decrementBanknote"
                            @reset="resetBanknote"
                          />
                        </div>
                    </div>
                    
                    <div v-else-if="activeTab === 'coins'" :key="'coins'" class="w-full">
                        <div class="mb-4">
                          <h3 class="text-xl font-semibold">Coins</h3>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <CoinInput
                            v-for="(coin, index) in coins"
                            :key="coin.label"
                            :coin="coin"
                            :currencyCode="selectedCurrency.code"
                            :formatCurrency="formatCurrency"
                            :style="{ animationDelay: `${index * 30}ms` }"
                            class="animate-fadeIn"
                            @increment="increment"
                            @decrement="decrement"
                            @reset="resetCoin"
                          />
                        </div>
                    </div>
                </Transition>
            </div>
          </div>

          <!-- Total Display -->
          <div class="lg:col-span-1">
            <div class="sticky top-4">
              <Transition name="fade-scale" mode="out-in">
                <TotalDisplay
                  :key="selectedCurrency.code"
                  :totalValue="totalValue"
                  :banknotesTotal="banknotesTotal"
                  :coinsTotal="coinsTotal"
                  :formatCurrency="formatCurrency"
                  @reset="resetCounts"
                />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <AppFooter />
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

/* Removed old transition styles that are no longer used */

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

/* Slide and fade for tab transitions - match the ease-in-out from tab buttons */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Animation for staggered items */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out forwards;
  opacity: 0;
}
</style>