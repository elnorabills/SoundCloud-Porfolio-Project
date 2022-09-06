import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/albums";
import "./CreateAlbumForm.css";

function CreateAlbumForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      imageUrl,
    };

    let createdAlbum = await dispatch(createAlbumThunk(payload));
    if (createdAlbum) {
      history.push(`/albums/${createdAlbum.id}`);
    }
    return setErrors(["Must have a title"]);
  };

  return (
    <div className="create-album-form-container">
      <form className="create-album-form" onSubmit={handleSubmit}>
        <h1 className="h1-create-album-title">Create Album</h1>
        <ul className="create-album-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="flex-input-ca">
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
        <div className="flex-input-ca">
          <label>
            <input
              type="text"
              placeholder="Album Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="flex-input-ca">
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
          <button className="create-album-button" type="submit">Create Album</button>
        </div>
      </form>
    </div>
  );
}

export default CreateAlbumForm;
