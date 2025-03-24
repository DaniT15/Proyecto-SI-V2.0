import { useState } from 'react';
import { uploadImage } from '../config/supabaseConfig'; 
import { app } from '../config/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { UserContext } from '../contextos/UserContext';

const db = getFirestore(app);
const auth = getAuth(app);

export default function FotoRuta({ onPortadaUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const { profile, setProfile } = use(UserContext);

  // Subir la imagen de portada
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // El usuario actual
      const user = auth.currentUser;

      // Subir la imagen a Supabase con el bucket 'foto-portada'
      const imageUrl = await uploadImage(file, 'foto-portada', user.uid);

      // Llamar a la función que se pasa como prop para actualizar la URL de la portada
      onPortadaUpload(imageUrl);

      alert('Foto de portada subida correctamente ✅');
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Foto de Portada de Ruta</h1>

      <div className="foto-portada-container mb-4">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Foto de portada"
          className="foto-portada"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="file-input"
      />

      {isUploading && <p className="mt-2 text-blue-600">Subiendo imagen...</p>}
    </div>
  );
}