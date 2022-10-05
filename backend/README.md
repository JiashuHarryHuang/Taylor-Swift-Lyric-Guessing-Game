# Outline

1. Create a POJO class named Lyric
2. Create a Util class used to load CSV file as soon as the server started.
3. Create two controller methods for GET requests.
    1. getLyric():
        1. Method: GET
        2. Parameter: Random id
        3. Response: Lyric object
    2. getTotalLines():
        1. Method: GET
        2. Parameter: none
        3. Response: number of lines of lyrics

# Bugs
### File not found
- change path from /data/… to data/…
### Access to XMLHttpRequest at 'http://localhost:8080/' from origin 'http://localhost:3000' has been blocked by CORS policy
- Add annotation @CrossOrigin(origins = "http://localhost:3000") to Controller class