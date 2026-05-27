export default class TrimPhp {
	/**
	 * Strip whitespace (or other characters) from the beginning of a string.
	 * @param str The string that will be trimmed.
	 * @param charList Optionally, the stripped characters can also be specified
	 *                 using the charList parameter. Simply list all characters
	 *                 that you want to be stripped.
	 * @returns Returns the modified string.
	 */
	lTrim(str: string, charList?: string): string {
		let chars = !charList ? " \\s\u00A0" : `${charList}`;
		chars = chars.replace(/([[\]().?/*{}+$^:])/g, "$1");

		const regex = new RegExp(`^[${chars}]+`, "g");

		return `${str}`.replace(regex, "");
	}

	/**
	 * Strip whitespace (or other characters) from the end of a string.
	 * @param str The string that will be trimmed.
	 * @param charList Optionally, the stripped characters can also be specified
	 *                 using the charList parameter. Simply list all characters
	 *                 that you want to be stripped.
	 * @returns Returns the modified string.
	 */
	rTrim(str: string, charList?: string): string {
		let chars = !charList ? " \\s\u00A0" : `${charList}`;
		chars = chars.replace(/([[\]().?/*{}+$^:])/g, "\\$1");

		const regex = new RegExp(`[${chars}]+$`, "g");

		return `${str}`.replace(regex, "");
	}

	/**
	 * Strip whitespace (or other characters) from the beginning and end of a string.
	 * @param str The string that will be trimmed.
	 * @param charList Optionally, the stripped characters can also be specified
	 *                 using the charList parameter. Simply list all characters
	 *                 that you want to be stripped.
	 * @returns Returns the modified string.
	 */
	trim(str: string, charList?: string): string {
		const whitespaceList: string[] = [
			" ",
			"\n",
			"\r",
			"\t",
			"\f",
			"\x0b",
			"\xa0",
			"\u2000",
			"\u2001",
			"\u2002",
			"\u2003",
			"\u2004",
			"\u2005",
			"\u2006",
			"\u2007",
			"\u2008",
			"\u2009",
			"\u200a",
			"\u200b",
			"\u2028",
			"\u2029",
			"\u3000",
		];

		let finalString = "";
		let whitespace = whitespaceList.join("");
		let l = 0;
		let i = 0;

		let trimmedStr = `${str}`;
		if (charList) {
			whitespace = `${charList}`.replace(/([[\]().?/*{}+$^:])/g, "$1");
		}

		l = trimmedStr.length;
		for (i = 0; i < l; i += 1) {
			if (whitespace.indexOf(trimmedStr.charAt(i)) === -1) {
				trimmedStr = trimmedStr.substring(i);
				break;
			}
		}

		l = trimmedStr.length;
		for (i = l - 1; i >= 0; i -= 1) {
			if (whitespace.indexOf(trimmedStr.charAt(i)) === -1) {
				trimmedStr = trimmedStr.substring(0, i + 1);
				break;
			}
		}

		if (whitespace.indexOf(trimmedStr.charAt(0)) === -1) {
			finalString = trimmedStr;
		}

		return finalString;
	}
}
