import CustomNavHeader from "@/components/custom-nav-header";
import TransactionHeader from "@/components/transaction/transaction-header";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { colors } from "@/constants/Colors";
import { keysForStorage } from "@/constants/Keys";
import {
  getAllWalletByUser,
  transferBalancesBetweenWallets,
} from "@/db/wallets";
import useShowErrorAlert from "@/hooks/use-show-error-alert";
import { getStoreData } from "@/lib/async-storeage";
import { TransferType, User } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function WalletTransferScreen() {
  const showAlert = useShowErrorAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [fromValue, setFromValue] = useState<string | null>(null);
  const [toOpen, setToOpen] = useState(false);
  const [toValue, setToValue] = useState<string | null>(null);
  const [fromItems, setFromItems] = useState<
    { label: string; value: string }[]
  >([]);
  const [toItems, setToItems] = useState<{ label: string; value: string }[]>(
    []
  );

  const [transaction, setTransaction] = useState<TransferType>({
    fromValue: "",
    toValue: "",
    balance: 0,
  });

  const balanceOnChange = (value: string) => {
    setTransaction((prevState) => ({
      ...prevState,
      balance: +value.trim(),
    }));
  };

  const handleOnPress = async () => {
    // Check wallets value are not null
    if (
      fromValue === "" ||
      fromValue === null ||
      toValue === null ||
      toValue === ""
    ) {
      showAlert({
        message: "Missing wallet to transfer",
      });
      return;
    }

    // Check wallet are same to prevent duplicate transfer
    if (fromValue === toValue) {
      showAlert({
        message: "You cannot transfer to the same wallet",
      });
      return;
    }

    const transferBalance = {
      ...transaction,
      fromValue: fromValue,
      toValue: toValue,
    };

    try {
      setIsLoading(true);
      await transferBalancesBetweenWallets(transferBalance);

      showAlert({
        message: "Transfer successful",
      });

      // Navigate to home screen
      router.push("/home");
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
      setFromItems([]);
      setToItems([]);

      setIsLoading(true);
      // Get user and user budgets
      const user = await getStoreData<User>(keysForStorage.user);
      const budgets = await getAllWalletByUser(user?.$id!);

      // Set the return value to items for select
      budgets.documents.forEach((budget) => {
        setFromItems((prev) => {
          return [...prev, { label: budget.name, value: budget.$id }];
        });

        setToItems((prev) => {
          return [...prev, { label: budget.name, value: budget.$id }];
        });
      });
      setIsLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomNavHeader title="Income" bgColor={colors.blue[100]} />
      <TransactionHeader
        title="How much?"
        balance={transaction.balance}
        bgColor={colors.blue[100]}
      />
      <View style={[styles.formContainer]}>
        {/* TODO: Fix dropdown cover by input field */}
        <DropDownPicker
          placeholder="From"
          disabled={isLoading}
          open={fromOpen}
          value={fromValue}
          items={fromItems}
          setOpen={setFromOpen}
          setValue={setFromValue}
          setItems={setFromItems}
          style={{
            borderColor: colors.gray[100],
            marginVertical: 10,
          }}
        />
        <DropDownPicker
          placeholder="To"
          disabled={isLoading}
          open={toOpen}
          value={toValue}
          items={toItems}
          setOpen={setToOpen}
          setValue={setToValue}
          setItems={setToItems}
          style={{
            borderColor: colors.gray[100],
            marginVertical: 10,
          }}
        />
        <FormField
          handleOnChange={(value) => balanceOnChange(value)}
          label="Balance"
          labelShown={false}
          placeholder="Balance"
          value={
            transaction.balance === 0 ? "" : transaction.balance.toString()
          }
          keyboardType="numeric"
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
    backgroundColor: colors.blue[100],
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
