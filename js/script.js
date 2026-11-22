"use strict";

// Add verified destinations here. Empty links get a visible placeholder state.
const profile = {
  github: "",
  linkedin: "",
  email: "",
  resume: "assets/resume-draft.pdf",
  resumeLabel: "Résumé · draft PDF",
  photo: "assets/images/profile-placeholder.png",
  photoAlt: "Sean Fuertes monogram, profile photo placeholder"
};

const skills = [
  { title: "Programming Languages", icon: "braces", items: ["C#", "Java", "Python", "JavaScript", "C++", "SQL"] },
  { title: "Web Development", icon: "globe", items: ["HTML5", "CSS3", "JavaScript", "REST API Integration", "ASP.NET Core Web API"] },
  { title: "Database & Backend", icon: "database", items: ["Microsoft SQL Server", "SSMS", "Dapper", "CRUD Operations", "Stored Procedures"] },
  { title: "Tools & Technologies", icon: "wrench", items: ["Git & GitHub", "Visual Studio", "VS Code", "Swagger", "Postman", "Arduino / ESP32"] },
  { title: "Cybersecurity & Networking", icon: "network", items: ["Networking Fundamentals", "Linux / Kali Linux", "Cybersecurity Fundamentals", "Ethical Hacking Concepts", "Network Configuration"] }
];

const projects = [
  {
    title: "JOBLINK: Intelligent Resume Builder and Job Matching System",
    category: "Web application",
    description: "A web-based platform designed to assist job seekers in creating resumes and discovering relevant job opportunities through external job API integration.",
    image: "assets/images/joblink.png", imageAlt: "Illustrated JOBLINK job search interface", previewLabel: "Illustrative preview",
    technologies: ["HTML", "CSS", "JavaScript", "C#", "ASP.NET Core Web API", "SQL Server", "REST API"],
    features: ["User registration and login", "Personalized dashboard", "Job searching through an external API", "Resume-building functionality", "Job details and application links"],
    github: "", demo: ""
  },
  {
    title: "Catering Reservation and Management System",
    category: "Client project · BM's Catering Services",
    description: "A client-based reservation management website designed to help catering businesses manage bookings, packages, customer information, and reservation statuses.",
    image: "assets/images/catering.png", imageAlt: "Illustrated BM’s Catering reservation calendar", previewLabel: "Illustrative preview",
    technologies: ["HTML", "CSS", "JavaScript", "SQL Server"],
    features: ["Online reservations", "Reservation management", "Admin dashboard", "Package management", "Booking status tracking"],
    github: "", demo: ""
  },
  {
    title: "SafeCare: Wristband Health Monitoring System",
    category: "IoT project concept",
    description: "An IoT-based project concept designed to monitor elderly individuals, detect possible falls, and provide emergency alerts to caregivers.",
    image: "assets/images/safecare.png", imageAlt: "Illustrated SafeCare wristband concept with a sensor trace", previewLabel: "Concept illustration",
    technologies: ["ESP32 / IoT", "Sensors", "Embedded Systems"],
    features: ["Fall detection concept", "Emergency alerts", "Health monitoring", "Caregiver notifications"],
    github: "", demo: ""
  }
];

const $ = (selector) => document.querySelector(selector);
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function icon(name) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  for (const [tag, attributes] of lucideShapes[name]) {
    const shape = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attributes)) shape.setAttribute(key, value);
    svg.append(shape);
  }
  return svg;
}
function tags(items, className = "tags") {
  const list = element("ul", className);
  for (const item of items) list.append(element("li", "", item));
  return list;
}
function externalUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}
function externalLink(url, text) {
  const link = element("a", "", text);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}
function renderPortfolio() {
  for (const skill of skills) {
    const card = element("article", "skill-card");
    const box = element("span", "icon-box");
    box.append(icon(skill.icon));
    card.append(box, element("h3", "", skill.title), tags(skill.items));
    $("#skill-grid").append(card);
  }
  for (const project of projects) {
    const card = element("article", "project-card");
    const preview = element("div", "project-preview");
    const img = element("img");
    Object.assign(img, { src: project.image, alt: project.imageAlt, loading: "lazy", width: 720, height: 400 });
    preview.append(img);
    if (project.previewLabel) preview.append(element("span", "", project.previewLabel));
    const content = element("div", "project-content");
    const details = element("details");
    details.append(element("summary", "", "Project features"), tags(project.features, "feature-list"));
    const links = element("div", "project-links");
    const repository = externalUrl(project.github);
    const github = repository ? externalLink(repository, "GitHub") : element("button", "", "GitHub · link pending");
    if (!repository) github.disabled = true;
    github.prepend(icon("github"));
    links.append(github);
    const demo = externalUrl(project.demo);
    if (demo) {
      const link = externalLink(demo, "Live Demo");
      link.prepend(icon("external-link"));
      links.append(link);
    }
    content.append(element("span", "kind", project.category), element("h3", "", project.title), element("p", "", project.description), tags(project.technologies), details, links);
    card.append(preview, content);
    $("#project-grid").append(card);
  }
}

let noticeTimer;
function notify(text) {
  const notice = $("#notice");
  clearTimeout(noticeTimer);
  notice.hidden = false;
  notice.textContent = text;
  noticeTimer = setTimeout(() => { notice.hidden = true; }, 3800);
}
const channels = [
  { key: "github", name: "GitHub", icon: "github" },
  { key: "linkedin", name: "LinkedIn", icon: "linkedin" },
  { key: "email", name: "Email", icon: "mail" }
];
function channelLink(channel, showText) {
  const value = profile[channel.key];
  const isEmail = channel.key === "email";
  const url = isEmail && value ? "mailto:" + value : externalUrl(value);
  const label = isEmail && value ? value : channel.name;
  const control = url ? externalLink(url, "") : element("button");
  if (isEmail && url) control.removeAttribute("target");
  control.title = url ? label : channel.name + " · placeholder";
  control.setAttribute("aria-label", control.title);
  if (!url) {
    control.type = "button";
    control.addEventListener("click", () => notify(channel.name + (isEmail ? " address" : " profile link") + " hasn’t been added yet."));
  }
  control.append(icon(channel.icon));
  if (showText) {
    control.append(document.createTextNode(label));
    if (!url) control.append(element("small", "", "Placeholder"));
  }
  return control;
}
function renderContact() {
  for (const channel of channels) {
    document.querySelectorAll("[data-socials]").forEach(row => row.append(channelLink(channel, false)));
    $("#contact-links").append(channelLink(channel, true));
  }
  const resume = $('[data-profile="resume"]');
  resume.href = profile.resume;
  resume.title = profile.resumeLabel;
  const contactResume = element("a", "", profile.resumeLabel);
  contactResume.href = profile.resume;
  contactResume.download = "";
  contactResume.prepend(icon("download"));
  $("#contact-links").append(contactResume);
  Object.assign($("#portrait"), { src: profile.photo, alt: profile.photoAlt });
  if (!profile.email) $("#form-note").textContent = "Sean’s email is a placeholder. This opens a draft with the recipient blank. Add his address in your email app before sending.";
  $("#contact-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = data.get("message").trim() + "\r\n\r\n" + data.get("fullName").trim() + "\r\n" + data.get("email").trim();
    const target = "mailto:" + profile.email + "?subject=" + encodeURIComponent(data.get("subject").trim()) + "&body=" + encodeURIComponent(body);
    const status = $("#form-status");
    status.textContent = "Draft requested. If your email app opens, review the recipient and message there, then send. Your message is still available in this form.";
    status.hidden = false;
    window.location.href = target;
  });
}

function setupNavigation() {
  const menu = $("#navigation");
  const toggle = $(".menu-toggle");
  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.replaceChildren(icon(open ? "x" : "menu"));
  }
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  document.addEventListener("click", event => {
    if (!menu.classList.contains("open")) return;
    const link = event.target.closest(".nav-shell a");
    if (link || !event.target.closest(".nav-shell")) setOpen(false);
    if (link && link.hash) {
      const destination = document.getElementById(link.hash.slice(1));
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.classList.contains("open")) { setOpen(false); toggle.focus(); }
  });
  const links = Array.from(menu.querySelectorAll("a"));
  const sections = links.map(link => document.querySelector(link.hash));
  function activeSection() {
    let current = 0;
    for (let i = 1; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= 125) current = i;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = links.length - 1;
    links.forEach((link, i) => {
      if (i === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  let queued = false;
  const refresh = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { activeSection(); queued = false; });
  };
  window.addEventListener("scroll", refresh, { passive: true });
  window.addEventListener("resize", refresh);
  window.matchMedia("(max-width:850px)").addEventListener("change", () => setOpen(false));
  activeSection();
}

function setupTerminal() {
  const history = $("#history");
  const field = $("#command");
  const panel = $(".terminal-body");
  // A closed set of text responses. Input is never executed or sent anywhere.
  const commands = {
    whoami: "Aspiring Software Developer",
    interests: "Web Development\nCybersecurity\nBackend Development\nDatabase Management",
    status: "Available for Opportunities",
    projects: projects.map(project => project.title).join("\n"),
    help: "whoami · interests · status · projects · help · clear"
  };
  function run(value) {
    const input = value.trim();
    if (!input) return;
    const key = input.toLowerCase();
    if (key === "clear") { history.replaceChildren(); return; }
    const group = element("div", "command-group");
    const line = element("p");
    line.append(element("b", "", "sean@portfolio"), element("em", "", ":~$"), document.createTextNode(" " + input));
    const response = Object.hasOwn(commands, key) ? commands[key] : "Unknown command. Type help to see available commands.";
    group.append(line, element("p", key === "status" ? "output online" : "output", response));
    history.append(group);
    if (history.children.length > 35) history.firstElementChild.remove();
    panel.scrollTop = panel.scrollHeight;
  }
  $("#command-form").addEventListener("submit", event => {
    event.preventDefault();
    run(field.value);
    field.value = "";
    field.parentElement.classList.remove("has-value");
  });
  field.addEventListener("input", () => field.parentElement.classList.toggle("has-value", Boolean(field.value)));
  $("#terminal-help").addEventListener("click", () => { run("help"); field.focus({ preventScroll: true }); });
  const firstCommand = history.querySelector("p").lastChild;
  if (!motion.matches) {
    let count = 0;
    const text = firstCommand.textContent;
    firstCommand.textContent = "";
    const timer = setInterval(() => {
      firstCommand.textContent = text.slice(0, ++count);
      if (count >= text.length || motion.matches) { firstCommand.textContent = text; clearInterval(timer); }
    }, 55);
  }
}

function setupRole() {
  const roles = ["Aspiring Software Developer", "Cybersecurity Enthusiast", "IT Student", "Full-Stack Development Learner"];
  const output = $("#role-type");
  let timer;
  function restart() {
    clearTimeout(timer);
    output.textContent = roles[0];
    if (motion.matches) return;
    let index = 0, deleting = true, count = roles[0].length;
    function type() {
      count += deleting ? -1 : 1;
      output.textContent = roles[index].slice(0, count);
      if (count === 0) { index = (index + 1) % roles.length; deleting = false; }
      else if (count === roles[index].length) { deleting = true; timer = setTimeout(type, 2900); return; }
      timer = setTimeout(type, deleting ? 26 : 48);
    }
    timer = setTimeout(type, 3200);
  }
  restart();
  motion.addEventListener("change", restart);
}

// The terrain is a static, procedural wireframe. Redraw only on a size change.
function setupTerrain() {
  const canvas = $("#terrain");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);
    let seed = 2609;
    function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    for (let i = 0; i < 95; i++) {
      const x = random() * w, y = random() * h;
      ctx.fillStyle = "rgba(128,192,255," + (.12 + random() * .42) + ")";
      ctx.fillRect(x, y, random() > .9 ? 2 : 1, 1.4);
    }
    const cols = w < 700 ? 72 : 126, rows = 37;
    function vertex(col, row) {
      const t = row / rows, x = (col / cols - .5) * (1 + .8 * t) + .5;
      const angle = x * 9.6 + t * 4.3;
      const wave = Math.sin(angle) * .053 + Math.sin(x * 17 - t * 7) * .024 + Math.cos(x * 5 - t * 8) * .025;
      const ridge = .16 * Math.exp(-Math.pow((x - .94 + t * .2) / .15, 2)) + .07 * Math.exp(-Math.pow((x - .13 - t * .2) / .2, 2));
      return [x * w, h * (.89 + t * .39 - ridge + wave * (1 - .3 * t))];
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const a = vertex(col, row), b = vertex(col + 1, row), c = vertex(col, row + 1);
        if (a[0] > w + 20 || b[0] < -20 || Math.min(a[1],b[1],c[1]) > h) continue;
        const strength = Math.min(1,Math.max(0,a[0] / w));
        const alpha = (.07 + strength * .46) * (1 - .4 * row / rows);
        ctx.strokeStyle = "rgba(49," + Math.round(110 + strength * 46) + ",246," + alpha + ")";
        ctx.lineWidth = .75;
        ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...c); ctx.lineTo(...a); ctx.stroke();
        if (row % 4 === 0 && col % 5 === 0) {
          ctx.fillStyle = "rgba(112,200,255," + (alpha + .16) + ")";
          ctx.fillRect(a[0] - 1, a[1] - 1, 2, 2);
        }
      }
    }
  }
  new ResizeObserver(draw).observe(canvas);
  const hero = $("#home");
  hero.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || motion.matches) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", event.clientX - rect.left + "px");
    hero.style.setProperty("--my", event.clientY - rect.top + "px");
  });
}
function setupReveals() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motion.matches) entry.target.classList.add("reveal-in");
      observer.unobserve(entry.target);
    }
  }, { threshold: .09 });
  document.querySelectorAll(".skill-card,.project-card,.highlights,.timeline li,.profile-card,.security-console").forEach(node => observer.observe(node));
}
document.querySelectorAll("[data-icon]").forEach(node => node.replaceWith(icon(node.dataset.icon)));
$("#year").textContent = new Date().getFullYear();
renderPortfolio();
renderContact();
setupNavigation();
setupTerminal();
setupRole();
setupTerrain();
setupReveals();
