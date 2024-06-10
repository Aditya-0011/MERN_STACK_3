import classes from "./Loading.module.css";

export default function Loading() {
  return (
    <div>
      <div className={classes.spinner}></div>
    </div>
  );
}
