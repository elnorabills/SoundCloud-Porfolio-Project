import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSongThunk } from "../../store/songs";
import { useParams } from "react-router-dom";
import "./EditSongForm.css";

function EditSongForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { songId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl,
    };

    let editedSong = await dispatch(editSongThunk(songId, payload));
    if (editedSong) {
      history.push(`/songs/${editedSong.id}`);
    }
    return setErrors(["Must have a title and url"]);
  };

  return (
    <div className="edit-song-form-container">
      <form className="edit-song-form" onSubmit={handleSubmit}>
        <div>
          <h1 className="h1-edit-song-title">Edit Song</h1>
        </div>
        <ul className="edit-song-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="flex-input-es">
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
        <div className="flex-input-es">
          <label>
            <input
              type="text"
              placeholder="Song Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="flex-input-es">
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
        <div className="flex-input-es">
          <label>
            <input
              type="text"
              placeholder="Image Url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button className="save-edits-button" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditSongForm;
