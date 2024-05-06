import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registerForm: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;

  focus = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;

  constructor(
    private _snackBar: MatSnackBar
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl(''),
      educationLevel: new FormControl(''),
      grade: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      agreeTerms: new FormControl(false, Validators.requiredTrue)
    });
  }




  onFileSelected(event: any){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }

  }
  

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data: ', this.registerForm.value);
      
      if (this.imageSrc) {
        console.log('Uploaded Image in Base64: ', this.imageSrc);
      }
      
    }else{
      this.openSnackBar('Formulario inválido');
    }
  }


  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }

}
