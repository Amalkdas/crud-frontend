
"use client";


import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

import { useState } from 'react';
import './App.css'
import { Card } from "flowbite-react";


import { ToastContainer, toast } from 'react-toastify';
import { addapi, deleteapi, getapi, getspecificapi, updateapi } from '../services/allapi';
import { useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";





function App() {

  const [details, setdetails] = useState({
    "Name": '',
    "Position": '',
    "ID": '',
    "Dept": ''

  })

 
  const [openModal, setOpenModal] = useState(false);

  const [specificdata, setspecificdata] = useState()


  const [fromserv, setfromserv] = useState([])


  const add = async () => {

    if (!details.Name || !details.Position || !details.ID || !details.Dept) {
      toast.warn("Please Fill all Fields", {
        position: 'top-center'
      })
    }
    else {
      try {

        const result = await addapi(details);
        console.log(result);


        if (result.status == 201) {
          toast.success("Successfully added", {
            position: 'top-center'
          })

          getfromserver()
          setdetails({

            "Name": '',
    "Position": '',
    "ID": '',
    "Dept": ''

          })

        }
        console.log(fromserv);


      }
      catch (err) {
        console.log(err);

      }
    }
  }
  console.log(details);

  //get from server //


  const getfromserver = async () => {

    try {
      const result = await getapi();
      console.log(result);


      if (result.status == 200) {

        setfromserv(result.data)

      }

    }
    catch (err) {
      console.log(err);

    }




  }

  useEffect(() => {
    getfromserver()
  }, [])

  //deleteapi//


  const del = async (id) => {

    try {

      const result = await deleteapi(id)
      console.log(result);

      if(confirm("Are You Sure ?")){

         if (result.status == 200) {
        toast.success("Successfully deleted", {
          position: 'top-center'
        },1000)

        getfromserver()
      }


    }

      }

     
    catch (err) {
      console.log(err);

    }



  }

  const specific = async (id) => {

    try{
      const result = await getspecificapi(id)

    console.log(result);

    if (result.status == 200) {
      setspecificdata(result.data)
    }

    }
    catch(err){
      console.log(err);
      
    }

    


  }

  const update = async(id)=>{
    try{

      const result = await updateapi(id,specificdata)
console.log(result);

if(result.status==200){
  toast.success("Successfully Updated",{
    position:'top-center'
  })
  setOpenModal(false)
  getfromserver()
}


    }
    catch(err){
      console.log(err);
      

    }
  }


  return (
    <>
      <div className='w-full flex flex-col h-full justify-center p-10 '></div>
      <h1 class="text-4xl font-bold ">    CRUD   </h1>

      <div className='flex gap-5 flex-col  items-center  justify-center p-10'>
        <input type="text" onChange={(e) => setdetails({ ...details, Name: e.target.value })} value={details.Name}
 className='!bg-white rounded w-72 px-3 py-2 placeholder:text-gray-500 placeholder:text-sm text-black ' placeholder='Name' />
        <input type="text" onChange={(e) => setdetails({ ...details, Position: e.target.value })} value={details.Position}
 className='!bg-white rounded w-72 px-3 py-2 placeholder:text-gray-500 placeholder:text-sm text-black ' placeholder='Position' />
        <input type="text" onChange={(e) => setdetails({ ...details, ID: e.target.value })} value={details.ID}
 className='!bg-white rounded w-72 px-3 py-2 placeholder:text-gray-500 placeholder:text-sm text-black ' placeholder='ID' />
        <input type="text" onChange={(e) => setdetails({ ...details, Dept: e.target.value })} value={details.Dept}
 className='!bg-white rounded w-72 px-3 py-2 placeholder:text-gray-500 placeholder:text-sm text-black' placeholder='Department' />

        

        <button className="bg-blue-600 hover:text-white hover:border hover:border-blue-500 hover:bg-transparent text-white px-4 py-3 text-xs rounded mt-2" onClick={add} >ADD</button>


      </div>

      <div className='w-full flex flex-wrap p-10 gap-15 justify-center'>

        {

          fromserv.length > 0 && fromserv.map((item) => (


            <Card href="#" className=" w-92 h-72  !bg-gray-700">
              <div className='flex flex-col justify-center gap-3 '>

                <div className='flex gap-4 items-center px-10'>

                  <h1 className='text-xl font-bold'>Name :</h1>  <p className="text-xs">{item.Name}</p>
                </div>


                <div className='flex gap-5 items-center px-10'>

                  <h1 className='text-lg font-bold '>Position :</h1>  <p className="text-xs">{item.Position}</p>
                </div>


                <div className='flex gap-5 items-center px-10'>
                  <h1 className='text-xl font-bold'>ID :</h1>  <p className="text-xs">{item.ID}</p></div>
                <div className='flex gap-5 items-center px-10'>
                  <h1 className='text-xl font-bold'>Dept :</h1>  <p className="text-xs">{item.Dept}</p></div>

                <div className='flex gap-4 items-center mt-4 justify-center'>

                  <button className="bg-blue-500 text-white px-4 py-3 rounded" onClick={() => {specific(item.id);setOpenModal(true);}}  ><MdEdit /></button>

                  <button className="bg-red-500 text-white px-4 py-3 rounded" onClick={() => del(item.id)} ><MdDelete /></button>

                  

                 
                </div>





              </div>
            </Card>



          ))




        }


      </div>
      {/* //modal// */}

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl" theme={{
        content:{
          base:'w-96  rounded !bg-gray-800 h-96 rounded '
        }
      }}>
        
        <ModalBody className="">

          <div className='flex flex-col gap-5  items-center justify-center p-10 rounded  bg-gray-700  h-full w-full'>

            <h1 className="text-white font-semibold">Edit Details</h1>
                <input type="text" className='w-full p-2  outline-none text-black bg-white rounded text-xs ' onChange={(e) => setspecificdata({ ...specificdata, Name: e.target.value })} value={specificdata?.Name} />
                <input type="text" className=' w-full p-2  outline-none text-black bg-white rounded text-xs ' onChange={(e) => setspecificdata({ ...specificdata, Position: e.target.value })} value={specificdata?.Position} />
                <input type="text" className='w-full p-2  outline-none text-black bg-white rounded text-xs ' onChange={(e) => setspecificdata({ ...specificdata, ID: e.target.value })} value={specificdata?.ID} />
                <input type="text" className='w-full p-2  outline-none text-black bg-white rounded text-xs' onChange={(e) => setspecificdata({ ...specificdata, Dept: e.target.value })} value={specificdata?.Dept} />


                <div className="flex gap-4 mt-5">
                
                  <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded" onClick={()=>update(specificdata.id)}>Update</button>

                  <button className="bg-black text-white rounded px-4 py-2 text-xs" onClick={()=>setOpenModal(false)}>Close</button>
                </div>
                
              </div>
          
        </ModalBody>
       
      </Modal>




































     






      <ToastContainer />
    </>
  )
}

export default App
