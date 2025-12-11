import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DettagliAtletaModal from '../components/DettagliAtletaModal';
import DettagliSquadraModal from '../components/DettagliSquadraModal';
import './Classifica.css';

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#c2185b',
          color: 'white',
          fontWeight: 'bold',
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 'normal',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #c2185b',
        },
      },
    },
  },
});

const theme2 = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: 'white',
          color: 'black',
          fontWeight: '600',
          textTransform: 'uppercase',
          border: '1px solid #c2185b',
          '& .MuiSvgIcon-root': {
            color: 'black',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
          fontWeight: 'normal',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #c2185b',
        },
      },
    },
  },
});

const theme3 = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c2185b',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#c2185b',
            },
            '.MuiOutlinedInput-notchedOutline': {
                borderColor: '#c2185b',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: '#c2185b',
            },
          },
        },
      },
    },
  });

  const generateMockData = (count) => {
    const data = [];
    const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
    const femaleCategories = ['WA', 'WB', 'WC', 'WD'];
    const maleCategories = ['ELMT', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];
    const eventNames = [
        "Granfondo del Po",
        "Via del sale",
        "Granfondo Città di Valdagno",
        "Granfondo città di San Benedetto",
        "Granfondo Squali",
        "Marcialonga Craft",
        "Granfondo Città di Livorno",
        "Matildica"
    ];
  
    for (let i = 1; i <= count; i++) {
      const sex = Math.random() > 0.3 ? 'M' : 'F';
      const categories = sex === 'F' ? femaleCategories : maleCategories;
      const cat = categories[Math.floor(Math.random() * categories.length)];
  
      const eventi = [];
      let puntiTotali = 0;
      const eventiValidi = Math.floor(Math.random() * 5) + 4; 
      for (let j = 0; j < 8; j++) {
        if (j < eventiValidi) {
          const puntiEvento = Math.floor(Math.random() * 300) + 50;
          eventi.push({ nome: eventNames[j], punti: puntiEvento });
          puntiTotali += puntiEvento;
        } else {
          eventi.push({ nome: eventNames[j], punti: 0 });
        }
      }
  
      data.push({
        atleta: `Atleta ${i}`,
        team: teams[Math.floor(Math.random() * teams.length)],
        sex: sex,
        cat: cat,
        punti: puntiTotali,
        eventi: eventi,
      });
    }
    return data;
  };

const initialRecords = generateMockData(100);
const categorieOptions = [...new Set(initialRecords.map(item => item.cat))].sort();

const Classifica = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [classifica, setClassifica] = useState('Granfondo');
  const [tipo, setTipo] = useState('Generali');
  const [categoria, setCategoria] = useState('Assolute');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [teamRecords, setTeamRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const recordsPerPage = 20;

  useEffect(() => {
    let finalRecords;

    if (classifica === 'Squadre') {
        const teamPoints = {};
        initialRecords.forEach(record => {
            if (!teamPoints[record.team]) {
                teamPoints[record.team] = 0;
            }
            teamPoints[record.team] += record.punti;
        });

        const sortedTeams = Object.keys(teamPoints)
            .map(team => ({ team, punti: teamPoints[team] }))
            .sort((a, b) => b.punti - a.punti)
            .map((team, index) => ({ ...team, p: index + 1 }));
        
        finalRecords = sortedTeams;
        if (searchTerm) {
            finalRecords = finalRecords.filter(record => record.team.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setTeamRecords(finalRecords);
        setFilteredRecords([]);

    } else {
        let records = initialRecords.sort((a, b) => b.punti - a.punti);

        if (tipo === 'Generali') {
            if (categoria === 'Maschile') {
                records = records.filter(r => r.sex === 'M');
            } else if (categoria === 'Femminile') {
                records = records.filter(r => r.sex === 'F');
            }
        } else if (tipo === 'Categorie') {
            records = records.filter(r => r.cat === categoria);
        }

        if (searchTerm) {
            records = records.filter(record => record.atleta.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        const categoryRanks = {};
        records.forEach(record => {
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

        const allRecords = records.map((record, index) => ({
            ...record,
            pGen: index + 1,
            pSex: pSexMap.get(record.atleta),
            pCat: pCatMap.get(record.atleta)
        }));

        setFilteredRecords(allRecords);
        setTeamRecords([]);
    }

  }, [selectedYear, classifica, tipo, categoria, searchTerm]);

  const handleOpenModal = (atleta) => {
    setSelectedAthlete(atleta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAthlete(null);
  };

  const handleOpenTeamModal = (team) => {
    const atletiDelTeam = initialRecords.filter(atleta => atleta.team === team.team);
    const eventiPunti = {};
    const atletiPerEvento = {};

    atletiDelTeam.forEach(atleta => {
        atleta.eventi.forEach(evento => {
            if (!eventiPunti[evento.nome]) {
                eventiPunti[evento.nome] = 0;
                atletiPerEvento[evento.nome] = 0;
            }
            eventiPunti[evento.nome] += evento.punti;
            if (evento.punti > 0) {
                atletiPerEvento[evento.nome] += 1;
            }
        });
    });

    const puntiPerEventoPerTeam = {};
    initialRecords.forEach(atleta => {
        atleta.eventi.forEach(evento => {
            if (evento.punti > 0) {
                if (!puntiPerEventoPerTeam[evento.nome]) {
                    puntiPerEventoPerTeam[evento.nome] = {};
                }
                if (!puntiPerEventoPerTeam[evento.nome][atleta.team]) {
                    puntiPerEventoPerTeam[evento.nome][atleta.team] = 0;
                }
                puntiPerEventoPerTeam[evento.nome][atleta.team] += evento.punti;
            }
        });
    });

    const rankingPerEvento = {};
    for (const evento in puntiPerEventoPerTeam) {
        const sortedTeams = Object.keys(puntiPerEventoPerTeam[evento])
            .sort((a, b) => puntiPerEventoPerTeam[evento][b] - puntiPerEventoPerTeam[evento][a]);
        rankingPerEvento[evento] = sortedTeams;
    }

    const eventiArray = Object.keys(eventiPunti).map(nome => ({
        nome,
        punti: eventiPunti[nome],
        numeroAtleti: atletiPerEvento[nome],
        posizione: rankingPerEvento[nome] ? rankingPerEvento[nome].indexOf(team.team) + 1 : 'N/A'
    }));

    const squadraCompleta = {
        nome: team.team,
        punti: team.punti,
        posizione: team.p,
        numeroAtleti: atletiDelTeam.length,
        eventi: eventiArray,
    };

    setSelectedTeam(squadraCompleta);
    setIsTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
      setIsTeamModalOpen(false);
      setSelectedTeam(null);
  };

  const handleClassificaChange = (e) => {
    const newClassifica = e.target.value;
    setClassifica(newClassifica);
    if (newClassifica === 'Squadre') {
      setTipo('Generali'); 
      setCategoria('Assolute');
    }
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleTipoChange = (e) => {
    const newTipo = e.target.value;
    setTipo(newTipo);
    if (newTipo === 'Generali') {
      setCategoria('Assolute');
    } else if (newTipo === 'Categorie') {
      setCategoria(categorieOptions[0]);
    }
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
      setter(e.target.value);
      setCurrentPage(1);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  const sourceData = classifica === 'Squadre' ? teamRecords : filteredRecords;
  const currentRecords = sourceData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sourceData.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const years = [2025, 2024, 2023, 2022, 2021, 2020];
  const classifiche = ['Granfondo', 'Mediofondo', 'Squadre'];
  const tipi = ['Generali', 'Categorie'];
  const generaliOptions = ['Assolute', 'Maschile', 'Femminile'];

  const showPSexFirst = tipo === 'Generali' && (categoria === 'Maschile' || categoria === 'Femminile');
  const showCatFirst = tipo === 'Categorie';

  return (
    <div className="classifica-container">
      <div className="filters-container">
        <div className="year-selector-container">
          <label htmlFor="year-select" style={{fontWeight: 'bold', color: 'black'}}>Risultati del:</label>
          <ThemeProvider theme={theme}>
            <FormControl>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                onChange={handleFilterChange(setSelectedYear)}
              >
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ThemeProvider>
        </div>
        <div className="sub-filters-container">
            <div className="classifica-selector-container">
            <label htmlFor="classifica-select" style={{color: 'black'}}>Classifica:</label>
            <ThemeProvider theme={theme2}>
                <FormControl>
                <Select
                    labelId="classifica-select-label"
                    id="classifica-select"
                    value={classifica}
                    onChange={handleClassificaChange}
                >
                    {classifiche.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </ThemeProvider>
            </div>
            {classifica !== 'Squadre' && (
                <>
                    <div className="tipo-selector-container">
                        <label htmlFor="tipo-select" style={{color: 'black'}}>Tipo:</label>
                        <ThemeProvider theme={theme2}>
                            <FormControl>
                                <Select
                                    labelId="tipo-select-label"
                                    id="tipo-select"
                                    value={tipo}
                                    onChange={handleTipoChange}
                                >
                                    {tipi.map(t => (
                                        <MenuItem key={t} value={t}>{t}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </div>
                    <div className="categoria-selector-container">
                        <label htmlFor="categoria-select" style={{color: 'black'}}>Categoria:</label>
                        <ThemeProvider theme={theme2}>
                            <FormControl>
                                <Select
                                    labelId="categoria-select-label"
                                    id="categoria-select"
                                    value={categoria}
                                    onChange={handleFilterChange(setCategoria)}
                                >
                                    {tipo === 'Generali' 
                                        ? generaliOptions.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)
                                        : categorieOptions.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </div>
                </>
            )}
        </div>
        <div className='search-container'>
            <ThemeProvider theme={theme3}>
                <TextField 
                    label="Cerca" 
                    variant="outlined" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    style={{width: '50%'}}
                />
            </ThemeProvider>
        </div>
      </div>
      <table>
        {classifica === 'Squadre' ? (
            <thead>
                <tr>
                    <th>P</th>
                    <th>Team</th>
                    <th>Punti</th>
                    <th></th>
                </tr>
            </thead>
        ) : (
            <thead>
            <tr>
                {showCatFirst ? (
                    <>
                        <th>Cat</th>
                        <th>Atleta</th>
                        <th>Team</th>
                        <th>Sex</th>
                        <th>P. Sex</th>
                        <th>P. Gen</th>
                        <th>Punti</th>
                    </>
                ) : showPSexFirst ? (
                <>
                    <th>P. Sex</th>
                    <th>Atleta</th>
                    <th>Team</th>
                    <th>Sex</th>
                    <th>P. Gen</th>
                    <th>Cat</th>
                    <th>Punti</th>
                </>
                ) : (
                <>
                    <th>P. Gen</th>
                    <th>Atleta</th>
                    <th>Team</th>
                    <th>Sex</th>
                    <th>P. Sex</th>
                    <th>Cat</th>
                    <th>Punti</th>
                </>
                )}
                <th></th>
            </tr>
            </thead>
        )}
        {classifica === 'Squadre' ? (
            <tbody>
                {currentRecords.map((record) => (
                    <tr key={record.team}>
                        <td>{record.p}</td>
                        <td>{record.team}</td>
                        <td>{record.punti}</td>
                        <td><button className="details-button" onClick={() => handleOpenTeamModal(record)}>Dettagli</button></td>
                    </tr>
                ))}
            </tbody>
        ) : (
            <tbody>
            {currentRecords.map((record) => (
                <tr key={record.atleta}>
                    {showCatFirst ? (
                        <>
                            <td style={{ fontSize: 'small', textAlign: 'center' }}>{record.cat}<br/>{record.pCat}</td>
                            <td>{record.atleta}</td>
                            <td>{record.team}</td>
                            <td>{record.sex}</td>
                            <td>{record.pSex}</td>
                            <td>{record.pGen}</td>
                            <td>{record.punti}</td>
                        </>
                    ) : showPSexFirst ? (
                    <>
                        <td>{record.pSex}</td>
                        <td>{record.atleta}</td>
                        <td>{record.team}</td>
                        <td>{record.sex}</td>
                        <td>{record.pGen}</td>
                        <td style={{ fontSize: 'small', textAlign: 'center' }}>{record.cat}<br/>{record.pCat}</td>
                        <td>{record.punti}</td>
                    </>
                    ) : (
                    <>
                        <td>{record.pGen}</td>
                        <td>{record.atleta}</td>
                        <td>{record.team}</td>
                        <td>{record.sex}</td>
                        <td>{record.pSex}</td>
                        <td style={{ fontSize: 'small', textAlign: 'center' }}>{record.cat}<br/>{record.pCat}</td>
                        <td>{record.punti}</td>
                    </>
                    )}
                    <td><button className="details-button" onClick={() => handleOpenModal(record)}>Dettagli</button></td>
                </tr>
            ))}
            </tbody>
        )}
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
      {isModalOpen && selectedAthlete && (
        <DettagliAtletaModal atleta={selectedAthlete} onClose={handleCloseModal} />
      )}
      {isTeamModalOpen && selectedTeam && (
        <DettagliSquadraModal squadra={selectedTeam} onClose={handleCloseTeamModal} />
      )}
    </div>
  );
};

export default Classifica;
