# Lily Belle invite: setup

The invite is static (GitHub Pages). Party details live in `event.md`; RSVPs go to a Google Form that
fills a Google Sheet. The hidden admin page is `castle-keep/` (or tap the crown 5 times on the invite).

## 1. RSVPs (done)

RSVPs post to the Google Form "Lily Belle's 2nd Birthday RSVPs", which fills the
Google Sheet "Lily Belle RSVPs". Form and entry IDs are in `config.js`. Share the Sheet with Hannah to let her
see replies. The Sheet is not published to the web, so replies are only visible to people it's shared with.

The form was created by the Apps Script project in the same account; question titles must stay
`Name, Attending, Adults, Kids, Kid names, Notes, Message, Phone, Reply ID`.

## 2. GitHub key for editing party details

github.com/settings/personal-access-tokens/new → fine-grained token →
Repository access: **Only select repositories** → `hannahandgareth.com` →
Permissions: **Contents: Read and write** → generate, copy, paste into Castle Keep.

## Editing by hand

Edit `event.md` on GitHub (pencil icon). Keep the `name: value` lines; the invite updates about a minute
after you commit.
