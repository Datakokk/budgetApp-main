import { AbstractControl } from "@angular/forms";

const letrasCif = ['a','b','c','d']; // Hay más letras del cif...

export function ValidateCif(control: AbstractControl) {

    let isValidLetraCif: boolean = false;

    letrasCif.forEach(elem => {
        if(control.value.toLowerCase().startsWith(elem)) {
            isValidLetraCif = true;
        }
    })

    if(!isValidLetraCif) {
        return {invalidCif: true, mensaje: 'El CIF debe comenzar por A, B, C ó D'}
    } else if (control.value.length !== 9) {
        return {invalidCif: true, mensaje: 'El CIF debe tener 9 caracteres'}
    }

    return null
}