import React, { useState } from 'react';
import './Classifica.css';

const generateMockData = (count) => {
  const data = [];
  const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  const femaleCategories = ['WA', 'WB', 'WC', 'WD'];
  const maleCategories = ['ELMT', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];

  for (let i = 1; i <= count; i++) {
    const sex = Math.random() > 0.3 ? 'M' : 'F';
    const categories = sex === 'F' ? femaleCategories : maleCategories;
    const cat = categories[Math.floor(Math.random() * categories.length)];

    data.push({
      atleta: `Atleta ${i}`,
      team: teams[Math.floor(Math.random() * teams.length)],
      sex: sex,
      cat: cat,
      punti: Math.floor(Math.random() * 2000) + 500,
    });
  }
  return data;
};

const Classifica = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2025);
  const recordsPerPage = 20;

  const initialRecords = generateMockData(100);

  const categoryRanks = {};
  initialRecords.forEach(record => {
    if (!categoryRanks[record.cat]) {
      categoryRanks[record.cat] = [];
    }
    categoryRanks[record.cat].push(record);
  });

  const pCatMap = new Map();
  for (const category in categoryRanks) {
    categoryRanks[category]
      .sort((a, b) => b.punti - a.punti)
      .forEach((athlete, index) => {
        pCatMap.set(athlete.atleta, index + 1);
      });
  }

  const maleAthletes = initialRecords.filter(a => a.sex === 'M').sort((a, b) => b.punti - a.punti);
  const femaleAthletes = initialRecords.filter(a => a.sex === 'F').sort((a, b) => b.punti - a.punti);

  const pSexMap = new Map();
  maleAthletes.forEach((athlete, index) => { pSexMap.set(athlete.atleta, index + 1); });
  femaleAthletes.forEach((athlete, index) => { pSexMap.set(athlete.atleta, index + 1); });

  const allRecords = initialRecords
    .sort((a, b) => b.punti - a.punti)
    .map((record, index) => ({
      ...record,
      pGen: index + 1,
      pSex: pSexMap.get(record.atleta),
      pCat: pCatMap.get(record.atleta)
    }));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  return (
    <div className="classifica-container">
      <div className="year-selector-container">
        <label htmlFor="year-select">Risultati del:</label>
        <select id="year-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>P. Gen</th>
            <th>Atleta</th>
            <th>Team</th>
            <th>Sex</th>
            <th>P. Sex</th>
            <th>Cat</th>
            <th>Punti</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.pGen}>
              <td>{record.pGen}</td>
              <td>{record.atleta}</td>
              <td>{record.team}</td>
              <td>{record.sex}</td>
              <td>{record.pSex}</td>
              <td style={{ fontSize: 'small', textAlign: 'center' }}>
                {record.cat}
                <br />
                {record.pCat}
              </td>
              <td>{record.punti}</td>
              <td><button className="details-button">Dettagli</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Classifica;
