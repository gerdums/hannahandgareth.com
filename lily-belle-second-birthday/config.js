// Where RSVPs go. Fill these in from the Google Form (see SETUP.md); leave empty and the
// invite falls back to sending RSVPs to the host by text.
// These values are public by design: a Google Form can only accept new replies, not reveal them.
window.LB_CONFIG = {
  repo: "gerdums/hannahandgareth.com",
  eventPath: "lily-belle-second-birthday/event.md",
  googleForm: {
    action: "",           // https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
    fields: {
      name: "",           // entry.123456789
      attending: "",
      adults: "",
      kids: "",
      kidNames: "",
      notes: "",
      message: "",
      phone: "",
      replyId: ""
    }
  }
};
