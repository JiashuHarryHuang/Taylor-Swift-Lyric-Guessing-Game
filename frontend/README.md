# Outline
1. Split the page into components
    1. Game
        1. data: lyric (GET), answer, current round (1-5 incrementally), total lines (GET)
    2. Stat
        1. data: user score, total score
2. Write CSS and HTML
3. Events and handlers
    1. User inputs answer ↔ answer state
    2. Button’s `onClick` → `checkAnswer()`
    3. `useEffect()` → Send two GET requests for the lyric and total lines
    4. current round = 5 → pop out box
    5. Restart button → reset all data and send a GET request
4. API
    1. `getLyric()`: 
        1. Method: GET
        2. Parameter: Random id
        3. Response: Lyric object
    2. `getTotalLines()`:
        1. Method: GET
        2. Parameter: none
        3. Response: number of lines of lyrics

# Bugs

### Two GET requests are sent asynchronously, but I want them to be sent in order

- Use async and await.
- Don’t call setState() method immediately after await. setState() after the two requests are sent.
    
    ```jsx
    let mounted = true;
        async function fetchData() {
            let totalLineResult = await getTotalLines();
            let lyricResult = await getLyric(totalLineResult.data);
            if (mounted) {
                setLyric(lyricResult.data);
                setTotalLines(totalLineResult.data);
            }
        }
        if (mounted) {
            fetchData();
        }
        return () => mounted = false;
    ```
    

### useEffect() gets called when enter is pressed

- Add event.preventDefault() on the handler method
- Bind form’s onSubmit with the handler
    
    ```jsx
    const checkAnswer = (event) => {
    	  event.preventDefault();
    	  
    		...
     }
    
    <form onSubmit={checkAnswer}>
    		...
    		<Button type="button" onClick={checkAnswer} shape="circle" icon={<CheckOutlined />} />
    </form>
    ```