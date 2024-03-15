import React, { useCallback, useMemo } from "react";
import { ImgBase64 } from "./img-base-64";
import { VisibleOnline } from "./visible-online";
import { VisibleDevice } from "./visible-device";
import { FormData } from "../types/form-data";

export function EditForm({ details, setDetails, setEditMode }: { details: FormData; setDetails: React.Dispatch<React.SetStateAction<FormData>>; setEditMode: React.Dispatch<React.SetStateAction<boolean>> }) {
	const setField = useCallback((field: keyof typeof details) => {
		return (e: React.ChangeEvent<HTMLInputElement> | string) => {
			setDetails(prev => ({
				...prev,
				[field]: typeof e === 'string' ? e : e.target.value
			}));
		};
	}, [setDetails]);
	const updatePhotoSource = useMemo(() => setField('contactImage'), [setField]);
	const updateOrgLogoSource = useMemo(() => setField('orgLogo'), [setField]);

	return (<div className="container">
		<div className="bg-white rounded-4 border px-4 py-5 mt-3 mx-5">
			<div className="mb-3">
				<label className="fs-16" htmlFor="name">Name</label>
				<input id="name" value={details.name} onChange={setField('name')} type="text" className="form-control comfortaa" />
			</div>

			<div className="mb-3">
				<label className="fs-16" htmlFor="contactImageUrl">Contact Image Url <VisibleDevice /></label>
				<input id="contactImageUrl" value={details.contactImageUrl} onChange={setField('contactImageUrl')} type="text" className="form-control comfortaa" />
				{details.contactImageUrl &&
					<ImgBase64 src={details.contactImageUrl} width={64} height={64} setSrc={updatePhotoSource} />}
			</div>

			<div className="mb-3">
				<label className="fs-16">Job</label>
				<div className="ps-2 pt-2 border-top">
					<div className="mb-3">
						<label className="fs-16" htmlFor="organization">Organization <VisibleDevice /></label>
						<input id="organization" value={details.organization} onChange={setField('organization')} type="text" className="form-control comfortaa" />
					</div>
					<div className="mb-3">
						<label className="fs-16" htmlFor="department">Department <VisibleDevice /></label>
						<input id="department" value={details.department} onChange={setField('department')} type="text" className="form-control comfortaa" />
					</div>
					<div className="mb-3">
						<label className="fs-16" htmlFor="team">Team/Unit <VisibleDevice /></label>
						<input id="team" value={details.team} onChange={setField('team')} type="text" className="form-control comfortaa" />
					</div>

					<div className="mb-3">
						<label className="fs-16" htmlFor="title">Title</label>
						<input id="title" value={details.title} onChange={setField('title')} type="text" className="form-control comfortaa" />
					</div>
					<div className="mb-3">
						<label className="fs-16" htmlFor="role">Role <VisibleDevice /></label>
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
							<img src={details.imageUrl} width={64} height={64} />}


					</div>

				</div>
			</div>
			<button type="button" className="btn btn-success" onClick={() => setEditMode(false)}>Save</button>
		</div>
	</div>);
}
