import axios from "axios";
import React, {useState }from "react";
import { useNavigate } from "react-router-dom";
function Adduser()
{   
    const navigate= useNavigate();    
    const [formvalue, setFormvalue]= useState({title:'', description:'', price:'', contact:'',image_url:''});
    const [message, setMessage]= useState('');
    const [image, setImage] = useState(null);
    const handleInput =(e)=>{
        setFormvalue({...formvalue, [e.target.name]:e.target.value});
    }
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        setImage(null);
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);

      };
      reader.readAsDataURL(file);
    };
    

    const handleSubmit =async(e)=>{
         e.preventDefault();
         //console.log(formvalue);
         const formData= {title:formvalue.title, description:formvalue.description, price:formvalue.price,contact:formvalue.contact,image:image}; 
         const res= await axios.post("http://localhost/react/api/index.php",formData);
         //let jsonres= res.data.json();        
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
                    name="title"
                    value={formvalue.title}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formvalue.description}
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={formvalue.price}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">Contact Information</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={formvalue.contact}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImageChange}
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
