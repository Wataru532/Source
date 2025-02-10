import { db } from "../../firebase"; 
import { doc, setDoc } from "firebase/firestore";

export const UploadCsv = (csv) => {
    const uploadUser = async () => {
        try {
          await setDoc(doc(db, "OriginalCSV", "csv"), {
            data: csv
          });
          console.log("success");
        } catch (error) {
          console.error("Error:", error);
        }
    };
    uploadUser();
}