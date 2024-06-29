import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthUserDTO } from 'src/app/model/AuthUserDTO';
import { User } from 'src/app/model/User';
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
  spinner = false;


  // authSubscription: Subscription;
  userData: User = new User;


  constructor(
    private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _cookiesService: CookieService,
    private _usuarioService: UsuarioService,
    public _authService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });

    _authService.userProfileSubject.subscribe( (data) => { //Gets user authenticated data

      this.userData = data;

      console.log(data);

    })

    this._authService.handleAuthentication();
    
    // this._googleAuth.userProfileSubject.subscribe( (data) => { //Gets user authenticated data

    //   this.userProfile = data;

    //   console.log(data);

    // })


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
    

    if(this.loginForm.valid){
      this.spinner = true;
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

          this.spinner = false;
        },
        (error: any) => {
          // console.log(error.error.mensaje)
          // console.log(error)
          this.openSnackBar("Correo o contraseña incorrecta");
          
          this.spinner = false;
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

    // this._authService.login();

    this._authService.loginWithGoogle();

  }


  // get tokens() {
  //   const claims = this._authService.identityClaims;
  //   return claims ? claims['name'] : null;
  // }


  // userInfo() {
  //   const data = JSON.stringify(this._authService.identityClaims());
  //   console.log(data)
  // }
  

  llama() {
    
    this.dialog.open(DialogElementsExampleDialog);
  }
}



@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
  <h1 mat-dialog-title >Llama</h1>
  <img src="https://clipart-library.com/images_k/llama-head-silhouette/llama-head-silhouette-18.png" alt="Llama" style="height: 51vh;">
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsExampleDialog {}