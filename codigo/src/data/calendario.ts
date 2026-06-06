/**
 * Calendario del club: solo entradas con fecha en agenda (competiciones, exámenes, actividades).
 *
 * Las noticias viven en `noticias.ts`. Una noticia (p. ej. resultado de campeonato) no aparece aquí
 * salvo que añadas manualmente una fila en esta lista. Opcionalmente, una noticia puede enlazar a una
 * entrada mediante `eventoCalendarioId` igual a `id` de aquí (convocatorias que duplican una fecha).
 */

export type TipoCalendario = "competicion" | "examen" | "evento" | "club";

export type EntradaCalendario = {
	id: string;
	fechaInicio: string;
	fechaFin?: string;
	titulo: string;
	tipo: TipoCalendario;
	descripcion?: string;
	lugar?: string;
};

export const entradasCalendario: EntradaCalendario[] = [
	{
		id: "ceremonia-cinturon-2026",
		fechaInicio: "2026-06-16",
		titulo: "Ceremonia de entrega de cinturón",
		tipo: "examen",
		descripcion:
			"Ceremonia de entrega de cinturón del club. Horario por confirmar; el acto será en El Silo.",
		lugar: "El Silo",
	},
];

const ordenTipo: Record<TipoCalendario, number> = {
	competicion: 0,
	examen: 1,
	evento: 2,
	club: 3,
};

export function getEntradasCalendarioOrdenadas(): EntradaCalendario[] {
	return [...entradasCalendario].sort((a, b) => {
		const d = a.fechaInicio.localeCompare(b.fechaInicio);
		if (d !== 0) return d;
		return ordenTipo[a.tipo] - ordenTipo[b.tipo];
	});
}

export function etiquetaTipo(t: TipoCalendario): string {
	switch (t) {
		case "competicion":
			return "Competición";
		case "examen":
			return "Examen";
		case "evento":
			return "Evento";
		case "club":
			return "Club";
		default:
			return t;
	}
}

export function getEntradaCalendarioPorId(id: string): EntradaCalendario | undefined {
	return entradasCalendario.find((e) => e.id === id);
}
