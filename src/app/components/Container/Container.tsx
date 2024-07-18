import React, { CSSProperties } from "react";
import styles from "./Container.module.scss";

interface IContainer {
  className?: string;
  type?: "fluid";
  children: React.ReactNode;
  id?: string;
  style?: CSSProperties;
}

const Container: React.FC<IContainer> = (props: IContainer) => {
  const { children, className, type, id, style } = props;
  const getClassNames = (): string => {
    let classes = "";
    if (type === "fluid") {
      classes = classes + styles.ContainerFluid;
    } else {
      classes = classes + styles.Container;
    }
    if (className) {
      classes += className;
    }
    return classes;
  };
  return (
    <div
      className={`${
        type === "fluid" ? styles.ContainerFluid : styles.Container
      } ${className}`}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
