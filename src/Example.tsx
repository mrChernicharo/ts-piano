import { motion, useElementScroll, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

export default function Example() {
	const ref = useRef(null);
	const [progress, setProgress] = useState(0);
	const { scrollYProgress } = useElementScroll(ref);
	const scale = useTransform(
		scrollYProgress,
		[0, 0.33, 0.66, 1],
		[0.5, 0.75, 0.5, 1]
	);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
	scrollYProgress.onChange(setProgress);

	useEffect(() => {
		console.log({ progress, scale, rotate });
	}, [progress, scale, rotate]);
	return (
		<>
			<div style={{ height: '50vh', padding: '5vh' }}>
				<div ref={ref} style={{ height: '100%', overflow: 'auto' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							height: '300vh',
							paddingTop: '18vh',
							backgroundImage:
								'linear-gradient(to bottom, #a8c0ff, #3f2b96)',
						}}
					>
						<h1 style={{ color: 'white' }}>Scroll me</h1>
					</div>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '50vh',
				}}
			>
				<motion.div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '25vh',
						height: '25vh',
						fontSize: 32,
						backgroundColor: 'hotpink',
						scale,
						rotate,
					}}
				>
					{(progress * 100.04).toFixed(2) + '%'}
				</motion.div>
			</div>
		</>
	);
}
