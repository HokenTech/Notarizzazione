import React, { useState } from "react";
import { useContract } from "../contract/useContract";
import { useSession } from "../session";

function DeleteStudent() {
  const { session } = useSession();
  const contract = useContract();
  const [recordKey, setRecordKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!session) {
      alert("Please login first");
      return;
    }

    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    if (!recordKey) {
      alert("Please enter a record key");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const action = {
        account: contract.account,
        name: 'erase',
        authorization: [{ actor: session.actor, permission: 'active' }],
        data: {
          key: parseInt(recordKey),
          user: session.actor
        }
      };

      await session.transact({
        actions: [action]
      });
      
      alert("Student deleted successfully");
      setRecordKey("");
    } catch (err) {
      console.error("Error deleting student:", err);
      setError(err.message || "Failed to delete student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      
      <div className="flex flex-col">
        <label htmlFor="recordKey" className="mb-1">Record Key</label>
        <input
          id="recordKey"
          type="number"
          value={recordKey}
          onChange={(e) => setRecordKey(e.target.value)}
          className="p-2 border rounded"
          required
        />
      </div>

      <button
        onClick={handleDelete}
        disabled={loading || !session || !contract}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
      >
        {loading ? "Deleting..." : "Delete Student"}
      </button>
    </div>
  );
}

export default DeleteStudent;