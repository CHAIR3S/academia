import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  spinner = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl(''),
      educationLevel: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      // agreeTerms: new FormControl(false, Validators.requiredTrue)
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
      this.spinner = true;

      let registro: Usuario = new Usuario();

      registro.correo = this.registerForm.value.email;
      registro.contrasena =  this.registerForm.value.password;
      registro.nombre =  this.registerForm.value.name;
      registro.edad =  this.registerForm.value.age;
      registro.sexo =  this.registerForm.value.sex;
      registro.grado =  this.registerForm.value.grade;
      registro.nivelEstudios =  this.registerForm.value.educationLevel;

      // console.log('Form Data: ', this.registerForm.value);


      
      if (this.imageSrc) {
        // console.log('Uploaded Image in Base64: ', this.imageSrc);
        registro.foto =  this.imageSrc.toString();
      }

      console.log(registro)

      registro.tipoAprendizaje = null;

      this._usuarioService.save(registro).subscribe(respuesta => {
        // console.log(respuesta)
        this._usuarioService.usuario = respuesta.object;
        

        this.openSnackBar(respuesta.mensaje);


        this._router.navigate(['/login'])

        this.spinner = false;
        
      },
      (error: any) => {
        // console.log(error.error.mensaje)
        console.log(error)
        this.openSnackBar("Error al registrar el usuario");

        this.spinner = false;
      })
      
    }else{
      // console.log(this.registerForm);

      this.openSnackBar('Formulario inválido');
    }
  }


  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }

}
