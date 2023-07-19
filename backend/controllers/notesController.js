import Note from "../models/notesModel.js";

export const addnote = async (req, res) => {
    const { title, content, category } = req.body;




    try {
        let note = await new Note({
            title,
            content,
            category,
            user: req.user.id


        })
        await note.save();



        if (note) {
            res.status(201).json({ message: "note created successfully", note })
        }

        res.status(400).json({ message: "Something went wrong ,does not create the note" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
};

export const getallnotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

export const getnote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(400).json({ message: "Note not found" })
        }
        return res.status(201).json({ message: "Note found", note })
    } catch (error) {
        res.status(500).json(error)
    }

}
// export const updatenote = async (req, res) => {
//     const { title, content, category } = req.body;
//     const { id } = req.params;
//     try {
//         let note = await Note.findByIdAndUpdate(id, {
//             title,
//             content,
//             category
//         })
//         await note.save();
//         if (!note) {
//             res.status(400).json({ message: "Does not get note" })
//         }
//         res.status(200).json({ message: "Note updated successfully", note })
//     } catch (error) {
//         res.status(200).json(error)
//     }
// }
export const updatenote = async (req, res) => {
    const { title, content, category } = req.body;
    const { id } = req.params;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content, category },
            { new: true }
        );

        await updatedNote.save()
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (updatedNote.user.toString() !== req.user._id) {
            return res.status(403).json({ message: "You don't have access to modify the note" });
        }

        return res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const deletenote = async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "You can't perform this action" });
    }

    return res.json({ message: "Note Removed" });
};

