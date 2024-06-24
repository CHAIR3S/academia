import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthUserDTO } from 'src/app/model/AuthUserDTO';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  focus = false;
  focus1 = false;


  // authSubscription: Subscription;
  userProfile: Usuario = new Usuario();


  constructor(
    private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _cookiesService: CookieService,
    private _usuarioService: UsuarioService,
    public _googleAuth: AuthenticationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });

    
    this._googleAuth.userProfileSubject.subscribe( (data) => { //Gets user authenticated data

      this.userProfile = data;

      console.log(data);

    })


    // this.authSubscription = this._googleAuth.userProfileSubject.subscribe({
    //   next: (userProfile) => {
    //     this.userProfile = userProfile;
    //     console.log('Perfil del usuario:', this.userProfile);
    //   },
    //   error: (error) => console.error('Error al recibir los datos del perfil:', error)
    // });

   }

  ngOnInit() {
  }


  login(){
    // console.log(this.loginForm)

    if(this.loginForm.valid){
      const credenciales: AuthUserDTO = new AuthUserDTO();
      credenciales.correo = this.loginForm.value.email;
      credenciales.contrasena = this.loginForm.value.password;

      this._loginService.autenticar(credenciales).subscribe(respuesta => {
        const userJSON = JSON.stringify(respuesta.object.usuario);

          this._usuarioService.usuario = respuesta.object.usuario;

          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (2 * 60 * 60 * 1000)); // 2 horas en milisegundos

          // Establece la cookie con la fecha de expiración
          console.log(respuesta)
          this._cookiesService.set('token', respuesta.object.jwt, { expires: expirationDate, sameSite: 'Lax' })
          // this._cookiesService.set('user', userJSON, { expires: expirationDate})
          localStorage.setItem('usuario', userJSON)

          this.openSnackBar("Sesión iniciada correctamente");

          this._router.navigate(['/chat']);
        },
        (error: any) => {
          // console.log(error.error.mensaje)
          // console.log(error)
          this.openSnackBar("Correo o contraseña incorrecta");
        }
      )
    }else{
      this.openSnackBar('Formulario inválido');

    }

  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }


  registro(){
    this._router.navigate(['/registro']);
  }

  loggearGoogle(){
    // console.log('logear google')
    // this._googleAuth.autenticarGoogle();


  }

}
