'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { router } from 'better-auth/api';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const SignIn = () => {
	const { replace } = useRouter();

	async function handleSignIn() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/error',
		});
	}

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					replace('/dashboard');
				},
			},
		});
	}

	const { data: session, isPending, error, refetch } = authClient.useSession();
	return (
		<>
			<Button onClick={handleSignIn}>Continue with Google</Button>
			<Button onClick={handleSignOut}>Sign Out</Button>
			<Suspense fallback={<p>loading...</p>}>
				{!isPending && <p>{session?.user.email}</p>}
			</Suspense>
		</>
	);
};

export default SignIn;
