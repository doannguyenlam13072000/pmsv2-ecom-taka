import { acceptHMRUpdate, type StoreDefinition } from "pinia";

// Define a type for store modules: key is export name, value is a Pinia store definition
type StoreModule = Record<string, StoreDefinition>;

// Auto-import all .ts files in this directory (excluding subfolders), eagerly
// Each file is expected to export one or more Pinia store functions like `useXStore`
const modules = import.meta.glob<StoreModule>("./*.ts", { eager: true });

// This will hold all extracted store functions
const stores: Record<string, StoreDefinition> = {};

// Loop through each imported module
for (const path in modules) {
  const module = modules[path]; // Get the module object

  if (!module)
    continue; // Safety check (in case module failed to load)

  // Loop through each named export in the module
  for (const [exportName, storeFn] of Object.entries(module)) {
    // Only collect functions that follow the Pinia naming convention: useXStore
    if (typeof storeFn === "function" && exportName.startsWith("use")) {
      stores[exportName] = storeFn as StoreDefinition;
    }
  }
}

// Set up Hot Module Replacement (HMR) for all collected stores
// This allows live updates during development without full reload
if (import.meta.hot) {
  const hot = import.meta.hot; // Alias for clarity

  for (const store of Object.values(stores)) {
    // Register each store to support HMR
    hot.accept(acceptHMRUpdate(store, hot));
  }
}

// Re-export store functions
export * from "./auth";
export * from "./counter";
