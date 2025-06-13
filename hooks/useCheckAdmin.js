import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast} from 'react-toastify';


const useCheckAdmin = () => {
    const router =useRouter()
    const [loading,setLoading]=useState(true)  //this is used fro wehn cheking is under process...so initailly its true
    
  useEffect(() => {
      const checkAdmin = async () => {

        const token = localStorage.getItem('TOKEN');
        if (!token) {
          router.push('/login');
          return;
        }
  
        const res = await fetch('/api/getusers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
  
        if ( !data.admin) {
          toast.error("UNAUTHORIZED ACCESS", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                  });
          router.push('/'); // or some "not authorized" page
        }else{
            setLoading(false)
        }
      };
  
      checkAdmin();
    }, [router]);
    return loading
  
};

export default useCheckAdmin;
