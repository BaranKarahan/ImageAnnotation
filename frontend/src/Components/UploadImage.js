import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import "./UploadImage.css"

const UploadImage = () =>{

    const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0].name);
    let temp_url = URL.createObjectURL(file);
    setFileUrl(temp_url);
    console.log(img_url);
    };

    function a2hex(str)
  {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
     {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('');
   }

   const ann = () =>{
    const encUrl = a2hex(fileUrl);
    const encName = a2hex(fileName)
    navigate(`/annotate/${encUrl}/${encName}`);
    }

    //let img_url = "https://ichef.bbci.co.uk/news/976/cpsprodpb/67CF/production/_108857562_mediaitem108857561.jpg";
    let img_url = "https://source.unsplash.com/random/800x600"
    //let [fileName,setFileNAme]=useState("sampleImg");
    let [fileUrl,setFileUrl] = useState(img_url);
    let [fileName,setFileName] = useState("");
    const navigate = useNavigate();


    const handleTextInput = (e) => {
        setFileName(e.target.value);
        };



    return (
        <div className="container mt-4">
            <div>
                <img src={fileUrl} alt={"uploaded file"} />
                <div className="side-by-side">
                    <input 
                    type="file" 
                    input onChange={handleFileInput}/>
                    <h5>Set Image Name: </h5>
                    <input
                    type="text"
                    input onChange={handleTextInput}
                     />

                </div>
                <button type="button" onClick={ann}>Annotate</button>
            </div>
          </div>
      );
}
export default UploadImage