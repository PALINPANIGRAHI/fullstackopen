sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write and submit note
    Browser->>Server: POST /https://studies.cs.helsinki.fi/exampleapp/new_note_spa (with note content in JSON)
    activate Server
    Server-->>Browser: 200 OK (JSON response with saved note)
    deactivate Server
    Browser->>Browser: Update DOM with new note (no reload)
