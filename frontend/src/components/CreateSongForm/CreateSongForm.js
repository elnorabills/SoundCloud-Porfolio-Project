import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from '../../store/songs';
import { useParams } from "react-router-dom";

function CreateSongForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const { albumId } = useParams();

     const handleSubmit = async (e) => {
       e.preventDefault();

       const payload = {
         title,
         description,
         url,
         imageUrl
       };

       let createdSong = await dispatch(createSongThunk(payload, albumId));
       if (createdSong) {
           history.push(`/songs/${createdSong.id}`);
       }
       return setErrors([
         "Must have a title and url",
       ]);
     };

     return (
       <form className="create-song-form" onSubmit={handleSubmit}>
         <ul>
           {errors.map((error, idx) => (
             <li key={idx}>{error}</li>
           ))}
         </ul>
         <label>
           Title:
           <input
             type="text"
             placeholder="Song Title"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             required
           />
         </label>
         <label>
           Description:
           <input
             type="text"
             placeholder='Song Description'
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           />
         </label>
         <label>
           Url:
           <input
             type="text"
             placeholder='Song Url'
             value={url}
             onChange={(e) => setUrl(e.target.value)}
             required
           />
         </label>
         <label>
           Image Url:
           <input
             type="text"
             placeholder='Image Url'
             value={imageUrl}
             onChange={(e) => setImageUrl(e.target.value)}
           />
         </label>
         <button type="submit">Add Song</button>
       </form>
     );
};

export default CreateSongForm;
