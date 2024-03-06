import { faContactBook, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
	return (
		<div className="d-flex h-100 justify-content-center align-items-center comfortaa">
			<div className="contact-card rounded-1 overflow-hidden d-flex flex-column">
				<div className="d-flex flex-grow-1">
					<div className="branding d-flex justify-content-center align-items-center">
						<FontAwesomeIcon style={{fontSize: '60pt'}} className="text-primary" icon={faContactBook}/>
					</div>
					<div className="contact text-end flex-grow-1 p-2 py-4 d-flex flex-column">
						<div>
							<div className="teko fs-18">Nehemiah Langness</div>
							<div className="comfortaa opacity-75 fs-8 mt-1">Senior Software Technical Lead</div>
						</div>
						<div className="flex-grow-1"></div>
						<div>
							<div className="d-flex mb-2 justify-content-end align-items-center">
								<div className="comfortaa fs-10">MyEmail@gmail.com</div> <FontAwesomeIcon className="ms-2 text-primary opacity-75" icon={faEnvelope} />
							</div>
							<div className="d-flex mb-2 justify-content-end align-items-center">
								<div className="comfortaa fs-10">555-123-4567</div>  <FontAwesomeIcon className="ms-2 text-primary opacity-75" icon={faPhone} />
							</div>
						</div>

					</div>
				</div>

				<div className="bg-primary pt-3"></div>

			</div>
		</div>
	);
}



export default App;
