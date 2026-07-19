import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Home } from "lucide-react";

 export default function HomeLink({href="/", children="Home"}) {
return(
    <Link
     href ={href}
     className=" inline-flex items-center gap-3 rounded-full bg-blue-50 px-5 py-3 text-blue-600
                font-semibold shadow-sm hover:bg-blue-100 transition-all duration-200">
                    <ChevronLeft className="h-5 w-5 sticky top-0" />
                       <Home className="w-6 h-6" />
                    {children}
    </Link>          
)
 }