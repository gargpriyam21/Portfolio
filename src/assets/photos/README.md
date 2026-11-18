# Photos

Drop photos here and they appear on the site automatically; no code changes.
The file name (without its extension) must match a `photo` value in `src/data/profile.js`.
Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`. Keep each file under about 400 KB
(around 1600 px on the long side is plenty).

| File name                | Where it shows                                      | Shape                           |
| ------------------------ | --------------------------------------------------- | ------------------------------- |
| `portrait`               | Hero, in the agent-run card (your photo)            | square, face filling most of it |
| `about-portrait`         | About, the large portrait beside the text           | tall (4:5)                      |
| `work-aws`               | Career panel (laptops), Amazon Web Services         | 4:3                             |
| `work-deloitte`          | Career panel (laptops), Deloitte                    | 4:3                             |
| `work-ncsu`              | Career panel (laptops), NC State research assistant | 4:3                             |
| `work-zscaler`           | Career panel (laptops), Zscaler                     | 4:3                             |
| `work-zs`                | Career panel (laptops), ZS                          | 4:3                             |
| `edu-ncsu`               | Education, the large master's card                  | wide (16:9)                     |
| `edu-ggsipu`             | Education, the B.Tech card                          | wide (16:9)                     |
| `edu-ris`                | Education, the schooling card                       | wide (16:9)                     |
| `project-dog-collar`     | Projects, IoT Smart Dog Collar                      | wide (16:9)                     |
| `project-file-transfer`  | Projects, Client-Server File Transfer               | wide (16:9)                     |
| `project-chicken-swarm`  | Projects, Chicken Swarm Optimisation                | wide (16:9)                     |
| `project-door-detection` | Projects, Door Movement Detection                   | wide (16:9)                     |
| `project-mypack-lite`    | Projects, MyPack-Lite                               | wide (16:9)                     |
| `project-brain-tumour`   | Projects, Brain Tumour Segmentation                 | wide (16:9)                     |
| `project-art-gallery`    | Projects, Art Gallery                               | wide (16:9)                     |

To move what a photo shows inside its frame, set `photoPosition` next to its `photo`
value in `src/data/profile.js` (for example `'center 20%'` keeps the top in view).

The six projects already have drawn covers (`src/components/ProjectCover.jsx`). A photo
with a `project-*` name is optional and, if added, replaces that project's drawn cover.

While a photo is missing:
- in `npm run dev`, a dashed box shows the expected file name, so you can see where it goes;
- on the published site, the slot is hidden (the hero shows your initials instead).
