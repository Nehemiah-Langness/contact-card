import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ContactCardProps = {
	name: string;
	color: string;
	imageUrl: string;
	title: string;
	email: string;
	phone: string;
}

export function ContactCard(props: ContactCardProps) {
	const rgb = props.color.length === 7 && props.color.startsWith('#') ? `${parseInt(props.color.substring(1, 3), 16)}, ${parseInt(props.color.substring(3, 5), 16)}, ${parseInt(props.color.substring(5, 7), 16)}` : '52, 12, 143'

	return (
		<div className="contact-card rounded-1 overflow-hidden d-flex flex-column position-relative"
			style={{ '--bs-primary': props.color, '--bs-primary-rgb': rgb } as React.CSSProperties}
		>
			<div className="d-flex flex-grow-1">
				<div className="branding d-flex justify-content-center align-items-center">
					{props.imageUrl ? <img src={props.imageUrl} /> :
						<div className="bg-primary flex-grow-1 align-self-stretch overflow-hidden position-relative">
							<div className='light x1'></div>
							<div className='light x2'></div>
							<div className='light x3'></div>
							<div className='light x4'></div>
							<div className='light x5'></div>
							<div className='light x6'></div>
							<div className='light x7'></div>
							<div className='light x8'></div>
							<div className='light x9'></div>
						</div>
					}
				</div>
				<div className="contact text-end flex-grow-1 p-2 py-4 d-flex flex-column">
					<div>
						{!!props.name && <div className="teko fs-18">{props.name}</div>}
						{!!props.title && <div className="comfortaa opacity-75 fs-8 mt-1">{props.title}</div>}
					</div>
					<div className="flex-grow-1"></div>
					<div>
						{!!props.email && <div className="d-flex mb-2 justify-content-end align-items-center">
							<div className="comfortaa fs-10">{props.email}</div> <FontAwesomeIcon className="ms-2 text-primary opacity-75" icon={faEnvelope} />
						</div>}
						{!!props.phone && <div className="d-flex mb-2 justify-content-end align-items-center">
							<div className="comfortaa fs-10">{props.phone}</div>  <FontAwesomeIcon className="ms-2 text-primary opacity-75" icon={faPhone} />
						</div>}
					</div>

				</div>
			</div>
			{props.imageUrl ?
				<div className="bg-primary pt-3"></div>
				: null}
		</div>
	);
}
