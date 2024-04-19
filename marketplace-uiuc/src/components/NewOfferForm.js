// NewOfferForm.js
import axios from "axios";
import React, {useState }from "react";
import { useNavigate } from "react-router-dom";
function Adduser()
{  
   const navigate= useNavigate();   
   const[title, setTitle]= useState('');
   const[description, setDescription]= useState('');
   const[price, setPrice]= useState('');
   const[contact,setContact] = useState('');
   const [message, setMessage]= useState('');
   const[pfile, setPfile]= useState('');
   
   const handleSubmit =async(e)=>{
        e.preventDefault();
        //console.log(formvalue);
        const formData= {title:title, description:description, price:price,contact:contact,pfile:pfile};
        const res= await axios.post("http://localhost/react/api/index.php", formData, {
         headers:{'Content-Type':"multipart/form-data"},
        });       
          if(res.data.success)
          {
           setMessage(res.data.success);
          }
   }
       return (
         <div className="card mt-4">
           <div className="card-body">
             <h5 className="card-title">Submit a New Offer</h5>
             <form onSubmit={handleSubmit}>
               {/* Existing form fields for title, description, price, and contact */}
               <div className="form-group">
                 <label htmlFor="title">Title</label>
                 <input
                   type="text"
                   className="form-control"
                   onChange={(e)=>setTitle(e.target.value)}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="description">Description</label>
                 <textarea
                   className="form-control"
                   onChange={(e)=>setDescription(e.target.value)}
                   required
                 ></textarea>
               </div>
               <div className="form-group">
                 <label htmlFor="price">Price</label>
                 <input
                   type="text"
                   className="form-control"
                   onChange={(e)=>setPrice(e.target.value)}
                   required
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="contact">Contact Information</label>
                 <input
                   type="text"
                   className="form-control"
                   onChange={(e)=>setContact(e.target.value)}
                   required
                 />
               </div>


               <div className="form-group">
                 <label htmlFor="image">Image</label>
                 <input
                   type="file"
                   className="form-control"
                   onChange={(e)=>setPfile(e.target.files[0])}
                   accept="image/*" // Accept only image files
                   required
                 />
               </div>
               
               <button type="submit" className="btn btn-primary">Submit Offer</button>
             </form>
           </div>
         </div>
 );
};
export default Adduser;
