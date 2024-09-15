import classes from "./header.module.scss";

export default function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.header__container}>
        <img src="/rimac-challenge/imgs/logo.svg" alt="logo" />
        <div className={classes.header__info}>
          <span>¡Compra por este medio!</span>
          <div>
            <img
              src="/rimac-challenge/icons/GlTelephoneSolid.svg"
              alt="telephone-icon"
            />
            <span>(01) 411 6001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
