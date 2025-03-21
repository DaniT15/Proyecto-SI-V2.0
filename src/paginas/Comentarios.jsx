import React, { useState, useEffect } from 'react';
import '../estilos/comentarios.css';
import { auth, db } from '../config/firebaseConfig';
import { UserContext } from "../contextos/UserContext";
import { useContext } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function Comentarios() {
    const contextUser = useContext(UserContext);
    const { profile, setUser } = contextUser;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        const commentsCollection = collection(db, 'comments');
        const unsubscribeComments = onSnapshot(commentsCollection, (snapshot) => {
            const commentsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsList);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeComments();
        };
    }, [setUser]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        let userName = 'Usuario Anónimo';
        if (profile) {
            userName = profile?.displayName || profile?.name || profile?.email.split('@')[0] || 'Usuario Anónimo';
        }

        try {
            const commentsCollection = collection(db, 'comments');
            await addDoc(commentsCollection, {
                user: userName,
                text: newComment,
            });
            setNewComment('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="comentarios-container">
            <h2>Comentarios</h2>
            <form className="comentario-form" onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                />
                <button type="submit">Enviar Comentario</button>
            </form>
            <div className="comentario-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comentario-item compartido1">
                        <p>
                            <strong>{comment.user}</strong>: {comment.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
