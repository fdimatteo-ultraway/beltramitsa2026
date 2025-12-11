import React, { useState } from 'react';
import './Classifica.css';

const categories = [
  {
    name: 'Master Sport 18-29 anni',
    data: [
      { rank: 1, name: 'Mario Rossi', team: 'Team Bianchi', points: 120 },
      { rank: 2, name: 'Luca Verdi', team: 'Team Colnago', points: 110 },
      { rank: 3, name: 'Marco Neri', team: 'Team Pinarello', points: 100 },
    ],
  },
  {
    name: 'Master 1 30-34 anni',
    data: [
      { rank: 1, name: 'Paolo Bianchi', team: 'Team Specialized', points: 150 },
      { rank: 2, name: 'Fabio Gialli', team: 'Team Trek', points: 140 },
      { rank: 3, name: 'David Azzurri', team: 'Team Scott', points: 130 },
    ],
  },
  {
    name: 'Master 2 35-39 anni',
    data: [
        { rank: 1, name: 'Simone Romano', team: 'Team Cannondale', points: 180 },
        { rank: 2, name: 'Andrea Conti', team: 'Team Giant', points: 170 },
        { rank: 3, name: 'Stefano Marchetti', team: 'Team Canyon', points: 160 },
    ],
  },
  {
    name: 'Femminile 1 fino ai 39 anni',
    data: [
        { rank: 1, name: 'Giulia Moretti', team: 'Team Liv', points: 200 },
        { rank: 2, name: 'Sara Barbieri', team: 'Team Trek Women', points: 190 },
        { rank: 3, name: 'Laura Fontana', team: 'Team Specialized Women', points: 180 },
    ],
  },
  // Add more categories here...
];

const Classifica = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="classifica-container">
      <h1>Classifica a Punti</h1>
      {categories.map((category, index) => (
        <div key={index} className="accordion-item">
          <div className="accordion-title" onClick={() => toggleAccordion(index)}>
            <h2>{category.name}</h2>
            <span>{activeIndex === index ? '-' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th>Pos.</th>
                    <th>Nome</th>
                    <th>Team</th>
                    <th>Punti</th>
                  </tr>
                </thead>
                <tbody>
                  {category.data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.rank}</td>
                      <td>{item.name}</td>
                      <td>{item.team}</td>
                      <td>{item.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Classifica;
