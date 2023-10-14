import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { DataContext } from '../DataContext';
const SidebarContext = createContext()
export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const {hellodata} = useContext(DataContext);
   
    return (
        <aside className={`w-72 lg:w-20 h-screen bg-[#081730] text-white border-r shadow-sm ${expanded ? 'lg:w-72' : ''}` }>
        
            <nav className="h-full flex flex-col border-r shadow-sm ">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={require("../img/MuzicLogo.png")}
                        className={`overflow-hidden transition-all ${expanded ? "w-10" : "w-0"
                            }`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-black-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{hellodata.user}</h4>
                            <span className="text-xs text-white-600">{hellodata.userDetails.email}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext)
    const navigate = useNavigate();
    const handleClick = () => {
        // Navigate to the appropriate page based on text or a unique identifier
        if (text === 'Dashboard') {
          navigate('/dashboard');
        } else if (text === 'Meditation') {
          navigate('/meditation');
        } else if (text === 'Chatbot') {
          navigate('/chatbot');
        } else if (text === 'Directory') {
          navigate('/directory');
        } else {
          // Handle other cases or routes if needed
        }
      };
    
    return (
        <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        hover:bg-indigo-50 hover:text-black text-white
    `}
        >
            {icon}
            <span
                onClick={handleClick}
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-red-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                onClick={handleClick}
                >
                    {text}
                </div>
            )}
        </li>
    )
}