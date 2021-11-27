import type { GetServerSideProps, NextPage } from "next";
import axiosInstance from "../axios/axiosInstance";
import Head from "next/head";
import Image from "next/image";
import { MembersResponse } from "../interfaces";
import { AxiosError } from "axios";

interface HomeProps {
  members: MembersResponse;
  error: AxiosError;
}

const Home: NextPage<HomeProps> = ({ members, error }) => {
  console.log(members);
  console.log(error);

  return <div className="">Test</div>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axiosInstance.get("/hololive");
    const members: MembersResponse = res.data;
    return { props: { members: members, error: null } };
  } catch (error) {
    console.log(error);
    let errorMsg: string = "";
    const err = error as AxiosError;
    if (err.isAxiosError) {
      errorMsg = err.message;
      console.log(errorMsg);
    } else {
      errorMsg = "Error";
    }

    return { props: { members: null, error: errorMsg } };
  }
};

export default Home;
