import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editAlbumThunk } from "../../store/albums";
import { useParams } from "react-router-dom";
import "./EditAlbumForm.css";

function EditAlbumForm() {
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stopBtn, setStopBtn] = useState(false);
  const [valErrors, setValErrors] = useState([]);
  const { albumId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStopBtn(true);

    const payload = {
      ...album,
      title,
      description,
    };

    let editedAlbum = await dispatch(editAlbumThunk(albumId, payload)).catch(
      async (response) => {
        const err = await response.json();
        if (err) {
          setValErrors(err.errors);
        }
      }
    );
    if (editedAlbum) {
      history.push("/me/albums"); //could be `/albums/${albumId}`
    }
    setStopBtn(false);
  };

  return (
    <div className="edit-album-form-container">
      <form className="edit-album-form" onSubmit={handleSubmit}>
        <div>
          <h1 className="h1-edit-album-form-title">Edit Album</h1>
        </div>
        <ul className="edit-album-errors">
          {Object.values(valErrors).map((err) => (
            <li key={err}>{err}</li>
          ))}
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
        </ul>
        <div className="flex-input-ea">
          <label>
            <input
              type="text"
              placeholder="Album Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex-input-ea">
          <label>
            <input
              type="text"
              placeholder="Album Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            className="save-edits-button"
            disabled={stopBtn}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAlbumForm;
