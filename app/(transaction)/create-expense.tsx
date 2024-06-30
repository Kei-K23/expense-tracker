import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import Button from "@/components/ui/button";
import FileUploadPicker from "@/components/ui/file-upload-picker";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import { getAllWalletByUser } from "@/db/budget";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { getStoreData } from "@/lib/async-storeage";
import { TransactionData, User } from "@/types";
import { getDocumentAsync } from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function CreateExpenseScreen() {
  const showAlert = useShowErrorAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  const [transaction, setTransaction] = useState<TransactionData>({
    description: "",
    type: "Expense",
    wallets: "",
    balance: 0,
    attachmentURL: null,
    category: "",
  });

  const openPicker = async () => {
    // Open the file picker to select an image
    const result = await getDocumentAsync();

    if (!result.canceled) {
      // 20MB equal to 2e7 bytes
      if (result.assets[0].size && result.assets[0].size <= 2e7) {
        setTransaction({
          ...transaction,
          attachmentURL: result.assets[0],
        });
      } else {
        showAlert({
          message:
            "Exceeded the size limit. Only allow 20MB maximum file sizes",
        });
      }
    }
  };

  const handleOnChange = (field: keyof TransactionData, value: string) => {
    setTransaction((prevState) => ({
      ...prevState,
      [field]: value.trim(),
    }));
  };

  const handleOnPress = async () => {
    // Check budget id exists, if exists set to budgets value of transaction
    if (value) {
      setTransaction({
        ...transaction,
        wallets: value,
      });
    } else {
      showAlert({
        message: "Budget account is missing",
      });
    }
    try {
      setIsLoading(true);
    } catch (e: any) {
      showAlert({
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      // Clear items first to avoid duplicates
      setItems([]);

      setIsLoading(true);
      // Get user and user budgets
      const user = await getStoreData<User>(keysForStorage.user);
      const budgets = await getAllWalletByUser(user?.$id!);
      // Set the return value to items for select
      budgets.documents.forEach((budget) =>
        setItems((prev) => {
          return [...prev, { label: budget.name, value: budget.$id }];
        })
      );
      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Expense" bgColor={colors.danger[300]} />
      <TransactionHeader
        balance={transaction.balance}
        handleOnChange={handleOnChange}
        bgColor={colors.danger[300]}
      />
      <View style={[styles.formContainer]}>
        <FormField
          handleOnChange={(value) => handleOnChange("category", value)}
          label="Category"
          labelShown={false}
          placeholder="Category"
          value={transaction.category}
        />
        <FormField
          handleOnChange={(value) => handleOnChange("description", value)}
          label="Description"
          labelShown={false}
          placeholder="Description"
          value={transaction.description ?? ""}
        />
        <FileUploadPicker
          placeholder="Click here to upload attachment media"
          labelShown={false}
          asset={transaction.attachmentURL}
          callBackFn={openPicker}
        />
        <DropDownPicker
          placeholder="Budget account"
          disabled={isLoading}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            borderColor: colors.gray[100],
            marginVertical: 10,
          }}
        />
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Button
            title="Create"
            isLoading={isLoading}
            callbackFn={handleOnPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.danger[300],
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
