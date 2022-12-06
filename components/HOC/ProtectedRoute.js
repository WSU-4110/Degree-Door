import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [router, user])
  return(
    <>
      {children}
    </>
  )
};

export default ProtectedRoute;