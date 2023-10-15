import { useFormik } from "formik";
import * as Yup from "yup";
import './PokemonStyle.css';

const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  
  const Login = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch('https://apingweb.com/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
  
          if (response.ok) {
            
            alert('Login Successful!');
            console.log(response);
          } else {
            
            alert('Login Failed');
            console.error(response);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    });
  
    return (
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="form-field" htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && <div className="error">{formik.errors.email}</div>}
          </div>
  
          <div>
            <label className="form-field" htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && <div className="error">{formik.errors.password}</div>}
          </div>
  
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  