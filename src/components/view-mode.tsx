import { faDownload, faExpandArrowsAlt, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { ContactCard } from "./contact-card";
import { VCard } from "../services/v-card";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { FormData } from "../types/form-data";

export function ViewMode({ details, setEditMode }: { details: FormData; setEditMode?: React.Dispatch<React.SetStateAction<boolean>> }) {

	const [expand, setExpand] = useState(false);

	const vCard = useMemo(() => (
		new VCard({
			FN: details.name,
			EMAIL: details.email ? [
				{
					PREF: true,
					VALUE: details.email
				}
			] : undefined,
			PHOTO: details.contactImage,
			TITLE: details.title,
			ROLE: details.role,
			TEL: details.phone ? [
				{
					TYPE: ['cell', 'voice', 'text'],
					PREF: true,
					VALUE: details.phone
				}
			] : undefined,
			LOGO: details.orgLogo,
			ORG: details.organization ? {
				NAME: details.organization,
				SUBDEPARTMENTS: [details.department, details.team].filter(x => x)
			} : undefined
		}).toBase64()
	), [details.contactImage, details.department, details.email, details.name, details.orgLogo, details.organization, details.phone, details.role, details.team, details.title]);

	useEffect(() => {
		console.log(atob(vCard));
	}, [vCard]);


	return (
		<div className="d-flex h-100 justify-content-center align-items-center comfortaa">
			<div className={`position-relative ${expand ? 'expand' : ''}`}>
				<ContactCard {...details} />
				<div className="edit-button">
					<div className="d-flex">

						{setEditMode && <button type="button" onClick={() => setEditMode(true)} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faPencil} /></button>}
						<button type="button" onClick={() => setExpand(x => !x)} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faExpandArrowsAlt} /></button>
						{navigator.share && <button type="button" onClick={() => {
							const detailCopy = {...details} as Partial<FormData>;
							delete detailCopy['contactImage'];
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							delete (detailCopy as any)['image'];
							delete detailCopy['orgLogo'];
							const url = window.location.origin + '/contact-card/view?data=' + encodeURIComponent(JSON.stringify(detailCopy));
							console.log(url)
							return navigator.share({
								title: 'Share Contact Card',
								url: url
							}).catch(() => {
								window.location.href = url;
							});
						}} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faShare} /></button>}
						<a className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow" href={`data:text/vcard;base64,${vCard}`} download={`${details.name}.vcf`}><FontAwesomeIcon className="text-dark" icon={faDownload} /></a>
					</div>
				</div>
			</div>
		</div>
	);
}
