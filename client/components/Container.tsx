import { ReactNode } from "react";

interface IContainer {
  children: ReactNode;
}

const Container = ({ children }: IContainer) => {
  return (
    <div className="w-full md:w-11/12 mx-auto max-w-screen-2xl">{children}</div>
  );
};

export default Container;
