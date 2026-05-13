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
		id: "evt-1",
		fechaInicio: "2026-06-01",
		titulo: "Evento de ejemplo 1",
		tipo: "competicion",
		descripcion: "Descripción genérica del evento de ejemplo 1.",
		lugar: "Lugar por definir",
	},
	{
		id: "evt-2",
		fechaInicio: "2026-07-10",
		titulo: "Evento de ejemplo 2",
		tipo: "examen",
		descripcion: "Descripción genérica del evento de ejemplo 2.",
		lugar: "Lugar por definir",
	},
	{
		id: "evt-3",
		fechaInicio: "2026-08-05",
		fechaFin: "2026-08-07",
		titulo: "Evento de ejemplo 3 (varios días)",
		tipo: "evento",
		descripcion: "Descripción genérica del evento de ejemplo 3.",
		lugar: "Lugar por definir",
	},
	{
		id: "evt-4",
		fechaInicio: "2026-09-20",
		titulo: "Evento de ejemplo 4",
		tipo: "competicion",
		descripcion: "Descripción genérica del evento de ejemplo 4.",
	},
	{
		id: "evt-5",
		fechaInicio: "2026-10-15",
		titulo: "Evento de ejemplo 5",
		tipo: "club",
		descripcion: "Descripción genérica del evento de ejemplo 5.",
		lugar: "Lugar por definir",
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
