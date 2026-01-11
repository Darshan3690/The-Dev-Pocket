import contests from "../data/contests";

export default function ContestSection({ sort, search }) {
  const filtered = contests
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>Contests</h2>

      {filtered.map(item => (
        <div key={item.id} style={cardStyle}>
          <h3>{item.name}</h3>
          <p>{item.platform} — Online</p>
          <span style={contestTag}>Contest</span>
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

const contestTag = {
  marginTop: "8px",
  display: "inline-block",
  padding: "4px 10px",
  fontSize: "12px",
  background: "#fef3c7",
  borderRadius: "6px",
  color: "#b45309"
};
