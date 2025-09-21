import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/productos";

// Función para validar y limpiar URLs de imágenes
const cleanImageUrl = (url) => {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    // Lista de dominios problemáticos que causan errores en la consola
    const problematicDomains = ['imagen.com', 'via.placeholder.com'];
    
    // Si contiene un dominio problemático, devolver null para usar imagen por defecto
    if (problematicDomains.some(domain => urlObj.hostname.includes(domain))) {
      return null;
    }
    
    return url;
  } catch {
    // Si la URL no es válida, devolver null
    return null;
  }
};

export const useProductos = (reload = false) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Limpiar las URLs de imágenes problemáticas
        const productosLimpios = data.productos.map(producto => ({
          ...producto,
          imagen_url: cleanImageUrl(producto.imagen_url)
        }));
        
        setProductos(productosLimpios);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar productos");
        setLoading(false);
      });
  }, [reload]);

  return { productos, loading, error };
};