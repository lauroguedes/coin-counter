import { ref, computed } from 'vue';

export interface MoneyItem {
  value: number;
  label: string;
  count: number;
  displayValue: number;
}

export type Coin = MoneyItem;
export type Banknote = MoneyItem;

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  coins: Coin[];
  banknotes: Banknote[];
}

export const currencies: CurrencyConfig[] = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'EUR',
    flag: '🇪🇺',
    coins: [
      { value: 200, label: '€2', count: 0, displayValue: 0 },
      { value: 100, label: '€1', count: 0, displayValue: 0 },
      { value: 50, label: '50c', count: 0, displayValue: 0 },
      { value: 20, label: '20c', count: 0, displayValue: 0 },
      { value: 10, label: '10c', count: 0, displayValue: 0 },
      { value: 5, label: '5c', count: 0, displayValue: 0 },
      { value: 2, label: '2c', count: 0, displayValue: 0 },
      { value: 1, label: '1c', count: 0, displayValue: 0 }
    ],
    banknotes: [
      { value: 50000, label: '€500', count: 0, displayValue: 0 },
      { value: 20000, label: '€200', count: 0, displayValue: 0 },
      { value: 10000, label: '€100', count: 0, displayValue: 0 },
      { value: 5000, label: '€50', count: 0, displayValue: 0 },
      { value: 2000, label: '€20', count: 0, displayValue: 0 },
      { value: 1000, label: '€10', count: 0, displayValue: 0 },
      { value: 500, label: '€5', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'USD',
    flag: '🇺🇸',
    coins: [
      { value: 100, label: '$1', count: 0, displayValue: 0 },
      { value: 50, label: '50¢', count: 0, displayValue: 0 },
      { value: 25, label: '25¢', count: 0, displayValue: 0 },
      { value: 10, label: '10¢', count: 0, displayValue: 0 },
      { value: 5, label: '5¢', count: 0, displayValue: 0 },
      { value: 1, label: '1¢', count: 0, displayValue: 0 }
    ],
    banknotes: [
      { value: 10000, label: '$100', count: 0, displayValue: 0 },
      { value: 5000, label: '$50', count: 0, displayValue: 0 },
      { value: 2000, label: '$20', count: 0, displayValue: 0 },
      { value: 1000, label: '$10', count: 0, displayValue: 0 },
      { value: 500, label: '$5', count: 0, displayValue: 0 },
      { value: 200, label: '$2', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'GBP',
    flag: '🇬🇧',
    coins: [
      { value: 200, label: '£2', count: 0, displayValue: 0 },
      { value: 100, label: '£1', count: 0, displayValue: 0 },
      { value: 50, label: '50p', count: 0, displayValue: 0 },
      { value: 20, label: '20p', count: 0, displayValue: 0 },
      { value: 10, label: '10p', count: 0, displayValue: 0 },
      { value: 5, label: '5p', count: 0, displayValue: 0 },
      { value: 2, label: '2p', count: 0, displayValue: 0 },
      { value: 1, label: '1p', count: 0, displayValue: 0 }
    ],
    banknotes: [
      { value: 5000, label: '£50', count: 0, displayValue: 0 },
      { value: 2000, label: '£20', count: 0, displayValue: 0 },
      { value: 1000, label: '£10', count: 0, displayValue: 0 },
      { value: 500, label: '£5', count: 0, displayValue: 0 }
    ]
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'BRL',
    flag: '🇧🇷',
    coins: [
      { value: 100, label: 'R$1', count: 0, displayValue: 0 },
      { value: 50, label: '50c', count: 0, displayValue: 0 },
      { value: 25, label: '25c', count: 0, displayValue: 0 },
      { value: 10, label: '10c', count: 0, displayValue: 0 },
      { value: 5, label: '5c', count: 0, displayValue: 0 }
    ],
    banknotes: [
      { value: 20000, label: 'R$200', count: 0, displayValue: 0 },
      { value: 10000, label: 'R$100', count: 0, displayValue: 0 },
      { value: 5000, label: 'R$50', count: 0, displayValue: 0 },
      { value: 2000, label: 'R$20', count: 0, displayValue: 0 },
      { value: 1000, label: 'R$10', count: 0, displayValue: 0 },
      { value: 500, label: 'R$5', count: 0, displayValue: 0 },
      { value: 200, label: 'R$2', count: 0, displayValue: 0 }
    ]
  }
];

export function useCurrency() {
  const selectedCurrency = ref<CurrencyConfig>(currencies[0]);
  const coins = ref<Coin[]>(selectedCurrency.value.coins);
  const banknotes = ref<Banknote[]>(selectedCurrency.value.banknotes);

  const coinsTotal = computed(() => {
    return coins.value.reduce((total, coin) => {
      return total + (coin.value * coin.count);
    }, 0);
  });
  
  const banknotesTotal = computed(() => {
    return banknotes.value.reduce((total, banknote) => {
      return total + (banknote.value * banknote.count);
    }, 0);
  });
  
  const totalValue = computed(() => {
    return coinsTotal.value + banknotesTotal.value;
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
    
    banknotes.value.forEach(banknote => {
      banknote.count = 0;
    });
  };

  const changeCurrency = (currency: CurrencyConfig) => {
    selectedCurrency.value = currency;
    coins.value = currency.coins;
    banknotes.value = currency.banknotes;
    resetCounts();
  };

  return {
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
  };
} 