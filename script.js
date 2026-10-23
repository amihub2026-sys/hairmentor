"use strict";
const $ = (s, root = document) => root.querySelector(s),
  $$ = (s, root = document) => [...root.querySelectorAll(s)];
const slides = $$(".slide");
let slideIndex = 0,
  slideTimer,
  progressStart;
const interval = 5500;
const progress = $("#heroProgress");
function showSlide(index) {
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));
  $("#slideCount").textContent =
    `${String(slideIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  progress.style.transition = "none";
  progress.style.width = "0%";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      progress.style.transition = `width ${interval}ms linear`;
      progress.style.width = "100%";
    }),
  );
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(slideIndex + 1), interval);
}
$("#slidePrev").addEventListener("click", () => showSlide(slideIndex - 1));
$("#slideNext").addEventListener("click", () => showSlide(slideIndex + 1));
showSlide(0);
const header = $("#header"),
  menu = $("#mobileMenu"),
  toggle = $("#menuToggle");
function closeMenu() {
  menu.classList.remove("open");
  menu.inert = true;
  toggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
function openMenu() {
  menu.inert = false;
  menu.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
toggle.addEventListener("click", () =>
  menu.classList.contains("open") ? closeMenu() : openMenu(),
);
$$(".mobile-menu a").forEach((a) => a.addEventListener("click", closeMenu));
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", scrollY > 60),
  { passive: true },
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
const services = [
  {
    tag: "CUT / STYLE / FINISH",
    description:
      "Personalised cuts, shape and movement designed around the way you live.",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1400&q=85",
    alt: "Stylist cutting hair",
  },
  {
    tag: "COLOUR / GLOSS / EXPRESSION",
    description:
      "Beautiful, dimensional colour, tailored to your tone and your personality.",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=85",
    alt: "Woman with beautiful styled hair",
  },
  {
    tag: "RESTORE / NOURISH / RENEW",
    description:
      "Hair spa and care rituals that help your hair feel as good as it looks.",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=85",
    alt: "Salon hair care treatment",
  },
  {
    tag: "PRECISION / GROOMING / CONFIDENCE",
    description:
      "Contemporary cuts and grooming details with a refined, tailored finish.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=85",
    alt: "Barber grooming a client",
  },
  {
    tag: "EVENT / BRIDAL / OCCASION",
    description:
      "From elegant updos to statement looks, be unforgettable when it matters.",
    image:
      "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=1400&q=85",
    alt: "Special occasion hairstyling",
  },
];
const serviceImage = $("#serviceImage"),
  servicePanel = $("#servicePanel");
let serviceSwitchTimeout;
function selectService(i) {
  const data = services[i];
  if (!data) return;
  $$(".service-item").forEach((b, j) => {
    b.classList.toggle("active", i === j);
    b.setAttribute("aria-selected", String(i === j));
  });
  servicePanel.classList.add("switching");
  clearTimeout(serviceSwitchTimeout);
  serviceSwitchTimeout = setTimeout(() => {
    serviceImage.src = data.image;
    serviceImage.alt = data.alt;
    $("#serviceTag").textContent = data.tag;
    $("#serviceDesc").textContent = data.description;
    servicePanel.classList.remove("switching");
  }, 230);
}
$$(".service-item").forEach((b) =>
  b.addEventListener("click", () => selectService(Number(b.dataset.service))),
);
$$("[data-select]").forEach((a) =>
  a.addEventListener("click", () =>
    selectService(a.dataset.select === "men" ? 3 : 0),
  ),
);
// These are illustrative remote stock photos, not images of the real salon or verified customers.
const frames = [
  { u: "photo-1534528741775-53994a69daeb", t: "THE SOFT EDIT" },
  { u: "photo-1500648767791-00dcc994a43e", t: "THE CLASSIC EDIT" },
  { u: "photo-1524504388940-b1c1722653e1", t: "THE MODERN MUSE" },
  { u: "photo-1517841905240-472988babdf9", t: "THE TIMELESS LOOK" },
  { u: "photo-1506794778202-cad84cf45f1d", t: "THE GENTLEMEN EDIT" },
  { u: "photo-1524250502761-1ac6f2e30d43", t: "THE BEAUTY EDIT" },
  { u: "photo-1504593811423-6dd665756598", t: "THE SHARP EDIT" },
  { u: "photo-1529139574466-a303027c1d8b", t: "THE FASHION EDIT" },
  { u: "photo-1544005313-94ddf0286df2", t: "THE PORTRAIT EDIT" },
  { u: "photo-1531123897727-8f129e1688ce", t: "THE CONFIDENT EDIT" },
  { u: "photo-1507003211169-0a1dd7228f2d", t: "THE NATURAL EDIT" },
  { u: "photo-1488426862026-3ee34a7d66df", t: "THE SOFT WAVES" },
];
const imageUrl = (u, w = 650) =>
  `https://images.unsplash.com/${u}?auto=format&fit=crop&w=${w}&q=80`;
function populateReel(el, items) {
  items.concat(items).forEach((f) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `View ${f.t} photo`);
    const img = document.createElement("img");
    img.src = imageUrl(f.u);
    img.alt = `${f.t} hairstyle inspiration portrait`;
    img.loading = "lazy";
    b.append(img);
    b.addEventListener("click", () => openFrame(frames.indexOf(f)));
    el.append(b);
  });
}
populateReel($("#reelOne"), frames.slice(0, 6));
populateReel($("#reelTwo"), frames.slice(6));
const lightbox = $("#lightbox");
let activeFrame = 0;
function openFrame(i) {
  activeFrame = (i + frames.length) % frames.length;
  $("#lightImage").src = imageUrl(frames[activeFrame].u, 1400);
  $("#lightImage").alt = frames[activeFrame].t + " inspiration";
  $("#lightCaption").textContent =
    `${String(activeFrame + 1).padStart(2, "0")} / ${frames.length} — ${frames[activeFrame].t}`;
  if (!lightbox.open) lightbox.showModal();
}
$("#closeLightbox").addEventListener("click", () => lightbox.close());
$("#lightPrev").addEventListener("click", () => openFrame(activeFrame - 1));
$("#lightNext").addEventListener("click", () => openFrame(activeFrame + 1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.open) return;
  if (e.key === "ArrowRight") openFrame(activeFrame + 1);
  if (e.key === "ArrowLeft") openFrame(activeFrame - 1);
});
let touchX = 0;
lightbox.addEventListener(
  "touchstart",
  (e) => {
    touchX = e.touches[0].clientX;
  },
  { passive: true },
);
lightbox.addEventListener(
  "touchend",
  (e) => {
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 55) openFrame(activeFrame + (delta < 0 ? 1 : -1));
  },
  { passive: true },
);
const reels = $("#reels"),
  pauseBtn = $("#pauseReels");
// Pause both infinite gallery tracks instantly on actual pointer hover; resume on exit.
// Focus/keyboard interaction also stops the carousel for accessibility.
reels.addEventListener("pointerenter", () => reels.classList.add("is-hovered"));
reels.addEventListener("pointerleave", () =>
  reels.classList.remove("is-hovered"),
);
reels.addEventListener("mouseenter", () => reels.classList.add("is-hovered"));
reels.addEventListener("mouseleave", () =>
  reels.classList.remove("is-hovered"),
);
reels.addEventListener("focusin", () => reels.classList.add("is-hovered"));
reels.addEventListener("focusout", (e) => {
  if (!reels.contains(e.relatedTarget)) reels.classList.remove("is-hovered");
});
// On touch devices tapping a gallery frame should never make the image monochrome.
pauseBtn.addEventListener("click", () => {
  let paused = reels.classList.toggle("paused");
  pauseBtn.textContent = paused ? "RESUME MOTION ▶" : "PAUSE MOTION Ⅱ";
  pauseBtn.setAttribute("aria-pressed", String(paused));
});
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".reveal").forEach((e) => {
  if (reduceMotion) e.classList.add("visible");
  else observer.observe(e);
});
if (reduceMotion) {
  clearInterval(slideTimer);
  progress.style.transition = "none";
  progress.style.width = "100%";
  reels.classList.add("paused");
  pauseBtn.textContent = "RESUME MOTION ▶";
}
$("#year").textContent = new Date().getFullYear();
$("#appointmentDate").min = new Date().toLocaleDateString("en-CA");
let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
}
$("#bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const msg = `Hello Hair Mentor Salon, I'd like to enquire about an appointment.\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nService: ${fd.get("service")}\nPreferred date: ${fd.get("date")}\nPreferred time: ${fd.get("time")}\nPlease confirm available slots.`;
  try {
    await navigator.clipboard.writeText(msg);
    $("#formStatus").textContent =
      "Your enquiry has been copied. Paste it into WhatsApp or a message to the salon. This is not a confirmed booking.";
    toast("Appointment enquiry copied");
  } catch {
    const box = $("#formStatus");
    box.textContent = msg;
    box.style.whiteSpace = "pre-line";
    toast("Copy the enquiry shown below");
  }
});
