import internships from "../data/internships";

export default function InternshipSection({ sort, search }) {
  const filtered = internships
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>Internships</h2>

      {filtered.map(item => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.title}</h3>
          <p>{item.company} — {item.location}</p>
          <span style={internTag}>Internship</span>
        </div>
      ))}
    </section>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "12px",
  background: "#fff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
};

const internTag = {
  marginTop: "8px",
  display: "inline-block",
  padding: "4px 10px",
  fontSize: "12px",
  background: "#eef2ff",
  borderRadius: "6px",
  color: "#4f46e5"
};
