import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/productos`;

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

// Función para limpiar el array de imágenes
const cleanImageArray = (imageData) => {
  if (!imageData) return null;
  
  // Si es un string (formato anterior), convertirlo al nuevo formato
  if (typeof imageData === 'string') {
    const cleanedUrl = cleanImageUrl(imageData);
    return cleanedUrl ? [{ tipo: 'principal', url: cleanedUrl }] : null;
  }
  
  // Si es un array (nuevo formato), limpiar cada imagen
  if (Array.isArray(imageData)) {
    const cleanedImages = imageData
      .map(img => ({
        ...img,
        url: cleanImageUrl(img.url)
      }))
      .filter(img => img.url !== null);
    
    return cleanedImages.length > 0 ? cleanedImages : null;
  }
  
  return null;
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
          imagen_url: cleanImageArray(producto.imagen_url)
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