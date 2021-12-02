import React, {useState,useEffect} from 'react';
import { useParams,useNavigate } from "react-router-dom";
import ReactImageAnnotate from "react-image-annotate";
import axios from 'axios';



const Annotate=() =>{
    const sendAnno = (selectedFile) =>{
        for (var pair of selectedFile.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        const svUrl = "http://localhost:5000/addAnno"
        try{
            axios.post(svUrl,selectedFile);
            console.log('FileSent');
        }catch(err){
            console.log(err);
        }
        URL.revokeObjectURL(imgUrl)
        navigator('/')
    }

    function hex2a(str1)
    {
        var hex  = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }

    const getClasses = async() =>{
        const addr = "http://localhost:5000/"
        await axios.get(addr,'',{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
            .then(response => setClasses(response.data));
    }
    const findClassbyName = (e)=>{
        for(let i=0;i<classes.length;i++){
            if(classes[i].name ===e){
                return(classes[i].classID)
            }
        }
    }

    const customOnExit = (result) =>{

        const imgName = result.name;
        let fd = new FormData();
        fd.append('imgName',imgName)
        const tempObj = result.regions;
        if (tempObj===undefined){
            navigate('/')
            return;
        }
        const annotations = [];
        for (const thObj of tempObj){
            const anno = [];
            const myClass = findClassbyName(thObj.cls)
            if (myClass === undefined){
                alert("Some classes are not picked!");
                return;
            }
            anno.push(myClass);
            anno.push(thObj.x);
            anno.push(thObj.y);
            anno.push(thObj.w);
            anno.push(thObj.h);
            //anno.push(imgName);
            annotations.push(anno);
        }
        fd.append('annotations',annotations)
        sendAnno(fd);
        //navigate('/')

    }

    const AnnApp= () =>{
        const classNames = [];
        for(let e of classes){
            classNames.push(e.name);
        }
        return(
            <div>
                <ReactImageAnnotate
                    labelImages
                    regionClsList={classNames}
                    onExit={output => customOnExit(output.images[0])}
                    hidePrev={true}
                    hideNext={true}
                    enabledTools={["select","create-box"]}
                    images={[
                        {
                            src: imgUrl,
                            name: imgName,
                        }
                    ]}
                />
            </div>
        )
    }

    const [imgName,setImgName]=useState("");
    const [classes,setClasses]=useState([]);
    const [imgUrl,setImgUrl] = useState("");
    const encUrl = useParams().encUrl;
    const encName = useParams().encName;
    const navigate = useNavigate();
    const [wait , setWait] = React.useState(false);

    useEffect(() => {
        setImgUrl(hex2a(encUrl));
        setImgName(hex2a(encName));
        console.log(imgName);
        getClasses()

        const timer = setTimeout(() => {
            setWait(true)
          }, 100);
          return () => clearTimeout(timer);
      },[]);



      

    
    return wait ? <AnnApp/> : <div>Loading</div>
/** */
}

export default Annotate;