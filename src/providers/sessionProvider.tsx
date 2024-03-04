import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * O componente NextAuthSessionProvider envolve a aplicação com o SessionProvider do NextAuth,
 * que fornece o contexto da sessão para toda a aplicação.
 * @param children O conteúdo da aplicação que será envolvido pelo SessionProvider.
 */
export default function NextAuthSessionProvider({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
