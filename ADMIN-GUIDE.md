# Admin Guide — Editing Your Site (No Code Required)

Everything in this guide happens at **yourdomain.com/studio**. Log in with the account you used to
create the Sanity project. Changes go live automatically — there's nothing to "publish" beyond
clicking the **Publish** button on each document.

## First-time setup: Site Settings

Open **Site Settings** in the left sidebar (there's only one — it controls global content).

- **Hero tab** — your homepage headline, subheadline, portrait photo, and availability status
  (e.g. "Booking September" or "Not currently available" — shows on the homepage automatically)
- **About tab** — your bio, mission statement, values, career timeline, skills (with a 0–100
  proficiency slider), workflow steps, and your résumé PDF upload
- **Stats & Trust tab** — animated homepage stats (e.g. "120+ Projects delivered"), client logos, awards
- **Contact tab** — email, phone/WhatsApp, location, and your social links
- **SEO tab** — the default page title and description search engines show

Click **Publish** (top right) after editing. Changes appear on the live site within about a minute.

## Adding a new portfolio project

1. Go to **Portfolio Projects → + Create new**
2. Fill in the **Overview** tab first:
   - **Plate number** — controls the order on the Index page (1, 2, 3...)
   - **Title**, **Client**, **Industry**, **Year**
   - **Cover image** — this is the big image at the top of the case study. Use a landscape photo
     at least 2000px wide for a sharp look on large screens. Always fill in **Alt text** — this is
     what screen readers announce and what helps the image rank in Google Image search.
   - **Featured on homepage** — toggle on for the handful of projects you want on the homepage
3. Move to the **Case Study** tab:
   - **Objectives** — short bullet list of goals
   - **The problem / Creative process / The solution** — write these like you're narrating the
     project to a client. This is the part that convinces people to hire you — lean on the thinking,
     not just "here's a picture."
   - **Tools used**, **Brand strategy notes**
4. **Gallery & Brand** tab:
   - **Typography** and **Color palette** (paste hex codes like `#2C4A7E`) — these render as labeled
     swatches on the case study page
   - **Gallery images** — add as many as you like; they display in a grid that opens into a full
     lightbox viewer when clicked
   - **Before / after** — optional, only fill in if relevant to this project
5. **Results & Links** tab:
   - **Results** — write these as measurable outcomes where possible: "34% lift in engagement in the
     first month," not just "Client was happy." Specific numbers are what get you hired.
   - **Client testimonial** — link an existing testimonial (add it under Testimonials first if needed)
   - **Links** — Live URL, Behance, Dribbble, GitHub

6. Click **Publish**. It'll appear on `/portfolio` immediately, ordered by plate number.

## Adding a testimonial

**Testimonials → + Create.** Name, role/company, photo, star rating, and the quote. You can link it
to a specific project so it also appears at the bottom of that case study.

## Adding or editing a service

**Services → + Create.** Title, description, a bulleted list of benefits, and an optional starting
price. **Display order** controls where it sits in the list (lower number = earlier).

## Replacing your résumé

Site Settings → About tab → **Resume file** → upload a new PDF. It replaces the file behind the
"Download résumé" button on the About page — no other changes needed.

## Writing a blog post

**Blog Posts → + Create.** Title, a short excerpt (shown on the blog index), a cover image, and the
body content using the rich text editor (headings, bold, links, embedded images all supported).

## Image tips

- Sanity automatically resizes and compresses every image for the web — you can upload the original,
  high-resolution file and it will be served optimized.
- Always crop/hotspot using the built-in image editor (click the image after uploading) so it looks
  right on both mobile and desktop.
- Recommended minimum sizes: cover images 2000×1125px, gallery images 1200×1200px, portrait 1000×1250px.

## Common questions

**I published a change but don't see it yet.** Content refreshes roughly every 60 seconds on the live
site. If it's been longer, do a hard refresh (Ctrl/Cmd+Shift+R).

**Can someone else edit content too?** Yes — invite them from sanity.io/manage under your project's
"Members" tab. You control what role they get (Editor can't change the schema; Administrator can).

**I deleted something by mistake.** Sanity keeps document history. Open the document, click the clock
icon in the top right, and restore an earlier version.
