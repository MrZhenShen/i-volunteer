import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export { PrivateRoute };

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { token } = useSelector(x => x.auth);

  useEffect(() => {
    if (!token) {
      navigate('/auth/sign-in');
    }
  }, [token, navigate]);

  return children;
}
