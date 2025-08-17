import { NhostProvider, useAuthenticationStatus } from "@nhost/react";
import { ApolloProvider } from "@apollo/client";
import { nhost } from "./lib/nhost";
import { apolloClient } from "./lib/apollo";
import { AuthForm } from "./components/AuthForm";
import { ChatApp } from "./components/ChatApp";
import { ThemeProvider } from "./contexts/ThemeContext";

function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-foreground">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <ChatApp /> : <AuthForm />;
}

function App() {
  return (
    <ThemeProvider>
      <NhostProvider nhost={nhost}>
        <ApolloProvider client={apolloClient}>
          <AuthenticatedApp />
        </ApolloProvider>
      </NhostProvider>
    </ThemeProvider>
  );
}

export default App;
