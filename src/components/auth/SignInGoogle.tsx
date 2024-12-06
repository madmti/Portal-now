import {
	getAuth,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { app } from "@firebase/client";
import { useState } from 'preact/hooks';

export default function SignInGoogle() {
	const [active, setActive] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		try {
			setActive(true);

			const auth = getAuth(app);
			auth.setPersistence(inMemoryPersistence);
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const idToken = await userCredential.user.getIdToken();
			const res = await fetch('/api/auth/signin/', {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (res.redirected) {
				window.location.assign(res.url);
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
				id="google"
				type="button"
				onClick={handleSubmit}
				class={`btn gap-2 bg-gray-5 ${
					active ? 'btn-disabled' : error ? 'btn-error' : ''
				}`}
			>
				<span id="loadingSpan" class={active ? 'loading' : ''}></span>
				<span class="icon-[flat-color-icons--google] text-2xl"></span>
				<span>Google</span>
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
