import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TestDialogComponent } from 'src/app/components/test-dialog/test-dialog.component';
import { TipoAprendizaje, auditivo, cinestesico, visual } from 'src/app/model/TipoAprendizaje';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


const scoringMap: any = {
  pregunta1: { a: 'Auditivo', b: 'Visual', c: 'Cinestésico' },
  pregunta2: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta3: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta4: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta5: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta6: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta7: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta8: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta9: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta10: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta11: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta12: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta13: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta14: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta15: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta16: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta17: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta18: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta19: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta20: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta21: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta22: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta23: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta24: { a: 'Auditivo', b: 'Visual', c: 'Cinestésico' },
  pregunta25: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta26: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta27: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta28: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta29: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta30: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' },
  pregunta31: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta32: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta33: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta34: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta35: { a: 'Cinestésico', b: 'Visual', c: 'Auditivo' },
  pregunta36: { a: 'Visual', b: 'Cinestésico', c: 'Auditivo' },
  pregunta37: { a: 'Auditivo', b: 'Visual', c: 'Cinestésico' },
  pregunta38: { a: 'Cinestésico', b: 'Auditivo', c: 'Visual' },
  pregunta39: { a: 'Auditivo', b: 'Cinestésico', c: 'Visual' },
  pregunta40: { a: 'Visual', b: 'Auditivo', c: 'Cinestésico' }
};



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})





export class TestComponent implements OnInit{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {

    
    this.form = this.fb.group({
      pregunta1: [''],
      pregunta2: [''],
      pregunta3: [''],
      pregunta4: [''],
      pregunta5: [''],
      pregunta6: [''],
      pregunta7: [''],
      pregunta8: [''],
      pregunta9: [''],
      pregunta10: [''],
      pregunta11: [''],
      pregunta12: [''],
      pregunta13: [''],
      pregunta14: [''],
      pregunta15: [''],
      pregunta16: [''],
      pregunta17: [''],
      pregunta18: [''],
      pregunta19: [''],
      pregunta20: [''],
      pregunta21: [''],
      pregunta22: [''],
      pregunta23: [''],
      pregunta24: [''],
      pregunta25: [''],
      pregunta26: [''],
      pregunta27: [''],
      pregunta28: [''],
      pregunta29: [''],
      pregunta30: [''],
      pregunta31: [''],
      pregunta32: [''],
      pregunta33: [''],
      pregunta34: [''],
      pregunta35: [''],
      pregunta36: [''],
      pregunta37: [''],
      pregunta38: [''],
      pregunta39: [''],
      pregunta40: ['']
      
    }); }

  ngOnInit() {
  }


  onSubmit() {
    const results: any = { Visual: 0, Auditivo: 0, Cinestésico: 0 };
    Object.keys(this.form.value).forEach(key => {
      const response = this.form.value[key];
      if (response && scoringMap[key]) {
        const type = scoringMap[key][response];
        if (type) {
          results[type]++;
        }
      }
    });

    // Determinar el tipo predominante
    const maxType = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);

    let tipoAprendiz: TipoAprendizaje;

    tipoAprendiz = (maxType === 'Visual') ? visual : (maxType === 'Auditivo') ? auditivo : cinestesico

    //Abrir dialog
    const dialogRef = this.dialog.open(TestDialogComponent, {
      data: { tipoAprendiz }

    });


    

    let usuarioData: Usuario = new Usuario();
    
    const usuarioJSON = localStorage.getItem('usuario');

    if(usuarioJSON){
      usuarioData = JSON.parse(usuarioJSON);

    }

    usuarioData.tipoAprendizaje = tipoAprendiz;
    usuarioData.contrasena = '';
    console.log(usuarioData)

    this._usuarioService.update(usuarioData).subscribe(respuesta => {
      // console.log(respuesta);

      localStorage.removeItem('usuario')
      localStorage.setItem('usuario', JSON.stringify(respuesta.object))

      
      // dialogRef.afterClosed().subscribe(result => {
        this._router.navigate(['/chat'])
      // });
    })


    // console.log('Tipo predominante de aprendizaje:', maxType);
    // console.log('Resultados:', results);
  }



}


