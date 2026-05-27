import TrimPhp from ".";

export type TSlugifyOptions = {
	spases: string;
	any: string;
};

export type TSanitizeOptions = {
	replacement: string;
	slugify?: Partial<TSlugifyOptions> | undefined;
};

const trim = new TrimPhp();

export const truncate = (sanitized: string, length = 255): string => {
	const uint8Array = new TextEncoder().encode(sanitized);
	const truncated = uint8Array.slice(0, length);
	return new TextDecoder().decode(truncated);
};

export function slugify(
	string: string,
	options: Partial<TSlugifyOptions> | null = {},
) {
	const replace: TSlugifyOptions = {
		any: "",
		spases: "-",
		...options,
	};

	let text = string
		.trim()
		.replace(/ +/g, replace.spases)
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, replace.any);

	text = trim.trim(text);

	return text;
}

export default function sanitize(
	input: string,
	options: Partial<TSanitizeOptions> | null = {},
) {
	const config: TSanitizeOptions = {
		replacement: "",
		slugify: undefined,
		...options,
	};

	const illegalRe = /[/?<>\\:*|":]/g;

	// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
	const controlRe = /[\x00-\x1f\x80-\x9f]/g;
	const reservedRe = /^\.+$/;
	const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

	let sanitized = input
		.replaceAll(/[()/]/g, " ")
		.replace(illegalRe, config.replacement)
		.replace(controlRe, config.replacement)
		.replace(reservedRe, config.replacement)
		.replace(windowsReservedRe, config.replacement);

	sanitized = truncate(sanitized, 255);

	if (config.slugify) {
		sanitized = slugify(sanitized, config.slugify);
	}

	if (config.replacement !== "") {
		sanitized = trim.trim(sanitized);
	}

	return sanitized;
}

export const sanitizeFileName = (originalName: string) =>
	sanitize(originalName, {
		replacement: "-",
		slugify: {
			any: "-",
			spases: "-",
		},
	});
