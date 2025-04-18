import { Poppins } from "next/font/google"; 
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
export default function(){
    return <div className={`flex gap-1 items-center ${poppins.className} `}>
    <img width="30" height="40" src="https://img.icons8.com/pulsar-gradient/48/circled.png" alt="circled"/>
      
    <p className="font-normal  text-[1.5rem] bg-gradient-to-r from-blue-500  to-cyan-900 inline-block text-transparent bg-clip-text  ">PayTm</p>
  </div> 
}