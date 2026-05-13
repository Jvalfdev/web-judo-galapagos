/**
 * Único teléfono del club en la web: dígitos internacionales sin + ni espacios (ej. España → 34612345678).
 * Lo usan WhatsApp (`wa.me`) y el enlace `tel:` del pie; edita solo esta constante.
 */
export const TELEFONO_CLUB = "34636754419";

/** Mensaje opcional que se abre ya escrito en WhatsApp (el usuario puede borrarlo). */
export const WHATSAPP_TEXTO_PRELLENADO =
	"Hola, escribo desde la web del Club de Judo Galápagos.";

/** Para `<a href="tel:...">`. */
export function telefonoHrefTel(): string {
	return `tel:+${TELEFONO_CLUB}`;
}

/** Texto legible para España (34 + 9 dígitos → +34 XXX XXX XXX). Otros formatos: + y dígitos tal cual. */
export function telefonoTextoLegible(): string {
	const n = TELEFONO_CLUB;
	if (n.startsWith("34") && n.length === 11) {
		const r = n.slice(2);
		return `+34 ${r.slice(0, 3)} ${r.slice(3, 6)} ${r.slice(6)}`;
	}
	return `+${n}`;
}

export function urlWhatsApp(texto?: string): string {
	const base = `https://wa.me/${TELEFONO_CLUB}`;
	const t = texto?.trim();
	if (t) return `${base}?text=${encodeURIComponent(t)}`;
	return `${base}?text=${encodeURIComponent(WHATSAPP_TEXTO_PRELLENADO)}`;
}
