import { TipoAprendizaje } from "./TipoAprendizaje";

export class Usuario {
    
	idUsuario: number = 0;
	
	correo: string = '';
	
	contrasena: string = '';
	
	nombre: string = '';
	
	edad: number = 0;
	
	sexo: string = '';
	
	grado: string = '';
	
	nivelEstudios: string = '';

	foto: string = '';

	tipoAprendizaje: TipoAprendizaje = new TipoAprendizaje;
}