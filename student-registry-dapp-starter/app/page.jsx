"use client";
import { useContractRead } from "@starknet-react/core";
import Balance from "./components/balance";
import Header from "./components/header";
import StudentsTable from "./components/students-table";
import StudentsTableControl from "./components/students-table-control";
import TotalStudents from "./components/total-students";
import { ABI } from "./abis/abi";
import { contractAddress } from "./lib/data";
import Loading from "./components/loading";
import { felt252ToString } from "./lib/helpers";

export default function Home() {
  const { data,
    isLoading: isLoadingStudents,
    isSuccess,
    refetch: refetchStudents,
    isFetching: isFetchingStudents
  } = useContractRead({
    functionName: "get_all_students",
    args: [],
    abi: ABI,
    address: contractAddress
  });


  return (
    <div className="py-[60px] px-[100px]">
      <Header />
      {isLoadingStudents ?
        <Loading message={"Getting all students..."} /> :
        (
          <div className="mt-[60px]">
            <div className="flex justify-between items-center">
              {isSuccess && <TotalStudents total={data?.length} />}
              <Balance />
            </div>

            <StudentsTable
              students={data?.map((student, i) => {
                return {
                  id: i + 1,
                  is_active: student.is_active,
                  age: Number(student.age),
                  fname: felt252ToString(student.fname),
                  lname: felt252ToString(student.lname),
                  phone_number: Number(student.phone_number),
                };
              })}
            />

            <StudentsTableControl
              count={data?.length}
              handleRefreshStudents={refetchStudents}
            />
          </div>
        )
      }
    </div>
  );
}
