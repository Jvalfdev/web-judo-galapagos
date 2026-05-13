import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ctx: gsap.Context | null = null;

export function destroyScrollOrchestra(): void {
	ctx?.revert();
	ctx = null;
}

export function initScrollOrchestra(): void {
	destroyScrollOrchestra();

	if (typeof window === "undefined") return;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	gsap.registerPlugin(ScrollTrigger);

	const easeOut = "power4.out";
	const easeSnap = "back.out(1.28)";

	ctx = gsap.context(() => {
		/* ---------- Hero: capas a distinta velocidad ---------- */
		const hero = document.querySelector<HTMLElement>(".hero");
		if (hero) {
			gsap.to(".hero__mesh", {
				yPercent: 22,
				scale: 1.06,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: 1.15,
				},
			});

			gsap.to(".hero__orb--a", {
				yPercent: -35,
				xPercent: 12,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: 0.85,
				},
			});

			gsap.to(".hero__orb--b", {
				yPercent: 28,
				xPercent: -6,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: 1.35,
				},
			});

			gsap.to(".hero__grid", {
				opacity: 0.2,
				yPercent: 8,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});

			gsap.to(".hero__inner", {
				y: 72,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: 1.05,
				},
			});

			gsap.to(".hero__noise", {
				opacity: 0.02,
				ease: "none",
				scrollTrigger: {
					trigger: hero,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		}

		/* ---------- Últimas noticias (portada) ---------- */
		const ultimas = document.querySelector<HTMLElement>("#ultimas-noticias");
		if (ultimas) {
			const head = ultimas.querySelector<HTMLElement>(".section__head--news");
			const cards = gsap.utils.toArray<HTMLElement>(
				ultimas.querySelectorAll(".news-card"),
			);

			if (head) {
				gsap.set(head, {
					opacity: 0,
					y: 52,
					filter: "blur(12px)",
				});
			}
			gsap.set(cards, {
				opacity: 0,
				y: 72,
				scale: 0.94,
			});

			const tlUltimas = gsap.timeline({
				scrollTrigger: {
					trigger: ultimas,
					start: "top 78%",
					toggleActions: "play none none none",
				},
			});

			if (head) {
				tlUltimas.to(head, {
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 0.95,
					ease: easeOut,
				});
			}

			tlUltimas.to(
				cards,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.85,
					stagger: { each: 0.09, from: "start" },
					ease: easeSnap,
				},
				head ? "-=0.5" : 0,
			);

			tlUltimas.eventCallback("onComplete", () => {
				if (head) gsap.set(head, { clearProps: "transform,filter" });
				if (cards.length) gsap.set(cards, { clearProps: "transform,filter" });
			});
		}

		/* ---------- Filosofía ---------- */
		const filosofia = document.querySelector<HTMLElement>("#filosofia");
		if (filosofia) {
			const head = filosofia.querySelector<HTMLElement>(".section__head");
			const cards = gsap.utils.toArray<HTMLElement>(
				filosofia.querySelectorAll(".cards .card"),
			);

			if (head) {
				gsap.set(head, {
					opacity: 0,
					y: 64,
					filter: "blur(14px)",
					transformPerspective: 1200,
				});
			}
			gsap.set(cards, {
				opacity: 0,
				y: 100,
				rotateX: 14,
				scale: 0.94,
				transformPerspective: 1400,
				transformOrigin: "50% 80%",
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: filosofia,
					start: "top 78%",
					toggleActions: "play none none none",
				},
			});

			if (head) {
				tl.to(head, {
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 1.05,
					ease: easeOut,
				});
			}

			tl.to(
				cards,
				{
					opacity: 1,
					y: 0,
					rotateX: 0,
					scale: 1,
					duration: 1,
					stagger: { each: 0.11, from: "start" },
					ease: easeSnap,
				},
				head ? "-=0.58" : 0,
			);

			tl.eventCallback("onComplete", () => {
				if (head) gsap.set(head, { clearProps: "transform,filter" });
				if (cards.length) gsap.set(cards, { clearProps: "transform,filter" });
			});
		}

		/* ---------- Maestro ---------- */
		const master = document.querySelector<HTMLElement>(".master");
		if (master) {
			const visual = master.querySelector<HTMLElement>(".master__visual");
			const contentBits = gsap.utils.toArray<HTMLElement>(
				master.querySelectorAll(".master__content > *"),
			);

			if (visual) {
				gsap.set(visual, {
					opacity: 0,
					x: -80,
					rotateY: -18,
					scale: 0.92,
					transformPerspective: 1600,
					transformOrigin: "left center",
					filter: "blur(12px)",
				});
			}
			gsap.set(contentBits, {
				opacity: 0,
				x: 56,
				filter: "blur(10px)",
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: master,
					start: "top 76%",
					toggleActions: "play none none none",
				},
			});

			if (visual) {
				tl.to(visual, {
					opacity: 1,
					x: 0,
					rotateY: 0,
					scale: 1,
					filter: "blur(0px)",
					duration: 1.25,
					ease: easeOut,
				});
			}

			tl.to(
				contentBits,
				{
					opacity: 1,
					x: 0,
					filter: "blur(0px)",
					duration: 0.9,
					stagger: 0.12,
					ease: easeSnap,
				},
				visual ? "-=0.72" : 0,
			);

			tl.eventCallback("onComplete", () => {
				if (visual) gsap.set(visual, { clearProps: "transform,filter" });
				if (contentBits.length) gsap.set(contentBits, { clearProps: "transform,filter" });
			});
		}

		/* ---------- Horarios ---------- */
		const horarios = document.querySelector<HTMLElement>("#horarios");
		if (horarios) {
			const headRow = horarios.querySelector<HTMLElement>(".section__head--row");
			const table = horarios.querySelector<HTMLElement>(".schedule");
			const rows = gsap.utils.toArray<HTMLElement>(
				horarios.querySelectorAll(".schedule__row"),
			);

			if (headRow) {
				gsap.set(headRow, { opacity: 0, y: 48, skewY: 3 });
			}
			if (table) {
				gsap.set(table, {
					opacity: 0,
					y: 56,
					scale: 0.94,
					clipPath: "inset(8% 10% 12% 10% round 28px)",
				});
			}
			gsap.set(rows, {
				opacity: 0,
				x: (i) => (i % 2 === 0 ? -56 : 56),
				skewX: (i) => (i % 2 === 0 ? 3 : -3),
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: horarios,
					start: "top 76%",
					toggleActions: "play none none none",
				},
			});

			if (headRow) {
				tl.to(headRow, {
					opacity: 1,
					y: 0,
					skewY: 0,
					duration: 0.95,
					ease: easeOut,
				});
			}

			if (table) {
				tl.to(
					table,
					{
						opacity: 1,
						y: 0,
						scale: 1,
						clipPath: "inset(0% 0% 0% 0% round 28px)",
						duration: 1.2,
						ease: "power3.inOut",
					},
					"-=0.55",
				);
			}

			tl.to(
				rows,
				{
					opacity: 1,
					x: 0,
					skewX: 0,
					duration: 0.82,
					stagger: 0.07,
					ease: easeOut,
				},
				"-=0.65",
			);

			tl.eventCallback("onComplete", () => {
				if (headRow) gsap.set(headRow, { clearProps: "transform" });
				if (table) gsap.set(table, { clearProps: "transform,clipPath" });
				if (rows.length) gsap.set(rows, { clearProps: "transform" });
			});
		}

		/* ---------- Eventos ---------- */
		const eventos = document.querySelector<HTMLElement>("#eventos");
		if (eventos) {
			const head = eventos.querySelector<HTMLElement>(".section__head");
			const tiles = gsap.utils.toArray<HTMLElement>(eventos.querySelectorAll(".tile"));

			if (head) {
				gsap.set(head, {
					opacity: 0,
					y: 72,
					scale: 0.96,
					filter: "blur(12px)",
				});
			}
			gsap.set(tiles, {
				opacity: 0,
				y: 110,
				scale: 0.88,
				rotateZ: (i) => (i === 0 ? -2.5 : i === 1 ? 1.8 : -1.2),
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: eventos,
					start: "top 78%",
					toggleActions: "play none none none",
				},
			});

			if (head) {
				tl.to(head, {
					opacity: 1,
					y: 0,
					scale: 1,
					filter: "blur(0px)",
					duration: 1,
					ease: easeOut,
				});
			}

			tl.to(
				tiles,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					rotateZ: 0,
					duration: 1.05,
					stagger: { each: 0.13, from: "random" },
					ease: easeSnap,
				},
				"-=0.52",
			);

			tl.eventCallback("onComplete", () => {
				if (head) gsap.set(head, { clearProps: "transform,filter" });
				if (tiles.length) gsap.set(tiles, { clearProps: "transform,filter" });
			});
		}

		/* ---------- Pie ---------- */
		const footer = document.querySelector<HTMLElement>("footer#contacto");
		if (footer) {
			const blocks = gsap.utils.toArray<HTMLElement>(
				footer.querySelectorAll(".footer__grid > *"),
			);
			const bar = footer.querySelector<HTMLElement>(".footer__bar");

			gsap.set(blocks, { opacity: 0, y: 48 });
			if (bar) gsap.set(bar, { opacity: 0, y: 24 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: footer,
					start: "top 90%",
					toggleActions: "play none none none",
				},
			});

			tl.to(blocks, {
				opacity: 1,
				y: 0,
				duration: 0.85,
				stagger: 0.09,
				ease: easeOut,
			});

			if (bar) {
				tl.to(
					bar,
					{
						opacity: 1,
						y: 0,
						duration: 0.65,
						ease: easeOut,
					},
					"-=0.35",
				);
			}

			tl.eventCallback("onComplete", () => {
				if (blocks.length) gsap.set(blocks, { clearProps: "transform" });
				if (bar) gsap.set(bar, { clearProps: "transform" });
			});
		}

		ScrollTrigger.refresh();
	});
}

if (typeof window !== "undefined") {
	document.addEventListener("jg-splash-done", () => {
		try {
			ScrollTrigger.refresh();
		} catch {
			/* GSAP no inicializado (p. ej. reduced motion) */
		}
	});
}
