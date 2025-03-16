import React, { useState } from 'react';
import { useContract } from '../contract/useContract';
import { useSession } from "../session";

function UpdateStudent() {
  const { session } = useSession();
  const contract = useContract();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState("");
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    codice_fiscale: "",
    via: "",
    citta: "",
    nome_corso: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "recordKey") {
      setKey(value);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session || !contract) {
      setError("Please login first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const action = {
        account: contract.account,
        name: 'update',
        authorization: [{ actor: session.actor, permission: 'active' }],
        data: {
          key: parseInt(key),
          user: session.actor,
          ...form
        }
      };

      await session.transact({
        actions: [action]
      });

      alert("Student updated successfully");
      setKey("");
      setForm({
        nome: "",
        cognome: "",
        codice_fiscale: "",
        via: "",
        citta: "",
        nome_corso: ""
      });
    } catch (err) {
      console.error("Error updating student:", err);
      setError(err.message || "Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="recordKey" className="block mb-1">Record Key</label>
        <input
          id="recordKey"
          name="recordKey"
          type="number"
          value={key}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="nome" className="block mb-1">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="cognome" className="block mb-1">Cognome</label>
        <input
          id="cognome"
          name="cognome"
          type="text"
          value={form.cognome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="codice_fiscale" className="block mb-1">Codice Fiscale</label>
        <input
          id="codice_fiscale"
          name="codice_fiscale"
          type="text"
          value={form.codice_fiscale}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="via" className="block mb-1">Via</label>
        <input
          id="via"
          name="via"
          type="text"
          value={form.via}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="citta" className="block mb-1">Città</label>
        <input
          id="citta"
          name="citta"
          type="text"
          value={form.citta}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="nome_corso" className="block mb-1">Nome Corso</label>
        <input
          id="nome_corso"
          name="nome_corso"
          type="text"
          value={form.nome_corso}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || !session || !contract}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Student"}
      </button>
    </form>
  );
}

export default UpdateStudent;