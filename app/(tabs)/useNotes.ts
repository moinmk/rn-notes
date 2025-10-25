import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useNotes = () => {
  const MY_NOTES = "mynotes";
  const [notes, setNotes] = useState<{ id: number; noteValue: string }[]>([]);
  const [note, setNote] = useState("");
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const onPressAdd = () => {
    const index = notes.length;
    setCurrentEditingIndex(index);
  };

  const onPressSave = () => {
    const tempNotes = [...notes];
    if (tempNotes?.find((i) => i.id === currentEditingIndex)) {
      tempNotes[currentEditingIndex] = {
        id: currentEditingIndex,
        noteValue: note,
      };
    } else {
      tempNotes.push({
        id: currentEditingIndex,
        noteValue: note,
      });
    }
    AsyncStorage.setItem(MY_NOTES, JSON.stringify(tempNotes));
    setNotes(tempNotes);
    setNote("");
    setCurrentEditingIndex(null);
  };

  const onPressCancel = () => {
    setCurrentEditingIndex(null);
  };

  const onPressEditItem = ({ item }) => {
    setCurrentEditingIndex(item.id);
    setNote(item.noteValue);
  };

  const onPressDeleteItem = ({ id }) => {
    let tempNotes = [...notes];
    tempNotes = tempNotes.filter((listItem) => listItem.id !== id);
    AsyncStorage.setItem(MY_NOTES, JSON.stringify(tempNotes));
    setNotes(tempNotes);
  };

  useEffect(() => {
    AsyncStorage.getItem(MY_NOTES).then((res) => {
      setNotes(JSON.parse(res || "[]"));
    });
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      AsyncStorage.getItem(MY_NOTES).then((res) => {
        setNotes(JSON.parse(res || "[]"));
      });
    } else {
      setNotes((tempNotes) =>
        tempNotes.filter((note) =>
          note?.noteValue
            .trim()
            ?.toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  return {
    notes,
    note,
    setNote,
    searchQuery,
    setSearchQuery,
    currentEditingIndex,
    onPressAdd,
    onPressSave,
    onPressCancel,
    onPressEditItem,
    onPressDeleteItem,
  };
};
