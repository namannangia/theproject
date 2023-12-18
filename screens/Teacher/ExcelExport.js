import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
export default exportToExcel = async (data) => {
    try {
        console.log("Export req recvd", data);
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
        const excelFileName = "exported_data.xlsx";
        const excelFileUri = FileSystem.documentDirectory + excelFileName;

        await FileSystem.writeAsStringAsync(
            excelFileUri,
            XLSX.write(wb, { bookType: "xlsx", type: "base64" }),
            { encoding: FileSystem.EncodingType.Base64 }
        );
        XLSX.utils.book_append_sheet(wb, ws, "Cities");
        const wbout = XLSX.write(wb, {
            type: "base64",
            bookType: "xlsx",
        });
        const uri = FileSystem.cacheDirectory + "AttendanceReport.xlsx";
        console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(uri, {
            mimeType:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            dialogTitle: "Open Excel File",
        });
        // await FileSystem.downloadAsync(
        //     excelFileUri,
        //     FileSystem.documentDirectory + excelFileName
        // );

        console.log("Excel file saved:", excelFileUri);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
    }
};
