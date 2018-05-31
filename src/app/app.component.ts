import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Customer } from './customer.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    public myForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        console.log('creating parent form group');
        this.myForm = this._fb.group({
            name: ['harry', [Validators.required, Validators.minLength(5), FormValidators.validateAll]],
            addresses: this._fb.array([
                this.initAddress(),
            ])
        });
        console.log('created form groups');
        this.onChanges();

        this.myForm.patchValue({
            name: 'John'
        });

        this.myForm.controls['name'].setValue('Joe');
    }

    onChanges(): void {
        this.myForm.valueChanges.subscribe(val => {
            console.log('onChanges', val);
        });
    }

    onClick() {
        console.log('onclick');
    }

    initAddress() {
        console.log('creating child form group');
        return this._fb.group({
            street: ['street', Validators.required],
            postcode: ['postcode']
        });
    }

    addAddress() {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }

    save(model) {
        // call API to save
        // ...
        console.log(model);
    }
}

class FormValidators {

    static validateAll(control): ValidationErrors | null {
        console.log('validateAll ' + control.value);
        return null;
    }

}
