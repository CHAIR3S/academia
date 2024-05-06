import { Chat } from "./Chat";

export interface Mensaje {

	idMensaje: number;
	
	texto: string;

	fecha: Date;
	
	archivo?: string;    
	
	ia: boolean;

	chat?: Chat;

}