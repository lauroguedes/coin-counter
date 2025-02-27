<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import gsap from 'gsap';

interface Coin {
  value: number;
  label: string;
  count: number;
  displayValue: number;
}

interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  coins: Coin[];
}

const currencies: CurrencyConfig[] = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    coins: [
      { value: 200, label: '€2', count: 0, displayValue: 0 },
      { value: 100, label: '€1', count: 0, displayValue: 0 },
      { value: 50, label: '50c', count: 0, displayValue: 0 },
      { value: 20, label: '20c', count: 0, displayValue: 0 },
      { value: 10, label: '10c', count: 0, displayValue: 0 },
      { value: 5, label: '5c', count: 0, displayValue: 0 },
      { value: 2, label: '2c', count: 0, displayValue: 0 },
      { value: 1, label: '1c', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    coins: [
      { value: 100, label: '$1', count: 0, displayValue: 0 },
      { value: 50, label: '50¢', count: 0, displayValue: 0 },
      { value: 25, label: '25¢', count: 0, displayValue: 0 },
      { value: 10, label: '10¢', count: 0, displayValue: 0 },
      { value: 5, label: '5¢', count: 0, displayValue: 0 },
      { value: 1, label: '1¢', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    coins: [
      { value: 200, label: '£2', count: 0, displayValue: 0 },
      { value: 100, label: '£1', count: 0, displayValue: 0 },
      { value: 50, label: '50p', count: 0, displayValue: 0 },
      { value: 20, label: '20p', count: 0, displayValue: 0 },
      { value: 10, label: '10p', count: 0, displayValue: 0 },
      { value: 5, label: '5p', count: 0, displayValue: 0 },
      { value: 2, label: '2p', count: 0, displayValue: 0 },
      { value: 1, label: '1p', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
    coins: [
      { value: 100, label: 'R$1', count: 0, displayValue: 0 },
      { value: 50, label: '50c', count: 0, displayValue: 0 },
      { value: 25, label: '25c', count: 0, displayValue: 0 },
      { value: 10, label: '10c', count: 0, displayValue: 0 },
      { value: 5, label: '5c', count: 0, displayValue: 0 }
    ]
  }
];

const selectedCurrency = ref<CurrencyConfig>(currencies[0]);
const coins = ref<Coin[]>(selectedCurrency.value.coins);

const totalDisplayValue = ref(0);

const totalValue = computed(() => {
  return coins.value.reduce((total, coin) => {
    return total + (coin.value * coin.count);
  }, 0);
});

const formattedTotal = computed(() => {
  const value = totalDisplayValue.value / 100;
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: selectedCurrency.value.code
  }).format(value);
});

const getIndividualSum = (coin: Coin) => {
  const totalCents = coin.value * coin.count;
  const value = totalCents / 100;
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: selectedCurrency.value.code
  }).format(value);
};

const resetCounts = () => {
  coins.value.forEach(coin => {
    coin.count = 0;
  });
};

const resetCoin = (coin: Coin) => {
  coin.count = 0;
};

const increment = (coin: Coin) => {
  coin.count++;
};

const decrement = (coin: Coin) => {
  if (coin.count > 0) {
    coin.count--;
  }
};

const changeCurrency = (currency: CurrencyConfig) => {
  selectedCurrency.value = currency;
  coins.value = currency.coins;
  resetCounts();
};

// Watch for changes in the total value and animate accordingly
watch(totalValue, (newValue, oldValue) => {
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

onMounted(() => {
  // Initialize display values
  totalDisplayValue.value = totalValue.value;
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="card-title text-2xl font-bold text-center">{{ selectedCurrency.name }} Coin Counter</h2>
          <div class="join">
            <button
              v-for="currency in currencies"
              :key="currency.code"
              class="btn join-item"
              :class="{ 'btn-active': selectedCurrency.code === currency.code }"
              @click="changeCurrency(currency)"
            >
              {{ currency.name }}
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="coin in coins" :key="coin.label" class="flex items-center p-2 border rounded-lg">
            <div class="w-16 h-16 flex items-center justify-center bg-primary text-primary-content rounded-full mr-4">
              <span class="text-xl font-bold">{{ coin.label }}</span>
            </div>
            <div class="flex-1 flex items-center justify-between">
              <div class="join">
                <button class="btn join-item" @click="decrement(coin)">-</button>
                <input 
                  type="number" 
                  v-model="coin.count" 
                  min="0" 
                  class="input input-bordered join-item w-20 text-center"
                />
                <button class="btn join-item" @click="increment(coin)">+</button>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  v-if="coin.count > 0" 
                  class="btn btn-circle btn-xs btn-error" 
                  @click="resetCoin(coin)" 
                  title="Reset this coin"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div v-if="coin.count > 0" class="badge badge-lg badge-success gap-2 text-lg p-4 overflow-hidden">
                  <span class="font-mono">{{ getIndividualSum(coin) }}</span>
                </div>
                <div v-else class="w-20"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="flex flex-col items-center justify-center">
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Total Value</div>
              <div class="stat-value text-primary font-mono">{{ formattedTotal }}</div>
              <div class="stat-desc">
                <span class="font-mono text-lg">{{ Math.round(totalDisplayValue) }} cents</span>
              </div>
            </div>
          </div>
          
          <button class="btn btn-outline mt-4" @click="resetCounts">Reset All</button>
        </div>
      </div>
    </div>
  </div>
</template>