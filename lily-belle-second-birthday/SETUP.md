# Lily Belle invite: setup

The invite is static (GitHub Pages). Party details live in `event.md`; RSVPs go to a Google Form that
fills a Google Sheet. The hidden admin page is `castle-keep/` (or tap the crown 5 times on the invite).

## 1. Google Form for RSVPs (one time)

1. At forms.google.com, make a blank form called "Lily Belle RSVPs".
2. Add nine **Short answer** questions with exactly these titles (none required):
   `Name`, `Attending`, `Adults`, `Kids`, `Kid names`, `Notes`, `Message`, `Phone`, `Reply ID`
3. Settings → Responses: turn **off** "Collect email addresses" and "Limit to 1 response"
   (guests must not need a Google sign-in).
4. Responses tab → **Link to Sheets** → create a new spreadsheet.
5. ⋮ menu → **Get pre-filled link**. Type each question's own title into its box (e.g. `Name` in Name,
   `Adults` in Adults…), click **Get link**, copy it, and paste it into `config.js` (or send it to Claude).
   The `entry.…` numbers in that link are the field IDs; the form ID goes into
   `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse`.

## 2. Replies link for Castle Keep

In the Sheet: File → Share → **Publish to web** → pick the "Form Responses 1" tab and
**Comma-separated values (.csv)** → Publish → copy the link.
Anyone with this link can read replies, so only paste it into Castle Keep; never put it in the repo.

## 3. GitHub key for editing party details

github.com/settings/personal-access-tokens/new → fine-grained token →
Repository access: **Only select repositories** → `hannahandgareth.com` →
Permissions: **Contents: Read and write** → generate, copy, paste into Castle Keep.

## Editing by hand

Edit `event.md` on GitHub (pencil icon). Keep the `name: value` lines; the invite updates about a minute
after you commit.
