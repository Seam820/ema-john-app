import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import '../Shipment/Shipment.css'
import { UserContext } from '../../App';

const Shipment = () => {

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
      } = useForm()
      console.log(watch("example"));
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     const onSubmit = (data) =>
     console.log(data)

     console.log(watch("example"))

     return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="name" />
      {errors.name && <span className="error">This name is required</span>}

        <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="email" />
        {errors.email && <span className="error">This email is required</span>}

        <input {...register("address", { required: true })} placeholder="address" />
        {errors.address && <span className="error">This address is required</span>}

        <input {...register("phone", { required: true })} placeholder="phone" />
        {errors.phone && <span className="error">This phone number is required</span>}

      <input type="submit" />
    </form>
  )
};

export default Shipment;