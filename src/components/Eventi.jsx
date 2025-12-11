const events = [
  { id: 1, name: "Granfondo del Po", city: "Ferrara", date: "15/03/2026" },
  { id: 2, name: "Via del sale", city: "Cervia", date: "29/03/2026" },
  { id: 3, name: "Granfondo città di Valdagno", city: "Valdagno", date: "26/04/2026" },
  { id: 4, name: "Granfondo città di San Benedetto", city: "San Benedetto del Tronto", date: "10/05/2026" },
  { id: 5, name: "Granfondo Squali", city: "Cattolica", date: "17/05/2026" },
  { id: 6, name: "Marcialonga Craft", city: "Predazzo", date: "31/05/2026" },
  { id: 7, name: "Granfondo città di Livorno", city: "Livorno", date: "06/09/2026" },
  { id: 8, name: "Matildica", city: "Reggio Emilia", date: "13/09/2026" },
];

const Eventi = () => {
  return (
    <section className="events">
      <h2>Le gare</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.city}</p>
            <span>{event.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Eventi;
