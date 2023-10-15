import { useFormik } from 'formik';
import './PokemonStyle.css';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('password')], 'Passwords must match').nullable(),
});
const SignUp = () => {
  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://apingweb.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
      
        if (response.ok) {
          alert('Registration Successful!');
          console.log(response);
        } else {
          let errorMessage = 'Registration Failed';
      
          
          try {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              errorMessage = `Registration Failed: ${errorData.message}`;
            }
          } catch (parseError) {
            console.error('Error parsing error response:', parseError);
          }
      
          alert(errorMessage);
          console.error('Error:', errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      
    },
  });


  console.log(formik);

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label className="form-field" htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
           
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div style={{ textAlign: 'left', color: 'red', fontSize: '14px', marginBottom: '1px' }}>
            {formik.errors.name}
          </div>}
        </div>

        <div>
          <label className="form-field" htmlFor="email">Email Address:</label>
          <input
            id="email"
            name="email"
            type="email"
           
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div style={{ textAlign: 'left', color: 'red', fontSize: '14px', marginBottom: '1px' }}>
            {formik.errors.email}
          </div>}
        </div>

        <div>
          <label className="form-field" htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && <div style={{ textAlign: 'left', color: 'red', fontSize: '14px', marginBottom: '1px' }}>
            {formik.errors.phone}
          </div>}
        </div>

        <div>
          <label className="form-field" htmlFor="phone">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div style={{ textAlign: 'left', color: 'red', fontSize: '14px', marginBottom: '1px' }}>
            {formik.errors.password}
          </div>}
        </div>

        <div>
          <label className="form-field" htmlFor="password_confirmation">Password Confirmation:</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            value={formik.values.password_confirmation}
          />
          {formik.errors.password_confirmation && <div style={{ textAlign: 'left', color: 'red', fontSize: '14px', marginBottom: '1px' }}>
            {formik.errors.password_confirmation}
          </div>}
        </div>
        <button type="submit">Submit</button>
      </form>
      
    </div>

  );

};
export default SignUp;