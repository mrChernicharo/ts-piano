import { RefObject, useEffect, useState } from 'react';

export const useElementWidth = (ref: RefObject<HTMLElement>) => {
	const [width, setWidth] = useState(0);

	function handleResize() {
		const elWidth = ref.current?.getBoundingClientRect().width!;
		setWidth(elWidth);
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
