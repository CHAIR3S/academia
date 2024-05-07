import { Chat } from "./Chat";

export class Mensaje {

	idMensaje: number = 0;
	
	texto: string = '';

	fecha: Date = new Date();
	
	archivo?: string = '';    
	
	ia: boolean = false;

	chat?: Chat;

}