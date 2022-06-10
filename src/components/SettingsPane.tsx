import { ChangeEvent } from 'react';
import { useSettingsContext } from '../hooks/useSettingsContext';
import '../styles/SettingsPane.scss';
interface ISettingsPaneProps {}

const visibleKeysOptions = [
	6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
];

export const SettingsPane: React.FC<ISettingsPaneProps> = props => {
	const { visibleKeys, setVisibleKeys } = useSettingsContext();

	function handleVisibleKeysChange(e: ChangeEvent<HTMLSelectElement>) {
		setVisibleKeys(+e.currentTarget.value);
	}

	return (
		<div id="SettingsPane">
			<label htmlFor="visibleKeys">Visible Keys</label>
			<select
				id="visibleKeys"
				onChange={handleVisibleKeysChange}
				value={visibleKeys}
			>
				{visibleKeysOptions.map(qtd => (
					<option key={qtd} value={qtd}>
						{qtd}
					</option>
				))}
			</select>
		</div>
	);
};
