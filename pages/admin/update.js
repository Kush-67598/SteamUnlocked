import React, { useState } from "react";
const update = () => {

  return (
    <>
        <form onSubmit={handleUpdate}>
    <div className="flex flex-col gap-5 bg-black placeholder:text-white">


        <h1 className="text-white">update page for price </h1>
        <input name="id" type="text" placeholder="id"   onChange={handleChange} value={id}/>
        <input name="price" type="text" placeholder="price" onChange={handleChange}  value={price} />
        <button className="bg-yellow-700" type="submit">Update</button>
    </div>
        </form>
    
    </>
  )
};

export default update;
