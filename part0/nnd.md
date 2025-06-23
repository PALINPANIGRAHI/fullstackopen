sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML page

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: JavaScript file

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: JSON (existing notes)

    Note over Browser: User adds a new note

    Browser->>Server: POST /https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Server-->>Browser: 302 Redirect to /https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate Server

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: Updated HTML with new note

    Browser->>Server: GET /https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Updated JSON
