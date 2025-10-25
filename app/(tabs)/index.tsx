import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "./useNotes";

export default function HomeScreen() {
  const {
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
  } = useNotes();

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View style={{ flex: 1 }}>
        {currentEditingIndex === null && (
          <TouchableOpacity
            style={{
              alignSelf: "center",
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              width: "95%",
            }}
            onPress={onPressAdd}
          >
            <Text style={{ color: "grey", fontSize: 18, textAlign: "center" }}>
              Add new +
            </Text>
          </TouchableOpacity>
        )}

        {currentEditingIndex !== null && (
          <>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                fontSize: 18,
                marginVertical: 16,
                padding: 8,
              }}
              placeholder="write your note here"
              value={note}
              onChangeText={setNote}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity onPress={onPressSave}>
                <Text style={{ color: "navy", fontSize: 16, fontWeight: 600 }}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressCancel}>
                <Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Text
          style={{
            fontSize: 18,
            textDecorationLine: "underline",
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          All Notes
        </Text>
        <TextInput style={{borderBottomWidth:1,marginBottom:20,fontSize:16,padding:8}} placeholder="search" value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList
          data={notes}
          renderItem={({ item, index }) => {
            return (
              <View
                key={item?.id}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  marginHorizontal: 5,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text>{item?.noteValue}</Text>
                <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                  <TouchableOpacity onPress={() => onPressEditItem({ item })}>
                    <Text>edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onPressDeleteItem({ id: item?.id })}
                  >
                    <Text style={{ color: "red" }}>delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
