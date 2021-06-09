import {CurrencyPipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

const map = {
    'RUB': 'ru-RU',
    'JPY': 'ja-JP'
};

@Pipe({name: 'localizedCurrency'})
export class LocalizedCurrencyPipe implements PipeTransform {
    transform(
        value: any,
        currencyCode: string = 'RUB',
        symbolDisplay: string = 'symbol-narrow',
        digits: string = null
    ): string {
        return new CurrencyPipe(map[currencyCode]).transform(value, currencyCode, symbolDisplay, digits);

    }
}
