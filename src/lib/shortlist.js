// Server-side loader for the Syrus shortlists. It runs while the site is built (and
// on each refresh in `npm run dev`), so nothing here ships to the browser.
//
// HOW TO ADD A SHORTLIST
//   Drop the team CSV into src/assets/data/shortlisted_teams_day1/ (or _day2/) using
//   the id of the problem statement as the file name, e.g. `fintech-ps-2.csv`, then rebuild.
//   The first row is the header ("Team Name", "Team Leader Name"). Problem
//   statements without a file show a "will be announced soon" message.
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "src", "assets", "data");

export const PROBLEM_STATEMENTS = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    id: `fintech-ps-${n}`,
    domain: "Fintech",
    short: `PS-${n}`,
    title: `Fintech PS-${n}`,
  })),
  ...[1, 2, 3, 4, 5].map((n) => ({
    id: `sustainability-ps-${n}`,
    domain: "Sustainability",
    short: `PS-${n}`,
    title: `Sustainability PS-${n}`,
  })),
];

/** Minimal CSV parser: quoted fields, escaped quotes, CRLF, BOM. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i += 1;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.map((r) => r.map((c) => c.trim())).filter((r) => r.some((c) => c !== ""));
}

/** "SAHIL DULANI" -> "Sahil Dulani" (only when the whole name was typed in capitals). */
function tidyPersonName(name) {
  const letters = name.replace(/[^A-Za-z]/g, "");
  if (letters.length > 1 && letters === letters.toUpperCase()) {
    return name.toLowerCase().replace(/(^|[\s.'-])([a-z])/g, (_, a, b) => a + b.toUpperCase());
  }
  return name;
}

function readTeams(file) {
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.toLowerCase());
  let teamCol = header.findIndex((h) => h.includes("team") && !h.includes("lead"));
  let leaderCol = header.findIndex((h) => h.includes("lead"));
  const hasHeader = teamCol !== -1 || leaderCol !== -1;
  if (teamCol === -1) teamCol = 0;
  if (leaderCol === -1) leaderCol = 1;
  return (hasHeader ? rows.slice(1) : rows)
    .map((r) => ({
      team: (r[teamCol] || "").trim(),
      leader: tidyPersonName((r[leaderCol] || "").trim()),
    }))
    .filter((t) => t.team);
}

/** Every problem statement with its shortlisted teams for one day (`teams: null` = not published yet). */
function loadDay(day) {
  const dir = path.join(DATA_DIR, `shortlisted_teams_day${day}`);
  return PROBLEM_STATEMENTS.map((ps) => {
    const file = path.join(dir, `${ps.id}.csv`);
    let teams = null;
    if (fs.existsSync(file)) {
      try {
        teams = readTeams(file);
      } catch {
        teams = null;
      }
    }
    return { ...ps, teams };
  });
}

export function loadShortlists() {
  return { 1: loadDay(1), 2: loadDay(2) };
}
