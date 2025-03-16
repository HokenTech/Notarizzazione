export const CONTRACT_CONFIG = {
  account: 'testunicrypt',
  abi: {
    "version": "eosio::abi/1.2",
    "types": [],
    "structs": [
      {
        "name": "student",
        "base": "",
        "fields": [
          {"name": "key", "type": "uint64"},
          {"name": "user", "type": "name"},
          {"name": "nome", "type": "string"},
          {"name": "cognome", "type": "string"},
          {"name": "codice_fiscale", "type": "string"},
          {"name": "via", "type": "string"},
          {"name": "citta", "type": "string"},
          {"name": "nome_corso", "type": "string"}
        ]
      },
      {
        "name": "insert",
        "base": "",
        "fields": [
          {"name": "user", "type": "name"},
          {"name": "nome", "type": "string"},
          {"name": "cognome", "type": "string"},
          {"name": "codice_fiscale", "type": "string"},
          {"name": "via", "type": "string"},
          {"name": "citta", "type": "string"},
          {"name": "nome_corso", "type": "string"}
        ]
      },
      {
        "name": "update",
        "base": "",
        "fields": [
          {"name": "key", "type": "uint64"},
          {"name": "user", "type": "name"},
          {"name": "nome", "type": "string"},
          {"name": "cognome", "type": "string"},
          {"name": "codice_fiscale", "type": "string"},
          {"name": "via", "type": "string"},
          {"name": "citta", "type": "string"},
          {"name": "nome_corso", "type": "string"}
        ]
      },
      {
        "name": "erase",
        "base": "",
        "fields": [
          {"name": "key", "type": "uint64"},
          {"name": "user", "type": "name"}
        ]
      }
    ],
    "actions": [
      {"name": "insert", "type": "insert"},
      {"name": "update", "type": "update"},
      {"name": "erase", "type": "erase"},
      {"name": "get", "type": "get"},
      {"name": "getall", "type": "getall"}
    ],
    "tables": [
      {
        "name": "students",
        "type": "student",
        "index_type": "i64",
        "key_names": ["key"],
        "key_types": ["uint64"]
      }
    ]
  }
};
