import { Modal } from "../../context/Modal";
import { useState } from "react";
import CreateSongForm from "./CreateSongForm";
import "./CreateSongButton.css";

const CreateSongButtonComp = () => {
  const [createSong, setCreateSong] = useState(false);

  return (
    <div>
      <button onClick={() => setCreateSong(true)}>Add Song</button>
      {createSong && (
        <Modal onClose={() => setCreateSong(false)}>
          <CreateSongForm setCreateSong={setCreateSong} />
        </Modal>
      )}
    </div>
  );
};

export default CreateSongButtonComp;
