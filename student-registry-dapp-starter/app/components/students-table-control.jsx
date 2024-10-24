"use client";
import RefreshIcon from "../svg/RefreshIcon";
import Pagination from "./pagination";
import CloseIcon from "../svg/CloseIcon";
import { useRef, useState, useMemo } from "react";
import { ABI } from "../abis/abi";
import { contractAddress } from "../lib/data";

import {
  useSendTransaction,
  useContract,
  useNetwork,
  useAccount,
  useContractWrite,
  useExplorer,
  useWaitForTransaction,
} from "@starknet-react/core";
import { CallData } from "starknet";
import { HashLoader } from "react-spinners";



export default function StudentsTableControl({ count, handleRefreshStudents }) {
  const { address: userAddress } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi: ABI,
    address: contractAddress,
  });
  
    // Form State Values
    const addStudentPopover = useRef(null);
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
  
  
    // Submit Event Handler
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("surname: ", surname);
      console.log("firstName: ", firstName);
      console.log("phoneNumber: ", phoneNumber);
      console.log("age: ", age);
      writeAsync();
    };

// Contract Call Array
const calls = useMemo(() => {
  const isInputValid =
    userAddress &&
    contract &&
    firstName.length > 0 &&
    surname.length > 0 &&
    phoneNumber.length > 0 &&
    age;

  if (!isInputValid) return [];

  return contract.populateTransaction["add_student"](
    CallData.compile([firstName, surname, phoneNumber, age, 1])
  );
}, [contract, userAddress, firstName, surname, phoneNumber, age]);

const {
  writeAsync,
  data: writeData,
  isPending: writeIsPending,
} = useContractWrite({
  calls,
});


  //TODO: Contract Initialization

  //TODO: Contract Call Array

  // Loading State
  // const LoadingState = ({ message }) => (
  //   <div className="flex items-center space-x-2">
  //     <HashLoader size={16} color="#ffffff" />
  //     <span>{message}</span>
  //   </div>
  // );
  // const buttonContent = () => {
  //   if (writeIsPending) {
  //     return <LoadingState message="Sending" />;
  //   }

  //   if (waitIsLoading) {
  //     return <LoadingState message="Waiting for confirmation" />;
  //   }

  //   if (waitData && waitData.status === "REJECTED") {
  //     return <LoadingState message="Transaction rejected" />;
  //   }

  //   if (waitData) {
  //     return "Transaction confirmed";
  //   }

  //   return "Add Student";
  // };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4 text-sm">
          <button
            className="flex items-center gap-x-2 px-3 py-3 rounded-md bg-[#5B9EF7] text-white"
            onClick={handleRefreshStudents}
          >
            Refresh Students <RefreshIcon />
          </button>

          <button
            onClick={() => addStudentPopover.current?.showModal()}
            aria-haspopup="dialog"
            className="flex items-center gap-x-3 px-3 py-3 rounded-md border-[1px] border-[#F2F2F2] border-solid text-black"
          >
            Add New Student
          </button>
        </div>
        <Pagination count={count} />
      </div>
      <dialog
        ref={addStudentPopover}
        className="overflow-hidden rounded-[12px] bg-transparent lg:rounded-[24px]"
      >
        <form className="py-6 transition-all duration-500 ease-linear px-[26px] bg-white flex flex-col gap-y-6 border-[#F2F2F2] border-solid border-[1px] w-[557px] h-fit rounded-lg shadow-md text-sm leading-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Student</h2>
            <button
              onClick={() => addStudentPopover.current?.close()}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="surname" className="text-[#6F6F6F]">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter the student's surname"
              className="border-[1px] border-[#B7B7B7] rounded-2xl py-3 px-4"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="firstName" className="text-[#6F6F6F]">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter the student's first name"
              className="border-[1px] border-[#B7B7B7] rounded-2xl py-3 px-4"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="phoneNumber" className="text-[#6F6F6F]">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-[1px] border-[#B7B7B7] rounded-2xl py-3 px-4"
              placeholder="Enter the student's phone number"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="age" className="text-[#6F6F6F]">
              Age
            </label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-[1px] border-[#B7B7B7] rounded-2xl py-3 px-4"
              placeholder="Enter the student's age"
            />
          </div>
          <button
            className="w-full py-3 bg-[#5B9EF7] rounded-2xl text-base flex justify-center items-center leading-6 font-medium text-[#F9F9F9] mt-2 disabled:cursor-not-allowed disabled:bg-opacity-85"
            disabled={!surname || !firstName || !age || !phoneNumber}
            onClick={(e) => handleSubmit(e)}
          >
            {/* {buttonContent()} */}
            Add Student
          </button>
        </form>
      </dialog>
    </>
  );
}
