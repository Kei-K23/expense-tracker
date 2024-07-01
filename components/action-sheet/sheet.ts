
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import TransactionActionSheet from "./transaction-action-sheet";
import BudgetDeleteActionSheet from "./budget-delete-action-sheet";
import BudgetEditActionSheet from "./budget-edit-action-sheet";

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet("create-transaction", TransactionActionSheet);
registerSheet("budget-delete", BudgetDeleteActionSheet);
registerSheet("budget-edit", BudgetEditActionSheet);
export { };

declare module 'react-native-actions-sheet' {
    interface Sheets {
        'budget-delete': SheetDefinition<{
            payload: {
                budgetId: string;
            };
        }>;
        'budget-edit': SheetDefinition<{
            payload: {
                budgetId: string;
            };
        }>;
    }
}
/**
 * Since we are not importing our Sheets in any component or file, we want to make sure
 * they are bundled by the JS bundler. Hence we will import this file in App.js.
 */
