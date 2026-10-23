// The hero demo: type `gitjoin`, read the manifests, then clone the repos
// with a small pool of parallel workers, the way gitjoin does it.
// Without JS (or with reduced motion), the tree renders fully joined.

const WORKERS = 4;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function initDemo(root) {
  const typed = root.querySelector("[data-type]");
  const out = root.querySelector("[data-out]");
  const replay = root.querySelector("[data-replay]");
  const manifests = [...root.querySelectorAll(".t-manifest")];
  const repos = [...root.querySelectorAll("[data-repo]")];
  const command = typed.textContent;

  let run = 0;

  const setStatus = (text, el) => {
    for (const r of el ? [el] : repos) r.querySelector(".t-status").textContent = text;
  };

  const reset = () => {
    root.classList.add("is-armed");
    root.classList.remove("is-running");
    for (const el of [...manifests, ...repos]) {
      el.classList.remove("is-reading", "is-busy", "is-done");
    }
    setStatus("cloning");
    typed.textContent = "";
    out.textContent = "";
    replay.hidden = true;
  };

  const play = async () => {
    const id = ++run;
    const alive = () => id === run;

    reset();
    await sleep(700);

    for (const ch of command) {
      if (!alive()) return;
      typed.textContent += ch;
      await sleep(65 + Math.random() * 45);
    }
    await sleep(320);
    if (!alive()) return;
    root.classList.add("is-running");

    for (const m of manifests) {
      if (!alive()) return;
      m.classList.add("is-reading");
      out.textContent = `Reading ${m.querySelector(".t-name").textContent} …`;
      await sleep(180);
      m.classList.remove("is-reading");
    }

    let done = 0;
    const total = repos.length;
    const progress = () => {
      out.textContent = `Syncing ${done}/${total} repos, ${WORKERS} at a time`;
    };
    progress();

    const queue = [...repos];
    const worker = async () => {
      while (queue.length && alive()) {
        const repo = queue.shift();
        repo.classList.add("is-busy");
        await sleep(550 + Math.random() * 900);
        if (!alive()) return;
        repo.classList.remove("is-busy");
        repo.classList.add("is-done");
        setStatus("cloned", repo);
        done++;
        progress();
      }
    };
    await Promise.all(Array.from({ length: WORKERS }, worker));
    if (!alive()) return;

    await sleep(250);
    out.innerHTML = `<strong>Cloned: ${total} repos</strong>`;
    replay.hidden = false;
  };

  replay.addEventListener("click", play);

  // Start once the demo is actually on screen.
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        play();
      }
    },
    { threshold: 0.35 },
  );
  io.observe(root);
}
