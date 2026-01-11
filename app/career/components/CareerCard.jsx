export default function CareerCard({ title, company, location, tag }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "12px",
      background: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    }}>
      <h3>{title}</h3>
      <p>{company} — {location}</p>
      <span style={{
        display: "inline-block",
        marginTop: "6px",
        padding: "4px 10px",
        background: "#eef2ff",
        borderRadius: "20px",
        fontSize: "12px"
      }}>
        {tag}
      </span>
    </div>
  );
}
