import { useState, useEffect, createContext, useContext } from "react";
import supabase from "./auth-context";

const DocumentContext = createContext(null);

 function DocumentProvider({ children }) {
  const user = supabase.auth.user();

  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  // Load initial data and set up listeners
  useEffect(
    () => async () => {
      const { data: documents } = await supabase.from("documents").select("*");
      setDocuments(documents);

      const { data: myDocuments } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id);
      setMyDocuments(myDocuments);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        document &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", document.user_id)
          .single());
      setOwner(owner);

      const { data: task } =
        document &&
        (await supabase
          .from("tasks")
          .select("*")
          .eq("id", document.task_id)
          .single());
      setTask(task);
    },
    [document]
  );

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        documents,
        setDocuments,
        myDocuments,
        setMyDocuments,
        owner,
        setOwner,
        task,
        setTask
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentProvider;

export function useDocumentStore() {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("useDocumentStore must be used inside a `Provider`");
  return context;
}

