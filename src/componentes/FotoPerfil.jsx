import { useState } from 'react';
import { uploadImage } from '../config/supabaseConfig'; 
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig'; 
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { UserContext } from '../contextos/UserContext';

const db = getFirestore(app);
const auth = getAuth(app);

export default function FotoPerfil() {
  const [isUploading, setIsUploading] = useState(false);
  const { profile, setProfile } = use(UserContext);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // El usuario actual
      const user = auth.currentUser;

      // Subir la imagen a Supabase con el bucket 'foto-perfil' y el UID del usuario
      const imageUrl = await uploadImage(file, 'foto-perfil', user.uid);

      // Actualizar la imagen en Firebase
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        foto_perfil: imageUrl
      });

      // Actualizar el estado local
      setProfile({
        ...profile,
        foto_perfil: imageUrl
      });

      alert('Foto subida correctamente ✅');
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">

      <div className="foto-perfil-container mb-4">
        <img 
          src={profile?.foto_perfil || "https://via.placeholder.com/150"} 
          alt="Foto de perfil"
          className="foto-perfil"
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