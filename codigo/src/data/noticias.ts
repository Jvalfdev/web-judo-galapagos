/**
 * Noticias del club (textos en `/noticias`).
 *
 * Modelo frente al calendario:
 * - La agenda solo usa `calendario.ts`. Las noticias no generan días en el calendario automáticamente.
 * - `tipoNoticia` clasifica el contenido; por ejemplo `resultado` suele ser solo artículo (sin cita en agenda).
 * - Si una convocatoria corresponde a un día ya cargado en calendario, rellena `eventoCalendarioId` con el mismo
 *   `id` que la entrada en `calendario.ts` para poder enlazar desde la ficha de la noticia.
 */

import type { ImageMetadata } from "astro";
import imgCampeonatoClmCarla from "../assets/campeonato-clm-equipos-2026-carla.png";
import imgCampeonatoClmCombate from "../assets/campeonato-clm-equipos-2026-combate.png";
import imgCampeonatoClmEquipo from "../assets/campeonato-clm-equipos-2026-equipo.png";
import imgEntregaCinturon from "../assets/entrega-cinturon.jpg";
import imgTecnicaOroRivas from "../assets/tecnica-oro-rivas-2026.png";

export type TipoNoticia = "convocatoria" | "resultado" | "informacion";

export type NoticiaImagen = {
	image: ImageMetadata;
	alt: string;
};

export type Noticia = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tipoNoticia: TipoNoticia;
	image: ImageMetadata;
	imageAlt: string;
	/** Fotos adicionales en la ficha de la noticia. */
	gallery?: NoticiaImagen[];
	/** Opcional: mismo `id` que una fila en `entradasCalendario` para enlace «Ver en calendario». */
	eventoCalendarioId?: string;
	paragraphs: string[];
};

export function etiquetaTipoNoticia(t: TipoNoticia): string {
	switch (t) {
		case "convocatoria":
			return "Convocatoria";
		case "resultado":
			return "Resultado";
		case "informacion":
			return "Información";
		default:
			return t;
	}
}

export const noticias: Noticia[] = [
	{
		slug: "campeonato-castilla-mancha-equipos-2026",
		title: "Campeonato de Castilla-La Mancha por equipos",
		excerpt:
			"Carla Ramos, con el equipo de Tomelloso representando a Judo Galápagos, ganó todos sus combates.",
		date: "2026-05-26",
		tipoNoticia: "resultado",
		image: imgCampeonatoClmCarla,
		imageAlt: "Carla Ramos con kimono azul en el campeonato por equipos",
		gallery: [
			{
				image: imgCampeonatoClmEquipo,
				alt: "Carla Ramos con el equipo de Judo Tomelloso",
			},
			{
				image: imgCampeonatoClmCombate,
				alt: "Carla Ramos en combate durante el campeonato por equipos",
			},
		],
		paragraphs: [
			"Representando a Judo Galápagos, en el equipo de Tomelloso Carla Ramos ganó todos sus combates. ¡Muy merecido!",
			"¡Enhorabuena, Carla!",
		],
	},
	{
		slug: "tecnica-oro-rivas-2026",
		title: "Técnica de Oro de Rivas",
		excerpt:
			"Carolina Cardado, oro, y Marcos Mendiola, plata, en el campeonato Técnica de Oro de Rivas.",
		date: "2026-06-02",
		tipoNoticia: "resultado",
		image: imgTecnicaOroRivas,
		imageAlt: "Carolina Cardado y Marcos Mendiola con sus medallas en Rivas",
		paragraphs: [
			"El domingo pasado nuestros judokas compitieron en el campeonato Técnica de Oro de Rivas. ¡Enhorabuena y buen trabajo!",
			"🥇 Carolina Cardado — oro",
			"🥈 Marcos Mendiola — plata",
		],
	},
	{
		slug: "ceremonia-entrega-cinturon-2026",
		title: "Ceremonia de entrega de cinturón",
		excerpt:
			"El 16 de junio, ceremonia de entrega de cinturón en El Silo. El horario se confirmará próximamente.",
		date: "2026-06-16",
		tipoNoticia: "convocatoria",
		image: imgEntregaCinturon,
		imageAlt: "Ceremonia de entrega de cinturón del club",
		eventoCalendarioId: "ceremonia-cinturon-2026",
		paragraphs: [
			"El martes 16 de junio el Club de Judo Galápagos celebra la ceremonia de entrega de cinturón, un momento especial para reconocer el esfuerzo y la progresión de nuestros judokas.",
			"El acto tendrá lugar en El Silo. Invitamos a familias y amigos del club a acompañarnos. El horario aún no está confirmado; os lo comunicaremos en cuanto lo tengamos a través de los canales habituales del club.",
		],
	},
];

export function getLatestNoticias(count = 4): Noticia[] {
	return [...noticias].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getNoticiaBySlug(slug: string): Noticia | undefined {
	return noticias.find((n) => n.slug === slug);
}
