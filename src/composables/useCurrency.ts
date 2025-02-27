import { ref, computed } from 'vue';

export interface Coin {
  value: number;
  label: string;
  count: number;
  displayValue: number;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  coins: Coin[];
}

export const currencies: CurrencyConfig[] = [
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

export function useCurrency() {
  const selectedCurrency = ref<CurrencyConfig>(currencies[0]);
  const coins = ref<Coin[]>(selectedCurrency.value.coins);

  const totalValue = computed(() => {
    return coins.value.reduce((total, coin) => {
      return total + (coin.value * coin.count);
    }, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: selectedCurrency.value.code
    }).format(value / 100);
  };

  const resetCounts = () => {
    coins.value.forEach(coin => {
      coin.count = 0;
    });
  };

  const changeCurrency = (currency: CurrencyConfig) => {
    selectedCurrency.value = currency;
    coins.value = currency.coins;
    resetCounts();
  };

  return {
    selectedCurrency,
    coins,
    totalValue,
    currencies,
    formatCurrency,
    resetCounts,
    changeCurrency
  };
} 