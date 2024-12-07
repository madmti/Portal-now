import { useState } from 'preact/hooks';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../../firebase/client';
import type { FirebaseAuthError } from 'firebase-admin/auth';

const auth = getAuth(app);

export default function ForgotPasswordSubmit() {
	const [active, setActive] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setActive(true);

		const email = (document.getElementById('email') as HTMLInputElement).value;

		if (!email) {
			setError('Correo no puede estar vacío');
			setActive(false);
			setTimeout(() => {
				setError('');
			}, 2500);
			return;
		}

		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			switch ((error as FirebaseAuthError).code) {
				case 'auth/invalid-email':
					setError('Correo inválido');
					break;
				default:
					setError('Error al enviar el correo');
			}
			setActive(false);
			setTimeout(() => {
				setError('');
			}, 2500);
		}

		window.location.href = '/auth/change-pass-sended/';
	};

	return (
		<>
			<button
				id="submitButton"
				type="button"
				onClick={handleSubmit}
				className={`btn btn-primary ${
					active ? 'btn-disabled' : error ? 'btn-error' : ''
				}`}
			>
				<span id="loadingSpan" class={active ? 'loading' : ''}></span>
				Enviar Correo
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
