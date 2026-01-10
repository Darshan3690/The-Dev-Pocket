"use client";
import { useState } from "react";

import JobSection from "./components/JobSection";
import InternshipSection from "./components/InternshipSection";
import ContestSection from "./components/ContestSection";

export default function CareerPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("az");
  const [search, setSearch] = useState("");

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px" }}>Career Updates</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Explore jobs, internships, contests and opportunities.
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
        />

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="jobs">Jobs</option>
          <option value="internships">Internships</option>
          <option value="contests">Contests</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
        </select>
      </div>

      {(filter === "all" || filter === "jobs") && (
        <JobSection sort={sort} search={search} />
      )}
      {(filter === "all" || filter === "internships") && (
        <InternshipSection sort={sort} search={search} />
      )}
      {(filter === "all" || filter === "contests") && (
        <ContestSection sort={sort} search={search} />
      )}
    </div>
  );
}
