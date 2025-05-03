import React, { useState} from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateToPastes, addToPastes} from "../Redux/PasteSlice";
function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch =useDispatch()

  const createPaste=()=>
  {
     const paste={
      title: title,
      content: value,
      _id: pasteId || 
       Date.now().toString(36),
       createdAt: new Date().toISOString(),
     }
     if(pasteId)
     {
      //update
      dispatch(updateToPastes(paste));
     }
     else{
     // create
     dispatch(addToPastes(paste));
     }
     // after createion or updation
     setTitle('');
     setValue('');
     setSearchParams({});
  // 
    }
  return (
    <div>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[74%] pl-4 Ar"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
           onClick={createPaste}
          className="p-2 rounded-2xl mt-2 ">
          {pasteId ? " Update My Paste" : " Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4, min-w-[700px] p-4 Ar"
          value={value}
          placeholder="Enter Content"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
}
export default Home;
