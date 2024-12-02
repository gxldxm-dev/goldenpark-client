import { createContext } from "react";
import { Video, Category, Girl, Studio} from "../types"


interface DataContextType {
  categories: Category[];
  girls: Girl[];
  videos: Video[];
  studios: Studio[];
  loading: boolean;
  error: string | null;
}


// Crear el contexto con valores predeterminados
export const DataContext = createContext<DataContextType | undefined>(undefined);



// Hook para acceder al contexto fácilmente
