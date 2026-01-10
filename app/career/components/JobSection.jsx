import jobs from "../data/jobs";

export default function JobSection({ sort, search }) {
  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>Jobs</h2>

      {filteredJobs.map(job => (
        <div key={job.id} style={cardStyle}>
          <h3>{job.title}</h3>
          <p>{job.company} — {job.location}</p>
          <span style={jobTag}>Job</span>
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

const jobTag = {
  marginTop: "8px",
  display: "inline-block",
  padding: "4px 10px",
  fontSize: "12px",
  background: "#ecfeff",
  borderRadius: "6px",
  color: "#0891b2"
};
