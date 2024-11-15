import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: "Verdana, sans-serif",
				fontFamilyMonospace: "Monaco, Courier, monospace",
				headings: { fontFamily: "Greycliff CF, sans-serif" },
			}}
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}
