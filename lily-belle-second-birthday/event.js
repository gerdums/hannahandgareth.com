// Shared party details + helpers for the invite and the castle-keep admin page.
// Party details live in event.md (front matter); RSVPs post to a Google Form (config.js).
(function () {
  const DEFAULTS = {
    childName: "Lily Belle",
    partyTitle: "Royal Winter Court",
    ageLine: "as she turns two!",
    date: "2027-01-09",
    startTime: "10:00",
    endTime: "12:30",
    venueName: "FunZy Indoor Playground",
    venueAddress: "20655 Soledad Canyon Rd #24",
    venueCity: "Santa Clarita, CA",
    venueUrl: "https://funzyplayground.com/",
    waiverUrl: "https://funzyplayground.com/pages/liability-waiver",
    dressCode: "Little royals are welcome to dress up: princesses, dragons, fairies & knights!",
    rsvpBy: "2026-12-01",
    hostName: "Hannah",
    hostPhone: "(661) 718-6474",
    signature: "Hannah, Gareth & Lily Belle",
    announcement: "",
    rsvpOpen: true
  };

  const FIELDS = [
    ["childName", "Birthday child's name", "text"],
    ["partyTitle", "Party name", "text"],
    ["ageLine", "Line under the party name", "text"],
    ["date", "Party date", "date"],
    ["startTime", "Starts", "time"],
    ["endTime", "Ends", "time"],
    ["venueName", "Venue", "text"],
    ["venueAddress", "Street address", "text"],
    ["venueCity", "City, state", "text"],
    ["venueUrl", "Venue website", "url"],
    ["waiverUrl", "Liability waiver link (leave empty to hide)", "url"],
    ["dressCode", "Dress-up note", "textarea"],
    ["rsvpBy", "RSVP by", "date"],
    ["hostName", "RSVP contact name", "text"],
    ["hostPhone", "RSVP contact phone", "tel"],
    ["signature", "Signed by", "text"],
    ["announcement", "Announcement banner (optional)", "textarea"],
    ["rsvpOpen", "Accept RSVPs on the site", "checkbox"]
  ];

  // ---- event.md front matter -------------------------------------------------
  function parseFrontMatter(text) {
    const m = /^---\s*\n([\s\S]*?)\n---\s*(\n|$)/.exec(text || "");
    const out = {};
    if (!m) return { data: out, body: text || "" };
    m[1].split("\n").forEach(line => {
      const i = line.indexOf(":");
      if (i < 1) return;
      const k = line.slice(0, i).trim();
      let v = line.slice(i + 1).trim();
      if (/^".*"$/.test(v)) { try { v = JSON.parse(v); } catch (e) {} }
      if (v === "true") v = true; else if (v === "false") v = false;
      out[k] = v;
    });
    return { data: out, body: text.slice(m[0].length) };
  }
  function serializeFrontMatter(data, body) {
    const lines = FIELDS.map(([k]) => {
      let v = data[k];
      if (typeof v === "boolean") return k + ": " + v;
      v = String(v == null ? "" : v).replace(/\r?\n+/g, " ").trim();
      return k + ": " + v;
    });
    return "---\n" + lines.join("\n") + "\n---\n" + (body || "");
  }

  async function loadEvent() {
    const base = Object.assign({}, DEFAULTS);
    try {
      const here = document.querySelector('script[src$="event.js"]');
      const url = new URL("event.md", here ? here.src : location.href);
      url.searchParams.set("v", Math.floor(Date.now() / 60000));
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return base;
      const { data } = parseFrontMatter(await res.text());
      Object.keys(DEFAULTS).forEach(k => {
        if (data[k] === undefined) return;
        if (data[k] === "" && k !== "announcement") return; // keep a sensible default for blanked required fields
        base[k] = data[k];
      });
      base.rsvpOpen = data.rsvpOpen === undefined ? true : data.rsvpOpen !== false;
      return base;
    } catch (e) { return base; }
  }

  // ---- formatting ------------------------------------------------------------
  function tz(dateStr) { const m = Number(String(dateStr).slice(5, 7)); return (m >= 11 || m <= 3) ? "-08:00" : "-07:00"; }
  function at(dateStr, time) { return new Date(dateStr + "T" + (time || "00:00") + ":00" + tz(dateStr)); }
  function day(dateStr) { return new Date(dateStr + "T12:00:00Z"); }
  const fmt = {
    longDate: d => day(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
    weekday: d => day(d).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
    monthDay: d => day(d).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" }),
    month: d => day(d).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" }),
    dayNum: d => String(day(d).getUTCDate()),
    year: d => String(day(d).getUTCFullYear()),
    time: t => { const [h, m] = String(t).split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; return (((h + 11) % 12) + 1) + ":" + String(m || 0).padStart(2, "0") + " " + ap; }
  };
  function telHref(phone) { const d = String(phone || "").replace(/\D/g, ""); return d.length === 10 ? "+1" + d : (d ? "+" + d : ""); }

  function calendarUrl(e) {
    const ymd = e.date.replace(/-/g, "");
    const u = new URL("https://calendar.google.com/calendar/render");
    u.searchParams.set("action", "TEMPLATE");
    u.searchParams.set("text", e.childName + "'s Birthday – " + e.partyTitle);
    u.searchParams.set("dates", ymd + "T" + e.startTime.replace(":", "") + "00/" + ymd + "T" + e.endTime.replace(":", "") + "00");
    u.searchParams.set("ctz", "America/Los_Angeles");
    u.searchParams.set("location", e.venueName + ", " + e.venueAddress + ", " + e.venueCity);
    u.searchParams.set("details", e.dressCode + "\n\nhttps://hannahandgareth.com/lily-belle-second-birthday/");
    return u.toString();
  }
  function mapsUrl(e) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venueName + " " + e.venueAddress + " " + e.venueCity); }

  // ---- Google Form RSVPs -----------------------------------------------------
  function formReady() {
    const g = (window.LB_CONFIG || {}).googleForm || {};
    return !!(g.action && g.fields && g.fields.name && g.fields.attending);
  }
  async function submitRsvp(r) {
    const g = window.LB_CONFIG.googleForm;
    const body = new URLSearchParams();
    const map = { name: r.name, attending: r.attending === "yes" ? "Yes" : "No", adults: r.adults, kids: r.kids, kidNames: r.kidNames, notes: r.notes, message: r.message, phone: r.phone, replyId: r.replyId };
    Object.keys(map).forEach(k => { if (g.fields[k]) body.append(g.fields[k], String(map[k] == null ? "" : map[k])); });
    // Google Forms doesn't send CORS headers; an opaque response means the request went through.
    await fetch(g.action, { method: "POST", mode: "no-cors", body });
    return true;
  }

  // ---- CSV (published Google Sheet) -----------------------------------------
  function parseCSV(text) {
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (c !== "\r") cell += c;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }

  window.LB = { DEFAULTS, FIELDS, parseFrontMatter, serializeFrontMatter, loadEvent, at, fmt, telHref, calendarUrl, mapsUrl, formReady, submitRsvp, parseCSV };
})();
