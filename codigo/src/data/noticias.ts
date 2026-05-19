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
		slug: "ceremonia-entrega-cinturon-2026",
		title: "Ceremonia de entrega de cinturón",
		excerpt:
			"El 15 de junio celebramos la ceremonia de entrega de cinturón con las familias del club.",
		date: "2026-06-15",
		tipoNoticia: "convocatoria",
		paragraphs: [
			"El domingo 15 de junio el Club de Judo Galápagos celebra la ceremonia de entrega de cinturón, un momento especial para reconocer el esfuerzo y la progresión de nuestros judokas.",
			"Invitamos a familias y amigos del club a acompañarnos en esta jornada. Os confirmaremos horario y lugar en los próximos días a través de los canales habituales del club.",
		],
	},
];

export function getLatestNoticias(count = 4): Noticia[] {
	return [...noticias].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getNoticiaBySlug(slug: string): Noticia | undefined {
	return noticias.find((n) => n.slug === slug);
}
