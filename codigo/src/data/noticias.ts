/**
 * Noticias del club (textos en `/noticias`).
 *
 * Modelo frente al calendario:
 * - La agenda solo usa `calendario.ts`. Las noticias no generan días en el calendario automáticamente.
 * - `tipoNoticia` clasifica el contenido; por ejemplo `resultado` suele ser solo artículo (sin cita en agenda).
 * - Si una convocatoria corresponde a un día ya cargado en calendario, rellena `eventoCalendarioId` con el mismo
 *   `id` que la entrada en `calendario.ts` para poder enlazar desde la ficha de la noticia.
 */

export type TipoNoticia = "convocatoria" | "resultado" | "informacion";

export type Noticia = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tipoNoticia: TipoNoticia;
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
		slug: "noticia-1",
		title: "Noticia 1",
		excerpt: "Texto breve de ejemplo para la noticia 1.",
		date: "2026-05-01",
		tipoNoticia: "informacion",
		paragraphs: [
			"Contenido de ejemplo para la noticia 1 (primer párrafo).",
			"Contenido de ejemplo para la noticia 1 (segundo párrafo).",
		],
	},
	{
		slug: "noticia-2",
		title: "Noticia 2",
		excerpt: "Texto breve de ejemplo para la noticia 2.",
		date: "2026-04-18",
		tipoNoticia: "resultado",
		paragraphs: [
			"Contenido de ejemplo para la noticia 2 (primer párrafo).",
			"Contenido de ejemplo para la noticia 2 (segundo párrafo).",
		],
	},
	{
		slug: "noticia-3",
		title: "Noticia 3",
		excerpt: "Texto breve de ejemplo para la noticia 3.",
		date: "2026-04-02",
		tipoNoticia: "convocatoria",
		eventoCalendarioId: "evt-1",
		paragraphs: [
			"Contenido de ejemplo para la noticia 3 (primer párrafo).",
			"Contenido de ejemplo para la noticia 3 (segundo párrafo).",
		],
	},
	{
		slug: "noticia-4",
		title: "Noticia 4",
		excerpt: "Texto breve de ejemplo para la noticia 4.",
		date: "2026-03-15",
		tipoNoticia: "informacion",
		paragraphs: [
			"Contenido de ejemplo para la noticia 4 (primer párrafo).",
			"Contenido de ejemplo para la noticia 4 (segundo párrafo).",
		],
	},
];

export function getLatestNoticias(count = 4): Noticia[] {
	return [...noticias].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getNoticiaBySlug(slug: string): Noticia | undefined {
	return noticias.find((n) => n.slug === slug);
}
