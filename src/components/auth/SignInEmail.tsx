import {
	getAuth,
	inMemoryPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../firebase/client';
import { useState } from 'preact/hooks';

export default function SignInEmail() {
	const [active, setActive] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		try {
			setActive(true);
			const auth = getAuth(app);
			auth.setPersistence(inMemoryPersistence);
			const email = (document.getElementById('email') as HTMLInputElement)
				.value;
			const password = (document.getElementById('password') as HTMLInputElement)
				.value;

			if (!email || !password) {
				setError('Por favor, rellene todos los campos');
				setActive(false);
				setTimeout(() => {
					setError('');
				}, 2500);
				return;
			}

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();
			const response = await fetch('/api/auth/signin/', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (response.redirected) {
				window.location.assign(response.url);
			}
		} catch (error: any) {
			setActive(false);
			setError(error.message);
			setTimeout(() => {
				setError('');
			}, 2500);
		}
	};

	return (
		<>
			<button
				id="loginButton"
				type="button"
				onClick={handleSubmit}
				class={`w-full btn btn-primary ${
					active ? 'btn-disabled' : error ? 'btn-error' : ''
				}`}
			>
				<span id="loadingSpan" class={active ? 'loading' : ''}></span>
				Iniciar sesion
			</button>
			{error && (
				<div className="toast toast-center">
					<div role="alert" className="alert alert-error">
						<span class="icon-[codicon--error] text-2xl text-base-content" />
						<span>{error}</span>
					</div>
				</div>
			)}
		</>
	);
}
