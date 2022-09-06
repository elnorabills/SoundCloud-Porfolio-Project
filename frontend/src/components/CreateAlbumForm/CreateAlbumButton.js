import { Modal } from "../../context/Modal";
import { useState } from "react";
import CreateAlbumForm from "./CreateAlbumForm";
import "./CreateAlbumButton.css";

const CreateAlbumButtonComp = () => {
  const [createAlbum, setCreateAlbum] = useState(false);

  return (
    <div>
      <button className="add-album-button" onClick={() => setCreateAlbum(true)}>Add Album</button>
      {createAlbum && (
        <Modal onClose={() => setCreateAlbum(false)}>
          <CreateAlbumForm setCreateAlbum={setCreateAlbum} />
        </Modal>
      )}
    </div>
  );
};

export default CreateAlbumButtonComp;
