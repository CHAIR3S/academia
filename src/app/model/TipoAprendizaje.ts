export class TipoAprendizaje {
	
	// idTipoAprendizaje: number = 0;
	
	// nombre: string = '';
	
	// descripcion: string = '';
	
	// consejo: string = '';	

	
	constructor(
		public idTipoAprendizaje: number,
		public nombre: string,
		public descripcion: string,
		public consejo: string
	  ) {}


}




export const visual = new TipoAprendizaje(
	1,
	'Visual',
	'Prefiere ver para aprender, utiliza diagramas y esquemas para entender mejor los conceptos.',
	'Utiliza colores y mapas mentales para mejorar la retención de información.'
  );
  
  export const auditivo = new TipoAprendizaje(
	2,
	'Auditivo',
	'Prefiere escuchar para aprender, se beneficia de discusiones y explicaciones orales.',
	'Intenta usar grabaciones de audio para revisar temas y participa activamente en debates.'
  );
  
  export const cinestesico = new TipoAprendizaje(
	3,
	'kinestésico',
	'Prefiere aprender haciendo y tocando, aprende mejor a través de la actividad física y la práctica.',
	'Incorpora actividades prácticas en tu estudio, como experimentos o construyendo modelos.'
  );