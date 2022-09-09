import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from '../../store/songs';
import { useParams } from "react-router-dom";
import "./CreateSongForm.css";

function CreateSongForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [valErrors, setValErrors] = useState([]);
    const { albumId } = useParams();

     const handleSubmit = async (e) => {
       e.preventDefault();

       const payload = {
         title,
         description,
         url,
         imageUrl
       };

       let createdSong = await dispatch(
         createSongThunk(payload, albumId)
       ).catch(async (response) => {
         const err = await response.json();
         if (err) {
           setValErrors(err.errors);
         }
       });
       if (createdSong) {
           history.push(`/songs/${createdSong.id}`);
       }
      //  return setErrors([
      //    "Must have a title and url",
      //  ]);
     };

     return (
       <div className="create-song-form-container">
         <form className="create-song-form" onSubmit={handleSubmit}>
           <h1 className="h1-create-song-title">Add Song</h1>
           <ul className="create-song-errors">
             {Object.values(valErrors).map((err) => (
               <li key={err}>{err}</li>
             ))}
             {/* {errors.map((error, idx) => (
               <li key={idx}>{error}</li>
             ))} */}
           </ul>
           <div className="flex-input-cs">
             <label>
               <input
                 type="text"
                 placeholder="Song Title"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
               />
             </label>
           </div>
           <div className="flex-input-cs">
             <label>
               <input
                 type="text"
                 placeholder="Song Description (optional)"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
               />
             </label>
           </div>
           <div className="flex-input-cs">
             <label>
               <input
                 type="text"
                 placeholder="Song Url"
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 required
               />
             </label>
           </div>
           <div className="flex-input-cs">
             <label>
               <input
                 type="text"
                 placeholder="Image Url (optional)"
                 value={imageUrl}
                 onChange={(e) => setImageUrl(e.target.value)}
               />
             </label>
           </div>
           <div>
             <button className="add-song-button" type="submit">
               Add Song
             </button>
           </div>
         </form>
       </div>
     );
};

export default CreateSongForm;
