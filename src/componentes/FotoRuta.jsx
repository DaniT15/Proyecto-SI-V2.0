import React, { useState } from 'react';
import { uploadImage } from '../config/supabaseConfig';
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { UserContext } from '../contextos/UserContext';

const auth = getAuth();

export default function FotoRuta({ onPortadaUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const { profile, setProfile } = use(UserContext);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const user = auth.currentUser;
      const imageUrl = await uploadImage(file, 'foto-portada', user.uid); // Usamos 'foto-portada' como bucket

      setUploadedImageUrl(imageUrl);
      if (onPortadaUpload) {
        onPortadaUpload(imageUrl); // Llama a la función de éxito en RegistrarRuta
      }

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
          src={uploadedImageUrl || 'https://via.placeholder.com/150'}
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