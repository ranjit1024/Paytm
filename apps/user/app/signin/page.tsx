"use client";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Error from "@repo/ui/toast"
import Loader from "@repo/ui/loader"
import { tr } from "framer-motion/client";
import { resolve } from "path";

const poppins = Poppins({
  subsets: ["latin"], // Supports Latin characters
  weight: ["100", "400"], // Choose font weights
  style: ["normal", "italic"], // Choose styles
  variable: "--font-poppins", // Optional: Use CSS variable
});

export default function () {
  const session = useSession();
  const router = useRouter();
  const serachParams = useSearchParams();

  const [email,setEmail] = useState("fsd");
  const [password,setPassword] = useState("fsdf");
  const error = serachParams.get("error");
  const [credentialsError, setShowCredentailError] = useState(false);
  const [credentialsBlank, setCredentailBlank] = useState(false);
  const [loading,setLoading] = useState(false);
  // const email = useState("");
  const res = async () => {
    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    })

    if(res?.error === "not match"){
      setShowCredentailError(true);
      return;
      
    }
  
    else if(res?.error == "password mismatch"){
      setShowCredentailError(true);
    
      return;
      
    }
    else if(res?.ok){
      router.push('/user/dashboard')
    }
  }
  

  return (
    <div className={`grid grid-cols-[50%,50%] h-[100vh] relative ${poppins.className}`}>
      
        {
          loading ? <Loader/>:null
        }
      
      {/* {error && <p className="text-red-500 mb-4">{getErrorMessage()}</p>} */}
      <div className="bg-[url('/safe.jpg')] bg-cover bg-center"></div>
      {
        credentialsError ? <Error data="Email or password is invalid"/>:null
      }
      {
        credentialsBlank?<Error data="Enter details"></Error>:null
      }

      <div className=" flex pl-20 text-gray-900 bg-gradient-to-b from-gray-50 to-blue-50  w-[100%]  flex-col shadow-lg bg-whi rounded-xl p-10 ">
        <div className="text-[7vh] mb-5">
          <div className="text-center w-[50%] m-auto pt-5 pb-12">
            <div className={`flex items-center justify-center  w-[20vh] `}>
             
            <div className="flex gap-1 items-center">
        <img width="30" height="40" src="https://img.icons8.com/pulsar-gradient/48/circled.png" alt="circled"/>
          
        <p className="font-normal  text-[1.5rem] bg-gradient-to-r from-blue-500  to-cyan-900 inline-block text-transparent bg-clip-text  ">PayTm</p>
      </div>
            </div>
          </div>
          <p className="text-[7vh] pb-2 text-slate-600 font-semibold">Welcome Back </p>
        </div>

        <div className="w-[90%] flex  flex-col space-y-6 ">
          
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">Email</label>
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300  ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="example@gmail.com"
              onChange={(e)=>{
                setEmail(e.target.value);

              }}
            />
          </div>

          

          <div className="w-full ">
            <label className="block mb-2 text-sm text-slate-600">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full pl-3 pr-3 py-2 bg-transparent shadow-sm placeholder:text-slate-400 text-slate-600 text-sm border border-slate-300 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow"
                placeholder="Your password"
                onChange={(e)=>[
                  setPassword(e.target.value)
                ]}
              />
              <p className="flex items-start mt-2 text-xs text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-1.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Use at least 8 characters, one uppercase, one lowercase and one
                number.
              </p>
            </div>
          </div>

          <div className="w-full">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-white font-semibold py-2 rounded-lg w-full"
              
              onClick={async()=>{
                setLoading(true)
                const response = await res()
                setLoading(false);

                setTimeout(()=>{
                  setShowCredentailError(false)
                },3000)
              
              }
              }
            >
              Sign in
            </button>
          </div>

          <div className="text-gray-600 -mt-3">
            <p>
              New to PayTm?{" "}
              <span
                onClick={() => {
                  router.push('/signup')
                  
                }}
                className="underline text-blue-900 hover:cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
