import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protected Route — yalnız giriş etmiş istifadəçilərə icazə verir.
 * Giriş edilməmişsə login səhifəsinə yönləndirir,
 * login sonra geri qayıtmaq üçün `from` state-i ötürür.
 */
const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
