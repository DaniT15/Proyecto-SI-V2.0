import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contextos/UserContext';
import { supabase } from '../config/supabaseConfig';
import '../estilos/galeria.css';

const Galeria = () => {
    const [fotos, setFotos] = useState([]);
    const [foto, setFoto] = useState(null);
    const [year, setYear] = useState('');
    const { logged } = useContext(UserContext);
    const [cargando, setCargando] = useState(false);
    const [errorSubida, setErrorSubida] = useState(null);

    const fetchFotos = async () => {
        try {
            const { data, error } = await supabase
                .from('galeria')
                .select('*')
                .order('year', { ascending: false });

            if (error) throw error;

            setFotos(data);
        } catch (error) {
            console.error("Error al obtener fotos:", error);
        }
    };

    useEffect(() => {
        fetchFotos();
    }, []);

    const uploadImage = async (file, bucketName, folderName) => {
        try {
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = `${folderName}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

            if (!data || !data.publicUrl) {
                throw new Error("No se pudo obtener la URL pública de la imagen.");
            }

            return data.publicUrl;
        } catch (error) {
            console.error("Error al subir imagen:", error);
            throw error;
        }
    };

    const subirFoto = async (e) => {
        e.preventDefault();
        setErrorSubida(null);

        if (!foto || !year) {
            setErrorSubida('Completa todos los campos.');
            return;
        }

        const anio = parseInt(year);
        if (isNaN(anio)) {
            setErrorSubida('El año debe ser un número válido.');
            return;
        }

        try {
            setCargando(true);
            const imageUrl = await uploadImage(foto, 'galeria', 'fotos');

            const { data, error } = await supabase
                .from('galeria')
                .insert([{ url: imageUrl, year: anio }]); // Eliminado id: 'galeria'

            console.log("Respuesta de inserción:", { data, error });

            if (error) throw error;

            alert('Foto subida correctamente');
            setFoto(null);
            setYear('');
            document.querySelector('form').reset();
            fetchFotos();
        } catch (error) {
            console.error("Error al subir foto:", error);
            setErrorSubida(error.message || "Error al subir la foto. Intenta de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container">
            <h1>Galería</h1>
            <p>Revive nuestras experiencias a través de nuestra galería de fotos inolvidables</p>

            {logged ? (
                <form onSubmit={subirFoto}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files[0])}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Año"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={cargando}>
                        {cargando ? 'Subiendo...' : 'Subir Foto'}
                    </button>
                    {errorSubida && <p className="error">{errorSubida}</p>}
                </form>
            ) : (
                <p>Debes iniciar sesión para subir fotos.</p>
            )}

            <div className="galeria-grid">
                {fotos.map((foto) => (
                    <div key={foto.id} className="foto-card">
                        <img src={foto.url} alt={`Foto ${foto.year}`} />
                        <h3>{foto.year}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Galeria;