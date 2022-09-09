import { Modal } from "../../context/Modal";
import { useState } from "react";
import EditAlbumForm from "./EditAlbumForm";
import "./EditAlbumButton.css";

const EditAlbumButtonComp = () => {
  const [editAlbum, setEditAlbum] = useState(false);

  return (
    <div>
      <button className="edit-album-button" onClick={() => setEditAlbum(true)}>Edit Album</button>
      {editAlbum && (
        <Modal onClose={() => setEditAlbum(false)}>
          <EditAlbumForm setEditAlbum={setEditAlbum} />
        </Modal>
      )}
    </div>
  );
};

export default EditAlbumButtonComp;
