import { useState, useEffect, ReactNode } from "react";
import { Video, Category, Girl, Studio} from "../types"
import { DataContext } from "../contexts/DataContext";

interface DataProviderProps {
    children: ReactNode;
    }

export const DataProvider = ({ children }: DataProviderProps) => {
    const [data, setData] = useState<{
      categories: Category[];
      girls: Girl[];
      videos: Video[];
      studios: Studio[]; // Add studios data here if needed.
    }>({
      categories: [],
      girls: [],
      videos: [],
      studios: [], // Add studios data here if needed.
    });
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          console.log("Starting fetchinf")
          const categoriesRes = await fetch("http://localhost:3000/api/categories");
          const girlsRes = await fetch("http://localhost:3000/api/girls");
          const videosRes = await fetch("http://localhost:3000/api/videos");
          const studiosRes = await fetch("http://localhost:3000/api/studios");
          
  
          if (!categoriesRes.ok) throw new Error("Error fetching categories");
          if (!girlsRes.ok) throw new Error("Error fetching girls");
          if (!videosRes.ok) throw new Error("Error fetching videos");
  
          const [categories, girls, videos, studios] = await Promise.all([
            categoriesRes.json(),
            girlsRes.json(),
            videosRes.json(),
            studiosRes.json(), // Add studios data here if needed.
          ]);
  
          setData({ categories, girls, videos, studios });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <DataContext.Provider value={{ ...data, loading, error }}>
        {children}
      </DataContext.Provider>
    );
  };