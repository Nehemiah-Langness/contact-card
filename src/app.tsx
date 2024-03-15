import { faExpandArrowsAlt, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
}

function App() {

	const [details, setDetails] = usePersistantState<FormData>('details', { color: '#340c8f', email: '', imageUrl: '', name: '', phone: '', title: '', contactImageUrl: '' });
	const [editMode, setEditMode] = useState(!details.name);
	const [expand, setExpand] = useState(false);
	const vCard = useMemo(() => (
		new VCard({
			FN: details.name,
			EMAIL: details.email ? [
				{
					TYPE: 'personal',
					PREF: true,
					VALUE: details.email
				}
			] : undefined,
			PHOTO: details.contactImageUrl,
			ROLE: details.title,
			TEL: details.phone ? [
				{
					TYPE: ['voice'],
					PREF: true,
					VALUE: details.phone
				}
			] : undefined
		}).toBase64()
	), [details.contactImageUrl, details.email, details.name, details.phone, details.title])

	const setField = useCallback((field: keyof typeof details) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setDetails(prev => ({
				...prev,
				[field]: e.target.value
			}))
		}
	}, [setDetails])

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
					<label className="fs-16" htmlFor="title">Title</label>
					<input id="title" value={details.title} onChange={setField('title')} type="text" className="form-control comfortaa" />
				</div>
				<div className="mb-3">
					<label className="fs-16" htmlFor="email">Email Address</label>
					<input id="email" value={details.email} onChange={setField('email')} type="text" className="form-control comfortaa" />
				</div>
				<div className="mb-3">
					<label className="fs-16" htmlFor="phone">Phone Number</label>
					<input id="phone" value={details.phone} onChange={setField('phone')} type="text" className="form-control comfortaa" />
				</div>

				<div className="mb-3">
					<label className="fs-16" htmlFor="color">Color</label>
					<div className="input-group">
						<input id="color" value={details.color} onChange={setField('color')} type="color" className="form-control comfortaa" />
						<input id="color2" value={details.color} onChange={setField('color')} type="text" className="form-control comfortaa" />
					</div>
				</div>
				<div className="mb-3">
					<label className="fs-16" htmlFor="imageUrl">Image Url</label>
					<input id="imageUrl" value={details.imageUrl} onChange={setField('imageUrl')} type="text" className="form-control comfortaa" />
				</div>

				<div className="mb-3">
					<label className="fs-16" htmlFor="contactImageUrl">Contact Image Url</label>
					<input id="contactImageUrl" value={details.contactImageUrl} onChange={setField('contactImageUrl')} type="text" className="form-control comfortaa" />
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
						<a className="mx-1 btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow" href={`data:text/vcard;base64,${vCard}`} download={`${details.name}.vcf`}><FontAwesomeIcon className="text-dark" icon={faShare} /></a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
