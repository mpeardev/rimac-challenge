import Header from "../components/molecules/header/Header";
import { LayoutProps } from "../interfaces/layout";
import classes from "./layout.module.scss";

export default function QuoteLayout({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={`${classes.layout__main} ${classes.layout__mainQuote}`}>
        {children}
      </main>
    </div>
  );
}
