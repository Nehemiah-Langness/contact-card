import { useEffect, useMemo, useRef, useState } from "react";
import { EditForm } from "./components/edit-form";
import { ViewMode } from "./components/view-mode";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	useLocation,
	useNavigate
} from "react-router-dom";
import { FormData } from "./types/form-data";

function usePersistantState<T>(name: string, defaultValue: T) {
	const key = useRef(name)
	const [value, setState] = useState<T>(JSON.parse(localStorage.getItem(key.current) ?? 'null') ?? defaultValue);
	useEffect(() => {
		localStorage.setItem(key.current, JSON.stringify(value));
	}, [value]);

	return [value, setState] as [typeof value, typeof setState];
}

const router = createBrowserRouter(
	createRoutesFromElements(<Route path="/contact-card">
		<Route path='view' element={<View />} />
		<Route path='' element={<Index />} />
	</Route>)
);

function App() {

	return <RouterProvider router={router} />

}

export default App;

function View() {
	const { search } = useLocation();
	const data = useMemo(() => {
		const query = new URLSearchParams(search);
		return query.get('data')
	}, [search])
	const details = useMemo(() => data ? JSON.parse(data) as FormData : null, [data]);

	const navigate = useNavigate()
	useEffect(() => {
		if (!details) {
			navigate('/contact-card');
		}
	}, [details, navigate])

	if (!details) {
		return null;
	}

	return <ViewMode details={details} />
}

function Index() {
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

	if (editMode) {
		return <EditForm details={details} setDetails={setDetails} setEditMode={setEditMode} />
	}

	return <ViewMode details={details} setEditMode={setEditMode} />

}