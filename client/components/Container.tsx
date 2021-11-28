import { ReactNode } from "react";

interface IContainer {
  children: ReactNode;
}

const Container = ({ children }: IContainer) => {
  return (
    <div className="w-full min-h-full md:w-11/12 mx-auto max-w-screen-2xl pt-5 px-3 md:px-5">
      {children}
    </div>
  );
};

export default Container;
