import {Pipe, PipeTransform} from '@angular/core';
import {Exp} from '../../../shared/interfaces';

@Pipe({
    name: 'searchExps'
})
export class SearchExpPipe implements PipeTransform {
    transform(exps: Exp[], search = ''): Exp[] {
        if (!search.trim()) {
            return exps;
        }

        return exps.filter(exp => {
            return exp.comment.toLowerCase().includes(search.toLowerCase());
        });
    }

}

