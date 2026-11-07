/**
 * Volta a montar em cada navegação: dá a cada página uma entrada curta
 * (classe `page-enter` em home.css), a seguir à cortina de transição.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
