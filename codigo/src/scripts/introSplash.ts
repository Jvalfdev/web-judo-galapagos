/**
 * Pantalla inicial del escudo: una vez por pestaña (sessionStorage).
 */
const STORAGE_KEY = "jg-splash-seen";

function dispatchSplashDone(): void {
	queueMicrotask(() => {
		window.dispatchEvent(new CustomEvent("jg-splash-done"));
	});
}

export function initIntroSplash(): void {
	if (typeof document === "undefined") return;

	const root = document.querySelector<HTMLElement>("[data-intro-splash]");

	if (!root) {
		document.body.classList.remove("jg-splash-active");
		return;
	}

	if (document.documentElement.classList.contains("jg-no-splash")) {
		root.remove();
		dispatchSplashDone();
		return;
	}

	try {
		if (sessionStorage.getItem(STORAGE_KEY) === "1") {
			document.documentElement.classList.add("jg-no-splash");
			root.remove();
			dispatchSplashDone();
			return;
		}
	} catch {
		/* modo privado u otro bloqueo */
	}

	if (root.dataset.splashBound === "1") return;
	root.dataset.splashBound = "1";

	document.body.classList.add("jg-splash-active");

	const inertTargets: HTMLElement[] = [];
	for (const el of Array.from(document.body.children)) {
		if (!(el instanceof HTMLElement) || el === root) continue;
		el.setAttribute("inert", "");
		inertTargets.push(el);
	}

	let settled = false;
	let userSkipped = false;

	const cleanup = () => {
		if (settled) return;
		settled = true;
		window.clearTimeout(fallbackTimer);
		inertTargets.forEach((el) => el.removeAttribute("inert"));
		try {
			sessionStorage.setItem(STORAGE_KEY, "1");
		} catch {
			/* ignorar */
		}
		document.documentElement.classList.add("jg-no-splash");
		document.body.classList.remove("jg-splash-active");

		if (userSkipped) {
			document.getElementById("contenido-principal")?.focus({
				preventScroll: true,
			});
		}

		dispatchSplashDone();
		root.remove();
	};

	const fallbackTimer = window.setTimeout(cleanup, 3800);

	root.addEventListener(
		"animationend",
		(ev: AnimationEvent) => {
			if (ev.target !== root) return;
			const name = ev.animationName;
			if (
				name === "intro-splash-outro" ||
				name === "intro-splash-outro-fast"
			) {
				cleanup();
			}
		},
	);

	const hurry = () => {
		root.classList.add("intro-splash--hurry");
	};

	root.querySelector<HTMLButtonElement>("[data-intro-splash-skip]")?.addEventListener(
		"click",
		() => {
			userSkipped = true;
			hurry();
		},
	);

	document.addEventListener(
		"keydown",
		function onEsc(ev) {
			if (ev.key === "Escape") {
				userSkipped = true;
				hurry();
				document.removeEventListener("keydown", onEsc);
			}
		},
	);
}
