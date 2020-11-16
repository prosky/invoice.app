import dateFormats from "./dateFormats";
import {defaultCurrencies} from "./currencies";
import countries from "../data/countries";
import Invoice from "../classes/Invoice";
import {ProductInterface} from "./types";

const DEFAULT_LOCALE = 'en-EN';
const defaultLocale = navigator.language || DEFAULT_LOCALE;
const defaultDateFormat = dateFormats[defaultLocale] || dateFormats[DEFAULT_LOCALE];
const [locale, country] = defaultLocale.split('-');

const defaultCountry = countries[defaultLocale];
const defaultCurrency = defaultCurrencies[country];

const factory = {
  invoice: () => {
    return new Invoice(defaultCountry, defaultCurrency, defaultLocale, defaultDateFormat);
  },
  product: (): ProductInterface => {
    return {
      description: '',
      quantity: 1,
      taxRate: 21,
      price: 0.00,
    }
  }
};

export default factory;
