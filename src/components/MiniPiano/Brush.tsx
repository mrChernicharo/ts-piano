import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettingsContext } from '../../hooks/useSettingsContext';
import { WHITE_NOTES_QTD } from '../../lib/constants';

interface Props {
	pianoWidth: number;
	screenWidth: number;
}

export default function Brush({ pianoWidth, screenWidth }: Props) {
	const { visibleKeys, setFirstVisibleNoteIndex } = useSettingsContext();

	const brushRef = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const [brushWidth, setBrushWidth] = useState(0);

	const updateBrush = useCallback(() => {
		setBrushWidth((visibleKeys / WHITE_NOTES_QTD) * pianoWidth);
		const nextPos = snapToClosestKey(x.get());
		x.updateAndNotify(nextPos);
	}, [visibleKeys, pianoWidth, screenWidth]);

	function snapToClosestKey(target: number) {
		const [leftLimit, rightLimit] = [0, pianoWidth - brushWidth];

		if (target <= 0) {
			setFirstVisibleNoteIndex(0);
			return leftLimit;
		}

		const keyWidth = pianoWidth / WHITE_NOTES_QTD;
		const targetKeyIdx = Math.round(target / keyWidth);
		const targetKeyPos = keyWidth * targetKeyIdx;

		setFirstVisibleNoteIndex(targetKeyIdx);

		if (target >= rightLimit) {
			return rightLimit;
		}

		return targetKeyPos;
	}

	useEffect(updateBrush, [visibleKeys, pianoWidth, screenWidth]);

	useEffect(() => {
		const brushOverflowed = x.get() + brushWidth > pianoWidth;

		if (brushOverflowed) {
			x.updateAndNotify(pianoWidth - brushWidth);
		}
	}, [brushWidth]);

	useEffect(() => {
		if (pianoWidth && screenWidth) {
			const mid = pianoWidth / 2;
			const centralPos = mid - brushWidth / 2;
			const initialBrushPos = snapToClosestKey(centralPos);
			x.updateAndNotify(initialBrushPos);
		}
	}, [brushRef.current]);

	return (
		<motion.div
			ref={brushRef}
			className="brush"
			drag="x"
			dragElastic={0.02}
			dragTransition={{
				modifyTarget: snapToClosestKey,
				timeConstant: 40,
			}}
			style={{
				width: brushWidth,
				x,
			}}
		></motion.div>
	);
}
