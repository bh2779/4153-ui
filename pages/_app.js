import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "../components/Layout/Layout";

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
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MantineProvider>
	);
}
