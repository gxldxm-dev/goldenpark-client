export interface Category {
    metadata: {
      totalGirls: number;
      totalVideos: number;
    };
    _id: string;
    name: string;
    type: string;
    description: string;
    girls: string[]; // Puedes especificar un tipo más detallado si sabes la estructura de los elementos en este array
    videos: string[]; // Similar para los videos
    popularityScore: number;
    status: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    contentCount: number;
    id: string;
  }


  interface ActiveYears {
    startYear: number;
    endYear?: number;
  }
  
 export interface Studio {
    _id?: string; // Opcional en caso de que sea un documento nuevo
    name: string;
    country?: string;
    girls?: string[]; // Referencias a 'Girl' por ID
    videos?: string[]; // Referencias a 'Video' por ID
    foundation?: number;
    cessation?: number;
    history?: string;
    rate: number;
    status?: 'active' | 'closed'; // Basado en statusEnum
    createdAt?: Date; // Incluido automáticamente por `timestamps`
    updatedAt?: Date; // Incluido automáticamente por `timestamps`
  }
  
  export interface Girl {
    _id?: string; // Opcional en caso de ser un nuevo documento
    name: string;
    age: number; // Entre 0 y 17 según las restricciones
    categories: string[]; // Referencias a 'Category' por ID
    biography?: string; // Máximo de 1000 caracteres
    tags?: string[]; // Arreglo de strings con máximo 30 caracteres cada uno
    country: string; // Basado en `countryEnum`
    status?: 'active' | 'inactive' | 'pending' | 'suspended'; // Estados permitidos
    videos?: string[]; // Referencias a 'Video' por ID
    studio?: string | Studio; // Referencia a 'Studio' por ID
    activeYears?: ActiveYears; // Propiedad opcional del tipo ActiveYears
    createdAt?: Date; // Incluido automáticamente por `timestamps`
    updatedAt?: Date; // Incluido automáticamente por `timestamps`
  }

  export interface Video {
    _id: string; // Opcional en caso de ser un nuevo documento
    name: string
    rate?: number; // Entre 0 y 100
    isHot?: boolean;
    orientation: string;
    girls: string[];
    resolution: string;
    categories: string[]; //
    metadata: {
      size: string;
      width: number;
      height: number;
      duration: number;
      bitrate?: number;
      codec: string;
      fps: number;
      creationDate: Date;
      modifiedDate: Date;
    };

  }


  
  interface ActiveYears {
    startYear: number;
    endYear?: number;
  }
  

type statusTyped = "Uploading" | "Converting" | "Processing" | "Uploading to MEGA.nz" | "Failed" | "Completed"


export interface DataSocket {
  status?: statusTyped,
  message?: string,
  progress?: number,

}


export interface ResponseSocket extends DataSocket {
  taskId: string;
}
