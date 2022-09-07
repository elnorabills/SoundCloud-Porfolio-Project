import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editSongThunk } from "../../store/songs";
import { useParams } from "react-router-dom";
import "./EditSongForm.css";

function EditSongForm() {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stopBtn, setStopBtn] = useState(false);
  const [valErrors, setValErrors] = useState([]);
  const { songId } = useParams();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStopBtn(true);

    const payload = {
      ...song,
      title,
      description
    };

    let editedSong = await dispatch(editSongThunk(songId, payload))
    .catch(async (response) => {
        const err = await response.json();
        if (err) {
            setValErrors(err.errors);
        }
    })
    if (editedSong) {
      history.push("/me/songs"); //could be `/songs/${songId}`
    }
    setStopBtn(false);
  };

  return (
    <div className="edit-song-form-container">
      <form className="edit-song-form" onSubmit={handleSubmit}>
        <div>
          <h1 className="h1-edit-song-title">Edit Song</h1>
        </div>
        <ul className="edit-song-errors">
            {Object.values(valErrors).map(err => (
                <li key={err}>{err}</li>
            ))}
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
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
              placeholder="Song Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button className="save-edits-button" disabled={stopBtn} type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditSongForm;
