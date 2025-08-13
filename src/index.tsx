import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [style, setStyle] = useState(defaultArticleState);

	const resetStyles = (defaultStyles: typeof defaultArticleState) => {
		setStyle(defaultStyles);
	};

	const onChangeStyles = (e: any, newStyles: typeof defaultArticleState) => {
		e.preventDefault();
		setStyle(newStyles);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.contentWidth.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChangeStyles={onChangeStyles}
				resetStyles={resetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
