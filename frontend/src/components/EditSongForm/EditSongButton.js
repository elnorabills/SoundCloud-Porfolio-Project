import { Modal } from "../../context/Modal";
import { useState } from "react";
import EditSongForm from "./EditSongForm";
import "./EditSongButton.css";

const EditSongButtonComp = () => {
    const [editSong, setEditSong] = useState(false);

    return (
        <div>
            <button onClick={() => setEditSong(true)}>Edit Song</button>
            {editSong && (
                <Modal onClose={() => setEditSong(false)}>
                    <EditSongForm setEditSong={setEditSong} />
                </Modal>
            )}
        </div>
    )
}

export default EditSongButtonComp;
