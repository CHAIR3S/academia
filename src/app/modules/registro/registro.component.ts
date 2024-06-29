import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthUserDTO } from 'src/app/model/AuthUserDTO';
import { User } from 'src/app/model/User';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registerForm: FormGroup;
  imageSrc: string | ArrayBuffer | null = null;
  
  // authSubscription: Subscription;
  userData: User = new User;

  focus = false;
  focus1 = false;
  focus2 = false;
  focus3 = false;
  focus4 = false;

  spinner = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _authService: AuthenticationService,
    private _loginService: LoginService,
    private _cookiesService: CookieService
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


    
    _authService.userProfileSubject.subscribe( (data) => { //Gets user authenticated data

      this.spinner = true;
      this.userData = data;

      // console.log(data);

      if(this.userData){
        const autenticarGoogle: AuthUserDTO  = new AuthUserDTO();
        autenticarGoogle.correo = this.userData.info.email;
        autenticarGoogle.googleJWT = _authService.getAuthHeader();
        console.log(_authService.getAuthHeader());



        _loginService.autenticar(autenticarGoogle).subscribe(respuesta => {
          console.log(respuesta)
          const userJSON = JSON.stringify(respuesta.object.usuario);

          

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000)); // 2 horas en milisegundos
          
          this._cookiesService.set('token', respuesta.object.jwt, { expires: expirationDate, sameSite: 'Lax' })
          // this._cookiesService.set('user', userJSON, { expires: expirationDate})
          localStorage.setItem('usuario', userJSON)

          this.openSnackBar("Sesión iniciada correctamente");

          this._router.navigate(['/chat']);
          this.spinner = false;
          
        },
        (error: any) => {
          this.spinner = false;
          this.openSnackBar("Error de inicio de sesión");
        }
      )
      }

    })

    this._authService.handleAuthentication();

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

  
  loggearGoogle(){


    this._authService.loginWithGoogle();

  }

}
