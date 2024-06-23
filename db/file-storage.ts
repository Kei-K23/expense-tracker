import { appwriteConfig, storages } from '@/lib/appWrite';
import { DocumentPickerAsset } from 'expo-document-picker';
import { ID } from 'react-native-appwrite';

export const uploadFile = async (file: DocumentPickerAsset | null) => {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedData = await storages.createFile(appwriteConfig.storageId, ID.unique(), {
            name: asset.name,
            size: asset.size!,
            type: asset.type!,
            uri: asset.uri
        });

        const previewFileUrl = getPreviewFile(uploadedData.$id);
        return previewFileUrl;
    } catch (e: any) {
        console.log(e);
        throw new Error("Error while uploading video");
    }
}

const getPreviewFile = (id: string) => {
    let fileUrl: string;
    try {

        fileUrl = storages.getFileView(appwriteConfig.storageId, id) as any as string;

        if (!fileUrl) throw new Error("No file preview");
        return fileUrl;
    } catch (e: any) {
        throw new Error("Something went wrong when getting file preview");
    }
}