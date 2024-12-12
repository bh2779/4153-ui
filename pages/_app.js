import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "../components/Layout/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth from "../components/Auth/Auth";

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
			<GoogleOAuthProvider clientId="26578956602-6emt639ln8lfrh38dtfouakc17m8l2hc.apps.googleusercontent.com">
          		<Auth></Auth>
        	</GoogleOAuthProvider>
		</MantineProvider>
	);
}
