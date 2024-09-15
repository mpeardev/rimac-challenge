import classes from "./footer.module.scss";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__logoDesktop}>
          <img src="/rimac-challenge/imgs/logo-white.svg" alt="logo-white" />
        </div>
        <div className={classes.footer__logoMobile}>
          <img
            src="/rimac-challenge/imgs/logo-white-mobile.svg"
            alt="logo-white"
          />
        </div>
        <div className={classes.footer__copyright}>
          <span>© 2023 RIMAC Seguros y Reaseguros.</span>
        </div>
      </div>
    </div>
  );
}
