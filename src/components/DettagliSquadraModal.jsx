import React, { useState } from 'react';
import './DettagliSquadraModal.css';

const DettagliSquadraModal = ({ squadra, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!squadra) return null;

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
            <strong>{squadra.nome}</strong>
          </h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {selectedEvent ? (
            <div className="event-details-view">
              <button className="back-button" onClick={handleBackClick}>← Indietro</button>
              <h3>{selectedEvent.nome}</h3>
              <div className="details-row">
                <div className="detail-item">
                  <strong>Punti</strong>
                  <span>{selectedEvent.punti}</span>
                </div>
                <div className="detail-item">
                  <strong>Atleti</strong>
                  <span>{selectedEvent.numeroAtleti}</span>
                </div>
                <div className="detail-item">
                  <strong>Posizione</strong>
                  <span>{selectedEvent.posizione}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="team-summary">
                <div className="summary-item">
                  <strong>Posizione</strong>
                  <span className="summary-value">{squadra.posizione}</span>
                </div>
                <div className="summary-item">
                  <strong>Punti Totali</strong>
                  <span className="summary-value">{squadra.punti}</span>
                </div>
                <div className="summary-item">
                  <strong>Numero Atleti</strong>
                  <span className="summary-value">{squadra.numeroAtleti}</span>
                </div>
              </div>
              <h3>Punti per evento</h3>
              <div className="events-grid">
                {squadra.eventi.map((evento, index) => (
                  <div className="event-item" key={index} onClick={() => handleEventClick(evento)}>
                    <span className="event-name">{evento.nome}</span>
                    <span className="event-points-badge">{evento.punti}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DettagliSquadraModal;
