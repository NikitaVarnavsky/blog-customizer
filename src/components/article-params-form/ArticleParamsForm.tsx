import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { clsx } from 'clsx';

type ArticleParamsFormType = {
	setStyle: (newStyles: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	const { setStyle } = props;

	const asideRef = useRef<HTMLDivElement>(null);

	const [isOpenModal, setIsOpenModal] = useState(false);

	const [currentStyles, setCurrentStyles] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});

	const onChangeFontFamily = (e: OptionType) => {
		setCurrentStyles((prev) => ({
			...prev,
			fontFamilyOption: e,
		}));
	};

	const onChangeFontSize = (e: OptionType) => {
		setCurrentStyles((prev) => ({
			...prev,
			fontSizeOption: e,
		}));
	};

	const onChangeFontColor = (e: OptionType) => {
		setCurrentStyles((prev) => ({
			...prev,
			fontColor: e,
		}));
	};

	const onChangeBackgroundColor = (e: OptionType) => {
		setCurrentStyles((prev) => ({
			...prev,
			backgroundColor: e,
		}));
	};

	const onChangeContentWidth = (e: OptionType) => {
		setCurrentStyles((prev) => ({
			...prev,
			contentWidth: e,
		}));
	};

	const onResetStyles = () => {
		setCurrentStyles(defaultArticleState);
		setStyle(defaultArticleState);
	};

	const onChangeStyles = (
		e: FormEvent<HTMLFormElement>,
		newStyles: typeof defaultArticleState
	) => {
		e.preventDefault();
		setStyle(newStyles);
	};

	useOutsideClickClose({
		isOpen: isOpenModal,
		rootRef: asideRef,
		onChange: setIsOpenModal,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpenModal}
				onClick={() => {
					setIsOpenModal(!isOpenModal);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(
					styles.container,
					isOpenModal && styles.container_open
				)}>
				<form
					onSubmit={(e) => {
						onChangeStyles(e, currentStyles);
					}}
					onReset={onResetStyles}
					className={styles.form}>
					<div className={styles.spacing_50}>
						<Text
							as='h2'
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase={true}
							family='open-sans'>
							{'Задайте параметры'}
						</Text>
					</div>
					<div className={styles.spacing_50}>
						<Select
							selected={currentStyles.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(e) => onChangeFontFamily(e)}
							title='Шрифт'
						/>
					</div>
					<div className={styles.spacing_50}>
						<RadioGroup
							name={'fontSize'}
							options={fontSizeOptions}
							selected={currentStyles.fontSizeOption}
							title='Размер шрифта'
							onChange={(e) => onChangeFontSize(e)}
						/>
					</div>
					<div className={styles.spacing_50}>
						<Select
							selected={currentStyles.fontColor}
							options={fontColors}
							onChange={(e) => onChangeFontColor(e)}
							title='Цвет шрифта'
						/>
					</div>
					<div className={styles.spacing_50}>
						<Separator />
					</div>
					<div className={styles.spacing_50}>
						<Select
							selected={currentStyles.backgroundColor}
							options={backgroundColors}
							onChange={(e) => onChangeBackgroundColor(e)}
							title='Цвет фона'
						/>
					</div>
					<div className={styles.spacing_207}>
						<Select
							selected={currentStyles.contentWidth}
							options={contentWidthArr}
							onChange={(e) => onChangeContentWidth(e)}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
