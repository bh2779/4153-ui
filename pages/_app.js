import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }) {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Component {...pageProps} />
		</MantineProvider>
	);
}
