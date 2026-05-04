import React, { useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/base.css";
import "../src/fonts.css";

const THEME_OPTIONS = {
	light: {
		name: "Light",
		value: "light-palette",
	},
	dark: {
		name: "Dark",
		value: "dark-palette",
	},
} as const;

/**
 * Theme decorator that applies theme classes to the body and story container
 */
const WithThemeProvider: Decorator = (Story, context) => {
	const theme = context.globals.theme || THEME_OPTIONS.light.value;

	useEffect(() => {
		const body = document.body;
		const html = document.documentElement;

		Object.values(THEME_OPTIONS).forEach((t) => {
			body.classList.remove(t.value);
			html.classList.remove(t.value);
		});

		body.classList.add(theme);
		html.classList.add(theme);

		return () => {
			Object.values(THEME_OPTIONS).forEach((t) => {
				body.classList.remove(t.value);
				html.classList.remove(t.value);
			});
		};
	}, [theme]);

	return <Story />;
};

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Global theme for components",
		defaultValue: THEME_OPTIONS.light.value,
		toolbar: {
			icon: "paintbrush",
			// Array of plain string values or MenuItem shape
			items: [
				{
					value: THEME_OPTIONS.light.value,
					title: THEME_OPTIONS.light.name,
					icon: "sun",
				},
				{
					value: THEME_OPTIONS.dark.value,
					title: THEME_OPTIONS.dark.name,
					icon: "moon",
				},
			],
			// Change title based on selected value
			dynamicTitle: true,
		},
	},
};

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		// Remove backgrounds to disable the default background selector
		backgrounds: { disable: true },
	},
	globalTypes,
	decorators: [WithThemeProvider],
};

export default preview;
