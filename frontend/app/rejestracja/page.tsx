'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import styles from '../lib/components/global/forms/forms.module.scss';
import useFetch from '../lib/hooks/useFetch';

export default function Registration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [error, setError] = useState('');

	const register = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!(password === confirmPassword))
			setError('Podane hasła różnią się od siebie!');

		const userCredentials = {
			email,
			username: userName,
			password,
		};

		const { response, status } = await useFetch(
			'/users/',
			'POST',
			{ 'Content-Type': 'application/json' },
			userCredentials
		);

		if (status === 201) {
			setError('Zarejestrowano pomyślnie!');
		} else if (response.status == 400) {
			const registerError = await response.json();
			if (registerError.email & registerError.usernmae)
				setError('Konto z takimi danymi już istnieje!');
			else if (registerError.email) setError('Podany adres email jest zajęty!');
			else if (registerError.username)
				setError('Podana nazwa użytkownika jest zajęta!');
			else if (registerError.password)
				setError(
					'Podana hasło jest zbyt proste! Użyj liter, cyfr i znaków specjalnych.'
				);
			else {
				setError('Wystąpił nieoczekiwany bład!');
			}
		} else {
			setError('Wystąpił nieoczekiwany bład!');
		}
	};

	return (
		<section className={styles.container}>
			<h3>Zarejestruj się</h3>
			<form className={styles.form} onSubmit={register}>
				<div className={styles.form_field}>
					<label htmlFor='userName'>Nazwa użytkownika</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='text'
							name='userName'
							id='userName'
							autoComplete='off'
							minLength={4}
							required
							autoFocus
							onChange={(e) => setUserName(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='email'>Email</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='email'
							name='email'
							id='email'
							autoComplete='off'
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='password'>Hasło</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='password'
							name='password'
							id='password'
							minLength={6}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='password'>Powtórz hasło</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='password'
							name='password'
							id='password'
							minLength={6}
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<button data-page='registration'></button>
				<div className={styles.swap_page}>
					<p>Masz już konto?</p>
					<Link href='/login'>Zaloguj się</Link>
				</div>
				<p className={styles.error}>{error}</p>
			</form>
		</section>
	);
}
