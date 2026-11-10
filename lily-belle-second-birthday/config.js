// Where RSVPs go. Fill these in from the Google Form (see SETUP.md); leave empty and the
// invite falls back to sending RSVPs to the host by text.
// These values are public by design: a Google Form can only accept new replies, not reveal them.
window.LB_CONFIG = {
  repo: "gerdums/hannahandgareth.com",
  eventPath: "lily-belle-second-birthday/event.md",
  // Opens only for people signed in to the owner's Google account.
  sheetUrl: "https://docs.google.com/spreadsheets/d/1SKGAPgwYHuasmB7yuB6_Qy00qKYRYabOLxgSzyNyOCI/edit",
  googleForm: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSdU08ljBCcoO_NZQUSl35P9N1RJiD69TetlgMeH5p-Z9Xp0iA/formResponse",
    fields: {
      name: "entry.842517855",
      attending: "entry.129013888",
      adults: "entry.558752607",
      kids: "entry.1487175956",
      kidNames: "entry.1566208070",
      notes: "entry.243621896",
      message: "entry.1230993970",
      phone: "entry.182768497",
      replyId: "entry.1145402648"
    }
  }
};
