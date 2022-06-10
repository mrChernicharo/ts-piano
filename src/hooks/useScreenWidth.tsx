import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
	const [width, setWidth] = useState(0);

	function handleResize() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', () => {});
		};
	}, []);

	return {
		width,
	};
};
