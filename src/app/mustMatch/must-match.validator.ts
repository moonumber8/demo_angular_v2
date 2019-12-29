import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core'


@Directive({
    selector: '[appMustMatch]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})

export class ConfirmEqualValidatorDirective implements Validator{
    @Input() appMustMatch: string;
    validate(control: AbstractControl): {[key:string]:any} | null{
        const controToCompare = control.parent.get(this.appMustMatch);
        if(controToCompare && controToCompare.value !== control.value){
            return{'notEqual': true};
        }
        return null;
    }  
}
