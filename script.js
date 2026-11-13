// ---- Fundraising progress: update these two numbers as donations come in ----
const GOAL = 1000;
const RAISED = 0;

document.addEventListener("DOMContentLoaded", () => {
  hangPresent();
  showProgress();
  loadWishLists();
});

// A little wrapped present hanging from a string on the right side of every page.
function hangPresent() {
  const present = document.createElement("div");
  present.className = "hanging-present";
  present.setAttribute("aria-hidden", "true");
  present.innerHTML = `
    <div class="string"></div>
    <svg viewBox="-6 0 132 132" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="0" x2="60" y2="26" stroke="#4a423c" stroke-width="2" />
      <!-- box -->
      <rect x="14" y="52" width="92" height="76" rx="3" fill="#a3222b" />
      <rect x="14" y="52" width="92" height="10" fill="#841b22" opacity="0.6" />
      <!-- lid -->
      <rect x="8" y="36" width="104" height="20" rx="3" fill="#b8323b" />
      <!-- ribbon -->
      <rect x="52" y="36" width="16" height="92" fill="#d9a441" />
      <rect x="52" y="36" width="16" height="20" fill="#e6b65a" />
      <!-- bow -->
      <path d="M60 33 C 44 8, 16 14, 28 30 C 34 38, 50 37, 60 33 Z" fill="#d9a441" />
      <path d="M60 33 C 76 8, 104 14, 92 30 C 86 38, 70 37, 60 33 Z" fill="#d9a441" />
      <path d="M58 34 L 46 52 L 52 52 L 60 38 Z" fill="#c18f33" />
      <path d="M62 34 L 74 52 L 68 52 L 60 38 Z" fill="#c18f33" />
      <circle cx="60" cy="32" r="7" fill="#c18f33" />
      <!-- tag -->
      <g transform="rotate(14 96 98)">
        <line x1="92" y1="62" x2="96" y2="86" stroke="#4a423c" stroke-width="1" />
        <rect x="80" y="86" width="36" height="18" rx="2" fill="#fbf7f0" stroke="#e2d8c8" />
        <circle cx="84.5" cy="95" r="1.6" fill="#e2d8c8" />
        <text x="100" y="98.5" font-size="7" font-family="Georgia, serif" font-style="italic" fill="#a3222b" text-anchor="middle">thank you</text>
      </g>
    </svg>`;
  document.body.appendChild(present);
}

function showProgress() {
  const box = document.querySelector("[data-progress]");
  if (!box) return;

  const money = (n) => "$" + n.toLocaleString("en-US");
  box.querySelector("[data-raised]").textContent = money(RAISED);
  box.querySelector("[data-goal]").textContent = money(GOAL);

  const percent = Math.min(RAISED / GOAL, 1) * 100;
  // Let the bar animate in from zero.
  requestAnimationFrame(() => {
    box.querySelector("[data-fill]").style.width = `${percent}%`;
  });
}

// Wish lists come from children.txt, one per line:
//   emoji | title | about | amazon link | available or purchased
// Blank lines and lines starting with # are ignored.
function loadWishLists() {
  const grid = document.getElementById("wish-lists");
  const empty = document.getElementById("wish-empty");
  if (!grid) return;

  fetch("children.txt", { cache: "no-cache" })
    .then((response) => (response.ok ? response.text() : ""))
    .catch(() => "")
    .then((text) => {
      const lists = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("|"))
        .map((line) => {
          const [emoji = "", title = "", about = "", link = "", status = ""] = line
            .split("|")
            .map((part) => part.trim());
          return { emoji, title, about, link, open: status.toLowerCase() === "available" };
        });

      if (lists.length === 0) {
        empty.hidden = false;
        return;
      }

      // Open lists first, keeping the file's order within each group.
      lists.sort((a, b) => Number(b.open) - Number(a.open));
      lists.forEach((list) => grid.appendChild(renderList(list)));
    });
}

function renderList({ emoji, title, about, link, open }) {
  const item = document.createElement("article");
  item.className = open ? "wish" : "wish is-done";

  const badge = document.createElement("div");
  badge.className = "wish-emoji";
  badge.setAttribute("aria-hidden", "true");
  badge.textContent = emoji || "🎁";

  const body = document.createElement("div");
  body.className = "wish-body";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const blurb = document.createElement("p");
  blurb.textContent = about;

  const foot = document.createElement("div");
  foot.className = "wish-foot";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = open ? "Needs a Santa" : "Sponsored, thank you!";

  const anchor = document.createElement("a");
  anchor.href = link;
  anchor.target = "_blank";
  anchor.rel = "noopener";
  anchor.textContent = "View wish list →";

  foot.append(tag, anchor);
  body.append(heading, blurb, foot);
  item.append(badge, body);
  return item;
}
