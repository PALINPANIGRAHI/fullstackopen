sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: HTML page (spa)

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: JavaScript file

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: JSON (existing notes)

    Note over Browser: User writes and submits a new note

    Browser->>Server: POST /https://studies.cs.helsinki.fi/exampleapp/new_note_spa (note data in JSON)
    Server-->>Browser: JSON (newly added note)

    Note over Browser: JavaScript updates DOM with new note
