import Background from "../../health-insurance/components/background/Background";
import Footer from "../components/molecules/footer/Footer";
import Header from "../components/molecules/header/Header";
import { LayoutProps } from "../interfaces/layout";
import classes from "./layout.module.scss";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={`${classes.layout__main} ${classes.layout__mainMain}`}>
        <Background />
        {children}
      </main>
      <Footer />
    </div>
  );
}
