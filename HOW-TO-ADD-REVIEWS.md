# How Jwan Adds a New Book Review

Simple steps. Do them in order.

---

## Step 1: Copy the template

1. Open the folder: `content/reviews/`
2. Find the file: `_TEMPLATE.md`
3. Copy it (Ctrl+C or right-click → Copy)
4. Paste in the same folder (Ctrl+V or right-click → Paste)
5. Rename the new file. Use the book title in lowercase with hyphens.
   - Example: `holes-by-louis-sachar.md`
   - Example: `matilda.md`

---

## Step 2: Fill in your review

Open the new file and replace the placeholder text:

| Field | What to put |
|-------|-------------|
| **title** | The book's title |
| **author** | The author's name |
| **rating** | 1 to 5 stars |
| **date** | Today's date: YYYY-MM-DD |
| **cover** | `/covers/your-image.jpg` (or leave as is if no image yet) |
| **tags** | Words like `["adventure", "magic", "friendship"]` |

Then write your review under the headings:

- **What this book is about** – short summary
- **My favorite part** – what you loved
- **Who should read it** – who would enjoy it

---

## Step 3: Add a cover image (optional)

1. Find a picture of the book cover (or take a photo)
2. Put it in the folder: `public/covers/`
3. Name it something simple, e.g. `holes.jpg` or `matilda.png`
4. In your review file, set: `cover: "/covers/holes.jpg"`

If you skip this, the site will show a book emoji instead.

---

## Step 4: Publish

1. Save the file
2. Commit and push to GitHub (or ask a parent to do this)
3. Wait a few minutes – the site will update automatically

Your new review will appear at:  
`https://drmahmoodhachim-gif.github.io/jwan-books/reviews/your-slug`

---

## Quick checklist

- [ ] Copied `_TEMPLATE.md` and renamed it
- [ ] Filled in title, author, rating, date
- [ ] Wrote the three sections
- [ ] (Optional) Added cover image to `public/covers/`
- [ ] Saved, committed, and pushed
