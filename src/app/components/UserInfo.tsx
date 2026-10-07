"use client";


import Link from "next/link";



const UserInfo = () => {

   


  return (
  
        <div className="flex gap-6 items-center">
          <Link href={"/signin"}>
            <button className="font-bold text-neutral-700 transition-colors hover:text-green-700 ">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/signup"}>
            {" "}
            <button className="btn  bg-green-600 rounded-md px-3 py-1.5 font-semibold text-white transition-colors hover:bg-green-800 cursor-pointer">
              সাইন আপ
            </button>
          </Link>
        </div>
   
    
  );
};

export default UserInfo;