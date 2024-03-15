type VCardData = {
    FN: string;
    GENDER?: 'M' | 'F';
    KIND?: 'individual' | 'group' | 'org' | 'location';
    PHOTO?: string;
    ADR?: {
        TYPE: string;
        PREF?: boolean;
        POBOX: string;
        EXT: string;
        STREET: string;
        LOCALITY: string;
        REGION: string;
        CODE: string;
        COUNTRY: string;
    }[];
    EMAIL?: {
        TYPE?: string;
        PREF?: boolean;
        VALUE: string;
    }[];
    TEL?: {
        TYPE?: ('text' | 'voice' | 'fax' | 'cell' | 'video' | 'pager')[];
        PREF?: boolean;
        VALUE: string;
        EXT?: string;
    }[];
    BDAY?: {
        YEAR: number;
        MONTH: number;
        DAY: number;
    };
    CATEGORIES?: string[];
    N?: {
        LAST: string;
        FIRST: string;
        MIDDLE: string[];
        PREFIX: string[];
        SUFFIX: string[];
    };
    NICKNAME?: string[];
    NOTE?: string;
    LOGO?: string;
    TITLE?: string;
    ROLE?: string;
    ORG?: {
        NAME: string;
        SUBDEPARTMENTS?: string[];
    }
    URL?: string;
}

export class VCard {
    constructor(public vcard: VCardData) { }

    toBase64() {
        const toString = [
            `BEGIN:VCARD`,
            `VERSION:4.0`,
            `FN:${this.formatText(this.vcard.FN)}`,
            this.vcard.N ? `N:${[
                this.formatText(this.vcard.N.LAST),
                this.formatText(this.vcard.N.FIRST),
                this.vcard.N.MIDDLE?.map(c => this.formatText(c)).join(',') ?? '',
                this.vcard.N.PREFIX?.map(c => this.formatText(c)).join(',') ?? '',
                this.vcard.N.SUFFIX?.map(c => this.formatText(c)).join(',') ?? ''
            ].join(';')}` : '',
            this.vcard.GENDER ? `GENDER:${this.formatText(this.vcard.GENDER)}` : '',
            this.vcard.KIND ? `KIND:${this.formatText(this.vcard.KIND)}` : '',
            this.vcard.NOTE ? `NOTE:${this.formatText(this.vcard.NOTE)}` : '',
            this.vcard.TITLE ? `TITLE:${this.formatText(this.vcard.TITLE)}` : '',
            this.vcard.ROLE ? `ROLE:${this.formatText(this.vcard.ROLE)}` : '',
            this.vcard.URL ? `URL:${this.vcard.URL}` : '',
            this.vcard.BDAY ? `BDAY:${this.vcard.BDAY.YEAR.toFixed().padStart(4, '0')}${this.vcard.BDAY.MONTH.toFixed().padStart(4, '0')}${this.vcard.BDAY.DAY.toFixed().padStart(4, '0')}` : '',
            this.vcard.ORG ? `ORG:${[this.vcard.ORG.NAME, ...this.vcard.ORG.SUBDEPARTMENTS ?? []].map(c => this.formatText(c)).join(';')}` : '',
            this.vcard.CATEGORIES ? `CATEGORIES:${this.vcard.CATEGORIES.map(c => this.formatText(c)).join(',')}` : '',
            this.vcard.NICKNAME ? `NICKNAME:${this.vcard.NICKNAME.map(c => this.formatText(c)).join(',')}` : '',
            ...(this.vcard.ADR ? this.vcard.ADR.map(adr => `ADR${adr.PREF ? ';PREF=1' : ''};TYPE=${this.formatText(adr.TYPE)}:${[adr.POBOX, adr.EXT, adr.STREET, adr.LOCALITY, adr.REGION, adr.CODE, adr.COUNTRY].map(c => this.formatText(c)).join(';')}`) : []),
            ...(this.vcard.EMAIL ? this.vcard.EMAIL.map(email => `EMAIL${email.PREF ? ';PREF=1' : ''}${email.TYPE ? `;TYPE=${this.formatText(email.TYPE)}` : ''}:${email.VALUE}`) : []),
            ...(this.vcard.TEL ? this.vcard.TEL.map(tel => `TEL;VALUE=URI${tel.PREF ? ';PREF=1' : ''}${tel.TYPE ? `;${tel.TYPE.map(t => `TYPE=${this.formatText(t).toUpperCase()}`).join(';')}` : ''}:tel:${formatPhone(tel.VALUE)}${tel.EXT ? `;ext=${this.formatText(tel.EXT)}` : ''}`) : []),
            this.vcard.LOGO ? `LOGO;ENCODING=BASE64;JPEG:${this.vcard.LOGO.split(',')[1]}` : '',
            this.vcard.PHOTO ? `PHOTO;ENCODING=BASE64;JPEG:${this.vcard.PHOTO.split(',')[1]}` : '',
            `\r\nEND:VCARD`,
        ]
            .filter(x => x)
            .map(x => wrapLine(x))
            .flat()
            .join('\r\n');

        return btoa(toString);
    }

    formatText(text?: string) {
        return text?.replace(/,/g, '\\,') ?? ''
    }
}

function wrapLine(line: string, length: number = 73) {
    let hasWrapped = false;
    const lines: string[] = [];
    let current = line;
    while (current.length > (length - (hasWrapped ? 1 : 0))) {
        lines.push((hasWrapped ? ' ' : '') + current.substring(0, length - (hasWrapped ? 1 : 0)));
        current = current.substring(length - (hasWrapped ? 1 : 0));
        hasWrapped = true;
    }

    lines.push((hasWrapped ? ' ' : '') + current);
    return lines
}

function formatPhone(number: string) {
    let stripped = number.split('').filter(x => x >= '0' && x <= '9').join('');
    if (!stripped.startsWith('+')) {
        stripped = '+1' + stripped;
    }

    return `${stripped.substring(0, 2)}-${stripped.substring(2, 5)}-${stripped.substring(5, 8)}-${stripped.substring(8)}`

}