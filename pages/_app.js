import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
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
		</SessionProvider>
	);
}
