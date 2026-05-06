'use client';
import { UploadIcon } from 'lucide-react';
import { Button } from './ui/button';
import { handleUpload } from '@/lib/actions';
import { Input } from './ui/input';
import { useRef } from 'react';

const FileUpload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<form action={handleUpload}>
			<Input
				type='file'
				name='file'
				ref={fileInputRef}
				accept='.csv'
				className='hidden'
				required
			/>
			<Button type='submit' onClick={() => fileInputRef.current?.click()}>
				<UploadIcon />
				Upload CSV
			</Button>
		</form>
	);
};

export default FileUpload;
