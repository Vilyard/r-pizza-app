import React, { useState } from "react";
import Api from "../../Api";
const AdminPage = () => {
  const [name, setName] = useState("");
  const [_id, setId] = useState('');
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceBig, setPriceBig] = useState(0);
  const [image, setImage] = useState('');
  const handleIdChange = (e) => setId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
  const handlePriceBigChange = (e) => setPriceBig(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);
  
  const handleSubmit = () => {
    const pizza = { _id, name, priceSmall, priceBig, image };
    Api()
      .post("http://localhost:8080/pizzas", pizza)
      .then(() => alert("Success"))
      .catch((error) => console.log(error));
  };
  return (
    <div>
          <label>
              _id:
              <input type="text" name="_id" onChange={handleIdChange} />
          </label>
        <label>
          Име на пица:
          <input type="text" name="name" onChange={handleNameChange} />
        </label>
        <label>
        Цена за мала пиза:
        <input  type="number" name="priceSmall" onChange={handlePriceSmallChange}/>
        </label>
        <label>
            Цена за голема пица:
            <input  type="number" name="priceBig" onChange={handlePriceBigChange}/>
        </label>
        <label>
            Линк до слика:
            <input type="text" name="image" onChange={handleImageChange}/>
        </label>
        <button onClick={handleSubmit}>Add Pizza</button>
    </div>
  );
};

export default AdminPage;
