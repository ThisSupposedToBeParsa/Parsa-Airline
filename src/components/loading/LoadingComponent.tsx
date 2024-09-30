import styles from "./loadingcomponent.module.css";

const LoadingComponent = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <span className={styles.loader} />
    </div>
  );
};

export default LoadingComponent;
