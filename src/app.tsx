import { faDownload, faExpandArrowsAlt, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContactCard, ContactCardProps } from "./components/contact-card";
import { VCard } from "./services/v-card";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";

function usePersistantState<T>(name: string, defaultValue: T) {
	const key = useRef(name)
	const [value, setState] = useState<T>(JSON.parse(localStorage.getItem(key.current) ?? 'null') ?? defaultValue);
	useEffect(() => {
		localStorage.setItem(key.current, JSON.stringify(value));
	}, [value]);

	return [value, setState] as [typeof value, typeof setState];
}

type FormData = ContactCardProps & {
	contactImageUrl: string;
	contactImage: string;
	role: string;
	organization: string;
	department: string;
	team: string;
	orgLogoUrl: string;
	orgLogo: string;
}

function App() {

	const [details, setDetails] = usePersistantState<FormData>('details', {
		color: '#340c8f',
		email: '',
		imageUrl: '',
		name: '',
		phone: '',
		title: '',
		contactImageUrl: '',
		contactImage: '',
		department: '',
		organization: '',
		team: '',
		role: '',
		orgLogoUrl: '',
		orgLogo: '',
	});
	const [editMode, setEditMode] = useState(!details.name);
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
	), [details.contactImage, details.department, details.email, details.name, details.orgLogo, details.organization, details.phone, details.role, details.team, details.title])

	const setField = useCallback((field: keyof typeof details) => {
		return (e: React.ChangeEvent<HTMLInputElement> | string) => {
			setDetails(prev => ({
				...prev,
				[field]: typeof e === 'string' ? e : e.target.value
			}))
		}
	}, [setDetails]);

	const updatePhotoSource = useMemo(() => setField('contactImage'), [setField])
	const updateOrgLogoSource = useMemo(() => setField('orgLogo'), [setField])

	useEffect(() => {
		console.log(atob(vCard))
	}, [vCard])

	if (editMode) {
		return <div className="container">
			<div className="bg-white rounded-4 border px-4 py-5 mt-3 mx-5">
				<div className="mb-3">
					<label className="fs-16" htmlFor="name">Name</label>
					<input id="name" value={details.name} onChange={setField('name')} type="text" className="form-control comfortaa" />
				</div>

				<div className="mb-3">
					<label className="fs-16" htmlFor="contactImageUrl">Contact Image Url <VisibleDevice/></label>
					<input id="contactImageUrl" value={details.contactImageUrl} onChange={setField('contactImageUrl')} type="text" className="form-control comfortaa" />
					{details.contactImageUrl &&
						<ImgBase64 src={details.contactImageUrl} width={64} height={64} setSrc={updatePhotoSource} />
					}
				</div>

				<div className="mb-3">
					<label className="fs-16">Job</label>
					<div className="ps-2 pt-2 border-top">
						<div className="mb-3">
							<label className="fs-16" htmlFor="organization">Organization <VisibleDevice/></label>
							<input id="organization" value={details.organization} onChange={setField('organization')} type="text" className="form-control comfortaa" />
						</div>
						<div className="mb-3">
							<label className="fs-16" htmlFor="department">Department <VisibleDevice/></label>
							<input id="department" value={details.department} onChange={setField('department')} type="text" className="form-control comfortaa" />
						</div>
						<div className="mb-3">
							<label className="fs-16" htmlFor="team">Team/Unit <VisibleDevice/></label>
							<input id="team" value={details.team} onChange={setField('team')} type="text" className="form-control comfortaa" />
						</div>

						<div className="mb-3">
							<label className="fs-16" htmlFor="title">Title</label>
							<input id="title" value={details.title} onChange={setField('title')} type="text" className="form-control comfortaa" />
						</div>
						<div className="mb-3">
							<label className="fs-16" htmlFor="role">Role <VisibleDevice/></label>
							<input id="role" value={details.role} onChange={setField('role')} type="text" className="form-control comfortaa" />
						</div>

						<label className="fs-16" htmlFor="orgLogoUrl">Logo Url</label>
						<input id="orgLogoUrl" value={details.orgLogoUrl} onChange={setField('orgLogoUrl')} type="text" className="form-control comfortaa" />
						{details.orgLogoUrl && <div className="row" style={{ maxWidth: '30rem' }}>
							<div className="col">
								<label className="fs-16" htmlFor="orgLogoUrl">Logo Online</label>
								<img src={details.orgLogoUrl} width={64} height={64} />
							</div>
							<div className="col">
								<label className="fs-16" htmlFor="orgLogoUrl">Logo in VCard</label>
								<ImgBase64 src={details.orgLogoUrl} width={64} height={64} setSrc={updateOrgLogoSource} />
							</div>
						</div>}
					</div>
				</div>

				<div className="mb-3">
					<label className="fs-16">Contact Information</label>
					<div className="ps-2 pt-2 border-top">

						<div className="mb-3">
							<label className="fs-16" htmlFor="email">Email Address</label>
							<input id="email" value={details.email} onChange={setField('email')} type="text" className="form-control comfortaa" />
						</div>
						<div className="mb-3">
							<label className="fs-16" htmlFor="phone">Phone Number</label>
							<input id="phone" value={details.phone} onChange={setField('phone')} type="text" className="form-control comfortaa" />
						</div>
					</div>
				</div>

				<div className="mb-3">
					<label className="fs-16">Contact Card Appearance <VisibleOnline /></label>
					<div className="ps-2 pt-2 border-top">
						<div className="mb-3">
							<label className="fs-16" htmlFor="color">Color</label>
							<div className="input-group">
								<input id="color" value={details.color} onChange={setField('color')} type="color" className="form-control comfortaa" />
								<input id="color2" value={details.color} onChange={setField('color')} type="text" className="form-control comfortaa" />
							</div>
						</div>
						<div className="mb-3">
							<label className="fs-16" htmlFor="imageUrl">Logo Url</label>
							<input id="imageUrl" value={details.imageUrl} onChange={setField('imageUrl')} type="text" className="form-control comfortaa" />
							{details.imageUrl &&
								<img src={details.imageUrl} width={64} height={64} />
							}


						</div>

					</div>
				</div>
				<button type="button" className="btn btn-success" onClick={() => setEditMode(false)}>Save</button>
			</div>
		</div>
	}

	return (
		<div className="d-flex h-100 justify-content-center align-items-center comfortaa">
			<div className={`position-relative ${expand ? 'expand' : ''}`}>
				<ContactCard {...details} />
				<div className="edit-button">
					<div className="d-flex">

						<button type="button" onClick={() => setEditMode(true)} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faPencil} /></button>
						<button type="button" onClick={() => setExpand(x => !x)} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faExpandArrowsAlt} /></button>
						{navigator.share && <button type="button" onClick={() => navigator.share({
							title: 'Share Contact Card',
							url: `data:text/vcard;base64,${vCard}`
						})} className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"><FontAwesomeIcon className="text-dark" icon={faShare} /></button>}
						<a className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow" href={`data:text/vcard;base64,${vCard}`} download={`${details.name}.vcf`}><FontAwesomeIcon className="text-dark" icon={faDownload} /></a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

const VisibleOnline = memo(() => <span className="fs-14 opacity-75">(Digital Only)</span>)
const VisibleDevice = memo(() => <span className="fs-14 opacity-75">(VCard Attribute)</span>)

function ImgBase64({ setSrc: pushSrc, ...props }: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { setSrc: (src: string) => void }) {

	const [src, setSrc] = useState('');

	useEffect(() => {
		if (!props.src) {
			setSrc('')
			return;
		}

		const img = new Image();
		img.onload = (() => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				return '';
			}
			ctx.drawImage(img, 0, 0);
			setSrc(canvas.toDataURL("image/png"));
		});

		img.setAttribute('crossorigin', 'anonymous');
		img.src = props.src;

	}, [props.src])

	useEffect(() => {
		pushSrc(src);
	}, [pushSrc, src])


	if (!src) return null;

	return <img {...props} src={src} />
}
