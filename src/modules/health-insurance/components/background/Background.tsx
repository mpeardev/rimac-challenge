import classes from "./background.module.scss";

export default function Background() {
  return (
    <div className={classes.background}>
      <div className={classes.background__left}>
        <img src="/rimac-challenge/imgs/blur-asset-left.svg" alt="blur-left" />
      </div>
      <div className={classes.background__right}>
        <img
          src="/rimac-challenge/imgs/blur-asset-right.svg"
          alt="blur-right"
        />
      </div>
    </div>
  );
}
