import { useState } from 'react';
import { useContract } from '../contract/useContract';
import { useSession } from "../session";

function InsertStudent() {
  const { session } = useSession();
  const contract = useContract(); // Use the hook directly
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("Please login first");
      return;
    }

    if (!contract) {
      setError("Contract not initialized");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await contract.actions.insert({
        user: session.actor,
        ...form
      }).send();
      
      alert("Student inserted successfully");
      setForm({
        nome: "",
        cognome: "",
        codice_fiscale: "",
        via: "",
        citta: "",
        nome_corso: ""
      });
    } catch (err) {
      console.error("Error inserting student:", err);
      setError(err.message || "Failed to insert student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      
      <div>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          name="cognome"
          value={form.cognome}
          onChange={handleChange}
          placeholder="Cognome"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          name="codice_fiscale"
          value={form.codice_fiscale}
          onChange={handleChange}
          placeholder="Codice Fiscale"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          name="via"
          value={form.via}
          onChange={handleChange}
          placeholder="Via"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          name="citta"
          value={form.citta}
          onChange={handleChange}
          placeholder="Città"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          name="nome_corso"
          value={form.nome_corso}
          onChange={handleChange}
          placeholder="Corso"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Inserting..." : "Insert Student"}
      </button>
    </form>
  );
}

export default InsertStudent;