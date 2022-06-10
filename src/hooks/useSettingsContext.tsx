import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';

const VISIBLE_KEYS = 10;

interface ContextProps {
	children: ReactNode;
}

interface SettingsContext {
	visibleKeys: number;
	firstVisibleNoteIndex: number;
	setVisibleKeys: Dispatch<SetStateAction<number>>;
	setFirstVisibleNoteIndex: Dispatch<SetStateAction<number>>;
}

const SettingsContext = createContext<SettingsContext>({
	visibleKeys: VISIBLE_KEYS,
	firstVisibleNoteIndex: 0,
	setVisibleKeys: () => {},
	setFirstVisibleNoteIndex: () => {},
});

export const SettingsContextProvider = ({ children }: ContextProps) => {
	const [visibleKeys, setVisibleKeys] = useState(VISIBLE_KEYS);
	const [firstVisibleNoteIndex, setFirstVisibleNoteIndex] = useState(0);

	const context = {
		visibleKeys,
		setVisibleKeys,
		firstVisibleNoteIndex,
		setFirstVisibleNoteIndex,
	};

	return (
		<SettingsContext.Provider value={context}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettingsContext = () => {
	return useContext(SettingsContext);
};
