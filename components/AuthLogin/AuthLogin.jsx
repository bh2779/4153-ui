import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Container, Text, Title } from "@mantine/core";

export default function AuthLogin() {
	const { data: session } = useSession();

	return (
		<Container
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
				backgroundColor: "#e0f7fa",
				borderRadius: "8px",
				textAlign: "center",
				margin: 5,
			}}
		>
			{session ? (
				<>
					<Title order={2} style={{ marginBottom: "1rem" }}>
						Welcome,{" "}
						<Text component="span" color="violet">
							{session.user.name}
							{session.user.accessToken}
						</Text>
					</Title>
					<Button
						variant="outline"
						color="red"
						size="lg"
						onClick={() => signOut()}
					>
						Sign Out
					</Button>
				</>
			) : (
				<>
					<Title order={3} style={{ marginBottom: "1rem", color: "#555" }}>
						Not signed in
					</Title>
					<Button
						variant="filled"
						color="blue"
						size="lg"
						onClick={() => signIn("google")}
					>
						Sign In with Google
					</Button>
				</>
			)}
		</Container>
	);
}
