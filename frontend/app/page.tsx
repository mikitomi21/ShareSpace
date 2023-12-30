'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';

type Post = {
	author: {
		first_name: string;
		last_name: string;
	};
	title: string;
	text: string;
};

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [isToken, setIsToken] = useState(false);
	const [arePosts, setArePosts] = useState(false);
	useEffect(() => {
		const getPosts = async () => {
			let user = {
				password: 'password',
				email: 'admin@example.com',
			};

			const authFetch = await fetch(
				'http://localhost:8000/api/auth/token/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user),
				}
			);
			const tokenResponse = await authFetch.json();
			if (tokenResponse.auth_token) {
				setIsToken(true);
				fetch('http://localhost:8000/api/posts/', {
					headers: { Authorization: `Token ${tokenResponse.auth_token}` },
				})
					.then((res) => res.json())
					.then((res) => {
						if (res) {
							setArePosts(true);
							setPosts(res);
						}
					});
			}
		};
		getPosts();
	}, []);
	if (!posts)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Loading...
			</div>
		);
	if (!isToken) return <div style={{ color: 'white' }}>BAD TOKEN</div>;
	return (
		<>
			{posts.map((post, index) => {
				return (
					<div className={styles.post} key={index}>
						<div className={styles.user}>
							<div className={styles.user_avatar}></div>
							<h3 className={styles.user_name}>
								{post.author.first_name} {post.author.last_name}
							</h3>
						</div>
					</div>
				);
			})}
		</>
	);
}