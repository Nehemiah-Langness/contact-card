import { ContactCardProps } from "../components/contact-card";


export type FormData = ContactCardProps & {
	contactImageUrl: string;
	contactImage: string;
	role: string;
	organization: string;
	department: string;
	team: string;
	orgLogoUrl: string;
	orgLogo: string;
};
