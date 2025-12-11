import React, { useState } from 'react';
import './DettagliAtletaModal.css';

const DettagliAtletaModal = ({ atleta, onClose }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    if (!atleta) return null;

    const handleEventClick = (evento) => {
        setSelectedEvent(evento);
    };

    const handleBackClick = () => {
        setSelectedEvent(null);
    };

  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h2>
                    <strong>{atleta.atleta}</strong> - {atleta.team}
                </h2>
                <button className="close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="athlete-details">
                    <div className="details-row">
                        <div className="detail-item"><strong>Sex</strong>{atleta.sex}</div>
                        <div className="detail-item"><strong>Categoria</strong>{atleta.cat}</div>
                        <div className="detail-item"><strong>Punti</strong>{atleta.punti}</div>
                    </div>
                    <div className="details-row">
                        <div className="detail-item"><strong>Posizione Assoluta</strong>{atleta.pGen}</div>
                        <div className="detail-item"><strong>Posizione Categoria</strong>{atleta.pCat}</div>
                        <div className="detail-item"><strong>Posizione Sex</strong>{atleta.pSex}</div>
                    </div>
                </div>

                {selectedEvent ? (
                    <div className="event-details-view">
                        <button className="back-button" onClick={handleBackClick}>&larr; Torna agli eventi</button>
                        <h3>{selectedEvent.nome}</h3>
                        <div className="event-details-grid">
                            <div className="detail-item"><strong>Gara</strong>{selectedEvent.gara ?? 'Granfondo'}</div>
                            <div className="detail-item"><strong>Tempo</strong>{selectedEvent.tempo ?? '03:45:21'}</div>
                            <div className="detail-item"><strong>Ritardo</strong>{selectedEvent.ritardo ?? '+00:21:10'}</div>
                            <div className="detail-item"><strong>Posizione Assoluta</strong>{selectedEvent.posAssoluta ?? '142'}</div>
                            <div className="detail-item"><strong>Posizione Sex</strong>{selectedEvent.posSex ?? '122'}</div>
                            <div className="detail-item"><strong>Posizione Categoria</strong>{selectedEvent.posCat ?? '31'}</div>
                        </div>
                    </div>
                ) : (
                    <div className="event-list-view">
                        <h3>Punti per evento</h3>
                        <div className="event-points">
                            {atleta.eventi.map((evento, index) => (
                                <div className="event-item" key={index} onClick={() => handleEventClick(evento)}>
                                <span className="event-name">{evento.nome}</span>
                                <span className="event-points-badge">{evento.punti > 0 ? evento.punti : '-'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
      </div>
    </div>
  );
};

export default DettagliAtletaModal;
